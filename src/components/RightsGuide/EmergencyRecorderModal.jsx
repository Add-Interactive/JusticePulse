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
  VolumeX,
  Download,
  AlertOctagon,
  Scale,
  Phone,
  Scan,
  ShieldCheck,
  Eye,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ICE_ENCOUNTER_DATA } from '../../data/iceEncounterData';
import RedCardModal from '../ICEShield/RedCardModal';
import WarrantVerifierModal from '../ICEShield/WarrantVerifierModal';

export default function EmergencyRecorderModal({ isOpen, onClose, showToast }) {
  // Encounter Mode: 'general' | 'ice' | 'juvenile' | 'home' | 'traffic'
  const [encounterType, setEncounterType] = useState('ice');
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [uploadedChunks, setUploadedChunks] = useState(3);
  const [geoLoc, setGeoLoc] = useState({ lat: '39.7817° N', lng: '89.6501° W', address: '4th & Adams St, Springfield IL' });
  const [smsSent, setSmsSent] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLangIndex, setSelectedLangIndex] = useState(0); // 0 = English, 1 = Spanish

  // Sub-modals inside SOS
  const [isRedCardOpen, setIsRedCardOpen] = useState(false);
  const [isWarrantVerifierOpen, setIsWarrantVerifierOpen] = useState(false);

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

  const currentBroadcast = ICE_ENCOUNTER_DATA?.emergencyBroadcasts?.[selectedLangIndex] || {
    statement: 'I am exercising my Fifth Amendment right to remain silent. I do not consent to any searches without a judicial warrant.',
    lang: 'English',
    nativeLang: 'English',
    flag: '🇺🇸'
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleBroadcastSMS = () => {
    setSmsSent(true);
    confetti({ particleCount: 30, spread: 50 });
    const encounterLabels = {
      ice: 'ICE / Immigration Stop',
      juvenile: 'Juvenile & Tactical Squad Stop',
      home: 'Police at Front Door',
      traffic: 'Traffic Checkpoint',
      general: 'Police Encounter'
    };
    showToast(`🚨 Emergency SMS (${encounterLabels[encounterType]}) with live GPS link dispatched to 3 Contacts & Legal Aid!`, 'success');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 }
    });
    showToast(`Emergency Encounter recording finalized! ${uploadedChunks} encrypted chunks secured with SHA-256 fingerprint.`, 'success');
  };

  const handleSpeakAloud = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const textToSpeak = encounterType === 'juvenile'
        ? 'I am a minor. I want my parent or guardian present before I answer any questions or sign any statement. I am exercising my right to remain silent.'
        : currentBroadcast.statement;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      showToast(`🔊 Broadcasting Constitutional Assertion aloud...`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-lg animation-fade-in select-none">
      <div className="bg-slate-900 border-2 border-crimson-700/90 rounded-3xl w-full max-w-3xl max-h-[96vh] shadow-2xl overflow-hidden flex flex-col justify-between">
        {/* Top Emergency Ticker Bar */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-crimson-950 via-[#160609] to-crimson-950 border-b-2 border-crimson-800 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-3.5 w-3.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-red-400 font-mono">
                  SOS LIVE ENCOUNTER VAULT • {isRecording ? 'STREAMING ACTIVE' : 'SECURED'}
                </span>
              </div>
              <p className="text-[10px] text-crimson-200/80 font-mono hidden sm:block">
                Encrypted Off-Device Streaming • Cloud SHA-256 Vault Backup
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              if (isSpeaking && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }} 
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Encounter Mode Selector Ribbon */}
        <div className="p-2.5 bg-[#0a0204] border-b border-crimson-900/80 flex items-center space-x-2 overflow-x-auto flex-shrink-0">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold pl-1 flex-shrink-0">
            Encounter Mode:
          </span>

          {[
            { id: 'ice', label: '🛑 ICE / Immigration Stop', color: 'bg-crimson-600 text-white border-crimson-400 shadow-glow-crimson' },
            { id: 'juvenile', label: '🧒 Youth & Tactical Squad Stop', color: 'bg-indigo-600 text-white border-indigo-400 shadow-glow-indigo' },
            { id: 'home', label: '🚪 Police at Front Door', color: 'bg-amber-600 text-white border-amber-400 shadow-glow' },
            { id: 'traffic', label: '🚗 Vehicle Checkpoint', color: 'bg-purple-600 text-white border-purple-400 shadow-glow' },
            { id: 'general', label: '🚨 General Police Stop', color: 'bg-slate-800 text-white border-slate-600' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setEncounterType(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                encounterType === item.id
                  ? item.color
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Body Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* Video / Audio Simulation HUD Canvas */}
          <div className="relative bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 overflow-hidden min-h-[200px] flex flex-col justify-between font-mono">
            {/* Top HUD Telemetry */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 text-xs bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 shadow-md">
                <Radio className="w-3.5 h-3.5 text-crimson-400 animate-pulse" />
                <span className="text-crimson-400 font-bold">{formatTime(seconds)}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">1080p 60FPS</span>
              </div>

              <div className="flex items-center space-x-1.5 text-xs bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 text-emerald-400 shadow-md">
                <CloudUpload className="w-3.5 h-3.5 animate-bounce" />
                <span>{uploadedChunks} Chunks Synced</span>
              </div>
            </div>

            {/* Central Animated Pulse & Waveform */}
            <div className="text-center space-y-2 py-3 z-10">
              <div className="w-14 h-14 rounded-2xl bg-crimson-950/80 border-2 border-crimson-500/60 flex items-center justify-center mx-auto shadow-glow-crimson animate-pulse">
                <Video className="w-7 h-7 text-crimson-400" />
              </div>

              {/* Pulsing Audio Waveform */}
              <div className="flex items-center justify-center space-x-1.5 py-1">
                {[12, 24, 40, 60, 85, 45, 90, 30, 75, 50, 65, 35, 80, 20].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-crimson-600 to-rose-400 rounded-full transition-all duration-150 animate-pulse"
                    style={{
                      height: `${isRecording ? h * 0.25 + 4 : 4}px`,
                      animationDelay: `${i * 70}ms`
                    }}
                  ></div>
                ))}
              </div>

              <p className="text-xs font-bold text-slate-200">
                Encrypted Off-Device Live Stream Active
              </p>
            </div>

            {/* Bottom GPS Overlay */}
            <div className="flex items-center justify-between text-[10px] bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 z-10">
              <span className="flex items-center gap-1 text-slate-300 truncate">
                <MapPin className="w-3 h-3 text-crimson-400 flex-shrink-0" /> {geoLoc.address} ({geoLoc.lat}, {geoLoc.lng})
              </span>
              <span className="text-justice-400 flex items-center gap-1 flex-shrink-0">
                <Lock className="w-3 h-3" /> AES-256 GCM
              </span>
            </div>
          </div>

          {/* DYNAMIC ENCOUNTER SPECIFIC ACTION TOOLS */}
          {encounterType === 'ice' && (
            <div className="p-4 rounded-2xl bg-crimson-950/70 border-2 border-crimson-600 space-y-3 animation-fade-in font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertOctagon className="w-4 h-4 text-crimson-400 animate-pulse" />
                  <span className="text-xs font-black uppercase text-white">ICE ENCOUNTER DEFENSE TOOLKIT</span>
                </div>
                <span className="text-[10px] text-crimson-300 font-bold">4th &amp; 5th AMENDMENT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setIsRedCardOpen(true)}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-crimson-600 to-pink-600 hover:from-crimson-500 text-white font-bold text-xs shadow-glow-crimson flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>Display Red Card</span>
                </button>

                <button
                  onClick={handleSpeakAloud}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 active:scale-95 ${
                    isSpeaking
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? 'Stop Audio' : '🔊 Speak Aloud'}</span>
                </button>

                <button
                  onClick={() => setIsWarrantVerifierOpen(true)}
                  className="p-2.5 rounded-xl bg-[#111726] hover:bg-[#1a243b] text-indigo-300 border border-indigo-600 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Scale className="w-4 h-4" />
                  <span>Check Warrant</span>
                </button>
              </div>

              <div className="p-2.5 bg-[#0a0204] rounded-xl border border-crimson-800/80 text-[11px] text-crimson-100 italic">
                "I do not consent to entry or search. Please slide the warrant under the door. I will not sign any documents without speaking to an attorney."
              </div>
            </div>
          )}

          {encounterType === 'juvenile' && (
            <div className="p-4 rounded-2xl bg-indigo-950/70 border-2 border-indigo-600 space-y-3 animation-fade-in font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-black uppercase text-white">YOUTH &amp; JUVENILE MIRANDA SHIELD</span>
                </div>
                <span className="text-[10px] text-indigo-300 font-bold">J.D.B. v. North Carolina</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleSpeakAloud}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 active:scale-95 ${
                    isSpeaking
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-indigo'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? 'Stop Audio' : '🔊 Speak Minor Rights Aloud'}</span>
                </button>

                <button
                  onClick={handleBroadcastSMS}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-4 h-4 text-indigo-400" />
                  <span>Ping Emergency Guardian</span>
                </button>
              </div>

              <div className="p-2.5 bg-[#0a0204] rounded-xl border border-indigo-800/80 text-[11px] text-indigo-100 italic">
                "I am a minor. I want my parents and attorney present before I answer any questions or sign any statement. I do not consent to any phone searches."
              </div>
            </div>
          )}

          {encounterType === 'home' && (
            <div className="p-4 rounded-2xl bg-amber-950/70 border-2 border-amber-600 space-y-3 animation-fade-in font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black uppercase text-white">HOME ENTRY &amp; DOOR SANCTITY SHIELD</span>
                </div>
                <span className="text-[10px] text-amber-300 font-bold">Payton v. New York</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => setIsWarrantVerifierOpen(true)}
                  className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-glow flex items-center justify-center space-x-1.5"
                >
                  <Scale className="w-4 h-4" />
                  <span>Verify Warrant (Slide Under Door)</span>
                </button>

                <button
                  onClick={() => setIsRedCardOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5"
                >
                  <AlertOctagon className="w-4 h-4 text-amber-400" />
                  <span>Display Red Card at Peephole</span>
                </button>
              </div>

              <div className="p-2.5 bg-[#0a0204] rounded-xl border border-amber-800/80 text-[11px] text-amber-100 italic">
                "Keep the door closed and locked. Opening the door gives implied consent. Demand a judicial search warrant signed by a Judge."
              </div>
            </div>
          )}

          {/* Emergency Dispatch Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2 text-justice-400">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Emergency Contacts</span>
                </div>
                <p className="text-[10.5px] text-slate-300">
                  Auto-dispatches live coordinates &amp; encrypted stream link.
                </p>
              </div>

              <button
                onClick={handleBroadcastSMS}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  smsSent
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-justice-600 hover:bg-justice-500 text-white shadow-glow'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{smsSent ? 'Emergency SMS Sent ✓' : 'Dispatch Emergency SMS'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 font-mono">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Phone className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Legal Defense Hotline</span>
              </div>
              <p className="text-[10.5px] text-slate-300">
                {encounterType === 'ice' ? 'National Immigration Legal Hotline: 1-844-363-1423' : 'National Civil Rights Legal Network: 1-800-555-JUSTICE'}
              </p>
              <a
                href={encounterType === 'ice' ? 'tel:18443631423' : 'tel:18005555878'}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200"
              >
                <span>Call Legal Intake Now ➔</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Finish / Minimize Controls */}
        <div className="p-4 bg-[#0a0204] border-t-2 border-crimson-900/80 flex items-center justify-between text-xs font-mono flex-shrink-0">
          <button
            onClick={() => {
              if (isSpeaking && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white"
          >
            Minimize in Background
          </button>

          {isRecording ? (
            <button
              onClick={handleStopRecording}
              className="px-6 py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-2xl font-bold shadow-glow-crimson flex items-center space-x-2 transition-all active:scale-95"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Stop &amp; Secure Footage</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-glow flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Finished (Vault Stamped)</span>
            </button>
          )}
        </div>
      </div>

      {/* Embedded Modals inside SOS */}
      <RedCardModal
        isOpen={isRedCardOpen}
        onClose={() => setIsRedCardOpen(false)}
        showToast={showToast}
      />

      <WarrantVerifierModal
        isOpen={isWarrantVerifierOpen}
        onClose={() => setIsWarrantVerifierOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
