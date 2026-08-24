import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, ChevronRight, CheckCircle2, X, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('AUTHENTICATING CIVIC NETWORK...');
  const [countdown, setCountdown] = useState(20);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initial rapid initialization
  useEffect(() => {
    const initDuration = 2200;
    const intervalTime = 25;
    const totalSteps = initDuration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress > 25 && currentProgress <= 55) {
        setStatusText('SYNCING 50-STATE BRADY REGISTRY & FOIA VAULT...');
      } else if (currentProgress > 55 && currentProgress <= 85) {
        setStatusText('ESTABLISHING CRYPTOGRAPHIC CHAIN OF CUSTODY...');
      } else if (currentProgress > 85 && currentProgress < 100) {
        setStatusText('EQUAL JUSTICE PROTOCOLS ACTIVATED...');
      } else if (currentProgress >= 100) {
        setStatusText('CIVIC CLEARANCE GRANTED • SYSTEM READY');
        setIsReady(true);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // 20-second countdown before auto-dismiss
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          handleEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  // Keyboard shortcut (Enter or Escape to enter immediately)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 350);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#070b14] w-full h-[100dvh] flex flex-col justify-between p-3 sm:p-5 overflow-x-hidden overflow-y-auto transition-opacity duration-300 select-none ${
      isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,142,233,0.12),transparent_70%)] pointer-events-none"></div>

      {/* Top Header Row with Classification & Close Button */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between z-20 relative flex-shrink-0">
        <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate">CIVIC CLEARANCE ENCRYPTED</span>
        </div>

        <button
          onClick={handleEnter}
          className="p-1.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-all flex items-center gap-1 text-[11px] font-mono font-bold group shadow-lg active:scale-95 flex-shrink-0"
          title="Close Splash & Enter Platform"
        >
          <span>Skip & Enter</span>
          <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-justice-400" />
        </button>
      </div>

      {/* Main Center Content Card - Scaled to fit all mobile & tablet screens naturally */}
      <div className="relative z-10 max-w-lg w-full mx-auto flex flex-col items-center text-center space-y-2.5 sm:space-y-3.5 my-auto py-1">
        {/* Official Agency Crest / Seal */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40 animate-spin" style={{ animationDuration: '24s' }}></div>
          <div className="absolute inset-1 rounded-full border border-justice-400/30"></div>
          <div className="absolute inset-2 rounded-full bg-slate-900/90 shadow-2xl border-2 border-amber-500/70 flex items-center justify-center p-1.5">
            {/* Official Agency SVG Emblem: Eagle + Scales + Blindfolded Lady Justice */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-amber-400 fill-current">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              <circle cx="100" cy="100" r="92" fill="#0f172a" stroke="url(#goldGrad)" strokeWidth="3" />
              <circle cx="100" cy="100" r="86" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

              {/* Arch Stars */}
              {[...Array(9)].map((_, i) => {
                const angle = -140 + i * 12.5;
                const rad = (angle * Math.PI) / 180;
                const x = 100 + 76 * Math.cos(rad);
                const y = 100 + 76 * Math.sin(rad);
                return (
                  <polygon
                    key={i}
                    points="0,-3.5 1,-1 3.5,-1 1.5,1 2.5,3.5 0,2 -2.5,3.5 -1.5,1 -3.5,-1 -1,-1"
                    transform={`translate(${x}, ${y}) scale(0.9)`}
                    fill="url(#goldGrad)"
                  />
                );
              })}

              {/* Majestic Federal Eagle */}
              <path
                d="M 100,32 C 107,35 118,30 134,22 C 130,30 126,38 120,44 C 132,40 144,38 156,38 C 146,47 134,54 122,57 C 134,58 146,62 154,68 C 140,71 126,70 114,66 C 118,72 120,80 118,88 C 114,84 110,80 108,76 C 105,82 100,86 96,88 C 94,80 96,72 100,66 C 88,70 74,71 60,68 C 68,62 80,58 92,57 C 80,54 68,47 58,38 C 70,38 82,40 94,44 C 88,38 84,30 80,22 C 96,30 107,35 100,32 Z"
                fill="url(#goldGrad)"
              />
              <path
                d="M 98,28 C 102,24 107,24 110,27 C 114,29 116,33 112,35 C 108,37 104,36 100,34 Z"
                fill="#ffffff"
              />
              <polygon points="112,30 118,32 112,34" fill="#fbbf24" />

              {/* Lady Justice */}
              <g transform="translate(0, 10)">
                <path
                  d="M 96,78 C 96,72 104,72 104,78 C 104,82 102,86 100,88 C 98,86 96,82 96,78 Z"
                  fill="#ffffff"
                />
                <rect x="94" y="76" width="12" height="3.5" rx="1" fill="#f59e0b" />
                <path
                  d="M 94,88 L 106,88 L 112,130 L 88,130 Z"
                  fill="url(#blueGlow)"
                  opacity="0.9"
                />
                <line x1="97" y1="89" x2="94" y2="130" stroke="#082849" strokeWidth="1.2" />
                <line x1="100" y1="89" x2="100" y2="130" stroke="#082849" strokeWidth="1.2" />
                <line x1="103" y1="89" x2="106" y2="130" stroke="#082849" strokeWidth="1.2" />
                <path d="M 94,90 L 72,82" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 106,90 L 124,102" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 124,80 L 124,132" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                <line x1="120" y1="102" x2="128" y2="102" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 54,82 L 90,82" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="72" cy="82" r="2.5" fill="#fef08a" />
                <line x1="58" y1="83" x2="52" y2="98" stroke="url(#goldGrad)" strokeWidth="0.9" />
                <line x1="58" y1="83" x2="64" y2="98" stroke="url(#goldGrad)" strokeWidth="0.9" />
                <path d="M 50,98 Q 58,104 66,98 Z" fill="url(#goldGrad)" />
                <line x1="86" y1="83" x2="80" y2="98" stroke="url(#goldGrad)" strokeWidth="0.9" />
                <line x1="86" y1="83" x2="92" y2="98" stroke="url(#goldGrad)" strokeWidth="0.9" />
                <path d="M 78,98 Q 86,104 94,98 Z" fill="url(#goldGrad)" />
              </g>

              {/* Bottom Latin Motto */}
              <path
                d="M 50,158 Q 100,166 150,158 Q 142,168 100,172 Q 58,168 50,158 Z"
                fill="#0f172a"
                stroke="url(#goldGrad)"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="166"
                textAnchor="middle"
                fill="url(#goldGrad)"
                fontSize="6"
                fontWeight="bold"
                fontFamily="serif"
                letterSpacing="1.2"
              >
                FIAT JUSTITIA RUAT CAELUM
              </text>
            </svg>
          </div>
        </div>

        {/* Brand Titles with Agency Styling */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-[9px] sm:text-xs font-bold tracking-wider uppercase font-mono shadow-glow">
            <Shield className="w-3 h-3 text-amber-400" />
            <span>National Police Accountability & Civic Network</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
            JUSTICE<span className="text-justice-400">PULSE</span>
          </h1>

          {/* Catchy Slogan */}
          <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide max-w-sm sm:max-w-md mx-auto leading-snug">
            <span className="text-amber-400 font-serif">“</span>Where Truth Meets Transparency. Where Community Demands Justice.<span className="text-amber-400 font-serif">”</span>
          </p>

          <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
            Equal Justice Under Law • No Shield for Misconduct • 0% Fee Sanctuary
          </p>
        </div>

        {/* Civic Oversight Declaration Box */}
        <div className="p-2.5 sm:p-3 bg-[#111726] rounded-2xl border border-slate-700/80 text-left text-xs text-slate-200 space-y-1 shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Constitutional Mandate
            </span>
            <span className="text-slate-400 font-mono">50 States Active</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed">
            Empowering citizens, legal observers, and bereaved families with verified court dockets, cryptographic evidence preservation, repeat-offender tracking, and rapid-response pro bono legal defense.
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full max-w-md space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono">
            <span className="text-justice-400 truncate max-w-[240px] sm:max-w-[300px] font-bold">{statusText}</span>
            <span className="text-amber-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 via-justice-400 to-emerald-400 h-full rounded-full transition-all duration-75 ease-out shadow-glow"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Prominent Action Button & 20s Auto-Close Indicator */}
        <div className="pt-0.5 flex flex-col items-center space-y-1.5 w-full">
          <button
            onClick={handleEnter}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-justice-600 via-justice-500 to-emerald-500 hover:from-justice-500 hover:to-emerald-400 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-glow flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <span>Enter Justice Pulse Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* 20-Second Countdown Info */}
          <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-slate-400 font-mono">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>
              Auto-entering in <strong className="text-amber-300">{countdown}s</strong> (or press Enter)
            </span>
          </div>
        </div>
      </div>

      {/* Official Branding Footer */}
      <footer className="relative z-20 w-full max-w-2xl mx-auto pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[10px] sm:text-xs flex-shrink-0">
        <div className="flex items-center space-x-1 text-slate-400 truncate">
          <span>Engineered by</span>
          <a
            href="https://www.addinteractive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-justice-400 hover:text-justice-300 underline underline-offset-2 flex items-center gap-0.5 transition-colors"
          >
            <span>Add Interactive Studios</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <span className="text-amber-400 font-bold font-mono uppercase tracking-wider text-[9px] sm:text-[10px] bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
            BY NEXT Justice Media
          </span>
        </div>
      </footer>
    </div>
  );
}
