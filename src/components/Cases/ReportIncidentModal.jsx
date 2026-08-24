import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  FileUp, 
  Lock, 
  CheckCircle, 
  Scale, 
  AlertTriangle,
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportIncidentModal({ isOpen, onClose, onAddCase, showToast }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    victim: '',
    age: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    jurisdiction: '',
    officerName: '',
    officerBadge: '',
    summary: '',
    keyInjustices: '',
    bodycamAvailable: true,
    requestLegalAid: true,
    isAnonymous: false,
    fileUploadedName: ''
  });

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.title || !formData.victim || !formData.location) {
        showToast('Please fill out the required incident and location fields.', 'error');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleFileDrop = () => {
    setFormData(prev => ({ 
      ...prev, 
      fileUploadedName: `EVIDENCE_${Date.now()}_BODYCAM_RAW.MP4 (SHA-256: 8f9b...a104)` 
    }));
    showToast('Video evidence indexed with cryptographic SHA-256 timestamp', 'info');
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const newCase = {
      id: `case-user-${Date.now()}`,
      title: formData.title || 'Reported Excessive Force Encounter',
      victim: formData.victim,
      age: parseInt(formData.age, 10) || 28,
      date: formData.date,
      location: formData.location,
      jurisdiction: formData.jurisdiction || 'Local Law Enforcement Dept',
      status: 'Community Intake / Under Investigation',
      outcomeCategory: 'Active Investigation',
      qualifiedImmunity: 'Pending Legal Review',
      summary: formData.summary || 'Incident submitted via community whistleblower intake. Preliminary evidence undergoing cryptographic hash verification.',
      keyInjustices: formData.keyInjustices ? formData.keyInjustices.split('\n').filter(Boolean) : [
        'Excessive force during compliance',
        'Failure to activate body-worn camera promptly'
      ],
      officersInvolved: [
        {
          name: formData.officerName || 'Officer Under Identification',
          badge: formData.officerBadge || 'Badge # Under FOIA Inquiry',
          status: 'Internal Affairs Referral Submitted',
          repeatOffender: false
        }
      ],
      settlementAmount: 'Pre-Litigation Intake',
      taxpayerCost: 'Case Pending Review',
      bodycamAvailable: formData.bodycamAvailable,
      bodycamDuration: 'Eyewitness Footage Uploaded',
      evidenceCount: 3,
      petitionSignatures: 1,
      petitionGoal: 50000,
      familyFundRaised: 0,
      familyFundGoal: 25000,
      attorney: formData.requestLegalAid ? 'Assigned to Pro Bono Legal Clinic' : 'Self-Represented',
      tags: ['Community Intake', 'Eyewitness Submitted'],
      timeline: [
        { date: formData.date, title: 'Incident Reported', description: 'Civilian witness submitted detailed incident report.' }
      ]
    };

    onAddCase(newCase);
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 }
    });
    showToast('Incident Report securely submitted & queued for pro bono legal review!', 'success');
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-crimson-950 border border-crimson-800/60 flex items-center justify-center text-crimson-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Report Police Misconduct Incident</h3>
              <p className="text-xs text-slate-400">Step {step} of 3 • Secure Whistleblower & Legal Intake</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4 animation-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Incident Title / Headline *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Unlawful Vehicle Search & Excessive Force on Route 66"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Victim Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Full name of affected individual"
                    value={formData.victim}
                    onChange={(e) => handleChange('victim', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 29"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Springfield, Illinois"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Law Enforcement Agency / Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sangamon County Sheriff or Memphis PD SCORPION Unit"
                  value={formData.jurisdiction}
                  onChange={(e) => handleChange('jurisdiction', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow"
                >
                  Continue to Officers & Evidence →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4 animation-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Officer Name(s)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deputy Sean Grayson"
                    value={formData.officerName}
                    onChange={(e) => handleChange('officerName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Badge Number / Patrol Unit #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #142 / Unit 4"
                    value={formData.officerBadge}
                    onChange={(e) => handleChange('officerBadge', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Detailed Narrative of Injustice
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what occurred sequentially: verbal commands, compliance, escalation, force deployed, statements made..."
                  value={formData.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Key Violations (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Unlawful search without consent&#10;Body camera turned off during search&#10;Threats of physical harm"
                  value={formData.keyInjustices}
                  onChange={(e) => handleChange('keyInjustices', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow"
                >
                  Continue to Evidence Vault & Submission →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animation-fade-in">
              {/* Evidence Upload Dropzone Simulation */}
              <div 
                onClick={handleFileDrop}
                className="border-2 border-dashed border-slate-700 hover:border-justice-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-950/60 group"
              >
                <FileUp className="w-10 h-10 text-justice-400 mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-slate-200 mt-2">
                  Drop Video, Audio, or FOIA Documents Here
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports MP4, MOV, MP3, PDF, JPG. All uploads are stamped with cryptographic SHA-256 hashes to guarantee chain of custody.
                </p>
                {formData.fileUploadedName ? (
                  <div className="mt-3 p-2 bg-emerald-950 border border-emerald-800 rounded-lg text-xs font-mono text-emerald-300">
                    ✓ {formData.fileUploadedName}
                  </div>
                ) : (
                  <span className="inline-block mt-3 px-3 py-1 bg-slate-800 group-hover:bg-justice-950 text-slate-300 text-[11px] rounded-lg border border-slate-700">
                    Click to Simulate Evidence Attachment
                  </span>
                )}
              </div>

              {/* Legal Aid Connection Option */}
              <div className="p-4 bg-justice-950/40 border border-justice-800/60 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-justice-300">
                  <Scale className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Pro Bono Legal Defense Dispatch</span>
                </div>
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requestLegalAid}
                    onChange={(e) => handleChange('requestLegalAid', e.target.checked)}
                    className="rounded border-slate-700 text-justice-500 focus:ring-0"
                  />
                  <span>Dispatch this report to verified civil rights attorneys in the Legal Clinic network</span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white rounded-xl text-xs font-bold shadow-glow-crimson flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit to National Public Docket</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
