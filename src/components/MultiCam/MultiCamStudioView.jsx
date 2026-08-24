import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Rewind, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sliders, 
  Video, 
  Layers, 
  Clock, 
  Share2, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialMultiCamIncidents } from '../../data/multiCamData';

export default function MultiCamStudioView({ showToast }) {
  const [incidents, setIncidents] = useState(initialMultiCamIncidents);
  const [activeIncidentId, setActiveIncidentId] = useState('mc-massey');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(35); // 0 - 100
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.25, 0.5, 1, 2
  const [isMuted, setIsMuted] = useState(false);
  const [activeAngleLayout, setActiveAngleLayout] = useState('grid'); // 'grid' | 'pip' | 'single'

  const activeIncident = incidents.find(i => i.id === activeIncidentId) || incidents[0];

  // Simulated Playback Timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5 * playbackSpeed;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    setCurrentProgress(val);
  };

  const handleStepForward = () => {
    setCurrentProgress(Math.min(100, currentProgress + 1));
    showToast('Advanced 1 frame (+0.033s)', 'info');
  };

  const handleStepBackward = () => {
    setCurrentProgress(Math.max(0, currentProgress - 1));
    showToast('Rewound 1 frame (-0.033s)', 'info');
  };

  const handleExportTimeline = () => {
    const reportText = `================================================================================
JUSTICE PULSE — MULTI-ANGLE SYNCHRONIZED FORENSIC VIDEO TIMELINE
INCIDENT: ${activeIncident.title.toUpperCase()}
CASE: ${activeIncident.caseTitle.toUpperCase()}
DATE OF INCIDENT: ${activeIncident.date}
SYNCHRONIZED ANGLES: ${activeIncident.angles.length} OPTICAL STREAMS
================================================================================

I. SYNCHRONIZED OPTICAL CAMERA CHANNELS:
${activeIncident.angles.map((a, idx) => `
[CHANNEL #${idx + 1}] ${a.label.toUpperCase()}
- Camera Hardware: ${a.cameraType} | Badge: ${a.badge}
- Audio Track Present: ${a.audioPresent ? 'YES' : 'NO'}
- Forensic Observation: ${a.notes}
`).join('')}

II. FRAME-BY-FRAME SYNCHRONIZED TIMELINE:
${activeIncident.timelineEvents.map(e => `[${e.time}] ${e.title.toUpperCase()} — ${e.description}`).join('\n')}

================================================================================
Certified by Justice Pulse Forensic Optical Synchronizer
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `SYNCHRONIZED_VIDEO_REPORT_${activeIncident.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 40, spread: 60 });
    showToast('Synchronized Multi-Cam Forensic Timeline exported!', 'success');
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/70 to-slate-900 rounded-3xl p-6 border border-teal-800/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-teal-400 mb-1">
            <Video className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Forensic Multi-Cam Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Multi-Angle Synchronized Bodycam & Dashcam Replay
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Synchronize, compare, and step frame-by-frame through multiple bodycams, cruiser dashcams, and bystander phones simultaneously with sub-second accuracy.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <select
            value={activeIncidentId}
            onChange={(e) => {
              setActiveIncidentId(e.target.value);
              setCurrentProgress(0);
              setIsPlaying(false);
            }}
            className="bg-slate-950 border border-teal-700/60 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-semibold"
          >
            {incidents.map(inc => (
              <option key={inc.id} value={inc.id}>{inc.title}</option>
            ))}
          </select>

          <button
            onClick={handleExportTimeline}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Studio Video Player Display */}
      <div className="bg-slate-950 rounded-3xl border-2 border-slate-800 overflow-hidden shadow-2xl space-y-0">
        {/* Multi-Camera Angle Grid Viewport */}
        <div className="p-4 bg-slate-950">
          <div className={`grid gap-4 ${activeIncident.angles.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {activeIncident.angles.map((ang, idx) => (
              <div key={ang.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between">
                {/* Angle Header */}
                <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-ping"></span>
                    <span className="text-[11px] font-bold text-slate-200 truncate font-mono">
                      CAM {idx + 1}: {ang.badge}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-slate-800">
                    {ang.cameraType}
                  </span>
                </div>

                {/* Video Feed Preview Area */}
                <div className="relative h-48 sm:h-56 bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={ang.streamUrl}
                    alt={ang.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Timestamp & Frame Counter Overlay */}
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-900/60 flex items-center space-x-1.5">
                    <Clock className="w-3 h-3" />
                    <span>REC: 01:12:44.{(currentProgress * 0.14).toFixed(2)} CST</span>
                  </div>

                  {/* Audio Waveform Simulator Indicator */}
                  {ang.audioPresent && (
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[9px] font-mono text-teal-300 flex items-center space-x-1">
                      <Volume2 className="w-3 h-3 text-teal-400 animate-pulse" />
                      <span>48kHz PCM</span>
                    </div>
                  )}
                </div>

                {/* Angle Forensic Notes */}
                <div className="p-3 bg-slate-900/90 border-t border-slate-800">
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {ang.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Synchronized Playback Control HUD */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-4">
          {/* Synchronized Scrubber Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-teal-400 font-bold">
                SYNC TIME: 00:{Math.floor(currentProgress * 0.14).toString().padStart(2, '0')}:{(currentProgress * 0.8).toFixed(0).padStart(2, '0')}
              </span>
              <span>TOTAL DURATION: {activeIncident.duration}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={currentProgress}
              onChange={handleSeek}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
          </div>

          {/* Master Transport Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentProgress(0);
                  setIsPlaying(false);
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                title="Reset to Beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleStepBackward}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold font-mono"
                title="Step Backward 1 Frame"
              >
                -1 Frame
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald flex items-center space-x-1.5"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause All' : 'Play Synchronized'}</span>
              </button>

              <button
                onClick={handleStepForward}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold font-mono"
                title="Step Forward 1 Frame"
              >
                +1 Frame
              </button>
            </div>

            {/* Playback Speed Controls */}
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 font-mono px-2 uppercase">Speed:</span>
              {[0.25, 0.5, 1, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => {
                    setPlaybackSpeed(speed);
                    showToast(`Playback speed set to ${speed}x`, 'info');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${
                    playbackSpeed === speed
                      ? 'bg-teal-600 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Timeline Key Events Strip */}
      <div className="p-5 bg-slate-900/80 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> Key Forensic Microsecond Milestones
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {activeIncident.timelineEvents.map((evt, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                {evt.time}
              </span>
              <h5 className="text-xs font-bold text-white mt-1">{evt.title}</h5>
              <p className="text-[10px] text-slate-400 leading-snug">{evt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
