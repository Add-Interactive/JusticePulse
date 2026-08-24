import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  PlusCircle, 
  Video, 
  Sparkles, 
  ChevronDown, 
  Scale, 
  Users, 
  CheckCircle, 
  Play, 
  Menu, 
  X, 
  Layers,
  Network,
  Command,
  Eye,
  EyeOff,
  Type,
  Maximize2,
  Minimize2,
  Sliders
} from 'lucide-react';

export default function Navbar({ 
  onOpenReportModal, 
  onOpenSOSModal, 
  onOpenInvestorModal, 
  onOpenEvidenceSuite,
  onOpenCommandPalette,
  onReplaySplash,
  onOpenMobileMenu,
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  currentUser, 
  setCurrentUser, 
  notifications, 
  onNotificationClick,
  isHighContrast,
  setIsHighContrast,
  fontSizeScale,
  setFontSizeScale,
  isFocusMode,
  setIsFocusMode
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);

  const availableRoles = [
    { name: 'Dr. Kimberly Adams', role: 'Civil Rights Advocate', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', badge: 'Verified Organizer' },
    { name: 'Attorney Marcus Vance', role: 'Civil Rights Litigator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', badge: 'Bar Verified' },
    { name: 'Elena Rostova', role: 'Eyewitness & Community Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', badge: 'Community Hero' }
  ];

  const toggleFontSize = () => {
    if (fontSizeScale === 'normal') setFontSizeScale('large');
    else if (fontSizeScale === 'large') setFontSizeScale('xlarge');
    else setFontSizeScale('normal');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c101c]/98 backdrop-blur-md border-b-2 border-[#243147] shadow-xl">
      {/* Top Banner with Direct Evidence Platform Launcher & Visual Quick Controls */}
      <div className="bg-gradient-to-r from-indigo-950 via-[#0c101c] to-indigo-950 px-3 sm:px-4 py-1.5 text-xs text-slate-200 border-b border-indigo-800/60 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] bg-indigo-900/90 px-2 py-0.5 rounded-md border border-indigo-700 font-mono flex-shrink-0">
            FBI-GRADE FORENSICS
          </span>
          <span className="truncate text-[11px] sm:text-xs text-slate-200 font-medium">
            Detective Whiteboard, Multi-Angle Studio & SHA-256 Vault ready.
          </span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-[11px] flex-shrink-0">
          {/* Quick High Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all border ${
              isHighContrast
                ? 'bg-amber-400 text-black border-amber-300 shadow-glow'
                : 'bg-[#111726] text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
            title="Toggle Ultra High Contrast OLED Mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{isHighContrast ? 'Contrast: HIGH' : 'High Contrast'}</span>
          </button>

          {/* Quick Font Size Toggle */}
          <button
            onClick={toggleFontSize}
            className="px-2 py-1 bg-[#111726] hover:bg-[#1c273a] text-slate-300 border border-slate-700 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all"
            title="Cycle Font Size: 100% / 115% / 125%"
          >
            <Type className="w-3 h-3 text-indigo-400" />
            <span>{fontSizeScale === 'normal' ? 'Text: 100%' : fontSizeScale === 'large' ? 'Text: 115%' : 'Text: 125%'}</span>
          </button>

          <button
            onClick={onOpenEvidenceSuite}
            className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-lg shadow-glow-indigo border border-indigo-300 animate-pulse transition-all"
            title="Launch Standalone Full-Screen Evidence Command Platform"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider font-mono text-[10px] hidden sm:inline">Launch Evidence Platform ➔</span>
            <span className="uppercase tracking-wider font-mono text-[10px] sm:hidden">Evidence ➔</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-xl bg-[#111726] text-slate-200 hover:text-white lg:hidden border-2 border-slate-700"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-justice-500 to-crimson-600 p-0.5 shadow-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-justice-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-justice-300 bg-clip-text text-transparent font-display">
                  JUSTICE<span className="text-justice-400">PULSE</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 bg-justice-950 text-justice-300 rounded-full border border-justice-700 hidden sm:inline-block">
                  Civic Hub
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 tracking-tight font-medium hidden md:block">
                Accountability Matrix & Community Sanctuary
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar & Command Palette Trigger on Desktop */}
        <div className="flex-1 max-w-md hidden md:block">
          <div 
            onClick={onOpenCommandPalette}
            className="relative cursor-pointer group"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-hover:text-indigo-400 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search cases, tools, dockets... (Ctrl + K)"
              value={searchQuery}
              className="w-full bg-[#080c14] border-2 border-[#243147] rounded-full pl-10 pr-20 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none group-hover:border-indigo-500 cursor-pointer transition-all shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <kbd className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#111726] text-slate-300 rounded-md border border-slate-700">
                Ctrl K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Master Top Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Mobile Search Toggle */}
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-xl bg-[#111726] hover:bg-slate-800 text-slate-200 md:hidden border-2 border-slate-700"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* MAIN UNIFIED EVIDENCE SYSTEM BUTTON AT THE TOP */}
          <button
            onClick={onOpenEvidenceSuite}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black shadow-glow-indigo border-2 border-indigo-300 transition-all active:scale-95 group ring-2 ring-indigo-500/40"
            title="Open Dedicated Full-Screen FBI Evidence System Platform"
          >
            <Network className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-wide font-mono leading-tight">
                EVIDENCE SYSTEM
              </div>
              <div className="text-[8px] text-indigo-200 font-mono leading-none hidden sm:block">
                STANDALONE PLATFORM
              </div>
            </div>
          </button>

          {/* Quick SOS Encounter Mode on Navbar */}
          <button
            onClick={onOpenSOSModal}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white text-xs font-black shadow-glow-crimson transition-all active:scale-95 border-2 border-crimson-400"
            title="Immediate live cloud audio/video backup with geo-tagged legal alert"
          >
            <Video className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">SOS Live</span>
            <span className="sm:hidden text-[11px]">SOS</span>
          </button>

          {/* Report Incident CTA */}
          <button
            onClick={onOpenReportModal}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-justice-600 hover:bg-justice-500 text-white text-xs font-bold shadow-glow border border-justice-400 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-[#111726] hover:bg-slate-800 text-slate-200 relative border-2 border-slate-700 transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111726] border-2 border-[#243147] rounded-3xl shadow-2xl p-4 space-y-3 z-50 animation-fade-in">
                <div className="flex items-center justify-between border-b border-[#1c273a] pb-2">
                  <div className="flex items-center space-x-1.5">
                    <Bell className="w-4 h-4 text-justice-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Incident Feed Alerts</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Live Sync</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onNotificationClick(n);
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-[#080c14] hover:bg-[#182238] border border-[#1e2a3f] cursor-pointer transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 border-2 border-slate-700 transition-all bg-[#111726]"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-justice-400"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Persona Switcher Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#111726] border-2 border-[#243147] rounded-3xl shadow-2xl p-3 space-y-2 z-50 animation-fade-in">
                <div className="px-2 py-1 border-b border-[#1c273a]">
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-justice-400 font-mono">{currentUser.role}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 font-mono">
                    Switch Test Persona
                  </span>
                  {availableRoles.map((role, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentUser(role);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl flex items-center space-x-2 text-xs transition-colors border ${
                        currentUser.name === role.name 
                          ? 'bg-justice-950 text-justice-300 font-bold border-justice-700' 
                          : 'bg-[#080c14] text-slate-300 border-[#1e2a3f] hover:bg-[#182238]'
                      }`}
                    >
                      <img src={role.avatar} alt={role.name} className="w-6 h-6 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="truncate leading-tight">{role.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{role.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
