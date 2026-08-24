import React, { useState } from 'react';
import { 
  Sliders, 
  DollarSign, 
  TrendingUp, 
  Building, 
  HeartHandshake, 
  GraduationCap, 
  Home, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { cityBudgets, empiricalAlternativeEvidence } from '../../data/budgetSimulatorData';

export default function BudgetSandboxView({ showToast }) {
  const [selectedCityId, setSelectedCityId] = useState('b-nyc');
  const [reallocPercent, setReallocPercent] = useState(10); // 0% to 30%

  const selectedCity = cityBudgets.find(c => c.id === selectedCityId) || cityBudgets[0];

  // Calculations
  const reallocatedAmount = Math.round((selectedCity.policeBudget * reallocPercent) / 100);
  const remainingPoliceBudget = selectedCity.policeBudget - reallocatedAmount;

  // Split reallocation 40% mental health 988, 30% youth education/after-school, 30% affordable housing & detox
  const mentalHealthBoost = Math.round(reallocatedAmount * 0.40);
  const youthProgramsBoost = Math.round(reallocatedAmount * 0.30);
  const housingBoost = Math.round(reallocatedAmount * 0.30);

  // Wall Street Police Brutality Bond estimation (cities borrow at 4-6% over 20 yrs, paying ~1.75x in debt service)
  const estimatedBondDebtService = Math.round(selectedCity.annualSettlements * 1.82);

  const formatBillion = (num) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    return `$${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 rounded-2xl p-6 border border-emerald-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-emerald-400 mb-1">
          <Sliders className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">Public Safety Budget Reallocation Sandbox</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Reimagine Public Safety: Interactive Fiscal Simulation
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Simulate redirecting municipal budget allocations into proven non-police emergency responses: 24/7 mental health crisis dispatch (988), youth arts, addiction recovery, and violence interruption.
        </p>
      </div>

      {/* City Selector & Reallocation Slider Control */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Select Municipality</label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm font-bold text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {cityBudgets.map(c => (
                <option key={c.id} value={c.id}>{c.city} — Police Budget: {formatBillion(c.policeBudget)}</option>
              ))}
            </select>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Annual Misconduct Payouts</span>
            <span className="text-lg font-extrabold font-mono text-crimson-400">{formatBillion(selectedCity.annualSettlements)}/yr</span>
          </div>
        </div>

        {/* Interactive Percentage Slider */}
        <div className="space-y-3 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Reallocation Percentage: <strong className="text-base text-white font-mono ml-1">{reallocPercent}%</strong>
            </label>
            <span className="text-sm font-extrabold font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-800">
              +{formatBillion(reallocatedAmount)} Invested in Community
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={reallocPercent}
            onChange={(e) => setReallocPercent(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0% (Status Quo)</span>
            <span>10% (STAR/CAHOOTS Baseline)</span>
            <span>20% (Comprehensive Public Health)</span>
            <span>30% (Full Prevention Model)</span>
          </div>
        </div>

        {/* Dynamic Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Activity className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Mobile Mental Health (988)</h4>
            </div>
            <p className="text-xl font-extrabold font-mono text-emerald-300">+{formatBillion(mentalHealthBoost)}</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Expands unarmed crisis teams. Est. <strong>{Math.round(mentalHealthBoost / 95000)}</strong> new licensed mobile crisis therapists deployed 24/7.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-justice-400">
              <GraduationCap className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Youth & After-School Arts</h4>
            </div>
            <p className="text-xl font-extrabold font-mono text-justice-300">+{formatBillion(youthProgramsBoost)}</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Funds free community centers, youth job apprenticeships, and violin/arts sanctuaries across high-need neighborhoods.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-purple-400">
              <Home className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Housing & Addiction Recovery</h4>
            </div>
            <p className="text-xl font-extrabold font-mono text-purple-300">+{formatBillion(housingBoost)}</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Permanent supportive housing units and medically assisted detox beds preventing homelessness arrests.
            </p>
          </div>
        </div>

        {/* Wall Street Brutality Bond Callout */}
        <div className="p-4 bg-crimson-950/30 border border-crimson-900/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-crimson-400 flex items-center gap-1 font-mono">
              <TrendingDown className="w-3.5 h-3.5" /> Wall Street "Police Brutality Bond" Taxpayer Debt
            </span>
            <p className="text-slate-300">
              When {selectedCity.city} borrows money via municipal judgment bonds to settle misconduct claims, taxpayers pay an estimated <strong className="text-white font-mono">{formatBillion(estimatedBondDebtService)}</strong> over 20 years with interest profits going to bond underwriting banks.
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Evidence Models */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Empirical Case Studies: Non-Police Response Successes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {empiricalAlternativeEvidence.map((ev, idx) => (
            <div key={idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <h4 className="text-xs font-bold text-emerald-400">{ev.name}</h4>
              <p className="text-xs text-slate-200 leading-relaxed">{ev.impact}</p>
              <span className="text-[10px] text-slate-500 font-mono block pt-1">Source: {ev.source}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
