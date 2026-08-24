import React, { useState } from 'react';
import { 
  Scale, 
  Gavel, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  RotateCcw, 
  ChevronRight, 
  Award,
  User,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { depositionWitnesses } from '../../data/depositionSimulatorData';

export default function DepositionSimulatorView({ showToast }) {
  const [witnesses, setWitnesses] = useState(depositionWitnesses);
  const [activeWitnessId, setActiveWitnessId] = useState('wit-grayson');
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [impeachmentScore, setImpeachmentScore] = useState(0);
  const [isCrossComplete, setIsCrossComplete] = useState(false);

  const activeWitness = witnesses.find(w => w.id === activeWitnessId) || witnesses[0];

  const handleAskQuestion = (line) => {
    if (askedQuestionIds.includes(line.id)) return;

    setAskedQuestionIds([...askedQuestionIds, line.id]);
    const newScore = Math.min(100, impeachmentScore + line.scoreBoost);
    setImpeachmentScore(newScore);

    confetti({ particleCount: 35, spread: 50 });
    showToast(`Impeachment evidence presented! +${line.scoreBoost} Credibility Strike`, 'success');

    if (askedQuestionIds.length + 1 >= activeWitness.crossExaminationLines.length) {
      setIsCrossComplete(true);
      confetti({ particleCount: 75, spread: 80 });
      showToast('Cross-Examination Complete! Witness successfully impeached on the record.', 'success');
    }
  };

  const handleResetCross = () => {
    setAskedQuestionIds([]);
    setImpeachmentScore(0);
    setIsCrossComplete(false);
    showToast('Deposition session reset', 'info');
  };

  const handleExportTranscript = () => {
    const transcriptText = `================================================================================
JUSTICE PULSE — OFFICIAL DEPOSITION & CROSS-EXAMINATION TRANSCRIPT
WITNESS: ${activeWitness.name.toUpperCase()}
CASE: ${activeWitness.caseTitle.toUpperCase()}
DATE OF EXAMINATION: ${new Date().toLocaleString()}
IMPEACHMENT RATING: ${impeachmentScore}% CONSTITUTIONAL IMPEACHMENT ESTABLISHED
================================================================================

I. WITNESS BACKGROUND & STATUS:
- Classification: ${activeWitness.status}
- Background Summary: ${activeWitness.background}

II. RECORDED CROSS-EXAMINATION & IMPEACHMENT EXHIBITS:
${activeWitness.crossExaminationLines.map((line, idx) => `
[Q #${idx + 1}] COUNSEL: ${line.question}
WITNESS: "${line.witnessResponse}"

IMPEACHMENT EXHIBIT: ${line.impeachmentEvidence}
JUDICIAL RULING: ${line.judgeRuling}
`).join('\n')}

================================================================================
Certified Under Federal Rules of Civil Procedure (Rule 30)
Prepared for Section 1983 Federal Civil Trial & Monell Municipal Briefing
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `DEPOSITION_TRANSCRIPT_${activeWitness.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 40, spread: 60 });
    showToast('Official Deposition Transcript exported for trial brief!', 'success');
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/70 to-slate-900 rounded-3xl p-6 border border-rose-800/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 mb-1">
            <Scale className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Veritas Deposition & Cross-Examination Room</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Interactive AI Courtroom Deposition Simulator
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Practice cross-examining officers, detectives, and municipal supervisors using real case evidence, confronting sworn statements with bodycam exhibits and FOIA disclosures.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/90 p-3 rounded-2xl border border-rose-800/50 flex-shrink-0">
          <Gavel className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Impeachment Score</span>
            <p className="text-sm font-black font-mono text-emerald-400">{impeachmentScore}% / 100%</p>
          </div>
        </div>
      </div>

      {/* Witness Selector Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-1">
        {witnesses.map(w => (
          <button
            key={w.id}
            onClick={() => {
              setActiveWitnessId(w.id);
              handleResetCross();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2.5 ${
              activeWitnessId === w.id
                ? 'bg-rose-600 text-white shadow-glow'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{w.name}</span>
          </button>
        ))}
      </div>

      {/* Main Deposition Room Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Witness Box & Dossier (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-5 space-y-4 shadow-2xl flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                Under Sworn Oath
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {activeWitness.exhibitCount} Exhibits
              </span>
            </div>

            <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-950 border border-slate-800">
              <img
                src={activeWitness.avatar}
                alt={activeWitness.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-300 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-800">
                {activeWitness.role}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-white font-display leading-snug">{activeWitness.name}</h3>
              <p className="text-xs text-rose-400 font-semibold">{activeWitness.caseTitle}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p className="font-mono text-[10px] text-slate-400 uppercase font-bold mb-1">Witness Profile:</p>
              {activeWitness.background}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleResetCross}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Cross
            </button>

            <button
              onClick={handleExportTranscript}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-glow"
            >
              <Download className="w-3.5 h-3.5" /> Transcript
            </button>
          </div>
        </div>

        {/* Right: Courtroom Cross-Examination Dialogue & Evidence Impeachment (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-mono">
                <Gavel className="w-4 h-4 text-amber-400" />
                <span>Courtroom Examination Record (Rule 30 Deposition)</span>
              </h4>
              <span className="text-[11px] font-mono text-emerald-400">
                {askedQuestionIds.length} of {activeWitness.crossExaminationLines.length} Questions Asked
              </span>
            </div>

            {/* Questions to Ask & Confront */}
            <div className="space-y-4">
              {activeWitness.crossExaminationLines.map((line, idx) => {
                const isAsked = askedQuestionIds.includes(line.id);

                return (
                  <div
                    key={line.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      isAsked
                        ? 'bg-slate-950 border-emerald-800/80 shadow-xl'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Question Header & Button */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.2 rounded border border-amber-800">
                          QUESTION #{idx + 1}
                        </span>
                        <p className="text-xs font-bold text-white mt-1 leading-snug">
                          {line.question}
                        </p>
                      </div>

                      {!isAsked ? (
                        <button
                          onClick={() => handleAskQuestion(line)}
                          className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-glow flex-shrink-0 flex items-center gap-1"
                        >
                          <span>Confront Witness</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800 flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3" /> Impeached
                        </span>
                      )}
                    </div>

                    {/* Witness Response & Impeachment Evidence (Shown when asked) */}
                    {isAsked && (
                      <div className="pt-2 border-t border-slate-800 space-y-2 animation-fade-in text-xs">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-300">
                          <strong className="text-rose-400 font-mono">WITNESS SWORN STATEMENT:</strong>
                          <p className="mt-0.5 italic">"{line.witnessResponse}"</p>
                        </div>

                        <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-emerald-300 space-y-1">
                          <strong className="font-mono flex items-center gap-1.5 text-emerald-400">
                            <Sparkles className="w-3.5 h-3.5" /> CONFRONTING IMPEACHMENT EVIDENCE:
                          </strong>
                          <p className="text-slate-200 leading-relaxed">{line.impeachmentEvidence}</p>
                        </div>

                        <div className="p-2.5 bg-amber-950/40 rounded-xl border border-amber-800/60 text-amber-300 text-[11px] font-mono">
                          <strong>JUDGE BENCH RULING:</strong> {line.judgeRuling}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completion Card */}
          {isCrossComplete && (
            <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-2xl border border-emerald-700/60 flex items-center justify-between animation-fade-in mt-4">
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-emerald-400 animate-bounce" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Full Deposition Impeachment Complete</h4>
                  <p className="text-[11px] text-slate-300">All officer statements successfully countered with documented physical exhibits.</p>
                </div>
              </div>

              <button
                onClick={handleExportTranscript}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald"
              >
                Download Certified Transcript
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
