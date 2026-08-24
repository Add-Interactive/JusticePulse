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
  HardDrive
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none animation-fade-in">
      {/* Top Forensic OS Window Bar */}
      <header className="h-16 bg-slate-900 border-b border-indigo-900/60 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 shadow-2xl">
        {/* Left: Window Identity & Exit Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700 shadow-md group"
            title="Exit to Social Platform"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Exit to Public Square</span>
            <span className="sm:hidden">Exit</span>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

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
          <div className="flex items-center space-x-1.5 text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-emerald-900/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SHA-256 INTEGRITY: 100% VERIFIED</span>
          </div>
          <div className="flex items-center space-x-1.5 text-indigo-300 bg-slate-950 px-3 py-1 rounded-lg border border-indigo-900/50">
            <HardDrive className="w-3.5 h-3.5" />
            <span>ENCRYPTED VAULT: READY</span>
          </div>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              confetti({ particleCount: 30, spread: 60 });
              showToast('Forensic Discovery Dossier exported!', 'success');
            }}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Master Dossier</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-crimson-950/80 hover:bg-crimson-900 text-crimson-300 hover:text-white border border-crimson-800 transition-all"
            title="Close Window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sub-Header: Master Forensic Tool Selector Strip */}
      <nav className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto flex-shrink-0">
        <div className="flex items-center space-x-2 min-w-max">
          {evidenceModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeEvidenceTab === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveEvidenceTab(mod.id);
                  showToast(`Workspace: ${mod.title}`, 'info');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-glow'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{mod.shortLabel}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${mod.badgeColor}`}>
                  {mod.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center text-xs text-slate-400 font-mono">
          <Monitor className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
          <span>Full Unconstrained 4K Ultra-Wide Canvas Active</span>
        </div>
      </nav>

      {/* Main Unconstrained Full-Width Workspace Canvas */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 max-w-full w-full">
        <div className="max-w-[1700px] mx-auto w-full">
          {activeEvidenceTab === 'corkboard' && (
            <div className="animation-fade-in">
              <FBIEvidenceHUD
                showToast={showToast}
                onOpenCaseDetail={onOpenCaseDetail}
              />
            </div>
          )}

          {activeEvidenceTab === 'multicam' && (
            <div className="animation-fade-in">
              <MultiCamStudioView
                showToast={showToast}
              />
            </div>
          )}

          {activeEvidenceTab === 'deposition' && (
            <div className="animation-fade-in">
              <DepositionSimulatorView
                showToast={showToast}
              />
            </div>
          )}

          {activeEvidenceTab === 'vault' && (
            <div className="animation-fade-in">
              <EvidenceVaultView
                showToast={showToast}
              />
            </div>
          )}

          {activeEvidenceTab === 'whistleblower' && (
            <div className="animation-fade-in">
              <WhistleblowerView
                showToast={showToast}
              />
            </div>
          )}

          {activeEvidenceTab === 'pleadings' && (
            <div className="animation-fade-in">
              <ComplaintGeneratorView
                showToast={showToast}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
