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
  Sliders,
  Palette,
  UserCheck,
  LogIn,
  LogOut,
  Briefcase
} from 'lucide-react';
import { sampleUserPersonas } from '../data/rolesData';

export default function Navbar({ 
  onOpenReportModal, 
  onOpenSOSModal, 
  onOpenInvestorModal, 
  onOpenEvidenceSuite,
  onOpenCommandPalette,
  onOpenSettingsModal,
  onOpenAuthModal,
  onReplaySplash,
  onOpenMobileMenu,
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  currentUser, 
  setCurrentUser, 
  isAuthenticated,
  onLogout,
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

  return (
    <header className="sticky top-0 z-40 bg-[#0c101c]/98 backdrop-blur-md border-b-2 border-[#243147] shadow-xl select-none">
      {/* Top Banner with Direct Evidence Platform Launcher & Visual Quick Controls */}
      <div className="bg-gradient-to-r from-indigo-950 via-[#0c101c] to-indigo-950 px-3 sm:px-4 py-1 text-xs text-slate-200 border-b border-indigo-800/60 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="font-bold text-indigo-300 uppercase tracking-wider text-[9px] sm:text-[10px] bg-indigo-900/90 px-2 py-0.5 rounded-md border border-indigo-700 font-mono flex-shrink-0">
            FBI-GRADE FORENSICS
          </span>
          <span className="truncate text-[10.5px] sm:text-xs text-slate-200 font-medium hidden sm:inline">
            Detective Whiteboard, Multi-Angle Studio, My Cases &amp; SHA-256 Vault.
          </span>
          <span className="truncate text-[10.5px] text-slate-200 font-medium sm:hidden">
            Evidence Suite Ready
          </span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 text-[11px] flex-shrink-0">
          {/* Quick Settings & Themes Button */}
          <button
            onClick={onOpenSettingsModal}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#111726] hover:bg-[#1c273a] text-slate-200 hover:text-white border-2 border-slate-700 rounded-lg text-[9.5px] sm:text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Open Visual Themes (10 Styles) & Accessibility Settings"
          >
            <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">10 Themes</span>
            <span className="sm:hidden">Themes</span>
          </button>

          <button
            onClick={() => setActiveTab('ice_shield')}
            className="flex items-center space-x-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-crimson-600 to-pink-600 hover:from-crimson-500 hover:to-pink-500 text-white font-black rounded-lg shadow-glow-crimson border border-crimson-400 transition-all active:scale-95"
            title="Launch Standalone Full-Screen ICE & Tactical Encounter Shield"
          >
            <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="uppercase tracking-wider font-mono text-[9.5px] sm:text-[10px]">ICE Shield ➔</span>
          </button>

          <button
            onClick={onOpenEvidenceSuite}
            className="flex items-center space-x-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-lg shadow-glow-indigo border border-indigo-300 transition-all"
            title="Launch Standalone Full-Screen Evidence Command Platform"
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="uppercase tracking-wider font-mono text-[9.5px] sm:text-[10px]">Evidence ➔</span>
          </button>
        </div>
      </div>

      {/* Row 1: Brand Logo, Fast SOS, Alerts & Fully Visible Profile Avatar */}
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 h-13 sm:h-15 py-1.5 flex items-center justify-between gap-2">
        {/* Left: Hamburger Menu & Brand Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-xl bg-[#111726] text-slate-200 hover:text-white lg:hidden border-2 border-slate-700 active:scale-95"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-justice-500 to-crimson-600 p-0.5 shadow-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-justice-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-black text-sm sm:text-lg tracking-tight text-white">
                  JUSTICE<span className="text-justice-400">PULSE</span>
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded bg-justice-950 text-justice-300 border border-justice-800 font-bold hidden sm:inline">
                  CIVIC HUB
                </span>
              </div>
              <p className="text-[9.5px] text-slate-400 font-mono hidden md:block leading-none">
                National Police Accountability Matrix
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: SOS Button, Report Button, Alerts Bell & Profile (ALWAYS ON SCREEN) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 flex-shrink-0">
          {/* Quick SOS Button */}
          <button
            onClick={onOpenSOSModal}
            className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white text-xs font-black shadow-glow-crimson border border-crimson-400 active:scale-95 transition-all flex-shrink-0"
            title="Immediate SOS Encounter Mode & Cloud Witness Recording"
          >
            <Video className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-mono text-xs">SOS</span>
          </button>

          {/* Quick Report Button (Desktop) */}
          <button
            onClick={onOpenReportModal}
            className="hidden xl:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all flex-shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5 text-justice-400" />
            <span>Report</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 rounded-xl bg-[#111726] hover:bg-[#1a243b] text-slate-300 hover:text-white border-2 border-slate-700 relative transition-all active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-crimson-500 rounded-full animate-ping"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-88 bg-[#111726] border-2 border-[#243147] rounded-2xl shadow-2xl p-3 z-50 animation-fade-in space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#1c273a]">
                  <span className="text-xs font-bold text-white font-mono uppercase">
                    Alerts ({notifications.length})
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">LIVE BRADY STREAM</span>
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onNotificationClick(n);
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-[#080c14] hover:bg-[#162035] cursor-pointer transition-all border border-[#1e2a3f] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Persona & Role Authentication Button (ALWAYS 100% VISIBLE ON SCREEN) */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1.5 sm:space-x-2 p-1 sm:p-1.5 rounded-2xl bg-[#111726] hover:bg-[#1a243b] border-2 border-[#243147] hover:border-justice-500/80 transition-all active:scale-95 shadow-md"
              title="Click to Switch Role Persona or Sign In"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border border-justice-400 flex-shrink-0"
              />
              <div className="text-left hidden lg:block pr-1 max-w-[130px]">
                <p className="text-xs font-bold text-white leading-tight truncate">
                  {currentUser.name}
                </p>
                <p className="text-[9px] text-justice-300 font-mono truncate">
                  {currentUser.role}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#111726] border-2 border-[#243147] rounded-2xl shadow-2xl p-3 z-50 animation-fade-in space-y-3">
                <div className="p-2.5 rounded-xl bg-[#080c14] border border-[#1e2a3f] space-y-1">
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-justice-300 font-mono font-bold">{currentUser.role}</p>
                  {currentUser.primaryCaseNumber && (
                    <p className="text-[9px] text-slate-400 font-mono">Docket: {currentUser.primaryCaseNumber}</p>
                  )}
                  {currentUser.barNumber && currentUser.barNumber !== 'N/A' && (
                    <p className="text-[9px] text-amber-300 font-mono">Bar ID: {currentUser.barNumber}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onOpenAuthModal('login');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-[#080c14] hover:bg-[#162035] text-xs text-white font-bold flex items-center justify-between transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Switch Role Persona</span>
                    </span>
                    <span className="text-[9px] text-justice-400 font-mono">9 Roles</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-[#080c14] hover:bg-[#162035] text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <span>View My Civic Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-[#080c14] hover:bg-[#162035] text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Scale className="w-3.5 h-3.5 text-sky-400" />
                    <span>Public Home Showcase</span>
                  </button>

                  <button
                    onClick={() => {
                      onReplaySplash();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-[#080c14] hover:bg-[#162035] text-xs text-slate-300 hover:text-white font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 text-amber-400" />
                    <span>Replay Splash Intro</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Dedicated Clean Search Row (Full-Width on Mobile/Tablet & Desktop) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-2 pt-0.5">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search officer badges, case dockets, FOIA archives, state laws..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080c14] border-2 border-[#243147] rounded-2xl pl-9 pr-14 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-justice-500 focus:ring-1 focus:ring-justice-500 shadow-inner font-medium"
          />
          <button
            onClick={onOpenCommandPalette}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-white shadow-sm"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-3 h-3 text-justice-400" />
            <span className="hidden sm:inline">Ctrl+K</span>
            <span className="sm:hidden">K</span>
          </button>
        </div>
      </div>
    </header>
  );
}
