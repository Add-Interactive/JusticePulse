export const initialPosts = [
  {
    id: 'post-1',
    author: {
      name: 'Maya Linnea Johnson',
      handle: '@mayaj_civilrights',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Verified Civil Rights Advocate',
      role: 'Community Organizer'
    },
    timestamp: '20 minutes ago',
    type: 'EVIDENCE_RELEASE',
    caseTag: {
      id: 'case-sonya-massey',
      title: 'Sonya Massey Case'
    },
    content: '🚨 URGENT UPDATE: New personnel records released today via FOIA reveal Deputy Sean Grayson was rejected by TWO law enforcement agencies for "uncontrollable aggression" before Sangamon County hired him.\n\nWhy do our local sheriff departments continue to hire officers with red flags that would disqualify them from any civilian profession? We are building an immutable national ledger so bad actors can NEVER jump precinct to precinct in secret again.\n\nPlease share this docket link with our legal defense coalition.',
    media: {
      type: 'document_preview',
      title: 'FOIA Disciplinary Release #IL-2024-098.pdf',
      snippet: 'Official Sangamon County Internal Review: Prior discharge disclosures were bypassed by field supervisor.',
      verified: true
    },
    likesCount: 1420,
    supportsCount: 840,
    sharesCount: 512,
    commentsCount: 94,
    userHasLiked: false,
    userHasSupported: true,
    userReaction: 'stand_with_them',
    comments: [
      {
        id: 'c1',
        author: 'Attorney Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        badge: 'Civil Rights Attorney',
        text: 'This is textbook Section 1983 liability under Monell v. Dept of Social Services for failure to screen and train. Sangamon County is exposed to massive municipal liability.',
        timestamp: '15m ago',
        likes: 128
      },
      {
        id: 'c2',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Witness',
        text: 'Holding prayers for Sonya\'s children. We will be at the county board hearing this Thursday at 6 PM. Bring signs!',
        timestamp: '8m ago',
        likes: 45
      }
    ]
  },
  {
    id: 'post-poll-1',
    author: {
      name: 'National Civil Rights Policy Caucus',
      handle: '@policy_caucus_us',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      badge: 'Civic Policy Verified',
      role: 'National Research Group'
    },
    timestamp: '45 minutes ago',
    type: 'POLICY_ALERT',
    content: '🗳️ NATIONAL COMMUNITY BALLOT: Should Qualified Immunity be completely abolished at the federal level for all law enforcement officers who violate clearly established constitutional rights?\n\nCast your vote to include your voice in our next Congressional Caucus amicus brief.',
    poll: {
      id: 'poll-qi-1',
      question: 'Should Qualified Immunity be abolished for police misconduct?',
      totalVotes: 14820,
      options: [
        { id: 'opt-1', label: 'Yes — Full Abolition & Personal Accountability', votes: 13910, percentage: 93.8 },
        { id: 'opt-2', label: 'No — Keep Qualified Immunity Protections', votes: 910, percentage: 6.2 }
      ]
    },
    likesCount: 2980,
    supportsCount: 1840,
    sharesCount: 950,
    commentsCount: 142,
    userHasLiked: true,
    userHasSupported: true,
    comments: []
  },
  {
    id: 'post-fortson-update',
    author: {
      name: 'National Military Veterans for Civil Rights',
      handle: '@veterans_justice',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: 'Veterans Coalition Verified',
      role: 'Veterans Legal Advocacy'
    },
    timestamp: '1 hour ago',
    type: 'INCIDENT_REPORT',
    caseTag: {
      id: 'case-roger-fortson',
      title: 'Senior Airman Roger Fortson Case'
    },
    content: '⚖️ BREAKING LEGAL ACCOUNTABILITY: Former Okaloosa County Deputy Eddie Duran has been formally charged with first-degree felony manslaughter with a firearm in the fatal shooting of 23-year-old active duty Airman Roger Fortson.\n\nThe sheriff\'s own internal investigation found that Fortson committed no crime, posed no threat, and was lawfully holding his firearm pointed at the floor in his own home when Duran fired within 2 seconds of opening the door.\n\nThis confirms what community advocates have stated from day one: being a lawful gun owner in your own home is not probable cause for lethal force.',
    likesCount: 4120,
    supportsCount: 2980,
    sharesCount: 1840,
    commentsCount: 312,
    userHasLiked: true,
    userHasSupported: true,
    userReaction: 'stand_with_them',
    comments: [
      {
        id: 'cf1',
        author: 'Dr. Kimberly Adams',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Organizer',
        text: 'An important indictment, but the criminal trial is only step one. The Fortson family deserves full justice.',
        timestamp: '40m ago',
        likes: 92
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Elijah McClain Legal & Family Defense',
      handle: '@justice4elijah',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      badge: 'Family Foundation Verified',
      role: 'Family Outreach'
    },
    timestamp: '2 hours ago',
    type: 'MUTUAL_AID',
    caseTag: {
      id: 'case-elijah-mcclain',
      title: 'Elijah McClain Memorial Fund'
    },
    content: 'Violins for Elijah 🎻: This Saturday at 4 PM in Denver Central Park, over 200 violinists and community musicians will gather in peaceful remembrance of Elijah McClain\'s beautiful spirit.\n\nElijah played his violin to soothe shelter animals on his lunch breaks. We will never let his gentle memory be erased by state violence. 100% of donations from this vigil go towards our Pro Bono Youth Violin & Arts Sanctuary.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      caption: 'Community vigil and violin circle in honor of Elijah McClain'
    },
    mutualAidGoal: {
      raised: 42300,
      target: 50000,
      currency: '$'
    },
    likesCount: 3890,
    supportsCount: 2150,
    sharesCount: 1204,
    commentsCount: 210,
    userHasLiked: true,
    userHasSupported: true,
    userReaction: 'love',
    comments: [
      {
        id: 'c3',
        author: 'David Chen, Esq.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        badge: 'Legal Volunteer',
        text: 'Donated $250. Let his music echo louder than sirens. Thank you for continuing the fight.',
        timestamp: '1h ago',
        likes: 72
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Civil Rights Coalition of America',
      handle: '@civilrights_us',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      badge: 'Non-Profit 501(c)(3)',
      role: 'National Policy Research'
    },
    timestamp: '4 hours ago',
    type: 'POLICY_ALERT',
    content: '📊 TAXPAYER FACT CHECK: Over the last 10 years, the top 20 municipal police departments in the USA have spent over $3,200,000,000 ($3.2 Billion) of YOUR taxpayer dollars to settle police misconduct lawsuits.\n\nMeanwhile, in over 92% of these settled cases, the individual offending officers paid $0 out of pocket and retained their full pension benefits.\n\nQualified Immunity acts as a financial shield that places the burden of police brutality on public school budgets, road repairs, and healthcare. It is time to end Qualified Immunity nationwide.',
    statGraphic: {
      title: 'Taxpayer Misconduct Settlement Distribution (2015-2025)',
      topCities: [
        { city: 'New York City (NYPD)', amount: '$1.15 Billion' },
        { city: 'Chicago (CPD)', amount: '$672 Million' },
        { city: 'Los Angeles (LAPD)', amount: '$310 Million' },
        { city: 'Philadelphia (PPD)', amount: '$145 Million' }
      ]
    },
    likesCount: 5410,
    supportsCount: 3820,
    sharesCount: 2490,
    commentsCount: 428,
    userHasLiked: true,
    userHasSupported: false,
    userReaction: null,
    comments: [
      {
        id: 'c4',
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        badge: 'Community Member',
        text: 'Imagine if that $3.2B was invested in after-school programs, mental health crises teams, and community centers instead.',
        timestamp: '3h ago',
        likes: 310
      }
    ]
  },
  {
    id: 'post-4',
    author: {
      name: 'Know Your Rights Legal Defense Squad',
      handle: '@rights_defense_now',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      badge: 'Public Defender Collective',
      role: 'Legal Defense'
    },
    timestamp: '7 hours ago',
    type: 'LEGAL_GUIDE',
    content: '⚖️ POCKET LEGAL SURVIVAL GUIDE: What to do if stopped while filming police in public:\n\n1. You have a First Amendment constitutional right to record police officers performing duties in public spaces (Circuit Court consensus across all federal circuits).\n2. Maintain a reasonable distance (10-15 feet) so they cannot claim "obstruction of justice".\n3. Say out loud: "I am exercising my First Amendment right to record. I am not interfering."\n4. Never physically unlock your phone or surrender biometric passcode. Police cannot search your phone without a warrant under Riley v. California (2014).\n\nUse our platform\'s Emergency SOS Cloud Recorder tool to automatically stream and save your footage in real-time.',
    likesCount: 7820,
    supportsCount: 4900,
    sharesCount: 4120,
    commentsCount: 180,
    userHasLiked: false,
    userHasSupported: false,
    userReaction: null,
    comments: []
  }
];
