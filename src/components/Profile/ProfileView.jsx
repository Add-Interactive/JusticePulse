import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Scale, 
  HeartHandshake, 
  FileText, 
  Download, 
  Phone, 
  PlusCircle, 
  Flame, 
  Bookmark, 
  CheckCircle2, 
  Trash2, 
  Lock,
  Layers,
  Network,
  Briefcase,
  UserCheck,
  Key,
  FolderLock,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FBIEvidenceHUD from '../InvestigationBoard/FBIEvidenceHUD';
import { initialCases } from '../../data/casesData';

export default function ProfileView({ 
  currentUser, 
  setCurrentUser, 
  showToast, 
  onOpenCaseDetail,
  onOpenAuthModal 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: '1', name: 'Maya Linnea Johnson', phone: '(555) 392-8812', relation: 'Legal Observer Lead' },
    { id: '2', name: 'James Adams', phone: '(555) 441-2901', relation: 'Spouse / Emergency Next-of-Kin' }
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');

  const badges = [
    { title: 'Verified Civil Rights Advocate', desc: 'Authenticated community advocate with active civic chapter credentials.', icon: ShieldCheck, color: 'text-justice-400 bg-justice-950 border-justice-800' },
    { title: 'First Amendment Legal Witness', desc: 'Completed 2026 National Lawyers Guild Legal Observer Protocol.', icon: Award, color: 'text-amber-400 bg-amber-950 border-amber-800' },
    { title: 'Sanctuary Direct Aid Benefactor', desc: 'Contributed directly to 3+ verified victim family memorial trusts with 0% platform fees.', icon: HeartHandshake, color: 'text-emerald-400 bg-emerald-950 border-emerald-800' },
    { title: 'Cryptographic Evidence Custodian', desc: 'SHA-256 verified contributor to the National Police Accountability Docket.', icon: Lock, color: 'text-purple-400 bg-purple-950 border-purple-800' }
  ];

  const donationHistory = [
    { id: 'REC-2026-904', date: 'Aug 18, 2026', campaign: 'Sonya Massey Children\'s Education Sanctuary Trust', amount: '$150.00', taxDeductible: true, status: 'Verified Pass-Through' },
    { id: 'REC-2026-812', date: 'Aug 10, 2026', campaign: 'Elijah McClain Memorial & Youth Violin Sanctuary', amount: '$75.00', taxDeductible: true, status: 'Verified Pass-Through' },
    { id: 'REC-2026-774', date: 'Jul 24, 2026', campaign: 'National Bail Fund Emergency Reservoir', amount: '$100.00', taxDeductible: true, status: 'Verified Pass-Through' }
  ];

  const signedPetitions = [
    { id: 'pet-1', title: 'Ban Repeat Misconduct Officers & Establish Mandatory Decertification Registry', signedDate: 'Aug 20, 2026', signatures: '284,500' },
    { id: 'pet-2', title: 'Abolish Qualified Immunity in Civil Rights Excessive Force Claims (H.R. 1280 Provision)', signedDate: 'Aug 15, 2026', signatures: '1,420,000' }
  ];

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) {
      showToast('Please enter both contact name and phone number', 'error');
      return;
    }
    const newEntry = {
      id: `c-${Date.now()}`,
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      relation: newContactRelation.trim() || 'Trusted Contact'
    };
    setEmergencyContacts([...emergencyContacts, newEntry]);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactRelation('');
    confetti({ particleCount: 30, spread: 50 });
    showToast('Emergency Contact added for SOS Cloud Livestream alerts!', 'success');
  };

  const handleRemoveContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
    showToast('Emergency contact removed', 'info');
  };

  // Find user's linked cases
  const linkedCases = initialCases.filter(c => 
    currentUser?.assignedCases?.includes(c.id) || 
    currentUser?.roleId === 'admin' || 
    currentUser?.roleId === 'legal_moderator'
  );

  const tabs = [
    { id: 'overview', label: '👤 Civic Profile & Cases' },
    { id: 'sos-contacts', label: '🚨 SOS Emergency Contacts' },
    { id: 'badges', label: '🏅 Verified Badges' },
    { id: 'donations', label: '📜 Receipts & Petitions' },
    { id: 'whiteboard', label: '📌 Detective Whiteboard' }
  ];

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden select-none pb-12">
      {/* Profile Header Card */}
      <div className="bg-[#111726] rounded-3xl border-2 border-[#243147] p-4 sm:p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 w-full md:w-auto">
          <div className="relative flex-shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-justice-500 shadow-glow"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full ring-2 ring-slate-900">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-black text-white font-display truncate">
                {currentUser.name}
              </h2>
              <span className="text-[10px] sm:text-xs bg-indigo-950 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded-full font-semibold font-mono whitespace-nowrap">
                {currentUser.badge || currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium truncate">
              {currentUser.role} • Clearance: Verified
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5 truncate">
              UID: JP-{currentUser?.roleId?.toUpperCase() || 'CIVIC'}-{Date.now().toString().slice(-6)} • SHA-256 Vault Active
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-start md:justify-end flex-shrink-0">
          {onOpenAuthModal && (
            <button
              onClick={() => onOpenAuthModal('login')}
              className="px-3.5 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Switch Role Persona</span>
            </button>
          )}

          <button
            onClick={() => {
              confetti({ particleCount: 30, spread: 50 });
              showToast('Civic Profile Credentials exported (Encrypted PDF)!', 'success');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Card</span>
          </button>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex space-x-2 border-b-2 border-[#243147] pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-glow-indigo'
                : 'bg-[#111726] text-slate-400 border-[#243147] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CIVIC PROFILE OVERVIEW & LINKED CASE DOCKETS                       */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animation-fade-in">
          {/* Credentials Card */}
          <div className="p-5 sm:p-6 bg-[#111726] rounded-3xl border-2 border-[#243147] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-justice-400" />
              <span>Verified Account Credentials &amp; Role Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Assigned Civic Role</span>
                <p className="text-xs font-bold text-white">{currentUser.role}</p>
              </div>

              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Primary Docket ID</span>
                <p className="text-xs font-mono font-bold text-amber-300">{currentUser.primaryCaseNumber || 'COMMUNITY-MEMBER'}</p>
              </div>

              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">State Bar / Subpoena ID</span>
                <p className="text-xs font-mono font-bold text-sky-300">{currentUser.barNumber || 'VERIFIED-CITIZEN'}</p>
              </div>

              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Cryptographic Integrity</span>
                <p className="text-xs font-mono font-bold text-emerald-400">100% SHA-256 Signed</p>
              </div>
            </div>

            {currentUser.bio && (
              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f]">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Official Statement / Bio</span>
                <p className="text-xs text-slate-200 leading-relaxed">{currentUser.bio}</p>
              </div>
            )}
          </div>

          {/* Linked Cases Section */}
          <div className="p-5 sm:p-6 bg-[#111726] rounded-3xl border-2 border-[#243147] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>My Linked Active Dockets ({linkedCases.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {linkedCases.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-justice-500/60 transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-bold">
                        {c.location}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">
                        VERIFIED DOCKET
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-tight">{c.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{c.summary}</p>
                  </div>

                  <div className="pt-2 border-t border-[#1c273a] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">{c.evidenceCount || 12} Artifacts</span>
                    <button
                      onClick={() => onOpenCaseDetail(c.id)}
                      className="text-justice-400 hover:text-justice-300 font-bold flex items-center gap-1"
                    >
                      <span>Inspect Case</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SOS RAPID-RESPONSE CONTACTS                                        */}
      {/* ========================================================================= */}
      {activeTab === 'sos-contacts' && (
        <div className="space-y-5 animation-fade-in">
          <div className="p-4 bg-crimson-950/40 border border-crimson-900/60 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold uppercase text-crimson-400 tracking-wider">Automated SOS Encrypted Alert Protocol</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When you activate <strong>SOS Encounter Mode</strong>, our server immediately dispatches an automated SMS alert with your live GPS location and cloud recording stream link to these verified contacts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Contact List */}
            <div className="lg:col-span-7 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Configured Rapid-Response Contacts</h4>
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="p-4 bg-[#111726] rounded-2xl border-2 border-[#243147] flex items-center justify-between shadow-xl">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#080c14] border border-slate-700 flex items-center justify-center text-justice-400 flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-100 truncate">{contact.name}</h5>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{contact.phone} • {contact.relation}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-crimson-400 hover:bg-slate-800 transition-colors flex-shrink-0"
                    title="Remove Contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Contact Form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddContact} className="p-5 bg-[#111726] rounded-2xl border-2 border-[#243147] space-y-3 shadow-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Add New Emergency Contact</h4>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Attorney Maya Johnson"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-justice-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Phone Number (SMS Alert)</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-justice-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g. Legal Counsel, Family, Observer"
                    value={newContactRelation}
                    onChange={(e) => setNewContactRelation(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-justice-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold shadow-glow-crimson transition-all flex items-center justify-center space-x-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save Contact to SOS Matrix</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VERIFIED BADGES                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animation-fade-in">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="p-5 bg-[#111726] rounded-2xl border-2 border-[#243147] space-y-2 shadow-xl flex items-start space-x-4">
                <div className={`p-3 rounded-xl border ${b.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{b.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: RECEIPTS & PETITIONS                                               */}
      {/* ========================================================================= */}
      {activeTab === 'donations' && (
        <div className="space-y-6 animation-fade-in">
          <div className="p-5 bg-[#111726] rounded-3xl border-2 border-[#243147] space-y-3">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Sanctuary Direct-Aid Contributions (0% Fee Verified)
            </h3>
            <div className="space-y-2">
              {donationHistory.map(item => (
                <div key={item.id} className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-white block">{item.campaign}</span>
                    <span className="text-[11px] font-mono text-slate-400">{item.date} • Receipt #{item.id}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-emerald-400">{item.amount}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-[#111726] rounded-3xl border-2 border-[#243147] space-y-3">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Active Signed Petitions
            </h3>
            <div className="space-y-2">
              {signedPetitions.map(pet => (
                <div key={pet.id} className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-white block">{pet.title}</span>
                    <span className="text-[11px] font-mono text-slate-400">Signed on {pet.signedDate}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                    {pet.signatures} Verified Signers
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DETECTIVE WHITEBOARD                                               */}
      {/* ========================================================================= */}
      {activeTab === 'whiteboard' && (
        <div className="animation-fade-in w-full overflow-hidden">
          <FBIEvidenceHUD showToast={showToast} onOpenCaseDetail={onOpenCaseDetail} />
        </div>
      )}
    </div>
  );
}
