import React, { useState } from 'react';
import { 
  Volume2, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Sparkles, 
  Heart, 
  FileText, 
  Clock, 
  Share2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialPodcasts } from '../../data/podcastsData';

export default function OralHistoryPlayerView({ onOpenDonateModal, showToast }) {
  const [currentEpisode, setCurrentEpisode] = useState(initialPodcasts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(124);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      showToast(`Playing "${currentEpisode.title}"`, 'info');
    }
  };

  const handleSelectEpisode = (ep) => {
    setCurrentEpisode(ep);
    setIsPlaying(true);
    setProgressSec(0);
    showToast(`Loaded: ${ep.title}`, 'info');
  };

  const formatSec = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 rounded-2xl p-6 border border-amber-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-amber-400 mb-1">
          <Volume2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">Voices of the Movement Sanctuary</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Oral Histories, Family Testimonies & Civil Rights Litigation Audios
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Preserving unedited voices, spoken memories of loved ones, and trial debriefs with leading civil rights litigators.
        </p>
      </div>

      {/* Featured Player Canvas */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative w-full md:w-52 h-52 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex-shrink-0">
            <img
              src={currentEpisode.image}
              alt={currentEpisode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <button
              onClick={togglePlay}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-glow transition-all active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
            </button>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 font-mono">
                {currentEpisode.category}
              </span>
              <span className="text-xs font-mono text-slate-400">{currentEpisode.duration} • {currentEpisode.date}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-display leading-snug">
              {currentEpisode.title}
            </h3>

            <p className="text-xs text-slate-300 font-medium">Featured Speaker: <strong className="text-slate-100">{currentEpisode.guest}</strong></p>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentEpisode.summary}
            </p>

            {/* Audio Waveform Simulator */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-amber-400 font-bold">{formatSec(progressSec)}</span>
                <span>{currentEpisode.duration}</span>
              </div>
              <div className="flex items-center space-x-1 h-8 bg-slate-950/80 p-2 rounded-xl border border-slate-800 overflow-hidden">
                {[...Array(48)].map((_, i) => {
                  const barHeight = Math.max(15, Math.sin(i * 0.4) * 80 + 20);
                  const isPast = i < (progressSec / 360) * 48;
                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all ${
                        isPast ? 'bg-amber-400' : 'bg-slate-700'
                      }`}
                      style={{ height: `${isPlaying ? Math.min(100, barHeight + (i % 3) * 10) : barHeight}%` }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Spoken Transcript Excerpt */}
        <div className="p-5 bg-slate-950 rounded-2xl border-l-4 border-amber-500 space-y-1 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5" /> Spoken Oral History Transcript Excerpt
          </span>
          <p className="italic text-slate-200 leading-relaxed font-sans text-xs">
            {currentEpisode.transcript}
          </p>
        </div>
      </div>

      {/* Episode Archive Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          All Testimonies & Legal Strategy Recordings ({initialPodcasts.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialPodcasts.map(ep => {
            const isCurrent = currentEpisode.id === ep.id;
            return (
              <div
                key={ep.id}
                onClick={() => handleSelectEpisode(ep)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 shadow-xl flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-900 border-amber-500 shadow-glow'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 font-mono">
                      {ep.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{ep.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{ep.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{ep.summary}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span className="flex items-center gap-1">
                    {isCurrent && isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isCurrent && isPlaying ? 'Now Playing' : 'Listen Recording'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
