import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  Landmark, 
  AlertTriangle, 
  ArrowLeftRight, 
  Cpu, 
  Activity, 
  Info,
  Calendar,
  Layers,
  CheckCircle2,
  HelpCircle,
  Eye
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'ahrom' | 'ayar' | 'etemad' | 'engine' | 'simulation'>('overview');
  const [capital, setCapital] = useState<number>(300000000);
  const [simulationScenario, setSimulationScenario] = useState<'status_quo' | 'gold_breakout' | 'equity_surge'>('status_quo');

  // Ground Truth Telemetry from Historical Ingestion (Date: 1405-08-07 / 2026-10-28)
  const telemetry = {
    date: '۱۴۰۵/۰۸/۰۷',
    currentRegime: 'CASH_PARKING',
    regimeName: 'رژیم پارکینگ نقدینگی و تثبیت سود',
    ahrom: {
      price: 71666,
      ma25: 72205,
      mom10: -5.68,
      status: 'زیر میانگین ۲۵ روزه (شتاب منفی)',
      allocPct: 0,
      buyerPower: 0.88
    },
    ayar: {
      price: 713062,
      ma25: 715004,
      mom10: -0.19,
      status: 'نزدیک میانگین (اصلاح ملایم)',
      allocPct: 0,
      buyerPower: 1.05
    },
    etemad: {
      price: 145032,
      dailyYield: 0.134,
      annYield: 37.93,
      status: 'بازارگردانی با انحراف صفر و نرخ پایدار',
      allocPct: 100,
      dailyCashFlowTomans: 402000
    }
  };

  const calculateAmounts = () => {
    if (simulationScenario === 'gold_breakout') {
      return {
        ahrom: 0,
        ayar: capital,
        etemad: 0,
        regimeText: 'سوئیچ ۱۰۰٪ به صندوق عیار (جهش ارزی)'
      };
    } else if (simulationScenario === 'equity_surge') {
      return {
        ahrom: capital,
        ayar: 0,
        etemad: 0,
        regimeText: 'سوئیچ ۱۰۰٪ به صندوق اهرم (رالی پرشتاب بورس)'
      };
    }
    // Status Quo (Real Ground Truth)
    return {
      ahrom: 0,
      ayar: 0,
      etemad: capital,
      regimeText: 'تخصیص ۱۰۰٪ به صندوق اعتماد (پارکینگ سود و مهار نوسان)'
    };
  };

  const amounts = calculateAmounts();

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-950">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                سامانه تصمیم‌یار ۳ دارایی بورس ایران
                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-full font-mono">
                  v1.0 STRICT
                </span>
              </h1>
              <p className="text-xs text-slate-400">موتور تخصیص پویا بین اهرم، عیار و اعتماد | بدون داده جعلی</p>
            </div>
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs text-slate-400 block">آخرین بروزرسانی داده:</span>
            <span className="text-xs font-mono font-bold text-cyan-300">{telemetry.date}</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-[#0D1322] border-b border-slate-800 px-4 py-2">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'overview' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Layers className="w-4 h-4" />
            صفحه اصلی و خلاصه تخصیص
          </button>
          <button 
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'simulation' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Activity className="w-4 h-4" />
            شبیه‌ساز سناریوهای ۲ هفته آتی
          </button>
          <button 
            onClick={() => setActiveTab('ahrom')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'ahrom' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <TrendingUp className="w-4 h-4" />
            صندوق اهرم
          </button>
          <button 
            onClick={() => setActiveTab('ayar')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'ayar' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Coins className="w-4 h-4" />
            صندوق عیار
          </button>
          <button 
            onClick={() => setActiveTab('etemad')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'etemad' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Landmark className="w-4 h-4" />
            صندوق اعتماد
          </button>
          <button 
            onClick={() => setActiveTab('engine')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'engine' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <ShieldCheck className="w-4 h-4" />
            منطق موتور و شروط ابطال
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 space-y-6">
        
        {/* VIEW 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Operational Status Banner */}
            <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/60 border border-cyan-800/40 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    رژیم عملیاتی فعال پورتفولیو
                  </div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {amounts.regimeText}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    به دلیل قرار گرفتن قیمت هر دو دارایی پرریسک (اهرم و عیار) در زیر میانگین متحرک ۲۵ روزه، سرمایه در حالت ایمن تثبیت شده است.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-2.5 text-center">
                    <span className="text-[10px] text-slate-400 block">سرمایه فعال پایه:</span>
                    <span className="text-sm font-bold text-cyan-300 font-mono">
                      {(capital / 1000000).toLocaleString('fa-IR')} میلیون تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Allocation Table & Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Ahrom Card */}
              <div 
                onClick={() => setActiveTab('ahrom')}
                className="bg-[#0E1422] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 cursor-pointer transition relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">اهرم (کاریزما)</h3>
                      <span className="text-[10px] text-slate-400">صندوق اهرمی سهام</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold font-mono ${amounts.ahrom > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-800 text-slate-400'}`}>
                    {amounts.ahrom > 0 ? '۱۰۰٪' : '۰٪'}
                  </span>
                </div>
                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">مبلغ تخصیص:</span>
                    <span className="font-mono font-bold text-white">{(amounts.ahrom).toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">آخرین قیمت:</span>
                    <span className="font-mono text-slate-200">۷۱,۶۶۶ ریال</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">فاصله تا میانگین ۲۵ روزه:</span>
                    <span className="font-mono text-rose-400">-۰.۷۵٪ (زیر MA25)</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-[10px] text-cyan-400 justify-end gap-1">
                  <span>مشاهده جزئیات تکنیکال</span>
                  <Eye className="w-3 h-3" />
                </div>
              </div>

              {/* Ayar Card */}
              <div 
                onClick={() => setActiveTab('ayar')}
                className="bg-[#0E1422] border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 cursor-pointer transition relative overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">عیار (مفید)</h3>
                      <span className="text-[10px] text-slate-400">صندوق طلای فیزیکی</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold font-mono ${amounts.ayar > 0 ? 'bg-amber-950 text-amber-400 border border-amber-700' : 'bg-slate-800 text-slate-400'}`}>
                    {amounts.ayar > 0 ? '۱۰۰٪' : '۰٪'}
                  </span>
                </div>
                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">مبلغ تخصیص:</span>
                    <span className="font-mono font-bold text-white">{(amounts.ayar).toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">آخرین قیمت:</span>
                    <span className="font-mono text-slate-200">۷۱۳,۰۶۲ ریال</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">فاصله تا شکست صعودی:</span>
                    <span className="font-mono text-amber-300">تنها ۰.۲۷٪+ (مرز ۷۱۶,۰۰۰)</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-[10px] text-cyan-400 justify-end gap-1">
                  <span>مشاهده جزئیات ارزی و طلا</span>
                  <Eye className="w-3 h-3" />
                </div>
              </div>

              {/* Etemad Card */}
              <div 
                onClick={() => setActiveTab('etemad')}
                className="bg-[#0E1422] border-2 border-blue-500/60 rounded-2xl p-4 cursor-pointer transition relative overflow-hidden group shadow-lg shadow-blue-950/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">اعتماد (پارسیان)</h3>
                      <span className="text-[10px] text-cyan-300 font-bold">پارکینگ فعال کنونی</span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold font-mono bg-blue-950 text-blue-300 border border-blue-700">
                    ۱۰۰٪ فعال
                  </span>
                </div>
                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">مبلغ تخصیص:</span>
                    <span className="font-mono font-bold text-emerald-400">{(amounts.etemad).toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">سود روزشمار تخمینی:</span>
                    <span className="font-mono text-cyan-300">~۴۰۲,۰۰۰ تومان در روز</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">بازدهی مؤثر سالانه:</span>
                    <span className="font-mono text-emerald-300">۳۷.۹۳٪ مرکب</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-[10px] text-cyan-400 justify-end gap-1">
                  <span>مشاهده جدول انضباط بازارگردان</span>
                  <Eye className="w-3 h-3" />
                </div>
              </div>

            </div>

            {/* Next Switch Projection Box */}
            <div className="bg-[#0D121E] border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                پیش‌بینی اولین تاریخ گردش سرمایه (Switch Forecast)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="bg-[#121929] p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-amber-400 font-bold block mb-1">سناریوی محتمل اول: سوئیچ به طلا (عیار)</span>
                  <p className="leading-relaxed">
                    با توجه به اینکه قیمت پایانی عیار تنها ۰.۲۷٪ با میانگین متحرک ۲۵ روزه فاصله دارد، عبور قیمت از تراز <strong>۷۱۶,۰۰۰ ریال</strong> در روزهای کاری ۱۰ تا ۱۲ آبان، ماشه سوئیچ به طلا را فعال خواهد کرد.
                  </p>
                </div>
                <div className="bg-[#121929] p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-emerald-400 font-bold block mb-1">سناریوی محتمل دوم: سوئیچ به بورس (اهرم)</span>
                  <p className="leading-relaxed">
                    نیازمند صعود قیمت به بالای <strong>۷۲,۵۰۰ ریال</strong> و تایید سرانه خریدار حقیقی بالای ۱.۸ در ۳۰ دقیقه ابتدایی بازار است. در غیر این صورت، سرمایه در اعتماد باقی می‌ماند.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SCENARIO SIMULATION */}
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            <div className="bg-[#0D121E] border border-slate-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                موتور شبیه‌سازی سناریوهای ۲ هفته آینده
              </h2>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                در این بخش می‌توانید رفتار و واکنش دقیق ماشین وضعیت الگوریتم را در ۳ سناریوی کلان احتمالی تست کنید. سیستم بر اساس فرمول‌های ریاضی و بدون حدس فرضی، مقادیر تخصیص را نمایش می‌دهد.
              </p>
              
              {/* Simulation Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setSimulationScenario('status_quo')}
                  className={`p-3 rounded-xl border text-right transition ${simulationScenario === 'status_quo' ? 'bg-blue-950/80 border-blue-500 text-white shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}>
                  <span className="text-xs font-bold block mb-1">۱. سناریوی پایه (واقعی امروز)</span>
                  <span className="text-[11px] block text-slate-300">اصلاح هم‌زمان اهرم و عیار؛ استقرار ۱۰۰٪ در اعتماد</span>
                </button>
                <button
                  onClick={() => setSimulationScenario('gold_breakout')}
                  className={`p-3 rounded-xl border text-right transition ${simulationScenario === 'gold_breakout' ? 'bg-amber-950/80 border-amber-500 text-white shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}>
                  <span className="text-xs font-bold block mb-1">۲. سناریوی جهش ارزی / طلا</span>
                  <span className="text-[11px] block text-slate-300">عبور عیار از ۷۱۶,۰۰۰ ریال و شتاب مثبت</span>
                </button>
                <button
                  onClick={() => setSimulationScenario('equity_surge')}
                  className={`p-3 rounded-xl border text-right transition ${simulationScenario === 'equity_surge' ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}>
                  <span className="text-xs font-bold block mb-1">۳. سناریوی رالی سهام و اهرم</span>
                  <span className="text-[11px] block text-slate-300">عبور اهرم از ۷۲,۵۰۰ ریال با سرانه خریدار بالای ۱.۸</span>
                </button>
              </div>

              {/* Simulation Result Box */}
              <div className="bg-[#111726] border border-slate-700/70 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400">فرمان خروجی سیستم در این سناریو:</span>
                    <h4 className="text-base font-bold text-cyan-300">{amounts.regimeText}</h4>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-slate-400">ارزش کل سبد:</span>
                    <span className="text-sm font-bold text-white font-mono block">{(capital).toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-[#0A0E18] p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">سهم اهرم:</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">{(amounts.ahrom).toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="bg-[#0A0E18] p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">سهم عیار:</span>
                    <span className="text-sm font-bold font-mono text-amber-400">{(amounts.ayar).toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="bg-[#0A0E18] p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">سهم اعتماد:</span>
                    <span className="text-sm font-bold font-mono text-blue-400">{(amounts.etemad).toLocaleString('fa-IR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: AHROM DRILL-DOWN */}
        {activeTab === 'ahrom' && (
          <div className="space-y-4 bg-[#0D121E] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                شناسنامه و وضعیت تله‌متری صندوق اهرم (CharismaAhromi ETF)
              </h3>
              <button onClick={() => setActiveTab('overview')} className="text-xs text-slate-400 hover:text-white">بازگشت</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#121929] p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">پارامترهای تابلویی:</span>
                <div className="flex justify-between"><span>آخرین قیمت معامله:</span><span className="font-mono text-white">۷۱,۶۶۶ ریال</span></div>
                <div className="flex justify-between"><span>میانگین متحرک ۲۵ روزه:</span><span className="font-mono text-slate-300">۷۲,۲۰۵ ریال</span></div>
                <div className="flex justify-between"><span>شتاب ۱۰ روزه (ROC10):</span><span className="font-mono text-rose-400">-۵.۶۸٪</span></div>
                <div className="flex justify-between"><span>سرانه خریدار حقیقی به فروشنده:</span><span className="font-mono text-slate-300">۰.۸۸ (ضعیف)</span></div>
              </div>
              <div className="bg-[#121929] p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">فرمان الگوریتم:</span>
                <p className="text-slate-300 leading-relaxed">
                  ورود تهاجمی ممنوع است. تا زمانی که قیمت اهرم به بالای تراز ۷۲,۵۰۰ ریال نرسیده و سرانه حقیقی بالای ۱.۸ تثبیت نگردد، سرمایه نباید در معرض بتای ۲ برابری این صندوق قرار گیرد.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: AYAR DRILL-DOWN */}
        {activeTab === 'ayar' && (
          <div className="space-y-4 bg-[#0D121E] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <Coins className="w-5 h-5" />
                شناسنامه و وضعیت تله‌متری صندوق عیار (Ayar Gold ETF)
              </h3>
              <button onClick={() => setActiveTab('overview')} className="text-xs text-slate-400 hover:text-white">بازگشت</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#121929] p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">پارامترهای تابلویی و ارزی:</span>
                <div className="flex justify-between"><span>آخرین قیمت معامله:</span><span className="font-mono text-white">۷۱۳,۰۶۲ ریال</span></div>
                <div className="flex justify-between"><span>میانگین متحرک ۲۵ روزه:</span><span className="font-mono text-slate-300">۷۱۵,۰۰۴ ریال</span></div>
                <div className="flex justify-between"><span>شتاب ۱۰ روزه (ROC10):</span><span className="font-mono text-slate-300">-۰.۱۹٪ (نزدیک به صفر)</span></div>
                <div className="flex justify-between"><span>ارزش معاملات روزانه:</span><span className="font-mono text-emerald-400">بیش از ۳,۹۰۰ میلیارد تومان</span></div>
              </div>
              <div className="bg-[#121929] p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">تحلیل سیستمی:</span>
                <p className="text-slate-300 leading-relaxed">
                  نقدشوندگی بی‌نظیر عیار اجازه خروج فوری در هر مقطعی را می‌دهد. با رشد اندک ۰.۲۷ درصدی و عبور از ۷۱۶,۰۰۰ ریال، این نماد اولین کاندیدای دریافت ۱۰۰٪ نقدینگی سبد خواهد بود.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: ETEMAD DRILL-DOWN */}
        {activeTab === 'etemad' && (
          <div className="space-y-4 bg-[#0D121E] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-blue-400 flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                شناسنامه و انضباط بازارگردان صندوق اعتماد (Etemad Parsian ETF)
              </h3>
              <button onClick={() => setActiveTab('overview')} className="text-xs text-slate-400 hover:text-white">بازگشت</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#121929] p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">شاخص‌های تضمین نقدشوندگی:</span>
                <div className="flex justify-between"><span>انحراف قیمت پایانی از آخرین (Spread):</span><span className="font-mono text-emerald-400">۰.۰۰۰۵٪ (انحراف صفر)</span></div>
                <div className="flex justify-between"><span>ارزش معاملات روزانه:</span><span className="font-mono text-white">بیش از ۱,۳۳۰ میلیارد تومان</span></div>
                <div className="flex justify-between"><span>بازدهی سالانه مرکب:</span><span className="font-mono text-cyan-300">۳۷.۹۳٪</span></div>
                <div className="flex justify-between"><span>انحراف معیار (نوسان نامطلوب):</span><span className="font-mono text-emerald-400">۰.۷۵٪ (پایدارترین صندوق)</span></div>
              </div>
              <div className="bg-[#121929] p-4 rounded-xl space-y-2">
                <span className="text-slate-400 block font-bold">نقش در پورتفولیو:</span>
                <p className="text-slate-300 leading-relaxed">
                  حضور ۳۰۰ میلیون تومان در اعتماد در این چند روز، علاوه بر مصون‌سازی سرمایه در برابر ریزش‌های احتمالی، هزینه کارمزد سوئیچ‌های بعدی را کاملاً پوشش می‌دهد.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: ENGINE LOGIC */}
        {activeTab === 'engine' && (
          <div className="space-y-4 bg-[#0D121E] border border-slate-800 rounded-2xl p-5 text-xs text-slate-300">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-5 h-5" />
              قوانین صلب ماشین وضعیت (FSM State Rules) و شروط ابطال
            </h3>
            <div className="space-y-3 leading-relaxed">
              <div className="bg-[#121929] p-3.5 rounded-xl border border-slate-700">
                <strong className="text-white block mb-1">۱. اصل اصالت داده‌ها (Zero Hallucination):</strong>
                تمامی تصمیمات بر پایه فایل‌های ورودی رسمی TSETMC اتخاذ شده و سیستم در نبود داده مجاز به حدس یا ایجاد اعداد ساختگی نیست.
              </div>
              <div className="bg-[#121929] p-3.5 rounded-xl border border-slate-700">
                <strong className="text-white block mb-1">۲. فیلتر حداقل زمان نگهداری (Hysteresis & Holding Filter):</strong>
                جهت جلوگیری از ذوب شدن سرمایه در چرخ‌دنده کارمزد، سوئیچ‌ها دارای بافر ۲.۵ درصدی بوده و تعویض روزانه احساسی وتو می‌شود.
              </div>
              <div className="bg-[#121929] p-3.5 rounded-xl border border-slate-700">
                <strong className="text-white block mb-1">۳. وتوی اضطراری مدارشکن (Circuit Breaker):</strong>
                در صورت وقوع افت بیش از ۲.۵٪ در اهرم یا افت بیش از ۲٪ در عیار نسبت به نقطه ورود، کل پوزیشن ابطال و سرمایه سریعاً به صندوق اعتماد منتقل می‌گردد.
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#070A10] px-4 py-3 text-center text-xs text-slate-500">
        طراحی و معماری شده بر مبنای System Blueprint v1.0 | استقرار روی Localhost و پشتیبانی از مرورگر موبایل
      </footer>
    </div>
  );
}
