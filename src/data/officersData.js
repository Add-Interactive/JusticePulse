export const initialOfficers = [
  {
    id: 'off-sean-grayson',
    name: 'Sean Grayson',
    badge: 'Deputy #142',
    department: 'Sangamon County Sheriff\'s Office (Former)',
    state: 'Illinois',
    totalComplaints: 14,
    sustainedComplaints: 6,
    settlementsPaid: '$15,000,000 (Pending Civil Claim)',
    bradyListStatus: 'Flagged / Brady Disclosed',
    repeatOffenderScore: '96/100 (Severe Risk)',
    departmentsServed: [
      { name: 'Kincaid Police Dept', years: '2020-2021', reasonForLeaving: 'Disciplinary reprimands' },
      { name: 'Virden Police Dept', years: '2021-2021', reasonForLeaving: 'Short tenure' },
      { name: 'Auburn Police Dept', years: '2021-2022', reasonForLeaving: 'Policy violations' },
      { name: 'Logan County Sheriff', years: '2022-2023', reasonForLeaving: 'High-speed chase reprimand' },
      { name: 'Sangamon County Sheriff', years: '2023-2024', reasonForLeaving: 'Terminated & Indicted for Murder' }
    ],
    casesInvolved: ['Sonya Massey Fatal Shooting'],
    status: 'Incarcerated / Awaiting Criminal Trial',
    notes: 'Prior discharge from US Army for serious misconduct. 2 civilian DUI convictions omitted from initial application disclosures.'
  },
  {
    id: 'off-brett-hankison',
    name: 'Brett Hankison',
    badge: 'Officer #4190 (Former LMPD)',
    department: 'Louisville Metro Police Department',
    state: 'Kentucky',
    totalComplaints: 28,
    sustainedComplaints: 9,
    settlementsPaid: '$12,000,000 (Part of Breonna Taylor Settlement)',
    bradyListStatus: 'Flagged on Brady List',
    repeatOffenderScore: '92/100 (High Risk)',
    departmentsServed: [
      { name: 'Louisville Metro PD', years: '2003-2020', reasonForLeaving: 'Fired for blindly firing 10 rounds through patio door' }
    ],
    casesInvolved: ['Breonna Taylor No-Knock Raid', 'Multiple Prior Sexual Harassment & Unlawful Search Claims'],
    status: 'Convicted in Federal Court (Nov 2024)',
    notes: 'Named in multiple prior civil rights lawsuits alleging harassment of patrons outside bars in downtown Louisville.'
  },
  {
    id: 'off-timothy-loehmann',
    name: 'Timothy Loehmann',
    badge: 'Officer #1882',
    department: 'Cleveland Division of Police (Former)',
    state: 'Ohio',
    totalComplaints: 8,
    sustainedComplaints: 4,
    settlementsPaid: '$6,000,000 (Tamir Rice Settlement)',
    bradyListStatus: 'Flagged',
    repeatOffenderScore: '89/100 (Critical Risk)',
    departmentsServed: [
      { name: 'Independence Police Dept', years: '2012-2012', reasonForLeaving: 'Deemed emotionally unstable and unfit for duty' },
      { name: 'Cleveland Police Dept', years: '2014-2017', reasonForLeaving: 'Fired for lying on job application' },
      { name: 'Bellaire Police Dept', years: '2018-2018', reasonForLeaving: 'Withdrew after public protests' },
      { name: 'Tioga Police Dept (PA)', years: '2022-2022', reasonForLeaving: 'Withdrew after town outrage' }
    ],
    casesInvolved: ['Tamir Rice Fatal 2-Second Shooting'],
    status: 'Barred from active duty by public accountability actions',
    notes: 'Classic example of "Gypsy Cop" phenomenon: repeatedly hired by small municipal departments despite damning personnel records.'
  },
  {
    id: 'off-derek-chauvin',
    name: 'Derek Chauvin',
    badge: 'Officer #1087 (Former MPD)',
    department: 'Minneapolis Police Department',
    state: 'Minnesota',
    totalComplaints: 22,
    sustainedComplaints: 4,
    settlementsPaid: '$27,000,000 (George Floyd Record Settlement)',
    bradyListStatus: 'Convicted Felon / Brady Disclosed',
    repeatOffenderScore: '99/100 (Extreme Risk)',
    departmentsServed: [
      { name: 'Minneapolis Police Dept', years: '2001-2020', reasonForLeaving: 'Fired & Convicted of 2nd Degree Murder' }
    ],
    casesInvolved: ['George Floyd Murder', 'Zoya Code 2017 Chokehold Incident', 'John Pope 2017 Child Restraint ($7.5M settlement)'],
    status: 'Serving 22.5 years (State) + 21 years (Federal)',
    notes: 'Accumulated 22 formal internal affairs complaints over 19 years with almost zero corrective discipline from department supervisors.'
  },
  {
    id: 'off-nathan-woodyard',
    name: 'Nathan Woodyard',
    badge: 'Officer #2104',
    department: 'Aurora Police Department',
    state: 'Colorado',
    totalComplaints: 11,
    sustainedComplaints: 2,
    settlementsPaid: '$15,000,000 (Part of McClain Settlement)',
    bradyListStatus: 'Active Officer / Monitored',
    repeatOffenderScore: '78/100 (Elevated Risk)',
    departmentsServed: [
      { name: 'Aurora Police Dept', years: '2017-Present', reasonForLeaving: 'Acquitted at trial; reinstated with $212,546 backpay' }
    ],
    casesInvolved: ['Elijah McClain Fatal Restraint'],
    status: 'Reinstated on City Payroll',
    notes: 'Applied the initial carotid hold on Elijah McClain within 8 seconds of arriving at scene without establishing reasonable suspicion.'
  },
  {
    id: 'off-demetrius-haley',
    name: 'Demetrius Haley',
    badge: 'Officer #3891 (SCORPION Unit)',
    department: 'Memphis Police Department',
    state: 'Tennessee',
    totalComplaints: 19,
    sustainedComplaints: 5,
    settlementsPaid: '$550M Civil Litigation Pending',
    bradyListStatus: 'Flagged & Convicted',
    repeatOffenderScore: '95/100 (Severe Risk)',
    departmentsServed: [
      { name: 'Shelby County Corrections', years: '2015-2020', reasonForLeaving: 'Inmate excessive force lawsuit filed against him' },
      { name: 'Memphis Police Dept', years: '2020-2023', reasonForLeaving: 'Fired & Indicted for Deprivation of Civil Rights' }
    ],
    casesInvolved: ['Tyre Nichols Fatal Beating'],
    status: 'Convicted in Federal Court (Oct 2024)',
    notes: 'Took cell phone photos of injured Tyre Nichols and sent them to multiple personal contacts within 15 minutes of the beating.'
  }
];
