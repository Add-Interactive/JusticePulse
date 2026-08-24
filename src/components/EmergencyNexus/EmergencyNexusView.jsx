import React, { useState } from 'react';
import { 
  PhoneCall, 
  LifeBuoy, 
  Globe, 
  ShieldAlert, 
  Users, 
  Share2, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  HeartHandshake, 
  MessageSquare, 
  Radio, 
  Sparkles, 
  Lock, 
  Scale,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  emergencyHotlines, 
  unitedFrontSocialGroups, 
  nationalAlliesNetwork 
} from '../../data/emergencyNexusData';

export default function EmergencyNexusView({ showToast }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [scriptCopied, setScriptCopied] = useState(false);

  const invocationScript = `CONSTITUTIONAL RIGHTS INVOCATION SCRIPT:
"Officer, I am exercising my constitutional right to remain silent under the Fifth Amendment.
I am requesting to speak with an attorney immediately.
I do not consent to any search of my person, my vehicle, my home, or my digital phone device.
If I am not under arrest, am I free to leave?"`;

  const handleCopyScript = () => {
    navigator.clipboard?.writeText(invocationScript);
    setScriptCopied(true);
    confetti({ particleCount: 40, spread: 60 });
    showToast('Constitutional invocation script copied to clipboard!', 'success');
    setTimeout(() => setScriptCopied(false), 4000);
  };

  const filteredHotlines = emergencyHotlines.filter(h => {
    const matchesSearch = !searchQuery || 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      h.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'ALL' || h.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-crimson-950/80 to-slate-900 rounded-3xl p-6 border border-crimson-800/60 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-crimson-400 mb-1">
            <LifeBuoy className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">The National United Front & Legal Nexus</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Emergency Hotlines, Social Alliances & Pro Bono Legal Network
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            The central nexus uniting all online support pages, 24/7 emergency legal intake lines, community bail networks, and grassroots social media alliances under one cohesive front.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950/90 p-3 rounded-2xl border border-crimson-800/50 flex-shrink-0">
          <PhoneCall className="w-5 h-5 text-crimson-400 animate-pulse" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Immediate Legal Hotline</span>
            <span className="text-sm font-mono font-extrabold text-white">1-800-555-JUSTICE</span>
          </div>
        </div>
      </div>

      {/* Immediate Constitutional Invocation Survival Card */}
      <div className="bg-slate-900/90 rounded-3xl border-2 border-amber-500/60 p-5 sm:p-6 space-y-3 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-amber-400">
            <Scale className="w-5 h-5" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-white">
              Instant Legal Protection: 5th & 4th Amendment Survival Script
            </h3>
          </div>
          <span className="text-[10px] bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-800 font-mono font-bold">
            Read Directly to Officers
          </span>
        </div>

        <p className="text-xs text-slate-200 font-mono bg-slate-950 p-4 rounded-2xl border border-slate-800 whitespace-pre-line leading-relaxed">
          {invocationScript}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-slate-400">
            Keep calm. State this clearly on video. Do not physically resist or provide phone passcodes without a warrant.
          </span>
          <button
            onClick={handleCopyScript}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-glow transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{scriptCopied ? 'Script Copied!' : 'Copy Invocation Script'}</span>
          </button>
        </div>
      </div>

      {/* 24/7 Emergency Crisis & Legal Hotlines */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-crimson-400" />
            <span>24/7 Verified Emergency Legal & Crisis Hotlines</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Toll-Free & Confidential</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHotlines.map(h => (
            <div
              key={h.id}
              className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-crimson-700/60 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-crimson-950 text-crimson-300 border border-crimson-800/60 font-mono">
                    {h.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.2 rounded border border-emerald-800 font-mono">
                    {h.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{h.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{h.description}</p>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1 text-xs font-mono">
                  <p className="text-crimson-400 font-bold flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5" /> {h.tollFree || h.phone}
                  </p>
                  <p className="text-[10px] text-slate-400">{h.availability}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(h.phone);
                    showToast(`Phone number for ${h.name} copied to dialer!`, 'success');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy Phone
                </button>

                <a
                  href={h.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson flex items-center gap-1 transition-colors"
                >
                  <span>Intake Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* United Front Online Social Networks, Discords, Signal & Reddit Groups */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>United Front Online Network: Social Groups & Rapid Channels</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Connect directly with verified organizing discords, signal chats, Reddit communities, and bereaved family alliances.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unitedFrontSocialGroups.map(sg => (
            <div
              key={sg.id}
              className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-indigo-600/60 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                    {sg.platform}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">
                    {sg.membersCount}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{sg.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{sg.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.2 rounded border border-emerald-800">
                  {sg.badge}
                </span>

                <a
                  href={sg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center gap-1.5 transition-all"
                >
                  <span>Join Community</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* National Partner Alliances Directory */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>National Civil Rights Organizations & Impact Litigators</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nationalAlliesNetwork.map((ally, idx) => (
            <div key={idx} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 shadow-xl flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{ally.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{ally.location}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ally.focus}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">{ally.founder}</span>
                <a
                  href={ally.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-justice-400 hover:text-justice-300 flex items-center gap-1 font-semibold"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
