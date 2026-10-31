# engine.py: هسته محاسباتی مستقل و ماشین حالت رژیم بازار
import pandas as pd
import numpy as np
from datetime import datetime
from typing import Dict, Any, Optional

class ThreePillarEngine:
    def __init__(self, friction_rate: float = 0.0015):
        self.friction_rate = friction_rate
        self.ma_slow = 25
        self.mom_fast = 10
        self.hysteresis_threshold = 0.025  # 2.5% filter
        self.min_holding_days = 3

    def process_data(self, df_ahrom: pd.DataFrame, df_ayar: pd.DataFrame, df_etemad: pd.DataFrame) -> pd.DataFrame:
        # Standardize dates
        for df in [df_ahrom, df_ayar, df_etemad]:
            if '<DTYYYYMMDD>' in df.columns:
                df['date'] = pd.to_datetime(df['<DTYYYYMMDD>'].astype(str), format='%Y%m%d')
            elif 'date' in df.columns:
                df['date'] = pd.to_datetime(df['date'])
            df.sort_values('date', inplace=True)
            df.reset_index(drop=True, inplace=True)

        prices = pd.DataFrame({'date': df_ahrom['date']})
        prices = prices.merge(df_ahrom[['date', '<CLOSE>']].rename(columns={'<CLOSE>': 'Ahrom'}), on='date', how='inner')
        prices = prices.merge(df_ayar[['date', '<CLOSE>']].rename(columns={'<CLOSE>': 'Ayar'}), on='date', how='inner')
        prices = prices.merge(df_etemad[['date', '<CLOSE>']].rename(columns={'<CLOSE>': 'Etemad'}), on='date', how='inner')
        prices.set_index('date', inplace=True)
        prices.sort_index(inplace=True)
        prices = prices.ffill().dropna()

        # Indicators
        prices['MA_Ahrom'] = prices['Ahrom'].rolling(self.ma_slow).mean()
        prices['MA_Ayar'] = prices['Ayar'].rolling(self.ma_slow).mean()
        prices['Mom_Ahrom'] = prices['Ahrom'].pct_change(self.mom_fast) * 100
        prices['Mom_Ayar'] = prices['Ayar'].pct_change(self.mom_fast) * 100

        # State Machine Evaluation
        # Regime 1: Ahrom Bullish
        ahrom_bull = (prices['Ahrom'] > prices['MA_Ahrom']) & (prices['Mom_Ahrom'] > 0)
        # Regime 2: Ayar Bullish (when Ahrom is not bull)
        ayar_bull = (~ahrom_bull) & (prices['Ayar'] > prices['MA_Ayar']) & (prices['Mom_Ayar'] > 0)
        # Regime 3: Parking in Etemad
        parking = (~ahrom_bull) & (~ayar_bull)

        prices['State'] = 'PARKING_ETEMAD'
        prices.loc[ahrom_bull, 'State'] = 'BULLISH_AHROM'
        prices.loc[ayar_bull, 'State'] = 'BULLISH_AYAR'

        return prices

    def get_latest_verdict(self, prices: pd.DataFrame, capital_tomans: float = 300_000_000) -> Dict[str, Any]:
        if len(prices) == 0:
            return {"error": "INSUFFICIENT_DATA"}

        last = prices.iloc[-1]
        last_date = prices.index[-1].strftime('%Y-%m-%d')
        state = last['State']

        allocations = {
            'Ahrom_Pct': 0.0,
            'Ayar_Pct': 0.0,
            'Etemad_Pct': 0.0,
            'Ahrom_Amount': 0.0,
            'Ayar_Amount': 0.0,
            'Etemad_Amount': 0.0
        }

        if state == 'BULLISH_AHROM':
            allocations['Ahrom_Pct'] = 100.0
            allocations['Ahrom_Amount'] = capital_tomans
        elif state == 'BULLISH_AYAR':
            allocations['Ayar_Pct'] = 100.0
            allocations['Ayar_Amount'] = capital_tomans
        else:
            allocations['Etemad_Pct'] = 100.0
            allocations['Etemad_Amount'] = capital_tomans

        return {
            "date": last_date,
            "capital_tomans": capital_tomans,
            "regime": state,
            "telemetry": {
                "Ahrom_Close": float(last['Ahrom']),
                "Ahrom_MA25": float(last['MA_Ahrom']),
                "Ahrom_Mom10": float(last['Mom_Ahrom']),
                "Ayar_Close": float(last['Ayar']),
                "Ayar_MA25": float(last['MA_Ayar']),
                "Ayar_Mom10": float(last['Mom_Ayar']),
                "Etemad_Close": float(last['Etemad']),
            },
            "allocation": allocations,
            "invalidation_triggers": {
                "switch_to_ayar_if": "Ayar_Close > 716000 and Mom_Ayar > 0",
                "switch_to_ahrom_if": "Ahrom_Close > 72500 and Mom_Ahrom > 0 and BuyerPower > 1.8",
                "stay_in_etemad_if": "Both Ahrom and Ayar remain below MA25"
            }
        }
