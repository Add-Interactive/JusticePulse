export const supportHotlines = [
  {
    name: 'National Police Accountability Emergency Helpline',
    number: '1-800-555-JUSTICE (5878)',
    hours: '24/7 Toll-Free & Confidential',
    type: 'Crisis & Legal Intake',
    description: 'Immediate connection to civil rights dispatchers, pro bono legal counsel, and trauma intake specialists.'
  },
  {
    name: 'Victims of State Violence Mental Health & Grief Circle',
    number: '1-888-434-HEAL (4325)',
    hours: '24/7 Available in EN / ES',
    type: 'Trauma & Counseling',
    description: 'Specialized trauma-informed therapists providing free licensed grief counseling for affected families.'
  },
  {
    name: 'National Lawyers Guild (NLG) Legal Observer & Protest Hotline',
    number: '1-212-679-5100',
    hours: 'Mon-Sun 24/7',
    type: 'Bail & Arrest Defense',
    description: 'Rapid legal response for arrested activists, peaceful demonstrators, and civilian observers.'
  },
  {
    name: 'Substance Abuse & Mental Health Emergency (988 Alternative Response)',
    number: 'Call or Text 988',
    hours: '24/7 Nationwide',
    type: 'Crisis Alternative to 911',
    description: 'Non-police mobile mental health crisis dispatch for individuals experiencing psychological distress.'
  }
];

export const legalNetworks = [
  {
    id: 'ln-1',
    name: 'Innocence Project & Civil Rights Litigation Network',
    focus: 'Exoneration, Wrongful Conviction & Police Perjury',
    states: ['Nationwide (50 States)'],
    contact: 'intake@innocenceproject.org',
    website: 'https://innocenceproject.org',
    activeCases: 142,
    rating: '5.0 ★ (Verified Partner)'
  },
  {
    id: 'ln-2',
    name: 'Civil Rights Corps (Litigation for Abolition of Debt & Cash Bail)',
    focus: 'Unconstitutional Cash Bail, Jail Abuses & Municipal Extortion',
    states: ['NY', 'CA', 'TX', 'IL', 'GA', 'FL', 'LA', 'TN'],
    contact: 'action@civilrightscorps.org',
    website: 'https://civilrightscorps.org',
    activeCases: 89,
    rating: '4.9 ★ (Verified Partner)'
  },
  {
    id: 'ln-3',
    name: 'Equal Justice Initiative (EJI)',
    focus: 'Excessive Punishment, Racial Injustice & Police Brutality Defense',
    states: ['AL', 'MS', 'TN', 'GA', 'SC', 'NC', 'FL'],
    contact: 'contact@eji.org',
    website: 'https://eji.org',
    activeCases: 210,
    rating: '5.0 ★ (Verified Partner)'
  },
  {
    id: 'ln-4',
    name: 'Center for Constitutional Rights (CCR)',
    focus: 'Section 1983 Federal Civil Rights & Systematic Misconduct',
    states: ['Nationwide / Federal Circuit Courts'],
    contact: 'outreach@ccrjustice.org',
    website: 'https://ccrjustice.org',
    activeCases: 65,
    rating: '4.9 ★ (Verified Partner)'
  }
];

export const mutualAidFunds = [
  {
    id: 'ma-1',
    title: 'Sonya Massey Children Education & Sanctuary Trust',
    target: 500000,
    raised: 412000,
    beneficiary: 'Children of Sonya Massey',
    verified: true,
    category: 'Family Living & Education',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    description: 'Providing long-term housing stability, counseling, and college trusts for Sonya\'s surviving children.'
  },
  {
    id: 'ma-2',
    title: 'Tyre Nichols Foundation for Arts & Skate Park Sanctuary',
    target: 1500000,
    raised: 1450000,
    beneficiary: 'The RowVaughn & Rodney Wells Foundation',
    verified: true,
    category: 'Community Memorial & Legal Reform',
    image: 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?w=600&auto=format&fit=crop&q=80',
    description: 'Honoring Tyre’s love for photography and skateboarding by building free youth arts spaces in Memphis.'
  },
  {
    id: 'ma-3',
    title: 'National Bail Fund Network Emergency Reservoir',
    target: 250000,
    raised: 198400,
    beneficiary: 'Low-Income Detainees Nationwide',
    verified: true,
    category: 'Emergency Freedom Fund',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    description: 'Direct cash bail assistance to free individuals trapped in pre-trial detention solely due to poverty.'
  }
];

