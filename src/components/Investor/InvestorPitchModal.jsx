import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  Scale, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Target, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Download,
  Share2,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { investorDeck } from '../../data/investorDeck';

export default function InvestorPitchModal({ isOpen, onClose, showToast }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const currentSlide = investorDeck.slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < investorDeck.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleRequestDeck = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Investor Pitch Deck (Series Seed Executive Summary) downloaded!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg animation-fade-in">
      <div className="bg-slate-900 border border-purple-700/60 rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-purple-800/50 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-600/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-300" />
                Investor & Grant Pitch Deck
              </span>
              <span className="text-xs font-mono text-purple-400">
                Slide {currentSlideIndex + 1} of {investorDeck.slides.length}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white font-display">
              {investorDeck.headline}
            </h3>
            <p className="text-xs text-purple-200/80 font-medium">
              {investorDeck.tagline}
            </p>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black text-purple-400 font-mono">
              {currentSlide.step}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {currentSlide.title}
            </h2>
          </div>

          {/* Stats highlight if present */}
          {currentSlide.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentSlide.stats.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-purple-900/40 text-center space-y-1">
                  <p className="text-2xl font-extrabold font-mono text-purple-300">{st.val}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">{st.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Bullet Highlights */}
          <div className="space-y-3">
            {currentSlide.highlights.map((point, idx) => (
              <div key={idx} className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">{point}</p>
              </div>
            ))}
          </div>

          {/* Investor Specific Insights */}
          {currentSlideIndex === 4 && (
            <div className="p-4 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 rounded-2xl border border-purple-700/50 space-y-2">
              <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Seed Funding Target: $2,500,000</span>
              </div>
              <p className="text-xs text-purple-100/90 leading-relaxed">
                Use of funds: 45% Automated FOIA Ingestion Engine & State Open Records Pipeline, 30% Mobile SOS Encrypted Livestream App, 15% Pro Bono Civil Rights Legal Partner Network, 10% Community Sanctuary Mutual Aid Operations.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-1.5">
              {investorDeck.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlideIndex === idx ? 'bg-purple-400 w-6' : 'bg-slate-700'
                  }`}
                ></button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === investorDeck.slides.length - 1}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRequestDeck}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center space-x-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Executive Brief (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
