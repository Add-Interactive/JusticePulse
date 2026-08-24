import React from 'react';
import { 
  Flame, 
  Heart, 
  Scale, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function RightSidebar({ onOpenCaseDetail, onOpenDonateModal, onSelectTab }) {
  return (
    <aside className="w-80 flex-shrink-0 hidden xl:block space-y-4">
      {/* Trending Case & Petition Widget */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Trending Petition</span>
          </div>
          <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800/50 font-mono">
            284.5k Signed
          </span>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs font-bold text-slate-100 hover:text-justice-400 transition-colors cursor-pointer" onClick={() => onOpenCaseDetail('case-sonya-massey')}>
              Justice for Sonya Massey: Ban Repeat Misconduct Officers Nationwide
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 line-clamp-2">
            Demand federal legislation mandating national decertification registries so fired officers cannot be rehired across county lines.
          </p>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Progress: 94.8%</span>
              <span className="text-justice-400 font-bold">Goal: 300k</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-crimson-500 h-full rounded-full w-[94.8%]"></div>
            </div>
          </div>

          <button
            onClick={() => onOpenCaseDetail('case-sonya-massey')}
            className="w-full py-1.5 bg-justice-600/90 hover:bg-justice-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>Sign & Review Full Docket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Urgent Mutual Aid Sanctuary Fund */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Heart className="w-4 h-4 fill-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Direct Family Relief</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/50 font-mono">
            Verified 100%
          </span>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80" 
                className="w-9 h-9 rounded-lg object-cover border border-slate-700" 
                alt="Sonya Massey Family Trust"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-200 truncate">Sonya Massey Children's Education Trust</p>
                <p className="text-[10px] text-emerald-400 font-mono">$412,000 / $500,000</p>
              </div>
            </div>
            <button
              onClick={() => onOpenDonateModal({
                title: 'Sonya Massey Children Education Trust',
                beneficiary: 'Family of Sonya Massey',
                target: 500000,
                raised: 412000
              })}
              className="w-full py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-glow-emerald"
            >
              Stand With Family & Donate
            </button>
          </div>
        </div>
      </div>

      {/* Verified Civil Rights Attorneys Online */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-justice-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal Clinic Roster</span>
          </div>
          <span className="text-[10px] text-slate-400">4 Active Now</span>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  className="w-7 h-7 rounded-full object-cover" 
                  alt="Attorney Marcus" 
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-slate-900"></span>
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-200 truncate">Atty Marcus Vance</p>
                <p className="text-[10px] text-slate-400 truncate">Section 1983 Federal Litigator</p>
              </div>
            </div>
            <span className="text-[10px] text-justice-400 bg-justice-950 px-2 py-0.5 rounded border border-justice-800">Pro Bono</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                  className="w-7 h-7 rounded-full object-cover" 
                  alt="Attorney Lonita Baker" 
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-slate-900"></span>
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-200 truncate">Lonita B. Jordan</p>
                <p className="text-[10px] text-slate-400 truncate">Police Misconduct Intake</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Verified</span>
          </div>
        </div>

        <button 
          onClick={() => onSelectTab('support')}
          className="w-full text-center text-xs text-justice-400 hover:text-justice-300 font-semibold pt-1 block"
        >
          View All 640+ Pro Bono Defense Partners →
        </button>
      </div>

      {/* Upcoming Vigils & Actions */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl space-y-2.5">
        <div className="flex items-center space-x-2 text-purple-400">
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Community Action Calendar</span>
        </div>

        <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-200">Denver Violin Vigil for Elijah</span>
            <span className="text-purple-400 font-mono text-[10px]">Sat 4:00 PM</span>
          </div>
          <p className="text-[10px] text-slate-400">Central Park Bandshell, Denver CO • 450 Attending</p>
        </div>

        <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-200">Illinois County Board Hearing</span>
            <span className="text-purple-400 font-mono text-[10px]">Thu 6:00 PM</span>
          </div>
          <p className="text-[10px] text-slate-400">Public comments on Sheriff screening protocols • 280 Attending</p>
        </div>
      </div>
    </aside>
  );
}
