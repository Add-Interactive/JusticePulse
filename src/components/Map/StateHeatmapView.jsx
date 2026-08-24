import React, { useState } from 'react';
import { 
  Map, 
  MapPin, 
  Scale, 
  ShieldAlert, 
  Building, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { stateMapData } from '../../data/stateMapData';

export default function StateHeatmapView({ onOpenCaseDetail, showToast }) {
  const [selectedStateCode, setSelectedStateCode] = useState('IL');

  const selectedState = stateMapData.find(s => s.code === selectedStateCode) || stateMapData[0];

  const getRatingBadge = (rating) => {
    if (rating.startsWith('A')) return 'bg-emerald-950 text-emerald-300 border-emerald-700';
    if (rating.startsWith('B')) return 'bg-justice-950 text-justice-300 border-justice-700';
    if (rating.startsWith('C')) return 'bg-amber-950 text-amber-300 border-amber-700';
    return 'bg-crimson-950 text-crimson-300 border-crimson-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-justice-950/70 to-slate-900 rounded-2xl p-6 border border-justice-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-justice-400 mb-1">
          <Map className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">50-State Accountability Matrix</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          State-by-State Legal Shield & Settlement Map
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Examine state decertification laws, federal circuit court Qualified Immunity shield rates, taxpayer settlement totals, and local pro bono legal clinics.
        </p>
      </div>

      {/* State Selector Buttons Grid */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Select State Jurisdiction to Inspect:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stateMapData.map(st => {
            const isSelected = selectedStateCode === st.code;
            return (
              <button
                key={st.code}
                onClick={() => setSelectedStateCode(st.code)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-justice-600 text-white border-justice-400 shadow-glow'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold font-mono text-sm">{st.code}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-justice-800 text-white' : getRatingBadge(st.rating)
                  }`}>
                    {st.rating.split(' ')[0]}
                  </span>
                </div>
                <p className="text-xs font-semibold truncate mt-0.5">{st.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* State Detailed Report Card */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-7 space-y-6 shadow-2xl animation-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-white font-display">{selectedState.name}</span>
              <span className="text-sm font-mono text-slate-400 font-bold">({selectedState.code})</span>
              <span className="text-xs text-justice-400 bg-justice-950 px-2 py-0.5 rounded border border-justice-800 font-mono">
                {selectedState.circuit}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Accountability Rating: <strong className="text-slate-200">{selectedState.rating}</strong>
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">10-Yr State Misconduct Payouts</span>
            <span className="text-xl font-extrabold font-mono text-crimson-400">{selectedState.totalSettlements10Yr}</span>
          </div>
        </div>

        {/* 3 Core Legal Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pillar 1: Qualified Immunity */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400">
              <Scale className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Qualified Immunity Rate</h4>
            </div>
            <p className="text-base font-extrabold font-mono text-amber-300">{selectedState.qiShieldRate}</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Percentage of civil rights brutality claims dismissed under federal circuit court precedent.
            </p>
          </div>

          {/* Pillar 2: Gypsy Cop Decertification */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-crimson-400">
              <ShieldAlert className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Gypsy Cop Prevention</h4>
            </div>
            <p className="text-xs font-bold text-slate-200">{selectedState.gypsyCopLaw}</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Statutory framework governing mandatory state registry of disciplined or fired officers.
            </p>
          </div>

          {/* Pillar 3: Bodycam Mandate */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <FileCheck2 className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Bodycam Legislation</h4>
            </div>
            <p className="text-xs font-bold text-slate-200">{selectedState.bodycamMandate}</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Statewide mandate status, retention periods, and public release FOIA timelines.
            </p>
          </div>
        </div>

        {/* Active Dockets in State */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active High-Profile Cases & Inquiries in {selectedState.name}
          </h4>
          <div className="space-y-1.5">
            {selectedState.activeDockets.map((dock, idx) => (
              <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{dock}</span>
                <span className="text-[10px] text-justice-400 uppercase font-mono">Verified Docket</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Bono Partner Footer */}
        <div className="p-4 bg-justice-950/30 rounded-2xl border border-justice-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-justice-400 block">Lead Pro Bono Legal Partner</span>
            <span className="text-slate-200 font-bold">{selectedState.proBonoPartner}</span>
          </div>
          <button
            onClick={() => showToast(`Connecting to ${selectedState.proBonoPartner} intake...`, 'info')}
            className="px-4 py-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow"
          >
            Contact State Intake Clinic
          </button>
        </div>
      </div>
    </div>
  );
}
