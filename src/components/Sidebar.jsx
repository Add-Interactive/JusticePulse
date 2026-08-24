import React from 'react';
import { 
  MessageSquare, 
  Scale, 
  ShieldAlert, 
  HeartHandshake, 
  BookOpen, 
  BarChart3, 
  FolderLock, 
  Sparkles, 
  LifeBuoy, 
  FileCheck2, 
  Map, 
  FileText, 
  Flame, 
  Bot, 
  Radio, 
  Building2, 
  Calendar, 
  EyeOff, 
  User, 
  MessagesSquare, 
  Sliders, 
  Landmark, 
  ShieldCheck, 
  Volume2, 
  CheckSquare,
  Network
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navGroups = [
    {
      group: 'Community & Voices',
      items: [
        { id: 'feed', label: 'The Public Square', subtitle: 'Community Feed & Dispatches', icon: MessageSquare, badge: 'Live', badgeColor: 'bg-justice-500 text-white' },
        { id: 'townhall', label: 'Townhall Caucus', subtitle: 'Real-Time Strategy Chat', icon: MessagesSquare, badge: 'Chat', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'audiohub', label: 'Voices of Movement', subtitle: 'Oral Histories & Audio', icon: Volume2, badge: 'Audio', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800' },
        { id: 'events', label: 'Actions & Vigils', subtitle: 'Hearings & Demonstrations', icon: Calendar, badge: 'Events', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800' },
        { id: 'memorial', label: 'Memorial Sanctuary', subtitle: 'Light a Candle & Honor', icon: Flame, badge: 'Honor', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800' },
        { id: 'legislation', label: 'Capitol Bill Tracker', subtitle: 'Congress Reform Monitor', icon: Landmark, badge: 'Bills', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' }
      ]
    },
    {
      group: 'Accountability & Evidence',
      items: [
        { id: 'whiteboard', label: 'Evidence Whiteboard', subtitle: 'Visual Connection Matrix', icon: Network, badge: 'Canvas', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'cases', label: 'The Docket', subtitle: 'Verified Case Registry', icon: Scale, badge: '2.4k', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'officers', label: 'Officer Index', subtitle: 'Repeat Offender & Brady', icon: ShieldAlert, badge: 'Flagged', badgeColor: 'bg-crimson-900 text-crimson-200 border border-crimson-700/50' },
        { id: 'departments', label: 'Agency Scorecards', subtitle: 'Police Dept Benchmark', icon: Building2, badge: 'Grades', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'copwatch', label: 'Cop-Watch Radar', subtitle: 'Live Observer Streaming', icon: Radio, badge: 'Live', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800' },
        { id: 'fieldmode', label: 'Field Witness Toolkit', subtitle: 'Tactical Observer Mode', icon: ShieldCheck, badge: 'Field', badgeColor: 'bg-crimson-950 text-crimson-400 border border-crimson-800' },
        { id: 'vault', label: 'Evidence Vault', subtitle: 'SHA-256 Custody Locker', icon: FolderLock, badge: 'Log', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'whistleblower', label: 'Whistleblower Vault', subtitle: 'Ethical Officer Intake', icon: EyeOff, badge: 'Secure', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800' }
      ]
    },
    {
      group: 'Legal Tools & Sandbox',
      items: [
        { id: 'map', label: '50-State Shield Map', subtitle: 'State Laws & Circuit Ratings', icon: Map, badge: 'Map', badgeColor: 'bg-justice-950 text-justice-300 border border-justice-800' },
        { id: 'foia', label: 'FOIA Generator', subtitle: 'Draft Open Records Demands', icon: FileText, badge: 'Draft', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'foiatracker', label: 'FOIA Status & Appeals', subtitle: 'Statutory Compliance Log', icon: CheckSquare, badge: 'Track', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800' },
        { id: 'lawlibrary', label: 'Civil Rights Law Library', subtitle: 'Supreme Court Precedents', icon: BookOpen, badge: 'Law', badgeColor: 'bg-justice-950 text-justice-300' },
        { id: 'budget', label: 'Budget Reallocation', subtitle: 'Fiscal Policy Sandbox', icon: Sliders, badge: 'Budget', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800' },
        { id: 'assistant', label: 'Veritas AI Legal Bot', subtitle: 'Civil Rights Research', icon: Bot, badge: 'AI', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800' },
        { id: 'support', label: 'Sanctuary & Mutual Aid', subtitle: 'Pro Bono Legal & Family Aid', icon: HeartHandshake, badge: '$11.8M', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' },
        { id: 'rights', label: 'Know Your Rights', subtitle: 'Constitutional Handbook', icon: BookOpen, badge: 'SOS', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800/40' },
        { id: 'profile', label: 'My Civic Profile', subtitle: 'Badges, Locker & Matrix', icon: User, badge: 'Me', badgeColor: 'bg-slate-800 text-slate-300' },
        { id: 'analytics', label: 'Taxpayer Analytics', subtitle: '$3.2B+ Misconduct Costs', icon: BarChart3, badge: 'Data', badgeColor: 'bg-indigo-950 text-indigo-300' },
        { id: 'investor', label: 'Investor Pitch', subtitle: 'Concept, TAM & Roadmap', icon: Sparkles, badge: 'Deck', badgeColor: 'bg-purple-900 text-purple-200 border border-purple-600/50' }
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-4">
        {/* Navigation Section */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-3.5 border border-slate-800 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto space-y-4">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                {group.group}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all group ${
                        isActive 
                          ? 'bg-gradient-to-r from-justice-600 to-justice-700 text-white shadow-glow' 
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-justice-400'}`} />
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
              </nav>
            </div>
          ))}
        </div>

        {/* 24/7 Crisis Hotline Fast Card */}
        <div className="bg-gradient-to-br from-crimson-950/70 via-slate-900 to-slate-900 rounded-2xl p-4 border border-crimson-900/50 shadow-lg relative overflow-hidden">
          <div className="flex items-center space-x-2 text-crimson-400 mb-1.5">
            <LifeBuoy className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Emergency Intake</span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Need urgent civil rights counsel or crisis intervention?
          </p>
          <div className="mt-2.5 p-2 bg-slate-950/80 rounded-lg border border-crimson-800/40 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Toll-Free Legal Dispatch</p>
            <p className="text-xs font-mono font-bold text-crimson-400 mt-0.5">1-800-555-JUSTICE</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
