import React, { useState, useRef, useEffect } from 'react';
import { 
  Network, 
  Plus, 
  Link2, 
  Trash2, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Video, 
  User, 
  Building2, 
  Scale, 
  Sparkles, 
  Layers, 
  Share2, 
  Move,
  Info,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialInvestigationBoards } from '../../data/investigationBoardsData';

export default function InvestigationCanvasView({ showToast }) {
  const [boards, setBoards] = useState(initialInvestigationBoards);
  const [activeBoardId, setActiveBoardId] = useState('board-sangamon');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [connectSourceId, setConnectSourceId] = useState(null);

  // New Node Form State
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodeSubtitle, setNewNodeSubtitle] = useState('');
  const [newNodeType, setNewNodeType] = useState('evidence_media');
  const [newNodeDetails, setNewNodeDetails] = useState('');

  // Dragging Node State
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const activeBoard = boards.find(b => b.id === activeBoardId) || boards[0];

  const getNodeIcon = (type) => {
    switch (type) {
      case 'person_officer':
        return { icon: User, color: 'border-crimson-500 bg-crimson-950/90 text-crimson-300', headerBg: 'bg-crimson-900/60' };
      case 'person_victim':
        return { icon: User, color: 'border-justice-500 bg-justice-950/90 text-justice-300', headerBg: 'bg-justice-900/60' };
      case 'evidence_media':
        return { icon: Video, color: 'border-emerald-500 bg-emerald-950/90 text-emerald-300', headerBg: 'bg-emerald-900/60' };
      case 'evidence_doc':
        return { icon: FileText, color: 'border-amber-500 bg-amber-950/90 text-amber-300', headerBg: 'bg-amber-900/60' };
      case 'legal_violation':
        return { icon: Scale, color: 'border-rose-500 bg-rose-950/90 text-rose-300', headerBg: 'bg-rose-900/60' };
      case 'institution':
        return { icon: Building2, color: 'border-purple-500 bg-purple-950/90 text-purple-300', headerBg: 'bg-purple-900/60' };
      default:
        return { icon: Info, color: 'border-slate-500 bg-slate-900 text-slate-300', headerBg: 'bg-slate-800' };
    }
  };

  // Node Drag Handlers
  const handleMouseDown = (e, nodeId) => {
    e.stopPropagation();
    if (isConnectMode) {
      handleConnectClick(nodeId);
      return;
    }
    const node = activeBoard.nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggingNodeId(nodeId);
    setSelectedNodeId(nodeId);

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - canvasRect.left) / zoomLevel;
    const mouseY = (e.clientY - canvasRect.top) / zoomLevel;

    setDragOffset({
      x: mouseX - node.x,
      y: mouseY - node.y
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingNodeId || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - canvasRect.left) / zoomLevel;
    const mouseY = (e.clientY - canvasRect.top) / zoomLevel;

    const newX = Math.max(20, Math.min(850, Math.round(mouseX - dragOffset.x)));
    const newY = Math.max(20, Math.min(500, Math.round(mouseY - dragOffset.y)));

    setBoards(boards.map(b => {
      if (b.id === activeBoardId) {
        return {
          ...b,
          nodes: b.nodes.map(n => n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n)
        };
      }
      return b;
    }));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  // Connect Mode
  const handleConnectClick = (nodeId) => {
    if (!connectSourceId) {
      setConnectSourceId(nodeId);
      showToast('Select second node to establish visual link line', 'info');
    } else if (connectSourceId === nodeId) {
      setConnectSourceId(null);
      setIsConnectMode(false);
      showToast('Link cancelled', 'info');
    } else {
      const newConnection = {
        from: connectSourceId,
        to: nodeId,
        label: 'Direct Investigative Link',
        color: '#38bdf8',
        style: 'solid'
      };

      setBoards(boards.map(b => {
        if (b.id === activeBoardId) {
          return {
            ...b,
            connections: [...b.connections, newConnection]
          };
        }
        return b;
      }));

      confetti({ particleCount: 30, spread: 50 });
      showToast('Evidence link established on whiteboard!', 'success');
      setConnectSourceId(null);
      setIsConnectMode(false);
    }
  };

  // Add Node
  const handleAddNode = (e) => {
    e.preventDefault();
    if (!newNodeTitle.trim()) return;

    const newNode = {
      id: `n-${Date.now()}`,
      type: newNodeType,
      title: newNodeTitle.trim(),
      subtitle: newNodeSubtitle.trim() || 'Investigation Exhibit',
      x: 350 + Math.round(Math.random() * 100),
      y: 200 + Math.round(Math.random() * 80),
      status: 'User Documented',
      evidenceHash: `SHA256:${Date.now().toString(16).toUpperCase()}...${Math.floor(Math.random()*900+100)}`,
      details: newNodeDetails.trim() || 'Verified eyewitness or public records disclosure.',
      tags: ['Custom Node', 'Civic Discovery']
    };

    setBoards(boards.map(b => {
      if (b.id === activeBoardId) {
        return {
          ...b,
          nodes: [...b.nodes, newNode]
        };
      }
      return b;
    }));

    setIsAddNodeOpen(false);
    setNewNodeTitle('');
    setNewNodeSubtitle('');
    setNewNodeDetails('');
    confetti({ particleCount: 40, spread: 60 });
    showToast(`Added "${newNode.title}" to investigation canvas!`, 'success');
  };

  const handleExportBoard = () => {
    const reportText = `================================================================================
JUSTICE PULSE - ENTERPRISE CASE EVIDENCE MATRIX REPORT
INVESTIGATION BOARD: ${activeBoard.title.toUpperCase()}
DATE OF EXPORT: ${new Date().toLocaleString()}
SHA-256 REPOSITORY REPOSITORY CHECKSUM: SHA256:E99812A4789012BC
================================================================================

I. INVESTIGATIVE NODES (${activeBoard.nodes.length} VERIFIED ENTITIES)
${activeBoard.nodes.map((n, idx) => `
[NODE ${idx + 1}] ${n.title.toUpperCase()} (${n.type.toUpperCase()})
- Classification: ${n.subtitle}
- Status: ${n.status}
- Cryptographic Hash: ${n.evidenceHash}
- Factual Dossier: ${n.details}
`).join('')}

II. VISUAL EVIDENCE CONNECTIONS (${activeBoard.connections.length} DOCUMENTED LINKS)
${activeBoard.connections.map((c, idx) => {
  const fromNode = activeBoard.nodes.find(n => n.id === c.from);
  const toNode = activeBoard.nodes.find(n => n.id === c.to);
  return `[LINK ${idx + 1}] ${fromNode?.title || c.from} ---> [ ${c.label.toUpperCase()} ] ---> ${toNode?.title || c.to}`;
}).join('\n')}

================================================================================
Prepared for Civil Rights Section 1983 Discovery & Independent Prosecutorial Review
Certified by JusticePulse Cryptographic Chain of Custody Network
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `EVIDENCE_MATRIX_${activeBoard.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 50, spread: 70 });
    showToast('Investigation Evidence Matrix exported as court-ready brief!', 'success');
  };

  const selectedNode = activeBoard.nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="space-y-5 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 rounded-3xl p-6 border border-indigo-800/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Network className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Enterprise Investigation Whiteboard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Interactive Evidence & Suspect Connection Matrix
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Drag, place, and visually connect officers, bodycam exhibits, falsified affidavits, and municipal policies with cryptographic SHA-256 chain-of-custody tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <button
            onClick={() => setIsAddNodeOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-glow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Node</span>
          </button>

          <button
            onClick={() => {
              setIsConnectMode(!isConnectMode);
              setConnectSourceId(null);
              showToast(isConnectMode ? 'Link mode cancelled' : 'Click first node then second node to connect with red string!', 'info');
            }}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isConnectMode
                ? 'bg-amber-500 text-slate-950 font-black animate-pulse shadow-glow'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>{isConnectMode ? 'Click 2 Nodes to Link' : 'Link Nodes'}</span>
          </button>

          <button
            onClick={handleExportBoard}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all"
            title="Export Evidence Matrix Discovery Brief"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Brief</span>
          </button>
        </div>
      </div>

      {/* Board Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {boards.map(b => (
          <button
            key={b.id}
            onClick={() => {
              setActiveBoardId(b.id);
              setSelectedNodeId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
              activeBoardId === b.id
                ? 'bg-justice-600 text-white shadow-glow'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{b.title}</span>
          </button>
        ))}
      </div>

      {/* Main Canvas Workspace Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Interactive Whiteboard Area (8 or 9 Cols) */}
        <div className="lg:col-span-8 xl:col-span-9 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative min-h-[560px] flex flex-col">
          {/* Canvas Floating Toolbar */}
          <div className="absolute top-3 left-3 z-30 flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 shadow-lg">
            <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase mr-1">
              Canvas: {activeBoard.nodes.length} Nodes • {activeBoard.connections.length} Links
            </span>
            <div className="h-3 w-px bg-slate-700 mx-1"></div>
            <button
              onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
              className="p-1 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.1))}
              className="p-1 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-white"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid Background Area */}
          <div
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex-1 relative w-full h-full min-h-[540px] overflow-hidden cursor-crosshair bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          >
            {/* SVG Connecting Links / Visual Relations */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>

              {activeBoard.connections.map((conn, idx) => {
                const nodeA = activeBoard.nodes.find(n => n.id === conn.from);
                const nodeB = activeBoard.nodes.find(n => n.id === conn.to);
                if (!nodeA || !nodeB) return null;

                const startX = nodeA.x + 90;
                const startY = nodeA.y + 40;
                const endX = nodeB.x + 90;
                const endY = nodeB.y + 40;
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;

                return (
                  <g key={idx}>
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke={conn.color || '#ef4444'}
                      strokeWidth="2.5"
                      strokeDasharray={conn.style === 'dashed' ? '5 5' : 'none'}
                      opacity="0.85"
                    />
                    {/* Floating Relation Badge on Line */}
                    <rect
                      x={midX - 50}
                      y={midY - 9}
                      width="100"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      stroke={conn.color || '#ef4444'}
                      strokeWidth="1"
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
                      {conn.label.length > 18 ? conn.label.slice(0, 16) + '..' : conn.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Draggable Interactive Nodes */}
            {activeBoard.nodes.map(node => {
              const { icon: NodeIcon, color, headerBg } = getNodeIcon(node.type);
              const isSelected = selectedNodeId === node.id;
              const isSource = connectSourceId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className={`absolute z-20 w-48 rounded-2xl border-2 shadow-2xl cursor-grab active:cursor-grabbing transition-shadow duration-100 ${color} ${
                    isSelected ? 'ring-4 ring-white/60 scale-105 shadow-glow' : ''
                  } ${isSource ? 'ring-4 ring-amber-400 animate-bounce' : ''}`}
                >
                  <div className={`px-3 py-1.5 border-b border-white/10 rounded-t-2xl flex items-center justify-between ${headerBg}`}>
                    <div className="flex items-center space-x-1.5">
                      <NodeIcon className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase font-mono tracking-wider truncate max-w-[100px]">
                        {node.type.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>

                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-black text-white leading-tight truncate">{node.title}</h4>
                    <p className="text-[10px] text-slate-300 truncate">{node.subtitle}</p>
                    <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span className="truncate max-w-[90px]">{node.status}</span>
                      <Lock className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Node Evidence Inspector Panel (4 or 3 Cols) */}
        <div className="lg:col-span-4 xl:col-span-3 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-5 shadow-2xl space-y-4 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4 animation-fade-in">
              <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-indigo-400 border border-indigo-800 font-mono">
                    {selectedNode.type.replace('_', ' ')}
                  </span>
                  <h3 className="text-base font-bold text-white font-display mt-1.5 leading-snug">
                    {selectedNode.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedNode.subtitle}</p>
                </div>

                <button onClick={() => setSelectedNodeId(null)} className="text-slate-500 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cryptographic SHA-256 Custody Card */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> Immutable Hash Integrity:
                </span>
                <p className="text-[11px] font-mono text-slate-200 truncate">{selectedNode.evidenceHash}</p>
                <p className="text-[10px] text-slate-400">Status: <strong className="text-slate-200">{selectedNode.status}</strong></p>
              </div>

              {/* Factual Dossier */}
              <div className="space-y-1">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Investigative Fact Record:</h5>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  {selectedNode.details}
                </p>
              </div>

              {/* Node Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedNode.tags?.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Node Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleConnectClick(selectedNode.id)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-glow"
                >
                  <Link2 className="w-3.5 h-3.5" /> Link To...
                </button>

                <button
                  onClick={() => {
                    setBoards(boards.map(b => {
                      if (b.id === activeBoardId) {
                        return {
                          ...b,
                          nodes: b.nodes.filter(n => n.id !== selectedNode.id),
                          connections: b.connections.filter(c => c.from !== selectedNode.id && c.to !== selectedNode.id)
                        };
                      }
                      return b;
                    }));
                    setSelectedNodeId(null);
                    showToast('Node and related links removed from board', 'info');
                  }}
                  className="px-2.5 py-1.5 text-slate-500 hover:text-crimson-400 hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-3 my-auto text-slate-500">
              <Network className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Any Entity or Evidence Node</h4>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Click on any officer, bodycam exhibit, or legal statute on the whiteboard to inspect its chain of custody, SHA-256 hash, and legal ties.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Custom Evidence Node */}
      {isAddNodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animation-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Add Entity to Whiteboard</h3>
              </div>
              <button onClick={() => setIsAddNodeOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNode} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Entity Type</label>
                <select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="person_officer">Officer / Law Enforcement</option>
                  <option value="person_victim">Victim / Eyewitness Witness</option>
                  <option value="evidence_media">Video / Bodycam / Dashcam Exhibit</option>
                  <option value="evidence_doc">Document / FOIA Release / Memo</option>
                  <option value="legal_violation">Legal Violation / Monell Claim</option>
                  <option value="institution">Police Dept / Municipal Agency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Node Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Unredacted CAD Dispatch Log"
                  value={newNodeTitle}
                  onChange={(e) => setNewNodeTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Subtitle / Role</label>
                <input
                  type="text"
                  placeholder="e.g. 911 Call Audio Exhibit #4"
                  value={newNodeSubtitle}
                  onChange={(e) => setNewNodeSubtitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Investigative Dossier & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe how this entity connects to the case or what facts it corroborates..."
                  value={newNodeDetails}
                  onChange={(e) => setNewNodeDetails(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddNodeOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-glow"
                >
                  Place Node on Canvas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
