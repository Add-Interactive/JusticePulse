import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Download, 
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import InvestorPortalView from './InvestorPortalView';

export default function InvestorPitchModal({ isOpen, onClose, showToast, onOpenEvidenceSuite }) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animation-fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0c101c] border-2 border-purple-600/80 rounded-3xl w-full max-w-6xl max-h-[94vh] shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-950 via-[#111726] to-indigo-950 border-b-2 border-purple-800/60 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-0.5 shadow-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#080c14] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white font-display">
                  JUSTICE PULSE • INVESTOR &amp; CAPITAL PORTAL
                </h3>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-600 font-bold hidden sm:inline">
                  $3.5M SEED ROUND
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80 font-mono">
                LegalTech SaaS • GovTech Telemetry API • Retainer Matchmaking • Rule 1006 Forensics
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

        {/* Modal Scrollable Body */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          <InvestorPortalView
            showToast={showToast}
            onOpenEvidenceSuite={onOpenEvidenceSuite}
          />
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#080c14] border-t border-[#1c273a] flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-mono flex-shrink-0">
          <span>Confidential Investment Briefing • Add Interactive Studios &amp; BY NEXT Justice Media</span>
          <span className="text-purple-400 font-bold">Series Seed Data Room Active</span>
        </div>
      </div>
    </div>
  );
}
