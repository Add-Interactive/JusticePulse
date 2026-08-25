import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Video, 
  Users, 
  Calculator, 
  Scale, 
  ShieldAlert, 
  FileText, 
  Map, 
  HeartHandshake, 
  Bot, 
  Sparkles, 
  Radio, 
  GraduationCap, 
  PhoneCall,
  Flame,
  Building2,
  Calendar,
  Sliders,
  CheckSquare,
  BookOpen,
  ArrowRight,
  X
} from 'lucide-react';

export default function CommandPaletteModal({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onOpenSOSModal, 
  onOpenEvidenceSuite, 
  onOpenReportModal, 
  onOpenInvestorModal 
}) {
  const [query, setQuery] = useState('');

  const commands = [
    {
      id: 'cmd-evidence',
      title: 'Launch Standalone Evidence System Platform',
      category: 'Forensics & Whiteboard',
      icon: Layers,
      color: 'text-indigo-400',
      action: () => {
        onClose();
        onOpenEvidenceSuite('corkboard');
      }
    },
    {
      id: 'cmd-multicam',
      title: 'Open Multi-Cam Synchronized Video Studio',
      category: 'Forensics & Whiteboard',
      icon: Video,
      color: 'text-rose-400',
      action: () => {
        onClose();
        onOpenEvidenceSuite('multicam');
      }
    },
    {
      id: 'cmd-deposition',
      title: 'Open Veritas Deposition Simulator',
      category: 'Forensics & Whiteboard',
      icon: Scale,
      color: 'text-amber-400',
      action: () => {
        onClose();
        onOpenEvidenceSuite('deposition');
      }
    },
    {
      id: 'cmd-iceshield',
      title: 'ICE & Tactical Squad Shield (Red Cards, Audio & Warrant Verifier)',
      category: 'Rapid Defense',
      icon: ShieldAlert,
      color: 'text-crimson-400',
      action: () => {
        onClose();
        onNavigate('ice_shield');
      }
    },
    {
      id: 'cmd-sos',
      title: 'Trigger SOS Live Emergency Cloud Recorder',
      category: 'Rapid Defense',
      icon: Video,
      color: 'text-crimson-400',
      action: () => {
        onClose();
        onOpenSOSModal();
      }
    },
    {
      id: 'cmd-report',
      title: 'File Verified Police Incident Docket',
      category: 'Reporting',
      icon: FileText,
      color: 'text-justice-400',
      action: () => {
        onClose();
        onOpenReportModal();
      }
    },
    {
      id: 'cmd-grandjury',
      title: 'Citizen Grand Jury Indictment Chamber',
      category: 'Legal Tools',
      icon: Users,
      color: 'text-purple-400',
      action: () => {
        onClose();
        onNavigate('jury_simulator');
      }
    },
    {
      id: 'cmd-calc',
      title: 'Section 1983 Settlement & Damages Calculator',
      category: 'Legal Tools',
      icon: Calculator,
      color: 'text-emerald-400',
      action: () => {
        onClose();
        onNavigate('settlement_calc');
      }
    },
    {
      id: 'cmd-academy',
      title: 'Civil Rights Academy & CLE Certification Quizzes',
      category: 'Education',
      icon: GraduationCap,
      color: 'text-purple-400',
      action: () => {
        onClose();
        onNavigate('academy');
      }
    },
    {
      id: 'cmd-nexus',
      title: '24/7 United Front Crisis & Legal Hotlines',
      category: 'Rapid Defense',
      icon: PhoneCall,
      color: 'text-crimson-400',
      action: () => {
        onClose();
        onNavigate('nexus');
      }
    },
    {
      id: 'cmd-docket',
      title: 'The National Docket (Case Archives)',
      category: 'Accountability',
      icon: Scale,
      color: 'text-justice-400',
      action: () => {
        onClose();
        onNavigate('cases');
      }
    },
    {
      id: 'cmd-officers',
      title: 'Officer Index & Brady Repeat-Offender List',
      category: 'Accountability',
      icon: ShieldAlert,
      color: 'text-crimson-400',
      action: () => {
        onClose();
        onNavigate('officers');
      }
    },
    {
      id: 'cmd-departments',
      title: 'Police Agency Misconduct & Settlement Scorecards',
      category: 'Accountability',
      icon: Building2,
      color: 'text-slate-300',
      action: () => {
        onClose();
        onNavigate('departments');
      }
    },
    {
      id: 'cmd-copwatch',
      title: 'Live Cop-Watch Radar & Tactical Dispatch',
      category: 'Monitoring',
      icon: Radio,
      color: 'text-crimson-400',
      action: () => {
        onClose();
        onNavigate('copwatch');
      }
    },
    {
      id: 'cmd-foia',
      title: 'FOIA Demand Letter Generator',
      category: 'Legal Tools',
      icon: FileText,
      color: 'text-indigo-400',
      action: () => {
        onClose();
        onNavigate('foia');
      }
    },
    {
      id: 'cmd-map',
      title: '50-State Qualified Immunity Shield Map',
      category: 'Legal Tools',
      icon: Map,
      color: 'text-justice-400',
      action: () => {
        onClose();
        onNavigate('map');
      }
    },
    {
      id: 'cmd-investor',
      title: 'Open Investor Pitch Deck & TAM Model',
      category: 'Corporate',
      icon: Sparkles,
      color: 'text-purple-300',
      action: () => {
        onClose();
        onOpenInvestorModal();
      }
    }
  ];

  const filteredCommands = commands.filter(c => 
    !query || 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center space-x-3">
          <Search className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Type a command, tool name, or jump to view... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500 font-medium"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No matching tools or commands found.
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full p-3 rounded-2xl flex items-center justify-between text-left hover:bg-indigo-950/50 hover:border-indigo-500/40 border border-transparent transition-all group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-indigo-500">
                      <Icon className={`w-4 h-4 ${cmd.color}`} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-indigo-300">
                        {cmd.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {cmd.category}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Tip: Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Ctrl</kbd> + <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">K</kbd> anywhere to open</span>
          <span className="text-indigo-400 font-bold">JusticePulse Fast Palette</span>
        </div>
      </div>
    </div>
  );
}
