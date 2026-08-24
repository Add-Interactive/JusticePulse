import React, { useState } from 'react';
import { 
  Radio, 
  Video, 
  MapPin, 
  Users, 
  ShieldAlert, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CopWatchRadarView({ onOpenSOSModal, showToast }) {
  const [activeDispatches, setActiveDispatches] = useState([
    {
      id: 'CW-892',
      location: '5th & Monroe St, Springfield IL',
      description: 'Traffic stop with 3 cruisers on scene. 2 civilian legal observers currently filming from sidewalk.',
      observers: 48,
      status: 'LIVE STREAMING',
      duration: '06m 42s',
      officerUnit: 'Sangamon County Unit #18',
      joined: false
    },
    {
      id: 'CW-891',
      location: 'Beale St & 2nd, Memphis TN',
      description: 'Peaceful community vigil & gathering. NLG legal observers on site.',
      observers: 142,
      status: 'LIVE STREAMING',
      duration: '28m 10s',
      officerUnit: 'MPD Patrol #402',
      joined: false
    },
    {
      id: 'CW-889',
      location: 'Michigan Ave, Chicago IL',
      description: 'Vehicle inspection checkpoint. Civilian observers monitoring de-escalation protocols.',
      observers: 85,
      status: 'MONITORING',
      duration: '14m 18s',
      officerUnit: 'CPD 1st District',
      joined: false
    }
  ]);

  const handleJoinObserver = (id) => {
    setActiveDispatches(dispatches => dispatches.map(d => {
      if (d.id === id) {
        return {
          ...d,
          joined: true,
          observers: d.observers + 1
        };
      }
      return d;
    }));

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    showToast('You joined as a Verified Remote Legal Observer. Stream session encrypted.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-crimson-950/60 to-slate-900 rounded-2xl p-6 border border-crimson-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-crimson-400 mb-1">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Live Civilian Cop-Watch Radar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Active Community Incident Dispatch & Remote Witnessing
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Real-time decentralized livestream network. When community members encounter police, nearby observers and remote legal teams tune in to ensure accountability.
          </p>
        </div>

        <button
          onClick={onOpenSOSModal}
          className="flex items-center space-x-2 px-5 py-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson transition-all flex-shrink-0"
        >
          <Video className="w-4 h-4" />
          <span>Broadcast My Encounter</span>
        </button>
      </div>

      {/* Live Dispatches Stream Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-ping"></span>
            <span>Live Encounters Currently Streaming ({activeDispatches.length})</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Total Observers Online: 275</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeDispatches.map(dispatch => (
            <div
              key={dispatch.id}
              className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-mono font-bold text-crimson-400">{dispatch.status}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs font-mono text-slate-400">{dispatch.id}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs text-justice-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {dispatch.duration}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dispatch.observers} Observers Watching</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Left info (8 cols) */}
                <div className="md:col-span-8 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-100">
                    <MapPin className="w-4 h-4 text-crimson-400 flex-shrink-0" />
                    <span>{dispatch.location}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {dispatch.description}
                  </p>
                  <div className="pl-6 text-[11px] text-slate-400 font-mono">
                    Tagged Police Unit: <strong className="text-slate-200">{dispatch.officerUnit}</strong>
                  </div>
                </div>

                {/* Right Action (4 cols) */}
                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
                  <button
                    onClick={() => handleJoinObserver(dispatch.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                      dispatch.joined
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-glow-emerald'
                        : 'bg-gradient-to-r from-justice-600 to-justice-500 hover:from-justice-500 hover:to-justice-400 text-white shadow-glow'
                    }`}
                  >
                    {dispatch.joined ? <CheckCircle2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{dispatch.joined ? 'Active Legal Observer' : 'Tune In & Observe Stream'}</span>
                  </button>

                  <button
                    onClick={() => showToast(`Emergency alert dispatched to local legal hotline for ${dispatch.id}`, 'info')}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                  >
                    Alert NLG Defense Hotlines
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
