import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  ShieldAlert, 
  FileCheck2, 
  Scale, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle2,
  Users
} from 'lucide-react';
import { departmentScorecards } from '../../data/departmentsData';

export default function DepartmentScorecardsView({ showToast }) {
  const [selectedDeptId, setSelectedDeptId] = useState('dept-nypd');
  const [compareDeptId, setCompareDeptId] = useState('dept-cpd');

  const dept1 = departmentScorecards.find(d => d.id === selectedDeptId) || departmentScorecards[0];
  const dept2 = departmentScorecards.find(d => d.id === compareDeptId) || departmentScorecards[1];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-emerald-950 text-emerald-300 border-emerald-700';
    if (grade.startsWith('B')) return 'bg-justice-950 text-justice-300 border-justice-700';
    if (grade.startsWith('C')) return 'bg-amber-950 text-amber-300 border-amber-700';
    return 'bg-crimson-950 text-crimson-300 border-crimson-700';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-2 text-justice-400 mb-1">
          <Building2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Institutional Accountability Index</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Police Department Benchmark Scorecards & Comparison
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Objective evaluation of municipal law enforcement agencies measuring taxpayer misconduct costs per capita, internal affairs discipline rates, bodycam FOIA response speed, and repeat offender concentrations.
        </p>
      </div>

      {/* Side-by-Side Comparison Selector Toolbar */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-1/2 flex items-center space-x-2">
          <span className="text-xs font-bold uppercase text-slate-400 whitespace-nowrap">Agency 1:</span>
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
          >
            {departmentScorecards.map(d => (
              <option key={d.id} value={d.id}>{d.name} (Grade: {d.overallGrade})</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2 flex items-center space-x-2">
          <span className="text-xs font-bold uppercase text-slate-400 whitespace-nowrap">Agency 2:</span>
          <select
            value={compareDeptId}
            onChange={(e) => setCompareDeptId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
          >
            {departmentScorecards.map(d => (
              <option key={d.id} value={d.id}>{d.name} (Grade: {d.overallGrade})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[dept1, dept2].map((dept, index) => (
          <div key={dept.id + index} className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">{dept.city}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{dept.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{dept.swornOfficers.toLocaleString()} Sworn Officers • {dept.annualBudget} Budget</p>
              </div>
              <div className={`p-2.5 rounded-2xl border text-center font-bold font-mono text-lg ${getGradeColor(dept.overallGrade)}`}>
                <span className="text-[9px] uppercase block tracking-wider opacity-80">Grade</span>
                {dept.overallGrade}
              </div>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">10-Yr Settlements Paid</span>
                <p className="text-sm font-bold font-mono text-crimson-400">{dept.settlements10Yr}</p>
                <p className="text-[10px] text-amber-400/90">{dept.settlementPerCapita}</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Sustained IA Discipline</span>
                <p className="text-sm font-bold font-mono text-justice-400">{dept.sustainedDisciplineRate}</p>
                <p className="text-[10px] text-slate-400">Of civilian complaints</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">FOIA Response Speed</span>
                <p className="text-xs font-bold text-slate-200">{dept.foiaSpeedGrade}</p>
                <p className="text-[10px] text-slate-400">Bodycam fulfillment rate</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Repeat Officers Flagged</span>
                <p className="text-sm font-bold font-mono text-purple-400">{dept.repeatOffendersTracked} Officers</p>
                <p className="text-[10px] text-slate-400">On Brady / Misconduct DB</p>
              </div>
            </div>

            {/* Consent Decree / Legal Monitor Status */}
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-justice-400 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" /> Federal / State Oversight Status:
              </span>
              <p className="text-slate-200 font-medium">{dept.consentDecreeStatus}</p>
            </div>

            {/* Summary */}
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{dept.summary}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
