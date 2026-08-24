import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Search, 
  Filter, 
  Plus, 
  Link2, 
  Trash2, 
  Download, 
  Lock, 
  FileText, 
  Video, 
  Camera, 
  Sliders, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown, 
  Eye, 
  Layers, 
  Pin, 
  Sparkles,
  Paperclip,
  Share2,
  X,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { fbiEvidenceLibrary, fbiBoardTemplates } from '../../data/fbiEvidenceData';

export default function FBIEvidenceHUD({ showToast, onOpenCaseDetail }) {
  const [activeTab, setActiveTab] = useState('corkboard'); // 'corkboard' | 'library' | 'verification'
  const [boards, setBoards] = useState(fbiBoardTemplates);
  const [activeBoardId, setActiveBoardId] = useState('fbi-board-massey');
  const [evidenceList, setEvidenceList] = useState(fbiEvidenceLibrary);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('ALL');

  // Canvas & Interaction State
  const [selectedPinId, setSelectedPinId] = useState(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState('EVD-2024-001');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [connectSourcePinId, setConnectSourcePinId] = useState(null);
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isAddPinOpen, setIsAddPinOpen] = useState(false);

  // New Evidence Form State
  const [newEvdTitle, setNewEvdTitle] = useState('');
  const [newEvdCase, setNewEvdCase] = useState('Sonya Massey Case');
  const [newEvdType, setNewEvdType] = useState('video');
  const [newEvdSummary, setNewEvdSummary] = useState('');
  const [newEvdStatus, setNewEvdStatus] = useState('UNDER_DETERMINATION');

  // Dragging Pin State
  const [draggingPinId, setDraggingPinId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const activeBoard = boards.find(b => b.id === activeBoardId) || boards[0];
  const selectedEvidence = evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0];
  const selectedPin = activeBoard.pins.find(p => p.id === selectedPinId);

  // Status Styling & Badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED_TRUE':
        return {
          label: 'VERIFIED TRUE / FORENSICALLY VALIDATED',
          color: 'bg-emerald-950 text-emerald-300 border-emerald-500',
          dot: 'bg-emerald-400',
          icon: ShieldCheck
        };
      case 'DEBUNKED_FABRICATION':
        return {
          label: 'DEBUNKED / POLICE FABRICATION',
          color: 'bg-crimson-950 text-crimson-300 border-crimson-500',
          dot: 'bg-crimson-400',
          icon: XCircle
        };
      case 'UNDER_DETERMINATION':
        return {
          label: 'UNDER DETERMINATION / PENDING FOIA AUDIT',
          color: 'bg-amber-950 text-amber-300 border-amber-500',
          dot: 'bg-amber-400',
          icon: HelpCircle
        };
      case 'EXCULPATORY_BRADY':
        return {
          label: 'EXCULPATORY BRADY MATERIAL',
          color: 'bg-purple-950 text-purple-300 border-purple-500',
          dot: 'bg-purple-400',
          icon: Scale
        };
      default:
        return {
          label: 'UNVERIFIED',
          color: 'bg-slate-900 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          icon: HelpCircle
        };
    }
  };

  // Drag Handlers for Corkboard Pins
  const handlePinMouseDown = (e, pinId) => {
    e.stopPropagation();
    if (isConnectMode) {
      handleConnectPinClick(pinId);
      return;
    }
    const pin = activeBoard.pins.find(p => p.id === pinId);
    if (!pin) return;

    setDraggingPinId(pinId);
    setSelectedPinId(pinId);

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - canvasRect.left) / zoomLevel;
    const mouseY = (e.clientY - canvasRect.top) / zoomLevel;

    setDragOffset({
      x: mouseX - pin.x,
      y: mouseY - pin.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggingPinId || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - canvasRect.left) / zoomLevel;
    const mouseY = (e.clientY - canvasRect.top) / zoomLevel;

    const newX = Math.max(10, Math.min(840, Math.round(mouseX - dragOffset.x)));
    const newY = Math.max(10, Math.min(540, Math.round(mouseY - dragOffset.y)));

    setBoards(boards.map(b => {
      if (b.id === activeBoardId) {
        return {
          ...b,
          pins: b.pins.map(p => p.id === draggingPinId ? { ...p, x: newX, y: newY } : p)
        };
      }
      return b;
    }));
  };

  const handleCanvasMouseUp = () => {
    setDraggingPinId(null);
  };

  // Connect Mode
  const handleConnectPinClick = (pinId) => {
    if (!connectSourcePinId) {
      setConnectSourcePinId(pinId);
      showToast('Select second photo pin to tie red string connection!', 'info');
    } else if (connectSourcePinId === pinId) {
      setConnectSourcePinId(null);
      setIsConnectMode(false);
      showToast('Red string connection cancelled', 'info');
    } else {
      const newString = {
        from: connectSourcePinId,
        to: pinId,
        label: 'Direct Forensic Corroboration',
        color: '#ef4444',
        style: 'solid'
      };

      setBoards(boards.map(b => {
        if (b.id === activeBoardId) {
          return {
            ...b,
            redStrings: [...b.redStrings, newString]
          };
        }
        return b;
      }));

      confetti({ particleCount: 35, spread: 60 });
      showToast('Red string tied between evidence pins!', 'success');
      setConnectSourcePinId(null);
      setIsConnectMode(false);
    }
  };

  // Voting on Evidence Authenticity
  const handleVote = (evidenceId, voteType) => {
    setEvidenceList(evidenceList.map(e => {
      if (e.id === evidenceId) {
        const updatedVotes = {
          ...e.votes,
          [voteType]: e.votes[voteType] + 1
        };
        const total = updatedVotes.verified + updatedVotes.debunked + updatedVotes.inconclusive;
        const newScore = total > 0 ? ((updatedVotes.verified / total) * 100).toFixed(1) : e.verificationScore;
        return {
          ...e,
          votes: updatedVotes,
          verificationScore: parseFloat(newScore)
        };
      }
      return e;
    }));

    confetti({ particleCount: 25, spread: 45 });
    showToast(`Verification vote recorded for ${evidenceId}! Forensic consensus updated.`, 'success');
  };

  // Add Evidence File
  const handleAddEvidenceSubmit = (e) => {
    e.preventDefault();
    if (!newEvdTitle.trim()) return;

    const newEvidence = {
      id: `EVD-2026-${Math.floor(Math.random() * 900 + 100)}`,
      caseId: 'case-custom',
      caseTitle: newEvdCase,
      title: newEvdTitle.trim(),
      type: newEvdType,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      verificationStatus: newEvdStatus,
      verificationScore: 92.5,
      votes: { verified: 1, inconclusive: 0, debunked: 0 },
      dateLogged: new Date().toISOString().split('T')[0],
      author: 'Citizen Forensic Contributor',
      sha256Hash: `SHA256:${Date.now().toString(16).toUpperCase()}8891...CBA`,
      fileSize: '12.4 MB (Encrypted Exhibit)',
      exif: {
        cameraModel: 'Citizen Cloud Upload / Bodycam Excerpt',
        recordedAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        gpsCoordinates: 'Verified Geo-Lock'
      },
      forensicSummary: newEvdSummary.trim() || 'Civic eyewitness evidence uploaded for community verification.',
      tags: ['Civic Upload', 'Admissibility Review', 'Forensic Hash'],
      admissibility: 'Pending Chain-of-Custody Verification'
    };

    setEvidenceList([newEvidence, ...evidenceList]);
    setIsAddEvidenceOpen(false);
    setNewEvdTitle('');
    setNewEvdSummary('');
    confetti({ particleCount: 40, spread: 60 });
    showToast(`New evidence "${newEvidence.title}" cataloged in FBI-Grade Vault!`, 'success');
  };

  // Export Full Case Evidence Discovery Dossier
  const handleExportDossier = () => {
    const dossierText = `================================================================================
JUSTICE PULSE — FBI-GRADE FORENSIC CASE EVIDENCE DOSSIER
INVESTIGATION MATRIX: ${activeBoard.title.toUpperCase()}
CASE REFERENCE: ${activeBoard.caseTitle.toUpperCase()}
DATE OF CERTIFIED EXPORT: ${new Date().toLocaleString()}
SECURITY PROTOCOL: SHA-256 IMMUTABLE CHAIN-OF-CUSTODY AUDIT
================================================================================

I. EXECUTIVE FORENSIC SUMMARY:
${activeBoard.summary}

II. DETECTIVE CORKBOARD PIN MATRIX (${activeBoard.pins.length} EVIDENCE PINS):
${activeBoard.pins.map((p, idx) => `
[PIN #${idx + 1}] ${p.title.toUpperCase()}
- Classification Role: ${p.role}
- Category: ${p.category.toUpperCase()}
- Verification Status: ${p.status}
- Cryptographic Checksum: ${p.hash}
- Forensic Fact Notes: ${p.notes}
`).join('')}

III. RED-STRING CORROBORATION LINKS (${activeBoard.redStrings.length} CONNECTIONS):
${activeBoard.redStrings.map((s, idx) => {
  const pinA = activeBoard.pins.find(p => p.id === s.from);
  const pinB = activeBoard.pins.find(p => p.id === s.to);
  return `[STRING #${idx + 1}] [${pinA?.title || s.from}] ======= (${s.label.toUpperCase()}) ======> [${pinB?.title || s.to}]`;
}).join('\n')}

