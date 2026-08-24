import React from 'react';
import { 
  X, 
  MessageSquare, 
  Scale, 
  ShieldAlert, 
  HeartHandshake, 
  BookOpen, 
  BarChart3, 
  Sparkles, 
  LifeBuoy, 
  Map, 
  FileText, 
  Flame, 
  Bot, 
  Radio, 
  Building2, 
  Calendar, 
  User, 
  MessagesSquare, 
  Sliders, 
  Landmark, 
  ShieldCheck, 
  Volume2, 
  CheckSquare,
  PlusCircle,
  Video,
  ExternalLink,
  Layers,
  PhoneCall,
  GraduationCap,
  Calculator
} from 'lucide-react';

export default function MobileNavDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  onOpenReportModal, 
  onOpenSOSModal, 
  onOpenInvestorModal, 
  onOpenEvidenceSuite, 
  currentUser 
}) {
  if (!isOpen) return null;

  const navGroups = [
    {
      group: 'Community & Voices',
      items: [
        { id: 'feed', label: 'The Public Square', subtitle: 'Feed & Dispatches', icon: MessageSquare, badge: 'Live', badgeColor: 'bg-justice-500 text-white' },
        { id: 'townhall', label: 'Townhall Caucus', subtitle: 'Strategy Chat', icon: MessagesSquare, badge: 'Chat', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'nexus', label: 'United Front Nexus', subtitle: 'Hotlines & Socials', icon: PhoneCall, badge: '24/7', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800' },
        { id: 'audiohub', label: 'Voices of Movement', subtitle: 'Oral Histories', icon: Volume2, badge: 'Audio', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800' },
        { id: 'events', label: 'Actions & Vigils', subtitle: 'Hearings & Vigils', icon: Calendar, badge: 'Events', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800' },
        { id: 'memorial', label: 'Memorial Sanctuary', subtitle: 'Candle Vigil', icon: Flame, badge: 'Honor', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800' },
        { id: 'legislation', label: 'Capitol Bill Tracker', subtitle: 'Reform Bills', icon: Landmark, badge: 'Bills', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' }
      ]
    },
    {
      group: 'Accountability & Investigations',
      items: [
        { id: 'cases', label: 'The Docket', subtitle: 'Verified Cases', icon: Scale, badge: '2.4k', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'officers', label: 'Officer Index', subtitle: 'Brady Registry', icon: ShieldAlert, badge: 'Flagged', badgeColor: 'bg-crimson-900 text-crimson-200 border border-crimson-700/50' },
        { id: 'departments', label: 'Agency Scorecards', subtitle: 'Police Benchmarks', icon: Building2, badge: 'Grades', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'copwatch', label: 'Cop-Watch Radar', subtitle: 'Live Streaming', icon: Radio, badge: 'Live', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800' },
        { id: 'fieldmode', label: 'Field Witness Toolkit', subtitle: 'Tactical Mode', icon: ShieldCheck, badge: 'Field', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800' }
      ]
    },
    {
      group: 'Legal Tools & Policy Sandbox',
      items: [
        { id: 'settlement_calc', label: 'Settlement Calculator', subtitle: '§ 1983 Estimator', icon: Calculator, badge: 'Calc', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800' },
        { id: 'academy', label: 'Civil Rights Academy', subtitle: 'Courses & Certs', icon: GraduationCap, badge: 'CLE', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800' },
        { id: 'map', label: '50-State Shield Map', subtitle: 'QI Laws & Circuits', icon: Map, badge: 'Map', badgeColor: 'bg-justice-950 text-justice-300 border border-justice-800' },
        { id: 'foia', label: 'FOIA Generator', subtitle: 'Draft Demands', icon: FileText, badge: 'Draft', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'foiatracker', label: 'FOIA Status & Appeals', subtitle: 'Appeals Log', icon: CheckSquare, badge: 'Track', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'lawlibrary', label: 'Civil Rights Law Library', subtitle: 'Case Law', icon: BookOpen, badge: 'Law', badgeColor: 'bg-justice-950 text-justice-300' },
        { id: 'budget', label: 'Budget Reallocation', subtitle: 'Fiscal Sandbox', icon: Sliders, badge: 'Budget', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800' },
        { id: 'assistant', label: 'Veritas AI Legal Bot', subtitle: 'Civil Rights AI', icon: Bot, badge: 'AI', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800' },
        { id: 'support', label: 'Sanctuary & Mutual Aid', subtitle: 'Pro Bono Aid', icon: HeartHandshake, badge: '$11.8M', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' },
        { id: 'rights', label: 'Know Your Rights', subtitle: 'Constitutional', icon: BookOpen, badge: 'SOS', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800/40' },
        { id: 'profile', label: 'My Civic Profile', subtitle: 'Badges & Contacts', icon: User, badge: 'Me', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'analytics', label: 'Taxpayer Analytics', subtitle: '$3.2B+ Payouts', icon: BarChart3, badge: 'Data', badgeColor: 'bg-indigo-950 text-indigo-300' }
      ]
    }
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-950/80 backdrop-blur-sm animation-fade-in">
      <div className="w-full max-w-xs sm:max-w-sm bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-justice-400/50"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-justice-400 truncate">{currentUser.role}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Standalone Evidence Platform Launcher in Drawer */}
        <div className="p-3 bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-indigo-950/90 border-b border-indigo-800/60">
          <button
            onClick={() => {
              onClose();
              onOpenEvidenceSuite();
            }}
            className="w-full py-3 px-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-black shadow-glow-indigo border border-indigo-300 flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Layers className="w-4 h-4 animate-pulse" />
            <span className="tracking-wide uppercase">Launch Evidence Platform</span>
          </button>
        </div>

        {/* Fast Action Buttons in Drawer */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenSOSModal();
            }}
            className="py-2.5 px-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson flex items-center justify-center space-x-1.5"
          >
            <Video className="w-4 h-4" />
            <span>SOS Live</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenReportModal();
            }}
            className="py-2.5 px-3 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center justify-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Case</span>
          </button>
        </div>

        {/* Scrollable Nav Groups */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-4">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-justice-600 to-justice-700 text-white shadow-glow'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <div className="truncate">
                          <div className="text-xs font-semibold truncate leading-tight">{item.label}</div>
                          <div className={`text-[10px] truncate ${isActive ? 'text-justice-200' : 'text-slate-500'}`}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-md flex-shrink-0 ml-1.5 font-medium ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Investor Pitch Button in Mobile Menu */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenInvestorModal();
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border border-purple-500/50 rounded-xl text-xs font-bold text-purple-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Open Investor & Grant Deck</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
          <a
            href="https://www.addinteractive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-justice-400 hover:underline"
          >
            Add Interactive Studios
          </a> • BY NEXT Justice Media
        </div>
      </div>
    </div>
  );
}
