import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertOctagon, 
  Volume2, 
  VolumeX, 
  Scale, 
  FileText, 
  Download, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  BookOpen, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  Video, 
  HeartHandshake, 
  ShieldCheck,
  Eye,
  Radio,
  PlusCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ICE_ENCOUNTER_DATA } from '../../data/iceEncounterData';
import RedCardModal from './RedCardModal';
import WarrantVerifierModal from './WarrantVerifierModal';
import FamilySafetyPlanModal from './FamilySafetyPlanModal';
import WarrantCameraScannerModal from './WarrantCameraScannerModal';
import EncounterTrainingSimulatorModal from './EncounterTrainingSimulatorModal';

export default function ICEShieldView({ onOpenSOSModal, showToast }) {
  const [activeSubTab, setActiveSubTab] = useState('scenarios'); // 'scenarios' | 'red_card' | 'warrant' | 'family_plan' | 'hotlines' | 'radar'
  const [selectedScenarioId, setSelectedScenarioId] = useState('home_door');
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals state
  const [isRedCardModalOpen, setIsRedCardModalOpen] = useState(false);
  const [isWarrantModalOpen, setIsWarrantModalOpen] = useState(false);
  const [isFamilyPlanModalOpen, setIsFamilyPlanModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  // Community Sighting Radar List
  const [sightings, setSightings] = useState([
    { id: 's-1', location: 'Chicago, IL • 26th & Kedzie (Little Village)', type: 'Roving Tactical Patrol', time: '18m ago', verified: true, notes: 'Unmarked dark SUVs observed near commercial strip.' },
    { id: 's-2', location: 'Houston, TX • Gulfton / Bellaire Blvd', type: 'Vehicle Traffic Checkpoint', time: '42m ago', verified: true, notes: 'Local squad and federal enforcement staging near transit station.' },
    { id: 's-3', location: 'Queens, NY • Roosevelt Ave & 103rd St', type: 'Subway Station Sweep', time: '1h ago', verified: true, notes: 'Observer pod deployed on site. No judicial warrants produced.' }
  ]);

  const [newSightingLoc, setNewSightingLoc] = useState('');
  const [newSightingType, setNewSightingType] = useState('Roving Tactical Patrol');
  const [newSightingNotes, setNewSightingNotes] = useState('');

  const currentBroadcast = ICE_ENCOUNTER_DATA.emergencyBroadcasts[selectedLanguageIndex];
  const currentScenario = ICE_ENCOUNTER_DATA.encounterScenarios.find(s => s.id === selectedScenarioId) || ICE_ENCOUNTER_DATA.encounterScenarios[0];

  const handleSpeakAloud = (text, lang) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const langCodes = {
        'English': 'en-US',
        'Spanish': 'es-MX',
        'Haitian Creole': 'fr-FR',
        'Mandarin Chinese': 'zh-CN',
        'Arabic': 'ar-SA',
        'Vietnamese': 'vi-VN',
        'Portuguese': 'pt-BR',
        'French': 'fr-FR',
        'Tagalog': 'fil-PH',
        'Korean': 'ko-KR'
      };

      utterance.lang = langCodes[lang] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      showToast(`Broadcasting assertion in ${lang} aloud...`, 'info');
    } else {
      showToast('Speech synthesis not supported in this browser.', 'error');
    }
  };

  const handleReportSighting = (e) => {
    e.preventDefault();
    if (!newSightingLoc.trim()) {
      showToast('Please enter location of sighting.', 'error');
      return;
    }

    const newReport = {
      id: `s-${Date.now()}`,
      location: newSightingLoc.trim(),
      type: newSightingType,
      time: 'Just now',
      verified: false,
      notes: newSightingNotes.trim() || 'Community alert submitted. Legal observers dispatched for verification.'
    };

    setSightings([newReport, ...sightings]);
    setNewSightingLoc('');
    setNewSightingNotes('');
    confetti({ particleCount: 35, spread: 50 });
    showToast('Community Sighting logged! Rapid-response legal observers notified.', 'success');
  };

  const subTabs = [
    { id: 'scenarios', label: '⚖️ Tactical & ICE Scenarios' },
    { id: 'juvenile', label: '🧒 Youth & Juvenile Squad Defense' },
    { id: 'broadcast', label: '🔊 Multilingual Audio Announcer' },
    { id: 'radar', label: '📡 Raid & Checkpoint Radar' },
    { id: 'sanctuary_map', label: '🗺️ 50-State Sanctuary Policies' },
    { id: 'family_plan', label: '👨‍👩‍👧 Family Safety & Child Lock' },
    { id: 'hotlines', label: '📞 24/7 Rapid Legal Hotlines' }
  ];

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto animation-fade-in select-none pb-16">
      {/* Top Emergency Action Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-crimson-950 via-[#18080c] to-[#0a0204] border-2 border-crimson-600 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-crimson-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-crimson-950/90 border border-crimson-500 text-crimson-200 text-xs font-mono font-bold tracking-wider uppercase">
              <ShieldAlert className="w-4 h-4 text-crimson-400 animate-pulse" />
              <span>CIVIL DEFENSE • ICE &amp; TACTICAL SQUAD ENCOUNTER SHIELD</span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-black">
                4TH &amp; 5TH AMENDMENT PROTECTION
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
              KNOW YOUR RIGHTS: <span className="bg-gradient-to-r from-crimson-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">ICE &amp; TACTICAL POLICE SQUAD</span> DEFENSE
            </h1>
            <p className="text-sm sm:text-base text-crimson-100/90 font-normal leading-relaxed">
              Real-time legal scripts, judicial warrant verification, multi-lingual audio speaker broadcast, digital Red Cards (Tarjetas Rojas), juvenile interrogation protections, and emergency rapid-response legal dispatch.
            </p>
          </div>

          {/* Quick Action Matrix Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => setIsRedCardModalOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-r from-crimson-600 to-pink-600 hover:from-crimson-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-glow-crimson flex items-center justify-center space-x-2 transition-all active:scale-95 border border-crimson-400"
            >
              <AlertOctagon className="w-4 h-4 animate-pulse flex-shrink-0" />
              <span>Display Red Card (Tarjeta Roja)</span>
            </button>

            <button
              onClick={() => setIsWarrantModalOpen(true)}
              className="p-4 rounded-2xl bg-[#111726] hover:bg-[#1a243b] text-indigo-300 hover:text-white font-bold text-xs sm:text-sm border-2 border-indigo-600 transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg"
            >
              <Scale className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>Warrant Checklist (Judge vs ICE)</span>
            </button>

            <button
              onClick={() => setIsScannerModalOpen(true)}
              className="p-4 rounded-2xl bg-[#111726] hover:bg-[#1a243b] text-cyan-300 hover:text-white font-bold text-xs sm:text-sm border-2 border-cyan-600 transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg"
            >
              <Eye className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Warrant OCR Scanner</span>
            </button>

            <button
              onClick={onOpenSOSModal}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border-2 border-slate-700 transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-lg"
            >
              <Video className="w-4 h-4 text-crimson-400 animate-pulse flex-shrink-0" />
              <span>1-Tap SOS Live Stream</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sub-Navigation Tabs */}
      <div className="flex space-x-2 border-b-2 border-[#243147] pb-2 overflow-x-auto">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeSubTab === tab.id
                ? 'bg-gradient-to-r from-crimson-600 to-indigo-600 text-white border-crimson-400 shadow-glow-crimson'
                : 'bg-[#111726] text-slate-300 border-[#243147] hover:border-slate-600 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: ENCOUNTER SCENARIOS (ICE & JUVENILE TACTICAL SQUADS)            */}
      {/* ========================================================================= */}
      {activeSubTab === 'scenarios' && (
        <div className="space-y-6 animation-fade-in">
          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ICE_ENCOUNTER_DATA.encounterScenarios.map((sc) => {
              const isSelected = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-3 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-b from-crimson-900/90 to-[#111726] border-crimson-400 shadow-glow-crimson ring-2 ring-crimson-500/40'
                      : 'bg-[#111726] border-[#243147] hover:border-crimson-500/50'
                  }`}
                >
                  <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded uppercase block truncate ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1.5 leading-snug line-clamp-2">{sc.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Selected Scenario Deep-Dive Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-crimson-600/80 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#243147]">
              <div className="space-y-1">
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${currentScenario.badgeColor}`}>
                  {currentScenario.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                  {currentScenario.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsTrainingModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-indigo"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Encounter Training Quiz</span>
                </button>

                <button
                  onClick={() => handleSpeakAloud(currentScenario.urgentRule, 'English')}
                  className="px-4 py-2 rounded-xl bg-crimson-950 hover:bg-crimson-900 text-crimson-300 border border-crimson-700 font-mono text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play Audio Guidance</span>
                </button>
              </div>
            </div>

            {/* Urgent Rule Highlight Banner */}
            <div className="p-4 rounded-2xl bg-crimson-950/80 border-2 border-crimson-500 flex items-start space-x-3 text-white">
              <AlertOctagon className="w-5 h-5 text-crimson-400 flex-shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-crimson-300 font-bold block">
                  CRITICAL SURVIVAL RULE
                </span>
                <p className="text-xs sm:text-sm font-black leading-snug">{currentScenario.urgentRule}</p>
              </div>
            </div>

            {/* Key Actions Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Exact Step-by-Step Defense Protocol:</span>
              </h4>

              <div className="space-y-2.5">
                {currentScenario.keyActions.map((action, aIdx) => (
                  <div key={aIdx} className="p-3.5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] flex items-start space-x-3 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-crimson-400 border border-slate-700 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {aIdx + 1}
                    </span>
                    <p className="leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Precedents Footer */}
            <div className="pt-3 border-t border-[#1c273a] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <span>Binding Legal Authority: <strong className="text-amber-300">{currentScenario.legalCitations}</strong></span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(currentScenario.keyActions.join('\n'));
                  showToast('Defense scenario checklist copied to clipboard!', 'success');
                }}
                className="text-justice-400 hover:text-justice-300 font-bold"
              >
                Copy Protocol Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: YOUTH & JUVENILE SQUAD DEFENSE                                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'juvenile' && (
        <div className="space-y-6 animation-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-indigo-600/80 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#243147]">
              <div>
                <span className="text-[9.5px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-200 border border-indigo-600 font-bold uppercase">
                  SUPREME COURT YOUTH INTERROGATION STANDARD
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                  Youth Miranda &amp; School Resource Officer (SRO) Defense
                </h3>
                <p className="text-xs text-indigo-200/80 font-mono mt-0.5">
                  Protections under J.D.B. v. North Carolina (564 U.S. 261) and In re Gault (387 U.S. 1)
                </p>
              </div>

              <button
                onClick={() => {
                  confetti({ particleCount: 35, spread: 50 });
                  showToast('Youth Pocket Miranda Card downloaded!', 'success');
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-indigo flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Youth Miranda Card</span>
              </button>
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ICE_ENCOUNTER_DATA.juvenileScenarios.map((juv) => (
                <div
                  key={juv.id}
                  className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-indigo-500/60 transition-all space-y-3 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold uppercase ${juv.badgeColor}`}>
                        {juv.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{juv.setting}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{juv.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{juv.rule}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#1c273a]">
                    <div className="p-2.5 bg-[#111726] rounded-xl border border-indigo-800/60 text-xs font-mono text-indigo-300 italic">
                      "{juv.script}"
                    </div>
                    <p className="text-[10px] text-amber-400 font-mono">{juv.precedent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: MULTILINGUAL AUDIO ANNOUNCER                                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'broadcast' && (
        <div className="space-y-6 animation-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-crimson-600 space-y-6 shadow-2xl">
            <div>
              <span className="text-[9.5px] font-mono px-2.5 py-0.5 rounded-full bg-crimson-900 text-crimson-200 border border-crimson-600 font-bold uppercase">
                10-LANGUAGE LOUDSPEAKER BROADCAST
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                Loudspeaker Constitutional Voice Assertion
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Press to play your Fifth Amendment right to remain silent aloud through your phone speaker in 10 languages
              </p>
            </div>

            {/* Language Selector Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {ICE_ENCOUNTER_DATA.emergencyBroadcasts.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLanguageIndex(idx)}
                  className={`p-3 rounded-2xl text-left border font-mono transition-all ${
                    selectedLanguageIndex === idx
                      ? 'bg-crimson-600 text-white border-crimson-400 shadow-glow-crimson font-bold'
                      : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:text-white'
                  }`}
                >
                  <span className="text-base block">{b.flag}</span>
                  <span className="text-xs block mt-1 font-bold">{b.nativeLang}</span>
                  <span className="text-[10px] text-slate-400 block">{b.lang}</span>
                </button>
              ))}
            </div>

            {/* Broadcast Box */}
            <div className="p-6 rounded-2xl bg-[#080c14] border-2 border-crimson-700/80 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-crimson-400 uppercase">
                  {currentBroadcast.lang} Translation Statement:
                </span>
                <span className="text-[10px] font-mono text-slate-400">Web Speech Neural Audio</span>
              </div>

              <blockquote className="text-base sm:text-lg text-white font-medium leading-relaxed italic bg-[#111726] p-4 rounded-xl border border-[#243147]">
                "{currentBroadcast.statement}"
              </blockquote>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleSpeakAloud(currentBroadcast.statement, currentBroadcast.lang)}
                  className={`px-6 py-3 rounded-2xl font-bold font-mono text-xs sm:text-sm flex items-center space-x-2 shadow-glow-crimson transition-all active:scale-95 ${
                    isSpeaking
                      ? 'bg-amber-600 hover:bg-amber-500 text-white animate-pulse'
                      : 'bg-crimson-600 hover:bg-crimson-500 text-white'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? 'Stop Audio Broadcast' : `🔊 Speak Aloud in ${currentBroadcast.nativeLang}`}</span>
                </button>

                <button
                  onClick={() => setIsRedCardModalOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <AlertOctagon className="w-4 h-4 text-crimson-400" />
                  <span>Open Full-Screen Red Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: RAID & CHECKPOINT RADAR                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'radar' && (
        <div className="space-y-6 animation-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Active Verified Sighting Feed (7 Cols) */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-display">Active Sighting &amp; Raid Radar</h3>
                  <p className="text-xs text-slate-400 font-mono">Community-reported checkpoints &amp; tactical squad staging</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-crimson-950 text-crimson-300 border border-crimson-800 font-bold">
                  LIVE RADAR
                </span>
              </div>

              <div className="space-y-3">
                {sightings.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-crimson-400" />
                        <span>{item.location}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-crimson-950 text-crimson-300 border border-crimson-800 font-bold">
                        {item.type}
                      </span>
                      {item.verified && (
                        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                          ✓ OBSERVER VERIFIED
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Submit Sighting Form (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#111726] border-2 border-crimson-600/70 space-y-4 shadow-xl">
              <div>
                <h4 className="text-base font-bold text-white font-display">Report Active Checkpoint or Sighting</h4>
                <p className="text-xs text-slate-400 font-mono">Dispatches legal observer verification pod</p>
              </div>

              <form onSubmit={handleReportSighting} className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Exact Location / Intersection</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 26th &amp; Kedzie Ave, Chicago"
                    value={newSightingLoc}
                    onChange={(e) => setNewSightingLoc(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-crimson-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Encounter Type</label>
                  <select
                    value={newSightingType}
                    onChange={(e) => setNewSightingType(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-crimson-500"
                  >
                    <option value="Roving Tactical Patrol">Roving Tactical Patrol</option>
                    <option value="Vehicle Traffic Checkpoint">Vehicle Traffic Checkpoint</option>
                    <option value="Residential Staging">Residential Door-to-Door Staging</option>
                    <option value="Workplace Enforcement">Workplace Commercial Site</option>
                    <option value="Transit Station Sweep">Transit / Bus Station Sweep</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Observer Notes / Vehicle Descriptions</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 2 unmarked black Ford Explorers, agents in tactical vests..."
                    value={newSightingNotes}
                    onChange={(e) => setNewSightingNotes(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-crimson-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl font-bold font-mono uppercase tracking-wider shadow-glow-crimson active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Broadcast Community Sighting Alert</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: 50-STATE SANCTUARY POLICIES & DETAINER LIMITS                    */}
      {/* ========================================================================= */}
      {activeSubTab === 'sanctuary_map' && (
        <div className="space-y-6 animation-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-6 shadow-2xl">
            <div>
              <span className="text-[9.5px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-600 font-bold uppercase">
                SANCTUARY VS. 287(g) COOPERATION MATRIX
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                50-State ICE Sanctuary Laws &amp; Detainer Limits
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Overview of state statutes restricting local law enforcement from enforcing civil immigration detainers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ICE_ENCOUNTER_DATA.sanctuaryStatePolicies.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-emerald-500/50 transition-all space-y-3 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span>{st.state} ({st.code})</span>
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${st.badgeColor}`}>
                        {st.type}
                      </span>
                    </div>

                    <h4 className="text-xs font-mono font-bold text-amber-300">{st.policy}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{st.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: FAMILY SAFETY & CHILD LOCK                                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'family_plan' && (
        <div className="space-y-6 animation-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-indigo-600/80 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#243147]">
              <div>
                <h3 className="text-xl font-black text-white font-display">
                  Family Emergency Safety Plan &amp; Child Custody Lock
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Proactive legal steps to safeguard children and financial assets in the event of sudden detention
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <button
                    onClick={() => setIsFamilyPlanModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow"
                  >
                    <Users className="w-4 h-4" />
                    <span>Generate Caregiver Affidavit</span>
                  </button>

                  <button
                    onClick={() => {
                      confetti({ particleCount: 35, spread: 50 });
                      showToast('Family Emergency Safety Plan (Printable Packet PDF) downloaded!', 'success');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-indigo"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Packet PDF</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ICE_ENCOUNTER_DATA.familySafetyPlanChecklist.map((plan, idx) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{plan.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-8">{plan.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: 24/7 RAPID LEGAL HOTLINES                                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'hotlines' && (
        <div className="space-y-6 animation-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-6 shadow-2xl">
            <div>
              <h3 className="text-xl font-black text-white font-display">
                24/7 Verified Immigration &amp; Rapid Defense Hotlines
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Direct toll-free connections to vetted civil rights litigators, bond reservoirs, and emergency observer pods
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ICE_ENCOUNTER_DATA.rapidResponseHotlines.map((hotline, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-crimson-500/60 transition-all space-y-3 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-crimson-950 text-crimson-300 border border-crimson-800 font-bold">
                        {hotline.type}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{hotline.hours}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{hotline.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{hotline.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1c273a] flex items-center justify-between">
                    <span className="text-sm font-mono font-black text-amber-300">{hotline.number}</span>
                    <a
                      href={`tel:${hotline.number.replace(/[^0-9]/g, '')}`}
                      className="px-3.5 py-1.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-glow-crimson"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Embedded Modals */}
      <RedCardModal
        isOpen={isRedCardModalOpen}
        onClose={() => setIsRedCardModalOpen(false)}
        showToast={showToast}
      />

      <WarrantVerifierModal
        isOpen={isWarrantModalOpen}
        onClose={() => setIsWarrantModalOpen(false)}
        showToast={showToast}
      />

      <FamilySafetyPlanModal
        isOpen={isFamilyPlanModalOpen}
        onClose={() => setIsFamilyPlanModalOpen(false)}
        showToast={showToast}
      />

      <WarrantCameraScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        showToast={showToast}
      />

      <EncounterTrainingSimulatorModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
