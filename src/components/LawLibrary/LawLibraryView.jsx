import React, { useState } from 'react';
import { 
  Scale, 
  BookOpen, 
  Search, 
  FileText, 
  ExternalLink, 
  Download, 
  Copy, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { landmarkPrecedents, legalGlossary } from '../../data/lawLibraryData';

export default function LawLibraryView({ showToast }) {
  const [search, setSearch] = useState('');
  const [selectedCase, setSelectedCase] = useState(landmarkPrecedents[0]);
  const [activeSubTab, setActiveSubTab] = useState('precedents');

  const filteredCases = landmarkPrecedents.filter(c => 
    !search || 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.topic.toLowerCase().includes(search.toLowerCase()) ||
    c.plainEnglish.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGlossary = legalGlossary.filter(g =>
    !search ||
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.def.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadBriefTemplate = (title) => {
    confetti({ particleCount: 40, spread: 60 });
    showToast(`Standard Civil Rights § 1983 Brief Template for ${title} downloaded!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-justice-950/70 to-slate-900 rounded-2xl p-6 border border-justice-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-justice-400 mb-1">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Supreme Court & Federal Case Law Archive</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Civil Rights Law Library & Section 1983 Doctrine Repository
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Search landmark Fourth Amendment, Fourteenth Amendment, and municipal liability precedent governing police excessive force, unlawful searches, and Qualified Immunity exceptions.
        </p>
      </div>

      {/* Sub-Tabs & Search Toolbar */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab('precedents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'precedents'
                ? 'bg-justice-600 text-white shadow-glow'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Landmark Precedents ({landmarkPrecedents.length})
          </button>
          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'glossary'
                ? 'bg-justice-600 text-white shadow-glow'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Legal Terms & Glossary ({legalGlossary.length})
          </button>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rulings, citations, or legal terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-justice-500"
          />
        </div>
      </div>

      {/* View 1: Landmark Precedents */}
      {activeSubTab === 'precedents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animation-fade-in">
          {/* Left Case List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {filteredCases.map(c => {
              const isSelected = selectedCase.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-900 border-justice-500 shadow-glow'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-justice-400 font-bold">{c.citation}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.2 rounded font-mono">{c.court}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 leading-snug">{c.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{c.topic}</p>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Case Breakdown (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-justice-400">
                  <Scale className="w-4 h-4" />
                  <span>{selectedCase.citation} • {selectedCase.court}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mt-1">{selectedCase.title}</h3>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">{selectedCase.topic}</p>
              </div>

              {/* Supreme Court Ruling */}
              <div className="space-y-1.5">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Holding / Ruling</h5>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px]">
                  "{selectedCase.keyRuling}"
                </p>
              </div>

              {/* Plain English Translation */}
              <div className="p-4 bg-justice-950/30 rounded-2xl border border-justice-800/60 space-y-1 text-xs">
                <h5 className="font-bold text-justice-300 uppercase tracking-wider text-[11px]">Plain-English Civil Rights Meaning:</h5>
                <p className="text-slate-200 leading-relaxed">{selectedCase.plainEnglish}</p>
              </div>

              {/* Litigation Tactics */}
              <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/60 space-y-1 text-xs">
                <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Litigation & Community Evidence Strategy:</h5>
                <p className="text-slate-200 leading-relaxed">{selectedCase.actionableTips}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`${selectedCase.title} (${selectedCase.citation}): ${selectedCase.keyRuling}`);
                  showToast('Case holding copied to clipboard for legal brief drafting!', 'success');
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Case Citation
              </button>

              <button
                onClick={() => handleDownloadBriefTemplate(selectedCase.title)}
                className="px-4 py-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Brief Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Legal Glossary */}
      {activeSubTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animation-fade-in">
          {filteredGlossary.map((item, idx) => (
            <div key={idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <div className="flex items-center space-x-2 text-justice-400">
                <HelpCircle className="w-4 h-4" />
                <h4 className="text-sm font-bold text-white">{item.term}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.def}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
