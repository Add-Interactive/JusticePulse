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
  TrendingUp,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function RightSidebar({ onOpenCaseDetail, onOpenDonateModal, onSelectTab }) {
  return (
    <aside className="w-80 flex-shrink-0 hidden xl:block space-y-4 select-none">
      {/* Trending Case & Petition Widget */}
      <div className="bg-[#111726] rounded-3xl p-4 sm:p-5 border-2 border-[#243147] shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-[#1c273a] pb-2.5">
          <div className="flex items-center space-x-2 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">Trending Petition</span>
          </div>
          <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-700 font-mono font-bold">
            284.5k Signed
          </span>
        </div>

        <div className="bg-[#080c14] rounded-2xl p-3.5 border border-[#1e2a3f] space-y-2.5 shadow-inner">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs font-bold text-slate-100 hover:text-justice-400 transition-colors cursor-pointer leading-snug" onClick={() => onOpenCaseDetail('case-sonya-massey')}>
              Justice for Sonya Massey: Ban Repeat Misconduct Officers Nationwide
            </h4>
          </div>
          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
            Demand federal legislation mandating national decertification registries so fired officers cannot be rehired across county lines.
          </p>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Progress: 94.8%</span>
              <span className="text-justice-400 font-bold">Goal: 300k</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-crimson-500 h-full rounded-full w-[94.8%]"></div>
            </div>
          </div>

          <button
            onClick={() => onOpenCaseDetail('case-sonya-massey')}
            className="w-full py-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-glow active:scale-95"
          >
            <span>Sign & Review Full Docket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Urgent Mutual Aid Sanctuary Fund */}
      <div className="bg-[#111726] rounded-3xl p-4 sm:p-5 border-2 border-[#243147] shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-[#1c273a] pb-2.5">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Heart className="w-4 h-4 fill-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">Direct Family Relief</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700 font-mono font-bold">
            Verified 100%
          </span>
        </div>

        <div className="space-y-3">
          <div className="bg-[#080c14] rounded-2xl p-3.5 border border-[#1e2a3f] space-y-2.5 shadow-inner">
            <div className="flex items-center space-x-2.5">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80" 
                className="w-10 h-10 rounded-xl object-cover border-2 border-slate-700" 
                alt="Sonya Massey Family Trust"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">Sonya Massey Children's Trust</p>
                <p className="text-[10px] text-emerald-400 font-mono font-bold">$412,000 / $500,000</p>
              </div>
            </div>
            <button
              onClick={() => onOpenDonateModal({
                title: 'Sonya Massey Children Education Trust',
                beneficiary: 'Family of Sonya Massey',
                target: 500000,
                raised: 412000
              })}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow-emerald active:scale-95"
            >
              Stand With Family & Donate
            </button>
          </div>
        </div>
      </div>

      {/* Verified Civil Rights Attorneys Online */}
      <div className="bg-[#111726] rounded-3xl p-4 sm:p-5 border-2 border-[#243147] shadow-2xl space-y-3">
        <div className="flex items-center justify-between border-b border-[#1c273a] pb-2.5">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Scale className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">Pro Bono Panel</span>
          </div>
          <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700 font-mono font-bold">
            Live Duty
          </span>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Attorney Marcus Vance', specialty: 'Section 1983 Federal Litigation', bar: 'IL Bar #682914', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
            { name: 'Dr. Kimberly Adams', specialty: 'DOJ Pattern & Practice Review', bar: 'Civil Defense Lead', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' }
          ].map((atty, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-[#080c14] border border-[#1e2a3f] flex items-center space-x-2.5">
              <img src={atty.avatar} alt={atty.name} className="w-8 h-8 rounded-full object-cover border border-slate-600" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{atty.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{atty.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
