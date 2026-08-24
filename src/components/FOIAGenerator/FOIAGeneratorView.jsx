import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Copy, 
  Download, 
  Building, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FOIAGeneratorView({ showToast }) {
  const [stateCode, setStateCode] = useState('IL');
  const [department, setDepartment] = useState('Sangamon County Sheriff\'s Office');
  const [requesterName, setRequesterName] = useState('Jane Doe (Civilian Legal Observer)');
  const [requesterEmail, setRequesterEmail] = useState('records.request@citizenswatch.org');
  const [incidentDate, setIncidentDate] = useState('2024-07-06');
  const [incidentLocation, setIncidentLocation] = useState('Springfield, IL');
  const [officerInfo, setOfficerInfo] = useState('Deputy Sean Grayson (Badge #142)');
  const [cadNumber, setCadNumber] = useState('CAD-2024-09812');
  const [includeBodycam, setIncludeBodycam] = useState(true);
  const [includeAudio, setIncludeAudio] = useState(true);
  const [includeIAHistory, setIncludeIAHistory] = useState(true);
  const [includeUseOfForce, setIncludeUseOfForce] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const stateStatutes = {
    IL: { name: 'Illinois', act: 'Illinois Freedom of Information Act (5 ILCS 140/1 et seq.)', deadline: '5 business days' },
    CA: { name: 'California', act: 'California Public Records Act (Cal. Gov. Code § 7920.000 et seq.) & SB 1421 / SB 16', deadline: '10 calendar days' },
    NY: { name: 'New York', act: 'New York Freedom of Information Law (NY POL § 87 et seq.) & Repeal of 50-a', deadline: '5 business days' },
    TX: { name: 'Texas', act: 'Texas Public Information Act (Tex. Gov. Code § 552.001 et seq.)', deadline: '10 business days' },
    CO: { name: 'Colorado', act: 'Colorado Open Records Act (C.R.S. § 24-72-201 et seq.) & SB 20-217', deadline: '3 business days' },
    TN: { name: 'Tennessee', act: 'Tennessee Open Records Act (T.C.A. § 10-7-503 et seq.)', deadline: '7 business days' },
    KY: { name: 'Kentucky', act: 'Kentucky Open Records Act (KRS 61.870 to 61.884)', deadline: '5 business days' },
    OH: { name: 'Ohio', act: 'Ohio Public Records Act (R.C. 149.43)', deadline: 'Promptly / Reasonable period' },
    MN: { name: 'Minnesota', act: 'Minnesota Government Data Practices Act (Minn. Stat. § 13.01 et seq.)', deadline: 'Promptly / 10 business days' },
    GA: { name: 'Georgia', act: 'Georgia Open Records Act (O.C.G.A. § 50-18-70 et seq.)', deadline: '3 business days' }
  };

  const currentStatute = stateStatutes[stateCode] || stateStatutes.IL;

  const generatedLetter = `FREEDOM OF INFORMATION / PUBLIC RECORDS ACT FORMAL DEMAND

Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
To: Freedom of Information Officer / Records Custodian
Agency: ${department}
State Jurisdiction: ${currentStatute.name}

Re: Formal Public Records Demand pursuant to the ${currentStatute.act}

Dear Records Access Officer:

Pursuant to the ${currentStatute.act}, I hereby formally demand the inspection and electronic copies of the following public records within your custody and control regarding an incident occurring on or about ${incidentDate} at or near ${incidentLocation}:

DEMANDED RECORD CATEGORIES:
${includeBodycam ? `1. UNREDACTED BODY-WORN CAMERA (BWC) & DASHBOARD CAMERA FOOTAGE: All video recordings captured by any and all law enforcement personnel present on scene, including but not limited to ${officerInfo}.` : ''}
${includeAudio ? `2. 911 AUDIO & COMPUTER-AIDED DISPATCH (CAD) LOGS: All incoming 911 calls, radio dispatches, telemetry logs, and incident transmissions (Incident/CAD Reference: ${cadNumber}).` : ''}
${includeUseOfForce ? `3. USE OF FORCE & SUPERVISORY REVIEWS: All initial incident reports, arrest narratives, supervisor review memos, and weapon deployment logs.` : ''}
${includeIAHistory ? `4. INTERNAL AFFAIRS & DISCIPLINARY DOSSIER: Complete personnel record, prior excessive force complaints, sustained internal affairs findings, and prior agency employment certifications for ${officerInfo}.` : ''}

FEE WAIVER / PUBLIC INTEREST DISCLOSURE:
Disclosure of these records is in the paramount public interest and will contribute significantly to public understanding of government operations and civil rights compliance. As this request is submitted for civic oversight and educational purposes, I respectfully request a complete waiver of all reproduction search and copying fees.

STATUTORY DEADLINE FOR COMPLIANCE:
Under the ${currentStatute.act}, your office is required to respond to this request within ${currentStatute.deadline}. If any portion of this request is denied or redacted, please cite the exact statutory exemption claimed and provide the contact information for the public records appeals officer.

Respectfully submitted,

${requesterName}
Email for Electronic Delivery: ${requesterEmail}
National Police Accountability & Civic Intelligence Network`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedLetter);
    setIsCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast('Formal FOIA Demand Letter copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 4000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `FOIA_DEMAND_${department.replace(/[^a-zA-Z0-9]/g, '_')}_${incidentDate}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('FOIA letter downloaded as text file!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-justice-950/70 to-slate-900 rounded-2xl p-6 border border-justice-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-justice-400 mb-1">
          <FileText className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Automated Legal Discovery Engine</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          State FOIA & Bodycam Public Records Generator
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Instantly generate legally binding public records demands citing specific state statutes, statutory deadlines, fee waiver exemptions, and penalty provisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl border border-slate-800 p-5 sm:p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-justice-400" />
            1. Target Agency & Incident Details
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">State Jurisdiction</label>
            <select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
            >
              {Object.entries(stateStatutes).map(([code, data]) => (
                <option key={code} value={code}>{data.name} ({code}) — {data.deadline}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Police Department / Sheriff Office</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Incident Date</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Location</label>
              <input
                type="text"
                value={incidentLocation}
                onChange={(e) => setIncidentLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Officer Name & Badge #</label>
            <input
              type="text"
              value={officerInfo}
              onChange={(e) => setOfficerInfo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
            />
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase">Records to Demand</label>
            <div className="space-y-1.5 text-xs text-slate-300">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBodycam}
                  onChange={(e) => setIncludeBodycam(e.target.checked)}
                  className="rounded border-slate-700 text-justice-500"
                />
                <span>Uncut Bodycam & Cruiser Dashcam</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAudio}
                  onChange={(e) => setIncludeAudio(e.target.checked)}
                  className="rounded border-slate-700 text-justice-500"
                />
                <span>911 Audio & CAD Telemetry Logs</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeIAHistory}
                  onChange={(e) => setIncludeIAHistory(e.target.checked)}
                  className="rounded border-slate-700 text-justice-500"
                />
                <span>Officer Internal Affairs & Disciplinary History</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUseOfForce}
                  onChange={(e) => setIncludeUseOfForce(e.target.checked)}
                  className="rounded border-slate-700 text-justice-500"
                />
                <span>Use of Force Supervisor Review</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Area: Real-Time Legal Preview (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-justice-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Generated Legal Demand ({currentStatute.act.split('(')[0]})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Statutory Deadline: {currentStatute.deadline}
            </span>
          </div>

          {/* Letter Preview Box */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto selection:bg-justice-500 selection:text-white">
            {generatedLetter}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-justice-400" />
              <span>Court-Admissible Legal Template</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save (.TXT)</span>
              </button>
              <button
                onClick={handleCopy}
                className="px-5 py-2 bg-gradient-to-r from-justice-600 to-justice-500 hover:from-justice-500 hover:to-justice-400 text-white rounded-xl text-xs font-bold shadow-glow flex items-center space-x-1.5 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Formal Letter'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
