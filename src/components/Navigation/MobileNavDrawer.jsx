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
  Calculator,
  Users
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
      groupTag: 'CIVIC HUB',
      groupTagColor: 'text-sky-400 bg-sky-950 border-sky-800',
      items: [
        { id: 'feed', label: 'The Public Square', subtitle: 'Feed & Dispatches', icon: MessageSquare, badge: 'Live', badgeColor: 'bg-justice-500 text-white', accentBorder: 'border-l-4 border-l-sky-400' },
        { id: 'townhall', label: 'Townhall Caucus', subtitle: 'Strategy Chat', icon: MessagesSquare, badge: 'Chat', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-400' },
        { id: 'nexus', label: 'United Front Nexus', subtitle: 'Hotlines & Socials', icon: PhoneCall, badge: '24/7', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800', accentBorder: 'border-l-4 border-l-crimson-500' },
        { id: 'audiohub', label: 'Voices of Movement', subtitle: 'Oral Histories', icon: Volume2, badge: 'Audio', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800', accentBorder: 'border-l-4 border-l-amber-400' },
        { id: 'events', label: 'Actions & Vigils', subtitle: 'Hearings & Vigils', icon: Calendar, badge: 'Events', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-400' },
        { id: 'memorial', label: 'Memorial Sanctuary', subtitle: 'Candle Vigil', icon: Flame, badge: 'Honor', badgeColor: 'bg-rose-950 text-rose-300 border border-rose-800', accentBorder: 'border-l-4 border-l-rose-500' },
        { id: 'legislation', label: 'Capitol Bill Tracker', subtitle: 'Reform Bills', icon: Landmark, badge: 'Bills', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-500' }
      ]
    },
    {
      group: 'Accountability & Investigations',
      groupTag: 'BRADY REGISTRY',
      groupTagColor: 'text-crimson-400 bg-crimson-950 border-crimson-800',
      items: [
        { id: 'cases', label: 'The Docket', subtitle: 'Verified Cases', icon: Scale, badge: '2.4k', badgeColor: 'bg-slate-800 text-slate-300', accentBorder: 'border-l-4 border-l-sky-500' },
        { id: 'officers', label: 'Officer Index', subtitle: 'Brady Registry', icon: ShieldAlert, badge: 'Flagged', badgeColor: 'bg-crimson-900 text-crimson-200 border border-crimson-700/50', accentBorder: 'border-l-4 border-l-crimson-500' },
        { id: 'departments', label: 'Agency Scorecards', subtitle: 'Police Benchmarks', icon: Building2, badge: 'Grades', badgeColor: 'bg-slate-800 text-slate-300', accentBorder: 'border-l-4 border-l-amber-500' },
        { id: 'copwatch', label: 'Cop-Watch Radar', subtitle: 'Live Streaming', icon: Radio, badge: 'Live', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800', accentBorder: 'border-l-4 border-l-red-500' },
        { id: 'fieldmode', label: 'Field Witness Toolkit', subtitle: 'Tactical Mode', icon: ShieldCheck, badge: 'Field', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800', accentBorder: 'border-l-4 border-l-rose-500' }
      ]
    },
    {
      group: 'Legal Tools & Policy Sandbox',
      groupTag: 'RULE OF LAW',
      groupTagColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
      items: [
        { id: 'jury_simulator', label: 'Citizen Grand Jury', subtitle: 'Indictment Voting', icon: Users, badge: 'Jury', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-500' },
        { id: 'settlement_calc', label: 'Settlement Calculator', subtitle: '§ 1983 Estimator', icon: Calculator, badge: 'Calc', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800', accentBorder: 'border-l-4 border-l-emerald-400' },
        { id: 'academy', label: 'Civil Rights Academy', subtitle: 'Courses & Certs', icon: GraduationCap, badge: 'CLE', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-400' },
        { id: 'map', label: '50-State Shield Map', subtitle: 'QI Laws & Circuits', icon: Map, badge: 'Map', badgeColor: 'bg-justice-950 text-justice-300 border border-justice-800', accentBorder: 'border-l-4 border-l-cyan-400' },
        { id: 'foia', label: 'FOIA Generator', subtitle: 'Draft Demands', icon: FileText, badge: 'Draft', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-400' },
        { id: 'foiatracker', label: 'FOIA Status & Appeals', subtitle: 'Appeals Log', icon: CheckSquare, badge: 'Track', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-blue-400' },
        { id: 'lawlibrary', label: 'Civil Rights Law Library', subtitle: 'Case Law', icon: BookOpen, badge: 'Law', badgeColor: 'bg-justice-950 text-justice-300', accentBorder: 'border-l-4 border-l-teal-400' },
        { id: 'budget', label: 'Budget Reallocation', subtitle: 'Fiscal Sandbox', icon: Sliders, badge: 'Budget', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800', accentBorder: 'border-l-4 border-l-emerald-500' },
        { id: 'assistant', label: 'Veritas AI Legal Bot', subtitle: 'Civil Rights AI', icon: Bot, badge: 'AI', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-500' },
        { id: 'support', label: 'Sanctuary & Mutual Aid', subtitle: 'Pro Bono Aid', icon: HeartHandshake, badge: '$11.8M', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800/40', accentBorder: 'border-l-4 border-l-emerald-400' },
        { id: 'rights', label: 'Know Your Rights', subtitle: 'Constitutional', icon: BookOpen, badge: 'SOS', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800/40', accentBorder: 'border-l-4 border-l-amber-400' },
        { id: 'profile', label: 'My Civic Profile', subtitle: 'Badges & Contacts', icon: User, badge: 'Me', badgeColor: 'bg-slate-800 text-slate-300', accentBorder: 'border-l-4 border-l-slate-400' },
        { id: 'analytics', label: 'Taxpayer Analytics', subtitle: '$3.2B+ Payouts', icon: BarChart3, badge: 'Data', badgeColor: 'bg-indigo-950 text-indigo-300', accentBorder: 'border-l-4 border-l-indigo-400' }
      ]
    }
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-950/85 backdrop-blur-sm animation-fade-in select-none">
      <div className="w-full max-w-xs sm:max-w-sm bg-[#111726] border-l-2 border-[#243147] h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#1c273a] bg-[#080c14] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-justice-400"
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-justice-400 font-mono truncate">{currentUser.role}</p>
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
        <div className="p-3 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 border-b border-indigo-800/80">
          <button
            onClick={() => {
              onClose();
              onOpenEvidenceSuite();
            }}
            className="w-full py-3 px-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-black shadow-glow-indigo border-2 border-indigo-300 flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Layers className="w-4 h-4 animate-pulse" />
            <span className="tracking-wide uppercase font-mono">Launch Evidence Platform ➔</span>
          </button>
        </div>

        {/* Fast Action Buttons in Drawer */}
        <div className="p-3 bg-[#080c14] border-b border-[#1c273a] grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenSOSModal();
            }}
            className="py-2.5 px-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-black shadow-glow-crimson flex items-center justify-center space-x-1.5 border border-crimson-400"
          >
            <Video className="w-4 h-4" />
            <span>SOS Live</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenReportModal();
            }}
            className="py-2.5 px-3 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-black shadow-glow flex items-center justify-center space-x-1.5 border border-justice-400"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Case</span>
          </button>
        </div>

        {/* Scrollable Nav Groups */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-4">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-2 py-1 flex items-center justify-between border-b border-[#1c273a] pb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                  {group.group}
                </span>
                <span className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded border font-bold ${group.groupTagColor}`}>
                  {group.groupTag}
                </span>
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all border ${item.accentBorder} ${
                        isActive
                          ? 'bg-gradient-to-r from-justice-600 to-justice-700 text-white border-justice-300 shadow-glow'
                          : 'bg-[#080c14] border-slate-800 text-slate-200 hover:bg-[#182238] hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <div className="truncate">
                          <div className="text-xs font-bold truncate leading-tight text-white">{item.label}</div>
                          <div className={`text-[10px] truncate ${isActive ? 'text-justice-100' : 'text-slate-400'}`}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-md flex-shrink-0 ml-1.5 font-bold ${item.badgeColor}`}>
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
              className="w-full py-3 bg-gradient-to-r from-purple-900 to-indigo-900 border-2 border-purple-500 rounded-xl text-xs font-bold text-purple-100 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Open Investor & Grant Deck</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#080c14] border-t border-[#1c273a] text-center text-[10px] text-slate-400 font-mono">
          <a
            href="https://www.addinteractive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-justice-400 hover:underline font-bold"
          >
            Add Interactive Studios
          </a> • BY NEXT Justice Media
        </div>
      </div>
    </div>
  );
}
