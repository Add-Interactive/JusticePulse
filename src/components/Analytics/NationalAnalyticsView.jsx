import React, { useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  ShieldAlert, 
  Building, 
  Scale, 
  TrendingUp, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { nationalStats } from '../../data/statsData';

export default function NationalAnalyticsView({ showToast }) {
  const [selectedCity, setSelectedCity] = useState(nationalStats.cities[0]);
  const [taxContributionInput, setTaxContributionInput] = useState('5000');

  // Calculate estimated share of user's local tax going to misconduct payouts
  const calculatedTaxShare = ((parseFloat(taxContributionInput || 0) * 0.042)).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-2xl p-6 border border-indigo-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-indigo-400 mb-1">
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">National Civic Data Intelligence</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          $3.28 Billion+ In Taxpayer Police Misconduct Settlements
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Comprehensive empirical data on municipal settlements, Qualified Immunity shield frequencies, and recurring fiscal costs across American cities.
        </p>
      </div>

      {/* Key Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">10-Yr Settlements</span>
          <p className="text-xl font-extrabold font-mono text-crimson-400">{nationalStats.totalTaxpayerSettlements10Yr}</p>
          <p className="text-[10px] text-slate-500">Paid by municipal general funds</p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Qualified Immunity Shield</span>
          <p className="text-xl font-extrabold font-mono text-amber-400">{nationalStats.qualifiedImmunityShieldRate}</p>
          <p className="text-[10px] text-slate-500">Of civil rights claims dismissed</p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Officer Conviction Rate</span>
          <p className="text-xl font-extrabold font-mono text-justice-400">{nationalStats.officersConvictedPercent}</p>
          <p className="text-[10px] text-slate-500">In on-duty fatal shootings</p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gypsy Cop Re-hiring</span>
          <p className="text-xl font-extrabold font-mono text-purple-400">{nationalStats.gypsyCopCrossHiringRate}</p>
          <p className="text-[10px] text-slate-500">Fired officers re-hired in 3 yrs</p>
        </div>
      </div>

      {/* Interactive Taxpayer Misconduct Calculator */}
      <div className="bg-gradient-to-br from-crimson-950/40 via-slate-900 to-slate-900 rounded-2xl p-6 border border-crimson-900/50 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-crimson-400">
          <DollarSign className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
            Interactive Taxpayer Burden Calculator
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          See how much of your local annual taxes are spent paying for police misconduct lawsuits instead of public schools, parks, and roads:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Your Annual City / Property Taxes ($):</label>
            <input
              type="number"
              value={taxContributionInput}
              onChange={(e) => setTaxContributionInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:border-crimson-500"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-crimson-800/40 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Misconduct Subsidy Paid By You:</span>
            <p className="text-2xl font-extrabold font-mono text-crimson-400 mt-0.5">${calculatedTaxShare} / year</p>
            <p className="text-[10px] text-slate-500">Based on average municipal budget allocations</p>
          </div>
        </div>
      </div>

      {/* City-by-City Breakdown Table */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
          Top Municipal Police Misconduct Settlement Registry (2015-2025)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400 font-bold">
                <th className="pb-3">Municipality</th>
                <th className="pb-3">10-Yr Total Settlements</th>
                <th className="pb-3">Annual Average</th>
                <th className="pb-3">Civil Lawsuits</th>
                <th className="pb-3">Qualified Immunity Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {nationalStats.cities.map((city, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 font-bold text-slate-200">{city.name}</td>
                  <td className="py-3 font-mono font-bold text-crimson-400">${city.settlements}M</td>
                  <td className="py-3 font-mono text-slate-300">{city.avgPerYear}</td>
                  <td className="py-3 font-mono text-slate-400">{city.lawsuits.toLocaleString()}</td>
                  <td className="py-3 font-mono text-amber-400">{city.shieldRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Systemic Injustice Breakdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {nationalStats.systemicInjusticeTypes.map((item, idx) => (
          <div key={idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-justice-400">{item.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            <div className="p-2.5 bg-slate-950 rounded-lg text-xs text-crimson-300 border border-slate-800 font-medium">
              <strong>Systemic Impact:</strong> {item.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
