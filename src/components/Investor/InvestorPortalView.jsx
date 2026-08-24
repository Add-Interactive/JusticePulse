import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Scale, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Target, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Calendar, 
  Building2, 
  FolderLock, 
  HeartHandshake, 
  GraduationCap, 
  Layers, 
  BarChart3, 
  PieChart, 
  Calculator, 
  ArrowRight,
  ExternalLink,
  Lock,
  FileText,
  Mail,
  Zap,
  Globe,
  Award,
  MapPin,
  Clock,
  Server,
  Cpu,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INVESTOR_PORTAL_DATA } from '../../data/investorPortalData';

export default function InvestorPortalView({ showToast, onOpenEvidenceSuite }) {
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'tiers' | 'monetization' | 'marketplace' | 'projections' | 'ask'
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [selectedPhaseId, setSelectedPhaseId] = useState('phase-1');
  
  // Interactive Financial Calculator Sliders
  const [firmSubscribers, setFirmSubscribers] = useState(1200);
  const [govContracts, setGovContracts] = useState(75);
  const [avgCaseProcessingPerMonth, setAvgCaseProcessingPerMonth] = useState(350);

  // Interactive Burn / Headcount Slider for Roadmap
  const [engineeringTeamSize, setEngineeringTeamSize] = useState(8);

  // Financial Calculations
  const firmAnnualRev = firmSubscribers * (billingCycle === 'annual' ? 479 * 12 : 599 * 12);
  const govAnnualRev = govContracts * 48000;
  const processingAnnualRev = avgCaseProcessingPerMonth * 12 * 850;
  const totalCalculatedARR = firmAnnualRev + govAnnualRev + processingAnnualRev;
  const estimatedValuation = totalCalculatedARR * 12; // 12x ARR multiple for high-growth vertical SaaS

  const selectedPhase = INVESTOR_PORTAL_DATA.productionRoadmap.phases.find(p => p.id === selectedPhaseId) || INVESTOR_PORTAL_DATA.productionRoadmap.phases[0];

  const handleDownloadDeck = () => {
    confetti({ particleCount: 50, spread: 70 });
    showToast('Justice Pulse Full Production Roadmap & Series Seed Deck downloaded (PDF/XLSX)!', 'success');
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    confetti({ particleCount: 40, spread: 60 });
    showToast('Partner briefing scheduled! Founder calendar invite dispatched.', 'success');
  };

  const tabs = [
    { id: 'roadmap', label: '🗺️ Production Roadmap & Cost Scaffolding', icon: Server },
    { id: 'tiers', label: '💎 Subscription Tiers & Pricing', icon: Zap },
    { id: 'monetization', label: '💰 6-Stream Revenue Engine', icon: DollarSign },
    { id: 'marketplace', label: '⚖️ Legal Services & Retainers', icon: HeartHandshake },
    { id: 'projections', label: '📈 5-Yr Projections & Calculator', icon: Calculator },
    { id: 'ask', label: '🚀 $3.5M Seed Ask & Use of Funds', icon: Target }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animation-fade-in select-none pb-16">
      {/* Top Capital & Executive Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1236] via-[#111726] to-[#080c14] border-2 border-purple-600/70 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/80 text-purple-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>INVESTOR PORTAL • FULL PRODUCTION RELEASE DASHBOARD</span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-slate-400">ROUND ASK:</span>
              <span className="px-3 py-1 rounded-xl bg-purple-900/60 border border-purple-500 text-purple-200 font-black">
                $3,500,000 SEED
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
              PRODUCTION ROADMAP &amp; <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">COST SCAFFOLDING</span> DASHBOARD
            </h1>
            <p className="text-sm sm:text-base text-purple-200/90 font-normal leading-relaxed">
              Transparent, itemized capital allocation showing exact infrastructure costs, NVIDIA AI GPU compute scaling, CJIS compliance milestones, and nationwide production release.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#080c14]/90 border border-purple-800/50 space-y-0.5">
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase block truncate">Total Seed Budget</span>
              <p className="text-xl sm:text-2xl font-black text-white font-mono">$3,500,000</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">18-Month Target Runway</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080c14]/90 border border-purple-800/50 space-y-0.5">
              <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase block truncate">Monthly Burn Rate</span>
              <p className="text-xl sm:text-2xl font-black text-indigo-300 font-mono">$194,444/mo</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Optimal Capital Velocity</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080c14]/90 border border-purple-800/50 space-y-0.5">
              <span className="text-[10px] font-mono text-pink-300 font-bold uppercase block truncate">Execution Phases</span>
              <p className="text-xl sm:text-2xl font-black text-pink-300 font-mono">5 Phases</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">Beta ➔ Federal Court Scale</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080c14]/90 border border-purple-800/50 space-y-0.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block truncate">Compliance Node</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">CJIS &amp; FRE 1006</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">FIPS 140-3 HSM Certified</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadDeck}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center space-x-2 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Production Roadmap &amp; Budget (PDF/XLSX)</span>
            </button>

            {onOpenEvidenceSuite && (
              <button
                onClick={() => onOpenEvidenceSuite('corkboard')}
                className="px-5 py-3 rounded-2xl bg-[#080c14] hover:bg-[#1a243b] text-slate-200 hover:text-white font-bold text-xs sm:text-sm border-2 border-purple-700 transition-all flex items-center space-x-2 active:scale-95"
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Test Live Working Platform</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Investor Portal Main Navigation Tabs */}
      <div className="flex space-x-2 border-b-2 border-[#243147] pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-glow'
                  : 'bg-[#111726] text-slate-300 border-[#243147] hover:border-slate-600 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FULL PRODUCTION ROADMAP & COST SCAFFOLDING                         */}
      {/* ========================================================================= */}
      {activeTab === 'roadmap' && (
        <section className="space-y-8 animation-fade-in">
          {/* Section 1.1: Visual Cost Scaffolding Matrix */}
          <div className="p-5 sm:p-8 rounded-3xl bg-[#111726] border-2 border-purple-600/70 space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-mono px-2.5 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-600 font-bold uppercase">
                  CAPITAL ALLOCATION WATERFALL
                </span>
                <span className="text-xs font-mono text-purple-300 font-bold">18-Month Burn Model</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                Where Capital &amp; Infrastructure Costs Are Deployed
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Itemized breakdown across AI compute clusters, CJIS security audits, legal engineering, and enterprise distribution
              </p>
            </div>

            {/* Stacked Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex border border-[#243147]">
                {INVESTOR_PORTAL_DATA.costScaffoldingBreakdown.map((cat, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${cat.percentage}%` }}
                    className={`h-full ${cat.color} transition-all relative group cursor-pointer`}
                    title={`${cat.category}: ${cat.allocation} (${cat.percentage}%)`}
                  ></div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>Total Series Seed: $3,500,000</span>
                <span>Runway: 18 Months to Series A ($6.0M ARR)</span>
              </div>
            </div>

            {/* Cost Allocation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {INVESTOR_PORTAL_DATA.costScaffoldingBreakdown.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#080c14] border border-[#1e2a3f] hover:border-purple-500/60 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                        <span>{cat.category}</span>
                      </span>
                      <span className="text-xs font-mono font-black text-purple-300">
                        {cat.allocation}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="pt-2 border-t border-[#1c273a] text-[10.5px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Share of Seed Ask:</span>
                    <span className="text-white font-bold">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1.2: Interactive 5-Phase Production Roadmap */}
          <div className="p-5 sm:p-8 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-6 shadow-2xl">
            <div>
              <span className="text-[9.5px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-900 text-indigo-200 border border-indigo-600 font-bold uppercase">
                5-PHASE EXECUTION TIMELINE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                Full Production Release Roadmap (Non-Demo Infrastructure)
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Click any phase below to inspect exact engineering milestones, lead roles, and scaffolding line items
              </p>
            </div>

            {/* Phase Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {INVESTOR_PORTAL_DATA.productionRoadmap.phases.map((phase) => {
                const isSelected = selectedPhaseId === phase.id;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseId(phase.id)}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-b from-purple-900/90 to-[#111726] border-purple-400 shadow-glow ring-2 ring-purple-500/40'
                        : 'bg-[#080c14] border-[#1e2a3f] hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-purple-300 font-bold">{phase.phaseNumber}</span>
                      <span className="text-slate-400">{phase.percentOfSeed}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white mt-1 leading-snug truncate">{phase.name}</h5>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{phase.budget}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Phase Deep-Dive Card */}
            <div className="p-6 rounded-3xl bg-[#080c14] border-2 border-purple-600/70 space-y-6 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c273a]">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-black text-purple-400 uppercase">
                      {selectedPhase.phaseNumber} • {selectedPhase.timeline}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${selectedPhase.statusColor}`}>
                      {selectedPhase.status}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white">{selectedPhase.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Accountability Lead: <span className="text-purple-300 font-bold">{selectedPhase.lead}</span>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#111726] border border-purple-800/60 text-right flex-shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Phase Budget</span>
                  <span className="text-xl font-black text-white font-mono">{selectedPhase.budget}</span>
                  <span className="text-[10px] text-purple-300 font-mono block">({selectedPhase.percentOfSeed} of Seed)</span>
                </div>
              </div>

              {/* Deliverables & Cost Scaffolding 2-Column Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Key Deliverables Checklist (6 Cols) */}
                <div className="lg:col-span-6 space-y-3">
                  <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Key Engineering Scaffolding Deliverables</span>
                  </h5>

                  <div className="space-y-2">
                    {selectedPhase.keyDeliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="p-3 rounded-xl bg-[#111726] border border-[#1e2a3f] flex items-start space-x-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Itemized Cost Line Items (6 Cols) */}
                <div className="lg:col-span-6 space-y-3">
                  <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    <span>Itemized Cost Scaffolding Line Items</span>
                  </h5>

                  <div className="space-y-2">
                    {selectedPhase.costScaffolding.map((item, iIdx) => (
                      <div key={iIdx} className="p-3 rounded-xl bg-[#111726] border border-[#1e2a3f] flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 font-medium">{item.item}</span>
                        <span className="text-purple-300 font-black flex-shrink-0 ml-2">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SUBSCRIPTION TIERS & PRICING MATRIX                                */}
      {/* ========================================================================= */}
      {activeTab === 'tiers' && (
        <section className="space-y-6 animation-fade-in">
          {/* Billing Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#111726] border-2 border-[#243147]">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Multi-Tiered SaaS Monetization Structure
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Flexible seat-based subscriptions targeting solo trial counsel, litigation firms, and municipal review boards
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-[#080c14] p-1 rounded-xl border border-[#243147] text-xs font-mono">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black text-[9px]">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INVESTOR_PORTAL_DATA.subscriptionTiers.map((tier) => {
              const price = billingCycle === 'annual' ? tier.priceAnnual : tier.priceMonthly;

              return (
                <div
                  key={tier.id}
                  className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all relative ${
                    tier.popular
                      ? 'bg-gradient-to-b from-[#1c1236] to-[#111726] border-2 border-purple-500 ring-2 ring-purple-500/40 shadow-2xl transform lg:-translate-y-2'
                      : 'bg-[#111726] border-2 border-[#243147] hover:border-purple-500/50 shadow-xl'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9.5px] font-mono font-black uppercase tracking-wider shadow-md">
                      MOST POPULAR FOR TRIAL COUNSEL
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded font-bold uppercase ${tier.badgeColor}`}>
                        {tier.badge}
                      </span>
                      <h4 className="text-lg font-black text-white mt-1.5 leading-tight">{tier.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{tier.target}</p>
                    </div>

                    {/* Price Header */}
                    <div className="p-3.5 rounded-2xl bg-[#080c14] border border-[#1e2a3f]">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-black text-white font-mono">
                          {price === 0 ? 'FREE' : `$${price}`}
                        </span>
                        {price > 0 && (
                          <span className="text-xs font-mono text-slate-400">/ month</span>
                        )}
                      </div>
                      <p className="text-[10px] text-purple-300 font-mono mt-0.5">{tier.billingNote}</p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Features Included:</p>
                      <ul className="space-y-2">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      confetti({ particleCount: 35, spread: 50 });
                      showToast(`Selected ${tier.name} plan demo!`, 'success');
                    }}
                    className={`w-full py-3 rounded-2xl font-bold text-xs font-mono uppercase tracking-wider transition-all active:scale-95 ${tier.ctaStyle}`}
                  >
                    {tier.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 6-STREAM REVENUE ENGINE                                            */}
      {/* ========================================================================= */}
      {activeTab === 'monetization' && (
        <section className="space-y-6 animation-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-4">
            <div>
              <h3 className="text-lg font-black text-white font-display">
                6-Stream Diversified Revenue Architecture
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Combining high-margin SaaS subscriptions, enterprise government data feeds, usage-based forensic processing, and legal contingency marketplace fees
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {INVESTOR_PORTAL_DATA.monetizationStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="p-5 rounded-2xl bg-[#080c14] border-2 border-[#243147] hover:border-purple-500/60 transition-all space-y-3 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                        {stream.projectedYear3Revenue}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">HIGH MARGIN</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-tight">{stream.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{stream.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1c273a] space-y-1 text-[11px] font-mono">
                    <div className="text-purple-300 font-bold">Target: {stream.target}</div>
                    <div className="text-slate-400">Pricing: {stream.model}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: LEGAL ASSISTANCE & SERVICES MARKETPLACE                            */}
      {/* ========================================================================= */}
      {activeTab === 'marketplace' && (
        <section className="space-y-6 animation-fade-in">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-6">
            <div>
              <h3 className="text-lg font-black text-white font-display">
                Legal Assistance &amp; Professional Services Marketplace
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Monetizing vetted contingency retainer matchmaking, on-demand forensic expert witnesses, and Monell pattern research
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-700 flex items-center justify-center text-purple-300">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Contingency Retainer Matchmaker</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Connects verified victims and families with vetted top 1% civil rights trial attorneys. Platform collects a 12%–15% origination fee on successful multi-million dollar settlement recoveries.
                </p>
                <div className="pt-2 border-t border-[#1c273a] text-xs font-mono text-emerald-400 font-bold">
                  Avg. Deal Value: $450k – $12M
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Forensic Expert Witness Directory</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  On-demand booking for certified police practice experts, acoustic audio telemetry engineers, ballistic LIDAR specialists, and medical trauma analysts. 20% platform booking fee.
                </p>
                <div className="pt-2 border-t border-[#1c273a] text-xs font-mono text-indigo-400 font-bold">
                  Avg. Expert Booking: $8,500
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-700 flex items-center justify-center text-pink-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Accredited CLE Academy</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  State Bar certified Continuing Legal Education courses teaching advanced Section 1983 litigation, Monell discovery strategies, and bodycam video cross-examination.
                </p>
                <div className="pt-2 border-t border-[#1c273a] text-xs font-mono text-pink-400 font-bold">
                  $399/yr per Litigator
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: 5-YEAR FINANCIAL PROJECTIONS & INTERACTIVE CALCULATOR              */}
      {/* ========================================================================= */}
      {activeTab === 'projections' && (
        <section className="space-y-6 animation-fade-in">
          {/* Interactive Financial Calculator */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1c1236] to-[#111726] border-2 border-purple-500 space-y-5 shadow-2xl">
            <div>
              <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-600 font-bold uppercase">
                INTERACTIVE UNIT ECONOMICS CALCULATOR
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white font-display mt-1">
                Projected ARR &amp; Platform Valuation Model
              </h3>
              <p className="text-xs text-purple-200/90 font-mono">
                Adjust the subscriber parameters below to evaluate revenue scaling dynamics in real time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#080c14] border border-purple-800/60 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Law Firm Subscriptions:</span>
                  <span className="text-purple-300 font-black">{firmSubscribers} firms</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={firmSubscribers}
                  onChange={(e) => setFirmSubscribers(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 font-mono">@ $5,748/yr average firm contract</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080c14] border border-purple-800/60 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Gov / Municipal Oversight Nodes:</span>
                  <span className="text-indigo-300 font-black">{govContracts} nodes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={govContracts}
                  onChange={(e) => setGovContracts(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 font-mono">@ $48,000/yr enterprise API contract</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080c14] border border-purple-800/60 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Monthly Forensics Packets:</span>
                  <span className="text-pink-300 font-black">{avgCaseProcessingPerMonth} cases</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={avgCaseProcessingPerMonth}
                  onChange={(e) => setAvgCaseProcessingPerMonth(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 font-mono">@ $850 per unredacted 4K docket</p>
              </div>
            </div>

            {/* Calculated Output Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-purple-800/50">
              <div className="p-4 rounded-2xl bg-[#080c14]/90 border border-purple-700">
                <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">Calculated Annual ARR</span>
                <p className="text-2xl font-black text-white font-mono">${(totalCalculatedARR / 1000000).toFixed(2)}M</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080c14]/90 border border-purple-700">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Estimated Gross Profit (82%)</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">${((totalCalculatedARR * 0.82) / 1000000).toFixed(2)}M</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#080c14]/90 border border-purple-700">
                <span className="text-[10px] font-mono text-pink-300 uppercase font-bold">Implied Valuation (12x ARR)</span>
                <p className="text-2xl font-black text-pink-300 font-mono">${(estimatedValuation / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>

          {/* 5-Year Table */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-4">
            <h3 className="text-base font-bold text-white font-display">
              5-Year Pro-Forma Income Projections
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#243147] text-slate-400">
                    <th className="pb-3">Year</th>
                    <th className="pb-3">Paying Law Firms</th>
                    <th className="pb-3">Gov Oversight Nodes</th>
                    <th className="pb-3">Target ARR</th>
                    <th className="pb-3">Gross Margin</th>
                    <th className="pb-3">EBITDA Projection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2a3f]">
                  {INVESTOR_PORTAL_DATA.financialProjections.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#080c14]/50 transition-colors">
                      <td className="py-3 font-bold text-white">{p.year}</td>
                      <td className="py-3 text-slate-300">{p.payingFirms} firms</td>
                      <td className="py-3 text-slate-300">{p.enterpriseGov} nodes</td>
                      <td className="py-3 font-bold text-purple-300">{p.arr}</td>
                      <td className="py-3 text-emerald-400">{p.grossMargin}</td>
                      <td className="py-3 text-slate-300">{p.ebitda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: $3.5M SEED ASK & USE OF FUNDS                                      */}
      {/* ========================================================================= */}
      {activeTab === 'ask' && (
        <section className="space-y-6 animation-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Term Sheet Summary (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#111726] border-2 border-purple-600/70 space-y-5 shadow-2xl">
              <div>
                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700 font-bold uppercase">
                  SERIES SEED ROUND
                </span>
                <h3 className="text-xl font-black text-white font-display mt-1">
                  $3,500,000 Preferred Equity / SAFE
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Pre-Money Valuation: $18,500,000 • 18-Month Runway to $6.0M ARR
                </p>
              </div>

              {/* Use of Funds Progress Breakdown */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Allocation of Capital &amp; Milestones
                </h4>

                {INVESTOR_PORTAL_DATA.useOfFunds.map((fund, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#080c14] border border-[#1e2a3f] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-white">{fund.category}</span>
                      <span className="text-purple-300">{fund.amount} ({fund.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${fund.percentage}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      ></div>
                    </div>
                    <p className="text-[11px] text-slate-400">{fund.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Meeting & Confidential Data Room Booking (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#111726] border-2 border-[#243147] space-y-4 shadow-xl">
              <div>
                <h4 className="text-base font-bold text-white font-display">Schedule Partner Briefing</h4>
                <p className="text-xs text-slate-400 font-mono">Connect with Founders &amp; Executive Counsel</p>
              </div>

              <form onSubmit={handleScheduleMeeting} className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Partner / Fund Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Andreessen Horowitz / Sequoia / Impact VC"
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Partner Email</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@venturefund.com"
                    className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Target Check Size</label>
                  <select className="w-full bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                    <option value="500k">$250k – $500k (Participating Angel / Fund)</option>
                    <option value="1m">$500k – $1.5M (Major Co-Lead)</option>
                    <option value="lead">$2.0M – $3.5M (Lead Investor)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold font-mono uppercase tracking-wider shadow-glow active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Full Data Room &amp; Call</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
