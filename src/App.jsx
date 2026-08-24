import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import MobileBottomBar from './components/Navigation/MobileBottomBar';
import MobileNavDrawer from './components/Navigation/MobileNavDrawer';
import FeedView from './components/Feed/FeedView';
import CreatePostModal from './components/Feed/CreatePostModal';
import CasesView from './components/Cases/CasesView';
import CaseDetailModal from './components/Cases/CaseDetailModal';
import ReportIncidentModal from './components/Cases/ReportIncidentModal';
import OfficerDirectoryView from './components/Officers/OfficerDirectoryView';
import SupportHubView from './components/Support/SupportHubView';
import DonateModal from './components/Support/DonateModal';
import RightsGuideView from './components/RightsGuide/RightsGuideView';
import EmergencyRecorderModal from './components/RightsGuide/EmergencyRecorderModal';
import NationalAnalyticsView from './components/Analytics/NationalAnalyticsView';
import UnifiedEvidenceDashboard from './components/EvidenceSuite/UnifiedEvidenceDashboard';
import InvestorPitchModal from './components/Investor/InvestorPitchModal';
import StateHeatmapView from './components/Map/StateHeatmapView';
import FOIAGeneratorView from './components/FOIAGenerator/FOIAGeneratorView';
import MemorialSanctuaryView from './components/Memorial/MemorialSanctuaryView';
import JusticeAIAssistant from './components/Assistant/JusticeAIAssistant';
import CopWatchRadarView from './components/CopWatch/CopWatchRadarView';
import ProfileView from './components/Profile/ProfileView';
import DepartmentScorecardsView from './components/Departments/DepartmentScorecardsView';
import EventsView from './components/Events/EventsView';
import LawLibraryView from './components/LawLibrary/LawLibraryView';
import TownhallView from './components/Townhall/TownhallView';
import BudgetSandboxView from './components/Budget/BudgetSandboxView';
import LegislationTrackerView from './components/Legislation/LegislationTrackerView';
import FieldObserverView from './components/FieldMode/FieldObserverView';
import OralHistoryPlayerView from './components/AudioHub/OralHistoryPlayerView';
import FOIATrackerView from './components/FOIATracker/FOIATrackerView';
import EmergencyNexusView from './components/EmergencyNexus/EmergencyNexusView';
import AcademyView from './components/Academy/AcademyView';
import SettlementCalculatorView from './components/SettlementCalculator/SettlementCalculatorView';
import GrandJurySimulatorView from './components/JurySimulator/GrandJurySimulatorView';
import CommandPaletteModal from './components/CommandPalette/CommandPaletteModal';
import LegalIntakeWizardModal from './components/Intake/LegalIntakeWizardModal';
import SettingsModal from './components/Settings/SettingsModal';
import SplashScreen from './components/Splash/SplashScreen';
import Toast from './components/Common/Toast';

import { initialCases } from './data/casesData';
import { initialPosts } from './data/postsData';
import { initialOfficers } from './data/officersData';

