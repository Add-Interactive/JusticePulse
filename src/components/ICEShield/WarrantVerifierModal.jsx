import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Scale, 
  HelpCircle, 
  Sparkles,
  AlertOctagon,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ICE_ENCOUNTER_DATA } from '../../data/iceEncounterData';

export default function WarrantVerifierModal({ isOpen, onClose, showToast }) {
  const [headerType, setHeaderType] = useState(null); // 'court' | 'dhs_ice' | 'unknown'
  const [formNumber, setFormNumber] = useState(null); // 'i200_i205' | 'search_warrant' | 'none'
  const [signatureType, setSignatureType] = useState(null); // 'judge' | 'ice_officer' | 'unknown'
  const [hasExactAddress, setHasExactAddress] = useState(null); // true | false

  if (!isOpen) return null;

  const isComplete = headerType !== null && formNumber !== null && signatureType !== null;

  // Determine legality
  const isJudicialWarrant = 
    headerType === 'court' && 
    signatureType === 'judge' && 
    formNumber === 'search_warrant';

  const isAdministrativeICE = 
    headerType === 'dhs_ice' || 
    formNumber === 'i200_i205' || 
    signatureType === 'ice_officer';

  const handleReset = () => {
    setHeaderType(null);
    setFormNumber(null);
    setSignatureType(null);
    setHasExactAddress(null);
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
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight font-display">
                JUDICIAL VS. ADMINISTRATIVE WARRANT VERIFIER
              </h3>
              <p className="text-[11px] text-indigo-200/80 font-mono">
                Ask agents to slide the paper under the door. Inspect these 3 crucial markers:
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

        {/* Step-by-Step Questions Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Question 1: Document Header */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
              Step 1: Check the Top Header of the Document
            </span>
            <p className="text-xs text-slate-200 font-bold">
              What does the top title banner say at the very top of the page?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setHeaderType('court')}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  headerType === 'court'
                    ? 'bg-emerald-950 text-emerald-200 border-emerald-500 shadow-md font-bold'
                    : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:border-slate-600'
                }`}
              >
                ⚖️ Says "United States District Court" or "State Court"
              </button>

              <button
                onClick={() => setHeaderType('dhs_ice')}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  headerType === 'dhs_ice'
                    ? 'bg-crimson-950 text-crimson-200 border-crimson-500 shadow-md font-bold'
                    : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:border-slate-600'
                }`}
              >
                🛑 Says "Department of Homeland Security" or "ICE"
              </button>
            </div>
          </div>

          {/* Question 2: Form Number / Type */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
              Step 2: Check Form Code / Title
            </span>
            <p className="text-xs text-slate-200 font-bold">
              Does the document have a form code or search warrant title?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setFormNumber('search_warrant')}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  formNumber === 'search_warrant'
                    ? 'bg-emerald-950 text-emerald-200 border-emerald-500 shadow-md font-bold'
                    : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:border-slate-600'
                }`}
              >
                📜 "Search and Seizure Warrant" (Federal / State)
              </button>

              <button
                onClick={() => setFormNumber('i200_i205')}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  formNumber === 'i200_i205'
                    ? 'bg-crimson-950 text-crimson-200 border-crimson-500 shadow-md font-bold'
                    : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:border-slate-600'
                }`}
              >
                ⚠️ "Form I-200 (Arrest of Alien)" or "Form I-205 (Removal)"
              </button>
            </div>
          </div>

          {/* Question 3: Signature Block */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">
              Step 3: Check the Signature Line at the Bottom
            </span>
            <p className="text-xs text-slate-200 font-bold">
              Who signed the signature line at the bottom of the document?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSignatureType('judge')}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  signatureType === 'judge'
                    ? 'bg-emerald-950 text-emerald-200 border-emerald-500 shadow-md font-bold'
                    : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:border-slate-600'
                }`}
              >
                ⚖️ Explicitly says "Judge" or "United States Magistrate"
              </button>

              <button
                onClick={() => setSignatureType('ice_officer')}
                className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  signatureType === 'ice_officer'
                    ? 'bg-crimson-950 text-crimson-200 border-crimson-500 shadow-md font-bold'
                    : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:border-slate-600'
                }`}
              >
                🛑 Says "ICE Officer", "Supervisor", or "Field Director"
              </button>
            </div>
          </div>

          {/* Diagnostic Result Banner */}
          {isComplete && (
            <div className="animation-fade-in">
              {isAdministrativeICE ? (
                <div className="p-5 rounded-2xl bg-crimson-950/90 border-2 border-crimson-500 space-y-3 text-white shadow-2xl">
                  <div className="flex items-center space-x-2">
                    <AlertOctagon className="w-6 h-6 text-crimson-400 animate-pulse flex-shrink-0" />
                    <h4 className="text-base font-black tracking-tight font-display uppercase">
                      VERDICT: ADMINISTRATIVE ICE WARRANT • DO NOT OPEN THE DOOR!
                    </h4>
                  </div>
                  <p className="text-xs text-crimson-100 leading-relaxed">
                    This is an <strong>administrative civil warrant</strong> signed only by an immigration officer, <strong>NOT A JUDICIAL COURT SEARCH WARRANT</strong>. Under the Fourth Amendment (<em>Payton v. New York</em>, 445 U.S. 573), <strong>ICE agents have NO legal authority to enter your private home without voluntary consent</strong>.
                  </p>
                  <div className="p-3 bg-[#0a0204] rounded-xl border border-crimson-800 text-xs font-mono text-crimson-200 space-y-1">
                    <span className="font-bold block uppercase">What to say through the closed door:</span>
                    <p className="italic">"I do not give you permission to enter my home. Please leave my property."</p>
                  </div>
                </div>
              ) : isJudicialWarrant ? (
                <div className="p-5 rounded-2xl bg-emerald-950/90 border-2 border-emerald-500 space-y-3 text-white shadow-2xl">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <h4 className="text-base font-black tracking-tight font-display uppercase">
                      VERDICT: JUDICIAL COURT SEARCH WARRANT
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    This document appears to be signed by a Court Judge or Magistrate. Verify that it contains your exact street address. Do not physically resist, but state clearly: <strong>"I am exercising my right to remain silent and I do not consent to any searches beyond what is specified in this warrant."</strong> Record the encounter and notify legal counsel immediately.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-950 border border-amber-500 text-xs text-amber-200">
                  Document parameters are inconclusive. When in doubt, <strong>keep the door closed and locked</strong> and demand a judicial search warrant signed by a court judge.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080c14] border-t border-[#1c273a] flex items-center justify-between text-xs font-mono flex-shrink-0">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Questions</span>
          </button>

          <span className="text-slate-400">Fourth Amendment Sanctuary Rule</span>
        </div>
      </div>
    </div>
  );
}
