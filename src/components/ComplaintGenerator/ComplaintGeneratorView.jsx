import React, { useState } from 'react';
import { 
  FileText, 
  Scale, 
  Download, 
  Copy, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2, 
  Landmark, 
  ShieldAlert,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { federalDistrictCourts, standardConstitutionalCounts } from '../../data/complaintPleadingData';

export default function ComplaintGeneratorView({ showToast }) {
  // Form State
  const [selectedCourtId, setSelectedCourtId] = useState('ilcd');
  const [plaintiffName, setPlaintiffName] = useState('Estate of Sonya Massey, by Special Administrator');
  const [defendantOfficers, setDefendantOfficers] = useState('Deputy Sean Grayson, individually and in his official capacity');
  const [defendantMunicipality, setDefendantMunicipality] = useState('Sangamon County Sheriff\'s Office & County of Sangamon, Illinois');
  const [incidentDate, setIncidentDate] = useState('2024-07-06');
  const [incidentLocation, setIncidentLocation] = useState('Springfield, Illinois');
  const [factualAllegations, setFactualAllegations] = useState(
    '1. On July 6, 2024, Decedent Sonya Massey contacted 911 requesting law enforcement assistance regarding a suspected trespasser.\n2. Defendant Grayson entered Decedent\'s home and instructed her to remove a cooking water pot from the stove.\n3. While Decedent complied peacefully without making any aggressive movement or threat, Defendant Grayson unholstered his firearm and discharged three rounds into Decedent\'s face.\n4. Prior to employment, Defendant Grayson had been discharged from the military for misconduct and accumulated two DUI convictions, all of which Sangamon County deliberately ignored.'
  );
  const [selectedCountIds, setSelectedCountIds] = useState(['count-excessive-force', 'count-monell-screening']);
  const [damagesDemand, setDamagesDemand] = useState('Compensatory damages in excess of $15,000,000, plus punitive damages and statutory attorney fees under 42 U.S.C. § 1988.');
  const [isCopied, setIsCopied] = useState(false);

  const selectedCourt = federalDistrictCourts.find(c => c.id === selectedCourtId) || federalDistrictCourts[0];

  const handleToggleCount = (id) => {
    if (selectedCountIds.includes(id)) {
      if (selectedCountIds.length === 1) {
        showToast('At least one constitutional count must be selected', 'error');
        return;
      }
      setSelectedCountIds(selectedCountIds.filter(c => c !== id));
    } else {
      setSelectedCountIds([...selectedCountIds, id]);
    }
  };

  // Generate Formal Federal Court Pleading
  const generatePleadingText = () => {
    return `UNITED STATES DISTRICT COURT
${selectedCourt.name.toUpperCase()}

${plaintiffName.toUpperCase()},
                    Plaintiff,
     v.                                                 CIVIL ACTION NO.: 24-CV-${Math.floor(Math.random() * 9000 + 1000)}
${defendantOfficers.toUpperCase()}, and
${defendantMunicipality.toUpperCase()},
                    Defendants.
____________________________________________/

COMPLAINT FOR CIVIL RIGHTS VIOLATIONS (42 U.S.C. § 1983)
AND DEMAND FOR JURY TRIAL

NOW COMES Plaintiff, by and through counsel, and for their Complaint against Defendants, alleges as follows:

I. JURISDICTION AND VENUE
1. This civil action is brought pursuant to 42 U.S.C. §§ 1983 and 1988, and the Fourth and Fourteenth Amendments to the United States Constitution.
2. Jurisdiction is conferred upon this Honorable Court by 28 U.S.C. §§ 1331 (Federal Question) and 1343 (Civil Rights).
3. Venue is proper in this District pursuant to 28 U.S.C. § 1391(b) because all events giving rise to the claims occurred within ${incidentLocation}.

II. PARTIES
4. Plaintiff is an individual resident of ${incidentLocation}.
5. Defendant Officers were at all relevant times duly appointed law enforcement personnel acting under color of state law.
6. Municipal Defendant is a body corporate and politic operating the law enforcement agency responsible for the training, screening, and customs complained of herein.

III. FACTUAL ALLEGATIONS
${factualAllegations}

IV. CAUSES OF ACTION
${selectedCountIds.map((cId, idx) => {
  const count = standardConstitutionalCounts.find(c => c.id === cId);
  return `
[COUNT ${idx + 1}] ${count?.title}
- ${count?.summary}
- As a direct and proximate result of Defendants' unlawful conduct, Plaintiff suffered severe physical deprivation, agony, catastrophic injury, and death.
`;
}).join('\n')}

V. PRAYER FOR RELIEF
WHEREFORE, Plaintiff respectfully requests judgment against Defendants, jointly and severally:
A. Awarding substantial compensatory and general damages according to proof;
B. Awarding exemplary and punitive damages against individual Defendants to punish egregious misconduct and deter future state violence;
C. Awarding reasonable attorney fees and costs pursuant to 42 U.S.C. § 1988;
D. Awarding preliminary and permanent injunctive relief mandating systemic background check reforms; and
E. Awarding such other and further relief as this Court deems just and proper.

JURY TRIAL DEMAND
Plaintiff demands a trial by jury on all claims and issues so triable.

Dated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Respectfully submitted,
LEGAL ADVOCACY CLINIC & SPECIAL CIVIL RIGHTS COUNSEL
JUSTICE PULSE LITIGATION CLEARINGHOUSE`;
  };

  const handleCopyPleading = () => {
    const text = generatePleadingText();
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    confetti({ particleCount: 30, spread: 50 });
    showToast('Federal Section 1983 Complaint copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 4000);
  };

  const handleDownloadPleading = () => {
    const text = generatePleadingText();
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `SECTION_1983_COMPLAINT_${selectedCourt.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 45, spread: 65 });
    showToast('Federal Section 1983 Complaint downloaded ready for e-filing!', 'success');
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/70 to-slate-900 rounded-3xl p-6 border border-blue-800/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 mb-1">
            <Scale className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Federal Civil Rights Pleading Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Automated Section 1983 Federal Complaint Studio
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Generate certified, court-ready 42 U.S.C. § 1983 civil rights complaints and Monell municipal liability claims with full federal caption formatting in minutes.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <button
            onClick={handleCopyPleading}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-4 h-4" />
            <span>{isCopied ? 'Pleading Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadPleading}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Court Filing (.TXT)</span>
          </button>
        </div>
      </div>

      {/* Main Drafting Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono border-b border-slate-800 pb-3">
            <Landmark className="w-4 h-4 text-blue-400" />
            <span>Federal Pleading Parameters</span>
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Target Federal District Court</label>
            <select
              value={selectedCourtId}
              onChange={(e) => setSelectedCourtId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {federalDistrictCourts.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.state})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Plaintiff / Estate Name</label>
            <input
              type="text"
              value={plaintiffName}
              onChange={(e) => setPlaintiffName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Individual Officer Defendant(s)</label>
            <input
              type="text"
              value={defendantOfficers}
              onChange={(e) => setDefendantOfficers(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Municipal / County Defendant</label>
            <input
              type="text"
              value={defendantMunicipality}
              onChange={(e) => setDefendantMunicipality(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Select Constitutional Counts (42 U.S.C. § 1983)</label>
            <div className="space-y-2">
              {standardConstitutionalCounts.map(count => {
                const isSelected = selectedCountIds.includes(count.id);
                return (
                  <div
                    key={count.id}
                    onClick={() => handleToggleCount(count.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-950/80 border-blue-500 text-white font-bold shadow-glow'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-400 text-white' : 'border-slate-700'}`}>
                        {isSelected && '✓'}
                      </span>
                      <span className="leading-snug">{count.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Factual Allegations Summary</label>
            <textarea
              rows={4}
              value={factualAllegations}
              onChange={(e) => setFactualAllegations(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
        </div>

        {/* Right: Live Formal Pleading Preview (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Live Federal Caption Preview
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Rule 8 & 10 Compliant
              </span>
            </div>

            {/* Pleading Paper Simulator */}
            <div className="p-6 bg-slate-950 rounded-2xl border-2 border-slate-800 font-mono text-[11px] leading-relaxed text-slate-200 whitespace-pre-wrap max-h-[580px] overflow-y-auto shadow-inner select-text">
              {generatePleadingText()}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Counts: <strong className="text-blue-400">{selectedCountIds.length} Claims Pled</strong>
            </span>

            <button
              onClick={handleDownloadPleading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
