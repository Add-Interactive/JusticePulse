export const initialInvestigationBoards = [
  {
    id: 'board-sangamon',
    title: 'Sangamon County Deputy Sean Grayson Hiring & Misconduct Chain',
    caseId: 'case-sonya-massey',
    description: 'Visual evidence matrix establishing supervisory knowledge, prior discharge bypasses, and 4th Amendment Monell municipal liability.',
    nodes: [
      {
        id: 'n-grayson',
        type: 'person_officer',
        title: 'Deputy Sean Grayson',
        subtitle: 'Shooter / Former Deputy #142',
        x: 420,
        y: 200,
        status: 'Indicted for Murder',
        evidenceHash: 'SHA256:8F91B0...4E1',
        details: 'Discharged from U.S. Army for serious misconduct; 2 prior civilian DUIs; worked at 6 departments in 4 years.',
        tags: ['Officer', 'Repeat Risk', 'Brady Flag']
      },
      {
        id: 'n-massey',
        type: 'person_victim',
        title: 'Sonya Massey',
        subtitle: 'Victim / 911 Distress Caller',
        x: 120,
        y: 200,
        status: 'Deceased (Age 36)',
        evidenceHash: 'SHA256:A14C99...98B',
        details: 'Called 911 for intruder assistance. Unarmed; holding cooking water pot upon deputy command.',
        tags: ['Victim', '911 Caller']
      },
      {
        id: 'n-bodycam',
        type: 'evidence_media',
        title: '14-Min ISP Bodycam Video',
        subtitle: 'Uncut Optical Exhibit #1',
        x: 270,
        y: 360,
        status: 'Verified Admissible',
        evidenceHash: 'SHA256:C771E9...52F',
        details: 'Proves Grayson escalated encounter within seconds, shouted expletives, and drew 9mm firearm with zero weapon threat.',
        tags: ['Video Evidence', 'Chain of Custody']
      },
      {
        id: 'n-army-record',
        type: 'evidence_doc',
        title: 'U.S. Army Discharge Record',
        subtitle: 'Misconduct Discharge (2016)',
        x: 700,
        y: 100,
        status: 'FOIA Obtained',
        evidenceHash: 'SHA256:D388A1...710',
        details: 'Documented serious military disciplinary violations that should have automatically flagged background screening.',
        tags: ['Personnel File', 'Military Record']
      },
      {
        id: 'n-dui-records',
        type: 'evidence_doc',
        title: '2x Civilian DUI Convictions',
        subtitle: 'Macoupin County Court Records',
        x: 700,
        y: 280,
        status: 'Certified Court Record',
        evidenceHash: 'SHA256:E991F2...33C',
        details: 'Two separate DUI convictions omitted from initial Sangamon County public disclosures.',
        tags: ['Criminal Record', 'Omission']
      },
      {
        id: 'n-monell-policy',
        type: 'legal_violation',
        title: 'Monell Failure to Screen Claim',
        subtitle: '42 U.S.C. § 1983 Supervisory Liability',
        x: 420,
        y: 30,
        status: 'Plead in Federal Complaint',
        evidenceHash: 'SHA256:F102B9...88A',
        details: 'Establishes Sangamon County custom of deliberate indifference by hiring high-risk officers without checking prior files.',
        tags: ['Section 1983', 'Municipal Claim']
      },
      {
        id: 'n-prior-agencies',
        type: 'institution',
        title: '5 Prior Municipal Police Depts',
        subtitle: 'Kincaid, Virden, Auburn, Logan Co.',
        x: 700,
        y: 420,
        status: 'POST Registered',
        evidenceHash: 'SHA256:B223E1...66D',
        details: 'History of high-speed chase reprimands and short tenures showing classic "Gypsy Cop" precinct-hopping.',
        tags: ['Agency History', 'Gypsy Cop']
      }
    ],
    connections: [
      { from: 'n-grayson', to: 'n-massey', label: 'Lethal Force Deployed (No Threat)', color: '#ef4444', style: 'solid' },
      { from: 'n-bodycam', to: 'n-grayson', label: 'Corroborates Zero De-Escalation', color: '#0ea5e9', style: 'solid' },
      { from: 'n-bodycam', to: 'n-massey', label: 'Proves Unarmed Compliance', color: '#10b981', style: 'solid' },
      { from: 'n-army-record', to: 'n-grayson', label: 'Pre-Existing Disciplinary Record', color: '#f59e0b', style: 'dashed' },
      { from: 'n-dui-records', to: 'n-grayson', label: 'Prior Criminal History', color: '#f59e0b', style: 'dashed' },
      { from: 'n-prior-agencies', to: 'n-grayson', label: 'Pattern of Precinct Hopping', color: '#a855f7', style: 'solid' },
      { from: 'n-grayson', to: 'n-monell-policy', label: 'Direct Subject of Failure-to-Screen', color: '#e11d48', style: 'solid' },
      { from: 'n-army-record', to: 'n-monell-policy', label: 'Ignored During Background Check', color: '#ef4444', style: 'dashed' }
    ]
  },
  {
    id: 'board-louisville',
    title: 'Breonna Taylor No-Knock Warrant Affidavit Conspiracy',
    caseId: 'case-breonna-taylor',
    description: 'Evidence matrix connecting falsified postal inspection affidavits, garage cover-up conversations, and federal civil rights convictions.',
    nodes: [
      {
        id: 'n-jaynes',
        type: 'person_officer',
        title: 'Det. Joshua Jaynes',
        subtitle: 'Affiant / LMPD Narcotics',
        x: 450,
        y: 100,
        status: 'Indicted by DOJ',
        evidenceHash: 'SHA256:9981A...12',
        details: 'Drafted false search warrant affidavit claiming postal inspector verified packages.',
        tags: ['Affidavit Falsification', 'DOJ Indictment']
      },
      {
        id: 'n-goodlett',
        type: 'person_officer',
        title: 'Det. Kelly Goodlett',
        subtitle: 'LMPD Narcotics Detective',
        x: 680,
        y: 100,
        status: 'Pled Guilty (Federal)',
        evidenceHash: 'SHA256:3341C...88',
        details: 'Admitted in federal plea agreement to falsifying affidavit and coordinating false testimony in Jaynes garage.',
        tags: ['Guilty Plea', 'Key Witness']
      },
      {
        id: 'n-taylor',
        type: 'person_victim',
        title: 'Breonna Taylor',
        subtitle: 'Victim / Emergency Medical Tech',
        x: 120,
        y: 250,
        status: 'Deceased (Age 26)',
        evidenceHash: 'SHA256:7712E...44',
        details: 'Fatal victim of middle-of-the-night raid based on falsified judicial warrant.',
        tags: ['Victim', 'EMT']
      },
      {
        id: 'n-affidavit',
        type: 'evidence_doc',
        title: 'Falsified Search Warrant Affidavit',
        subtitle: 'Signed by Judge Mary Shaw',
        x: 450,
        y: 280,
        status: 'Admitted Falsehood',
        evidenceHash: 'SHA256:4490B...99',
        details: 'Claimed U.S. Postal Inspector confirmed illegal shipments; Postal Inspector verified zero shipments existed.',
        tags: ['Perjury', '4th Amendment']
      },
      {
        id: 'n-postal-memo',
        type: 'evidence_doc',
        title: 'U.S. Postal Inspector Audit Memo',
        subtitle: 'Federal Inspection Service',
        x: 680,
        y: 280,
        status: 'Exculpatory Evidence',
        evidenceHash: 'SHA256:1198A...00',
        details: 'Official federal postal audit confirming Breonna Taylor never received suspicious parcels.',
        tags: ['Brady Material', 'Postal Audit']
      }
    ],
    connections: [
      { from: 'n-jaynes', to: 'n-affidavit', label: 'Authored False Statement', color: '#ef4444', style: 'solid' },
      { from: 'n-goodlett', to: 'n-affidavit', label: 'Co-Conspired & Signed Off', color: '#ef4444', style: 'solid' },
      { from: 'n-postal-memo', to: 'n-affidavit', label: 'Directly Refutes Warrant Claim', color: '#10b981', style: 'solid' },
      { from: 'n-affidavit', to: 'n-taylor', label: 'Unlawful Basis for Fatal Entry', color: '#e11d48', style: 'solid' },
      { from: 'n-jaynes', to: 'n-goodlett', label: 'Garage Post-Shooting Conspiracy Meeting', color: '#a855f7', style: 'dashed' }
    ]
  }
];
