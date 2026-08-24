import React, { useState } from 'react';
import { 
  Landmark, 
  FileText, 
  Send, 
  Copy, 
  CheckCircle2, 
  Users, 
  ExternalLink, 
  Sparkles,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { pendingLegislation } from '../../data/legislationData';

export default function LegislationTrackerView({ currentUser, showToast }) {
  const [selectedBill, setSelectedBill] = useState(pendingLegislation[0]);
  const [constituentName, setConstituentName] = useState(currentUser.name);
  const [zipCode, setZipCode] = useState('62701');
  const [letterCopied, setLetterCopied] = useState(false);

  const generatedConstituentLetter = `Subject: URGENT: Co-sponsor and Pass ${selectedBill.title} (${selectedBill.billNumber})

To the Office of the Honorable Senator / Representative,

As a registered voter and constituent residing in ZIP Code ${zipCode}, I am writing to demand your immediate, full sponsorship and affirmative floor vote in support of ${selectedBill.title} (${selectedBill.billNumber}).

Key reasons why this legislation is imperative for our community:
1. Accountability & Transparency: Over $3.2B of public tax dollars have been diverted to settle police misconduct claims while bad actors evade individual responsibility.
2. Constitutional Fidelity: Ending doctrines like Qualified Immunity and creating mandatory national decertification registries will restore public trust and protect civil rights.
3. Core Provisions Needed:
   - ${selectedBill.keyProvisions.join('\n   - ')}

Our community expects proactive leadership on equal justice. I look forward to receiving your written response detailing your position on ${selectedBill.billNumber}.

Respectfully submitted,

${constituentName}
Constituent & Member, JusticePulse Civic Accountability Coalition
ZIP Code: ${zipCode}`;

  const handleCopyLetter = () => {
    navigator.clipboard?.writeText(generatedConstituentLetter);
    setLetterCopied(true);
    confetti({ particleCount: 40, spread: 60 });
    showToast(`Constituent Demand Letter for ${selectedBill.billNumber} copied to clipboard!`, 'success');
    setTimeout(() => setLetterCopied(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-2xl p-6 border border-indigo-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-indigo-400 mb-1">
          <Landmark className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">Capitol & Legislative Accountability Tracker</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Federal & State Police Reform Legislation Monitor
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Track active bills abolishing Qualified Immunity, establishing mandatory national decertification registries, and banning no-knock warrants. Mobilize constituent demand letters in one click.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bills List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Priority Reform Legislation:
          </span>
          {pendingLegislation.map(bill => {
            const isSelected = selectedBill.id === bill.id;
            return (
              <div
                key={bill.id}
                onClick={() => setSelectedBill(bill)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-2 shadow-xl ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-glow'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">{bill.billNumber}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-semibold">
                    {bill.level}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{bill.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{bill.summary}</p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="text-emerald-400">{bill.cosponsorsCount} Cosponsors</span>
                  <span className="truncate max-w-[160px]">{bill.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Bill Details & Letter Generator (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-5 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-indigo-400">{selectedBill.billNumber}</span>
                <span className="text-xs text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                  Status: {selectedBill.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-1">{selectedBill.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Primary Sponsor: <strong className="text-slate-200">{selectedBill.sponsor}</strong></p>
            </div>

            {/* Key Provisions */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Statutory Provisions:</h5>
              <ul className="space-y-1.5">
                {selectedBill.keyProvisions.map((prov, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{prov}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Constituent Input Fields */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={constituentName}
                  onChange={(e) => setConstituentName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Your ZIP Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-100 font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Generated Letter Preview */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto">
              {generatedConstituentLetter}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Constituent Letter Ready for Senate/House Webform
            </span>

            <button
              onClick={handleCopyLetter}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center space-x-1.5 transition-all"
            >
              <Copy className="w-4 h-4" />
              <span>{letterCopied ? 'Letter Copied to Clipboard!' : 'Copy Letter to Congress'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
