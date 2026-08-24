import React from 'react';
import { Shield, ExternalLink, Heart, Scale, Lock, Sparkles } from 'lucide-react';

export default function Footer({ onSelectTab, onOpenInvestorModal }) {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/90 backdrop-blur-md mt-12 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Platform Logo & Mission */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-white">
            <div className="w-6 h-6 rounded-lg bg-justice-600 flex items-center justify-center text-white shadow-glow">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <span className="font-black text-sm tracking-tight font-display">
              JUSTICE<span className="text-justice-400">PULSE</span>
            </span>
            <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.2 rounded border border-slate-800">
              v0.0.1
            </span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
            National Police Accountability & Civic Intelligence Sanctuary Network. 50-State Verified Cryptographic Docket.
          </p>
        </div>

        {/* Center: Branding Credits (Add Interactive Studios & NEXT Justice Media) */}
        <div className="flex flex-col items-center text-center space-y-1.5 bg-slate-900/90 p-3.5 px-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-2">
            <span className="text-slate-300">Engineered & Developed by</span>
            <a
              href="https://www.addinteractive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-justice-400 hover:text-justice-300 underline underline-offset-4 decoration-justice-500/50 hover:decoration-justice-400 flex items-center gap-1 transition-colors"
            >
              <span>Add Interactive Studios</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3 py-0.5 rounded-full border border-amber-800/60 font-bold">
              BY NEXT Justice Media
            </span>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center space-x-4 text-xs font-medium">
          <button
            onClick={() => onSelectTab('lawlibrary')}
            className="hover:text-justice-300 transition-colors"
          >
            Civil Rights Law
          </button>
          <button
            onClick={() => onSelectTab('whistleblower')}
            className="hover:text-emerald-300 transition-colors"
          >
            Whistleblower Vault
          </button>
          <button
            onClick={onOpenInvestorModal}
            className="hover:text-purple-300 transition-colors font-bold text-purple-400"
          >
            Investor Deck
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
        <div>© 2026 Add Interactive Studios & NEXT Justice Media. All rights reserved.</div>
        <div className="flex items-center space-x-3">
          <span>SHA-256 IMMUTABLE LEDGER</span>
          <span>•</span>
          <span>0% PLATFORM TAKE RATE</span>
          <span>•</span>
          <span>42 U.S.C. § 1983 COMPLIANT</span>
        </div>
      </div>
    </footer>
  );
}
