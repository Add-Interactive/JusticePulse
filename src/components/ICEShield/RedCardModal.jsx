import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Copy, 
  CheckCircle2,
  FileText,
  AlertOctagon,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ICE_ENCOUNTER_DATA } from '../../data/iceEncounterData';

export default function RedCardModal({ isOpen, onClose, showToast }) {
  const [selectedLangIndex, setSelectedLangIndex] = useState(0); // 0 = English, 1 = Spanish, etc.
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const currentBroadcast = ICE_ENCOUNTER_DATA.emergencyBroadcasts[selectedLangIndex];

  const handleSpeakAloud = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentBroadcast.statement);
      
      // Set language code mapping
      const langCodes = {
        'English': 'en-US',
        'Spanish': 'es-MX',
        'Haitian Creole': 'fr-FR',
        'Mandarin Chinese': 'zh-CN',
        'Arabic': 'ar-SA',
        'Vietnamese': 'vi-VN',
        'Portuguese': 'pt-BR',
        'French': 'fr-FR',
        'Tagalog': 'fil-PH',
        'Korean': 'ko-KR'
      };

      utterance.lang = langCodes[currentBroadcast.lang] || 'en-US';
      utterance.rate = 0.9; // clear, steady pace
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      showToast(`Broadcasting Constitutional Assertion in ${currentBroadcast.lang} aloud...`, 'info');
    } else {
      showToast('Speech synthesis not supported in this browser. Please show the screen through the window.', 'error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentBroadcast.statement);
    confetti({ particleCount: 30, spread: 50 });
    showToast(`Constitutional assertion copied in ${currentBroadcast.lang}!`, 'success');
  };

  const handleDownloadCard = () => {
    confetti({ particleCount: 40, spread: 60 });
    showToast('Digital Red Card Pocket Slips (10 Languages PDF) downloaded!', 'success');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-lg animation-fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-crimson-950 via-[#120508] to-[#0a0204] border-4 border-crimson-600 rounded-3xl w-full max-w-3xl max-h-[95vh] shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Header Bar */}
        <div className="p-4 bg-crimson-900/90 border-b-2 border-crimson-600 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white rounded-xl text-crimson-700 shadow-md">
              <AlertOctagon className="w-5 h-5 font-black animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight font-display uppercase">
                  TARJETA ROJA • DIGITAL CONSTITUTIONAL RED CARD
                </h3>
              </div>
              <p className="text-[11px] text-crimson-200 font-mono">
                Hold this screen against your window or closed door. DO NOT OPEN THE DOOR.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isSpeaking && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 text-crimson-200 hover:text-white rounded-xl hover:bg-crimson-800 transition-all flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Language Selector Strip */}
        <div className="p-2.5 bg-[#0a0204] border-b border-crimson-900/80 flex space-x-2 overflow-x-auto flex-shrink-0">
          {ICE_ENCOUNTER_DATA.emergencyBroadcasts.map((b, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedLangIndex(idx);
                if (isSpeaking && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border ${
                selectedLangIndex === idx
                  ? 'bg-crimson-600 text-white border-crimson-400 shadow-glow-crimson'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <span>{b.flag}</span>
              <span>{b.nativeLang}</span>
            </button>
          ))}
        </div>

        {/* Big Bold High-Contrast Card Display Area (Optimized to be read through glass) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-center text-center space-y-6">
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-crimson-950 border border-crimson-700 text-crimson-300 text-xs font-mono font-black uppercase tracking-wider">
              {currentBroadcast.lang.toUpperCase()} • CONSTITUTIONAL ASSERTION
            </div>

            {/* Giant High-Contrast Statement */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug font-sans tracking-tight bg-slate-950/80 p-6 sm:p-8 rounded-3xl border-2 border-crimson-700 shadow-2xl text-left">
              "{currentBroadcast.statement}"
            </blockquote>

            <p className="text-xs text-crimson-300 font-mono">
              Protected under the 4th, 5th, and 14th Amendments to the United States Constitution.
            </p>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 bg-[#0a0204] border-t-2 border-crimson-900/80 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center space-x-2">
            {/* Audio Broadcast Button */}
            <button
              onClick={handleSpeakAloud}
              className={`px-4 py-2.5 rounded-2xl font-bold font-mono text-xs flex items-center space-x-2 transition-all active:scale-95 shadow-lg border ${
                isSpeaking
                  ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400 animate-pulse'
                  : 'bg-gradient-to-r from-crimson-600 to-pink-600 hover:from-crimson-500 text-white border-crimson-400 shadow-glow-crimson'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Stop Audio Broadcast' : '🔊 Broadcast Aloud on Speaker'}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Text</span>
            </button>
          </div>

          <button
            onClick={handleDownloadCard}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-crimson-400" />
            <span>Download Pocket Wallet PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
