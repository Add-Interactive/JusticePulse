import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Building, 
  Download, 
  Copy, 
  PlusCircle, 
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialFOIARequests } from '../../data/foiaTrackerData';

export default function FOIATrackerView({ showToast }) {
  const [requests, setRequests] = useState(initialFOIARequests);
  const [appealModalReq, setAppealModalReq] = useState(null);

  const handleGenerateAppeal = (req) => {
    const appealLetter = `NOTICE OF STATUTORY NON-COMPLIANCE & FORMAL ADMINISTRATIVE APPEAL

Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
To: Public Records Appeals Officer / Office of the Attorney General Public Access Bureau
Agency: ${req.department}
Original FOIA Tracking Ref: ${req.id}
State Statute: ${req.statute}

Re: Formal Appeal of Statutory De Facto Denial / Unlawful Delay

Dear Appeals Officer:

On ${req.dateSubmitted}, I submitted a formal public records demand pursuant to ${req.statute} requesting the following records:
"${req.requestedRecords}"

Under ${req.statute}, the agency was statutorily mandated to respond no later than ${req.statutoryDeadline}. As of today, ${req.daysElapsed} days have elapsed without lawful disclosure, statutory exemption citations, or formal extension notices.

Pursuant to state law, failure to respond within the statutory timeframe constitutes a constructive de facto denial. I hereby demand:
1. Immediate, unredacted disclosure of all requested bodycam, CAD, and personnel records;
2. Complete waiver of all search and reproduction fees due to statutory untimeliness;
3. Referral to the Attorney General Public Access Bureau for formal civil penalty enforcement.

Respectfully submitted,
JusticePulse Civic Intelligence & Public Records Accountability Project`;

    navigator.clipboard?.writeText(appealLetter);
    confetti({ particleCount: 40, spread: 60 });
    showToast(`Statutory Overdue Appeal Letter for ${req.id} copied to clipboard!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-2xl p-6 border border-indigo-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-indigo-400 mb-1">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">Public Records Compliance Hub</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          My FOIA Requests Tracker & Statutory Deadline Monitor
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Monitor statutory response countdowns across municipal police departments, track bodycam release logs, and auto-generate binding administrative appeals for unlawful delays.
        </p>
      </div>

      {/* Requests Stream */}
      <div className="space-y-4">
        {requests.map(req => (
          <div
            key={req.id}
            className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-bold text-justice-400">{req.id}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-mono ${req.statusBadge}`}>
                  {req.status}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">{req.state}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Statutory Deadline: <strong className="text-slate-200">{req.statutoryDeadline}</strong></span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-justice-400" />
                {req.department}
              </h3>
              <p className="text-xs text-slate-300">
                <strong className="text-slate-400">Demanded Records:</strong> {req.requestedRecords}
              </p>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono block">Status Notes & Enforcement:</span>
                <p className="text-slate-300">{req.notes}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Statute: {req.statute} • {req.daysElapsed} Days Elapsed
              </span>

              {req.status.includes('OVERDUE') ? (
                <button
                  onClick={() => handleGenerateAppeal(req)}
                  className="px-4 py-2 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson flex items-center space-x-1.5 transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Generate Overdue Statutory Appeal</span>
                </button>
              ) : (
                <button
                  onClick={() => showToast(`Opening public FOIA archive for ${req.id}...`, 'info')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Released Vault Exhibits</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
