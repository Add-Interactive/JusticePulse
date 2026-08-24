import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  AlertTriangle, 
  Building2, 
  DollarSign, 
  FileText, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';
import OfficerDetailModal from './OfficerDetailModal';

export default function OfficerDirectoryView({ officers, searchQuery, setSearchQuery, onOpenCaseDetail }) {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filteredOfficers = officers.filter(off => {
    const matchesSearch = !searchQuery ||
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = filterRisk === 'ALL' || 
      (filterRisk === 'SEVERE' && (off.repeatOffenderScore.includes('Severe') || off.repeatOffenderScore.includes('Extreme'))) ||
      (filterRisk === 'BRADY' && off.bradyListStatus.includes('Brady'));

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-5 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111726] via-crimson-950/80 to-[#111726] rounded-3xl p-6 border-2 border-crimson-700/60 shadow-2xl">
        <div className="flex items-center space-x-2 text-crimson-400 mb-1">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">Public Accountability Matrix</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white font-display">
          National Repeat Offender & "Brady List" Registry
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Tracking officers with sustained misconduct complaints, Brady list disclosure flags, and multi-agency jumping ("Gypsy Cop" pattern) across jurisdictions.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#111726] rounded-2xl p-4 border-2 border-[#243147] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search officer name, badge #, or precinct..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-mono font-bold">Risk Level:</span>
          {['ALL', 'SEVERE', 'BRADY'].map(risk => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                filterRisk === risk
                  ? 'bg-crimson-900 text-crimson-100 border-crimson-500 shadow-glow-crimson'
                  : 'bg-[#080c14] text-slate-400 border-[#243147] hover:text-white hover:border-slate-600'
              }`}
            >
              {risk === 'ALL' ? 'All Records' : risk === 'SEVERE' ? 'Severe Risk' : 'Brady Listed'}
            </button>
          ))}
        </div>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOfficers.map(officer => (
          <div
            key={officer.id}
            onClick={() => setSelectedOfficer(officer)}
            className="bg-[#111726] rounded-3xl border-2 border-[#243147] border-l-4 border-l-crimson-500 p-5 shadow-2xl hover:border-crimson-500/80 hover:shadow-glow-crimson cursor-pointer transition-all space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between border-b border-[#1c273a] pb-2.5">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-black text-white group-hover:text-crimson-400 transition-colors">
                      {officer.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono font-bold">({officer.badge})</span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {officer.department} • {officer.state}
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-crimson-950 text-crimson-300 border border-crimson-700">
                  {officer.repeatOffenderScore}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[#080c14] rounded-2xl border border-[#1e2a3f] text-center shadow-inner">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold font-mono block">Total Complaints</span>
                  <span className="text-sm font-black font-mono text-white">{officer.totalComplaints}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold font-mono block">Sustained</span>
                  <span className="text-sm font-black font-mono text-crimson-400">{officer.sustainedComplaints}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold font-mono block">Precincts</span>
                  <span className="text-sm font-black font-mono text-amber-400">{officer.departmentsServed.length}</span>
                </div>
              </div>

              {/* Notes / Highlights */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {officer.notes}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#1c273a] flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">{officer.settlementsPaid}</span>
              <span className="text-slate-300 group-hover:text-white flex items-center gap-1 font-bold">
                View Full Dossier <ArrowRight className="w-3.5 h-3.5 text-crimson-400" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedOfficer && (
        <OfficerDetailModal
          officer={selectedOfficer}
          onClose={() => setSelectedOfficer(null)}
          onOpenCaseDetail={onOpenCaseDetail}
        />
      )}
    </div>
  );
}
