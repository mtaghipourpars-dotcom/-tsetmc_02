# main.py: وب‌سرویس سریع FastAPI سازگار با اجرا روی Localhost
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from engine import ThreePillarEngine

app = FastAPI(title="TSE Cockpit Engine API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = ThreePillarEngine()

@app.get("/health")
def health_check():
    return {"status": "ACTIVE", "mode": "STRICT_PROVENANCE_NO_FAKES"}

@app.post("/api/evaluate")
async def evaluate_portfolio(
    ahrom_file: UploadFile = File(...),
    ayar_file: UploadFile = File(...),
    etemad_file: UploadFile = File(...),
    capital: float = 300_000_000
):
    try:
        df_ah = pd.read_csv(io.BytesIO(await ahrom_file.read()))
        df_ay = pd.read_csv(io.BytesIO(await ayar_file.read()))
        df_et = pd.read_csv(io.BytesIO(await etemad_file.read()))

        processed = engine.process_data(df_ah, df_ay, df_et)
        verdict = engine.get_latest_verdict(processed, capital_tomans=capital)
        return verdict
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error evaluating data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
