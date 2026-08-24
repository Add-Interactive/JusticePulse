import React, { useState } from 'react';
import { 
  Flame, 
  Heart, 
  Sparkles, 
  Send, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialMemorials } from '../../data/memorialData';

export default function MemorialSanctuaryView({ onOpenDonateModal, showToast, currentUser }) {
  const [memorials, setMemorials] = useState(initialMemorials);
  const [activeMemorialId, setActiveMemorialId] = useState('mem-sonya');
  const [tributeText, setTributeText] = useState('');
  const [litCandles, setLitCandles] = useState({});

  const activeMemorial = memorials.find(m => m.id === activeMemorialId) || memorials[0];

  const handleLightCandle = (memorialId) => {
    if (litCandles[memorialId]) {
      showToast('You have already lit a memorial candle for this soul.', 'info');
      return;
    }

    setLitCandles(prev => ({ ...prev, [memorialId]: true }));
    setMemorials(memorials.map(m => {
      if (m.id === memorialId) {
        return { ...m, candlesLit: m.candlesLit + 1 };
      }
      return m;
    }));

    confetti({
      particleCount: 50,
      spread: 70,
      colors: ['#fbbf24', '#f59e0b', '#ef4444', '#ffffff'],
      origin: { y: 0.7 }
    });
    showToast('A memorial candle has been lit in eternal memory.', 'success');
  };

  const handleAddTribute = (e) => {
    e.preventDefault();
    if (!tributeText.trim()) return;

    const newNote = {
      author: currentUser.name,
      text: tributeText.trim(),
      date: 'Just now'
    };

    setMemorials(memorials.map(m => {
      if (m.id === activeMemorialId) {
        return {
          ...m,
          communityNotes: [newNote, ...(m.communityNotes || [])]
        };
      }
      return m;
    }));

    setTributeText('');
    showToast('Your tribute note has been added to the memorial wall.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 rounded-2xl p-6 border border-amber-900/40 shadow-xl text-center space-y-2">
        <div className="inline-flex items-center space-x-2 text-amber-400">
          <Flame className="w-5 h-5 fill-amber-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">Community Sanctuary Wall</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          In Eternal Remembrance: Never Forgotten, Forever Honored
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A sacred community space to light memorial candles, leave words of solace for surviving families, and honor the souls stolen by police violence.
        </p>
      </div>

      {/* Memorial Cards Carousel / Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {memorials.map(mem => {
          const isSelected = activeMemorialId === mem.id;
          const isLit = litCandles[mem.id];
          return (
            <div
              key={mem.id}
              onClick={() => setActiveMemorialId(mem.id)}
              className={`rounded-2xl p-3 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-amber-500 shadow-glow'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="relative rounded-xl overflow-hidden h-28">
                  <img src={mem.image} alt={mem.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  {isLit && (
                    <span className="absolute top-2 right-2 p-1 rounded-full bg-amber-950/90 border border-amber-500 text-amber-400">
                      <Flame className="w-3.5 h-3.5 fill-amber-400 animate-bounce" />
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 truncate">{mem.name}</h4>
                  <p className="text-[10px] text-slate-400">{mem.years}</p>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                <span className="text-amber-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-400" /> {mem.candlesLit.toLocaleString()}
                </span>
                <span className="text-slate-500">Candles</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Memorial Spotlight View */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animation-fade-in">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={activeMemorial.image}
            alt={activeMemorial.name}
            className="w-full md:w-60 h-64 rounded-2xl object-cover border border-slate-700 shadow-2xl"
          />

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 font-mono">
                  {activeMemorial.location}
                </span>
                <span className="text-xs font-mono text-slate-400">{activeMemorial.years}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                {activeMemorial.name}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {activeMemorial.tribute}
              </p>
            </div>

            {/* Quoted remembrance */}
            {activeMemorial.quote && (
              <div className="p-4 bg-slate-950 rounded-2xl border-l-4 border-amber-500 text-xs italic text-amber-200/90 leading-relaxed font-sans">
                {activeMemorial.quote}
              </div>
            )}

            {/* Actions: Light Candle & Family Trust */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleLightCandle(activeMemorial.id)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  litCandles[activeMemorial.id]
                    ? 'bg-amber-950 text-amber-300 border border-amber-600 shadow-glow'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-glow'
                }`}
              >
                <Flame className={`w-4 h-4 ${litCandles[activeMemorial.id] ? 'fill-amber-300 text-amber-300 animate-pulse' : 'fill-slate-950'}`} />
                <span>
                  {litCandles[activeMemorial.id] ? `Candle Lit for ${activeMemorial.name}` : `Light a Candle (${activeMemorial.candlesLit.toLocaleString()})`}
                </span>
              </button>

              <button
                onClick={() => onOpenDonateModal({
                  title: `${activeMemorial.name} Memorial & Family Trust`,
                  beneficiary: `Family of ${activeMemorial.name}`,
                  target: 500000,
                  raised: 412000
                })}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald flex items-center space-x-2 transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support Surviving Family Fund</span>
              </button>
            </div>
          </div>
        </div>

        {/* Community Tributes Stream & Input */}
        <div className="border-t border-slate-800 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Community Words of Remembrance ({activeMemorial.communityNotes.length})</span>
            </h4>
          </div>

          {/* Tribute Form */}
          <form onSubmit={handleAddTribute} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Leave a heartfelt word of love and solidarity for ${activeMemorial.name}'s family...`}
              value={tributeText}
              onChange={(e) => setTributeText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!tributeText.trim()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Tribute</span>
            </button>
          </form>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeMemorial.communityNotes.map((note, idx) => (
              <div key={idx} className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-200">{note.author}</span>
                  <span className="text-slate-500">{note.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{note.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
