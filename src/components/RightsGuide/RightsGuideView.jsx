import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Car, 
  Home, 
  HelpCircle,
  Copy,
  Sparkles
} from 'lucide-react';
import { rightsScenarios } from '../../data/supportResources';

export default function RightsGuideView({ onOpenSOSModal, showToast }) {
  const [selectedScenario, setSelectedScenario] = useState('traffic-stop');
  const [quizScore, setQuizScore] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const scenario = rightsScenarios.find(s => s.id === selectedScenario) || rightsScenarios[0];

  const handleCopyScript = (scriptText) => {
    navigator.clipboard?.writeText(scriptText);
    showToast('Constitutional verbal script copied to clipboard!', 'success');
  };

  const handleQuizSubmit = (optIndex) => {
    setQuizAnswer(optIndex);
    if (optIndex === 1) {
      setQuizScore('correct');
      showToast('Correct! Police cannot search your digital phone data without a signed warrant under Riley v. California.', 'success');
    } else {
      setQuizScore('incorrect');
      showToast('Incorrect. Review the 4th Amendment protections below.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 rounded-2xl p-6 border border-amber-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Constitutional Legal Defense Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Know Your Rights: Pocket Legal Survival Handbook
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Exact word-for-word legal scripts, Supreme Court precedents (4th, 5th, 1st Amendments), and common police deception tactics.
          </p>
        </div>

        <button
          onClick={onOpenSOSModal}
          className="flex items-center space-x-2 px-5 py-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson transition-all flex-shrink-0"
        >
          <Video className="w-4 h-4 animate-pulse" />
          <span>Launch SOS Encounter Mode</span>
        </button>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { id: 'traffic-stop', title: 'Traffic Stop Protocol', icon: Car, basis: '4th & 5th Amend' },
          { id: 'recording-police', title: 'Recording in Public', icon: Video, basis: '1st Amend' },
          { id: 'home-entry', title: 'Police at Your Door', icon: Home, basis: '4th Amend Home Sanctity' }
        ].map(item => {
          const Icon = item.icon;
          const isSelected = selectedScenario === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedScenario(item.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex items-start space-x-3 ${
                isSelected
                  ? 'bg-slate-900 border-amber-500 shadow-glow'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">{item.basis}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Details */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">{scenario.title}</h3>
            <p className="text-xs text-justice-400 font-mono mt-0.5">Constitutional Basis: {scenario.constitutionalBasis}</p>
          </div>
        </div>

        {/* Step-by-Step Instructions & Scripts */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step-by-Step Defense Protocol & Verbatim Scripts
          </h4>
          <div className="space-y-3">
            {scenario.rules.map((rule) => (
              <div key={rule.step} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-justice-950 text-justice-400 border border-justice-800 flex items-center justify-center text-xs font-bold font-mono">
                      {rule.step}
                    </span>
                    <h5 className="text-xs font-bold text-slate-100">{rule.title}</h5>
                  </div>
                  {rule.instruction.includes('Script:') && (
                    <button
                      onClick={() => handleCopyScript(rule.instruction)}
                      className="text-xs text-justice-400 hover:text-justice-300 flex items-center gap-1 font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Script
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-8">{rule.instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags & Unlawful Tactics */}
        <div className="p-4 bg-crimson-950/30 border border-crimson-900/60 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-crimson-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Unlawful Police Tactics & Red Flags</h4>
          </div>
          <ul className="space-y-2">
            {scenario.redFlags.map((flag, idx) => (
              <li key={idx} className="text-xs text-slate-200 flex items-start space-x-2">
                <span className="text-crimson-500 font-bold">•</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Constitutional Knowledge Check */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-justice-400">
          <HelpCircle className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
            Interactive Constitutional Knowledge Check
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          <strong>Question:</strong> During a traffic stop, an officer asks: <em>"Unlock your phone and let me look at your photos and text messages, or I'm taking you in."</em> What are your legal rights?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'You must unlock your phone if the officer has reasonable suspicion.',
            'You have a 4th Amendment right to refuse. Police cannot search smartphone contents without a judicial warrant (Riley v. California).',
            'You only have to unlock it if your vehicle is being impounded.',
            'Officers can search your phone if you are within 100 miles of a US border.'
          ].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuizSubmit(idx)}
              className={`p-3 rounded-xl text-left border text-xs transition-all ${
                quizAnswer === idx
                  ? idx === 1
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                    : 'bg-crimson-950 border-crimson-500 text-crimson-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {quizScore && (
          <div className={`p-3 rounded-xl text-xs font-semibold ${
            quizScore === 'correct' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-crimson-950/60 text-crimson-300 border border-crimson-800'
          }`}>
            {quizScore === 'correct' ? '✓ Correct! Under Riley v. California (2014), cell phones hold immense private information and require a search warrant.' : '✗ Incorrect. Officers cannot compel you to unlock your device without a warrant signed by a neutral judge.'}
          </div>
        )}
      </div>
    </div>
  );
}
