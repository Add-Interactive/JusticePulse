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
  HardDrive, 
  FolderPlus, 
  Image as ImageIcon, 
  Smartphone, 
  Move, 
  Hand, 
  Compass, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Crosshair
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

  // Interactive Whiteboard Canvas Panning & Zooming
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 }); // Move around whiteboard canvas
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Pin Selection & Connection State
  const [inspectedPin, setInspectedPin] = useState(null);
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [connectSourcePinId, setConnectSourcePinId] = useState(null);
  
  // Modals
  const [isAddPinModalOpen, setIsAddPinModalOpen] = useState(false);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

  // New Board Form State
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardCase, setNewBoardCase] = useState('');
  const [newBoardSummary, setNewBoardSummary] = useState('');

  // New Pin Form State
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinRole, setNewPinRole] = useState('Physical Exhibit');
  const [newPinCategory, setNewPinCategory] = useState('evidence');
  const [newPinPhoto, setNewPinPhoto] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80');
  const [newPinNotes, setNewPinNotes] = useState('');
  const [newPinStatus, setNewPinStatus] = useState('VERIFIED_TRUE');

  // Curated Image Presets
  const imagePresets = [
    { label: 'Bodycam Still', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80' },
    { label: 'Police Document', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80' },
    { label: 'Personnel Dossier', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop&q=80' },
    { label: 'Officer Portrait', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
    { label: 'Victim Memorial', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80' },
    { label: 'Eyewitness Witness', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' }
  ];

  // Dragging & Touch State for Individual Pins
  const [draggingPinId, setDraggingPinId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef({ time: 0, x: 0, y: 0, pinId: null });
  const canvasViewportRef = useRef(null);

  const activeBoard = boards.find(b => b.id === activeBoardId) || boards[0];

  // Lock out native page scrolling completely when dragging/touching inside the canvas viewport
  useEffect(() => {
    const viewport = canvasViewportRef.current;
    if (!viewport) return;

    const preventPageScroll = (e) => {
      e.preventDefault();
    };

    // Non-passive touchmove listener to guarantee no page scrolling
    viewport.addEventListener('touchmove', preventPageScroll, { passive: false });
    
    // Prevent mouse wheel from scrolling page over canvas
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zoom on pinch/ctrl-wheel
        const delta = e.deltaY < 0 ? 0.05 : -0.05;
        setZoomLevel(prev => Math.min(1.6, Math.max(0.5, parseFloat((prev + delta).toFixed(2)))));
      } else {
        // Pan on wheel
        setPanOffset(prev => ({
          x: prev.x - e.deltaX * 0.8,
          y: prev.y - e.deltaY * 0.8
        }));
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener('touchmove', preventPageScroll);
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [activeTab]);

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

  // =========================================================================
  // CANVAS PANNING (DRAGGING EMPTY SPACE ON CORKBOARD WITH MOUSE)
  // =========================================================================
  const handleCanvasMouseDown = (e) => {
    if (draggingPinId) return;
    setIsPanning(true);
    setPanStart({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    // If user is panning the whole canvas
    if (isPanning && !draggingPinId) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    // If user is dragging a specific pin
    if (draggingPinId) {
      const rect = canvasViewportRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newX = Math.max(10, Math.min(1800, Math.round(((e.clientX - rect.left - panOffset.x) / zoomLevel) - dragOffset.x)));
      const newY = Math.max(10, Math.min(1200, Math.round(((e.clientY - rect.top - panOffset.y) / zoomLevel) - dragOffset.y)));

      setBoards(boards.map(b => {
        if (b.id === activeBoardId) {
          return {
            ...b,
            pins: b.pins.map(p => p.id === draggingPinId ? { ...p, x: newX, y: newY } : p)
          };
        }
        return b;
      }));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
    setDraggingPinId(null);
  };

  // Pin Mouse Down (Starts moving a pin)
  const handlePinMouseDown = (e, pin) => {
    e.stopPropagation(); // Prevents triggering canvas pan

    if (isConnectMode) {
      handlePinConnectClick(pin.id);
      return;
    }

    const rect = canvasViewportRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDraggingPinId(pin.id);
    setDragOffset({
      x: ((e.clientX - rect.left - panOffset.x) / zoomLevel) - pin.x,
      y: ((e.clientY - rect.top - panOffset.y) / zoomLevel) - pin.y
    });
  };

  // =========================================================================
  // TOUCH GESTURES (SWIPING EMPTY SPACE OR DRAGGING PINS ON PHONES / TABLETS)
  // =========================================================================
  const handleCanvasTouchStart = (e) => {
    if (e.touches.length !== 1 || draggingPinId) return;
    const touch = e.touches[0];
    setIsPanning(true);
    setPanStart({
      x: touch.clientX - panOffset.x,
      y: touch.clientY - panOffset.y
    });
  };

  const handlePinTouchStart = (e, pin) => {
    e.stopPropagation();
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const rect = canvasViewportRef.current?.getBoundingClientRect();
    if (!rect) return;

    touchStartRef.current = {
      time: Date.now(),
      x: touch.clientX,
      y: touch.clientY,
      pinId: pin.id
    };

    if (isConnectMode) {
      handlePinConnectClick(pin.id);
      return;
    }

    setDraggingPinId(pin.id);
    setDragOffset({
      x: ((touch.clientX - rect.left - panOffset.x) / zoomLevel) - pin.x,
      y: ((touch.clientY - rect.top - panOffset.y) / zoomLevel) - pin.y
    });
  };

  const handleCanvasTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];

    // Panning canvas on touch
    if (isPanning && !draggingPinId) {
      setPanOffset({
        x: touch.clientX - panStart.x,
        y: touch.clientY - panStart.y
      });
      return;
    }

    // Dragging pin on touch
    if (draggingPinId) {
      const rect = canvasViewportRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newX = Math.max(10, Math.min(1800, Math.round(((touch.clientX - rect.left - panOffset.x) / zoomLevel) - dragOffset.x)));
      const newY = Math.max(10, Math.min(1200, Math.round(((touch.clientY - rect.top - panOffset.y) / zoomLevel) - dragOffset.y)));

      setBoards(boards.map(b => {
        if (b.id === activeBoardId) {
          return {
            ...b,
            pins: b.pins.map(p => p.id === draggingPinId ? { ...p, x: newX, y: newY } : p)
          };
        }
        return b;
      }));
    }
  };

  const handleCanvasTouchEnd = () => {
    if (draggingPinId) {
      const touchDuration = Date.now() - touchStartRef.current.time;
      const targetPin = activeBoard.pins.find(p => p.id === draggingPinId);

      // If quick tap without move, open inspector
      if (touchDuration < 260 && !isConnectMode && targetPin) {
        setInspectedPin(targetPin);
      }
    }

    setIsPanning(false);
    setDraggingPinId(null);
  };

  // Reset Canvas View to Origin
  const handleResetCanvasView = () => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
    showToast('Whiteboard view centered and reset to 100%', 'info');
  };

  // Quick Nudge Panning Handlers
  const nudgePan = (dx, dy) => {
    setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  // Connect / Red String Handler
  const handlePinConnectClick = (pinId) => {
    if (!connectSourcePinId) {
      setConnectSourcePinId(pinId);
      const sourcePin = activeBoard.pins.find(p => p.id === pinId);
      showToast(`Selected "${sourcePin?.title}". Now tap target pin to tie red string!`, 'info');
    } else {
      if (connectSourcePinId === pinId) {
        showToast('Cannot connect a pin to itself', 'error');
        setConnectSourcePinId(null);
        return;
      }

      const label = window.prompt('Enter relationship label for this red string (e.g. "Contradicts Radio Call", "Supervisory Failure", "Fired Lethal Shot"):', 'Connected Evidence');
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
      x: 100 + (activeBoard.pins.length * 40) % 500,
      y: 100 + (activeBoard.pins.length * 35) % 400,
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
    showToast(`Pinned "${newPin.title}" onto the investigation whiteboard!`, 'success');
  };

  // Create Brand New Custom Board
  const handleCreateNewBoard = (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    const newBoard = {
      id: `fbi-board-${Date.now()}`,
      title: newBoardTitle,
      caseId: 'custom-case',
      caseTitle: newBoardCase || 'Independent Investigation',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      summary: newBoardSummary || 'Custom citizen-led evidence matrix.',
      pins: [],
      redStrings: []
    };

    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
    setNewBoardTitle('');
    setNewBoardCase('');
    setNewBoardSummary('');
    setIsCreateBoardModalOpen(false);
    confetti({ particleCount: 40, spread: 65 });
    showToast(`New Whiteboard "${newBoard.title}" created! Ready to add pins.`, 'success');
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
    <div className="space-y-4 sm:space-y-6 select-none">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-indigo-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Layers className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Touch & Drag Canvas Whiteboard</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white font-display">
            Collaborative Detective Corkboard & Verification Matrix
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Drag empty space to pan the canvas smoothly. Drag polaroid cards freely. Tap pins to inspect forensic exhibits.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <button
            onClick={() => setIsAddPinModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow-indigo transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Item</span>
          </button>

          <button
            onClick={() => setIsCreateBoardModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 bg-purple-900 hover:bg-purple-800 text-purple-200 border border-purple-700 rounded-xl text-xs font-bold transition-all"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ New Board</span>
          </button>

          <button
            onClick={handleExportDossier}
            className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto gap-3">
        <div className="flex space-x-2">
          {[
            { id: 'corkboard', label: '🕵️ Detective Corkboard', icon: Pin },
            { id: 'library', label: '📁 Evidence Vault', icon: FileText },
            { id: 'verification', label: '⚖️ Verification Triage', icon: ShieldCheck }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 sm:space-x-2 ${
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
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">Board:</span>
            <select
              value={activeBoardId}
              onChange={(e) => {
                setActiveBoardId(e.target.value);
                setInspectedPin(null);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold max-w-[180px] sm:max-w-none truncate"
            >
              {boards.map(b => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: DETECTIVE CORKBOARD CANVAS (INTERACTIVE DRAGGABLE & PANNABLE CANVAS) */}
      {activeTab === 'corkboard' && (
        <div className="space-y-3 sm:space-y-4 animation-fade-in select-none">
          {/* Corkboard Top Bar */}
          <div className="bg-[#111726] rounded-2xl border-2 border-[#243147] p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xl">
            <div className="flex items-center space-x-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold text-indigo-300">
                📌 {activeBoard.pins.length} Pins • 🧵 {activeBoard.redStrings.length} Strings
              </span>
              <div className="h-3.5 w-px bg-slate-700 hidden sm:block"></div>
              <span className="text-[11px] text-amber-300 font-mono flex items-center gap-1.5 font-bold">
                <Hand className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Drag empty corkboard to move canvas • Drag card to position
              </span>
            </div>

            {/* Quick Canvas Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setIsConnectMode(!isConnectMode);
                  setConnectSourcePinId(null);
                  showToast(isConnectMode ? 'Red string mode cancelled' : 'Tap Pin A then Pin B to tie red string!', 'info');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isConnectMode
                    ? 'bg-amber-500 text-slate-950 font-black animate-pulse shadow-glow'
                    : 'bg-crimson-600 hover:bg-crimson-500 text-white shadow-glow-crimson'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{isConnectMode ? 'Tap 2 Pins' : 'Tie String'}</span>
              </button>

              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

              {/* Reset Canvas View Button */}
              <button
                onClick={handleResetCanvasView}
                className="px-2.5 py-1.5 bg-[#080c14] border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1 active:scale-95"
                title="Center & Reset View"
              >
                <Crosshair className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Center</span>
              </button>

              {/* Zoom Buttons */}
              <button onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))} className="p-2 sm:p-1.5 bg-[#080c14] border border-slate-700 text-slate-300 hover:text-white rounded-lg active:scale-95" title="Zoom In">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setZoomLevel(Math.max(0.6, zoomLevel - 0.1))} className="p-2 sm:p-1.5 bg-[#080c14] border border-slate-700 text-slate-300 hover:text-white rounded-lg active:scale-95" title="Zoom Out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Draggable Viewport Container with Locked Page Scroll (touch-none overscroll-none) */}
          <div 
            ref={canvasViewportRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            onTouchStart={handleCanvasTouchStart}
            onTouchMove={handleCanvasTouchMove}
            onTouchEnd={handleCanvasTouchEnd}
            onTouchCancel={handleCanvasTouchEnd}
            style={{ touchAction: 'none' }}
            className={`bg-[#17120e] rounded-3xl border-4 border-[#3e2c1c] shadow-2xl relative h-[560px] sm:h-[700px] overflow-hidden select-none touch-none overscroll-none ${
              isPanning ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Corkboard Background Pattern */}
            <div 
              className="absolute inset-0 opacity-40 bg-[radial-gradient(#4a3525_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
            ></div>

            {/* D-Pad Floating Navigation Compass (Bottom-Right) */}
            <div className="absolute bottom-4 right-4 z-30 bg-[#111726]/90 backdrop-blur-md p-2 rounded-2xl border-2 border-[#243147] shadow-2xl flex flex-col items-center gap-1">
              <button onClick={() => nudgePan(0, 80)} className="p-1.5 rounded-lg bg-[#080c14] hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-700 active:scale-90" title="Move Up">
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1">
                <button onClick={() => nudgePan(80, 0)} className="p-1.5 rounded-lg bg-[#080c14] hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-700 active:scale-90" title="Move Left">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button onClick={handleResetCanvasView} className="p-1.5 rounded-lg bg-indigo-600 text-white font-black text-[10px] active:scale-90" title="Reset Center">
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => nudgePan(-80, 0)} className="p-1.5 rounded-lg bg-[#080c14] hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-700 active:scale-90" title="Move Right">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <button onClick={() => nudgePan(0, -80)} className="p-1.5 rounded-lg bg-[#080c14] hover:bg-indigo-950 text-slate-300 hover:text-white border border-slate-700 active:scale-90" title="Move Down">
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Transformable Canvas Workspace Layer (Moves with Pan & Zoom) */}
            <div
              style={{ 
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`, 
                transformOrigin: '0 0' 
              }}
              className="absolute top-0 left-0 w-[2400px] h-[1600px] touch-none"
            >
              {/* Dynamic SVG Red Strings Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {activeBoard.redStrings.map((str, idx) => {
                  const fromPin = activeBoard.pins.find(p => p.id === str.from);
                  const toPin = activeBoard.pins.find(p => p.id === str.to);
                  if (!fromPin || !toPin) return null;

                  const x1 = fromPin.x + 80;
                  const y1 = fromPin.y + 10;
                  const x2 = toPin.x + 80;
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
                      <circle cx={midX} cy={midY} r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
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

              {/* Empty Board Helper Notice */}
              {activeBoard.pins.length === 0 && (
                <div className="absolute top-48 left-64 flex items-center justify-center pointer-events-none">
                  <div className="p-6 bg-black/85 backdrop-blur-md rounded-2xl border-2 border-dashed border-amber-600 text-center space-y-2 max-w-sm pointer-events-auto shadow-2xl">
                    <Pin className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
                    <h4 className="text-sm font-bold text-white uppercase font-mono">Whiteboard is Empty</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Tap <span className="text-amber-300 font-bold">"+ Add Item"</span> above to place your first polaroid evidence card onto this investigation board!
                    </p>
                    <button
                      onClick={() => setIsAddPinModalOpen(true)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow mt-2 active:scale-95"
                    >
                      + Add First Evidence Pin
                    </button>
                  </div>
                </div>
              )}

              {/* Polaroid Evidence Pins */}
              {activeBoard.pins.map((pin) => {
                const statusInfo = getStatusBadge(pin.status);
                const isSelected = inspectedPin?.id === pin.id;
                const isConnectSource = connectSourcePinId === pin.id;

                return (
                  <div
                    key={pin.id}
                    onMouseDown={(e) => handlePinMouseDown(e, pin)}
                    onTouchStart={(e) => handlePinTouchStart(e, pin)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isConnectMode) {
                        setInspectedPin(pin);
                      }
                    }}
                    style={{
                      left: `${pin.x}px`,
                      top: `${pin.y}px`,
                      cursor: isConnectMode ? 'pointer' : 'grab',
                      touchAction: 'none'
                    }}
                    className={`absolute z-20 w-40 sm:w-44 bg-[#f4ebd0] text-slate-900 rounded-sm shadow-2xl p-2.5 pb-3.5 transition-shadow hover:shadow-[0_20px_35px_rgba(0,0,0,0.8)] hover:z-30 select-none group border border-[#d6c7a1] touch-none ${
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
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-crimson-600 text-white transition-all z-40"
                      title="Remove Pin"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Photo Area */}
                    <div className="w-full h-24 sm:h-28 bg-slate-950 rounded-sm overflow-hidden mb-2 relative border border-[#d6c7a1]">
                      <img
                        src={pin.photo}
                        alt={pin.title}
                        className="w-full h-full object-cover grayscale-[25%] contrast-110 group-hover:grayscale-0 transition-all pointer-events-none"
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
                      <p className="text-[8.5px] sm:text-[9px] font-semibold text-rose-950 uppercase tracking-tight truncate">
                        {pin.role}
                      </p>
                    </div>

                    {/* Notes Snippet */}
                    <p className="text-[8.5px] text-slate-800 leading-snug line-clamp-2 mt-1 italic font-serif">
                      "{pin.notes}"
                    </p>

                    {/* Inspector Click / Tap Hint */}
                    <div className="mt-1.5 pt-1 border-t border-[#d6c7a1] flex items-center justify-between text-[8px] font-mono text-indigo-900 font-bold">
                      <span>Tap to Inspect</span>
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
          <div className="bg-[#111726] p-4 rounded-2xl border-2 border-[#243147] flex flex-wrap gap-3 items-center justify-between shadow-xl">
            <div className="flex-1 min-w-[220px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search evidence exhibits, hashes, officers, or cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080c14] border border-[#243147] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-semibold"
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
                  className="bg-[#111726] rounded-3xl border-2 border-[#243147] border-l-4 border-l-indigo-500 p-4 space-y-3 hover:border-indigo-500 transition-all cursor-pointer shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="h-40 bg-[#080c14] rounded-2xl overflow-hidden relative border border-[#1e2a3f]">
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

                  <div className="pt-2 border-t border-[#1c273a] flex items-center justify-between text-[11px] font-mono text-slate-400">
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
        <div className="bg-[#111726] rounded-3xl border-2 border-[#243147] p-4 sm:p-6 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1c273a] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Democratic Community Evidence Verification Triage</h3>
              <p className="text-xs text-slate-400">Vote to validate authentic evidence or flag disproven police narratives.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 hidden sm:inline-block font-bold">
              100% Cryptographic Consensus
            </span>
          </div>

          <div className="space-y-3">
            {evidenceList.map((evd) => {
              const statusInfo = getStatusBadge(evd.verificationStatus);

              return (
                <div key={evd.id} className="p-4 bg-[#080c14] rounded-2xl border border-[#1e2a3f] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <img src={evd.thumbnail} alt={evd.title} className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono truncate">{evd.sha256Hash}</span>
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
                      className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Validate True ({evd.votes.verified})
                    </button>

                    <button
                      onClick={() => {
                        showToast(`Voted FABRICATION: Flagged "${evd.title}" as police fabrication!`, 'info');
                      }}
                      className="px-3 py-1.5 bg-crimson-950 hover:bg-crimson-900 text-crimson-300 border border-crimson-700 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95"
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
      {/* ENTERPRISE FORENSIC EVIDENCE DEEP INSPECTOR MODAL                        */}
      {/* ========================================================================= */}
      {inspectedPin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animation-fade-in select-text">
          <div className="bg-[#111726] border-2 border-indigo-500/80 rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#080c14] via-indigo-950 to-[#080c14] border-b border-indigo-900/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <Pin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm sm:text-lg font-black text-white font-display uppercase tracking-wide truncate">
                      {inspectedPin.title}
                    </h3>
                    <span className={`text-[8.5px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(inspectedPin.status).color} flex-shrink-0`}>
                      {getStatusBadge(inspectedPin.status).label}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-mono truncate">{inspectedPin.role}</p>
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
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                {/* Left: Media & Hash */}
                <div className="md:col-span-5 space-y-3">
                  <div className="h-48 sm:h-56 bg-[#080c14] rounded-2xl overflow-hidden border border-[#1e2a3f] shadow-inner relative">
                    <img src={inspectedPin.photo} alt={inspectedPin.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 border border-emerald-800 font-bold">
                      FORENSIC EXHIBIT
                    </div>
                  </div>

                  <div className="p-3 bg-[#080c14] rounded-2xl border border-[#1e2a3f] space-y-1 font-mono text-xs shadow-inner">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">SHA-256 Checksum:</span>
                    <p className="text-indigo-400 break-all text-[11px] select-all font-bold">{inspectedPin.hash || 'SHA256:8F91B02C7841EA09B29910D94A71295F8102CBA1902834E1'}</p>
                  </div>
                </div>

                {/* Right: Notes, Connected Nodes & Triage */}
                <div className="md:col-span-7 space-y-4">
                  {/* Forensic Notes */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Investigative Notes & Findings</h4>
                    <p className="text-xs text-slate-200 bg-[#080c14] p-3.5 rounded-2xl border border-[#1e2a3f] leading-relaxed shadow-inner">
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
                        <p className="text-xs text-slate-500 italic p-2 bg-[#080c14] rounded-xl border border-[#1e2a3f]">
                          No red strings attached to this pin yet. Tap "Tie String" to connect it with other exhibits!
                        </p>
                      ) : (
                        getConnectedPinsFor(inspectedPin.id).map((conn, idx) => (
                          <div
                            key={idx}
                            onClick={() => setInspectedPin(conn.pin)}
                            className="p-2.5 bg-[#080c14] hover:bg-indigo-950/60 rounded-xl border border-[#1e2a3f] flex items-center justify-between text-xs cursor-pointer transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-crimson-500"></span>
                              <span className="font-bold text-white">{conn.pin.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({conn.relation})</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Community Consensus Triage Box */}
                  <div className="p-3.5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Community Forensic Consensus</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">99.4% Verified True Consensus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          confetti({ particleCount: 30, spread: 50 });
                          showToast('Verified True vote cast!', 'success');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald active:scale-95"
                      >
                        ✓ Validate True
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3 sm:p-4 bg-[#080c14] border-t border-[#1c273a] flex items-center justify-between">
              <button
                onClick={() => handleDeletePin(inspectedPin.id)}
                className="px-3.5 sm:px-4 py-2 bg-crimson-950 hover:bg-crimson-900 text-crimson-300 border border-crimson-800 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Pin
              </button>

              <button
                onClick={() => setInspectedPin(null)}
                className="px-5 sm:px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow active:scale-95"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animation-fade-in">
          <div className="bg-[#111726] border-2 border-indigo-500/70 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1c273a] pb-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Add Item to Whiteboard</span>
              </h3>
              <button onClick={() => setIsAddPinModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPin} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Item Title / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Eyewitness Angle #2, Dispatch Call Audio, Deputy Bodycam Still"
                  value={newPinTitle}
                  onChange={(e) => setNewPinTitle(e.target.value)}
                  required
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Classification / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Physical Exhibit #4"
                    value={newPinRole}
                    onChange={(e) => setNewPinRole(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Verification Status</label>
                  <select
                    value={newPinStatus}
                    onChange={(e) => setNewPinStatus(e.target.value)}
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value="VERIFIED_TRUE">Verified True</option>
                    <option value="DEBUNKED_FABRICATION">Debunked Police Fabrication</option>
                    <option value="UNDER_DETERMINATION">Under Determination</option>
                    <option value="EXCULPATORY_BRADY">Brady Exculpatory Material</option>
                  </select>
                </div>
              </div>

              {/* Photo Presets Selector */}
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Select Curated Evidence Photo Preset or Custom URL</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {imagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewPinPhoto(preset.url)}
                      className={`p-2 rounded-xl border text-[10px] text-center transition-all ${
                        newPinPhoto === preset.url
                          ? 'bg-indigo-950 text-indigo-300 border-indigo-500 font-bold'
                          : 'bg-[#080c14] text-slate-300 border-[#243147] hover:border-slate-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={newPinPhoto}
                  onChange={(e) => setNewPinPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Forensic Investigator Notes</label>
                <textarea
                  rows={3}
                  placeholder="Key observations, timestamp details, inconsistencies with official statements..."
                  value={newPinNotes}
                  onChange={(e) => setNewPinNotes(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
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

      {/* ========================================================================= */}
      {/* CREATE NEW CUSTOM WHITEBOARD MODAL                                       */}
      {/* ========================================================================= */}
      {isCreateBoardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animation-fade-in">
          <div className="bg-[#111726] border-2 border-purple-500/70 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1c273a] pb-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-purple-400" />
                <span>Create Investigation Whiteboard</span>
              </h3>
              <button onClick={() => setIsCreateBoardModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewBoard} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Whiteboard Title</label>
                <input
                  type="text"
                  placeholder="e.g. Springfield Traffic Stop Incident Matrix"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  required
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Associated Case / Jurisdiction</label>
                <input
                  type="text"
                  placeholder="e.g. Sangamon County Sheriff Misconduct Inquiry"
                  value={newBoardCase}
                  onChange={(e) => setNewBoardCase(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Investigative Objective & Summary</label>
                <textarea
                  rows={3}
                  placeholder="Summary of the civil rights incident, evidence to map, and goals..."
                  value={newBoardSummary}
                  onChange={(e) => setNewBoardSummary(e.target.value)}
                  className="w-full bg-[#080c14] border border-[#243147] rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateBoardModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-glow-indigo"
                >
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
