import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Scale, 
  Pin, 
  Video, 
  FolderLock, 
  Users, 
  Gavel, 
  FileText, 
  Radio, 
  Heart, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { initialCases } from '../../data/casesData';
import { USER_ROLES } from '../../data/rolesData';

export default function PublicLandingView({ 
  onOpenAuthModal, 
  onOpenEvidenceSuite, 
  onSelectCase, 
  onNavigateTab 
}) {
  const stats = [
    { label: 'Settlement Payouts Tracked', value: '$3.4B+', icon: Scale, color: 'text-amber-400' },
    { label: 'Verified Incident Dockets', value: '2,480+', icon: FolderLock, color: 'text-sky-400' },
    { label: 'Brady Officers Indexed', value: '14,200+', icon: ShieldAlert, color: 'text-rose-400' },
    { label: 'SHA-256 Vault Artifacts', value: '98,000+', icon: ShieldCheck, color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-10 sm:space-y-14 animation-fade-in select-none pb-12">
      {/* Hero Showcase Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#111726] via-[#0d1322] to-[#080c14] border-2 border-[#243147] p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-justice-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-justice-950/80 border border-justice-700/80 text-justice-300 text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>NATIONAL CIVIC DEFENSE NETWORK • RULE 1006 CERTIFIED</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-justice-400 uppercase">
              « FIAT JUSTITIA RUAT CAELUM »
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
              EQUAL JUSTICE.<br />
              <span className="bg-gradient-to-r from-justice-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                FORENSIC ACCOUNTABILITY.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed pt-2">
              Empowering civil rights attorneys, prosecutors, judges, eyewitnesses, and victims' families with FBI-grade forensic whiteboards, verified Brady misconduct tracking, and cryptographic evidence chain-of-custody.
            </p>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenAuthModal('register')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-justice-600 via-indigo-600 to-purple-600 hover:from-justice-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center space-x-2 active:scale-95 transition-all"
            >
              <span>Create Role-Based Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenEvidenceSuite('corkboard')}
              className="px-5 py-3.5 rounded-2xl bg-[#080c14] hover:bg-[#1a243b] text-slate-200 hover:text-white font-bold text-xs sm:text-sm border-2 border-[#243147] transition-all flex items-center space-x-2 active:scale-95 shadow-md"
            >
              <Pin className="w-4 h-4 text-indigo-400" />
              <span>Launch Evidence Platform (Demo)</span>
            </button>

            <button
              onClick={() => onOpenAuthModal('login')}
              className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Live Statistics Counter Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-[#1e2a3f]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#080c14]/90 border border-[#1e2a3f] flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-black text-white font-mono">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Role-Based Clearance Matrix Banner */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Tailored Workspaces by Case Role
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Select your real-world role during registration to unlock specialized evidentiary tooling
            </p>
          </div>
          <button
            onClick={() => onOpenAuthModal('register')}
            className="text-xs font-mono text-justice-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Register by Role</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {USER_ROLES.slice(0, 6).map((role) => (
            <div
              key={role.id}
              className="p-4 rounded-2xl bg-[#111726] border border-[#243147] hover:border-justice-500/50 transition-all flex flex-col justify-between space-y-3 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-justice-300 transition-colors">
                    {role.title}
                  </h3>
                  <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded font-bold ${role.badgeColor}`}>
                    {role.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1c273a] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-justice-400 font-semibold">{role.clearanceLevel}</span>
                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="text-slate-300 hover:text-white font-bold underline"
                >
                  Join as {role.shortTitle}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Evidence Suite Highlights */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold">
                FORENSIC OS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                Federal Evidence Command Suite
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Integrated Red-String Detective Corkboard, Multi-Angle Synchronizer & SHA-256 Cryptographic Vault
            </p>
          </div>

          <button
            onClick={() => onOpenEvidenceSuite('corkboard')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-glow-indigo transition-all flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <span>Open Standalone Suite</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => onOpenEvidenceSuite('corkboard')}
            className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-indigo-500 cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <Pin className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300">
              Detective Red-String Whiteboard
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Draggable polaroids, officer cards, ballistic trajectories, and real-time connecting yarn threads.
            </p>
          </div>

          <div 
            onClick={() => onOpenEvidenceSuite('multicam')}
            className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-teal-500 cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-950 border border-teal-700 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <Video className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-teal-300">
              Multi-Angle Bodycam Synchronizer
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              4K timeline sync between officer bodycams, cruiser dashcams, and bystander phones with audio waveforms.
            </p>
          </div>

          <div 
            onClick={() => onOpenEvidenceSuite('vault')}
            className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-emerald-500 cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <FolderLock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300">
              Cryptographic SHA-256 Vault
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Immutable chain-of-custody ledger preventing bodycam deletion, tampering, or backroom alterations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured National Incident Dockets */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Active National Dockets
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Verified Section 1983 civil rights cases with public grand jury review
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('cases')}
            className="text-xs font-mono text-justice-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>View All Cases</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {initialCases.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCase(c.id)}
              className="p-4 rounded-2xl bg-[#111726] border border-[#243147] hover:border-justice-500 cursor-pointer transition-all flex flex-col justify-between space-y-3 group shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                    {c.location}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">
                    VERIFIED
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-justice-300 transition-colors leading-tight line-clamp-2">
                  {c.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {c.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1c273a] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{c.evidenceCount || 12} Artifacts</span>
                <span className="text-justice-400 font-bold flex items-center gap-0.5">
                  <span>Inspect Docket</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
