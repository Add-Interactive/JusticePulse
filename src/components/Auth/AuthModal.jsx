import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Scale, 
  Gavel, 
  FileText, 
  Eye, 
  EyeOff, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  ArrowRight,
  ShieldAlert,
  FolderLock,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { USER_ROLES, sampleUserPersonas } from '../../data/rolesData';
import { initialCases } from '../../data/casesData';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  initialMode = 'login',
  showToast 
}) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'register'
  
  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('defense_attorney');
  const [selectedCaseId, setSelectedCaseId] = useState('case-sonya-massey');
  const [customDocketNumber, setCustomDocketNumber] = useState('');
  const [barNumber, setBarNumber] = useState('');
  const [organization, setOrganization] = useState('');

  if (!isOpen) return null;

  const currentSelectedRole = USER_ROLES.find(r => r.id === selectedRoleId) || USER_ROLES[0];

  // Submit Handler for custom Registration / Login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() && authMode === 'register') {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
      roleId: selectedRoleId,
      role: currentSelectedRole.title,
      badge: currentSelectedRole.badge,
      barNumber: barNumber || 'N/A',
      assignedCases: selectedCaseId ? [selectedCaseId] : [],
      primaryCaseNumber: customDocketNumber || 'DOCKET-2024-NEW',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: `${currentSelectedRole.title} active on Justice Pulse civil defense network.`
    };

    confetti({ particleCount: 40, spread: 60 });
    onLoginSuccess(newUser);
    showToast(`Welcome back, ${newUser.name}! Logged in as ${newUser.role}.`, 'success');
    onClose();
  };

  // 1-Click Persona Quick Login Handler
  const handleQuickPersonaSelect = (persona) => {
    confetti({ particleCount: 35, spread: 50 });
    onLoginSuccess(persona);
    showToast(`Switched persona to ${persona.name} (${persona.role})`, 'success');
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animation-fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111726] border-2 border-[#243147] rounded-3xl w-full max-w-2xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#080c14] via-[#111726] to-[#080c14] border-b border-[#1c273a] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-justice-500 to-indigo-600 p-0.5 shadow-glow flex items-center justify-center">
              <div className="w-full h-full bg-[#080c14] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-justice-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white font-display">
                {authMode === 'login' ? 'Sign In to Justice Pulse' : 'Register Civic Defense Account'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Role-Based Clearance • Case Docket Association • Legal Discovery Access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selector: Login vs Register */}
        <div className="px-4 sm:px-6 pt-3 bg-[#080c14] border-b border-[#1c273a] flex space-x-2 flex-shrink-0">
          <button
            onClick={() => setAuthMode('login')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all border-t border-x ${
              authMode === 'login'
                ? 'bg-[#111726] text-white border-[#243147] border-b-transparent shadow-glow'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            🔐 Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold transition-all border-t border-x ${
              authMode === 'register'
                ? 'bg-[#111726] text-white border-[#243147] border-b-transparent shadow-glow'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            📝 Create Role-Based Account
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Demo Persona Switcher Banner */}
          <div className="p-3.5 bg-gradient-to-r from-indigo-950/80 via-[#080c14] to-purple-950/80 rounded-2xl border border-indigo-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Test Persona Login (Instant Role Switching)</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Demo Mode</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-32 overflow-y-auto pr-1">
              {sampleUserPersonas.map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handleQuickPersonaSelect(persona)}
                  className="p-2 rounded-xl bg-[#080c14] hover:bg-indigo-900/50 border border-slate-700/80 text-left transition-all flex items-center space-x-2 group active:scale-95"
                >
                  <img src={persona.avatar} alt={persona.name} className="w-6 h-6 rounded-full object-cover border border-justice-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white truncate leading-tight group-hover:text-justice-300">{persona.name}</p>
                    <p className="text-[8.5px] text-slate-400 font-mono truncate">{persona.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Full Legal / Display Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Attorney Marcus Vance / James Massey"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-justice-500 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@organization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-justice-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-justice-500 font-medium"
                />
              </div>
            </div>

            {/* Role Category Selector for Registration */}
            {authMode === 'register' && (
              <div className="space-y-3 pt-2 border-t border-[#1c273a]">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1 flex items-center justify-between">
                    <span>Select Civic Role & Access Category</span>
                    <span className="text-[10px] font-mono text-justice-400">{currentSelectedRole.clearanceLevel}</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {USER_ROLES.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRoleId(role.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          selectedRoleId === role.id
                            ? 'bg-indigo-950 border-justice-400 ring-2 ring-justice-500/40 shadow-glow'
                            : 'bg-[#080c14] border-[#1e2a3f] hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white leading-tight">{role.title}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded font-bold ${role.badgeColor}`}>
                            {role.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-snug">{role.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Case Association Dropdown & Docket Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Associated Active Case</label>
                    <select
                      value={selectedCaseId}
                      onChange={(e) => setSelectedCaseId(e.target.value)}
                      className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-justice-500 font-semibold truncate"
                    >
                      <option value="">None / General Observer</option>
                      {initialCases.map((c) => (
                        <option key={c.id} value={c.id}>{c.title} ({c.location})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Docket / Case Number</label>
                    <input
                      type="text"
                      placeholder="e.g. CR-2024-00892 / 24-CV-1983"
                      value={customDocketNumber}
                      onChange={(e) => setCustomDocketNumber(e.target.value)}
                      className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-justice-500 font-mono"
                    />
                  </div>
                </div>

                {/* Legal Credentials (Bar Number if applicable) */}
                {currentSelectedRole.requiresBarNumber && (
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">State Bar Number / License ID</label>
                    <input
                      type="text"
                      placeholder="e.g. IL-749201 / FL-391048"
                      value={barNumber}
                      onChange={(e) => setBarNumber(e.target.value)}
                      className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-justice-500 font-mono"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-justice-600 via-indigo-600 to-purple-600 hover:from-justice-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-glow flex items-center gap-2 active:scale-95"
              >
                <span>{authMode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#080c14] border-t border-[#1c273a] text-center text-[10px] text-slate-400 font-mono flex-shrink-0">
          Encrypted 256-bit Civic Authentication • Rule 1006 Evidentiary Compliance
        </div>
      </div>
    </div>
  );
}
