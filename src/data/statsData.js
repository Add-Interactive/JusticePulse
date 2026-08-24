export const nationalStats = {
  totalTaxpayerSettlements10Yr: '$3.28 Billion+',
  fatalEncountersAnnualAverage: '1,175 people per year',
  officersConvictedPercent: '< 1.8%',
  qualifiedImmunityShieldRate: '82.4%',
  repeatOffenderPrevalence: '71% of civilian complaints involve top 10% of repeat officers',
  gypsyCopCrossHiringRate: '44% of fired officers find another police job within 3 years',
  cities: [
    { name: 'New York, NY', settlements: 1150, lawsuits: 4200, avgPerYear: '$115M', population: '8.3M', shieldRate: '79%' },
    { name: 'Chicago, IL', settlements: 672, lawsuits: 3100, avgPerYear: '$67M', population: '2.7M', shieldRate: '86%' },
    { name: 'Los Angeles, CA', settlements: 310, lawsuits: 1800, avgPerYear: '$31M', population: '3.8M', shieldRate: '81%' },
    { name: 'Philadelphia, PA', settlements: 145, lawsuits: 950, avgPerYear: '$14.5M', population: '1.6M', shieldRate: '78%' },
    { name: 'Memphis, TN', settlements: 82, lawsuits: 410, avgPerYear: '$8.2M', population: '620k', shieldRate: '88%' },
    { name: 'Aurora, CO', settlements: 48, lawsuits: 210, avgPerYear: '$4.8M', population: '390k', shieldRate: '84%' },
    { name: 'Louisville, KY', settlements: 56, lawsuits: 315, avgPerYear: '$5.6M', population: '630k', shieldRate: '85%' },
    { name: 'Houston, TX', settlements: 68, lawsuits: 480, avgPerYear: '$6.8M', population: '2.3M', shieldRate: '83%' }
  ],
  systemicInjusticeTypes: [
    { title: 'Qualified Immunity', desc: 'Court doctrine shielding officers from constitutional liability unless previous court ruled identical exact fact scenario unconstitutional.', impact: 'Blocks 82% of civil rights victims from jury trials.' },
    { title: 'Brady List Concealment', desc: 'Prosecutors routinely fail to disclose known police perjury and dishonesty records to criminal defense attorneys.', impact: 'Causes thousands of wrongful convictions.' },
    { title: 'The "Gypsy Cop" Loophole', desc: 'Officers fired for brutality or domestic abuse quietly resign and get hired in neighboring small towns.', impact: 'Enables serial violators to remain armed.' },
    { title: 'Taxpayer Indemnification', desc: 'Settlements are paid out of municipal public education and road funds, not officer pensions or liability insurance.', impact: 'Removes all personal financial deterrents.' }
  ]
};
