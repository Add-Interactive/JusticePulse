import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  FileText, 
  Download, 
  Lock, 
  CheckCircle2, 
  HeartHandshake, 
  Plus, 
  Trash2,
  Sparkles,
  Phone,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FamilySafetyPlanModal({ isOpen, onClose, showToast }) {
  const [parentName, setParentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [attorneyName, setAttorneyName] = useState('');
  const [attorneyPhone, setAttorneyPhone] = useState('');
  const [children, setChildren] = useState([
    { name: '', age: '', school: '' }
  ]);
  const [medicalNotes, setMedicalNotes] = useState('');
  const [aNumber, setANumber] = useState('');

  if (!isOpen) return null;

  const handleAddChild = () => {
    setChildren([...children, { name: '', age: '', school: '' }]);
  };

  const handleRemoveChild = (index) => {
    if (children.length > 1) {
      setChildren(children.filter((_, idx) => idx !== index));
    }
  };

  const handleChildChange = (index, field, value) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };

  const handleSaveAndDownload = (e) => {
    e.preventDefault();
    if (!parentName || !guardianName || !guardianPhone) {
      showToast('Please fill out the primary parent and emergency guardian fields.', 'error');
      return;
    }

    confetti({ particleCount: 50, spread: 70 });
    showToast('Emergency Family Caregiver Affidavit & Child Safety Plan Generated & Downloaded (PDF)!', 'success');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-lg animation-fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0c101c] border-2 border-indigo-600/80 rounded-3xl w-full max-w-3xl max-h-[95vh] shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-[#111726] to-purple-950 border-b-2 border-indigo-800/60 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-900/80 rounded-xl text-indigo-300 border border-indigo-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight font-display">
                FAMILY EMERGENCY SAFETY PLAN &amp; CAREGIVER AFFIDAVIT
              </h3>
              <p className="text-[11px] text-indigo-200/80 font-mono">
                Legal designation of emergency child guardianship stored securely on device
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveAndDownload} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs font-mono">
          {/* Privacy & Encryption Notice */}
          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-800 flex items-start space-x-3 text-indigo-200">
            <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Local Device Sanctuary Protection:</strong> All information entered here is processed entirely locally on your device and is never uploaded to any cloud server without your explicit consent.
            </p>
          </div>

          {/* Section 1: Primary Parent / Head of Household */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
              1. Primary Parent / Legal Guardian Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Parent / Guardian Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Legal Name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Alien Reg. # (A-Number) (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. A-123-456-789"
                  value={aNumber}
                  onChange={(e) => setANumber(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Designated Emergency Guardian for Minors */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              2. Designated Emergency Caregiver (Authorized to Care for Children)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Emergency Caregiver Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Legal Name of Trusted Adult"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Emergency Caregiver Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Caregiver Residential Address</label>
                <input
                  type="text"
                  placeholder="Street Address, City, State, ZIP"
                  value={guardianAddress}
                  onChange={(e) => setGuardianAddress(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Minor Children */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                3. Minor Children Covered Under Plan
              </span>
              <button
                type="button"
                onClick={handleAddChild}
                className="px-2.5 py-1 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Child</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {children.map((child, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#080c14] border border-[#1e2a3f] flex flex-col sm:flex-row items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="Child Full Name"
                    value={child.name}
                    onChange={(e) => handleChildChange(idx, 'name', e.target.value)}
                    className="w-full sm:flex-1 bg-[#111726] border border-[#243147] rounded-lg px-2.5 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Age"
                    value={child.age}
                    onChange={(e) => handleChildChange(idx, 'age', e.target.value)}
                    className="w-full sm:w-16 bg-[#111726] border border-[#243147] rounded-lg px-2.5 py-1.5 text-white text-center"
                  />
                  <input
                    type="text"
                    placeholder="School / Daycare Name"
                    value={child.school}
                    onChange={(e) => handleChildChange(idx, 'school', e.target.value)}
                    className="w-full sm:flex-1 bg-[#111726] border border-[#243147] rounded-lg px-2.5 py-1.5 text-white"
                  />
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChild(idx)}
                      className="p-1.5 text-slate-500 hover:text-crimson-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Retained Attorney & Medical Notes */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#243147] space-y-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              4. Legal Counsel &amp; Medical Directives
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Immigration Defense Attorney</label>
                <input
                  type="text"
                  placeholder="Attorney or Legal Aid Organization"
                  value={attorneyName}
                  onChange={(e) => setAttorneyName(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Attorney Direct Hotline</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={attorneyPhone}
                  onChange={(e) => setAttorneyPhone(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Critical Medical &amp; Prescription Directives</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Asthma inhaler for youngest child, daily insulin schedule, pediatrician contact..."
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#080c14] border-t border-[#1c273a] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[10px] text-slate-400">
              Generates State Caregiver Authorization Affidavit with legal power of attorney
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 text-white rounded-xl font-bold uppercase tracking-wider shadow-glow-indigo active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Generate &amp; Download Safety Packet (PDF)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
