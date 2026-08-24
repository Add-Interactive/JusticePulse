import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, ChevronRight, CheckCircle2, X, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export default function SplashScreen({ onFinish, currentTheme = 'theme-midnight-navy', isHighContrast = false }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('AUTHENTICATING CIVIC NETWORK...');
  const [countdown, setCountdown] = useState(20);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Theme styling configuration map
  const getThemeStyling = (theme) => {
    switch (theme) {
      case 'theme-daylight-clean':
        return {
          bg: 'bg-[#f1f5f9] text-slate-900',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.18),transparent_70%)]',
          topBarBtn: 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-md',
          sealOuterGlow: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600',
          sealInnerBg: 'bg-white text-slate-900',
          sealIconColor: 'text-sky-600',
          brandTitle: 'bg-gradient-to-r from-slate-950 via-slate-800 to-sky-700 bg-clip-text text-transparent',
          brandHighlight: 'text-sky-600',
          motto: 'text-sky-700',
          summaryText: 'text-slate-600',
          mandateBox: 'bg-white border-slate-300 text-slate-700 shadow-md',
          mandateTag: 'bg-sky-100 text-sky-900 border-sky-300',
          progressBarBg: 'bg-slate-200 border-slate-300',
          progressBarFill: 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600',
          progressText: 'text-slate-600',
          enterBtn: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-glow border-sky-300',
          footerText: 'text-slate-500',
          footerLink: 'text-sky-600 hover:underline'
        };

      case 'theme-vintage-parchment':
        return {
          bg: 'bg-[#f4ede2] text-[#291a0c]',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(180,83,9,0.15),transparent_70%)]',
          topBarBtn: 'bg-[#fffdf8] text-[#291a0c] border-[#d8c8b2] hover:bg-[#ece3d4] shadow-md',
          sealOuterGlow: 'bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-800',
          sealInnerBg: 'bg-[#fffdf8] text-[#291a0c]',
          sealIconColor: 'text-amber-700',
          brandTitle: 'bg-gradient-to-r from-[#291a0c] via-[#451a03] to-amber-800 bg-clip-text text-transparent',
          brandHighlight: 'text-amber-700',
          motto: 'text-amber-800',
          summaryText: 'text-[#573e26]',
          mandateBox: 'bg-[#fffdf8] border-[#d8c8b2] text-[#3b2814] shadow-md',
          mandateTag: 'bg-amber-100 text-amber-900 border-amber-300',
          progressBarBg: 'bg-[#ece3d4] border-[#d8c8b2]',
          progressBarFill: 'bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-700',
          progressText: 'text-[#573e26]',
          enterBtn: 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:to-amber-700 text-amber-50 shadow-md border-amber-500',
          footerText: 'text-[#573e26]',
          footerLink: 'text-amber-800 hover:underline'
        };

      case 'theme-oled-obsidian':
        return {
          bg: 'bg-[#000000] text-white',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.15),transparent_70%)]',
          topBarBtn: 'bg-[#0a0a0a] text-white border-slate-700 hover:bg-slate-900 shadow-xl',
          sealOuterGlow: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500',
          sealInnerBg: 'bg-[#000000] text-white',
          sealIconColor: 'text-sky-400',
          brandTitle: 'text-white',
          brandHighlight: 'text-sky-400',
          motto: 'text-sky-400',
          summaryText: 'text-slate-300',
          mandateBox: 'bg-[#0a0a0a] border-slate-700 text-slate-200 shadow-2xl',
          mandateTag: 'bg-slate-900 text-sky-300 border-slate-700',
          progressBarBg: 'bg-[#0a0a0a] border-slate-700',
          progressBarFill: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500',
          progressText: 'text-slate-300',
          enterBtn: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-glow border-2 border-sky-400',
          footerText: 'text-slate-400',
          footerLink: 'text-sky-400 hover:underline'
        };

      case 'theme-sanctuary-emerald':
        return {
          bg: 'bg-[#06140e] text-emerald-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_70%)]',
          topBarBtn: 'bg-[#0c2017] text-emerald-200 border-[#1a4d38] hover:bg-[#123828]',
          sealOuterGlow: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600',
          sealInnerBg: 'bg-[#040e0a] text-emerald-100',
          sealIconColor: 'text-emerald-400',
          brandTitle: 'bg-gradient-to-r from-white via-emerald-100 to-teal-300 bg-clip-text text-transparent',
          brandHighlight: 'text-emerald-400',
          motto: 'text-emerald-300',
          summaryText: 'text-emerald-200/90',
          mandateBox: 'bg-[#0c2017] border-[#1a4d38] text-emerald-100',
          mandateTag: 'bg-[#040e0a] text-emerald-300 border-emerald-700',
          progressBarBg: 'bg-[#040e0a] border-[#1a4d38]',
          progressBarFill: 'bg-gradient-to-r from-emerald-400 to-teal-400',
          progressText: 'text-emerald-300',
          enterBtn: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-emerald border-emerald-400',
          footerText: 'text-emerald-400/80',
          footerLink: 'text-emerald-300 hover:underline'
        };

      case 'theme-courtroom-gold':
        return {
          bg: 'bg-[#120b07] text-amber-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.18),transparent_70%)]',
          topBarBtn: 'bg-[#1f140e] text-amber-200 border-[#4a3020] hover:bg-[#2d1e15]',
          sealOuterGlow: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700',
          sealInnerBg: 'bg-[#0e0805] text-amber-100',
          sealIconColor: 'text-amber-400',
          brandTitle: 'bg-gradient-to-r from-white via-amber-100 to-yellow-300 bg-clip-text text-transparent',
          brandHighlight: 'text-amber-400',
          motto: 'text-amber-300',
          summaryText: 'text-amber-200/90',
          mandateBox: 'bg-[#1f140e] border-[#4a3020] text-amber-100',
          mandateTag: 'bg-[#0e0805] text-amber-300 border-amber-700',
          progressBarBg: 'bg-[#0e0805] border-[#4a3020]',
          progressBarFill: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600',
          progressText: 'text-amber-300',
          enterBtn: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-white shadow-glow-amber border-amber-400',
          footerText: 'text-amber-400/80',
          footerLink: 'text-amber-300 hover:underline'
        };

      case 'theme-crimson-alert':
        return {
          bg: 'bg-[#14070a] text-rose-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.2),transparent_70%)]',
          topBarBtn: 'bg-[#240c12] text-rose-200 border-[#541c27] hover:bg-[#34121a]',
          sealOuterGlow: 'bg-gradient-to-br from-crimson-400 via-red-500 to-rose-600',
          sealInnerBg: 'bg-[#0c0406] text-rose-100',
          sealIconColor: 'text-crimson-400',
          brandTitle: 'bg-gradient-to-r from-white via-rose-100 to-red-300 bg-clip-text text-transparent',
          brandHighlight: 'text-crimson-400',
          motto: 'text-rose-400',
          summaryText: 'text-rose-200/90',
          mandateBox: 'bg-[#240c12] border-[#541c27] text-rose-100',
          mandateTag: 'bg-[#0c0406] text-rose-300 border-crimson-700',
          progressBarBg: 'bg-[#0c0406] border-[#541c27]',
          progressBarFill: 'bg-gradient-to-r from-crimson-500 via-red-500 to-rose-500',
          progressText: 'text-rose-300',
          enterBtn: 'bg-gradient-to-r from-crimson-600 via-red-600 to-rose-700 hover:from-crimson-500 hover:to-red-500 text-white shadow-glow-crimson border-crimson-400',
          footerText: 'text-rose-400/80',
          footerLink: 'text-rose-300 hover:underline'
        };

      case 'theme-cyberpunk-neon':
        return {
          bg: 'bg-[#090516] text-purple-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.2),transparent_70%)]',
          topBarBtn: 'bg-[#150d30] text-cyan-200 border-[#3b1d75] hover:bg-[#22154d]',
          sealOuterGlow: 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500',
          sealInnerBg: 'bg-[#05030d] text-purple-100',
          sealIconColor: 'text-cyan-400',
          brandTitle: 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent',
          brandHighlight: 'text-cyan-400',
          motto: 'text-cyan-300',
          summaryText: 'text-purple-200/90',
          mandateBox: 'bg-[#150d30] border-[#3b1d75] text-purple-100',
          mandateTag: 'bg-[#05030d] text-cyan-300 border-cyan-700',
          progressBarBg: 'bg-[#05030d] border-[#3b1d75]',
          progressBarFill: 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500',
          progressText: 'text-cyan-300',
          enterBtn: 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-glow border-cyan-400',
          footerText: 'text-purple-400/80',
          footerLink: 'text-cyan-400 hover:underline'
        };

      case 'theme-pacific-ocean':
        return {
          bg: 'bg-[#040e1b] text-cyan-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(20,184,166,0.18),transparent_70%)]',
          topBarBtn: 'bg-[#0a1e38] text-teal-200 border-[#17427a] hover:bg-[#0f2d54]',
          sealOuterGlow: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600',
          sealInnerBg: 'bg-[#020810] text-cyan-100',
          sealIconColor: 'text-teal-400',
          brandTitle: 'bg-gradient-to-r from-white via-cyan-100 to-teal-300 bg-clip-text text-transparent',
          brandHighlight: 'text-teal-400',
          motto: 'text-teal-300',
          summaryText: 'text-cyan-200/90',
          mandateBox: 'bg-[#0a1e38] border-[#17427a] text-cyan-100',
          mandateTag: 'bg-[#020810] text-teal-300 border-teal-700',
          progressBarBg: 'bg-[#020810] border-[#17427a]',
          progressBarFill: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500',
          progressText: 'text-teal-300',
          enterBtn: 'bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-glow border-teal-400',
          footerText: 'text-teal-400/80',
          footerLink: 'text-teal-300 hover:underline'
        };

      case 'theme-capitol-monolith':
        return {
          bg: 'bg-[#0f1115] text-slate-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(226,232,240,0.12),transparent_70%)]',
          topBarBtn: 'bg-[#1c2026] text-slate-200 border-[#38404d] hover:bg-[#282d36]',
          sealOuterGlow: 'bg-gradient-to-br from-slate-400 via-slate-300 to-slate-500',
          sealInnerBg: 'bg-[#08090b] text-slate-100',
          sealIconColor: 'text-slate-300',
          brandTitle: 'text-white',
          brandHighlight: 'text-slate-300',
          motto: 'text-slate-400',
          summaryText: 'text-slate-300',
          mandateBox: 'bg-[#1c2026] border-[#38404d] text-slate-200',
          mandateTag: 'bg-[#08090b] text-slate-300 border-slate-600',
          progressBarBg: 'bg-[#08090b] border-[#38404d]',
          progressBarFill: 'bg-gradient-to-r from-slate-400 to-slate-200',
          progressText: 'text-slate-300',
          enterBtn: 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white shadow-md border-slate-500',
          footerText: 'text-slate-400',
          footerLink: 'text-slate-300 hover:underline'
        };

      default: // theme-midnight-navy
        return {
          bg: 'bg-[#070b14] text-slate-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(14,142,233,0.18),transparent_70%)]',
          topBarBtn: 'bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800 shadow-lg',
          sealOuterGlow: 'bg-gradient-to-br from-justice-400 via-indigo-500 to-purple-600',
          sealInnerBg: 'bg-[#080c14] text-slate-100',
          sealIconColor: 'text-justice-400',
          brandTitle: 'bg-gradient-to-r from-white via-slate-100 to-justice-300 bg-clip-text text-transparent',
          brandHighlight: 'text-justice-400',
          motto: 'text-justice-300',
          summaryText: 'text-slate-300',
          mandateBox: 'bg-[#111726]/90 border-[#243147] text-slate-300 shadow-2xl',
          mandateTag: 'bg-justice-950 text-justice-300 border-justice-800',
          progressBarBg: 'bg-[#080c14] border-[#1e2a3f]',
          progressBarFill: 'bg-gradient-to-r from-justice-500 via-indigo-500 to-purple-600',
          progressText: 'text-slate-400',
          enterBtn: 'bg-gradient-to-r from-justice-600 via-indigo-600 to-purple-600 hover:from-justice-500 hover:to-indigo-500 text-white shadow-glow border-2 border-justice-300',
          footerText: 'text-slate-400',
          footerLink: 'text-justice-400 hover:underline'
        };
    }
  };

  const currentStyle = getThemeStyling(currentTheme);

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
    <div className={`fixed inset-0 z-50 ${currentStyle.bg} w-full h-[100dvh] flex flex-col justify-between p-3 sm:p-5 overflow-x-hidden overflow-y-auto transition-opacity duration-300 select-none ${
      isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      {/* Background Radial Glow */}
      <div className={`absolute inset-0 ${currentStyle.radialGlow} pointer-events-none`}></div>

      {/* Top Header Row with Classification & Close Button */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between z-20 relative flex-shrink-0">
        <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider opacity-85">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate">CIVIC CLEARANCE ENCRYPTED</span>
        </div>

        <button
          onClick={handleEnter}
          className={`p-1.5 px-3 rounded-xl ${currentStyle.topBarBtn} transition-all flex items-center gap-1 text-[11px] font-mono font-bold group active:scale-95 flex-shrink-0`}
          title="Close Splash & Enter Platform"
        >
          <span>Skip & Enter</span>
          <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Main Center Content Card - Scaled to fit all mobile & tablet screens naturally */}
      <div className="relative z-10 max-w-lg w-full mx-auto flex flex-col items-center text-center space-y-2.5 sm:space-y-3.5 my-auto py-1">
        {/* Official Agency Crest / Seal */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center flex-shrink-0">
          <div className={`absolute inset-0 rounded-full ${currentStyle.sealOuterGlow} blur-lg opacity-40 animate-pulse`}></div>
          <div className={`relative w-full h-full rounded-full ${currentStyle.sealInnerBg} border-2 border-slate-700/60 p-2 sm:p-2.5 shadow-2xl flex items-center justify-center`}>
            {/* Seal Vector Geometry */}
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fontSize="7.8" fontWeight="bold" fill="currentColor" opacity="0.85" letterSpacing="2.2">
                <textPath href="#textPath" startOffset="0%">
                  • NATIONAL POLICE ACCOUNTABILITY • JUSTICE PULSE
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className={`w-8 h-8 sm:w-11 sm:h-11 ${currentStyle.sealIconColor} drop-shadow-md`} />
            </div>
          </div>
        </div>

        {/* Agency Titles & Latin Motto */}
        <div className="space-y-1">
          <p className={`text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase ${currentStyle.motto}`}>
            « FIAT JUSTITIA RUAT CAELUM »
          </p>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight font-display ${currentStyle.brandTitle}`}>
            JUSTICE<span className={currentStyle.brandHighlight}>PULSE</span>
          </h1>
          <p className={`text-xs sm:text-sm font-semibold max-w-sm mx-auto leading-tight ${currentStyle.summaryText}`}>
            Civil Rights Defense Hub & Forensic Evidence Registry
          </p>
        </div>

        {/* Official Mandate Statement Box */}
        <div className={`w-full ${currentStyle.mandateBox} rounded-2xl p-3 sm:p-3.5 space-y-1 text-left relative overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-slate-700/30 pb-1 mb-1">
            <span className={`text-[8.5px] sm:text-[9.5px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${currentStyle.mandateTag}`}>
              CONSTITUTIONAL MISSION
            </span>
            <span className="text-[9px] font-mono opacity-60">RULE 1006 / § 1983</span>
          </div>
          <p className="text-[11px] sm:text-xs leading-relaxed opacity-90">
            Empowering communities with verified Brady officer registries, cryptographic evidence chain-of-custody, and mutual aid sanctuary for victims of police violence.
          </p>
        </div>

        {/* Live Progress Bar & Status Feed */}
        <div className="w-full space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
            <span className={`truncate mr-2 font-bold ${currentStyle.progressText}`}>
              {statusText}
            </span>
            <span className="font-bold flex-shrink-0">{progress}%</span>
          </div>

          <div className={`w-full h-2 sm:h-2.5 ${currentStyle.progressBarBg} rounded-full overflow-hidden p-0.5 shadow-inner`}>
            <div
              style={{ width: `${progress}%` }}
              className={`h-full ${currentStyle.progressBarFill} rounded-full transition-all duration-150 shadow-sm`}
            ></div>
          </div>
        </div>

        {/* Enter Platform CTA & Auto Countdown */}
        <div className="w-full pt-1 flex flex-col items-center space-y-2">
          <button
            onClick={handleEnter}
            className={`w-full py-3 sm:py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm ${currentStyle.enterBtn} flex items-center justify-center space-x-2 transition-all transform active:scale-95 group font-mono uppercase tracking-wider`}
          >
            <span>{isReady ? 'ENTER JUSTICE PLATFORM' : 'PROCEED TO PUBLIC SQUARE'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono opacity-70">
            <Clock className="w-3 h-3 text-amber-500 animate-spin" />
            <span>Auto-entering in <strong>{countdown}s</strong> • Tap Enter or Spacebar</span>
          </div>
        </div>
      </div>

      {/* Developer & Producer Footer */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono border-t border-slate-700/30 pt-2 z-20 relative flex-shrink-0 opacity-80">
        <div>
          Produced by{' '}
          <a
            href="https://www.addinteractive.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold ${currentStyle.footerLink}`}
          >
            Add Interactive Studios
          </a>
        </div>
        <div className="truncate">
          BY NEXT Justice Media • Build v2.4
        </div>
      </div>
    </div>
  );
}
