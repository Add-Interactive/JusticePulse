import React, { useState } from 'react';
import { 
  Network, 
  Video, 
  Gavel, 
  FolderLock, 
  EyeOff, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Search,
  Pin,
  Camera,
  Scale,
  Lock
} from 'lucide-react';
import FBIEvidenceHUD from '../InvestigationBoard/FBIEvidenceHUD';
import MultiCamStudioView from '../MultiCam/MultiCamStudioView';
import DepositionSimulatorView from '../Deposition/DepositionSimulatorView';
import EvidenceVaultView from '../EvidenceVault/EvidenceVaultView';
import WhistleblowerView from '../Whistleblower/WhistleblowerView';
import ComplaintGeneratorView from '../ComplaintGenerator/ComplaintGeneratorView';

export default function UnifiedEvidenceDashboard({ showToast, onOpenCaseDetail, initialSubTab = 'corkboard' }) {
  const [activeEvidenceTab, setActiveEvidenceTab] = useState(initialSubTab);

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
    <div className="space-y-6 select-none">
      {/* Master Command Center Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/90 rounded-3xl p-6 sm:p-7 border-2 border-indigo-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Layers className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Unified Forensic Evidence Command Center</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white font-display">
            The Evidence Matrix & Forensic Command Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            All forensic tools united in one dashboard: Detective Corkboard, Multi-Angle Video Studio, Deposition Simulator, SHA-256 Vault, and Federal Pleadings Studio.
          </p>
        </div>

        {/* Global Security Badge */}
        <div className="flex items-center space-x-3 bg-slate-950/90 p-3.5 rounded-2xl border border-indigo-800/60 shadow-xl flex-shrink-0 relative z-10">
          <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-700 text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Forensic Integrity</span>
            <span className="text-xs font-mono font-extrabold text-emerald-400">6 Unified Tools Active</span>
            <p className="text-[9px] text-slate-500 font-mono">E2E SHA-256 Chain of Custody</p>
          </div>
        </div>
      </div>

      {/* Unified Quick Tool Switcher Strip (Horizontal Tabs) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {evidenceModules.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeEvidenceTab === mod.id;

          return (
            <button
              key={mod.id}
              onClick={() => {
                setActiveEvidenceTab(mod.id);
                showToast(`Switched to ${mod.title}`, 'info');
              }}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 shadow-lg ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-900/90 to-slate-900 border-indigo-400 shadow-glow ring-1 ring-indigo-400/50'
                  : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold ${mod.badgeColor}`}>
                  {mod.badge}
                </span>
              </div>

              <div>
                <h4 className={`text-xs font-extrabold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {mod.shortLabel}
                </h4>
                <p className="text-[9px] text-slate-400 truncate mt-0.5">
                  {mod.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Evidence Workspace Viewport */}
      <div className="bg-slate-900/40 rounded-3xl border border-slate-800/80 p-1 sm:p-2 shadow-2xl">
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
    </div>
  );
}
