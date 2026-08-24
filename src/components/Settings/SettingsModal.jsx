import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Type, 
  Sliders, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Smartphone,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { platformThemes } from '../../data/themesData';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  currentTheme, 
  setCurrentTheme, 
  fontSizeScale, 
  setFontSizeScale, 
  isHighContrast, 
  setIsHighContrast,
  isFocusMode,
  setIsFocusMode,
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('themes'); // 'themes' | 'typography' | 'accessibility'

  if (!isOpen) return null;

  const handleSelectTheme = (themeId, themeName) => {
    setCurrentTheme(themeId);
    localStorage.setItem('justice_pulse_theme', themeId);
    confetti({ particleCount: 35, spread: 60 });
    showToast(`Visual Theme activated: ${themeName}`, 'success');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animation-fade-in select-none"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111726] border-2 border-[#243147] rounded-3xl w-full max-w-2xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#080c14] via-[#111726] to-[#080c14] border-b border-[#1c273a] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-glow flex items-center justify-center">
              <div className="w-full h-full bg-[#080c14] rounded-[14px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white font-display">
                Visual Theme & Accessibility Center
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                10 Curated Visual Modes • Font Zooming • High-Contrast WCAG
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 bg-[#080c14] border-b border-[#1c273a] flex space-x-2 overflow-x-auto flex-shrink-0">
          {[
            { id: 'themes', label: '🎨 10 Visual Themes', count: '10' },
            { id: 'typography', label: '🔤 Font Zoom & Density', count: fontSizeScale.toUpperCase() },
            { id: 'accessibility', label: '🛡️ High-Visibility Controls', count: 'AAA' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-t border-x ${
                activeTab === tab.id
                  ? 'bg-[#111726] text-white border-[#243147] border-b-transparent shadow-glow'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: 10 VISUAL THEME SELECTOR */}
          {activeTab === 'themes' && (
            <div className="space-y-4 animation-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Select Platform Theme ({platformThemes.length} Styles)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Switch between daylight sunlight modes, rich mahogany courtrooms, emerald sanctuaries, and OLED obsidian.
                  </p>
                </div>
              </div>

              {/* 10 Theme Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {platformThemes.map((theme) => {
                  const isSelected = currentTheme === theme.id;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id, theme.name)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-[#1a2336] border-justice-400 shadow-glow ring-2 ring-justice-500/40 scale-[1.02]'
                          : 'bg-[#080c14] border-[#1e2a3f] hover:border-slate-600 hover:bg-[#121a2c]'
                      }`}
                    >
                      {/* Top Swatch Row & Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          {theme.swatches.map((color, idx) => (
                            <div
                              key={idx}
                              style={{ backgroundColor: color }}
                              className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                            ></div>
                          ))}
                        </div>

                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          theme.category === 'Light'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-indigo-950 text-indigo-300 border-indigo-700'
                        }`}>
                          {theme.badge}
                        </span>
                      </div>

                      {/* Theme Name & Description */}
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h5 className="text-xs font-black text-white font-display leading-tight">{theme.name}</h5>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-justice-400" />}
                        </div>
                        <p className="text-[10px] text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                          {theme.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FONT ZOOM & TYPOGRAPHY DENSITY */}
          {activeTab === 'typography' && (
            <div className="space-y-4 animation-fade-in">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Text Scaling & Reading Ergonomics
                </h4>
                <p className="text-[11px] text-slate-400">
                  Adjust interface text scale without distorting feed cards or navigation drawers.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'normal', label: 'Standard (100%)', sample: 'Aa', desc: 'Compact default' },
                  { id: 'large', label: 'Large (112%)', sample: 'Aa+', desc: 'Comfortable reading' },
                  { id: 'xlarge', label: 'Extra Large (125%)', sample: 'Aa++', desc: 'Maximum legibility' }
                ].map((scale) => {
                  const isSelected = fontSizeScale === scale.id;

                  return (
                    <button
                      key={scale.id}
                      onClick={() => {
                        setFontSizeScale(scale.id);
                        showToast(`Text scale set to ${scale.label}`, 'info');
                      }}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        isSelected
                          ? 'bg-[#1a2336] border-justice-400 shadow-glow'
                          : 'bg-[#080c14] border-[#1e2a3f] hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl font-black text-white block mb-1">{scale.sample}</span>
                      <span className="text-xs font-bold text-slate-200 block">{scale.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{scale.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ACCESSIBILITY & HIGH-VISIBILITY */}
          {activeTab === 'accessibility' && (
            <div className="space-y-3.5 animation-fade-in text-xs">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  High-Visibility & Ergonomic Enhancements
                </h4>
                <p className="text-[11px] text-slate-400">
                  Customized controls for field viewing, direct sunlight, and single-column reading.
                </p>
              </div>

              {/* High Contrast Toggle Card */}
              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Ultra High-Contrast OLED Mode</span>
                  <span className="text-[11px] text-slate-400 block">Forces pure `#000000` background and high-visibility neon card borders.</span>
                </div>
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-xs transition-all border ${
                    isHighContrast
                      ? 'bg-amber-400 text-black border-amber-300 shadow-glow'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {isHighContrast ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Zen Focus Mode Toggle Card */}
              <div className="p-3.5 bg-[#080c14] rounded-2xl border border-[#1e2a3f] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">Zen Focus Reading Mode</span>
                  <span className="text-[11px] text-slate-400 block">Hides sidebars on desktop to present a single-column, uncluttered feed.</span>
                </div>
                <button
                  onClick={() => {
                    setIsFocusMode(!isFocusMode);
                    showToast(isFocusMode ? 'Focus mode disabled: Sidebars visible' : 'Zen Focus mode enabled: Single column view', 'info');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-xs transition-all border ${
                    isFocusMode
                      ? 'bg-justice-600 text-white border-justice-400 shadow-glow'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {isFocusMode ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-[#080c14] border-t border-[#1c273a] flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] font-mono text-slate-400">
            Selected: <strong className="text-white">{platformThemes.find(t => t.id === currentTheme)?.name || 'Midnight Navy'}</strong>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow active:scale-95"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
