export const depositionWitnesses = [
  {
    id: 'wit-grayson',
    name: 'Deputy Sean Grayson (Former Sangamon County #142)',
    role: 'Primary Shooting Officer',
    caseTitle: 'Sonya Massey Fatal 911 Distress Call Encounter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    exhibitCount: 8,
    status: 'Hostile Witness / Impeached on Prior Misconduct',
    background: 'Discharged from U.S. Army for misconduct in 2016. Accumulated 2 civilian DUIs and served at 6 different municipal police departments in 4 years before fatal shooting of Sonya Massey.',
    crossExaminationLines: [
      {
        id: 'q1',
        question: 'Deputy Grayson, did you disclose your 2016 military discharge for serious misconduct on your Sangamon County employment application?',
        witnessResponse: 'I filled out the standard county application. Whatever the background investigators requested, I provided.',
        impeachmentEvidence: 'Sangamon County FOIA Disciplinary File #IL-2024-098 confirms omission of Army Article 15 disciplinary discharge records.',
        judgeRuling: 'Overruled. Witness must state whether military records were attached to Exhibit 4.',
        scoreBoost: 25
      },
      {
        id: 'q2',
        question: 'Prior to drawing your service weapon, did Ms. Massey make any verbal threat or advance towards you?',
        witnessResponse: 'She was holding a pot of boiling water near the stove and said words that I perceived as a threat.',
        impeachmentEvidence: '14-Minute ISP Bodycam proves Ms. Massey was holding the pot with an oven mitt under deputy instructions and apologized before shots were fired.',
        judgeRuling: 'Impeachment sustained. Bodycam optical record directly contradicts witness perception.',
        scoreBoost: 35
      },
      {
        id: 'q3',
        question: 'Why did the initial CAD radio transmission state the victim had a self-inflicted wound?',
        witnessResponse: 'In the heat of the moment, dispatch was communicating multiple frantic radio broadcasts.',
        impeachmentEvidence: 'CAD Dispatch Log #01-14-10 confirms early attempt to shield officer accountability prior to supervisor arrival.',
        judgeRuling: 'Witness credibility impeached on initial incident reporting.',
        scoreBoost: 40
      }
    ]
  },
  {
    id: 'wit-jaynes',
    name: 'Detective Joshua Jaynes (Former LMPD Narcotics)',
    role: 'Search Warrant Affiant',
    caseTitle: 'Breonna Taylor No-Knock Search Warrant Raid',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    exhibitCount: 12,
    status: 'Hostile Witness / Pled Guilty in Federal Court',
    background: 'Drafted search warrant affidavit for Breonna Taylor\'s apartment claiming U.S. Postal Inspector verified packages. Federal audit verified statement was entirely fabricated.',
    crossExaminationLines: [
      {
        id: 'qj1',
        question: 'Detective Jaynes, did you personally speak with the U.S. Postal Inspector regarding package deliveries to Ms. Taylor\'s residence before swearing the affidavit?',
        witnessResponse: 'I relied on information relayed to me by other officers in the narcotics division.',
        impeachmentEvidence: 'USPIS Federal Postal Inspector Memo confirms zero suspicious packages and zero verification provided to LMPD.',
        judgeRuling: 'Franks v. Delaware violation established: Sworn affidavit contained knowing material falsehoods.',
        scoreBoost: 30
      },
      {
        id: 'qj2',
        question: 'Did you meet with Detective Kelly Goodlett in your garage after the shooting to align your statements to federal investigators?',
        witnessResponse: 'We spoke about the incident as colleagues, but I never instructed anyone to lie.',
        impeachmentEvidence: 'Detective Kelly Goodlett sworn federal plea agreement detailing garage conspiracy meeting.',
        judgeRuling: 'Federal conspiracy to falsify official records corroborated by co-affiant testimony.',
        scoreBoost: 45
      }
    ]
  }
];
