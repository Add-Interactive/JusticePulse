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
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FBIEvidenceHUD from '../InvestigationBoard/FBIEvidenceHUD';
import MultiCamStudioView from '../MultiCam/MultiCamStudioView';
import DepositionSimulatorView from '../Deposition/DepositionSimulatorView';
import EvidenceVaultView from '../EvidenceVault/EvidenceVaultView';
import WhistleblowerView from '../Whistleblower/WhistleblowerView';
import ComplaintGeneratorView from '../ComplaintGenerator/ComplaintGeneratorView';

export default function UnifiedEvidenceDashboard({ 
  onClose, 
  showToast, 
  onOpenCaseDetail, 
  onOpenSettingsModal,
  currentTheme,
  isHighContrast,
  fontSizeScale,
  initialSubTab = 'corkboard' 
}) {
  const [activeEvidenceTab, setActiveEvidenceTab] = useState(initialSubTab);
  const [isFullscreen, setIsFullscreen] = useState(true);

  const evidenceModules = [
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
            title="Exit to Social Platform"
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
                  STANDALONE WORKSPACE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Federal Section 1983 & Brady Forensic Chain-of-Custody Matrix
              </p>
            </div>
          </div>
        </div>

        {/* Center: Quick Hardware / Cryptographic Status */}
        <div className="hidden lg:flex items-center space-x-4 font-mono text-[11px]">
          <div className="flex items-center space-x-1.5 text-emerald-400 bg-[#080c14] px-3 py-1 rounded-lg border border-emerald-900/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SHA-256 INTEGRITY: 100% VERIFIED</span>
          </div>
        </div>

        {/* Right: Theme Switcher & Actions */}
        <div className="flex items-center space-x-2">
          {/* Direct 10 Visual Themes & Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#080c14] hover:bg-[#1a243b] text-slate-200 hover:text-white text-xs font-mono font-bold transition-all border-2 border-[#243147] active:scale-95"
            title="Switch Theme (Light Mode, Dark Mode, Courtroom, OLED Obsidian)"
          >
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">10 Themes</span>
          </button>

          <button
            onClick={() => {
              confetti({ particleCount: 40, spread: 60 });
              showToast('Complete Forensic Discovery Packet exported (Court Admissible)!', 'success');
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
        <div className="max-w-7xl mx-auto">
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
