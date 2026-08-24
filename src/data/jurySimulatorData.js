export const initialGrandJuryCases = [
  {
    id: 'gj-massey',
    title: 'Grand Jury Indictment Hearing: State of Illinois v. Sean Grayson',
    defendant: 'Former Deputy Sean Grayson (Sangamon County Sheriff)',
    chargesPled: [
      { id: 'ch1', name: 'Three (3) Counts of First-Degree Murder (720 ILCS 5/9-1)', minSentence: '45 Years to Natural Life' },
      { id: 'ch2', name: 'One (1) Count of Aggravated Battery with a Firearm (720 ILCS 5/12-3.05)', minSentence: '6 to 30 Years' },
      { id: 'ch3', name: 'One (1) Count of Official Misconduct (720 ILCS 5/33-3)', minSentence: '2 to 5 Years' }
    ],
    exhibitsPresented: [
      { id: 'ex-1', title: '14-Minute ISP Bodycam Footage', summary: 'Shows Sonya Massey complying with instructions to turn off boiling water with oven mitt.' },
      { id: 'ex-2', title: 'CAD Radio Dispatch Call Log #01-14', summary: 'Deputies initially radioed dispatch claiming self-inflicted wound.' },
      { id: 'ex-3', title: 'County Personnel Disciplinary Audit', summary: 'Omission of prior military misconduct discharge on application file.' }
    ],
    grandJuryThreshold: 12, // out of 16 jurors needed for True Bill
    communityVotes: {
      trueBill: 18420,
      noBill: 340
    }
  },
  {
    id: 'gj-fortson',
    title: 'Grand Jury Indictment Hearing: State of Florida v. Eddie Duran',
    defendant: 'Former Deputy Eddie Duran (Okaloosa County Sheriff)',
    chargesPled: [
      { id: 'ch-f1', name: 'Manslaughter with a Firearm (First-Degree Felony, Fla. Stat. § 782.07)', minSentence: 'Up to 30 Years Imprisonment' }
    ],
    exhibitsPresented: [
      { id: 'ex-f1', title: 'Deputy Bodycam Optical Track', summary: 'Shows Airman Fortson holding handgun pointed downwards at floor without raising weapon.' },
      { id: 'ex-f2', title: 'Sheriff Internal Affairs Investigative Finding', summary: 'IA determined lethal force was deployed within 2 seconds with zero imminent threat.' },
      { id: 'ex-f3', title: 'Eyewitness FaceTime Audio Stream', summary: 'Witness verified Fortson inquired who was at door before opening.' }
    ],
    grandJuryThreshold: 12,
    communityVotes: {
      trueBill: 15980,
      noBill: 410
    }
  }
];
