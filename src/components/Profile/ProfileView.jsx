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
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProfileView({ currentUser, setCurrentUser, showToast }) {
  const [activeTab, setActiveTab] = useState('badges');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: '1', name: 'Maya Linnea Johnson', phone: '(555) 392-8812', relation: 'Legal Observer Lead' },
    { id: '2', name: 'James Adams', phone: '(555) 441-2901', relation: 'Spouse / Emergency Next-of-Kin' }
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');

  const badges = [
    { title: 'Verified Civil Rights Organizer', desc: 'Authenticated community advocate with active civic chapter credentials.', icon: ShieldCheck, color: 'text-justice-400 bg-justice-950 border-justice-800' },
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

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-justice-500 shadow-glow"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full ring-2 ring-slate-900">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">{currentUser.name}</h2>
              <span className="text-xs bg-justice-950 text-justice-400 border border-justice-800 px-2 py-0.5 rounded-full font-semibold">
                {currentUser.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">{currentUser.role} • Member since 2024</p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">UID: JP-CIVIC-889102-SEC</p>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-center px-3 border-r border-slate-800">
            <span className="text-xs font-extrabold font-mono text-emerald-400">$325.00</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Mutual Aid</p>
          </div>
          <div className="text-center px-3 border-r border-slate-800">
            <span className="text-xs font-extrabold font-mono text-amber-400">2 Petitions</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Signed</p>
          </div>
          <div className="text-center px-3">
            <span className="text-xs font-extrabold font-mono text-justice-400">4 Badges</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Earned</p>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="border-b border-slate-800 flex space-x-4 overflow-x-auto">
        {[
          { id: 'badges', label: 'Civic Badges & Credentials' },
          { id: 'sos-contacts', label: 'SOS Emergency Contacts (SMS Dispatch)' },
          { id: 'donations', label: 'Mutual Aid Receipts (Tax Deductible)' },
          { id: 'petitions', label: 'Signed Petitions' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-justice-400 text-justice-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animation-fade-in">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 shadow-xl flex items-start space-x-4">
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

      {/* Tab 2: SOS Emergency Contacts */}
      {activeTab === 'sos-contacts' && (
        <div className="space-y-5 animation-fade-in">
          <div className="p-4 bg-crimson-950/30 border border-crimson-900/60 rounded-2xl space-y-1">
            <h4 className="text-xs font-bold uppercase text-crimson-400 tracking-wider">Automated SOS Encrypted Alert Protocol</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When you activate <strong>SOS Encounter Mode</strong>, our server immediately dispatches an automated SMS alert with your live GPS location and cloud recording stream link to these verified contacts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Contact List (7 Cols) */}
            <div className="lg:col-span-7 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Configured Rapid-Response Contacts</h4>
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-justice-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-100">{contact.name}</h5>
                      <p className="text-[11px] font-mono text-slate-400">{contact.phone} • {contact.relation}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-crimson-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Add Form (5 Cols) */}
            <form onSubmit={handleAddContact} className="lg:col-span-5 p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1">
                <PlusCircle className="w-4 h-4 text-justice-400" /> Add New Trusted Contact
              </h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Contact Name</label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Vance, Esq."
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Phone Number (SMS Enabled)</label>
                <input
                  type="tel"
                  placeholder="e.g. (555) 892-1200"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Attorney / Parent / Legal Partner"
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow transition-all"
              >
                Save Emergency Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Donations & Tax Receipts */}
      {activeTab === 'donations' && (
        <div className="space-y-4 animation-fade-in">
          <div className="p-4 bg-emerald-950/30 border border-emerald-900/60 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
            <span>
              <strong>100% Tax-Deductible Direct Support:</strong> All donations disbursed through verified 501(c)(3) family memorial trusts.
            </span>
          </div>

          <div className="space-y-3">
            {donationHistory.map(rec => (
              <div key={rec.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-justice-400">{rec.id}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                      {rec.status}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-100 mt-1">{rec.campaign}</h5>
                  <p className="text-[11px] text-slate-400">{rec.date}</p>
                </div>

                <div className="flex items-center space-x-3 sm:justify-end">
                  <span className="text-base font-extrabold font-mono text-emerald-400">{rec.amount}</span>
                  <button
                    onClick={() => showToast(`Generated and downloaded Tax Deduction Receipt for ${rec.id}!`, 'success')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Petitions */}
      {activeTab === 'petitions' && (
        <div className="space-y-3 animation-fade-in">
          {signedPetitions.map(pet => (
            <div key={pet.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
              <div>
                <h5 className="text-xs font-bold text-slate-100">{pet.title}</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Signed on {pet.signedDate} • Verified Citizen Signature</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">{pet.signatures} Total Signers</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
