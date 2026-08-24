export const initialCases = [
  {
    id: 'case-sonya-massey',
    title: 'Sonya Massey Shooting & Disciplinary Bypass',
    victim: 'Sonya Massey',
    age: 36,
    date: '2024-07-06',
    location: 'Springfield, Illinois',
    jurisdiction: 'Sangamon County Sheriff\'s Office',
    status: 'Indicted / Trial Pending',
    outcomeCategory: 'Indicted',
    qualifiedImmunity: 'Denied (Criminal Charges Filed)',
    summary: 'Sonya Massey, a 36-year-old mother, called 911 to report a suspected prowler outside her home. Deputy Sean Grayson entered her home, ordered her to move a pot of boiling water from the stove, and then fatally shot her in the face after shouting profanities. Records revealed Grayson had worked for six different law enforcement agencies in four years with prior misconduct and DUI convictions.',
    keyInjustices: [
      'Officer previously discharged from the U.S. Army for serious misconduct',
      'Employed across 6 different police departments in 4 years (Gypsy Cop pattern)',
      'Ignored standard de-escalation protocols on a distressed 911 caller',
      'Sheriff\'s office failed to conduct rigorous background check before hiring'
    ],
    officersInvolved: [
      {
        name: 'Sean Grayson',
        badge: 'Deputy #142',
        status: 'Fired & Indicted for First-Degree Murder',
        priorIncidents: '2 DUI convictions, discharged from US Army for misconduct, reprimands at prior department',
        repeatOffender: true
      }
    ],
    settlementAmount: 'Pending Federal Civil Rights Lawsuit (Est. $15M+)',
    taxpayerCost: 'Sangamon County legal defense & insurance reserves allocated',
    bodycamAvailable: true,
    bodycamDuration: '14 mins 32 secs (Full Unedited Release)',
    evidenceCount: 18,
    petitionSignatures: 284500,
    petitionGoal: 300000,
    familyFundRaised: 412000,
    familyFundGoal: 500000,
    attorney: 'Ben Crump & Associates',
    tags: ['911 Caller', 'Gypsy Cop', 'Bodycam Released', 'First-Degree Murder Indictment'],
    timeline: [
      { date: '2024-07-06 00:50', title: '911 Call', description: 'Sonya Massey calls 911 reporting an intruder outside her home.' },
      { date: '2024-07-06 01:12', title: 'Fatal Encounter', description: 'Deputy Sean Grayson fires three shots after verbal confrontation over water pot.' },
      { date: '2024-07-17', title: 'Grand Jury Indictment', description: 'Grayson indicted on 3 counts of first-degree murder, aggravated battery, and official misconduct.' },
      { date: '2024-07-22', title: 'Bodycam Release', description: 'Illinois State Police release full body camera footage sparking national outrage.' },
      { date: '2024-08-15', title: 'DOJ Civil Rights Review', description: 'Department of Justice launches comprehensive review of Sangamon County hiring practices.' }
    ]
  },
  {
    id: 'case-roger-fortson',
    title: 'Senior Airman Roger Fortson Wrong-Door Shooting',
    victim: 'Roger Fortson',
    age: 23,
    date: '2024-05-03',
    location: 'Fort Walton Beach, Florida',
    jurisdiction: 'Okaloosa County Sheriff\'s Office',
    status: 'Deputy Fired & Charged with Felony Manslaughter',
    outcomeCategory: 'Indicted',
    qualifiedImmunity: 'Denied (State Criminal Charges Filed)',
    summary: 'Senior Airman Roger Fortson, an active-duty 23-year-old U.S. Air Force special operations member, was relaxing in his apartment on FaceTime with his girlfriend. Deputy Eddie Duran was dispatched to the wrong apartment on a vague disturbance call. Fortson heard aggressive banging, retrieved his legally owned firearm, and held it pointed safely toward the ground. When Fortson opened the door, Duran immediately shot him six times without giving any verbal warning to drop the weapon.',
    keyInjustices: [
      'Deputy went to the wrong apartment without verifying unit number or disturbance origin',
      'Airman Fortson was legally holding his firearm pointed downward with zero aggressive motion',
      'Deputy fired within 2 seconds of the door opening before giving any instruction to disarm',
      'Internal affairs investigation determined Fortson acted with complete legality inside his own home'
    ],
    officersInvolved: [
      {
        name: 'Eddie Duran',
        badge: 'Deputy #718',
        status: 'Fired & Charged with Manslaughter with a Firearm (Aug 2024)',
        priorIncidents: 'Internal affairs found lethal force was unjustified and objectively unreasonable',
        repeatOffender: true
      }
    ],
    settlementAmount: 'Federal Wrongful Death Civil Rights Lawsuit Filed',
    taxpayerCost: 'Okaloosa County municipal defense and liability insurance',
    bodycamAvailable: true,
    bodycamDuration: '4 mins 18 secs (Bodycam Released by Sheriff)',
    evidenceCount: 16,
    petitionSignatures: 450000,
    petitionGoal: 500000,
    familyFundRaised: 620000,
    familyFundGoal: 750000,
    attorney: 'Ben Crump & Associates',
    tags: ['Active Duty Military', 'Wrong Door', 'Manslaughter Charges', 'Bodycam Released'],
    timeline: [
      { date: '2024-05-03 16:30', title: 'Fatal Encounter', description: 'Deputy Eddie Duran knocks on apartment door; fires 6 shots upon door opening.' },
      { date: '2024-05-31', title: 'Internal Affairs Finding', description: 'Okaloosa County Sheriff fires Duran, ruling Fortson committed no crime and posed no threat.' },
      { date: '2024-08-23', title: 'Criminal Charges Filed', description: 'Florida State Attorney formally charges Eddie Duran with first-degree felony manslaughter with a firearm.' }
    ]
  },
  {
    id: 'case-dexter-reed',
    title: 'Dexter Reed 96-Shot Traffic Stop Escalation',
    victim: 'Dexter Reed',
    age: 26,
    date: '2024-03-21',
    location: 'Chicago, Illinois (Humboldt Park)',
    jurisdiction: 'Chicago Police Department (Tactical Unit)',
    status: 'Under COPA & State Attorney Investigation',
    outcomeCategory: 'Active Investigation',
    qualifiedImmunity: 'Challenged in Federal Court',
    summary: 'Dexter Reed was pulled over in Humboldt Park by five tactical officers in an unmarked CPD vehicle for an alleged seatbelt violation. During the stop, officers surrounded the vehicle with guns drawn. Gunfire erupted, and four officers discharged 96 rounds in 41 seconds, including firing three shots after Reed had exited the vehicle and lay motionless on the ground. COPA raised grave concerns regarding the pretextual nature of the stop and officer credibility.',
    keyInjustices: [
      'Five tactical officers in plainclothes deployed for a minor alleged seatbelt violation',
      'Officers discharged 96 rounds in 41 seconds in a residential neighborhood',
      'COPA questioned officer honesty regarding whether they could have seen a seatbelt through heavily tinted windows',
      'Continued fire directed at the suspect after he was already incapacitated on the pavement'
    ],
    officersInvolved: [
      { name: 'Officer A. Curley', badge: 'Tactical #4419', status: 'Under COPA Investigation', repeatOffender: true },
      { name: 'Officer B. Martinez', badge: 'Tactical #3812', status: 'Relieved of Police Powers', repeatOffender: false }
    ],
    settlementAmount: 'Federal Civil Rights Lawsuit Pending',
    taxpayerCost: 'City of Chicago outside defense counsel',
    bodycamAvailable: true,
    bodycamDuration: '30+ Video Files Released by COPA',
    evidenceCount: 38,
    petitionSignatures: 165000,
    petitionGoal: 200000,
    familyFundRaised: 180000,
    familyFundGoal: 250000,
    attorney: 'Andrew M. Stroth (Action Injury Law Group)',
    tags: ['Pretextual Stop', '96 Shots', 'Tactical Unit', 'COPA Inquiry'],
    timeline: [
      { date: '2024-03-21', title: 'Traffic Stop', description: 'Tactical unit stops Reed; 96 shots fired in 41 seconds.' },
      { date: '2024-04-09', title: 'COPA Evidence Release', description: 'COPA releases 30+ body camera videos and 911 audio recordings.' },
      { date: '2024-04-24', title: 'Federal Lawsuit Filed', description: 'Reed family files civil rights lawsuit alleging unconstitutional pretextual stops.' }
    ]
  },
  {
    id: 'case-tyre-nichols',
    title: 'Tyre Nichols & The SCORPION Unit Abuse of Power',
    victim: 'Tyre Nichols',
    age: 29,
    date: '2023-01-07',
    location: 'Memphis, Tennessee',
    jurisdiction: 'Memphis Police Department (SCORPION Unit)',
    status: 'Multiple Federal Convictions / Civil Settlement Pending',
    outcomeCategory: 'Convicted / Settlement',
    qualifiedImmunity: 'Denied',
    summary: 'Tyre Nichols was pulled over for alleged reckless driving (unsubstantiated by video). Officers dragged him from his car, pepper-sprayed him, and pursued him on foot before brutally beating him while he was restrained, calling out for his mother. The specialized SCORPION unit had a pattern of unconstitutional aggressive tactics that had been repeatedly ignored by leadership.',
    keyInjustices: [
      'Specialized tactical unit (SCORPION) operated with zero civilian oversight',
      'Fabricated initial reason for traffic stop without corroborating traffic cam data',
      'Paramedics on scene delayed administering critical medical aid for 27 minutes',
      'Officers colluded on police radio to fabricate a resisting-arrest narrative'
    ],
    officersInvolved: [
      { name: 'Tadarrius Bean', badge: '#4412', status: 'Convicted in Federal Court (Oct 2024)', repeatOffender: true },
      { name: 'Demetrius Haley', badge: '#3891', status: 'Convicted of Civil Rights Violations (Oct 2024)', repeatOffender: true },
      { name: 'Emmitt Martin III', badge: '#2910', status: 'Pled Guilty to Federal Civil Rights Charges', repeatOffender: false },
      { name: 'Justin Smith', badge: '#5102', status: 'Convicted in Federal Court (Oct 2024)', repeatOffender: false },
      { name: 'Desmond Mills Jr.', badge: '#1834', status: 'Pled Guilty to Federal Charges', repeatOffender: false }
    ],
    settlementAmount: '$550M Federal Civil Suit Filed',
    taxpayerCost: '$12M+ in municipal legal defense & unit restructuring costs',
    bodycamAvailable: true,
    bodycamDuration: '4 Separate Angles (Pole Cam & Bodycams)',
    evidenceCount: 42,
    petitionSignatures: 890000,
    petitionGoal: 1000000,
    familyFundRaised: 1450000,
    familyFundGoal: 1500000,
    attorney: 'Romanucci & Blandin / Ben Crump',
    tags: ['Tactical Unit', 'Civil Rights Convictions', 'Traffic Stop Escalation', 'Medical Neglect'],
    timeline: [
      { date: '2023-01-07', title: 'Traffic Stop & Beating', description: 'Officers stop Tyre Nichols 2 minutes from his home.' },
      { date: '2023-01-10', title: 'Passing', description: 'Tyre Nichols succumbs to internal injuries in the hospital.' },
      { date: '2023-01-20', title: 'Officers Fired', description: 'MPD terminates 5 officers after internal investigation.' },
      { date: '2023-01-27', title: 'Footage Released', description: 'City of Memphis releases pole camera and body camera footage.' },
      { date: '2024-10-03', title: 'Federal Jury Verdicts', description: 'Federal jury finds Haley, Bean, and Smith guilty of witness tampering and civil rights offenses.' }
    ]
  },
  {
    id: 'case-breonna-taylor',
    title: 'Breonna Taylor No-Knock Warrant & Cover-Up',
    victim: 'Breonna Taylor',
    age: 26,
    date: '2020-03-13',
    location: 'Louisville, Kentucky',
    jurisdiction: 'Louisville Metro Police Department (LMPD)',
    status: 'Federal Convictions & $12M Settlement',
    outcomeCategory: 'Settlement / Federal Charges',
    qualifiedImmunity: 'Overruled by Federal Civil Rights Statutes',
    summary: 'LMPD officers executed a flawed middle-of-the-night no-knock search warrant on Breonna Taylor\'s apartment. Detective Kelly Goodlett admitted to falsifying the affidavit used to obtain the warrant and conspiring with Detective Joshua Jaynes to lie to federal investigators after Taylor was fatally shot in her hallway.',
    keyInjustices: [
      'Falsified sworn warrant affidavit claiming postal inspector verified packages',
      'Post-shooting conspiracy between detectives in a garage to coordinate false statements',
      'No ambulance stationed on scene despite tactical entry plan',
      'Original incident report listed injuries as "None" and forced entry as "No"'
    ],
    officersInvolved: [
      { name: 'Joshua Jaynes', badge: 'Det. #8812', status: 'DOJ Indictment for Falsifying Warrant Affidavit', repeatOffender: true },
      { name: 'Kelly Goodlett', badge: 'Det. #7621', status: 'Pled Guilty to Conspiracy in Federal Court', repeatOffender: false },
      { name: 'Brett Hankison', badge: 'Officer #4190', status: 'Convicted in Federal Retrial of Excessive Force (Nov 2024)', repeatOffender: true },
      { name: 'Myles Cosgrove', badge: 'Officer #5531', status: 'Fired by LMPD; hired by Carroll County Sheriff', repeatOffender: true }
    ],
    settlementAmount: '$12,000,000 Paid to Estate',
    taxpayerCost: '$12M direct payout + $4.8M outside counsel fees (Louisville Taxpayers)',
    bodycamAvailable: false,
    bodycamDuration: 'Officers failed to activate body cameras during raid',
    evidenceCount: 64,
    petitionSignatures: 11400000,
    petitionGoal: 12000000,
    familyFundRaised: 6800000,
    familyFundGoal: 7000000,
    attorney: 'Sam Aguiar & Lonita Baker',
    tags: ['No-Knock Warrant', 'Falsified Affidavit', 'Federal Conviction', 'DOJ Consent Decree'],
    timeline: [
      { date: '2020-03-13', title: 'Midnight Raid', description: 'Officers batter down apartment door; 32 rounds fired.' },
      { date: '2020-09-15', title: 'City Settlement', description: 'Louisville agrees to $12M settlement and police reforms.' },
      { date: '2022-08-04', title: 'DOJ Indictments', description: 'Federal civil rights charges filed against 4 officers for falsifying warrant.' },
      { date: '2023-03-08', title: 'DOJ Findings', description: 'DOJ finds LMPD engaged in pattern of unconstitutional searches and discrimination.' },
      { date: '2024-11-01', title: 'Hankison Federal Conviction', description: 'Hankison found guilty in federal court of violating Taylor’s civil rights.' }
    ]
  },
  {
    id: 'case-elijah-mcclain',
    title: 'Elijah McClain Carotid Hold & Ketamine Injustice',
    victim: 'Elijah McClain',
    age: 23,
    date: '2019-08-24',
    location: 'Aurora, Colorado',
    jurisdiction: 'Aurora Police Department & Aurora Fire Rescue',
    status: 'Officer & Paramedic Convictions / $15M Settlement',
    outcomeCategory: 'Convicted / Settlement',
    qualifiedImmunity: 'Denied',
    summary: 'Elijah McClain, a 23-year-old massage therapist and violinist walking home from a convenience store wearing a ski mask due to anemia, was stopped for being "suspicious". Officers tackled him, applied two carotid neck restraints causing loss of consciousness, and paramedics injected him with 500mg of ketamine (dosed for a 220lb person, McClain weighed 140lbs).',
    keyInjustices: [
      'Zero crime reported or committed; stopped solely for wearing clothing to stay warm',
      'Paramedics injected lethal ketamine dosage without taking vital signs',
      'Original DA Dave Young refused to file any charges claiming inconclusive autopsy',
      'Officers photographed themselves reenacting chokehold at Elijah\'s memorial'
    ],
    officersInvolved: [
      { name: 'Randy Roedema', badge: 'Officer #3319', status: 'Convicted of Criminally Negligent Homicide & 3rd Degree Assault', repeatOffender: true },
      { name: 'Nathan Woodyard', badge: 'Officer #2104', status: 'Acquitted at Trial; Reinstated with $212k Backpay', repeatOffender: true },
      { name: 'Peter Cichuniec', badge: 'Paramedic Lt.', status: 'Convicted of Criminally Negligent Homicide (5 yrs prison)', repeatOffender: false },
      { name: 'Jeremy Cooper', badge: 'Paramedic', status: 'Convicted of Criminally Negligent Homicide (Probation)', repeatOffender: false }
    ],
    settlementAmount: '$15,000,000 Settlement Paid by Aurora',
    taxpayerCost: '$15M settlement + $3.1M city legal costs (largest in Colorado history)',
    bodycamAvailable: true,
    bodycamDuration: 'Audio & Dislodged Video Footage',
    evidenceCount: 35,
    petitionSignatures: 3100000,
    petitionGoal: 3500000,
    familyFundRaised: 2200000,
    familyFundGoal: 2500000,
    attorney: 'Mari Newman (Killmer, Lane & Newman)',
    tags: ['Ketamine Overdose', 'Carotid Restraint', 'Colorado Consent Decree', 'Paramedic Liability'],
    timeline: [
      { date: '2019-08-24', title: 'Detention & Injection', description: 'Elijah McClain detained walking home; injected with ketamine.' },
      { date: '2019-08-30', title: 'Declared Brain Dead', description: 'Removed from life support 6 days after the encounter.' },
      { date: '2020-06-25', title: 'State Reopening', description: 'Governor Jared Polis appoints Special Prosecutor Phil Weiser.' },
      { date: '2021-11-19', title: '$15M Record Settlement', description: 'City of Aurora approves record payout to Sheneen McClain.' },
      { date: '2023-12-22', title: 'First Paramedic Prison Sentence', description: 'Paramedic Lt. Peter Cichuniec sentenced to 5 years in state prison.' }
    ]
  },
  {
    id: 'case-george-floyd',
    title: 'George Floyd Murder & Minneapolis Police Dept Consent Decree',
    victim: 'George Floyd',
    age: 46,
    date: '2020-05-25',
    location: 'Minneapolis, Minnesota',
    jurisdiction: 'Minneapolis Police Department (MPD)',
    status: 'State & Federal Convictions / $27M Settlement',
    outcomeCategory: 'Convicted / Settlement',
    qualifiedImmunity: 'Denied (Murder & Federal Civil Rights Convictions)',
    summary: 'George Floyd was arrested outside Cup Foods for an alleged counterfeit $20 bill. Officer Derek Chauvin knelt on Floyd\'s neck for 9 minutes and 29 seconds while Floyd was handcuffed face-down on asphalt pleading "I can\'t breathe." Three other officers assisted in restraining Floyd and holding back horrified civilian bystanders. The incident triggered global civil rights uprisings and a comprehensive DOJ civil rights finding against MPD.',
    keyInjustices: [
      'Lethal knee-to-neck restraint applied for 9 minutes and 29 seconds on an incapacitated person',
      'Officers prevented off-duty firefighter and civilian witnesses from administering CPR',
      'Initial MPD press release titled incident "Man Dies After Medical Incident During Police Interaction"',
      'DOJ investigation revealed decades-long pattern of excessive force and racial discrimination'
    ],
    officersInvolved: [
      { name: 'Derek Chauvin', badge: 'Officer #1087', status: 'Convicted of 2nd Degree Murder (22.5 yrs) & Federal Civil Rights Violation (21 yrs)', repeatOffender: true },
      { name: 'Tou Thao', badge: 'Officer #7162', status: 'Convicted in State & Federal Court (4.75 yrs)', repeatOffender: true },
      { name: 'J. Alexander Kueng', badge: 'Officer #8911', status: 'Convicted in State & Federal Court (3.5 yrs)', repeatOffender: false },
      { name: 'Thomas Lane', badge: 'Officer #4102', status: 'Convicted in State & Federal Court (3 yrs)', repeatOffender: false }
    ],
    settlementAmount: '$27,000,000 Paid to Floyd Family',
    taxpayerCost: '$27M municipal settlement + millions in consent decree compliance monitoring',
    bodycamAvailable: true,
    bodycamDuration: 'Darnella Frazier Eyewitness Video + 4 Officer Bodycams',
    evidenceCount: 88,
    petitionSignatures: 19500000,
    petitionGoal: 20000000,
    familyFundRaised: 14200000,
    familyFundGoal: 15000000,
    attorney: 'Ben Crump & Antonio Romanucci',
    tags: ['Landmark Conviction', 'DOJ Findings', 'Eyewitness Video', 'Federal Civil Rights'],
    timeline: [
      { date: '2020-05-25', title: 'Fatal Encounter', description: 'George Floyd held in neck restraint for 9:29; Darnella Frazier records video.' },
      { date: '2020-05-26', title: 'Officers Fired', description: 'Minneapolis Chief Medaria Arradondo fires all 4 officers.' },
      { date: '2021-04-20', title: 'Chauvin Verdict', description: 'Derek Chauvin found guilty of second-degree murder, third-degree murder, and manslaughter.' },
      { date: '2023-06-16', title: 'DOJ Findings Report', description: 'DOJ releases scathing Section 14141 report documenting unconstitutional force by MPD.' }
    ]
  },
  {
    id: 'case-tamir-rice',
    title: 'Tamir Rice 2-Second Shooting & Dispatch Failure',
    victim: 'Tamir Rice',
    age: 12,
    date: '2014-11-22',
    location: 'Cleveland, Ohio',
    jurisdiction: 'Cleveland Division of Police',
    status: '$6M Settlement / Officer Fired for Lying on Application',
    outcomeCategory: 'Settlement / No Criminal Conviction',
    qualifiedImmunity: 'Granted at County Level / No Charges by Grand Jury',
    summary: '12-year-old Tamir Rice was playing with a toy airsoft gun in a park. A 911 caller explicitly told the dispatcher that the gun was "probably fake" and the person was "probably a juvenile", but the dispatcher failed to relay this crucial context. Within 2 seconds of arrival, Officer Timothy Loehmann exited his patrol car and shot Tamir. Loehmann had been deemed "unfit for duty" and emotionally unstable by his previous department in Independence, Ohio.',
    keyInjustices: [
      'Officer fired within less than two seconds of patrol car coming to a halt',
      'Officer was previously forced to resign from Independence PD due to emotional instability',
      'Cleveland PD failed to inspect personnel file before hiring Loehmann',
      'No state criminal charges brought against shooter by County Prosecutor Timothy McGinty'
    ],
    officersInvolved: [
      { name: 'Timothy Loehmann', badge: 'Officer #1882', status: 'Fired for lying on job application; no criminal charges', repeatOffender: true },
      { name: 'Frank Garmback', badge: 'Officer #1220', status: 'Suspended 500 days; reinstated', repeatOffender: true }
    ],
    settlementAmount: '$6,000,000 Paid to Rice Family',
    taxpayerCost: '$6M settlement funded via Cleveland municipal bonds + $2.4M legal fees',
    bodycamAvailable: true,
    bodycamDuration: 'Recreation Center Security Camera Footage',
    evidenceCount: 29,
    petitionSignatures: 1800000,
    petitionGoal: 2000000,
    familyFundRaised: 950000,
    familyFundGoal: 1000000,
    attorney: 'Subodh Chandra (The Chandra Law Firm)',
    tags: ['Juvenile Victim', 'Dispatcher Failure', 'Gypsy Cop', 'Qualified Immunity Shield'],
    timeline: [
      { date: '2014-11-22', title: 'Fatal Encounter', description: 'Patrol car slides onto grass at Cudell Rec Center; Tamir shot in 2 seconds.' },
      { date: '2015-12-28', title: 'Grand Jury Decision', description: 'Grand jury declines to indict officers.' },
      { date: '2016-04-25', title: '$6M Settlement', description: 'City of Cleveland settles federal wrongful death lawsuit.' },
      { date: '2017-05-30', title: 'Loehmann Fired', description: 'Terminated not for the shooting, but for falsifying employment application.' }
    ]
  }
];
