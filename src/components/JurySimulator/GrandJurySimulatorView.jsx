import React, { useState } from 'react';
import { 
  Users, 
  Gavel, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Vote,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialGrandJuryCases } from '../../data/jurySimulatorData';

export default function GrandJurySimulatorView({ showToast }) {
  const [cases, setCases] = useState(initialGrandJuryCases);
  const [activeCaseId, setActiveCaseId] = useState('gj-massey');
  const [userVotes, setUserVotes] = useState({}); // { [chargeId]: 'TRUE_BILL' | 'NO_BILL' }
  const [reviewedExhibitIds, setReviewedExhibitIds] = useState([]);
  const [hasSubmittedDeliberation, setHasSubmittedDeliberation] = useState(false);

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0];

  const handleVoteCharge = (chargeId, decision) => {
    setUserVotes({
      ...userVotes,
      [chargeId]: decision
    });
    showToast(`Voted ${decision === 'TRUE_BILL' ? 'TRUE BILL (Indict)' : 'NO BILL (Dismiss)'} on charge`, 'info');
  };

  const handleReviewExhibit = (exId) => {
    if (!reviewedExhibitIds.includes(exId)) {
      setReviewedExhibitIds([...reviewedExhibitIds, exId]);
      showToast('Exhibit reviewed and marked into deliberation record', 'success');
    }
  };

  const handleSubmitDeliberation = () => {
    const totalCharges = activeCase.chargesPled.length;
    const votedCharges = Object.keys(userVotes).length;

    if (votedCharges < totalCharges) {
      showToast(`Please vote on all ${totalCharges} charges before submitting verdict`, 'error');
      return;
    }

    setHasSubmittedDeliberation(true);
    confetti({ particleCount: 60, spread: 75, origin: { y: 0.6 } });
    showToast('Citizen Grand Jury Deliberation sealed and certified into national consensus!', 'success');
  };

  const handleExportVerdictBrief = () => {
    const reportText = `================================================================================
JUSTICE PULSE — CITIZEN GRAND JURY INDICTMENT DELIBERATION CERTIFICATE
CASE: ${activeCase.title.toUpperCase()}
DEFENDANT: ${activeCase.defendant.toUpperCase()}
DATE OF DELIBERATION: ${new Date().toLocaleString()}
================================================================================

I. CHARGES & JURY VERDICT:
${activeCase.chargesPled.map((ch, idx) => `
[COUNT #${idx + 1}] ${ch.name}
- Statutory Penalty: ${ch.minSentence}
- YOUR GRAND JURY VOTE: ${userVotes[ch.id] || 'NOT VOTED'}
`).join('')}

II. EXHIBITS REVIEWED & ADMITTED:
${activeCase.exhibitsPresented.map(ex => `• ${ex.title}: ${ex.summary}`).join('\n')}

III. NATIONAL CITIZEN GRAND JURY CONSENSUS:
- Total True Bill (Indictment) Votes: ${activeCase.communityVotes.trueBill.toLocaleString()} (98.2%)
- Total No Bill (Dismissal) Votes: ${activeCase.communityVotes.noBill.toLocaleString()} (1.8%)

================================================================================
Certified Under Constitutional Grand Jury Procedures
Justice Pulse National Civic Courtroom Simulator
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `GRAND_JURY_VERDICT_${activeCase.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 35, spread: 55 });
    showToast('Grand Jury Indictment Brief exported!', 'success');
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/70 to-slate-900 rounded-3xl p-6 border border-purple-800/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 mb-1">
            <Users className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Citizen Grand Jury Chamber</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Grand Jury Indictment & Verdict Deliberator
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Review forensic evidence exhibits, evaluate statutory criminal charges against officers, and cast your official vote for a True Bill Indictment.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={activeCaseId}
            onChange={(e) => {
              setActiveCaseId(e.target.value);
              setUserVotes({});
              setReviewedExhibitIds([]);
              setHasSubmittedDeliberation(false);
            }}
            className="bg-slate-950 border border-purple-700/60 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-semibold"
          >
            {cases.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

          <button
            onClick={handleExportVerdictBrief}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Brief</span>
          </button>
        </div>
      </div>

      {/* Main Deliberation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Evidence Exhibits Review (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2 font-mono">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Admitted Grand Jury Exhibits</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono">
              {reviewedExhibitIds.length} of {activeCase.exhibitsPresented.length} Examined
            </span>
          </div>

          <div className="space-y-3">
            {activeCase.exhibitsPresented.map((ex, idx) => {
              const isExamined = reviewedExhibitIds.includes(ex.id);

              return (
                <div
                  key={ex.id}
                  onClick={() => handleReviewExhibit(ex.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isExamined
                      ? 'bg-slate-950 border-purple-600/80 shadow-glow'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.2 rounded border border-amber-800">
                      EXHIBIT #{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 flex items-center gap-1">
                      {isExamined ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Eye className="w-3.5 h-3.5" />}
                      {isExamined ? 'Examined' : 'Click to Examine'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{ex.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{ex.summary}</p>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1 font-mono text-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-500">Defendant on Trial:</span>
            <p className="text-white font-bold">{activeCase.defendant}</p>
          </div>
        </div>

        {/* Right: Charge Voting & Community Consensus (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono">
                <Gavel className="w-4 h-4 text-amber-400" />
                <span>Indictment Charge Ballot (Rule 6 Grand Jury)</span>
              </h3>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                12 of 16 Votes Needed for True Bill
              </span>
            </div>

            {/* List of Charges to Vote */}
            <div className="space-y-3.5">
              {activeCase.chargesPled.map((ch, idx) => {
                const decision = userVotes[ch.id];

                return (
                  <div key={ch.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                          COUNT #{idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-0.5">{ch.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                          Statutory Penalty: {ch.minSentence}
                        </span>
                      </div>
                    </div>

                    {/* True Bill / No Bill Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleVoteCharge(ch.id, 'TRUE_BILL')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                          decision === 'TRUE_BILL'
                            ? 'bg-emerald-600 text-white shadow-glow-emerald border border-emerald-400'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-emerald-950 hover:text-emerald-300'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>TRUE BILL (Indict)</span>
                      </button>

                      <button
                        onClick={() => handleVoteCharge(ch.id, 'NO_BILL')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                          decision === 'NO_BILL'
                            ? 'bg-crimson-600 text-white shadow-glow-crimson border border-crimson-400'
                            : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-crimson-950 hover:text-crimson-300'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>NO BILL (Dismiss)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* National Consensus Bar */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Vote className="w-4 h-4 text-purple-400" /> National Citizen Grand Jury Consensus:
                </span>
                <span className="text-emerald-400 font-bold">
                  {activeCase.communityVotes.trueBill.toLocaleString()} True Bill (98.2%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '98.2%' }}></div>
                <div className="bg-crimson-500 h-full" style={{ width: '1.8%' }}></div>
              </div>
            </div>
          </div>

          {/* Submit Deliberation Button */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              {Object.keys(userVotes).length} of {activeCase.chargesPled.length} Charges Voted
            </span>

            <button
              onClick={handleSubmitDeliberation}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow-indigo flex items-center gap-1.5 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>{hasSubmittedDeliberation ? 'Deliberation Sealed ✓' : 'Submit Grand Jury Verdict'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
