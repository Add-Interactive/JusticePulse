export const academyCourses = [
  {
    id: 'course-filming',
    title: 'First Amendment: The Constitutional Right to Record Police in Public',
    level: 'Essential / All Citizens',
    duration: '15 mins',
    badgeEarned: 'Certified First Amendment Witness',
    lessons: [
      {
        title: 'Landmark Precedent & Federal Consensus',
        content: 'Every federal appellate circuit court in the United States that has addressed the question has held that the First Amendment protects the public\'s right to record police officers discharging official duties in public places (e.g. Glik v. Cunniffe, Fields v. City of Philadelphia, Turner v. Driver).'
      },
      {
        title: 'Buffer Distance & Avoiding "Obstruction" Traps',
        content: 'Officers cannot order you to stop recording unless you physically obstruct arrest activities. Standing 10 to 15 feet away on a public sidewalk or median satisfies physical non-interference while preserving your line of sight.'
      },
      {
        title: 'Unlawful Demands for Identification',
        content: 'In public spaces, unless police have "reasonable articulable suspicion" that you have committed, are committing, or are about to commit a crime (Terry v. Ohio), simply recording an interaction is NOT a crime and does not legally compel you to provide government ID in non-stop-and-identify states.'
      }
    ],
    quiz: {
      question: 'Under federal constitutional law, can a police officer order you to stop filming on a public sidewalk if you are standing 12 feet away and not physically interfering?',
      options: [
        'No. Filming police in public spaces is protected under the First Amendment (Glik v. Cunniffe / Fields v. Philadelphia).',
        'Yes. Officers have a general privacy right that overrides civilian recording.',
        'Only if you have a state-issued press credential.',
        'Yes, if the department has an internal policy against filming.'
      ],
      correctIndex: 0,
      explanation: 'Correct! The First Amendment explicitly protects the public right to record police officers performing duties in public spaces. Internal department policies cannot override the U.S. Constitution.'
    }
  },
  {
    id: 'course-graham',
    title: 'Fourth Amendment: Objective Reasonableness & The Graham Factors',
    level: 'Intermediate / Legal Observers',
    duration: '20 mins',
    badgeEarned: '4th Amendment Force Analyst',
    lessons: [
      {
        title: 'The Graham v. Connor (1989) Framework',
        content: 'Excessive force claims are judged under the Fourth Amendment\'s "objective reasonableness" standard. The analysis must be from the perspective of a reasonable officer on the scene, rather than with the 20/20 vision of hindsight.'
      },
      {
        title: 'The 3 Mandatory Graham Factors',
        content: 'Courts must weigh: 1) Severity of the crime at issue; 2) Whether the suspect poses an immediate threat to the safety of the officers or others; 3) Whether the suspect is actively resisting arrest or attempting to evade arrest by flight.'
      },
      {
        title: 'Tennessee v. Garner Lethal Force Rule',
        content: 'Officers may NEVER use deadly force against a fleeing non-violent suspect unless there is probable cause to believe the suspect poses a significant threat of death or serious physical injury to officers or the public.'
      }
    ],
    quiz: {
      question: 'Under Graham v. Connor, which of the following is NOT one of the three primary factors courts examine to evaluate police use of force?',
      options: [
        'The officer\'s subjective personal anger or internal mood during the stop.',
        'Whether the suspect poses an immediate threat to safety.',
        'The severity of the crime at issue.',
        'Whether the suspect is actively resisting or attempting to flee.'
      ],
      correctIndex: 0,
      explanation: 'Correct! Graham v. Connor established an "objective" standard. The officer\'s subjective intent or personal anger is legally immaterial; the test focuses on whether the officer\'s actions were objectively reasonable given the totality of the circumstances.'
    }
  },
  {
    id: 'course-monell',
    title: 'Section 1983 Litigation: Defeating Qualified Immunity & Monell Claims',
    level: 'Advanced / Advocates & Law Students',
    duration: '25 mins',
    badgeEarned: 'Section 1983 Litigator Fellow',
    lessons: [
      {
        title: '42 U.S.C. § 1983 Basics',
        content: 'Section 1983 provides a federal civil cause of action against any person who, under color of state law, subjects a citizen to the deprivation of constitutional rights.'
      },
      {
        title: 'Overcoming the Qualified Immunity Shield',
        content: 'Plaintiffs must show: 1) The officer violated a constitutional right; and 2) The right was "clearly established" at the time of the misconduct, meaning existing precedent placed the statutory or constitutional question beyond debate.'
      },
      {
        title: 'Municipal Liability under Monell (1978)',
        content: 'Cities cannot be held liable under respondeat superior (mere employee status). Plaintiffs must prove an official policy, widespread custom/practice, or deliberate indifference in failure to train/screen caused the constitutional injury.'
      }
    ],
    quiz: {
      question: 'To successfully sue a city government under Monell v. Department of Social Services for police brutality, what must a plaintiff prove?',
      options: [
        'That a municipal policy, widespread custom, or deliberate failure to train/screen was the moving force behind the constitutional violation.',
        'Simply that the officer was employed by the city and on duty.',
        'That the mayor was personally present at the scene.',
        'That the police union voted to endorse the officer.'
      ],
      correctIndex: 0,
      explanation: 'Correct! Under Monell, municipalities are not liable under vicarious liability (respondeat superior). The plaintiff must demonstrate an official policy, persistent custom, or deliberate indifference in training/hiring that caused the violation.'
    }
  }
];
