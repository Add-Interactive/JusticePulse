export const USER_ROLES = [
  {
    id: 'defense_attorney',
    title: 'Civil Rights Defense Attorney',
    shortTitle: 'Defense Attorney',
    category: 'Legal Counsel',
    badge: 'Bar Verified • § 1983 Litigator',
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-700',
    clearanceLevel: 'Tier 4 — Discovery Lead',
    description: 'Lead trial counsel representing victims & civil rights plaintiffs. Access unredacted discovery, draft Monell claims, and request Brady material.',
    requiresCaseId: true,
    requiresBarNumber: true,
    permissions: [
      'view_discovery',
      'draft_pleadings',
      'access_brady',
      'file_motions',
      'cross_examine',
      'client_privileged_chat',
      'view_my_cases'
    ]
  },
  {
    id: 'prosecutor',
    title: 'Prosecutor / Special Counsel',
    shortTitle: 'Special Prosecutor',
    category: 'Government & Prosecution',
    badge: 'Special Counsel • Grand Jury',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-700',
    clearanceLevel: 'Tier 4 — State / Federal Counsel',
    description: 'Independent special prosecutors and state attorneys presenting police misconduct indictments to the Grand Jury.',
    requiresCaseId: true,
    requiresBarNumber: true,
    permissions: [
      'view_discovery',
      'grand_jury_indictment',
      'subpoena_records',
      'access_brady',
      'file_charges',
      'view_my_cases'
    ]
  },
  {
    id: 'judge',
    title: 'Presiding Judge / Magistrate',
    shortTitle: 'Judicial Officer',
    category: 'Judicial Bench',
    badge: 'Judicial Bench • Article III / State',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-700',
    clearanceLevel: 'Tier 5 — Judicial Authority',
    description: 'Judges presiding over § 1983 & criminal misconduct trials. Issue in-camera rulings, protective orders, and jury instructions.',
    requiresCaseId: true,
    requiresBarNumber: false,
    permissions: [
      'judicial_rulings',
      'in_camera_review',
      'protective_orders',
      'jury_instructions',
      'warrant_review',
      'view_my_cases'
    ]
  },
  {
    id: 'legal_moderator',
    title: 'Legal Moderator & Certified Paralegal',
    shortTitle: 'Legal Moderator',
    category: 'Compliance & Triage',
    badge: 'Certified Moderator • PII Redaction',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    clearanceLevel: 'Tier 3 — Compliance & Triage',
    description: 'Certified legal professionals auditing incoming evidence, conducting PII redactions, and verifying cryptographic hashes.',
    requiresCaseId: false,
    requiresBarNumber: false,
    permissions: [
      'verify_evidence',
      'pii_redaction',
      'audit_hashes',
      'triage_reports',
      'community_moderation',
      'view_all_cases'
    ]
  },
  {
    id: 'admin',
    title: 'System Administrator & Master Auditor',
    shortTitle: 'System Admin',
    category: 'Administration',
    badge: 'Master Clearance • Admin',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-700',
    clearanceLevel: 'Tier 5 — Master Administrator',
    description: 'Full root access to cryptographic ledger, audit logs, user permissions, and platform-wide forensic custody vault.',
    requiresCaseId: false,
    requiresBarNumber: false,
    permissions: [
      'all_access',
      'vault_master',
      'user_management',
      'system_audit',
      'tamper_log',
      'view_all_cases'
    ]
  },
  {
    id: 'eyewitness',
    title: 'Verified Eyewitness / Field Witness',
    shortTitle: 'Verified Eyewitness',
    category: 'Witness & Reporter',
    badge: 'Witness ID #8841 • Subpoena Ready',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-700',
    clearanceLevel: 'Tier 2 — Witness Deponent',
    description: 'Direct witnesses who captured video footage or were on scene. Securely upload original uncompressed media and track subpoena status.',
    requiresCaseId: true,
    requiresBarNumber: false,
    permissions: [
      'submit_footage',
      'witness_statements',
      'track_subpoena',
      'attorney_chat',
      'view_my_cases'
    ]
  },
  {
    id: 'victim_family',
    title: 'Victim / Aggrieved Family Member',
    shortTitle: 'Victim / Family',
    category: 'Aggrieved Family',
    badge: 'Sanctuary Protected • Family Trust',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    clearanceLevel: 'Tier 2 — Family Sanctuary',
    description: 'Victims and designated family representatives. Manage memorial mutual aid, review case docket milestones, and message verified legal defense team.',
    requiresCaseId: true,
    requiresBarNumber: false,
    permissions: [
      'view_my_cases',
      'family_sanctuary',
      'mutual_aid_management',
      'attorney_direct_chat',
      'memorial_updates'
    ]
  },
  {
    id: 'defendant',
    title: 'Defendant / Targeted Citizen',
    shortTitle: 'Defendant in Case',
    category: 'Targeted Individual',
    badge: 'Defendant • Case Discovery',
    badgeColor: 'bg-crimson-950 text-crimson-300 border-crimson-700',
    clearanceLevel: 'Tier 2 — Defendant Discovery',
    description: 'Individuals facing false arrests or malicious charges. Access your case discovery file, alibi timeline matrix, and counsel filings.',
    requiresCaseId: true,
    requiresBarNumber: false,
    permissions: [
      'view_my_cases',
      'defense_exhibits',
      'attorney_privileged_vault',
      'alibi_timeline',
      'pro_se_tools'
    ]
  },
  {
    id: 'bystander',
    title: 'Community Bystander / Civic Advocate',
    shortTitle: 'Civic Advocate',
    category: 'Public Citizen',
    badge: 'Verified Citizen • Grand Jury Voter',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    clearanceLevel: 'Tier 1 — Public Citizen',
    description: 'Public community member exploring verified case law, voting in Grand Jury simulations, tracking local police budgets, and filing FOIAs.',
    requiresCaseId: false,
    requiresBarNumber: false,
    permissions: [
      'public_dockets',
      'grand_jury_voting',
      'foia_generator',
      'rights_guide',
      'sign_petitions'
    ]
  }
];