export default function App() {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // 10 Visual Themes & Accessibility State
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('justice_pulse_theme') || 'theme-midnight-navy';
  });
  const [fontSizeScale, setFontSizeScale] = useState('normal'); // 'normal' | 'large' | 'xlarge'
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEvidenceSuiteOpen, setIsEvidenceSuiteOpen] = useState(false);
  const [evidenceInitialTab, setEvidenceInitialTab] = useState('corkboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Data State
  const [cases, setCases] = useState(initialCases);
  const [posts, setPosts] = useState(initialPosts);
  const [officers, setOfficers] = useState(initialOfficers);

  // Modals State
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [isLegalIntakeOpen, setIsLegalIntakeOpen] = useState(false);
  const [donationCampaign, setDonationCampaign] = useState(null);

  // Current User Profile Persona
  const [currentUser, setCurrentUser] = useState({
    name: 'Dr. Kimberly Adams',
    role: 'Civil Rights Advocate',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Verified Organizer'
  });

  // Global Ctrl + K / Command + K Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time Notifications List
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New FOIA Bodycam Released',
      desc: '14-minute unredacted bodycam footage in Sonya Massey case verified and stamped in Evidence Vault.',
      time: '12m ago',
      type: 'foia',
      caseId: 'case-sonya-massey'
    },
    {
      id: 'notif-2',
      title: 'Florida Manslaughter Indictment',
      desc: 'Former Deputy Eddie Duran formally charged in Senior Airman Roger Fortson shooting.',
      time: '45m ago',
      type: 'legal',
      caseId: 'case-roger-fortson'
    },
    {
      id: 'notif-3',
      title: 'Federal Conviction Upheld',
      desc: 'Hankison federal civil rights conviction entered in Louisville Breonna Taylor docket.',
      time: '1h ago',
      type: 'legal',
      caseId: 'case-breonna-taylor'
    },
    {
      id: 'notif-4',
      title: 'Mutual Aid Milestone',
      desc: 'Violins for Elijah memorial sanctuary fund surpassed 84% of community goal.',
      time: '3h ago',
      type: 'comment',
      caseId: 'case-elijah-mcclain'
    }
  ]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Handlers for Feed
  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const isLiked = p.userHasLiked;
        return {
          ...p,
          userHasLiked: !isLiked,
          likesCount: isLiked ? p.likesCount - 1 : p.likesCount + 1
        };
      }
      return p;
    }));
  };

  const handleSupportPost = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          userHasSupported: true,
          supportsCount: p.supportsCount + 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: (p.commentsCount || 0) + 1,
          comments: [comment, ...(p.comments || [])]
        };
      }
      return p;
    }));
  };

  // Handlers for Cases
  const handleAddCase = (newCase) => {
    setCases([newCase, ...cases]);
    const autoPost = {
      id: `post-incident-${Date.now()}`,
      author: {
        name: currentUser.name,
        handle: `@${currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        avatar: currentUser.avatar,
        badge: currentUser.badge,
        role: currentUser.role
      },
      timestamp: 'Just now',
      type: 'INCIDENT_REPORT',
      caseTag: { id: newCase.id, title: newCase.title },
      content: `🚨 NEW INCIDENT DOCKET: "${newCase.title}" in ${newCase.location}.\n\n${newCase.summary}\n\nEvidence has been logged with cryptographic verification. Stand with the community and review the docket.`,
      likesCount: 1,
      supportsCount: 1,
      sharesCount: 0,
      commentsCount: 0,
      userHasLiked: true,
      userHasSupported: true,
      comments: []
    };
    setPosts([autoPost, ...posts]);
  };

  const handleOpenCaseDetail = (caseId) => {
    setSelectedCaseId(caseId);
  };

  const handleOpenDonateModal = (campaign) => {
    setDonationCampaign(campaign);
  };

  const handleDonateSuccess = (amount, campaignTitle) => {
    setCases(cases.map(c => {
      if (c.title.includes(campaignTitle) || campaignTitle.includes(c.victim)) {
        return {
          ...c,
          familyFundRaised: (c.familyFundRaised || 0) + amount
        };
      }
      return c;
    }));
  };

  const handleNotificationClick = (notif) => {
    if (notif.caseId) {
      setSelectedCaseId(notif.caseId);
    }
  };

  const handleOpenEvidenceSuite = (subTab = 'corkboard') => {
    setEvidenceInitialTab(subTab);
    setIsEvidenceSuiteOpen(true);
  };

  const selectedCaseData = cases.find(c => c.id === selectedCaseId);

  const fontScaleClass = 
    fontSizeScale === 'large' 
      ? 'font-scale-large' 
      : fontSizeScale === 'xlarge' 
      ? 'font-scale-xlarge' 
      : 'font-scale-normal';

  return (
    <div className={`min-h-screen flex flex-col selection:bg-justice-500 selection:text-white transition-colors duration-200 ${currentTheme} ${isHighContrast ? 'high-contrast-mode' : ''} ${fontScaleClass}`}>
      {/* Official Agency Splash Loading Screen with Theme Synchronization */}
      {showSplash && (
        <SplashScreen 
          onFinish={() => setShowSplash(false)} 
          currentTheme={currentTheme}
          isHighContrast={isHighContrast}
        />
      )}

      {/* STANDALONE UNCONSTRAINED FULL-SCREEN EVIDENCE COMMAND SUITE ENTITY WITH THEMES */}
      {isEvidenceSuiteOpen && (
        <UnifiedEvidenceDashboard
          onClose={() => {
            setIsEvidenceSuiteOpen(false);
          }}
          showToast={showToast}
          onOpenCaseDetail={handleOpenCaseDetail}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          currentTheme={currentTheme}
          isHighContrast={isHighContrast}
          fontSizeScale={fontSizeScale}
          initialSubTab={evidenceInitialTab}
        />
      )}

      {/* Global Navbar with Settings & Themes Trigger */}
      <Navbar
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
        onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
        onOpenEvidenceSuite={() => handleOpenEvidenceSuite('corkboard')}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onReplaySplash={() => setShowSplash(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        fontSizeScale={fontSizeScale}
        setFontSizeScale={setFontSizeScale}
        isFocusMode={isFocusMode}
        setIsFocusMode={setIsFocusMode}
      />

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex gap-6 pb-24 lg:pb-8">
        {/* Left Sidebar on Desktop */}
        {!isFocusMode && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              if (tab === 'investor') {
                setIsInvestorModalOpen(true);
              } else {
                setActiveTab(tab);
              }
            }}
          />
        )}

        {/* Center Main View Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'feed' && (
            <FeedView
              posts={posts}
              onLike={handleLikePost}
              onSupport={handleSupportPost}
              onAddComment={handleAddComment}
              onOpenCreatePost={() => setIsCreatePostOpen(true)}
              onOpenCaseDetail={handleOpenCaseDetail}
              onOpenDonateModal={handleOpenDonateModal}
              currentUser={currentUser}
              showToast={showToast}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'townhall' && (
            <TownhallView
              currentUser={currentUser}
              showToast={showToast}
            />
          )}

          {activeTab === 'nexus' && (
            <EmergencyNexusView
              showToast={showToast}
            />
          )}

          {activeTab === 'academy' && (
            <AcademyView
              currentUser={currentUser}
              showToast={showToast}
            />
          )}

          {activeTab === 'jury_simulator' && (
            <GrandJurySimulatorView
              showToast={showToast}
            />
          )}

          {activeTab === 'settlement_calc' && (
            <SettlementCalculatorView
              showToast={showToast}
            />
          )}

          {activeTab === 'audiohub' && (
            <OralHistoryPlayerView
              onOpenDonateModal={handleOpenDonateModal}
              showToast={showToast}
            />
          )}

          {activeTab === 'events' && (
            <EventsView
              currentUser={currentUser}
              showToast={showToast}
            />
          )}

          {activeTab === 'legislation' && (
            <LegislationTrackerView
              currentUser={currentUser}
              showToast={showToast}
            />
          )}

          {activeTab === 'cases' && (
            <CasesView
              cases={cases}
              onSelectCase={handleOpenCaseDetail}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'officers' && (
            <OfficerDirectoryView
              officers={officers}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenCaseDetail={handleOpenCaseDetail}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentScorecardsView
              showToast={showToast}
            />
          )}

          {activeTab === 'copwatch' && (
            <CopWatchRadarView
              onOpenSOSModal={() => setIsSOSModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'fieldmode' && (
            <FieldObserverView
              onOpenSOSModal={() => setIsSOSModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'map' && (
            <StateHeatmapView
              onOpenCaseDetail={handleOpenCaseDetail}
              showToast={showToast}
            />
          )}

          {activeTab === 'foia' && (
            <FOIAGeneratorView
              showToast={showToast}
            />
          )}

          {activeTab === 'foiatracker' && (
            <FOIATrackerView
              showToast={showToast}
            />
          )}

          {activeTab === 'lawlibrary' && (
            <LawLibraryView
              showToast={showToast}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetSandboxView
              showToast={showToast}
            />
          )}

          {activeTab === 'support' && (
            <SupportHubView
              onOpenDonateModal={handleOpenDonateModal}
              showToast={showToast}
            />
          )}

          {activeTab === 'memorial' && (
            <MemorialSanctuaryView
              onOpenDonateModal={handleOpenDonateModal}
              showToast={showToast}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'rights' && (
            <RightsGuideView
              onOpenSOSModal={() => setIsSOSModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              showToast={showToast}
              onOpenCaseDetail={handleOpenCaseDetail}
            />
          )}

          {activeTab === 'assistant' && (
            <JusticeAIAssistant
              showToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <NationalAnalyticsView
              showToast={showToast}
            />
          )}
        </div>

        {/* Right Sidebar Widgets on Desktop */}
        {!isFocusMode && (
          <RightSidebar
            onOpenCaseDetail={handleOpenCaseDetail}
            onOpenDonateModal={handleOpenDonateModal}
            onSelectTab={setActiveTab}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
      />

      {/* Mobile Bottom Floating Touch Navigation */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Full Slide-Over Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
        onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
        onOpenEvidenceSuite={() => handleOpenEvidenceSuite('corkboard')}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Settings & 10 Visual Themes Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        fontSizeScale={fontSizeScale}
        setFontSizeScale={setFontSizeScale}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isFocusMode={isFocusMode}
        setIsFocusMode={setIsFocusMode}
        showToast={showToast}
      />

      {/* Global Modals */}
      {selectedCaseData && (
        <CaseDetailModal
          caseData={selectedCaseData}
          onClose={() => setSelectedCaseId(null)}
          onOpenDonateModal={handleOpenDonateModal}
          onOpenEvidenceSuite={() => handleOpenEvidenceSuite('corkboard')}
          onOpenGrandJury={() => setActiveTab('jury_simulator')}
          showToast={showToast}
        />
      )}

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
        onOpenEvidenceSuite={(subTab) => handleOpenEvidenceSuite(subTab)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onAddPost={handleAddPost}
        currentUser={currentUser}
        cases={cases}
        showToast={showToast}
      />

      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onAddCase={handleAddCase}
        showToast={showToast}
      />

      <EmergencyRecorderModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        showToast={showToast}
      />

      <DonateModal
        isOpen={!!donationCampaign}
        onClose={() => setDonationCampaign(null)}
        campaign={donationCampaign}
        onDonateSuccess={handleDonateSuccess}
        showToast={showToast}
      />

      <InvestorPitchModal
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        showToast={showToast}
      />

      <LegalIntakeWizardModal
        isOpen={isLegalIntakeOpen}
        onClose={() => setIsLegalIntakeOpen(false)}
        showToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
