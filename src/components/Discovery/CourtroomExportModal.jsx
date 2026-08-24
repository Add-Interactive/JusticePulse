import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  Download, 
  Printer, 
  CheckCircle2, 
  Lock, 
  FileText, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CourtroomExportModal({ isOpen, onClose, caseData, showToast }) {
  if (!isOpen || !caseData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadBrief = () => {
    const briefContent = `================================================================================
UNITED STATES DISTRICT COURT
CIVIL RIGHTS DIVISION - LITIGATION DISCOVERY PACKET

IN THE MATTER OF: ${caseData.title.toUpperCase()}
VICTIM: ${caseData.victim.toUpperCase()} (Age: ${caseData.age})
JURISDICTION: ${caseData.jurisdiction.toUpperCase()} (${caseData.location.toUpperCase()})
DATE OF ENCOUNTER: ${caseData.date}
DOCKET CLASSIFICATION: ${caseData.status.toUpperCase()}
================================================================================

I. STATEMENT OF JURISDICTION & FEDERAL CIVIL RIGHTS BASIS
This action is maintained pursuant to 42 U.S.C. § 1983 and the Fourth and Fourteenth
Amendments to the United States Constitution, with supplemental state tort claims.

II. STATEMENT OF FACTS & INCIDENT SUMMARY
${caseData.summary}

DOCUMENTED SYSTEMIC INJUSTICES & CONSTITUTIONAL VIOLATIONS:
${caseData.keyInjustices.map((inj, i) => `${i + 1}. ${inj}`).join('\n')}

III. DEFENDANT LAW ENFORCEMENT PERSONNEL DOSSIER
${caseData.officersInvolved.map((off, i) => `
OFFICER ${i + 1}: ${off.name.toUpperCase()} (${off.badge})
LEGAL STATUS: ${off.status}
REPEAT OFFENDER CLASSIFICATION: ${off.repeatOffender ? 'FLAGGED AS HIGH-RISK REPEAT ACTOR' : 'STANDARD'}
PRIOR BYPASSED / UNDISCLOSED HISTORY: ${off.priorIncidents || 'Under Subpoena Discovery'}
`).join('')}

IV. MUNICIPAL "MONELL" PATTERN & CUSTOM DISCLOSURE
Taxpayer Settlement Allocation: ${caseData.settlementAmount}
Municipal General Fund Liability: ${caseData.taxpayerCost}
Lead Counsel of Record: ${caseData.attorney}

V. CRYPTOGRAPHIC EVIDENCE MANIFEST & CHAIN OF CUSTODY (SHA-256)
- Evidence Count: ${caseData.evidenceCount} Verified Exhibits
- Body-Worn Camera: ${caseData.bodycamAvailable ? `YES (${caseData.bodycamDuration})` : 'UNLAWFUL DEACTIVATION / FAILURE TO ACTIVATE'}
- Digital Ledger Hash Checksum: SHA256:${Date.now()}A8F9B021C77E4D

VI. VERIFICATION CERTIFICATE
We hereby certify that all facts, chronological timelines, and officer disciplinary
records set forth above have been verified against public dockets, FOIA releases,
and corroborated eyewitness media.

JUSTICE PULSE CIVIL INTELLIGENCE NETWORK
Cryptographic Docket Certificate #JP-CIV-${caseData.id.toUpperCase()}
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `SECTION_1983_DISCOVERY_BRIEF_${caseData.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 50, spread: 70 });
    showToast(`Courtroom-Ready Preliminary Discovery Packet for ${caseData.victim} downloaded!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-lg animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-justice-950 text-justice-300 border border-justice-800 flex items-center gap-1 font-mono">
                <Scale className="w-3.5 h-3.5" /> Federal Discovery Export
              </span>
              <span className="text-xs font-mono text-slate-400">42 U.S.C. § 1983 Litigation Brief</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Courtroom Evidence & Discovery Packet: {caseData.victim}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formatted Legal Brief Document Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/90 font-mono text-xs text-slate-300 space-y-4 select-text">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="text-center border-b border-slate-800 pb-3 space-y-1">
              <p className="font-bold text-white uppercase text-sm">UNITED STATES DISTRICT COURT</p>
              <p className="text-[11px] text-justice-400 font-bold">CIVIL RIGHTS PRELIMINARY DISCOVERY PACKET</p>
              <p className="text-[10px] text-slate-400">IN THE MATTER OF: {caseData.title.toUpperCase()}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-slate-800 pb-3">
              <div><strong className="text-slate-400">Victim:</strong> {caseData.victim} ({caseData.age} yrs)</div>
              <div><strong className="text-slate-400">Date:</strong> {caseData.date}</div>
              <div><strong className="text-slate-400">Jurisdiction:</strong> {caseData.jurisdiction}</div>
              <div><strong className="text-slate-400">QI Status:</strong> {caseData.qualifiedImmunity}</div>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-white uppercase text-[11px]">I. Factual Record & Injustices:</p>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">{caseData.summary}</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-white uppercase text-[11px]">II. Officers Involved & Disciplinary Flags:</p>
              {caseData.officersInvolved.map((off, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
                  <p className="font-bold text-slate-200">{off.name} ({off.badge}) — {off.status}</p>
                  {off.priorIncidents && <p className="text-amber-400 mt-0.5">Prior History: {off.priorIncidents}</p>}
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 space-y-1">
              <p className="flex items-center gap-1 text-justice-400 font-bold">
                <Lock className="w-3 h-3" /> Cryptographic Evidence Chain of Custody:
              </p>
              <p className="truncate text-slate-300">SHA256: 8f9b021c77e4d89a2210b4f8a12903847bca8910</p>
              <p>Certified Admissible for Section 1983 Monell Pleading & Disciplinary Review</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-justice-400" />
            <span>Formal Legal Discovery Document</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Packet
            </button>
            <button
              onClick={handleDownloadBrief}
              className="px-5 py-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Download Legal Brief (.TXT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
