import React, { useState, useEffect } from 'react';
import { 
  X, 
  Video, 
  Radio, 
  MapPin, 
  ShieldAlert, 
  Lock, 
  CloudUpload, 
  Users, 
  CheckCircle,
  Square,
  AlertTriangle,
  Send,
  Volume2,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EmergencyRecorderModal({ isOpen, onClose, showToast }) {
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [uploadedChunks, setUploadedChunks] = useState(3);
  const [geoLoc, setGeoLoc] = useState({ lat: '39.7817° N', lng: '89.6501° W', address: '4th & Adams St, Springfield IL' });
  const [smsSent, setSmsSent] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isOpen && isRecording) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isRecording]);

  useEffect(() => {
    let chunkInterval = null;
    if (isOpen && isRecording) {
      chunkInterval = setInterval(() => {
        setUploadedChunks(prev => prev + 1);
      }, 3500);
    }
    return () => clearInterval(chunkInterval);
  }, [isOpen, isRecording]);

  if (!isOpen) return null;

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleBroadcastSMS = () => {
    setSmsSent(true);
    confetti({ particleCount: 30, spread: 50 });
    showToast('🚨 High-Priority Emergency SMS with live GPS link dispatched to 3 Trusted Contacts & Legal Hotline!', 'success');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 }
    });
    showToast(`Emergency Encounter recording finalized! ${uploadedChunks} encrypted chunks secured with SHA-256 fingerprint.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg animation-fade-in">
      <div className="bg-slate-900 border border-crimson-800/80 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Emergency Ticker */}
        <div className="p-4 bg-gradient-to-r from-crimson-900 via-slate-950 to-crimson-950 border-b border-crimson-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 font-mono">
              SOS LIVE ENCOUNTER VAULT • {isRecording ? 'STREAMING ACTIVE' : 'SECURED'}
            </span>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[260px] border-b border-slate-800 overflow-hidden">
          {/* Simulated HUD elements */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 text-xs font-mono bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
            <Radio className="w-3.5 h-3.5 text-crimson-400 animate-pulse" />
            <span className="text-crimson-400 font-bold">{formatTime(seconds)}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">1080p 60FPS</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center space-x-1.5 text-xs font-mono bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-emerald-400">
            <CloudUpload className="w-3.5 h-3.5 animate-bounce" />
            <span>{uploadedChunks} Chunks Synced</span>
          </div>

          {/* Central Live Animation */}
          <div className="text-center space-y-3 z-10">
            <div className="w-20 h-20 rounded-full bg-crimson-950/80 border-2 border-crimson-500/60 flex items-center justify-center mx-auto shadow-glow-crimson animate-pulse">
              <Video className="w-8 h-8 text-crimson-400" />
            </div>

            {/* Pulsing Audio Waveform Simulation */}
            <div className="flex items-center justify-center space-x-1.5 py-1">
              {[12, 24, 40, 60, 85, 45, 90, 30, 75, 50, 65, 35, 80, 20].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-crimson-600 to-rose-400 rounded-full transition-all duration-150 animate-pulse"
                  style={{
                    height: `${isRecording ? h * 0.35 + 6 : 4}px`,
                    animationDelay: `${i * 70}ms`
                  }}
                ></div>
              ))}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-100">Live Video & Audio Encrypted Stream</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Footage is streamed in real-time off-device. Even if this phone is confiscated or destroyed, your recording is permanently preserved in the cloud.
              </p>
            </div>
          </div>

          {/* Bottom GPS Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-800">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-crimson-400 flex-shrink-0" /> {geoLoc.address} ({geoLoc.lat}, {geoLoc.lng})
            </span>
            <span className="text-justice-400 flex items-center gap-1 flex-shrink-0">
              <Lock className="w-3 h-3" /> AES-256 GCM
            </span>
          </div>
        </div>

        {/* Action Controls & Emergency Notifications */}
        <div className="p-6 space-y-4 bg-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-justice-400">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Emergency Contacts</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  3 Trusted Contacts configured with live GPS stream tracking link.
                </p>
              </div>

              <button
                onClick={handleBroadcastSMS}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  smsSent
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-justice-600 hover:bg-justice-500 text-white shadow-glow'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{smsSent ? 'Emergency SMS Sent ✓' : 'Dispatch Emergency SMS'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2 text-emerald-400">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Legal Defense Hotline</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Connected to National Civil Rights Legal Intake Network (1-800-555-JUSTICE) for rapid observer dispatch.
              </p>
            </div>
          </div>

          {/* Verbal Rights Reminder */}
          <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-300 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Constitutional Invocation Script:
            </p>
            <p className="italic text-slate-200">
              "Officer, I am exercising my First Amendment right to record. I am exercising my Fifth Amendment right to remain silent. Am I being detained or am I free to go?"
            </p>
          </div>

          {/* Stop / Save Controls */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Minimize in Background
            </button>

            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="px-6 py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson flex items-center space-x-2 transition-all active:scale-95"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop & Secure Footage</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Finished (Vault Stamped)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
