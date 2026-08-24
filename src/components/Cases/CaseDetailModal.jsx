import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  DollarSign, 
  Video, 
  FileText, 
  HeartHandshake, 
  CheckCircle2, 
  Send, 
  Share2, 
  ExternalLink,
  Lock,
  Flame,
  AlertTriangle,
  FileSpreadsheet,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CourtroomExportModal from '../Discovery/CourtroomExportModal';

export default function CaseDetailModal({ 
  caseData, 
  onClose, 
  onOpenDonateModal, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [petitionSigned, setPetitionSigned] = useState(false);
  const [signatures, setSignatures] = useState(caseData?.petitionSignatures || 10000);
  const [daLetterCopied, setDaLetterCopied] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  if (!caseData) return null;

  const handleSignPetition = () => {
    if (!petitionSigned) {
      setPetitionSigned(true);
      setSignatures(prev => prev + 1);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 }
      });
      showToast('Thank you! Your verified signature has been added to the formal petition docket.', 'success');
    }
  };

  const handleCopyDALetter = () => {
    const letter = `Subject: Formal Demand for Independent Prosecution & Civil Rights Accountability - Re: ${caseData.victim} (${caseData.jurisdiction})\n\nTo the Office of the District Attorney / Department of Justice Civil Rights Division,\n\nI am writing as a concerned citizen and community member to demand full, transparent, and uncompromised accountability regarding the incident involving ${caseData.victim} on ${caseData.date} by officers of the ${caseData.jurisdiction}.\n\nDocumented public evidence demonstrates:\n- ${caseData.keyInjustices.join('\n- ')}\n\nWe demand that Qualified Immunity not be used to shield unlawful force, that Brady material be immediately disclosed, and that an independent special prosecutor oversee all proceedings.\n\nRespectfully submitted,\nCitizen Coalition for Equal Justice`;
    
    navigator.clipboard?.writeText(letter);
    setDaLetterCopied(true);
    showToast('Petition Letter to District Attorney copied to clipboard!', 'success');
    setTimeout(() => setDaLetterCopied(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header Banner */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 flex-wrap mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-justice-950 text-justice-400 border border-justice-800">
                {caseData.status}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-crimson-950 text-crimson-300 border border-crimson-800/60">
                QI: {caseData.qualifiedImmunity}
              </span>
              {caseData.bodycamAvailable && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                  <Video className="w-3 h-3" /> Bodycam Logged
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {caseData.title}
            </h2>
            <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1 text-slate-300 font-semibold">
                <Scale className="w-3.5 h-3.5 text-justice-400" /> Victim: {caseData.victim} ({caseData.age} yrs)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-crimson-400" /> {caseData.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> {caseData.date}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3 py-1.5 bg-justice-600/80 hover:bg-justice-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-glow transition-all"
              title="Export Courtroom Preliminary Discovery Packet"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discovery Brief</span>
            </button>

            <button 
              onClick={onClose} 
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Inside Modal */}
        <div className="px-5 border-b border-slate-800 bg-slate-950/60 flex space-x-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Case Overview & Injustices' },
            { id: 'officers', label: 'Officers Involved & Record' },
            { id: 'timeline', label: 'Incident Timeline' },
            { id: 'action', label: 'Petition & Legal Action' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-justice-400 text-justice-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animation-fade-in">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Fact Summary</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {caseData.summary}
                </p>
              </div>

              {/* Documented Injustices Callout */}
              <div className="bg-crimson-950/30 border border-crimson-900/60 rounded-2xl p-4 space-y-3">
                <div className="flex items-center space-x-2 text-crimson-400">
                  <ShieldAlert className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Documented Systemic Injustices & Failures</h4>
                </div>
                <ul className="space-y-2">
                  {caseData.keyInjustices.map((inj, idx) => (
                    <li key={idx} className="text-xs text-slate-200 flex items-start space-x-2">
                      <span className="text-crimson-400 font-bold mt-0.5">•</span>
                      <span className="leading-normal">{inj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Settlement & Financial Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Civil Settlement Status</span>
                  <p className="text-base font-extrabold font-mono text-emerald-400">{caseData.settlementAmount}</p>
                  <p className="text-[11px] text-slate-400">Lead Counsel: {caseData.attorney}</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Taxpayer Cost Allocation</span>
                  <p className="text-xs font-medium text-slate-300">{caseData.taxpayerCost}</p>
                  <p className="text-[11px] text-amber-400/90 font-mono">Paid via Municipal General Fund</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Officers Dossier */}
          {activeTab === 'officers' && (
            <div className="space-y-4 animation-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Personnel & Misconduct Record ({caseData.officersInvolved.length} Officers)
                </h4>
                <span className="text-[11px] text-justice-400 font-mono">Cross-Referenced with Brady List</span>
              </div>

              <div className="space-y-3">
                {caseData.officersInvolved.map((off, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-white">{off.name}</span>
                        <span className="text-xs text-slate-400 font-mono">({off.badge})</span>
                      </div>
                      {off.repeatOffender && (
                        <span className="text-[10px] bg-crimson-950 text-crimson-300 px-2 py-0.5 rounded-full border border-crimson-800 font-bold uppercase">
                          Repeat Offender Flag
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">
                      <span className="font-semibold text-slate-400">Current Legal Status:</span> {off.status}
                    </p>
                    {off.priorIncidents && (
                      <div className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-900/50">
                        <span className="font-bold">Prior Undisclosed / Bypassed History:</span> {off.priorIncidents}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 animation-fade-in">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Chronology of Events</h4>
              <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                {caseData.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-justice-500 ring-4 ring-slate-900"></div>
                    <div className="text-[11px] font-mono text-justice-400 font-semibold">{item.date}</div>
                    <h5 className="text-sm font-bold text-slate-100 mt-0.5">{item.title}</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Petition & Action */}
          {activeTab === 'action' && (
            <div className="space-y-5 animation-fade-in">
              {/* Petition Box */}
              <div className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 rounded-2xl border border-amber-800/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Flame className="w-5 h-5 fill-amber-400" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                      National Petition: Ban Repeat Misconduct Hiring
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {signatures.toLocaleString()} Signed
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Join over {signatures.toLocaleString()} citizens demanding federal legislation for mandatory decertification tracking, criminal accountability for screening bypasses, and an end to Qualified Immunity.
                </p>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSignPetition}
                    disabled={petitionSigned}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-glow flex items-center space-x-2 ${
                      petitionSigned 
                        ? 'bg-emerald-600 text-white cursor-default' 
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{petitionSigned ? 'Signed & Verified' : 'Sign This Petition Now'}</span>
                  </button>

                  <button
                    onClick={handleCopyDALetter}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-justice-400" />
                    <span>{daLetterCopied ? 'DA Letter Copied!' : 'Copy Letter to District Attorney'}</span>
                  </button>
                </div>
              </div>

              {/* Mutual Aid Card */}
              <div className="p-5 bg-emerald-950/30 rounded-2xl border border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <HeartHandshake className="w-5 h-5" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                      Direct Family Sanctuary & Education Fund
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    ${caseData.familyFundRaised.toLocaleString()} Raised
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Support the surviving family members with direct counseling, housing stability, and college trusts with 0% platform take rates.
                </p>
                <button
                  onClick={() => onOpenDonateModal({
                    title: `${caseData.victim} Memorial & Family Trust`,
                    beneficiary: `Family of ${caseData.victim}`,
                    target: caseData.familyFundGoal,
                    raised: caseData.familyFundRaised
                  })}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald transition-all"
                >
                  Make Direct Tax-Deductible Contribution
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-justice-400" />
            <span className="font-mono text-[11px]">Docket ID: #{caseData.id.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-justice-950 border border-justice-800 text-justice-300 hover:bg-justice-900 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Courtroom Discovery Brief
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Close Docket
            </button>
          </div>
        </div>
      </div>

      {/* Discovery Packet Modal */}
      <CourtroomExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        caseData={caseData}
        showToast={showToast}
      />
    </div>
  );
}
