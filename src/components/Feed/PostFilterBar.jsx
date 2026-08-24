import React from 'react';
import { 
  Sparkles, 
  FileText, 
  HeartHandshake, 
  Scale, 
  ShieldAlert, 
  SlidersHorizontal 
} from 'lucide-react';

export default function PostFilterBar({ activeFilter, setFilter, postCounts }) {
  const filters = [
    { id: 'ALL', label: 'All Dispatches', count: postCounts.all },
    { id: 'EVIDENCE_RELEASE', label: 'FOIA & Evidence', count: postCounts.evidence },
    { id: 'MUTUAL_AID', label: 'Mutual Aid & Sanctuary', count: postCounts.mutualAid },
    { id: 'LEGAL_GUIDE', label: 'Legal Analysis & Rights', count: postCounts.legal },
    { id: 'POLICY_ALERT', label: 'Taxpayer & Policy Alerts', count: postCounts.policy }
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none select-none">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border ${
              isActive
                ? 'bg-justice-600 text-white border-justice-400 shadow-glow'
                : 'bg-[#111726] hover:bg-[#182238] text-slate-300 border-[#243147] hover:border-slate-600'
            }`}
          >
            <span>{f.label}</span>
            {f.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive ? 'bg-justice-900 text-justice-200' : 'bg-[#080c14] text-slate-400 border border-[#1e2a3f]'
              }`}>
                {f.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
