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
    <div className="space-y-5 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111726] via-justice-950/80 to-[#111726] rounded-3xl p-6 border-2 border-justice-600/50 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-justice-400 mb-1">
              <Scale className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">The National Police Accountability Docket</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Documented Cases & Systemic Misconduct Registry
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Verified court dockets, bodycam evidence logs, officer repeat offender histories, and taxpayer settlement tracking. Every fact is corroborated with public records.
            </p>
          </div>
          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson transition-all flex-shrink-0 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit New Incident Docket</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-[#111726] rounded-2xl p-4 border-2 border-[#243147] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        {/* Search */}
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by victim, city, or precinct..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-justice-500 font-medium"
          />
        </div>

        {/* State and Status Selectors */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-justice-400" />
            <span className="text-[11px] font-bold uppercase">Jurisdiction:</span>
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-justice-500 font-semibold"
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
              className="bg-[#111726] rounded-3xl border-2 border-[#243147] border-l-4 border-l-justice-500 p-5 shadow-2xl hover:border-justice-400 hover:shadow-glow cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2 border-b border-[#1c273a] pb-2.5">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-justice-950 text-justice-300 border border-justice-700">
                      {caseItem.status}
                    </span>
                    {caseItem.bodycamAvailable && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                        <Video className="w-3 h-3" /> Bodycam Logged
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 group-hover:text-justice-400 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>

                {/* Case Title & Victim */}
                <div>
                  <h3 className="text-base font-black text-white group-hover:text-justice-300 transition-colors leading-snug font-display">
                    {caseItem.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1 font-mono">
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
                <div className="p-3 bg-[#080c14] rounded-2xl border border-[#1e2a3f] space-y-1.5 shadow-inner">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-crimson-400 block">
                    Documented Injustices:
                  </span>
                  {caseItem.keyInjustices.slice(0, 2).map((inj, idx) => (
                    <div key={idx} className="text-[11px] text-slate-300 flex items-start space-x-1.5">
                      <span className="text-crimson-500 font-bold">•</span>
                      <span className="line-clamp-1 leading-snug">{inj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement & Action Footer */}
              <div className="mt-4 pt-3 border-t border-[#1c273a] flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Settlement / Legal Payout</p>
                  <p className="text-xs font-bold font-mono text-emerald-400 truncate max-w-[200px]">
                    {caseItem.settlementAmount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Petition</p>
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
