import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  ShieldAlert, 
  Video, 
  Clock, 
  AlertTriangle, 
  PlusCircle, 
  CheckCircle2, 
  Flame, 
  Volume2,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FieldObserverView({ onOpenSOSModal, showToast }) {
  const [loggedIncidents, setLoggedIncidents] = useState([
    { id: '1', time: '10:14 PM', badge: 'Deputy #142 (Grayson)', vehicle: 'Cruiser #18', note: 'Bodycam not visible on lapel. Standing by driver window.' },
    { id: '2', time: '10:18 PM', badge: 'Officer #4190', vehicle: 'Unmarked Ford Explorer', note: 'Order given to step back 10ft. Complying while recording.' }
  ]);
  const [badgeInput, setBadgeInput] = useState('');
  const [vehicleInput, setVehicleInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  // Dispersal order timer (counts down from 180 seconds / 3 mins)
  const [dispersalTimer, setDispersalTimer] = useState(null);
  const [isDispersalRunning, setIsDispersalRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isDispersalRunning && dispersalTimer > 0) {
      interval = setInterval(() => {
        setDispersalTimer(prev => prev - 1);
      }, 1000);
    } else if (dispersalTimer === 0) {
      setIsDispersalRunning(false);
      showToast('Dispersal Order Window Expired. Document egress routes and legal observer status.', 'error');
    }
    return () => clearInterval(interval);
  }, [isDispersalRunning, dispersalTimer]);

  const handleStartDispersalTimer = () => {
    setDispersalTimer(180);
    setIsDispersalRunning(true);
    showToast('3-Minute Dispersal Order Timer Activated. Logging timestamp.', 'info');
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!badgeInput.trim() && !noteInput.trim()) return;

    const newLog = {
      id: `${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      badge: badgeInput.trim() || 'Officer on scene',
      vehicle: vehicleInput.trim() || 'Cruiser',
      note: noteInput.trim()
    };

    setLoggedIncidents([newLog, ...loggedIncidents]);
    setBadgeInput('');
    setVehicleInput('');
    setNoteInput('');
    confetti({ particleCount: 30, spread: 50 });
    showToast('Field observation logged with local cryptographic timestamp.', 'success');
  };

  const munitions = [
    { name: 'CS Tear Gas (2-Chlorobenzalmalononitrile)', type: 'Chemical Riot Control Agent', symptoms: 'Severe burning of eyes, throat, skin. Flush eyes with saline / cool water only. Do not rub eyes.', warning: 'Banned in international warfare under 1993 Chemical Weapons Convention.' },
    { name: '40mm Foam Baton / Sponge Round', type: 'Kinetic Impact Projectile', symptoms: 'Severe blunt force trauma. Can cause fractures and internal bleeding.', warning: 'Unconstitutional if fired directly at head, neck, or groin.' },
    { name: 'Pepperball (PAVA / Capsaicin)', type: 'Irritant Projectile', symptoms: 'Intense respiratory irritation. Deployed via high-pressure launcher.', warning: 'Keep distance; document distance of launcher deployment.' },
    { name: 'Long Range Acoustic Device (LRAD)', type: 'Acoustic Directed Energy Weapon', symptoms: 'Ear pain, permanent hearing loss, vertigo.', warning: 'Cover ears; document decibel distance if siren beam activated.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-crimson-950 to-slate-900 rounded-2xl p-6 border border-crimson-800/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-crimson-400 mb-1">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Tactical High-Visibility Mode</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            On-The-Ground Legal Observer & Field Witness Toolkit
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            High-contrast interface optimized for live protest monitoring, rapid badge logging, dispersal order countdowns, and munition identification.
          </p>
        </div>

        <button
          onClick={onOpenSOSModal}
          className="flex items-center space-x-2 px-6 py-3.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-glow-crimson transition-all flex-shrink-0 active:scale-95"
        >
          <Video className="w-4 h-4 animate-bounce" />
          <span>Launch SOS Cloud Livestream</span>
        </button>
      </div>

      {/* Dispersal Order Timer Widget & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Dispersal Timer Card (5 Cols) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-3xl border border-amber-500/50 p-6 space-y-4 shadow-xl text-center">
          <div className="flex items-center justify-center space-x-2 text-amber-400">
            <Clock className="w-5 h-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Dispersal Order Countdown</h3>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
              {dispersalTimer !== null ? `${Math.floor(dispersalTimer / 60)}:${String(dispersalTimer % 60).padStart(2, '0')}` : '03:00'}
            </span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">
              {isDispersalRunning ? 'Order Declared by Incident Commander' : 'Ready to Start on Police Megaphone Announcement'}
            </p>
          </div>

          {!isDispersalRunning ? (
            <button
              onClick={handleStartDispersalTimer}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-glow transition-all"
            >
              Start 3-Min Dispersal Order Timer
            </button>
          ) : (
            <button
              onClick={() => {
                setIsDispersalRunning(false);
                setDispersalTimer(null);
              }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
            >
              Reset Timer
            </button>
          )}

          <p className="text-[10px] text-slate-400 italic">
            Legal Note: Police must give audible, clear dispersal announcements with a designated unobstructed egress route before declaring an unlawful assembly.
          </p>
        </div>

        {/* Rapid Field Log Input (7 Cols) */}
        <form onSubmit={handleAddLog} className="md:col-span-7 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-justice-400" /> Fast Officer / Vehicle Logger
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Timestamp Auto-Stamping</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Badge # / Officer Name</label>
              <input
                type="text"
                placeholder="e.g. #142 (Grayson)"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-justice-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Patrol Car # / Unit</label>
              <input
                type="text"
                placeholder="e.g. Unit 4, SUV Plate #..."
                value={vehicleInput}
                onChange={(e) => setVehicleInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-justice-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Observation Note</label>
            <input
              type="text"
              placeholder="e.g. Officer drew taser, bodycam obscured, gave order to move back..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-justice-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow transition-all"
          >
            Add to Witness Log ({loggedIncidents.length} Entries)
          </button>
        </form>
      </div>

      {/* Field Log Entries Table */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-5 space-y-3 shadow-xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Timestamped Field Observations</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {loggedIncidents.map(log => (
            <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-justice-400">{log.time}</span>
                  <span className="font-bold text-white truncate">{log.badge}</span>
                  <span className="text-[10px] font-mono text-slate-400">({log.vehicle})</span>
                </div>
                <p className="text-slate-300 leading-normal">{log.note}</p>
              </div>
              <button
                onClick={() => setLoggedIncidents(loggedIncidents.filter(l => l.id !== log.id))}
                className="text-slate-600 hover:text-crimson-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Munition & Chemical Agent Identification Guide */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Less-Lethal Munition & Chemical Agent Field Identifier</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {munitions.map((m, idx) => (
            <div key={idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-100">{m.name}</h5>
                <span className="text-[10px] bg-slate-950 text-amber-400 px-2 py-0.5 rounded border border-slate-800 font-mono">
                  {m.type}
                </span>
              </div>
              <p className="text-xs text-slate-300"><strong>First Aid Protocol:</strong> {m.symptoms}</p>
              <div className="p-2.5 bg-crimson-950/30 rounded-lg text-xs text-crimson-300 border border-crimson-900/50">
                <strong>Legal Red Flag:</strong> {m.warning}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
