import React from 'react';
import { 
  X, 
  ShieldAlert, 
  Building2, 
  History, 
  AlertTriangle, 
  Scale, 
  FileSpreadsheet, 
  Lock 
} from 'lucide-react';

export default function OfficerDetailModal({ officer, onClose, onOpenCaseDetail }) {
  if (!officer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">{officer.name}</h3>
              <span className="text-xs font-mono text-slate-400">({officer.badge})</span>
              <span className="text-[10px] bg-crimson-950 text-crimson-400 px-2 py-0.5 rounded-full border border-crimson-800 font-bold">
                {officer.bradyListStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {officer.department} • {officer.state}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Key Risk Profile */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Total IA Complaints</span>
              <p className="text-base font-bold font-mono text-slate-200">{officer.totalComplaints}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Sustained Findings</span>
              <p className="text-base font-bold font-mono text-crimson-400">{officer.sustainedComplaints}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Settlements Paid</span>
              <p className="text-xs font-bold font-mono text-emerald-400 mt-1">{officer.settlementsPaid}</p>
            </div>
          </div>

          {/* Department Jumping History (Gypsy Cop Pattern) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <History className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Multi-Agency Employment History</h4>
            </div>
            <div className="space-y-2">
              {officer.departmentsServed.map((dep, idx) => (
                <div key={idx} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-200">{dep.name}</span>
                    <p className="text-[11px] text-slate-400">{dep.reasonForLeaving}</p>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400/90">{dep.years}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Cases */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Connected Incidents & Lawsuits</h4>
            <div className="space-y-1.5">
              {officer.casesInvolved.map((c, idx) => (
                <div key={idx} className="p-3 bg-crimson-950/20 border border-crimson-900/40 rounded-xl text-xs text-slate-200 flex items-center justify-between">
                  <span>{c}</span>
                  <span className="text-[10px] text-crimson-400 uppercase font-bold">Documented Record</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase">Investigative Notes</h5>
            <p className="text-xs text-slate-300 leading-relaxed">{officer.notes}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