export const sampleUserPersonas = [
  {
    id: 'user-defense-marcus',
    name: 'Attorney Marcus Vance, Esq.',
    email: 'marcus.vance@civilrightslaw.org',
    roleId: 'defense_attorney',
    role: 'Civil Rights Defense Attorney',
    badge: 'Bar #IL-749201 • Defense Counsel',
    barNumber: 'IL-749201',
    assignedCases: ['case-sonya-massey', 'case-roger-fortson'],
    primaryCaseNumber: 'CR-2024-00892',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Civil Rights Trial Attorney specializing in Section 1983 litigation and bodycam discovery.'
  },
  {
    id: 'user-prosecutor-sarah',
    name: 'Special Counsel Sarah Jenkins',
    email: 's.jenkins@specialprosecution.gov',
    roleId: 'prosecutor',
    role: 'Prosecutor / Special Counsel',
    badge: 'Special Counsel • Grand Jury Division',
    barNumber: 'FL-391048',
    assignedCases: ['case-roger-fortson', 'case-breonna-taylor'],
    primaryCaseNumber: 'FL-2024-IND-412',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Independent Special Prosecutor investigating deputy-involved shootings and civil rights violations.'
  },
  {
    id: 'user-judge-harrison',
    name: 'Honorable Judge Arthur Harrison',
    email: 'bench@usdistrictcourt.gov',
    roleId: 'judge',
    role: 'Presiding Judge / Magistrate',
    badge: 'U.S. District Court • Northern District',
    barNumber: 'US-BENCH-042',
    assignedCases: ['case-sonya-massey', 'case-elijah-mcclain'],
    primaryCaseNumber: '24-CV-01983-AH',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Federal District Judge overseeing Section 1983 civil rights claims and Monell inquiries.'
  },
  {
    id: 'user-admin-root',
    name: 'Chief Inspector David Vance',
    email: 'admin@justicepulse.org',
    roleId: 'admin',
    role: 'System Administrator & Master Auditor',
    badge: 'Root Clearance • SHA-256 Ledger Master',
    barNumber: 'N/A',
    assignedCases: ['case-sonya-massey', 'case-roger-fortson', 'case-breonna-taylor', 'case-elijah-mcclain'],
    primaryCaseNumber: 'SYSTEM-ALL',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Master Forensic Systems Auditor managing cryptographic hash ledgers and evidence custody logs.'
  },
  {
    id: 'user-mod-triage',
    name: 'Clarissa Morales, CP',
    email: 'moderator@justicepulse.org',
    roleId: 'legal_moderator',
    role: 'Legal Moderator & Certified Paralegal',
    badge: 'NALA Certified • Evidence Triage',
    barNumber: 'CP-88419',
    assignedCases: ['case-sonya-massey', 'case-roger-fortson'],
    primaryCaseNumber: 'TRIAGE-QUEUE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bio: 'Certified Paralegal managing intake triage, witness statement integrity, and PII redactions.'
  },
  {
    id: 'user-witness-elena',
    name: 'Elena Rostova',
    email: 'elena.witness@gmail.com',
    roleId: 'eyewitness',
    role: 'Verified Eyewitness / Field Witness',
    badge: 'Subpoena Deponent • Angle #2 Filmer',
    barNumber: 'N/A',
    assignedCases: ['case-sonya-massey'],
    primaryCaseNumber: 'CR-2024-00892',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Neighbor and eyewitness who documented bodycam timestamp discrepancies.'
  },
  {
    id: 'user-family-massey',
    name: 'James Massey (Family Representative)',
    email: 'masseyfamilytrust@gmail.com',
    roleId: 'victim_family',
    role: 'Victim / Aggrieved Family Member',
    badge: 'Sonya Massey Estate • Family Sanctuary',
    barNumber: 'N/A',
    assignedCases: ['case-sonya-massey'],
    primaryCaseNumber: 'CR-2024-00892',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Family Trustee and advocate for the Sonya Massey Justice Fund and Sangamon County accountability.'
  },
  {
    id: 'user-defendant-malik',
    name: 'Malik Washington (Defendant)',
    email: 'm.washington@defense.org',
    roleId: 'defendant',
    role: 'Defendant / Targeted Citizen',
    badge: 'Defendant • Case #24-CR-5501',
    barNumber: 'N/A',
    assignedCases: ['case-roger-fortson'],
    primaryCaseNumber: '24-CR-5501',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bio: 'Citizen targeted during unconstitutional no-knock warrant raid, organizing defense discovery.'
  },
  {
    id: 'user-bystander-kimberly',
    name: 'Dr. Kimberly Adams',
    email: 'k.adams@civicadvocacy.org',
    roleId: 'bystander',
    role: 'Community Bystander / Civic Advocate',
    badge: 'Verified Organizer • Grand Jury Member',
    barNumber: 'N/A',
    assignedCases: ['case-sonya-massey', 'case-roger-fortson', 'case-breonna-taylor'],
    primaryCaseNumber: 'COMMUNITY-MEMBER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Civil rights community advocate and policy researcher analyzing nationwide police payout trends.'
  }
];
