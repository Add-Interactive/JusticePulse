export const INVESTOR_PORTAL_DATA = {
  executiveSummary: {
    title: 'JUSTICE PULSE',
    subtitle: 'The Civic LegalTech & Police Accountability Infrastructure Operating System',
    vision: 'Building the definitive $42B vertical SaaS and data infrastructure network powering civil rights litigation, municipal risk compliance, and community defense.',
    roundAsk: '$3,500,000 Series Seed',
    preMoneyValuation: '$18,500,000',
    leadInvestors: 'Seeking Impact, LegalTech & Enterprise SaaS Lead Partners',
    keyMetrics: [
      { label: 'TAM (Total Addressable Market)', value: '$42.8B', sub: 'Global LegalTech, GovTech & Risk Pools' },
      { label: 'SAM (Serviceable Market)', value: '$12.4B', sub: 'US Civil Rights & Municipal Liability' },
      { label: 'SOM (Initial Target Market)', value: '$850M+', sub: 'Top 5,000 Civil Rights Law Firms & Review Boards' },
      { label: 'Target Gross Margin', value: '82%', sub: 'Software & API Platform Architecture' }
    ]
  },

  monetizationStreams: [
    {
      id: 'legal_saas',
      title: 'B2B LegalTech SaaS Subscriptions',
      target: 'Civil Rights Law Firms, Solo Trial Litigators, Public Defenders',
      model: 'Monthly / Annual Tiered SaaS Seats ($149 - $599/mo/seat)',
      description: 'Full-featured forensic workspace including Detective Corkboard, Multi-Cam Bodycam synchronizer, AI Deposition cross-examiner, and automated Section 1983 complaint generator.',
      projectedYear3Revenue: '$5.4M ARR',
      icon: 'Scale'
    },
    {
      id: 'gov_oversight_api',
      title: 'Enterprise & Municipal Oversight API',
      target: 'City Auditors, Civilian Oversight Boards, State Attorneys General, Insurance Risk Pools',
      model: 'Enterprise Data Feed Contracts ($25,000 - $120,000/yr/jurisdiction)',
      description: 'Real-time 50-State Brady Registry misconduct tracking, early warning pattern-and-practice telemetry, and municipal risk pool liability benchmarking.',
      projectedYear3Revenue: '$3.8M ARR',
      icon: 'Building2'
    },
    {
      id: 'case_forensic_processing',
      title: 'On-Demand Forensic Processing & Rule 1006 Packets',
      target: 'Litigation Teams & Criminal Defense Counsel',
      model: 'Usage-Based Processing Fees ($499 - $2,500 per incident docket)',
      description: 'AI-accelerated 4K bodycam redaction, multi-angle audio acoustic decibel forensics, 3D LIDAR ballistic trajectory scan processing, and court-certified SHA-256 custody certification.',
      projectedYear3Revenue: '$2.6M ARR',
      icon: 'FolderLock'
    },
    {
      id: 'legal_services_marketplace',
      title: 'Contingency Fee Retainer Matchmaker',
      target: 'Victims, Families & Retained Contingency Counsel',
      model: '12% - 15% Platform Facilitation Fee on Qualified Case Settlements',
      description: 'Matching aggrieved families and targeted citizens with vetted top-tier civil rights litigation trial attorneys with verified win rates.',
      projectedYear3Revenue: '$4.2M ARR',
      icon: 'HeartHandshake'
    },
    {
      id: 'expert_witness_network',
      title: 'Forensic Expert Witness On-Demand Network',
      target: 'Trial Attorneys, Defense Experts, Police Practices Analysts',
      model: '20% Marketplace Booking & Escrow Margin',
      description: 'Curated directory of certified police practice experts, forensic pathologists, acoustic audio engineers, and use-of-force biomechanical specialists.',
      projectedYear3Revenue: '$1.8M ARR',
      icon: 'Users'
    },
    {
      id: 'cle_academy',
      title: 'Accredited Civil Rights Academy & Certifications',
      target: 'Trial Attorneys, Law Students, Legal Observers',
      model: 'CLE Course Subscriptions ($49/course or $399/yr unlimited)',
      description: 'State-bar certified Continuing Legal Education (CLE) masterclasses in Section 1983 litigation, Monell discovery strategies, and bodycam evidentiary rules.',
      projectedYear3Revenue: '$950K ARR',
      icon: 'GraduationCap'
    }
  ],

  subscriptionTiers: [
    {
      id: 'citizen',
      name: 'Citizen Defense & Advocate',
      badge: 'COMMUNITY',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      priceMonthly: 0,
      priceAnnual: 0,
      billingNote: 'Free Forever For Public Advocates',
      target: 'Everyday citizens, legal observers, community organizers',
      popular: false,
      features: [
        'SOS 1-Tap Emergency Cloud Video Backup (5GB)',
        'Automated SMS Alert to 3 Emergency Contacts',
        'Search 50-State Public Case Dockets',
        'Citizen Grand Jury Deliberation & Voting',
        'Know Your Rights Interactive AI Handbook',
        'Standard FOIA Open Records Letter Generator',
        'Community Sanctuary Fund Micro-Donations (0% fee)'
      ],
      cta: 'Get Started Free',
      ctaStyle: 'bg-slate-800 hover:bg-slate-700 text-white'
    },
    {
      id: 'pro_bono_solo',
      name: 'Solo Practitioner & Trial Counsel',
      badge: 'SOLO COUNSEL',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-700',
      priceMonthly: 149,
      priceAnnual: 119,
      billingNote: 'Billed annually ($1,428/yr) or $149/mo',
      target: 'Solo civil rights litigators, pro bono attorneys, public defenders',
      popular: true,
      features: [
        'Everything in Citizen Defense, plus:',
        'Up to 10 Active § 1983 Case Workspaces',
        'FBI-Grade Detective Whiteboard & Red-String Matrix',
        'Multi-Cam Bodycam & Dashcam Synchronizer (100GB)',
        'Veritas Deposition AI Cross-Examiner (50 Hours/mo)',
        'Section 1983 Monell Pleading & Motion Generator',
        'Rule 1006 Court-Admissible Packet Exporter',
        'Priority Phone & Email Litigator Support'
      ],
      cta: 'Start 14-Day Pro Trial',
      ctaStyle: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-glow-indigo'
    },
    {
      id: 'litigation_firm',
      name: 'Civil Rights Litigation Firm',
      badge: 'MOST POPULAR FOR FIRMS',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-700',
      priceMonthly: 599,
      priceAnnual: 479,
      billingNote: 'Billed annually ($5,748/yr) or $599/mo (Includes 10 Seats)',
      target: 'Specialized civil rights law practices & litigation teams',
      popular: false,
      features: [
        'Everything in Solo Practitioner, plus:',
        'Unlimited Active Litigation Dockets & 10 User Seats',
        '1TB Cryptographic SHA-256 Evidence Vault',
        'Automated AI PII Face & Audio Bleeping Redaction',
        'Full 50-State Brady Registry Repeat Offender Index',
        'LIDAR 3D Bullet Trajectory & Speed Physics Sandbox',
        'Contingency Case Retainer Matchmaking Priority',
        'Dedicated Client Success Legal Engineer'
      ],
      cta: 'Deploy Firm Suite',
      ctaStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-glow'
    },
    {
      id: 'enterprise_gov',
      name: 'Enterprise & Municipal Oversight',
      badge: 'GOVERNMENT / AUDITOR',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
      priceMonthly: 2499,
      priceAnnual: 1999,
      billingNote: 'Custom annual contract ($23,988/yr+ base)',
      target: 'Civilian Review Boards, State AGs, City Auditors, Municipal Risk Pools',
      popular: false,
      features: [
        'Unlimited Enterprise Seats & Organization Vault',
        'Direct REST / GraphQL API Data Feed Access',
        'Municipal Liability Risk Pool Predictive Analytics',
        'Automated Early-Warning Internal Affairs Pattern Index',
        'Multi-Agency Cross-Jurisdiction Badge Tracking',
        'Custom SSO (SAML / Okta) & CJIS Compliance Node',
        'Dedicated SLA, 99.99% Uptime & On-Prem Options'
      ],
      cta: 'Contact Enterprise Sales',
      ctaStyle: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-emerald'
    }
  ],

  financialProjections: [
    { year: 'Year 1 (2026)', payingFirms: 120, enterpriseGov: 8, arr: '$1.4M', grossMargin: '76%', ebitda: '-$850K (Growth Mode)' },
    { year: 'Year 2 (2027)', payingFirms: 480, enterpriseGov: 35, arr: '$5.8M', grossMargin: '80%', ebitda: '+$420K (Cashflow Positive)' },
    { year: 'Year 3 (2028)', payingFirms: 1350, enterpriseGov: 110, arr: '$16.2M', grossMargin: '83%', ebitda: '+$4.8M (30% Margin)' },
    { year: 'Year 4 (2029)', payingFirms: 2900, enterpriseGov: 280, arr: '$36.5M', grossMargin: '85%', ebitda: '+$12.4M (34% Margin)' },
    { year: 'Year 5 (2030)', payingFirms: 5400, enterpriseGov: 620, arr: '$74.0M', grossMargin: '86%', ebitda: '+$28.8M (39% Margin)' }
  ],

  useOfFunds: [
    { category: 'R&D, AI Forensics & Platform Engineering', percentage: 40, amount: '$1,400,000', details: 'Multi-cam sync AI, real-time PII redactor, laser LIDAR trajectory engine.' },
    { category: 'Enterprise Sales & Legal Partnership Distribution', percentage: 30, amount: '$1,050,000', details: 'Direct sales to top 5,000 civil rights trial firms, CLE partnerships.' },
    { category: 'Regulatory, CJIS Compliance & Cryptographic Auditing', percentage: 15, amount: '$525,000', details: 'Federal Rule 1006 certification, third-party security & SOC2 Type II audits.' },
    { category: 'Community Sanctuary & Mutual Aid Reserve', percentage: 15, amount: '$525,000', details: 'Direct community defense subsidies and grassroots legal observer hubs.' }
  ],

  // Full Production Release Roadmap & Cost Breakdown
  productionRoadmap: {
    totalBudget: '$3,500,000',
    runwayMonths: 18,
    monthlyBurn: '$194,444 / mo',
    phases: [
      {
        id: 'phase-1',
        phaseNumber: 'Phase 1',
        name: 'CJIS GovCloud Infrastructure & Multi-Tenant Security Node',
        timeline: 'Q3 2026 – Q4 2026 (Months 1–4)',
        budget: '$650,000',
        percentOfSeed: '18.6%',
        status: 'In Progress (Active Sprint)',
        statusColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
        lead: 'Lead Systems Architect & Security Officer',
        keyDeliverables: [
          'Deploy isolated AWS GovCloud (US-East/West) with FIPS 140-3 HSM cryptographic key vaults',
          'Complete SOC2 Type II audit readiness & CJIS (Criminal Justice Information Services) alignment',
          'Build multi-tenant tenant isolation layer with role-based cryptographic access control (RBAC)',
          'Implement client-side Web Crypto API for zero-knowledge SHA-256 exhibit hashing'
        ],
        costScaffolding: [
          { item: 'GovCloud Hosting & Dedicated HSM Vaults (18 mo reserve)', cost: '$180,000' },
          { item: 'SOC2 Type II & Third-Party Security Penetration Audits', cost: '$120,000' },
          { item: 'Senior Distributed Systems & Cryptography Engineers (2 FTE)', cost: '$260,000' },
          { item: 'CJIS Compliance Legal Counsel & Regulatory Filings', cost: '$90,000' }
        ]
      },
      {
        id: 'phase-2',
        phaseNumber: 'Phase 2',
        name: 'High-Compute AI GPU Pipeline & 4K Multi-Cam Frame Synchronizer',
        timeline: 'Q1 2027 (Months 5–7)',
        budget: '$850,000',
        percentOfSeed: '24.3%',
        status: 'Scheduled',
        statusColor: 'bg-indigo-950 text-indigo-300 border-indigo-700',
        lead: 'Head of Computer Vision & Neural Audio Processing',
        keyDeliverables: [
          'Provision dedicated NVIDIA H100 GPU compute clusters for sub-frame 4K bodycam redaction',
          'Deploy acoustic cross-correlation neural network for automatic decibel alignment',
          'Build real-time facial PII blurring and audio bleeping pipeline with 99.4% precision',
          'Finalize Veritas Deposition AI with real-time transcript impeachment & cross-examination'
        ],
        costScaffolding: [
          { item: 'High-Throughput NVIDIA GPU Compute Cluster (Reserved)', cost: '$290,000' },
          { item: 'Computer Vision & Speech-to-Text AI Research Engineers (2 FTE)', cost: '$320,000' },
          { item: 'Video Transcoding & Object Storage Pipelines (1PB Tier)', cost: '$140,000' },
          { item: 'Benchmarking Datasets & Model Fine-Tuning Infrastructure', cost: '$100,000' }
        ]
      },
      {
        id: 'phase-3',
        phaseNumber: 'Phase 3',
        name: '50-State Integrated Brady API & Municipal Pilot Integrations',
        timeline: 'Q2 2027 (Months 8–11)',
        budget: '$750,000',
        percentOfSeed: '21.4%',
        status: 'Scheduled',
        statusColor: 'bg-purple-950 text-purple-300 border-purple-700',
        lead: 'VP of GovTech Partnerships & Data Engineering',
        keyDeliverables: [
          'Launch automated municipal FOIA request & court docket web scrapers across all 50 states',
          'Build Monell pattern-and-practice liability detector linking cross-county wandering officers',
          'Secure 5 municipal oversight pilot contracts (Major Metro Civilian Review Boards)',
          'Deploy GraphQL/REST Enterprise Data Feed for insurance risk pool underwriting'
        ],
        costScaffolding: [
          { item: 'GovTech Enterprise Sales Director & Field Account Executives', cost: '$280,000' },
          { item: 'Data Scraping & Cross-Jurisdiction Docket ETL Engineers (2 FTE)', cost: '$250,000' },
          { item: 'Pilot Integration Subsidies & Municipal Onboarding Support', cost: '$130,000' },
          { item: 'State Bar Association Partnerships & Ethics Review Board', cost: '$90,000' }
        ]
      },
      {
        id: 'phase-4',
        phaseNumber: 'Phase 4',
        name: 'National Legal Marketplace & Contingency Retainer Engine',
        timeline: 'Q3 2027 (Months 12–15)',
        budget: '$650,000',
        percentOfSeed: '18.6%',
        status: 'Scheduled',
        statusColor: 'bg-pink-950 text-pink-300 border-pink-700',
        lead: 'Head of Legal Marketplace & Litigator Growth',
        keyDeliverables: [
          'Launch vetted contingency retainer matchmaker for high-value civil rights recoveries',
          'Build Escrow & Milestone clearinghouse for forensic expert witness bookings',
          'Roll out State Bar accredited CLE Academy masterclasses ($399/yr subscription)',
          'Scale paid law firm SaaS subscriber base from 120 to 500+ active practices'
        ],
        costScaffolding: [
          { item: 'Litigator Community Marketing & Bar Conference Roadshows', cost: '$210,000' },
          { item: 'Fintech Escrow & Legal Marketplace Compliance Infrastructure', cost: '$150,000' },
          { item: 'CLE Course Production & Former Federal Magistrate Faculty Fees', cost: '$140,000' },
          { item: 'Customer Success & Legal Engineering Support Pod (2 FTE)', cost: '$150,000' }
        ]
      },
      {
        id: 'phase-5',
        phaseNumber: 'Phase 5',
        name: 'Federal Court Rule 1006 Certification & Nationwide Enterprise Scale',
        timeline: 'Q4 2027 – 2028 (Months 16–18+)',
        budget: '$600,000',
        percentOfSeed: '17.1%',
        status: 'Scheduled',
        statusColor: 'bg-amber-950 text-amber-300 border-amber-700',
        lead: 'CEO & General Counsel',
        keyDeliverables: [
          'Direct integration with Federal Court CM/ECF electronic pleading & docket filing systems',
          'Establish verified Federal Rule of Evidence 1006 judicial admissibility precedent in 3 Circuits',
          'Expand to 1,350+ paying law firms and 110+ government oversight nodes ($16M+ ARR)',
          'Execute Series A Institutional Financing ($15M–$25M Round)'
        ],
        costScaffolding: [
          { item: 'CM/ECF Federal E-Filing API Gateway & Court Integration Engineers', cost: '$220,000' },
          { item: 'Appellate Amicus Brief Strategy & Judicial Conference Engagements', cost: '$130,000' },
          { item: 'Series A Preparation, Audited Financials & Legal Due Diligence', cost: '$150,000' },
          { item: 'Executive Talent Expansion (CFO & VP Enterprise Sales)', cost: '$100,000' }
        ]
      }
    ]
  },

  costScaffoldingBreakdown: [
    {
      category: 'Core Engineering & AI Infrastructure',
      allocation: '$1,330,000',
      percentage: 38,
      color: 'bg-purple-500',
      description: 'NVIDIA H100 GPU compute clusters, AWS GovCloud, video transcoding pipeline, sub-frame acoustic waveform engine, full-stack engineers (4 FTE).'
    },
    {
      category: 'Security, CJIS Compliance & Cryptographic Auditing',
      allocation: '$630,000',
      percentage: 18,
      color: 'bg-indigo-500',
      description: 'SOC2 Type II audits, FIPS 140-3 HSM key custody, penetration testing, third-party security certifications, CJIS regulatory compliance.'
    },
    {
      category: 'Enterprise GovTech & Law Firm Sales Distribution',
      allocation: '$630,000',
      percentage: 18,
      color: 'bg-emerald-500',
      description: 'Direct sales to top 5,000 trial litigators, municipal oversight pilot integrations, state bar roadshows, CLE partnership programs.'
    },
    {
      category: 'Legal Engineering, FRE 1006 & Judicial Standards',
      allocation: '$560,000',
      percentage: 16,
      color: 'bg-amber-500',
      description: 'Former federal magistrates & appellate advisors, CM/ECF federal e-filing gateway, expert witness clearinghouse, evidence admissibility benchmarks.'
    },
    {
      category: 'Grassroots Sanctuary & Community Defense Reserve',
      allocation: '$350,000',
      percentage: 10,
      color: 'bg-pink-500',
      description: 'Grassroots legal observer mobile units, SOS cloud storage subsidies for low-income citizens, victim family memorial trust reserve.'
    }
  ]
};