export const rightsScenarios = [
  {
    id: 'traffic-stop',
    title: '🚗 Traffic Stop: Step-by-Step Survival Script',
    constitutionalBasis: '4th Amendment (Unreasonable Search) & 5th Amendment (Self-Incrimination)',
    rules: [
      {
        step: 1,
        title: 'Keep Hands on Steering Wheel at 10 and 2',
        instruction: 'Turn on interior dome light if dark. Lower driver window halfway. Do not make sudden movements reaching for glove box before notifying the officer.'
      },
      {
        step: 2,
        title: 'Provide Required Documents Only',
        instruction: 'Hand over Driver\'s License, Vehicle Registration, and Proof of Insurance. In all 50 states, drivers must identify when lawfully stopped for a traffic violation.'
      },
      {
        step: 3,
        title: 'Decline Answering "Where are you coming from?"',
        instruction: 'Polite Script: "Officer, with all due respect, I am choosing to exercise my Fifth Amendment right to remain silent. I do not answer questions."'
      },
      {
        step: 4,
        title: 'Refuse Vehicle Search Without a Warrant',
        instruction: 'Polite Script: "I do NOT consent to any search of my vehicle or belongings." (Say this loudly and clearly for dashcam and your own recording).'
      },
      {
        step: 5,
        title: 'Ask the Golden Question',
        instruction: 'Script: "Officer, am I being detained or am I free to go?" If they say you are not detained, politely leave. If detained, ask: "What crime am I suspected of?"'
      }
    ],
    redFlags: [
      'Officers claiming "If you have nothing to hide, let me look inside"',
      'Officers demanding passwords or facial recognition to unlock your smartphone (Illegal without judicial warrant - Riley v. CA)',
      'Prolonging a traffic stop to wait for K-9 drug dogs past the reasonable time to write a citation (Unconstitutional under Rodriguez v. US)'
    ]
  },
  {
    id: 'recording-police',
    title: '📹 Filming Police in Public: Constitutional Rights',
    constitutionalBasis: '1st Amendment (Freedom of Speech & Press)',
    rules: [
      {
        step: 1,
        title: 'You Have an Absolute Right to Film in Public',
        instruction: 'Every US Federal Circuit has ruled that filming police officers performing official duties in public is protected under the 1st Amendment (Glik v. Cunniffe, Fields v. City of Philadelphia).'
      },
      {
        step: 2,
        title: 'Maintain Safe Distance',
        instruction: 'Stay 10 to 15 feet back. Do not step in the officer\'s direct path of movement. If ordered back, comply calmly while holding your phone high and continuing to film.'
      },
      {
        step: 3,
        title: 'Do Not Hand Over or Unlock Your Device',
        instruction: 'Police cannot seize your phone to delete footage. Deleting civilian footage constitutes felony evidence tampering and Section 1983 civil rights violation.'
      }
    ],
    redFlags: [
      'Threats of "You are interfering with an active investigation" while standing at safe distance',
      'Officers shining high-power strobe lights into your camera lens to disable recording',
      'Demands to turn off your camera or show ID when you are merely a bystander observer'
    ]
  },
  {
    id: 'home-entry',
    title: '🏠 Police at Your Front Door / Home Knock',
    constitutionalBasis: '4th Amendment Sanctity of the Home',
    rules: [
      {
        step: 1,
        title: 'Do Not Open the Door All the Way',
        instruction: 'Speak through the closed door or window. You are NOT required to open your door unless officers have a signed Search Warrant or Arrest Warrant.'
      },
      {
        step: 2,
        title: 'Ask to See the Warrant',
        instruction: 'Ask: "Do you have a warrant signed by a judge?" If yes, tell them to slide it under the door or hold it against the window. Verify your exact address and judge\'s signature.'
      },
      {
        step: 3,
        title: 'Consent Must Be Explicitly Refused',
        instruction: 'State clearly: "I do not consent to entry or search of my residence."'
      }
    ],
    redFlags: [
      'Officers claiming an "administrative inspection" or "we just want to talk"',
      'No-knock warrants executed without clear identification or announcement',
      'Search exceeding the areas specifically listed on the 4 corners of the warrant'
    ]
  }
];
