import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Pin, 
  Video, 
  Gavel, 
  FolderLock, 
  EyeOff, 
  FileText, 
  Maximize2, 
  Minimize2, 
  X, 
  ChevronLeft, 
  Search, 
  Lock, 
  Scale, 
  Monitor, 
  HardDrive,
  Palette,
  Sliders,
  Briefcase,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Key,
  MessageSquare,
  FileCheck,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FBIEvidenceHUD from '../InvestigationBoard/FBIEvidenceHUD';
import MultiCamStudioView from '../MultiCam/MultiCamStudioView';
import DepositionSimulatorView from '../Deposition/DepositionSimulatorView';
import EvidenceVaultView from '../EvidenceVault/EvidenceVaultView';
import WhistleblowerView from '../Whistleblower/WhistleblowerView';
import ComplaintGeneratorView from '../ComplaintGenerator/ComplaintGeneratorView';
import { initialCases } from '../../data/casesData';

export default function UnifiedEvidenceDashboard({ 
  onClose, 
  showToast, 
  onOpenCaseDetail, 
  onOpenSettingsModal,
  currentUser,
  currentTheme,
  isHighContrast,
  fontSizeScale,
  initialSubTab = 'corkboard' 
}) {
  const [activeEvidenceTab, setActiveEvidenceTab] = useState(initialSubTab);
  const [libraryFilter, setLibraryFilter] = useState('all');
  const [librarySearch, setLibrarySearch] = useState('');

  const evidenceModules = [
    {
      id: 'my_cases',
      title: 'My Assigned Case Dockets',
      shortLabel: '📁 My Cases',
      subtitle: 'Role-filtered active cases, discovery packets & defense communications',
      icon: Briefcase,
      badge: 'Role Workspace',
      badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800'
    },
    {
      id: 'library',
      title: 'Federal Evidence Library & Exhibit Vault',
      shortLabel: '🏛️ Evidence Library',
      subtitle: 'Universal repository of forensic bodycams, ballistics & depositions',
      icon: BookOpen,
      badge: 'Universal Vault',
      badgeColor: 'bg-sky-950 text-sky-300 border border-sky-800'
    },
    {
      id: 'corkboard',
      title: 'Detective Corkboard & Red-String Matrix',
      shortLabel: '📌 Detective Corkboard',
      subtitle: 'Visual link pins, polaroid exhibits & elastic strings',
      icon: Pin,
      badge: 'FBI Matrix',
      badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800'
    },
    {
      id: 'multicam',
      title: 'Multi-Cam Synchronized Video Studio',
      shortLabel: '🎬 Multi-Cam Video Studio',
      subtitle: 'Multi-angle bodycam, dashcam & acoustic timeline',
      icon: Video,
      badge: 'Frame Sync',
      badgeColor: 'bg-teal-950 text-teal-300 border border-teal-800'
    },
    {
      id: 'deposition',
      title: 'Veritas Deposition Cross-Examination Room',
      shortLabel: '⚖️ Deposition Simulator',
      subtitle: 'AI cross-examination, judicial rulings & impeachment',
      icon: Gavel,
      badge: 'Trial AI',
      badgeColor: 'bg-rose-950 text-rose-300 border border-rose-800'
    },
    {
      id: 'vault',
      title: 'Cryptographic Evidence Vault & Chain of Custody',
      shortLabel: '🔒 SHA-256 Custody Vault',
      subtitle: 'Immutable forensic ledger & integrity checksums',
      icon: FolderLock,
      badge: 'SHA-256',
      badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800'
    },
    {
      id: 'whistleblower',
      title: 'Encrypted Whistleblower Sanctuary',
      shortLabel: '🕊️ Whistleblower Drop',
      subtitle: 'Zero-knowledge anonymous internal affairs intake',
      icon: EyeOff,
      badge: 'Zero-Trace',
      badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800'
    },
    {
      id: 'pleadings',
      title: 'Section 1983 Complaint & Discovery Generator',
      shortLabel: '📜 § 1983 Pleading Studio',
      subtitle: 'Federal court caption pleadings & Monell claims',
      icon: FileText,
      badge: 'Court Pleading',
      badgeColor: 'bg-blue-950 text-blue-300 border border-blue-800'
    }
  ];

  const currentModule = evidenceModules.find(m => m.id === activeEvidenceTab) || evidenceModules[0];

  // Filter assigned cases for "My Cases"
  const assignedCasesList = initialCases.filter(c => 
    currentUser?.assignedCases?.includes(c.id) || 
    currentUser?.roleId === 'admin' || 
    currentUser?.roleId === 'legal_moderator'
  );

  // Sample master evidence library artifacts
  const libraryArtifacts = [
    {
      id: 'art-001',
      title: 'Unredacted Deputy Axon Bodycam (14m 22s)',
      caseTitle: 'State v. Grayson (Sonya Massey Case)',
      caseId: 'case-sonya-massey',
      category: 'video',
      sha256: '9f83a2e1d09b8c7a6e5f4d3c2b1a0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d',
      size: '2.4 GB (ProRes 4K)',
      status: 'VERIFIED',
      clearanceRequired: 'Public Redacted'
    },
    {
      id: 'art-002',
      title: 'Deputy Eddie Duran Audio Acoustic Analysis & Decibel Graph',
      caseTitle: 'State v. Duran (Senior Airman Roger Fortson)',
      caseId: 'case-roger-fortson',
      category: 'audio',
      sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
      size: '420 MB (FLAC 24-bit/96kHz)',
      status: 'COURT ADMISSIBLE',
      clearanceRequired: 'Counsel Privileged'
    },
    {
      id: 'art-003',
      title: 'Laser Trajectory & Bullet Entry 3D Sandbox Scan',
      caseTitle: 'Estate of Breonna Taylor v. Louisville Metro',
      caseId: 'case-breonna-taylor',
      category: 'forensic',
      sha256: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
      size: '1.8 GB (LIDAR Point Cloud)',
      status: 'RULE 1006 CERTIFIED',
      clearanceRequired: 'Federal Discovery'
    },
    {
      id: 'art-004',
      title: 'Ketamine Dosage Log & EMS Radio Dispatch Tape',
      caseTitle: 'People v. Roedema & Rosenblatt (Elijah McClain)',
      caseId: 'case-elijah-mcclain',
      category: 'audio',
      sha256: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
      size: '185 MB (Lossless WAV)',
      status: 'VERIFIED',
      clearanceRequired: 'Public Admissible'
    }
  ];

  const filteredLibrary = libraryArtifacts.filter(art => {
    const matchesFilter = libraryFilter === 'all' || art.category === libraryFilter;
    const matchesSearch = art.title.toLowerCase().includes(librarySearch.toLowerCase()) || 
                          art.caseTitle.toLowerCase().includes(librarySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const fontScaleClass = 
    fontSizeScale === 'large' 
      ? 'font-scale-large' 
      : fontSizeScale === 'xlarge' 
      ? 'font-scale-xlarge' 
      : 'font-scale-normal';

  return (
    <div className={`fixed inset-0 z-50 bg-[#090d16] text-slate-100 flex flex-col overflow-hidden select-none animation-fade-in transition-colors duration-200 ${currentTheme} ${isHighContrast ? 'high-contrast-mode' : ''} ${fontScaleClass}`}>
      {/* Top Forensic OS Window Bar */}
      <header className="h-16 bg-[#111726] border-b-2 border-[#243147] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 shadow-2xl">
        {/* Left: Window Identity & Exit Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#080c14] hover:bg-[#1a243b] text-slate-200 hover:text-white text-xs font-bold transition-all border-2 border-[#243147] shadow-md group"
            title="Exit to Public Square"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Exit to Public Square</span>
            <span className="sm:hidden">Exit</span>
          </button>

          <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-mono">
                  VERITAS EVIDENCE COMMAND SUITE
                </h1>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold hidden md:inline">
                  STANDALONE FORENSIC WORKSPACE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Federal Section 1983 & Brady Forensic Chain-of-Custody Matrix
              </p>
            </div>
          </div>
        </div>

        {/* Center: Current User Role & Clearance Badge */}
        <div className="hidden md:flex items-center space-x-2 font-mono text-[11px]">
          <div className="flex items-center space-x-2 bg-[#080c14] px-3 py-1.5 rounded-xl border border-indigo-900/60 shadow-inner">
            <UserCheck className="w-3.5 h-3.5 text-justice-400" />
            <span className="text-white font-bold">{currentUser?.name || 'Authorized Member'}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold uppercase">
              {currentUser?.role || 'Civil Rights Advocate'}
            </span>
          </div>
        </div>

        {/* Right: Theme Switcher & Actions */}
        <div className="flex items-center space-x-2">
          {/* Direct 10 Visual Themes Button */}
          <button
            onClick={onOpenSettingsModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#080c14] hover:bg-[#1a243b] text-slate-200 hover:text-white text-xs font-mono font-bold transition-all border-2 border-[#243147] active:scale-95"
            title="Switch Theme"
          >
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">10 Themes</span>
          </button>

          <button
            onClick={() => {
              confetti({ particleCount: 40, spread: 60 });
              showToast('Complete Forensic Discovery Packet exported (Rule 1006 Admissible)!', 'success');
            }}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-glow-indigo transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Master Packet</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#080c14] hover:bg-crimson-950 text-slate-400 hover:text-crimson-300 border-2 border-[#243147] transition-all"
            title="Close Evidence Suite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Module Sub-Navigation Ribbon */}
      <div className="bg-[#080c14] border-b-2 border-[#243147] px-4 sm:px-6 py-2 overflow-x-auto flex-shrink-0 flex items-center justify-between gap-3">
        <div className="flex space-x-2">
          {evidenceModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeEvidenceTab === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => setActiveEvidenceTab(mod.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-glow-indigo'
                    : 'bg-[#111726] text-slate-300 border-[#243147] hover:border-slate-600 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{mod.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono text-slate-400">
          <span>Active Module:</span>
          <strong className="text-white">{currentModule.title}</strong>
        </div>
      </div>

      {/* Dynamic Module Workspace Body */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* ========================================================================= */}
          {/* MODULE 1: MY ASSIGNED CASES                                              */}
          {/* ========================================================================= */}
          {activeEvidenceTab === 'my_cases' && (
            <div className="space-y-6 animation-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                      <h2 className="text-lg sm:text-xl font-black text-white font-display">
                        My Assigned Cases & Role Workspace
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Logged in as <strong>{currentUser?.name}</strong> • Role: <span className="text-amber-300 font-bold">{currentUser?.role}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold">
                      {assignedCasesList.length} Case(s) Linked
                    </span>
                  </div>
                </div>

                {/* Role Specific Quick Action Bar */}
                <div className="p-3.5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400 font-bold flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-justice-400" />
                    <span>Role Unlocked Actions:</span>
                  </span>

                  {(currentUser?.roleId === 'defense_attorney' || currentUser?.roleId === 'prosecutor') && (
                    <>
                      <button 
                        onClick={() => showToast('Generating Rule 1006 Discovery Packet...', 'success')}
                        className="px-3 py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 font-bold flex items-center gap-1"
                      >
                        <FileCheck className="w-3 h-3" />
                        <span>Export Discovery Packet</span>
                      </button>
                      <button 
                        onClick={() => showToast('Brady Exculpatory Motion draft ready in Pleading Studio', 'info')}
                        className="px-3 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-700 font-bold flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Draft Brady Motion</span>
                      </button>
                    </>
                  )}

                  {currentUser?.roleId === 'judge' && (
                    <>
                      <button 
                        onClick={() => showToast('In-Camera Evidence Inspection Seal Applied', 'success')}
                        className="px-3 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 font-bold flex items-center gap-1"
                      >
                        <Gavel className="w-3 h-3" />
                        <span>Issue In-Camera Seal</span>
                      </button>
                      <button 
                        onClick={() => showToast('Protective Order entered on active docket', 'success')}
                        className="px-3 py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 font-bold"
                      >
                        Protective Order
                      </button>
                    </>
                  )}

                  {(currentUser?.roleId === 'admin' || currentUser?.roleId === 'legal_moderator') && (
                    <>
                      <button 
                        onClick={() => showToast('Cryptographic SHA-256 Ledger Audit: 100% Certified', 'success')}
                        className="px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-bold flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>Audit Hashes</span>
                      </button>
                      <button 
                        onClick={() => showToast('Automatic PII Face & Audio Bleeping engine active', 'info')}
                        className="px-3 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 font-bold"
                      >
                        PII Redactor
                      </button>
                    </>
                  )}

                  {(currentUser?.roleId === 'eyewitness' || currentUser?.roleId === 'victim_family' || currentUser?.roleId === 'defendant') && (
                    <>
                      <button 
                        onClick={() => showToast('Connecting to Verified Pro Bono Case Defense Team...', 'info')}
                        className="px-3 py-1 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 font-bold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Message Legal Team</span>
                      </button>
                      <button 
                        onClick={() => showToast('Subpoena status: Active & Verified on Sangamon County Docket', 'success')}
                        className="px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-bold"
                      >
                        Subpoena Verified
                      </button>
                    </>
                  )}
                </div>

                {/* Assigned Cases List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignedCasesList.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl bg-[#080c14] border-2 border-[#243147] hover:border-justice-500/60 transition-all space-y-3 shadow-lg flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-amber-800/60 font-bold">
                            {c.location} • DOCKET #{c.id.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            RULE 1006 READY
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {c.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#1c273a] flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">{c.evidenceCount || 12} Verified Artifacts</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onOpenCaseDetail(c.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold"
                          >
                            Docket
                          </button>
                          <button
                            onClick={() => setActiveEvidenceTab('corkboard')}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shadow-glow-indigo"
                          >
                            Open Corkboard
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 2: FEDERAL EVIDENCE LIBRARY & EXHIBIT VAULT                         */}
          {/* ========================================================================= */}
          {activeEvidenceTab === 'library' && (
            <div className="space-y-6 animation-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-sky-400" />
                      <h2 className="text-lg sm:text-xl font-black text-white font-display">
                        Federal Evidence Library & Master Vault
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Repository of cryptographic 4K bodycams, acoustic telemetry, laser trajectories & sworn depositions
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search exhibits, SHA-256, cases..."
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex space-x-2 overflow-x-auto pb-1 text-xs font-mono">
                  {['all', 'video', 'audio', 'forensic'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setLibraryFilter(f)}
                      className={`px-3 py-1 rounded-xl uppercase font-bold border transition-all ${
                        libraryFilter === f
                          ? 'bg-sky-950 text-sky-300 border-sky-500'
                          : 'bg-[#080c14] text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Artifacts Table / Cards */}
                <div className="space-y-3">
                  {filteredLibrary.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-sky-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-700 font-bold uppercase">
                            {art.category}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">
                            {art.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate">{art.title}</h4>
                        <p className="text-xs text-slate-400 font-mono">{art.caseTitle} • {art.size}</p>
                        <p className="text-[9.5px] text-slate-500 font-mono truncate">SHA-256: {art.sha256}</p>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            confetti({ particleCount: 30, spread: 50 });
                            showToast(`Downloading Admissible Exhibit Packet: ${art.title}`, 'success');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-700 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Exhibit</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeEvidenceTab === 'corkboard' && (
            <FBIEvidenceHUD
              showToast={showToast}
              onOpenCaseDetail={onOpenCaseDetail}
            />
          )}

          {activeEvidenceTab === 'multicam' && (
            <MultiCamStudioView
              showToast={showToast}
            />
          )}

          {activeEvidenceTab === 'deposition' && (
            <DepositionSimulatorView
              showToast={showToast}
            />
          )}

          {activeEvidenceTab === 'vault' && (
            <EvidenceVaultView
              showToast={showToast}
            />
          )}

          {activeEvidenceTab === 'whistleblower' && (
            <WhistleblowerView
              showToast={showToast}
            />
          )}

          {activeEvidenceTab === 'pleadings' && (
            <ComplaintGeneratorView
              showToast={showToast}
            />
          )}
        </div>
      </main>
    </div>
  );
}
