import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertOctagon, 
  Scale, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  HelpCircle,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EncounterTrainingSimulatorModal({ isOpen, onClose, showToast }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  if (!isOpen) return null;

  const trainingQuestions = [
    {
      id: 'q-1',
      scenario: 'ICE At Your Front Door at 6:00 AM',
      context: 'Two armed ICE agents knock loudly on your front door, announce "Police!", and hold up a document against the window. What is the legally correct action?',
      options: [
        {
          text: 'Open the door slightly to speak with them and examine the paper.',
          isCorrect: false,
          explanation: 'Incorrect. Opening the door even a crack can be legally argued as "voluntary implied consent" allowing agents to cross the threshold into your home.'
        },
        {
          text: 'Keep the door closed and locked. Speak through the closed door and ask them to slide the warrant under the door.',
          isCorrect: true,
          explanation: 'Correct! Under the 4th Amendment (Payton v. New York), agents cannot enter without a judicial warrant signed by a Judge. Speaking through the closed door preserves your constitutional rights.'
        },
        {
          text: 'Open the door and present your foreign passport immediately.',
          isCorrect: false,
          explanation: 'Incorrect. You have the 5th Amendment right to remain silent and are not required to disclose country of origin or immigration status.'
        }
      ]
    },
    {
      id: 'q-2',
      scenario: 'Tactical Squad Traffic Stop with Passengers',
      context: 'A specialized tactical police squad pulls over a vehicle for a broken taillight. An officer approaches the passenger side and demands the passenger disclose their immigration status. What are the passenger\'s rights?',
      options: [
        {
          text: 'The passenger must answer all questions about their birthplace and immigration history.',
          isCorrect: false,
          explanation: 'Incorrect. Passengers have the constitutional right under the 5th Amendment to remain silent.'
        },
        {
          text: 'The passenger may remain silent, state "I am choosing to remain silent", and is not required to answer status questions.',
          isCorrect: true,
          explanation: 'Correct! Only the driver is required to provide license and registration. Passengers have no obligation to discuss immigration status or origin.'
        },
        {
          text: 'The officer can hold the car indefinitely until ICE units arrive.',
          isCorrect: false,
          explanation: 'Incorrect. Under Rodriguez v. United States (575 U.S. 348), police cannot prolong a traffic stop beyond the time needed to address the traffic infraction.'
        }
      ]
    },
    {
      id: 'q-3',
      scenario: 'Youth Interrogation by School Resource Officer (SRO)',
      context: 'A 15-year-old student is escorted into the Dean\'s office where an armed School Resource Officer asks them to sign a written confession regarding an off-campus incident. What is the youth\'s constitutional protection?',
      options: [
        {
          text: 'Minors do not have Miranda rights while on school property.',
          isCorrect: false,
          explanation: 'Incorrect. Constitutional protections apply fully to minors on school grounds during custodial police interrogations.'
        },
        {
          text: 'The student has the constitutional right to demand a parent or attorney present before answering any questions or signing statements.',
          isCorrect: true,
          explanation: 'Correct! Under J.D.B. v. North Carolina (564 U.S. 261) and In re Gault, youth must be protected from coercive interrogation and have the right to guardian presence.'
        },
        {
          text: 'The student must immediately hand over their phone and unlock it for the officer.',
          isCorrect: false,
          explanation: 'Incorrect. Under Riley v. California (2014), searching digital phone contents requires a judicial search warrant.'
        }
      ]
    },
    {
      id: 'q-4',
      scenario: 'Warrant Inspection: Form I-200 vs Judicial Warrant',
      context: 'An officer slides a document under your door titled "U.S. Department of Homeland Security • Form I-200: Warrant for Arrest of Alien" signed by an ICE Field Supervisor. Does this grant them legal entry into your home?',
      options: [
        {
          text: 'Yes, because it has the word "Warrant" in the title.',
          isCorrect: false,
          explanation: 'Incorrect. Form I-200 is an administrative civil document, NOT a judicial search warrant signed by a court judge.'
        },
        {
          text: 'No. An administrative ICE warrant does NOT grant legal authority to enter private homes without voluntary consent.',
          isCorrect: true,
          explanation: 'Correct! The Fourth Amendment requires a judicial search warrant signed by a State or Federal Court Judge to enter a private residence without consent.'
        }
      ]
    }
  ];

  const currentQ = trainingQuestions[currentQuestionIndex];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    if (currentQ.options[selectedOption].isCorrect) {
      setScore(prev => prev + 1);
      confetti({ particleCount: 30, spread: 50 });
      showToast('Correct! Constitutional precedent applied accurately.', 'success');
    } else {
      showToast('Incorrect. Review the legal explanation below.', 'error');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex + 1 < trainingQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
      confetti({ particleCount: 60, spread: 80 });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-lg animation-fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0c101c] border-2 border-indigo-600/80 rounded-3xl w-full max-w-3xl max-h-[95vh] shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-[#111726] to-purple-950 border-b-2 border-indigo-800/60 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-900/80 rounded-xl text-indigo-300 border border-indigo-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight font-display">
                ENCOUNTER DEFENSE &amp; DE-ESCALATION SIMULATOR
              </h3>
              <p className="text-[11px] text-indigo-200/80 font-mono">
                Interactive real-world training module for ICE &amp; tactical squad stops
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isQuizComplete ? (
            <div className="space-y-5 animation-fade-in font-mono">
              {/* Progress Strip */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-indigo-300">
                  Scenario {currentQuestionIndex + 1} of {trainingQuestions.length}
                </span>
                <span>Current Score: <strong className="text-emerald-400">{score}</strong> / {trainingQuestions.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  style={{ width: `${((currentQuestionIndex + 1) / trainingQuestions.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all"
                ></div>
              </div>

              {/* Scenario Box */}
              <div className="p-5 rounded-2xl bg-[#111726] border-2 border-indigo-600/60 space-y-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold uppercase block w-max">
                  {currentQ.scenario}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
                  {currentQ.context}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let optStyle = 'bg-[#080c14] border-[#1e2a3f] text-slate-200 hover:border-slate-600';

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      optStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-glow ring-2 ring-emerald-500/40';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'bg-crimson-950/90 border-crimson-500 text-crimson-200 shadow-glow-crimson';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-indigo-950/90 border-indigo-500 text-indigo-200 shadow-glow ring-2 ring-indigo-500/40';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 rounded-2xl text-left border text-xs transition-all flex items-start space-x-3 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed font-medium">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed animation-fade-in ${
                  currentQ.options[selectedOption].isCorrect
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-100'
                    : 'bg-crimson-950/80 border-crimson-600 text-crimson-100'
                }`}>
                  <strong className="block mb-1">
                    {currentQ.options[selectedOption].isCorrect ? '✓ PRECEDENT APPLIED:' : '⚠️ LEGAL REASONING:'}
                  </strong>
                  <p>{currentQ.options[selectedOption].explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* Results & Certificate Screen */
            <div className="text-center space-y-6 py-6 animation-fade-in font-mono">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-emerald-500 mx-auto p-0.5 shadow-glow flex items-center justify-center">
                <div className="w-full h-full bg-[#080c14] rounded-[22px] flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-300" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  TRAINING MODULE COMPLETE
                </h3>
                <p className="text-xs text-slate-400">
                  You scored <strong className="text-emerald-400 text-base">{score} / {trainingQuestions.length}</strong> on Constitutional Encounter Scenarios
                </p>
              </div>

              {/* Certificate Card */}
              <div className="p-6 rounded-3xl bg-[#080c14] border-2 border-amber-500/80 max-w-md mx-auto space-y-3 shadow-2xl text-left">
                <div className="flex items-center justify-between border-b border-amber-800/60 pb-2">
                  <span className="text-[10px] font-bold text-amber-300 uppercase">JUSTICE PULSE DEFENDER</span>
                  <span className="text-[10px] text-slate-400">LEVEL 1 CERTIFICATE</span>
                </div>
                <h4 className="text-sm font-black text-white">Constitutional Encounter Defense</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Certified in Fourth Amendment home sanctity (Payton v. New York), Fifth Amendment silence, Riley digital privacy, and J.D.B. youth interrogation protections.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#080c14] border-t border-[#1c273a] flex items-center justify-between text-xs font-mono flex-shrink-0">
          {!isQuizComplete ? (
            <>
              <span className="text-slate-400 hidden sm:inline">Select the constitutional answer</span>
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold transition-all shadow-glow-indigo"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-glow"
                  >
                    <span>{currentQuestionIndex + 1 === trainingQuestions.length ? 'View Certificate' : 'Next Scenario'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Training</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-glow-indigo"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
