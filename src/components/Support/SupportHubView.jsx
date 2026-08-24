import React, { useState } from 'react';
import { 
  HeartHandshake, 
  PhoneCall, 
  Scale, 
  Heart, 
  Users, 
  ShieldCheck, 
  ExternalLink, 
  Mail, 
  Calendar,
  CheckCircle,
  Copy
} from 'lucide-react';
import { supportHotlines, legalNetworks, mutualAidFunds } from '../../data/supportResources';

export default function SupportHubView({ onOpenDonateModal, showToast }) {
  const [activeSubTab, setActiveSubTab] = useState('mutual-aid');
  const [copiedNumber, setCopiedNumber] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedNumber(text);
    showToast(`Copied ${text} to clipboard!`, 'success');
    setTimeout(() => setCopiedNumber(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 rounded-2xl p-6 border border-emerald-900/40 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-2 text-emerald-400 mb-1">
          <HeartHandshake className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Sanctuary & Outreach Hub</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Victim & Family Mutual Aid, Trauma Healing & Pro Bono Legal Defense
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          A dedicated sanctuary providing direct financial relief to bereaved families, rapid-response pro bono legal counsel, and licensed trauma therapy circles.
        </p>
      </div>

      {/* 24/7 Hotlines Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-crimson-400" />
          <span>Immediate 24/7 Crisis & Legal Response Lines</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {supportHotlines.map((hotline, idx) => (
            <div key={idx} className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-justice-400 border border-slate-800">
                    {hotline.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{hotline.hours}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 mt-2">{hotline.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{hotline.description}</p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-crimson-400">{hotline.number}</span>
                <button
                  onClick={() => handleCopy(hotline.number)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedNumber === hotline.number ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="border-b border-slate-800 flex space-x-4">
        {[
          { id: 'mutual-aid', label: 'Verified Family Mutual Aid Funds', count: mutualAidFunds.length },
          { id: 'legal-network', label: 'Pro Bono Civil Rights Legal Clinics', count: legalNetworks.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center space-x-2 transition-all ${
              activeSubTab === tab.id
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab 1: Mutual Aid Directory */}
      {activeSubTab === 'mutual-aid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animation-fade-in">
          {mutualAidFunds.map(fund => {
            const percent = Math.min(100, Math.round((fund.raised / fund.target) * 100));
            return (
              <div key={fund.id} className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl">
                <img src={fund.image} alt={fund.title} className="w-full h-36 object-cover" />
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                      {fund.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100 leading-snug">{fund.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{fund.description}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-emerald-400 font-bold">${fund.raised.toLocaleString()}</span>
                        <span className="text-slate-500">Goal: ${fund.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenDonateModal(fund)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald transition-all"
                    >
                      Donate to Family Trust
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Pro Bono Legal Clinics */}
      {activeSubTab === 'legal-network' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animation-fade-in">
          {legalNetworks.map(net => (
            <div key={net.id} className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-justice-950 text-justice-400 border border-justice-800">
                    {net.rating}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{net.activeCases} Active Docket Cases</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{net.name}</h4>
                <p className="text-xs text-slate-300"><strong>Specialization:</strong> {net.focus}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-400 flex-wrap">
                  <span className="text-slate-500">Jurisdictions:</span>
                  {net.states.map((st, idx) => (
                    <span key={idx} className="text-[11px] px-1.5 py-0.2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(net.contact);
                    showToast(`Intake email (${net.contact}) copied to clipboard!`, 'info');
                  }}
                  className="text-xs text-justice-400 hover:text-justice-300 flex items-center gap-1 font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" /> Direct Intake ({net.contact})
                </button>
                <a
                  href={net.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
