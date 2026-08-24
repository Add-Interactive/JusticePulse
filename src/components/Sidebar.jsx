import React from 'react';
import { 
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
  PhoneCall,
  GraduationCap,
  Calculator,
  Users
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navGroups = [
    {
      group: 'Community & Voices',
      items: [
        { id: 'feed', label: 'The Public Square', subtitle: 'Community Feed & Dispatches', icon: MessageSquare, badge: 'Live', badgeColor: 'bg-justice-600 text-white' },
        { id: 'townhall', label: 'Townhall Caucus', subtitle: 'Real-Time Strategy Chat', icon: MessagesSquare, badge: 'Chat', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-700' },
        { id: 'nexus', label: 'United Front Nexus', subtitle: 'Emergency Hotlines & Groups', icon: PhoneCall, badge: '24/7', badgeColor: 'bg-crimson-950 text-crimson-300 border border-crimson-700' },
        { id: 'audiohub', label: 'Voices of Movement', subtitle: 'Oral Histories & Audio', icon: Volume2, badge: 'Audio', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-700' },
        { id: 'events', label: 'Actions & Vigils', subtitle: 'Hearings & Demonstrations', icon: Calendar, badge: 'Events', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-700' },
        { id: 'memorial', label: 'Memorial Sanctuary', subtitle: 'Light a Candle & Honor', icon: Flame, badge: 'Honor', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-700' },
        { id: 'legislation', label: 'Capitol Bill Tracker', subtitle: 'Congress Reform Monitor', icon: Landmark, badge: 'Bills', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-700' }
      ]
    },
    {
      group: 'Accountability & Investigations',
      items: [
        { id: 'cases', label: 'The Docket', subtitle: 'Verified Case Registry', icon: Scale, badge: '2.4k', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700' },
        { id: 'officers', label: 'Officer Index', subtitle: 'Repeat Offender & Brady', icon: ShieldAlert, badge: 'Flagged', badgeColor: 'bg-crimson-900 text-crimson-100 border border-crimson-600' },
        { id: 'departments', label: 'Agency Scorecards', subtitle: 'Police Dept Benchmark', icon: Building2, badge: 'Grades', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700' },
        { id: 'copwatch', label: 'Cop-Watch Radar', subtitle: 'Live Observer Streaming', icon: Radio, badge: 'Live', badgeColor: 'bg-crimson-950 text-crimson-300 border border-crimson-700' },
        { id: 'fieldmode', label: 'Field Witness Toolkit', subtitle: 'Tactical Observer Mode', icon: ShieldCheck, badge: 'Field', badgeColor: 'bg-crimson-950 text-crimson-300 border border-crimson-700' }
      ]
    },
    {
      group: 'Legal Tools & Sandbox',
      items: [
        { id: 'jury_simulator', label: 'Citizen Grand Jury', subtitle: 'Indictment Deliberation', icon: Users, badge: 'Jury', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-700' },
        { id: 'settlement_calc', label: 'Settlement Calculator', subtitle: '§ 1983 Damages Estimator', icon: Calculator, badge: 'Calc', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-700' },
        { id: 'academy', label: 'Civil Rights Academy', subtitle: 'Interactive Courses & Certs', icon: GraduationCap, badge: 'CLE', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-700' },
        { id: 'map', label: '50-State Shield Map', subtitle: 'State Laws & Circuit Ratings', icon: Map, badge: 'Map', badgeColor: 'bg-justice-950 text-justice-300 border border-justice-700' },
        { id: 'foia', label: 'FOIA Generator', subtitle: 'Draft Open Records Demands', icon: FileText, badge: 'Draft', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-700' },
        { id: 'foiatracker', label: 'FOIA Status & Appeals', subtitle: 'Statutory Compliance Log', icon: CheckSquare, badge: 'Track', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-700' },
        { id: 'lawlibrary', label: 'Civil Rights Law Library', subtitle: 'Supreme Court Precedents', icon: BookOpen, badge: 'Law', badgeColor: 'bg-justice-950 text-justice-300 border border-justice-700' },
        { id: 'budget', label: 'Budget Reallocation', subtitle: 'Fiscal Policy Sandbox', icon: Sliders, badge: 'Budget', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-700' },
        { id: 'assistant', label: 'Veritas AI Legal Bot', subtitle: 'Civil Rights Research', icon: Bot, badge: 'AI', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-700' },
        { id: 'support', label: 'Sanctuary & Mutual Aid', subtitle: 'Pro Bono Legal & Family Aid', icon: HeartHandshake, badge: '$11.8M', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-700' },
        { id: 'rights', label: 'Know Your Rights', subtitle: 'Constitutional Handbook', icon: BookOpen, badge: 'SOS', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-700' },
        { id: 'profile', label: 'My Civic Profile', subtitle: 'Badges, Locker & Matrix', icon: User, badge: 'Me', badgeColor: 'bg-slate-800 text-slate-200 border border-slate-700' },
        { id: 'analytics', label: 'Taxpayer Analytics', subtitle: '$3.2B+ Misconduct Costs', icon: BarChart3, badge: 'Data', badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-700' },
        { id: 'investor', label: 'Investor Pitch', subtitle: 'Concept, TAM & Roadmap', icon: Sparkles, badge: 'Deck', badgeColor: 'bg-purple-900 text-purple-100 border border-purple-500' }
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block select-none">
      <div className="sticky top-20 space-y-4">
        {/* Navigation Section Container with Sharp Contrast Border */}
        <div className="bg-[#111726] rounded-3xl p-3.5 border-2 border-[#243147] shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto space-y-4">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between border-b border-[#1c273a] pb-1 mb-1">
                <span>{group.group}</span>
              </div>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all group border ${
                        isActive 
                          ? 'bg-gradient-to-r from-justice-600 to-justice-700 text-white border-justice-400 shadow-glow' 
                          : 'bg-[#0a0e17]/80 border-[#1c273a] text-slate-300 hover:bg-[#182238] hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-justice-400'}`} />
                        <div className="truncate">
                          <div className="text-xs font-bold truncate leading-tight">{item.label}</div>
                          <div className={`text-[10px] truncate ${isActive ? 'text-justice-100' : 'text-slate-400'}`}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md flex-shrink-0 ml-1.5 font-bold ${item.badgeColor}`}>
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
        <div 
          onClick={() => setActiveTab('nexus')}
          className="bg-gradient-to-br from-crimson-950/80 via-[#111726] to-[#111726] rounded-2xl p-4 border-2 border-crimson-800/80 shadow-xl relative overflow-hidden cursor-pointer hover:border-crimson-500 transition-all group"
        >
          <div className="flex items-center space-x-2 text-crimson-400 mb-1.5">
            <LifeBuoy className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-xs font-black uppercase tracking-wider font-mono">Emergency Intake</span>
          </div>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            Need urgent civil rights counsel or crisis intervention?
          </p>
          <div className="mt-2.5 p-2 bg-[#080c14] rounded-xl border border-crimson-700 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Toll-Free Legal Dispatch</p>
            <p className="text-xs font-mono font-black text-crimson-400 mt-0.5 tracking-wider">1-800-555-JUSTICE</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
