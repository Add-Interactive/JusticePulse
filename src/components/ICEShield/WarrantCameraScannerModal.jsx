import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  Scan, 
  CheckCircle2, 
  AlertOctagon, 
  FileText, 
  Sparkles, 
  RotateCcw, 
  Volume2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WarrantCameraScannerModal({ isOpen, onClose, showToast }) {
  const [selectedSample, setSelectedSample] = useState('ice_admin'); // 'ice_admin' | 'judicial'
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  if (!isOpen) return null;

  const handleStartScan = (sampleType) => {
    setSelectedSample(sampleType);
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      confetti({ particleCount: 40, spread: 60 });
      if (sampleType === 'ice_admin') {
        showToast('OCR Analysis Complete: Administrative ICE Warrant (Form I-200) Detected. DO NOT OPEN DOOR.', 'error');
      } else {
        showToast('OCR Analysis Complete: Judicial Search Warrant Signed by Judge Detected.', 'success');
      }
    }, 1800);
  };

  const handleSpeakVerdict = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const statement = selectedSample === 'ice_admin'
        ? 'Warning: Administrative ICE Warrant detected. This is Form I-200 signed by an immigration officer, not a judge. You have the constitutional right under the Fourth Amendment to keep your door closed. Do not open the door.'
        : 'Notice: This document appears to be a Judicial Search Warrant signed by a Court Judge. Verify the exact street address and contact legal counsel immediately.';
      
      const utterance = new SpeechSynthesisUtterance(statement);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
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
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight font-display">
                OPTICAL SCANNER • WARRANT OCR VERIFIER
              </h3>
              <p className="text-[11px] text-indigo-200/80 font-mono">
                Computer vision &amp; optical character recognition for documents slid under doors
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

        {/* Scanner Simulation Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Sample Selectors */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
              Select Document to Scan or Test:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleStartScan('ice_admin')}
                className={`p-3.5 rounded-2xl text-left border transition-all flex items-start space-x-3 ${
                  selectedSample === 'ice_admin'
                    ? 'bg-crimson-950/80 border-crimson-500 ring-2 ring-crimson-500/40 shadow-glow-crimson'
                    : 'bg-[#111726] border-[#243147] hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="p-2 bg-crimson-900/90 rounded-xl text-crimson-200 flex-shrink-0 mt-0.5">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sample 1: ICE Administrative Warrant (Form I-200)</h4>
                  <p className="text-[10px] font-mono text-crimson-300 mt-0.5">Signed by Deportation Officer • NO Forced Entry Authority</p>
                </div>
              </button>

              <button
                onClick={() => handleStartScan('judicial')}
                className={`p-3.5 rounded-2xl text-left border transition-all flex items-start space-x-3 ${
                  selectedSample === 'judicial'
                    ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/40 shadow-glow'
                    : 'bg-[#111726] border-[#243147] hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="p-2 bg-emerald-900/90 rounded-xl text-emerald-200 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sample 2: Federal Court Search Warrant</h4>
                  <p className="text-[10px] font-mono text-emerald-300 mt-0.5">Signed by U.S. Magistrate Judge • Court Authority</p>
                </div>
              </button>
            </div>
          </div>

          {/* Scanner Viewport Display Box */}
          <div className="relative p-6 rounded-3xl bg-[#080c14] border-2 border-[#1e2a3f] overflow-hidden min-h-[260px] flex flex-col justify-between font-mono">
            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse shadow-[0_0_15px_#22d3ee]"></div>
                <div className="w-full text-center py-2 bg-slate-950/80 text-cyan-300 text-xs font-bold animate-pulse">
                  SCANNING HEADER, FORM CODES &amp; SIGNATORY BLOCKS...
                </div>
              </div>
            )}

            {/* Simulated Document Sheet Preview */}
            <div className="bg-white/95 text-slate-900 p-5 rounded-2xl border border-slate-300 space-y-3 relative z-10 shadow-lg text-[11px]">
              {/* Header Block with OCR Bounding Box */}
              <div className={`p-2 rounded-lg border-2 transition-all ${
                scanComplete
                  ? selectedSample === 'ice_admin'
                    ? 'border-crimson-600 bg-crimson-50 ring-2 ring-crimson-400'
                    : 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-400'
                  : 'border-dashed border-slate-400'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>{selectedSample === 'ice_admin' ? 'U.S. DEPARTMENT OF HOMELAND SECURITY' : 'UNITED STATES DISTRICT COURT'}</span>
                  {scanComplete && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase text-white ${
                      selectedSample === 'ice_admin' ? 'bg-crimson-600' : 'bg-emerald-600'
                    }`}>
                      {selectedSample === 'ice_admin' ? 'RED FLAG: DHS/ICE' : 'VALID COURT'}
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-slate-600">{selectedSample === 'ice_admin' ? 'Immigration and Customs Enforcement' : 'For the Northern District of Illinois • Eastern Division'}</p>
              </div>

              {/* Title / Form Code */}
              <div className={`p-2 rounded-lg border-2 transition-all ${
                scanComplete
                  ? selectedSample === 'ice_admin'
                    ? 'border-crimson-600 bg-crimson-50'
                    : 'border-emerald-600 bg-emerald-50'
                  : 'border-dashed border-slate-400'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>{selectedSample === 'ice_admin' ? 'WARRANT FOR ARREST OF ALIEN (Form I-200)' : 'SEARCH AND SEIZURE WARRANT (Fed. R. Crim. P. 41)'}</span>
                  {scanComplete && (
                    <span className={`text-[9px] font-bold ${selectedSample === 'ice_admin' ? 'text-crimson-600' : 'text-emerald-700'}`}>
                      {selectedSample === 'ice_admin' ? 'CIVIL ADMINISTRATIVE' : 'JUDICIAL CRIMINAL'}
                    </span>
                  )}
                </div>
              </div>

              {/* Signature Block */}
              <div className={`p-2 rounded-lg border-2 transition-all ${
                scanComplete
                  ? selectedSample === 'ice_admin'
                    ? 'border-crimson-600 bg-crimson-50'
                    : 'border-emerald-600 bg-emerald-50'
                  : 'border-dashed border-slate-400'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>Signature: {selectedSample === 'ice_admin' ? 'J. Miller, Supervisory Deportation Officer' : 'Hon. Sarah Jenkins, U.S. Magistrate Judge'}</span>
                  {scanComplete && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black text-white ${
                      selectedSample === 'ice_admin' ? 'bg-crimson-600' : 'bg-emerald-600'
                    }`}>
                      {selectedSample === 'ice_admin' ? 'NOT A JUDGE' : 'JUDGE SIGNED'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Verdict Banner */}
            {scanComplete && (
              <div className="mt-4 animation-fade-in">
                {selectedSample === 'ice_admin' ? (
                  <div className="p-4 rounded-2xl bg-crimson-950 border-2 border-crimson-500 space-y-2 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertOctagon className="w-5 h-5 text-crimson-400 animate-pulse" />
                        <span className="font-black text-xs uppercase tracking-tight text-crimson-200">
                          OCR VERDICT: FORM I-200 ADMINISTRATIVE WARRANT (DO NOT OPEN DOOR)
                        </span>
                      </div>
                      <button
                        onClick={handleSpeakVerdict}
                        className="px-2.5 py-1 bg-crimson-800 hover:bg-crimson-700 rounded-lg text-[10px] font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Speak Verdict</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-crimson-100 font-sans leading-relaxed">
                      Signed only by an immigration enforcement officer. <strong>This document provides zero legal authority to enter private homes without voluntary consent.</strong>
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-950 border-2 border-emerald-500 space-y-2 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-black text-xs uppercase tracking-tight text-emerald-200">
                          OCR VERDICT: VALID JUDICIAL SEARCH WARRANT (COURT ORDER)
                        </span>
                      </div>
                      <button
                        onClick={handleSpeakVerdict}
                        className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-[10px] font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Speak Verdict</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-emerald-100 font-sans leading-relaxed">
                      Signed by a Court Judge. Verify the exact street address and assert your right to remain silent while observing and recording quietly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080c14] border-t border-[#1c273a] flex items-center justify-between text-xs font-mono flex-shrink-0">
          <button
            onClick={() => handleStartScan(selectedSample)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-glow-indigo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Scan Document</span>
          </button>

          <span className="text-slate-400">Payton v. New York 4th Amend Inspection</span>
        </div>
      </div>
    </div>
  );
}
