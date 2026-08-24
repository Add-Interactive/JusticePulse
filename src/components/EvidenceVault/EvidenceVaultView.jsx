import React, { useState } from 'react';
import { 
  FolderLock, 
  FileCheck2, 
  Lock, 
  Video, 
  FileText, 
  Search, 
  ExternalLink, 
  Download, 
  CheckCircle, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function EvidenceVaultView({ showToast }) {
  const [search, setSearch] = useState('');

  const evidenceRecords = [
    {
      id: 'EV-2024-8812',
      title: 'Sangamon County Deputy Sean Grayson Bodycam (Uncut 14m 32s)',
      caseTitle: 'Sonya Massey Shooting',
      fileType: 'MP4 / H.264',
      size: '2.4 GB',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      foiaStatus: 'Fulfilled / Publicly Released',
      chainOfCustody: 'Illinois State Police Public Records Division',
      verificationDate: '2024-07-22'
    },
    {
      id: 'EV-2023-1049',
      title: 'City of Memphis SCORPION Unit Pole Camera #4 Angle',
      caseTitle: 'Tyre Nichols Excessive Force Case',
      fileType: 'MP4 / 4K UHD',
      size: '4.8 GB',
      sha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
      foiaStatus: 'Fulfilled / Federal Exhibit #12',
      chainOfCustody: 'Western District of Tennessee Federal Court',
      verificationDate: '2023-01-27'
    },
    {
      id: 'EV-2022-0941',
      title: 'Louisville LMPD Search Warrant Affidavit & Garage Meeting Audio',
      caseTitle: 'Breonna Taylor Investigation',
      fileType: 'PDF / OCR Searchable',
      size: '42 MB',
      sha256: 'c7be0c58f000b217a941a80ef0a9bebeeead932e6fcb0bf435df2b6b5ecda493',
      foiaStatus: 'DOJ Special Counsel Release',
      chainOfCustody: 'Department of Justice Civil Rights Division',
      verificationDate: '2022-08-04'
    },
    {
      id: 'EV-2025-0104',
      title: 'Harris County HCSO Cruiser Dashcam & Recovered Facebook Stream',
      caseTitle: 'Marcus Delgado Incident',
      fileType: 'MP4 Cloud Dual Stream',
      size: '1.1 GB',
      sha256: 'd5fe8011c79a957a07c1b5a2bf83f6055d78a9c8b74681122a27891147a46fa7',
      foiaStatus: 'Pending FOIA Appeals Board Review',
      chainOfCustody: 'Civil Rights Coalition of Texas Vault',
      verificationDate: '2025-01-15'
    }
  ];

  const filtered = evidenceRecords.filter(rec => 
    !search || 
    rec.title.toLowerCase().includes(search.toLowerCase()) || 
    rec.caseTitle.toLowerCase().includes(search.toLowerCase()) ||
    rec.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-2 text-justice-400 mb-1">
          <FolderLock className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Cryptographic Evidence Locker</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Chain-of-Custody Digital Vault & FOIA Log
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Tamper-proof storage for video, audio, police radio transmissions, and internal affairs documents. Every file is indexed with immutable SHA-256 cryptographic hashes for courtroom admissibility.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Evidence ID, case name, or file type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-justice-500"
          />
        </div>
      </div>

      {/* Evidence Cards */}
      <div className="space-y-3">
        {filtered.map(rec => (
          <div key={rec.id} className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-justice-950 border border-justice-800 flex items-center justify-center text-justice-400 flex-shrink-0">
                  {rec.fileType.includes('MP4') ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-justice-400">{rec.id}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">{rec.fileType}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                      {rec.foiaStatus}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">{rec.title}</h4>
                  <p className="text-xs text-slate-400">Associated Docket: <strong>{rec.caseTitle}</strong></p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => showToast(`Downloading verified archive for ${rec.id}...`, 'info')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download Archive
                </button>
              </div>
            </div>

            {/* Cryptographic Hash Details */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] font-mono space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1 text-slate-500">
                  <Lock className="w-3 h-3 text-justice-400" /> SHA-256 Checksum:
                </span>
                <span className="text-slate-500">Custodian: {rec.chainOfCustody}</span>
              </div>
              <p className="text-justice-300 truncate selection:bg-justice-500 selection:text-white">
                {rec.sha256}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
