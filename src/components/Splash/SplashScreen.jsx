import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, ChevronRight, X, Clock, ArrowRight } from 'lucide-react';

export default function SplashScreen({ onFinish, currentTheme = 'theme-midnight-navy', isHighContrast = false }) {
  const [progress, setProgress] = useState(0);
  const [sloganIndex, setSloganIndex] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Rotating slogans for animated presentation
  const slogans = [
    { latin: '« FIAT JUSTITIA RUAT CAELUM »', english: 'Let Justice Be Done Though The Heavens Fall' },
    { latin: '« AEQUITAS ET VERITAS »', english: 'Equal Protection Under The Law & Community Defense' },
    { latin: '« LUX IN TENEBRIS »', english: 'Forensic Truth, Accountability & Citizen Sanctuary' }
  ];

  // Cycle animated slogan every 2.8 seconds
  useEffect(() => {
    const sloganTimer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 2800);
    return () => clearInterval(sloganTimer);
  }, []);

  // Theme styling configuration map (Colors only)
  const getThemeStyling = (theme) => {
    switch (theme) {
      case 'theme-daylight-clean':
        return {
          bg: 'bg-[#f4f6fb] text-slate-900',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(14,165,233,0.22),transparent_70%)]',
          topBarBtn: 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-md',
          ringColor: 'stroke-sky-500/40',
          ringDash: 'stroke-blue-600/60',
          sealOuterGlow: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600',
          sealInnerBg: 'bg-white text-slate-900',
          sealIconColor: 'text-sky-600',
          brandTitle: 'bg-gradient-to-r from-slate-950 via-slate-800 to-sky-700 bg-clip-text text-transparent',
          brandHighlight: 'text-sky-600',
          mottoLatin: 'text-sky-700',
          mottoEnglish: 'text-slate-600',
          progressBarBg: 'bg-slate-200 border-slate-300',
          progressBarFill: 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600',
          progressText: 'text-slate-700',
          enterBtn: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-glow border-sky-300',
          footerText: 'text-slate-500',
          footerLink: 'text-sky-600'
        };

      case 'theme-vintage-parchment':
        return {
          bg: 'bg-[#f4ede2] text-[#291a0c]',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(180,83,9,0.2),transparent_70%)]',
          topBarBtn: 'bg-[#fffdf8] text-[#291a0c] border-[#d8c8b2] hover:bg-[#ece3d4] shadow-md',
          ringColor: 'stroke-amber-600/40',
          ringDash: 'stroke-amber-800/60',
          sealOuterGlow: 'bg-gradient-to-br from-amber-500 via-amber-700 to-yellow-800',
          sealInnerBg: 'bg-[#fffdf8] text-[#291a0c]',
          sealIconColor: 'text-amber-700',
          brandTitle: 'bg-gradient-to-r from-[#291a0c] via-[#451a03] to-amber-800 bg-clip-text text-transparent',
          brandHighlight: 'text-amber-700',
          mottoLatin: 'text-amber-800',
          mottoEnglish: 'text-[#573e26]',
          progressBarBg: 'bg-[#ece3d4] border-[#d8c8b2]',
          progressBarFill: 'bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-700',
          progressText: 'text-[#573e26]',
          enterBtn: 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:to-amber-700 text-amber-50 shadow-md border-amber-500',
          footerText: 'text-[#573e26]',
          footerLink: 'text-amber-800'
        };

      case 'theme-oled-obsidian':
        return {
          bg: 'bg-[#000000] text-white',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(96,165,250,0.2),transparent_70%)]',
          topBarBtn: 'bg-[#0a0a0a] text-white border-slate-700 hover:bg-slate-900 shadow-xl',
          ringColor: 'stroke-slate-700',
          ringDash: 'stroke-sky-400',
          sealOuterGlow: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500',
          sealInnerBg: 'bg-[#000000] text-white',
          sealIconColor: 'text-sky-400',
          brandTitle: 'text-white',
          brandHighlight: 'text-sky-400',
          mottoLatin: 'text-sky-400',
          mottoEnglish: 'text-slate-300',
          progressBarBg: 'bg-[#0a0a0a] border-slate-700',
          progressBarFill: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500',
          progressText: 'text-slate-300',
          enterBtn: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-glow border-2 border-sky-400',
          footerText: 'text-slate-400',
          footerLink: 'text-sky-400'
        };

      case 'theme-sanctuary-emerald':
        return {
          bg: 'bg-[#06140e] text-emerald-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.25),transparent_70%)]',
          topBarBtn: 'bg-[#0c2017] text-emerald-200 border-[#1a4d38] hover:bg-[#123828]',
          ringColor: 'stroke-emerald-600/40',
          ringDash: 'stroke-emerald-400/70',
          sealOuterGlow: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600',
          sealInnerBg: 'bg-[#040e0a] text-emerald-100',
          sealIconColor: 'text-emerald-400',
          brandTitle: 'bg-gradient-to-r from-white via-emerald-100 to-teal-300 bg-clip-text text-transparent',
          brandHighlight: 'text-emerald-400',
          mottoLatin: 'text-emerald-300',
          mottoEnglish: 'text-emerald-200/90',
          progressBarBg: 'bg-[#040e0a] border-[#1a4d38]',
          progressBarFill: 'bg-gradient-to-r from-emerald-400 to-teal-400',
          progressText: 'text-emerald-300',
          enterBtn: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-emerald border-emerald-400',
          footerText: 'text-emerald-400/80',
          footerLink: 'text-emerald-300'
        };

      case 'theme-courtroom-gold':
        return {
          bg: 'bg-[#120b07] text-amber-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.25),transparent_70%)]',
          topBarBtn: 'bg-[#1f140e] text-amber-200 border-[#4a3020] hover:bg-[#2d1e15]',
          ringColor: 'stroke-amber-600/40',
          ringDash: 'stroke-amber-400/70',
          sealOuterGlow: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700',
          sealInnerBg: 'bg-[#0e0805] text-amber-100',
          sealIconColor: 'text-amber-400',
          brandTitle: 'bg-gradient-to-r from-white via-amber-100 to-yellow-300 bg-clip-text text-transparent',
          brandHighlight: 'text-amber-400',
          mottoLatin: 'text-amber-300',
          mottoEnglish: 'text-amber-200/90',
          progressBarBg: 'bg-[#0e0805] border-[#4a3020]',
          progressBarFill: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600',
          progressText: 'text-amber-300',
          enterBtn: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-white shadow-glow-amber border-amber-400',
          footerText: 'text-amber-400/80',
          footerLink: 'text-amber-300'
        };

      case 'theme-crimson-alert':
        return {
          bg: 'bg-[#14070a] text-rose-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(239,68,68,0.25),transparent_70%)]',
          topBarBtn: 'bg-[#240c12] text-rose-200 border-[#541c27] hover:bg-[#34121a]',
          ringColor: 'stroke-rose-600/40',
          ringDash: 'stroke-crimson-400/70',
          sealOuterGlow: 'bg-gradient-to-br from-crimson-400 via-red-500 to-rose-600',
          sealInnerBg: 'bg-[#0c0406] text-rose-100',
          sealIconColor: 'text-crimson-400',
          brandTitle: 'bg-gradient-to-r from-white via-rose-100 to-red-300 bg-clip-text text-transparent',
          brandHighlight: 'text-crimson-400',
          mottoLatin: 'text-rose-400',
          mottoEnglish: 'text-rose-200/90',
          progressBarBg: 'bg-[#0c0406] border-[#541c27]',
          progressBarFill: 'bg-gradient-to-r from-crimson-500 via-red-500 to-rose-500',
          progressText: 'text-rose-300',
          enterBtn: 'bg-gradient-to-r from-crimson-600 via-red-600 to-rose-700 hover:from-crimson-500 hover:to-red-500 text-white shadow-glow-crimson border-crimson-400',
          footerText: 'text-rose-400/80',
          footerLink: 'text-rose-300'
        };

      case 'theme-cyberpunk-neon':
        return {
          bg: 'bg-[#090516] text-purple-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.25),transparent_70%)]',
          topBarBtn: 'bg-[#150d30] text-cyan-200 border-[#3b1d75] hover:bg-[#22154d]',
          ringColor: 'stroke-purple-600/40',
          ringDash: 'stroke-cyan-400/80',
          sealOuterGlow: 'bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500',
          sealInnerBg: 'bg-[#05030d] text-purple-100',
          sealIconColor: 'text-cyan-400',
          brandTitle: 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent',
          brandHighlight: 'text-cyan-400',
          mottoLatin: 'text-cyan-300',
          mottoEnglish: 'text-purple-200/90',
          progressBarBg: 'bg-[#05030d] border-[#3b1d75]',
          progressBarFill: 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500',
          progressText: 'text-cyan-300',
          enterBtn: 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-glow border-cyan-400',
          footerText: 'text-purple-400/80',
          footerLink: 'text-cyan-400'
        };

      case 'theme-pacific-ocean':
        return {
          bg: 'bg-[#040e1b] text-cyan-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(20,184,166,0.22),transparent_70%)]',
          topBarBtn: 'bg-[#0a1e38] text-teal-200 border-[#17427a] hover:bg-[#0f2d54]',
          ringColor: 'stroke-teal-600/40',
          ringDash: 'stroke-cyan-400/70',
          sealOuterGlow: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600',
          sealInnerBg: 'bg-[#020810] text-cyan-100',
          sealIconColor: 'text-teal-400',
          brandTitle: 'bg-gradient-to-r from-white via-cyan-100 to-teal-300 bg-clip-text text-transparent',
          brandHighlight: 'text-teal-400',
          mottoLatin: 'text-teal-300',
          mottoEnglish: 'text-cyan-200/90',
          progressBarBg: 'bg-[#020810] border-[#17427a]',
          progressBarFill: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500',
          progressText: 'text-teal-300',
          enterBtn: 'bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-glow border-teal-400',
          footerText: 'text-teal-400/80',
          footerLink: 'text-teal-300'
        };

      case 'theme-capitol-monolith':
        return {
          bg: 'bg-[#0f1115] text-slate-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(226,232,240,0.15),transparent_70%)]',
          topBarBtn: 'bg-[#1c2026] text-slate-200 border-[#38404d] hover:bg-[#282d36]',
          ringColor: 'stroke-slate-600/40',
          ringDash: 'stroke-slate-300/70',
          sealOuterGlow: 'bg-gradient-to-br from-slate-400 via-slate-300 to-slate-500',
          sealInnerBg: 'bg-[#08090b] text-slate-100',
          sealIconColor: 'text-slate-300',
          brandTitle: 'text-white',
          brandHighlight: 'text-slate-300',
          mottoLatin: 'text-slate-400',
          mottoEnglish: 'text-slate-300',
          progressBarBg: 'bg-[#08090b] border-[#38404d]',
          progressBarFill: 'bg-gradient-to-r from-slate-400 to-slate-200',
          progressText: 'text-slate-300',
          enterBtn: 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white shadow-md border-slate-500',
          footerText: 'text-slate-400',
          footerLink: 'text-slate-300'
        };

      default: // theme-midnight-navy
        return {
          bg: 'bg-[#070b14] text-slate-100',
          radialGlow: 'bg-[radial-gradient(circle_at_50%_35%,rgba(14,142,233,0.22),transparent_70%)]',
          topBarBtn: 'bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800 shadow-lg',
          ringColor: 'stroke-indigo-600/40',
          ringDash: 'stroke-sky-400/80',
          sealOuterGlow: 'bg-gradient-to-br from-justice-400 via-indigo-500 to-purple-600',
          sealInnerBg: 'bg-[#080c14] text-slate-100',
          sealIconColor: 'text-justice-400',
          brandTitle: 'bg-gradient-to-r from-white via-slate-100 to-justice-300 bg-clip-text text-transparent',
          brandHighlight: 'text-justice-400',
          mottoLatin: 'text-justice-300',
          mottoEnglish: 'text-slate-300',
          progressBarBg: 'bg-[#080c14] border-[#1e2a3f]',
          progressBarFill: 'bg-gradient-to-r from-justice-500 via-indigo-500 to-purple-600',
          progressText: 'text-slate-400',
          enterBtn: 'bg-gradient-to-r from-justice-600 via-indigo-600 to-purple-600 hover:from-justice-500 hover:to-indigo-500 text-white shadow-glow border-2 border-justice-300',
          footerText: 'text-slate-400',
          footerLink: 'text-justice-400'
        };
    }
  };

  const style = getThemeStyling(currentTheme);

  // Rapid loading progress simulation
  useEffect(() => {
    const initDuration = 2000;
    const intervalTime = 25;
    const totalSteps = initDuration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        setIsReady(true);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // 15-second countdown before auto-entering
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

  // Keyboard shortcut listener
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
    <div className={`fixed inset-0 z-50 ${style.bg} w-full h-[100dvh] flex flex-col justify-between p-4 sm:p-6 overflow-hidden transition-opacity duration-300 select-none ${
      isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      {/* Dynamic Ambient Background Glow */}
      <div className={`absolute inset-0 ${style.radialGlow} pointer-events-none`}></div>

      {/* Top Header Row */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between z-20 relative flex-shrink-0">
        <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider opacity-85">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold">CIVIC ENCRYPTION PROTOCOL</span>
        </div>

        <button
          onClick={handleEnter}
          className={`p-1.5 px-3 rounded-xl ${style.topBarBtn} transition-all flex items-center gap-1 text-[11px] font-mono font-bold group active:scale-95 flex-shrink-0`}
          title="Skip Intro & Enter Platform"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Main Center Stage: Animated Justice Emblem & Shimmering Slogan */}
      <div className="relative z-10 max-w-lg w-full mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-6 my-auto py-2">
        
        {/* ========================================================================= */}
        {/* ANIMATED JUSTICE EMBLEM (ORBITING ENERGY RINGS + SCALES OF JUSTICE)        */}
        {/* ========================================================================= */}
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center flex-shrink-0">
          {/* Ambient Glow Halo */}
          <div className={`absolute inset-0 rounded-full ${style.sealOuterGlow} blur-2xl opacity-40 animate-pulse`}></div>

          {/* Outer Orbiting Cybernetic Ring (Clockwise) */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_35s_linear_infinite]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" className={style.ringColor} strokeWidth="1.5" />
            <circle cx="100" cy="100" r="92" fill="none" className={style.ringDash} strokeWidth="2.5" strokeDasharray="14 20" strokeLinecap="round" />
            {/* Orbital Nodes */}
            <circle cx="100" cy="8" r="3" fill="#38bdf8" />
            <circle cx="100" cy="192" r="3" fill="#38bdf8" />
            <circle cx="8" cy="100" r="3" fill="#fbbf24" />
            <circle cx="192" cy="100" r="3" fill="#fbbf24" />
          </svg>

          {/* Inner Counter-Rotating Precision Ring (Counter-Clockwise) */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_20s_linear_infinite_reverse]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="82" fill="none" className={style.ringColor} strokeWidth="1" strokeDasharray="4 8" />
          </svg>

          {/* Core Central Shield with Scales of Justice */}
          <div className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl ${style.sealInnerBg} border-2 border-slate-700/60 p-3 shadow-2xl flex items-center justify-center transform transition-transform hover:scale-105 duration-300`}>
            {/* Shield Silhouette Geometry */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
              {/* Shield Outline */}
              <path
                d="M 50 8 L 85 24 C 85 62 70 82 50 94 C 30 82 15 62 15 24 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
                className={style.sealIconColor}
              />
              {/* Internal Scales of Justice */}
              <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                {/* Central Balance Pillar */}
                <line x1="50" y1="26" x2="50" y2="74" strokeWidth="3" />
                <line x1="42" y1="74" x2="58" y2="74" strokeWidth="3" />
                {/* Balance Beam (Slight Dynamic Tilt) */}
                <line x1="28" y1="38" x2="72" y2="38" strokeWidth="3" className="animate-[wiggle_4s_ease-in-out_infinite]" />
                {/* Left Pan */}
                <path d="M 28 38 L 22 52 H 34 Z" fill="none" />
                {/* Right Pan */}
                <path d="M 72 38 L 66 52 H 78 Z" fill="none" />
                {/* Central Star of Integrity */}
                <circle cx="50" cy="38" r="3" fill="#fbbf24" stroke="none" />
              </g>
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GRAND PLATFORM TITLE & ANIMATED SHIMMERING SLOGANS                        */}
        {/* ========================================================================= */}
        <div className="space-y-2 max-w-md mx-auto">
          {/* Main Title */}
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display ${style.brandTitle} drop-shadow-sm`}>
            JUSTICE<span className={style.brandHighlight}>PULSE</span>
          </h1>

          {/* Dynamic Animated Latin Motto & English Translation Carousel */}
          <div className="min-h-[58px] flex flex-col items-center justify-center space-y-1">
            <p className={`text-xs sm:text-sm font-mono font-black tracking-[0.25em] uppercase ${style.mottoLatin} transition-all duration-500 animate-pulse`}>
              {slogans[sloganIndex].latin}
            </p>
            <p className={`text-xs sm:text-sm font-medium ${style.mottoEnglish} transition-opacity duration-500 italic max-w-xs sm:max-w-sm leading-snug`}>
              "{slogans[sloganIndex].english}"
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLEEK PROGRESS LOADER & ENTER ACTION                                     */}
        {/* ========================================================================= */}
        <div className="w-full max-w-sm space-y-3 pt-2">
          {/* Progress Bar with Glowing Head */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold">
              <span className={`truncate ${style.progressText}`}>
                {isReady ? 'CIVIC ACCESS GRANTED' : 'SYNCHRONIZING REPOSITORIES...'}
              </span>
              <span className="font-bold">{progress}%</span>
            </div>

            <div className={`w-full h-2 ${style.progressBarBg} rounded-full overflow-hidden p-0.5 shadow-inner`}>
              <div
                style={{ width: `${progress}%` }}
                className={`h-full ${style.progressBarFill} rounded-full transition-all duration-150 shadow-sm relative`}
              ></div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleEnter}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm ${style.enterBtn} flex items-center justify-center space-x-2 transition-all transform active:scale-95 group font-mono uppercase tracking-wider shadow-xl`}
          >
            <span>{isReady ? 'ENTER JUSTICE PLATFORM' : 'PROCEED TO PUBLIC SQUARE'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Automatic Timer Hint */}
          <div className="flex items-center justify-center space-x-1.5 text-[10px] sm:text-[11px] font-mono opacity-70">
            <Clock className="w-3 h-3 animate-spin" />
            <span>Auto-entering in <strong>{countdown}s</strong> • Tap Enter or Space</span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono border-t border-slate-700/30 pt-2 z-20 relative flex-shrink-0 opacity-80">
        <div>
          Produced by{' '}
          <a
            href="https://www.addinteractive.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold hover:underline ${style.footerLink}`}
          >
            Add Interactive Studios
          </a>
        </div>
        <div className="truncate">
          BY NEXT Justice Media • Civic Hub
        </div>
      </div>
    </div>
  );
}
