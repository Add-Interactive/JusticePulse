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
  Users,
  Palette,
  Home,
  UserCheck
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
  onOpenSettingsModal,
  onOpenAuthModal,
  currentUser 
}) {
  if (!isOpen) return null;

  const navGroups = [
    {
      group: 'Community & Voices',
      groupTag: 'CIVIC HUB',
      groupTagColor: 'text-sky-400 bg-sky-950 border-sky-800',
      items: [
        { id: 'home', label: 'Public Home Showcase', subtitle: 'Overview & Roles', icon: Home, badge: 'Home', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-700', accentBorder: 'border-l-4 border-l-indigo-400' },
        { id: 'feed', label: 'The Public Square', subtitle: 'Feed & Dispatches', icon: MessageSquare, badge: 'Live', badgeColor: 'bg-justice-500 text-white', accentBorder: 'border-l-4 border-l-sky-400' },
        { id: 'townhall', label: 'Townhall Caucus', subtitle: 'Strategy Chat', icon: MessagesSquare, badge: 'Chat', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-400' },
        { id: 'nexus', label: 'United Front Nexus', subtitle: 'Hotlines & Socials', icon: PhoneCall, badge: '24/7', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800', accentBorder: 'border-l-4 border-l-crimson-500' },
        { id: 'audiohub', label: 'Voices of Movement', subtitle: 'Oral Histories', icon: Volume2, badge: 'Audio', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800', accentBorder: 'border-l-4 border-l-amber-400' },
        { id: 'events', label: 'Actions & Vigils', subtitle: 'Hearings & Protests', icon: Calendar, badge: 'Events', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-400' },
        { id: 'memorial', label: 'Memorial Sanctuary', subtitle: 'Light a Candle', icon: Flame, badge: 'Honor', badgeColor: 'bg-rose-950 text-rose-300 border border-rose-800', accentBorder: 'border-l-4 border-l-rose-500' },
        { id: 'legislation', label: 'Capitol Bill Tracker', subtitle: 'Congress Monitor', icon: Landmark, badge: 'Bills', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-500' }
      ]
    },
    {
      group: 'Accountability & Investigations',
      groupTag: 'BRADY REGISTRY',
      groupTagColor: 'text-crimson-400 bg-crimson-950 border-crimson-800',
      items: [
        { id: 'cases', label: 'The Docket', subtitle: 'Verified Case Registry', icon: Scale, badge: '2.4k', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700', accentBorder: 'border-l-4 border-l-sky-500' },
        { id: 'officers', label: 'Officer Index', subtitle: 'Repeat Offender & Brady', icon: ShieldAlert, badge: 'Flagged', badgeColor: 'bg-crimson-900 text-crimson-100 border border-crimson-600', accentBorder: 'border-l-4 border-l-crimson-500' },
        { id: 'departments', label: 'Agency Scorecards', subtitle: 'Police Dept Benchmark', icon: Building2, badge: 'Grades', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700', accentBorder: 'border-l-4 border-l-amber-500' },
        { id: 'ice_shield', label: 'ICE & Tactical Shield', subtitle: 'Stop Defense, Red Cards & Radar', icon: ShieldAlert, badge: 'SHIELD', badgeColor: 'bg-crimson-600 text-white border border-crimson-400 font-black', accentBorder: 'border-l-4 border-l-crimson-500' },
        { id: 'copwatch', label: 'Cop-Watch Radar', subtitle: 'Live Observer Streaming', icon: Radio, badge: 'Live', badgeColor: 'bg-crimson-950 text-crimson-300 border border-crimson-800', accentBorder: 'border-l-4 border-l-red-500' },
        { id: 'fieldmode', label: 'Field Witness Toolkit', subtitle: 'Tactical Observer Mode', icon: ShieldCheck, badge: 'Field', badgeColor: 'bg-crimson-950 text-crimson-300 border border-crimson-800', accentBorder: 'border-l-4 border-l-rose-500' }
      ]
    },
    {
      group: 'Legal Tools & Sandbox',
      groupTag: 'RULE OF LAW',
      groupTagColor: 'text-emerald-400 bg-emerald-950 border-emerald-800',
      items: [
        { id: 'jury_simulator', label: 'Citizen Grand Jury', subtitle: 'Indictment Deliberation', icon: Users, badge: 'Jury', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-500' },
        { id: 'settlement_calc', label: 'Settlement Calculator', subtitle: '§ 1983 Damages Estimator', icon: Calculator, badge: 'Calc', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800', accentBorder: 'border-l-4 border-l-emerald-400' },
        { id: 'academy', label: 'Civil Rights Academy', subtitle: 'Courses & Certs', icon: GraduationCap, badge: 'CLE', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-400' },
        { id: 'map', label: '50-State Shield Map', subtitle: 'State Laws & Circuit Ratings', icon: Map, badge: 'Map', badgeColor: 'bg-cyan-950 text-cyan-300 border border-cyan-800', accentBorder: 'border-l-4 border-l-cyan-400' },
        { id: 'foia', label: 'FOIA Generator', subtitle: 'Draft Open Records Demands', icon: FileText, badge: 'Draft', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-400' },
        { id: 'foiatracker', label: 'FOIA Status & Appeals', subtitle: 'Compliance Log', icon: CheckSquare, badge: 'Track', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-blue-400' },
        { id: 'lawlibrary', label: 'Civil Rights Law Library', subtitle: 'Supreme Court Precedents', icon: BookOpen, badge: 'Law', badgeColor: 'bg-justice-950 text-justice-300 border border-justice-800', accentBorder: 'border-l-4 border-l-teal-400' },
        { id: 'budget', label: 'Budget Reallocation', subtitle: 'Fiscal Policy Sandbox', icon: Sliders, badge: 'Budget', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800', accentBorder: 'border-l-4 border-l-emerald-500' },
        { id: 'assistant', label: 'Veritas AI Legal Bot', subtitle: 'Civil Rights Research', icon: Bot, badge: 'AI', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', accentBorder: 'border-l-4 border-l-purple-500' },
        { id: 'support', label: 'Sanctuary & Mutual Aid', subtitle: 'Pro Bono Legal Aid', icon: HeartHandshake, badge: '$11.8M', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800', accentBorder: 'border-l-4 border-l-emerald-400' },
        { id: 'rights', label: 'Know Your Rights', subtitle: 'Constitutional Handbook', icon: BookOpen, badge: 'SOS', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800', accentBorder: 'border-l-4 border-l-amber-400' },
        { id: 'profile', label: 'My Civic Profile', subtitle: 'Badges, Locker & Matrix', icon: User, badge: 'Me', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700', accentBorder: 'border-l-4 border-l-slate-400' },
        { id: 'analytics', label: 'Taxpayer Analytics', subtitle: '$3.2B+ Misconduct Costs', icon: BarChart3, badge: 'Data', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800', accentBorder: 'border-l-4 border-l-indigo-400' },
        { id: 'investor', label: 'Investor Pitch', subtitle: 'Concept, TAM & Roadmap', icon: Sparkles, badge: 'Deck', badgeColor: 'bg-purple-900 text-purple-100 border border-purple-500', accentBorder: 'border-l-4 border-l-purple-400' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start lg:hidden bg-slate-950/80 backdrop-blur-sm animation-fade-in select-none">
      <div 
        className="w-[85vw] max-w-sm h-full bg-[#111726] border-r-2 border-[#243147] shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Drawer Header with Left-Aligned Logo & User Profile */}
        <div className="p-4 bg-gradient-to-r from-[#080c14] via-[#111726] to-[#080c14] border-b border-[#1c273a] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-justice-400 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-justice-400 font-mono truncate">{currentUser.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {onOpenAuthModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal('login');
                }}
                className="p-1.5 px-2 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 rounded-lg text-[9px] font-mono font-bold flex items-center gap-1"
                title="Switch Role / Login"
              >
                <UserCheck className="w-3 h-3" />
                <span>Role</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Master Standalone Evidence Platform Launcher in Drawer */}
        <div className="p-3 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 border-b border-indigo-800/80 flex-shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenEvidenceSuite();
            }}
            className="w-full py-3 px-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-black shadow-glow-indigo border-2 border-indigo-300 flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Layers className="w-4 h-4 animate-pulse" />
            <span className="tracking-wide uppercase font-mono text-xs">Launch Evidence Platform ➔</span>
          </button>
        </div>

        {/* Fast Action Buttons in Drawer */}
        <div className="p-3 bg-[#080c14] border-b border-[#1c273a] grid grid-cols-2 gap-2 flex-shrink-0">
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
          {/* Settings & Themes Button at Top of Drawer */}
          <div>
            <button
              onClick={() => {
                onClose();
                onOpenSettingsModal();
              }}
              className="w-full p-2.5 rounded-2xl bg-[#080c14] hover:bg-[#162035] text-white border-2 border-indigo-700/80 shadow-md flex items-center justify-between transition-all active:scale-95 group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-600 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">10 Visual Themes &amp; Settings</p>
                  <p className="text-[9.5px] text-slate-400 font-mono">Light/Dark Mode, High-Contrast</p>
                </div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold">
                10 Styles
              </span>
            </button>
          </div>

          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {group.group}
                </span>
                <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${group.groupTagColor}`}>
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
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                        item.accentBorder
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-justice-900/90 to-indigo-950/90 text-white font-bold border border-justice-500 shadow-glow'
                          : 'bg-[#080c14]/50 hover:bg-[#162035] text-slate-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-justice-400' : 'text-slate-400'}`} />
                        <div className="min-w-0">
                          <p className={`text-xs truncate ${isActive ? 'font-bold text-white' : 'font-medium text-slate-200'}`}>
                            {item.label}
                          </p>
                          <p className="text-[9px] text-slate-400 truncate leading-tight font-mono">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ml-1 ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#080c14] border-t border-[#1c273a] text-center text-[10px] text-slate-400 font-mono flex-shrink-0">
          Produced by Add Interactive Studios • BY NEXT Justice Media
        </div>
      </div>

      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}
