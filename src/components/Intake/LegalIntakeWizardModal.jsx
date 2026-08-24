import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Building, 
  Send, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LegalIntakeWizardModal({ isOpen, onClose, showToast }) {
  const [step, setStep] = useState(1);
  const [incidentDate, setIncidentDate] = useState('2025-06-15');
  const [stateCode, setStateCode] = useState('IL');
  const [violationType, setViolationType] = useState('Excessive Force / Brutality');
  const [injuries, setInjuries] = useState('');
  const [department, setDepartment] = useState('');
  const [hasVideo, setHasVideo] = useState(true);

  if (!isOpen) return null;

  // Calculate Statute of Limitations (2 years for Section 1983 in most states)
  const calcDaysRemaining = () => {
    if (!incidentDate) return 730;
    const incDate = new Date(incidentDate);
    const deadline = new Date(incDate);
    deadline.setFullYear(deadline.getFullYear() + 2);
    const now = new Date();
    const diffTime = deadline - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = calcDaysRemaining();

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 60, spread: 80 });
    showToast('Your confidential intake has been matched with 3 Pro Bono Civil Rights Clinics in your jurisdiction!', 'success');
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-justice-950 border border-justice-800/60 flex items-center justify-center text-justice-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Pro Bono Legal Defense Matching Wizard</h3>
              <p className="text-xs text-slate-400">Step {step} of 2 • Confidential Civil Rights Evaluation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">State Jurisdiction</label>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                >
                  <option value="IL">Illinois (7th Circuit)</option>
                  <option value="TN">Tennessee (6th Circuit)</option>
                  <option value="KY">Kentucky (6th Circuit)</option>
                  <option value="CO">Colorado (10th Circuit)</option>
                  <option value="TX">Texas (5th Circuit)</option>
                  <option value="NY">New York (2nd Circuit)</option>
                  <option value="CA">California (9th Circuit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Date of Incident</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                />
              </div>
            </div>

            {/* Statute of Limitations Real-Time Meter */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Section 1983 Statute of Limitations:</span>
                <span className="font-bold text-slate-200">2-Year Federal Window</span>
              </div>
              <span className={`text-sm font-mono font-extrabold px-2.5 py-1 rounded-lg ${
                daysRemaining < 90 ? 'bg-crimson-950 text-crimson-400 border border-crimson-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {daysRemaining} Days Remaining to File
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Primary Violation Category</label>
              <select
                value={violationType}
                onChange={(e) => setViolationType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
              >
                <option value="Excessive Force / Brutality">Excessive Force / Brutality (4th Amendment)</option>
                <option value="False Arrest / Unlawful Stop">False Arrest / Unlawful Stop (Terry v. Ohio)</option>
                <option value="Unlawful Home or Phone Search">Unlawful Home or Phone Search (Riley v. CA)</option>
                <option value="Denial of Medical Care in Custody">Denial of Emergency Medical Care in Custody</option>
                <option value="First Amendment Retaliation for Filming">First Amendment Retaliation for Filming</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow"
              >
                Continue to Agency & Match →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Law Enforcement Department Involved</label>
              <input
                type="text"
                placeholder="e.g. County Sheriff or Municipal Police Dept"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Injuries / Property Damage Sustained</label>
              <textarea
                rows={3}
                placeholder="Describe physical injuries, hospitalization, broken phone, or lost wages..."
                value={injuries}
                onChange={(e) => setInjuries(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
              ></textarea>
            </div>

            <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl flex items-center space-x-2.5 text-xs text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Confidential Match:</strong> Matches with 3 vetted pro bono civil rights clinics with zero upfront legal fees (contingency or pro bono).
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-justice-600 to-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center space-x-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit for Pro Bono Referral Match</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
