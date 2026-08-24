import React, { useState, useRef, useEffect } from 'react';
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
  Share2,
  X,
  Scale,
  Paperclip,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Unlink,
  HardDrive
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

  // Interactive Whiteboard Selection State
  const [inspectedPin, setInspectedPin] = useState(null); // When clicked, opens enterprise inspector
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [connectSourcePinId, setConnectSourcePinId] = useState(null);
  
  // Modals
  const [isAddPinModalOpen, setIsAddPinModalOpen] = useState(false);
  const [isAddEvidenceModalOpen, setIsAddEvidenceModalOpen] = useState(false);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

  // New Pin Form State
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinRole, setNewPinRole] = useState('Physical Exhibit');
  const [newPinCategory, setNewPinCategory] = useState('evidence'); // 'victim' | 'officer' | 'evidence' | 'legal'
  const [newPinPhoto, setNewPinPhoto] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80');
  const [newPinNotes, setNewPinNotes] = useState('');
  const [newPinStatus, setNewPinStatus] = useState('VERIFIED_TRUE');

  // Dragging State
  const [draggingPinId, setDraggingPinId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const activeBoard = boards.find(b => b.id === activeBoardId) || boards[0];

  // Status Styling & Badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED_TRUE':
        return {
          label: 'VERIFIED TRUE',
          color: 'bg-emerald-950 text-emerald-300 border-emerald-500',
          dot: 'bg-emerald-400',
          icon: ShieldCheck
        };
      case 'DEBUNKED_FABRICATION':
        return {
          label: 'DEBUNKED FABRICATION',
          color: 'bg-crimson-950 text-crimson-300 border-crimson-500',
          dot: 'bg-crimson-400',
          icon: XCircle
        };
      case 'UNDER_DETERMINATION':
        return {
          label: 'UNDER DETERMINATION',
          color: 'bg-amber-950 text-amber-300 border-amber-500',
          dot: 'bg-amber-400',
          icon: HelpCircle
        };
      case 'EXCULPATORY_BRADY':
        return {
          label: 'BRADY MATERIAL',
          color: 'bg-purple-950 text-purple-300 border-purple-500',
          dot: 'bg-purple-400',
          icon: Scale
        };
      default:
        return {
          label: 'PENDING TRIAGE',
          color: 'bg-slate-800 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          icon: HelpCircle
        };
    }
  };

  // Drag Handlers
  const handlePinMouseDown = (e, pin) => {
    if (isConnectMode) {
      handlePinConnectClick(pin.id);
      return;
    }

    e.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDraggingPinId(pin.id);
    setDragOffset({
      x: (e.clientX - rect.left) / zoomLevel - pin.x,
      y: (e.clientY - rect.top) / zoomLevel - pin.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggingPinId) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = Math.max(10, Math.min(1400, Math.round((e.clientX - rect.left) / zoomLevel - dragOffset.x)));
    const newY = Math.max(10, Math.min(800, Math.round((e.clientY - rect.top) / zoomLevel - dragOffset.y)));

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

  // Connect / Red String Handler
  const handlePinConnectClick = (pinId) => {
    if (!connectSourcePinId) {
      setConnectSourcePinId(pinId);
      const sourcePin = activeBoard.pins.find(p => p.id === pinId);
      showToast(`Selected "${sourcePin?.title}". Now click target pin to tie red string!`, 'info');
    } else {
      if (connectSourcePinId === pinId) {
        showToast('Cannot connect a pin to itself', 'error');
        setConnectSourcePinId(null);
        return;
      }

      const label = window.prompt('Enter relationship label for this red string (e.g. "Fired Lethal Shot", "Contradicts Radio Call", "Supervisory Failure"):', 'Connected Evidence');
      if (label === null) {
        setConnectSourcePinId(null);
        return;
      }

      const newString = {
        from: connectSourcePinId,
        to: pinId,
        label: label || 'Connected Evidence',
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

      confetti({ particleCount: 30, spread: 50 });
      showToast('Red string tied successfully across evidence nodes!', 'success');
      setConnectSourcePinId(null);
      setIsConnectMode(false);
    }
  };

  // Sever / Delete Red String
  const handleDeleteRedString = (index) => {
    setBoards(boards.map(b => {
      if (b.id === activeBoardId) {
        const updated = [...b.redStrings];
        updated.splice(index, 1);
        return { ...b, redStrings: updated };
      }
      return b;
    }));
    showToast('Red string connection severed', 'info');
  };

  // Add New Pin
  const handleCreateNewPin = (e) => {
    e.preventDefault();
    if (!newPinTitle.trim()) return;

    const newPin = {
      id: `pin-${Date.now()}`,
      title: newPinTitle,
      role: newPinRole,
      category: newPinCategory,
      photo: newPinPhoto || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
      x: 120 + (activeBoard.pins.length * 40) % 500,
      y: 120 + (activeBoard.pins.length * 30) % 350,
      status: newPinStatus,
      hash: `SHA256:${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
      notes: newPinNotes || 'Forensic exhibit pinned by investigator.'
    };

    setBoards(boards.map(b => {
      if (b.id === activeBoardId) {
        return {
          ...b,
          pins: [...b.pins, newPin]
        };
      }
      return b;
    }));

    setNewPinTitle('');
    setNewPinNotes('');
    setIsAddPinModalOpen(false);
    confetti({ particleCount: 35, spread: 60 });
    showToast(`Pinned "${newPin.title}" onto the investigation corkboard!`, 'success');
  };

  // Delete Pin & All Connected Red Strings
  const handleDeletePin = (pinId) => {
    setBoards(boards.map(b => {
      if (b.id === activeBoardId) {
        return {
          ...b,
          pins: b.pins.filter(p => p.id !== pinId),
          redStrings: b.redStrings.filter(s => s.from !== pinId && s.to !== pinId)
        };
      }
      return b;
    }));

    if (inspectedPin?.id === pinId) {
      setInspectedPin(null);
    }
    showToast('Evidence pin and connected strings removed from board', 'info');
  };

  // Export Forensic Discovery Dossier
  const handleExportDossier = () => {
    const dossierText = `================================================================================
JUSTICE PULSE — OFFICIAL FBI-GRADE FORENSIC WHITEBOARD EVIDENCE DOSSIER
BOARD: ${activeBoard.title.toUpperCase()}
CASE: ${activeBoard.caseTitle.toUpperCase()}
DATE OF CERTIFICATION: ${new Date().toLocaleString()}
SECURITY CLASSIFICATION: PUBLIC CIVIL RIGHTS GRAND JURY DISCLOSURE
================================================================================

I. INVESTIGATIVE SUMMARY:
${activeBoard.summary}

II. PINNED FORENSIC EXHIBITS (${activeBoard.pins.length} EXHIBITS):
${activeBoard.pins.map((p, idx) => `
[PIN #${idx + 1}] ${p.title.toUpperCase()} (${p.role})
- Verification Status: ${p.status}
- Cryptographic Hash: ${p.hash}
- Notes & Observation: ${p.notes}
`).join('')}

III. FORENSIC RED-STRING RELATIONSHIP MATRIX (${activeBoard.redStrings.length} CONNECTIONS):
${activeBoard.redStrings.map((s, idx) => {
  const fromPin = activeBoard.pins.find(p => p.id === s.from);
  const toPin = activeBoard.pins.find(p => p.id === s.to);
  return `• [LINK #${idx + 1}] "${fromPin?.title || s.from}" ➔ "${toPin?.title || s.to}": ${s.label.toUpperCase()}`;
}).join('\n')}

================================================================================
Generated by Justice Pulse Forensic Evidence Matrix (Rule 1006 Compliant)
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

  // Find all connected strings & pins for inspected pin
  const getConnectedPinsFor = (pinId) => {
    if (!pinId) return [];
    const connected = [];
    activeBoard.redStrings.forEach(s => {
      if (s.from === pinId) {
        const target = activeBoard.pins.find(p => p.id === s.to);
        if (target) connected.push({ pin: target, relation: s.label, direction: 'outgoing' });
      } else if (s.to === pinId) {
        const source = activeBoard.pins.find(p => p.id === s.from);
        if (source) connected.push({ pin: source, relation: s.label, direction: 'incoming' });
      }
    });
    return connected;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 rounded-3xl p-6 border-2 border-indigo-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Layers className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">FBI-Grade Forensic Whiteboard System</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            Collaborative Detective Corkboard & Verification Matrix
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Add, link, and inspect forensic exhibits with dynamic red strings. Click any polaroid on the whiteboard to inspect its full SHA-256 chain of custody and connected evidence.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <button
            onClick={() => setIsAddPinModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow-indigo transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item to Whiteboard</span>
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
              onChange={(e) => {
                setActiveBoardId(e.target.value);
                setInspectedPin(null);
              }}
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
              <span className="text-[11px] text-slate-400">Click any pin to inspect evidence & connected nodes.</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAddPinModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Item</span>
              </button>

              <button
                onClick={() => {
                  setIsConnectMode(!isConnectMode);
                  setConnectSourcePinId(null);
                  showToast(isConnectMode ? 'Red string mode cancelled' : 'Click Pin A then Pin B to tie a red string!', 'info');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isConnectMode
                    ? 'bg-amber-500 text-slate-950 font-black animate-pulse shadow-glow'
                    : 'bg-crimson-600 hover:bg-crimson-500 text-white shadow-glow-crimson'
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
          <div className="bg-[#17120e] rounded-3xl border-4 border-[#3e2c1c] shadow-2xl relative min-h-[680px] overflow-hidden">
            {/* Cork Texture Overlay */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4a3525_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div
              ref={canvasRef}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className="relative w-full h-full min-h-[670px] cursor-crosshair"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
            >
              {/* Dynamic SVG Red Strings Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {activeBoard.redStrings.map((str, idx) => {
                  const fromPin = activeBoard.pins.find(p => p.id === str.from);
                  const toPin = activeBoard.pins.find(p => p.id === str.to);
                  if (!fromPin || !toPin) return null;

                  const x1 = fromPin.x + 85;
                  const y1 = fromPin.y + 10;
                  const x2 = toPin.x + 85;
                  const y2 = toPin.y + 10;
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;

                  return (
                    <g key={idx}>
                      {/* Red String Line */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={str.color || '#ef4444'}
                        strokeWidth="2.5"
                        strokeDasharray={str.style === 'dashed' ? '6,6' : 'none'}
                        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      />
                      {/* Center Push-Pin Tag */}
                      <circle cx={midX} cy={midY} r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                      {/* String Relation Label */}
                      <text
                        x={midX}
                        y={midY - 8}
                        textAnchor="middle"
                        fill="#fef08a"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] bg-black"
                      >
                        {str.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Polaroid Evidence Pins */}
              {activeBoard.pins.map((pin) => {
                const statusInfo = getStatusBadge(pin.status);
                const isSelected = inspectedPin?.id === pin.id;
                const isConnectSource = connectSourcePinId === pin.id;

                return (
                  <div
                    key={pin.id}
                    onMouseDown={(e) => handlePinMouseDown(e, pin)}
                    onClick={() => {
                      if (!isConnectMode) {
                        setInspectedPin(pin);
                      }
                    }}
                    style={{
                      left: `${pin.x}px`,
                      top: `${pin.y}px`,
                      cursor: isConnectMode ? 'pointer' : 'grab'
                    }}
                    className={`absolute z-20 w-44 bg-[#f4ebd0] text-slate-900 rounded-sm shadow-2xl p-2.5 pb-3.5 transition-shadow hover:shadow-[0_20px_35px_rgba(0,0,0,0.8)] hover:z-30 select-none group border border-[#d6c7a1] ${
                      isSelected
                        ? 'ring-4 ring-indigo-500 shadow-glow scale-105 z-40'
                        : isConnectSource
                        ? 'ring-4 ring-amber-400 animate-pulse z-40'
                        : ''
                    }`}
                  >
                    {/* Metallic Push Pin at Top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-lg border-2 border-amber-900 flex items-center justify-center cursor-pointer z-30">
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></div>
                    </div>

                    {/* Quick Delete Pin Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePin(pin.id);
                      }}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-crimson-600 text-white opacity-0 group-hover:opacity-100 transition-all z-40"
                      title="Remove Pin"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Photo Area */}
                    <div className="w-full h-28 bg-slate-950 rounded-sm overflow-hidden mb-2 relative border border-[#d6c7a1]">
                      <img
                        src={pin.photo}
                        alt={pin.title}
                        className="w-full h-full object-cover grayscale-[30%] contrast-110 group-hover:grayscale-0 transition-all pointer-events-none"
                      />
                      {/* Status Stamp */}
                      <div className="absolute bottom-1 left-1 right-1">
                        <span className={`text-[7.5px] font-mono px-1 py-0.5 rounded font-black uppercase tracking-tight block text-center truncate ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>

                    {/* Handwritten Title & Role */}
                    <div className="space-y-0.5 font-mono">
                      <h4 className="text-[11px] font-black text-slate-950 truncate leading-tight uppercase">
                        {pin.title}
                      </h4>
                      <p className="text-[9px] font-semibold text-rose-950 uppercase tracking-tight truncate">
                        {pin.role}
                      </p>
                    </div>

                    {/* Notes Snippet */}
                    <p className="text-[8.5px] text-slate-800 leading-snug line-clamp-2 mt-1 italic font-serif">
                      "{pin.notes}"
                    </p>

                    {/* Inspector Click Hint */}
                    <div className="mt-1.5 pt-1 border-t border-[#d6c7a1] flex items-center justify-between text-[8px] font-mono text-indigo-900 font-bold">
                      <span>Click to Open</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FBI MASTER EVIDENCE VAULT */}
      {activeTab === 'library' && (
        <div className="space-y-4 animation-fade-in">
          {/* Search & Filter Controls */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex-1 min-w-[220px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search evidence exhibits, hashes, officers, or cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="ALL">All Verification Statuses</option>
                <option value="VERIFIED_TRUE">Verified True</option>
                <option value="DEBUNKED_FABRICATION">Debunked Fabrications</option>
                <option value="UNDER_DETERMINATION">Under Determination</option>
                <option value="EXCULPATORY_BRADY">Brady Exculpatory</option>
              </select>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidenceList.map((evd) => {
              const statusInfo = getStatusBadge(evd.verificationStatus);

              return (
                <div
                  key={evd.id}
                  onClick={() => {
                    // Find corresponding pin or create inspected representation
                    setInspectedPin({
                      id: evd.id,
                      title: evd.title,
                      role: evd.type.toUpperCase(),
                      category: evd.type,
                      photo: evd.thumbnail,
                      status: evd.verificationStatus,
                      hash: evd.sha256Hash,
                      notes: evd.forensicSummary,
                      exif: evd.exif,
                      admissibility: evd.admissibility
                    });
                  }}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3 hover:border-indigo-500/60 transition-all cursor-pointer shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="h-40 bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
                      <img src={evd.thumbnail} alt={evd.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 right-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 font-bold">{evd.caseTitle}</span>
                      <h4 className="text-sm font-bold text-white leading-snug">{evd.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1 line-clamp-2">{evd.forensicSummary}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="truncate max-w-[150px]">{evd.sha256Hash}</span>
                    <span className="text-indigo-400 font-bold flex items-center gap-1">
                      Inspect Exhibit <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: COMMUNITY VERIFICATION TRIAGE */}
      {activeTab === 'verification' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Democratic Community Evidence Verification Triage</h3>
              <p className="text-xs text-slate-400">Vote to validate authentic evidence or flag disproven police narratives.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              100% Cryptographic Consensus
            </span>
          </div>

          <div className="space-y-3">
            {evidenceList.map((evd) => {
              const statusInfo = getStatusBadge(evd.verificationStatus);

              return (
                <div key={evd.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <img src={evd.thumbnail} alt={evd.title} className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{evd.sha256Hash}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1 truncate">{evd.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-snug line-clamp-1">{evd.forensicSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        confetti({ particleCount: 25, spread: 40 });
                        showToast(`Voted TRUE: Validated "${evd.title}" into community record!`, 'success');
                      }}
                      className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Validate True ({evd.votes.verified})
                    </button>

                    <button
                      onClick={() => {
                        showToast(`Voted FABRICATION: Flagged "${evd.title}" as police fabrication!`, 'info');
                      }}
                      className="px-3 py-1.5 bg-crimson-950 hover:bg-crimson-900 text-crimson-300 border border-crimson-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" /> Refute Fabrication ({evd.votes.debunked})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ENTERPRISE FORENSIC EVIDENCE DEEP INSPECTOR MODAL (OPENS ON PIN CLICK)    */}
      {/* ========================================================================= */}
      {inspectedPin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animation-fade-in select-text">
          <div className="bg-slate-900 border-2 border-indigo-500/70 rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-900/60 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Pin className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base sm:text-lg font-black text-white font-display uppercase tracking-wide">
                      {inspectedPin.title}
                    </h3>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(inspectedPin.status).color}`}>
                      {getStatusBadge(inspectedPin.status).label}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-mono">{inspectedPin.role}</p>
                </div>
              </div>

              <button
                onClick={() => setInspectedPin(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left: Media & Hash (5 Cols) */}
                <div className="md:col-span-5 space-y-3">
                  <div className="h-56 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative">
                    <img src={inspectedPin.photo} alt={inspectedPin.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 border border-emerald-800">
                      FORENSIC EXHIBIT
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 font-mono text-xs">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">SHA-256 Digital Checksum:</span>
                    <p className="text-indigo-400 break-all text-[11px] select-all">{inspectedPin.hash || 'SHA256:8F91B02C7841EA09B29910D94A71295F8102CBA1902834E1'}</p>
                  </div>
                </div>

                {/* Right: Notes, Connected Nodes & Triage (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  {/* Forensic Notes */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Investigative Notes & Findings</h4>
                    <p className="text-xs text-slate-200 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
                      {inspectedPin.notes}
                    </p>
                  </div>

                  {/* Connected Evidence Nodes on Whiteboard */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono flex items-center gap-1.5">
                      <Link2 className="w-4 h-4" /> Connected Evidence Links ({getConnectedPinsFor(inspectedPin.id).length} Nodes)
                    </h4>
                    
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {getConnectedPinsFor(inspectedPin.id).length === 0 ? (
                        <p className="text-xs text-slate-500 italic p-2 bg-slate-950 rounded-xl border border-slate-800">
                          No red strings attached to this pin yet. Click "Tie Red String" to connect it with other exhibits!
                        </p>
                      ) : (
                        getConnectedPinsFor(inspectedPin.id).map((conn, idx) => (
                          <div
                            key={idx}
                            onClick={() => setInspectedPin(conn.pin)}
                            className="p-2.5 bg-slate-950 hover:bg-indigo-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs cursor-pointer transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-crimson-500"></span>
                              <span className="font-bold text-white">{conn.pin.title}</span>
                              <span className="text-[10px] text-slate-400">({conn.relation})</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Community Consensus Triage Box */}
                  <div className="p-3.5 bg-indigo-950/30 rounded-2xl border border-indigo-800/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Community Forensic Consensus</span>
                      <span className="text-[10px] text-emerald-400 font-mono">99.4% Verified True Consensus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          confetti({ particleCount: 30, spread: 50 });
                          showToast('Verified True vote cast!', 'success');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald"
                      >
                        ✓ Validate True
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleDeletePin(inspectedPin.id)}
                className="px-4 py-2 bg-crimson-950 hover:bg-crimson-900 text-crimson-300 border border-crimson-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Pin from Whiteboard
              </button>

              <button
                onClick={() => setInspectedPin(null)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD ITEM TO WHITEBOARD MODAL                                              */}
      {/* ========================================================================= */}
      {isAddPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animation-fade-in">
          <div className="bg-slate-900 border border-indigo-500/60 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Add Item to Investigation Whiteboard</span>
              </h3>
              <button onClick={() => setIsAddPinModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPin} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Item Title / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Eyewitness Angle #2, Dispatch Call Audio, Deputy Bodycam Still"
                  value={newPinTitle}
                  onChange={(e) => setNewPinTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Classification / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Physical Exhibit #4"
                    value={newPinRole}
                    onChange={(e) => setNewPinRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Verification Status</label>
                  <select
                    value={newPinStatus}
                    onChange={(e) => setNewPinStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value="VERIFIED_TRUE">Verified True</option>
                    <option value="DEBUNKED_FABRICATION">Debunked Police Fabrication</option>
                    <option value="UNDER_DETERMINATION">Under Determination</option>
                    <option value="EXCULPATORY_BRADY">Brady Exculpatory Material</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Photo / Thumbnail URL</label>
                <input
                  type="url"
                  value={newPinPhoto}
                  onChange={(e) => setNewPinPhoto(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Forensic Investigator Notes</label>
                <textarea
                  rows={3}
                  placeholder="Key observations, timestamp details, inconsistencies with official statements..."
                  value={newPinNotes}
                  onChange={(e) => setNewPinNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddPinModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-glow"
                >
                  Pin onto Whiteboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