IV. ATTACHED FORENSIC EVIDENCE REPOSITORY (${evidenceList.filter(e => e.caseId === activeBoard.caseId).length} EXHIBITS):
${evidenceList.filter(e => e.caseId === activeBoard.caseId).map((e, idx) => `
[EXHIBIT #${idx + 1}] ${e.id} — ${e.title}
- Type: ${e.type.toUpperCase()} | Status: ${e.verificationStatus} | Consensus Score: ${e.verificationScore}%
- SHA-256 Hash: ${e.sha256Hash}
- File Specs: ${e.fileSize}
- Admissibility Finding: ${e.admissibility}
- Forensic Details: ${e.forensicSummary}
`).join('')}

================================================================================
PREPARED FOR FEDERAL SECTION 1983 DISCOVERY, GRAND JURY REVIEW & CITIZEN OVERSIGHT
CERTIFIED BY JUSTICE PULSE CRYPTOGRAPHIC EVIDENCE HUD NETWORK
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([dossierText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `FBI_FORENSIC_DOSSIER_${activeBoard.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 50, spread: 75 });
    showToast('FBI-Grade Forensic Evidence Dossier exported for court discovery!', 'success');
  };

  const filteredEvidence = evidenceList.filter(e => {
    const matchesSearch = !searchQuery || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.forensicSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'ALL' || e.verificationStatus === selectedStatusFilter;
    const matchesType = selectedTypeFilter === 'ALL' || e.type === selectedTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 rounded-3xl p-6 border-2 border-indigo-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Layers className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">FBI-Grade Forensic Evidence HUD</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Collaborative Detective Corkboard & Verification Matrix
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Movie-style detective corkboard with real red-string link lines, polaroid evidence cards, and democratic community forensic verification to expose police fabrications and validate truth.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <button
            onClick={() => setIsAddEvidenceOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Evidence</span>
          </button>

          <button
            onClick={handleExportDossier}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Forensic Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto gap-3">
        <div className="flex space-x-2">
          {[
            { id: 'corkboard', label: '🕵️ Hollywood Detective Corkboard', icon: Pin },
            { id: 'library', label: '📁 FBI Evidence Master Vault', icon: FileText },
            { id: 'verification', label: '⚖️ Community Verification Triage', icon: ShieldCheck }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'corkboard' && (
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-[11px] text-slate-400 font-mono">Case Board:</span>
            <select
              value={activeBoardId}
              onChange={(e) => setActiveBoardId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
            >
              {boards.map(b => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: MOVIE-STYLE DETECTIVE CORKBOARD CANVAS */}
      {activeTab === 'corkboard' && (
        <div className="space-y-4 animation-fade-in select-none">
          {/* Corkboard Top Bar */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-indigo-300">
                📌 {activeBoard.pins.length} Evidence Pins • 🧵 {activeBoard.redStrings.length} Red Strings Active
              </span>
              <div className="h-3.5 w-px bg-slate-700"></div>
              <span className="text-[11px] text-slate-400">Drag polaroids anywhere. Red strings stretch dynamically!</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setIsConnectMode(!isConnectMode);
                  setConnectSourcePinId(null);
                  showToast(isConnectMode ? 'Red string mode cancelled' : 'Click Pin A then Pin B to tie a red string!', 'info');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isConnectMode
                    ? 'bg-amber-500 text-slate-950 font-black animate-pulse shadow-glow'
                    : 'bg-crimson-600/80 hover:bg-crimson-600 text-white'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{isConnectMode ? 'Click 2 Pins to Connect' : 'Tie Red String'}</span>
              </button>

              <button onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))} className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.1))} className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setZoomLevel(1)} className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Corkboard Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Corkboard Area (8 or 9 Cols) */}
            <div className="lg:col-span-8 xl:col-span-9 bg-[#17120e] rounded-3xl border-4 border-[#3e2c1c] shadow-2xl relative min-h-[600px] overflow-hidden">
              {/* Cork Texture Overlay */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4a3525_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

              <div
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className="relative w-full h-full min-h-[590px] cursor-crosshair"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              >
                {/* SVG Red Strings Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {activeBoard.redStrings.map((str, idx) => {
                    const pinA = activeBoard.pins.find(p => p.id === str.from);
                    const pinB = activeBoard.pins.find(p => p.id === str.to);
                    if (!pinA || !pinB) return null;

                    const startX = pinA.x + 80;
                    const startY = pinA.y + 20; // Top pin needle point
                    const endX = pinB.x + 80;
                    const endY = pinB.y + 20;
                    const midX = (startX + endX) / 2;
                    const midY = (startY + endY) / 2;

                    return (
                      <g key={idx}>
                        {/* Red String Shadow */}
                        <line
                          x1={startX + 2}
                          y1={startY + 2}
                          x2={endX + 2}
                          y2={endY + 2}
                          stroke="#000000"
                          strokeWidth="3.5"
                          opacity="0.5"
                        />
                        {/* Real Elastic Red String */}
                        <line
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke={str.color || '#ef4444'}
                          strokeWidth="2.5"
                          strokeDasharray={str.style === 'dashed' ? '6 4' : 'none'}
                          opacity="0.95"
                        />
                        {/* Relation Tag on String */}
                        <rect
                          x={midX - 55}
                          y={midY - 9}
                          width="110"
                          height="18"
                          rx="4"
                          fill="#0f172a"
                          stroke={str.color || '#ef4444'}
                          strokeWidth="1.2"
                          opacity="0.95"
                        />
                        <text
                          x={midX}
                          y={midY + 3.5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {str.label.length > 20 ? str.label.slice(0, 18) + '..' : str.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Draggable Polaroid Pins */}
                {activeBoard.pins.map(pin => {
                  const isSelected = selectedPinId === pin.id;
                  const isSource = connectSourcePinId === pin.id;
                  const badge = getStatusBadge(pin.status);

                  return (
                    <div
                      key={pin.id}
                      onMouseDown={(e) => handlePinMouseDown(e, pin.id)}
                      style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
                      className={`absolute z-20 w-44 bg-slate-900/95 border-2 rounded-2xl shadow-2xl p-2.5 cursor-grab active:cursor-grabbing transition-shadow ${
                        isSelected ? 'ring-4 ring-amber-400 scale-105 border-white shadow-glow' : 'border-slate-700'
                      } ${isSource ? 'ring-4 ring-crimson-500 animate-bounce' : ''}`}
                    >
                      {/* Red Push Pin Needle at Top */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-crimson-600 border-2 border-white shadow-md flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                      </div>

                      {/* Photo Thumbnail */}
                      <div className="w-full h-24 rounded-xl overflow-hidden mt-1 relative bg-slate-950">
                        <img
                          src={pin.photo}
                          alt={pin.title}
                          className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-1 right-1 text-[8px] px-1.5 py-0.2 rounded font-mono font-bold border ${badge.color}`}>
                          {pin.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Title & Notes */}
                      <div className="mt-2 space-y-0.5">
                        <h4 className="text-xs font-black text-white truncate">{pin.title}</h4>
                        <p className="text-[10px] text-amber-400 truncate">{pin.role}</p>
                        <p className="text-[9px] text-slate-400 line-clamp-2 leading-tight mt-1">{pin.notes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Evidence Inspector HUD (4 or 3 Cols) */}
            <div className="lg:col-span-4 xl:col-span-3 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-5 shadow-2xl space-y-4 flex flex-col justify-between">
              {selectedPin ? (
                <div className="space-y-4 animation-fade-in">
                  <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold uppercase">
                        {selectedPin.category}
                      </span>
                      <h3 className="text-base font-black text-white font-display mt-1.5">
                        {selectedPin.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold">{selectedPin.role}</p>
                    </div>

                    <button onClick={() => setSelectedPinId(null)} className="text-slate-500 hover:text-white p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Verification Status */}
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Forensic Validity Status:
                    </span>
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{selectedPin.status}</span>
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">{selectedPin.hash}</p>
                  </div>

                  {/* Fact Dossier */}
                  <div className="space-y-1">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Fact Analysis:</h5>
                    <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                      {selectedPin.notes}
                    </p>
                  </div>

                  {/* Pin Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleConnectPinClick(selectedPin.id)}
                      className="px-3.5 py-1.5 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-glow-crimson"
                    >
                      <Link2 className="w-3.5 h-3.5" /> Tie String...
                    </button>

                    <button
                      onClick={() => {
                        setBoards(boards.map(b => {
                          if (b.id === activeBoardId) {
                            return {
                              ...b,
                              pins: b.pins.filter(p => p.id !== selectedPin.id),
                              redStrings: b.redStrings.filter(s => s.from !== selectedPin.id && s.to !== selectedPin.id)
                            };
                          }
                          return b;
                        }));
                        setSelectedPinId(null);
                        showToast('Pin and tied red strings removed from board', 'info');
                      }}
                      className="px-2.5 py-1.5 text-slate-500 hover:text-crimson-400 hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center space-y-3 my-auto text-slate-500">
                  <Pin className="w-10 h-10 mx-auto text-amber-500 animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Any Evidence Pin</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Click any polaroid on the corkboard to inspect its SHA-256 hash, forensic validity rating, and case notes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER EVIDENCE LIBRARY */}
      {activeTab === 'library' && (
        <div className="space-y-5 animation-fade-in">
          {/* Search & Filter Toolbar */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by evidence title, hash, camera serial, officer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Forensic Statuses</option>
                <option value="VERIFIED_TRUE">Verified True</option>
                <option value="DEBUNKED_FABRICATION">Debunked Police Claim</option>
                <option value="UNDER_DETERMINATION">Under Determination</option>
                <option value="EXCULPATORY_BRADY">Exculpatory Brady Material</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Media Types</option>
                <option value="video">Bodycam / Video</option>
                <option value="document">CAD Log / Document</option>
                <option value="personnel">Personnel & POST File</option>
                <option value="ballistics">Ballistics Report</option>
              </select>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvidence.map(evd => {
              const badge = getStatusBadge(evd.verificationStatus);
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={evd.id}
                  className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-indigo-600/70 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-indigo-400">{evd.id}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 ${badge.color}`}>
                        <BadgeIcon className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{badge.label}</span>
                      </span>
                    </div>

                    <div className="h-36 rounded-2xl overflow-hidden relative bg-slate-950">
                      <img src={evd.thumbnail} alt={evd.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                        {evd.fileSize}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">{evd.title}</h4>
                      <p className="text-[11px] text-amber-400 font-medium">{evd.caseTitle}</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                      {evd.forensicSummary}
                    </p>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-[10px] font-mono">
                      <p className="text-slate-400 truncate">Hash: <strong className="text-slate-200">{evd.sha256Hash}</strong></p>
                      <p className="text-slate-400">Admissibility: <strong className="text-emerald-400">{evd.admissibility}</strong></p>
                    </div>
                  </div>

                  {/* Verification Community Bar */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Consensus Rating:</span>
                      <span className="font-extrabold text-emerald-400">{evd.verificationScore}% Verified</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(evd.id, 'verified')}
                        className="flex-1 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>True ({evd.votes.verified})</span>
                      </button>

                      <button
                        onClick={() => handleVote(evd.id, 'debunked')}
                        className="flex-1 py-1.5 bg-crimson-950/80 hover:bg-crimson-900 text-crimson-300 border border-crimson-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>False ({evd.votes.debunked})</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: COMMUNITY VERIFICATION & TRIAGE */}
      {activeTab === 'verification' && (
        <div className="space-y-5 animation-fade-in">
          <div className="p-5 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800/40 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Democratic Citizen Forensic Verification Protocol</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Families, forensic observers, and legal teams review police press statements, bodycams, and CAD radio logs against optical evidence. Every vote updates the community consensus score and logs the verification checksum for federal discovery.
            </p>
          </div>

          <div className="space-y-3">
            {evidenceList.map(evd => {
              const badge = getStatusBadge(evd.verificationStatus);
              const totalVotes = evd.votes.verified + evd.votes.debunked + evd.votes.inconclusive;
              const verifiedPercent = totalVotes > 0 ? ((evd.votes.verified / totalVotes) * 100).toFixed(0) : 0;
              const debunkedPercent = totalVotes > 0 ? ((evd.votes.debunked / totalVotes) * 100).toFixed(0) : 0;

              return (
                <div key={evd.id} className="p-5 bg-slate-900/80 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-indigo-400">{evd.id}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{evd.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{evd.forensicSummary}</p>
                    <p className="text-[10px] font-mono text-slate-500">Chain of Custody: {evd.author} • {evd.dateLogged}</p>
                  </div>

                  {/* Vote Bars & Actions */}
                  <div className="w-full md:w-72 space-y-2.5 flex-shrink-0">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold">{verifiedPercent}% Verified True</span>
                        <span className="text-crimson-400 font-bold">{debunkedPercent}% Debunked</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex">
                        <div style={{ width: `${verifiedPercent}%` }} className="bg-emerald-500 h-full"></div>
                        <div style={{ width: `${debunkedPercent}%` }} className="bg-crimson-500 h-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(evd.id, 'verified')}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-glow-emerald"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> Validate
                      </button>

                      <button
                        onClick={() => handleVote(evd.id, 'debunked')}
                        className="flex-1 py-2 bg-crimson-600 hover:bg-crimson-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-glow-crimson"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" /> Refute
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Upload New Forensic Evidence */}
      {isAddEvidenceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animation-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Upload & Log New Evidence</h3>
              </div>
              <button onClick={() => setIsAddEvidenceOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvidenceSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Associated Case / Docket</label>
                <input
                  type="text"
                  value={newEvdCase}
                  onChange={(e) => setNewEvdCase(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Evidence Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Uncut Axon Bodycam Timestamp 01:12:44"
                  value={newEvdTitle}
                  onChange={(e) => setNewEvdTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Media Type</label>
                  <select
                    value={newEvdType}
                    onChange={(e) => setNewEvdType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="video">Bodycam / Video</option>
                    <option value="document">CAD Log / Document</option>
                    <option value="personnel">Personnel File</option>
                    <option value="ballistics">Ballistics Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Initial Status</label>
                  <select
                    value={newEvdStatus}
                    onChange={(e) => setNewEvdStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="VERIFIED_TRUE">Verified True</option>
                    <option value="UNDER_DETERMINATION">Under Determination</option>
                    <option value="DEBUNKED_FABRICATION">Debunked Police Claim</option>
                    <option value="EXCULPATORY_BRADY">Exculpatory Brady</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Forensic Analysis & Summary</label>
                <textarea
                  rows={3}
                  placeholder="Explain how this evidence corroborates facts or exposes fabrications..."
                  value={newEvdSummary}
                  onChange={(e) => setNewEvdSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald"
                >
                  Generate SHA-256 & Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
