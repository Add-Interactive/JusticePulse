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
      (filterRisk === 'SEVERE' && off.repeatOffenderScore.includes('Severe') || off.repeatOffenderScore.includes('Extreme')) ||
      (filterRisk === 'BRADY' && off.bradyListStatus.includes('Brady'));

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-crimson-950/60 to-slate-900 rounded-2xl p-5 border border-crimson-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-crimson-400 mb-1">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Public Accountability Matrix</span>
        </div>
        <h2 className="text-xl font-extrabold text-white font-display">
          National Repeat Offender & "Brady List" Registry
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1">
          Tracking officers with sustained misconduct complaints, Brady list disclosure flags, and multi-agency jumping ("Gypsy Cop" pattern) across jurisdictions.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search officer name, badge #, or precinct..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Risk Level:</span>
          {['ALL', 'SEVERE', 'BRADY'].map(risk => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterRisk === risk
                  ? 'bg-crimson-900 text-crimson-200 border border-crimson-700'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
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
            className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl hover:border-crimson-700/60 cursor-pointer transition-all space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-crimson-400 transition-colors">
                    {officer.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">({officer.badge})</span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {officer.department} • {officer.state}
                </p>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-crimson-950 text-crimson-400 border border-crimson-800">
                {officer.repeatOffenderScore}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-center">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Total Complaints</span>
                <span className="text-sm font-bold font-mono text-slate-200">{officer.totalComplaints}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Sustained</span>
                <span className="text-sm font-bold font-mono text-crimson-400">{officer.sustainedComplaints}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Precincts</span>
                <span className="text-sm font-bold font-mono text-amber-400">{officer.departmentsServed.length}</span>
              </div>
            </div>

            {/* Notes / Highlights */}
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {officer.notes}
            </p>

            {/* Footer */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-mono font-semibold">{officer.settlementsPaid}</span>
              <span className="text-slate-400 group-hover:text-white flex items-center gap-1 font-semibold">
                View Full Dossier <ArrowRight className="w-3.5 h-3.5" />
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
