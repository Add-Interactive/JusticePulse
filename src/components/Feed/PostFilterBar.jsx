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
    <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              isActive
                ? 'bg-justice-600 text-white shadow-glow'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>{f.label}</span>
            {f.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive ? 'bg-justice-800/80 text-justice-200' : 'bg-slate-800 text-slate-400'
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
