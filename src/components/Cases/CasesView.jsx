import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShieldAlert, 
  ArrowUpRight, 
  Users, 
  FileCheck, 
  CheckCircle,
  Video,
  PlusCircle
} from 'lucide-react';

export default function CasesView({ 
  cases, 
  onSelectCase, 
  onOpenReportModal, 
  searchQuery, 
  setSearchQuery 
}) {
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const states = ['ALL', 'Illinois', 'Tennessee', 'Kentucky', 'Colorado', 'Texas', 'Ohio'];
  const statuses = ['ALL', 'Indicted', 'Convicted / Settlement', 'Settlement / Federal Charges', 'Active Investigation'];

  const filteredCases = cases.filter(c => {
    const matchesSearch = !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.victim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'ALL' || c.location.includes(selectedState);
    const matchesStatus = selectedStatus === 'ALL' || c.outcomeCategory.includes(selectedStatus) || c.status.includes(selectedStatus);

    return matchesSearch && matchesState && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-justice-950 to-slate-900 rounded-2xl p-5 border border-justice-900/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-justice-400 mb-1">
              <Scale className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">The National Police Accountability Docket</span>
            </div>
            <h2 className="text-xl font-extrabold text-white font-display">
              Documented Cases & Systemic Misconduct Registry
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Verified court dockets, bodycam evidence logs, officer repeat offender histories, and taxpayer settlement tracking. Every fact is corroborated with public records.
            </p>
          </div>
          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson transition-all flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit New Case / Incident</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by victim, city, or precinct..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-justice-500"
          />
        </div>

        {/* State and Status Selectors */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-justice-400" />
            <span className="text-[11px] font-semibold uppercase">Jurisdiction:</span>
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
          >
            {states.map(st => (
              <option key={st} value={st}>{st === 'ALL' ? 'All States' : st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map(caseItem => {
          return (
            <div
              key={caseItem.id}
              onClick={() => onSelectCase(caseItem.id)}
              className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl hover:border-justice-500/50 hover:shadow-glow cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-justice-950 text-justice-400 border border-justice-800/60">
                      {caseItem.status}
                    </span>
                    {caseItem.bodycamAvailable && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                        <Video className="w-2.5 h-2.5" /> Bodycam
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 group-hover:text-justice-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Case Title & Victim */}
                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-justice-300 transition-colors leading-snug font-display">
                    {caseItem.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-crimson-400" />
                      {caseItem.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {caseItem.date}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {caseItem.summary}
                </p>

                {/* Key Injustices Checklist */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-crimson-400 block">
                    Documented Injustices:
                  </span>
                  {caseItem.keyInjustices.slice(0, 2).map((inj, idx) => (
                    <div key={idx} className="text-[11px] text-slate-300 flex items-start space-x-1.5">
                      <span className="text-crimson-500 font-bold">•</span>
                      <span className="line-clamp-1">{inj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement & Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400">Settlement / Legal Payout</p>
                  <p className="text-xs font-bold font-mono text-emerald-400 truncate max-w-[200px]">
                    {caseItem.settlementAmount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-semibold text-slate-400">Petition</p>
                  <p className="text-xs font-bold font-mono text-justice-400">
                    {(caseItem.petitionSignatures / 1000).toFixed(0)}k Signed
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
