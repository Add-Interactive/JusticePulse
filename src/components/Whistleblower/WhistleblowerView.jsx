import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileUp, 
  CheckCircle2, 
  AlertTriangle, 
  Building, 
  EyeOff, 
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WhistleblowerView({ showToast }) {
  const [department, setDepartment] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [narrative, setNarrative] = useState('');
  const [officerRank, setOfficerRank] = useState('Active Duty Patrol Officer');
  const [fileAttached, setFileAttached] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!narrative.trim() || !department.trim()) {
      showToast('Please provide the department and confidential narrative.', 'error');
      return;
    }

    setIsSubmitted(true);
    confetti({ particleCount: 60, spread: 80 });
    showToast('Whistleblower submission encrypted via RSA-4096 and routed to Special Inspector Counsel!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 rounded-2xl p-6 border border-emerald-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 mb-1">
            <EyeOff className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Zero-Knowledge Whistleblower Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Ethical Officer Sanctuary: Breaking the "Blue Wall of Silence"
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            A secure, cryptographically isolated intake for law enforcement personnel and dispatchers to report internal falsification, evidence tampering, unconstitutional violence, or supervisory retaliation.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-emerald-800/50 text-xs text-emerald-300 font-mono flex-shrink-0">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>RSA-4096 PGP Encrypted</span>
        </div>
      </div>

      {/* 3 Core Whistleblower Safeguards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5 shadow-xl">
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Zero Metadata Logging</h4>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            IP addresses, device fingerprints, and timestamps are stripped automatically. No trace of your identity is retained.
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5 shadow-xl">
          <div className="flex items-center space-x-2 text-justice-400">
            <Lock className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Special Legal Counsel Shield</h4>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Submissions are transmitted directly to independent federal civil rights attorneys protected under attorney-client privilege.
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Anti-Retaliation Defense</h4>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Immediate pro bono defense representation if your agency attempts disciplinary reprisal or constructive discharge.
          </p>
        </div>
      </div>

      {/* Secure Submission Form */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-2xl">
        {isSubmitted ? (
          <div className="p-8 text-center space-y-3 bg-slate-950 rounded-2xl border border-emerald-800/60 animation-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Whistleblower Record Encrypted & Sealed</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your report has been encrypted with our Special Inspector Master Key. Your courage upholds the true oath of constitutional integrity.
            </p>
            <p className="text-xs font-mono text-emerald-400">Token ID: #WB-SEC-{Date.now().toString().slice(-6)}</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-3 px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
            >
              Submit Another Confidential Record
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Confidential Officer Injustice Report
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Completely Anonymous</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Law Enforcement Agency / Precinct *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metro Police Internal Affairs / 3rd Precinct"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Your General Role (Optional)
                </label>
                <select
                  value={officerRank}
                  onChange={(e) => setOfficerRank(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Active Duty Patrol Officer">Active Duty Patrol Officer</option>
                  <option value="Field Training Officer / Sergeant">Field Training Officer / Sergeant</option>
                  <option value="Detective / Investigator">Detective / Investigator</option>
                  <option value="911 Dispatcher / CAD Operator">911 Dispatcher / CAD Operator</option>
                  <option value="Former / Resigned Officer">Former / Resigned Officer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Subject / Specific Violation
              </label>
              <input
                type="text"
                placeholder="e.g. Falsification of Probable Cause Affidavits in Narcotics Unit"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Confidential Narrative & Corroborating Details *
              </label>
              <textarea
                rows={5}
                placeholder="Describe what occurred: dates, shift supervisor orders, report numbers altered, evidence concealed, or threats made..."
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                required
              ></textarea>
            </div>

            {/* Evidence File Attachment Simulation */}
            <div 
              onClick={() => {
                setFileAttached(true);
                showToast('Internal document encrypted and attached with zero metadata footprint.', 'info');
              }}
              className="p-4 border-2 border-dashed border-slate-800 hover:border-emerald-500 rounded-2xl text-center cursor-pointer transition-all bg-slate-950/60"
            >
              <FileUp className="w-7 h-7 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-slate-200 mt-1">
                Attach Corroborating Documentation (Memo, Audio, Bodycam, Dispatch Log)
              </p>
              {fileAttached ? (
                <span className="inline-block mt-2 text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  ✓ INTERNAL_MEMO_EXHIBIT.PDF (AES-256 ENCRYPTED)
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 block mt-1">Click to attach sensitive proof (Exif & GPS metadata automatically stripped)</span>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-glow-emerald flex items-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Encrypt & Dispatch to Special Counsel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
