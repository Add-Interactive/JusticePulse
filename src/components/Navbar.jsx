import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  PlusCircle, 
  Video, 
  Sparkles, 
  ChevronDown, 
  Briefcase, 
  AlertTriangle,
  Scale,
  Users,
  CheckCircle,
  FileText,
  Play,
  Menu,
  X,
  Layers
} from 'lucide-react';

export default function Navbar({ 
  onOpenReportModal, 
  onOpenSOSModal, 
  onOpenInvestorModal, 
  onOpenEvidenceSuite,
  onReplaySplash,
  onOpenMobileMenu,
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  currentUser, 
  setCurrentUser, 
  notifications, 
  onNotificationClick 
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);

  const availableRoles = [
    { name: 'Dr. Kimberly Adams', role: 'Civil Rights Advocate', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', badge: 'Verified Organizer' },
    { name: 'Attorney Marcus Vance', role: 'Civil Rights Litigator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', badge: 'Bar Verified' },
    { name: 'Elena Rostova', role: 'Eyewitness & Community Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', badge: 'Community Hero' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Breaking Alert Banner */}
      <div className="bg-gradient-to-r from-crimson-900/90 via-slate-900 to-crimson-950 px-3 sm:px-4 py-1.5 text-xs text-slate-200 border-b border-crimson-800/40 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-red-400 uppercase tracking-wider text-[10px] bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/50 flex-shrink-0">
            Alert
          </span>
          <span className="truncate text-[11px] sm:text-xs">
            Illinois State Board opens inquiry into Sangamon Sheriff hiring records bypass.
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-[11px] text-slate-400 flex-shrink-0">
          <button 
            onClick={onReplaySplash}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-mono cursor-pointer"
            title="Replay Official Agency Splash"
          >
            <Play className="w-3 h-3 fill-amber-400" /> Replay Agency Intro
          </button>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-justice-300">
            <Scale className="w-3.5 h-3.5" /> 2,400+ Verified Cases Tracked
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Users className="w-3.5 h-3.5" /> $11.8M Mutual Aid Disbursed
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white lg:hidden border border-slate-700"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-justice-500 to-crimson-600 p-0.5 shadow-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-justice-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-justice-300 bg-clip-text text-transparent font-display">
                  JUSTICE<span className="text-justice-400">PULSE</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase px-1.5 py-0.2 bg-justice-950 text-justice-400 rounded border border-justice-800/60 hidden sm:inline-block">
                  Civic Hub
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 tracking-tight font-medium hidden md:block">
                Accountability Matrix & Community Sanctuary
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar on Desktop */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cases, badge #, officer registry, or legal dockets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-full pl-10 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-justice-400 focus:ring-2 focus:ring-justice-500/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions & User Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 md:hidden border border-slate-700"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Direct Launch Evidence Command Suite Window */}
          <button
            onClick={onOpenEvidenceSuite}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-glow border border-indigo-400/40 transition-all active:scale-95"
            title="Open Dedicated Full-Screen Evidence Command Center"
          >
            <Layers className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Evidence Matrix</span>
            <span className="sm:hidden text-[11px]">Matrix</span>
          </button>

          {/* Quick SOS Encounter Mode on Navbar */}
          <button
            onClick={onOpenSOSModal}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-crimson-600/90 hover:bg-crimson-500 text-white text-xs font-bold shadow-glow-crimson transition-all active:scale-95"
            title="Immediate live cloud audio/video backup with geo-tagged legal alert"
          >
            <Video className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">SOS Mode</span>
            <span className="sm:hidden text-[11px]">SOS</span>
          </button>

          {/* Report Incident CTA */}
          <button
            onClick={onOpenReportModal}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-justice-600 hover:bg-justice-500 text-white text-xs font-semibold shadow-glow transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 relative border border-slate-700 transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animation-fade-in">
                <div className="px-4 py-3 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-justice-400" />
                    <span className="font-semibold text-xs text-white">Live Docket & Network Alerts</span>
                  </div>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    {notifications.length} New
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => {
                        onNotificationClick(notif);
                        setShowNotifications(false);
                      }}
                      className="p-3 hover:bg-slate-800/60 cursor-pointer transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white leading-tight">{notif.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">{notif.desc}</p>
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
              className="flex items-center space-x-2 p-1 pl-1.5 sm:pl-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-justice-400"
              />
              <span className="text-xs font-medium text-slate-200 hidden lg:inline max-w-[120px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 space-y-1 animation-fade-in">
                <div className="p-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-justice-400 font-mono">{currentUser.role} • {currentUser.badge}</p>
                </div>
                <div className="pt-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 font-mono">Switch Civic Persona:</p>
                  {availableRoles.map((role, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentUser(role);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-colors ${
                        currentUser.name === role.name 
                          ? 'bg-justice-950 text-justice-300 font-bold border border-justice-800' 
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <img src={role.avatar} alt={role.name} className="w-5 h-5 rounded-full object-cover" />
                      <div className="truncate">
                        <p className="truncate leading-tight">{role.name}</p>
                        <p className="text-[9px] text-slate-400 truncate">{role.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {isSearchOpenMobile && (
        <div className="p-3 bg-slate-950 border-t border-slate-800 md:hidden animation-fade-in">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cases, badge numbers, or dockets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-justice-400"
            />
          </div>
        </div>
      )}
    </header>
  );
}
