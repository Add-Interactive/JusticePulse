export const initialMultiCamIncidents = [
  {
    id: 'mc-massey',
    title: 'Sonya Massey Fatal Encounter Multi-Angle Synchronization',
    caseTitle: 'Sonya Massey Case (Sangamon County, IL)',
    date: '2024-07-06 01:12:44 CST',
    duration: '14:32',
    description: 'Synchronized multi-perspective timeline comparing Deputy Sean Grayson\'s primary bodycam, assisting deputy\'s bodycam, and cruiser forward dashcam.',
    angles: [
      {
        id: 'ang-1',
        label: 'Deputy Sean Grayson (Shooter Bodycam)',
        badge: 'Deputy #142 (Primary)',
        cameraType: 'Axon Body 3 (1080p 60fps)',
        streamUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
        audioPresent: true,
        notes: 'Unholstered firearm at 01:12:41; fired 3 shots at 01:12:44. No verbal warning to disarm.'
      },
      {
        id: 'ang-2',
        label: 'Assisting Deputy Bodycam (Perpendicular View)',
        badge: 'Deputy #108 (Observer)',
        cameraType: 'Axon Body 3 (1080p 60fps)',
        streamUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        audioPresent: true,
        notes: 'Shows Massey holding pot with oven mitt with hands lowered. Corroborates zero aggressive forward motion.'
      },
      {
        id: 'ang-3',
        label: 'Sangamon County Patrol Cruiser #142 Dashcam',
        badge: 'Cruiser Forward 4RE',
        cameraType: 'WatchGuard 4RE (720p 30fps)',
        streamUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
        audioPresent: false,
        notes: 'Captures exterior arrival at 00:50:12 and emergency medical vehicle arrival timeline at 01:28:10.'
      }
    ],
    timelineEvents: [
      { time: '00:00', title: 'Deputies Arrive on Scene', description: 'Deputies Grayson and partner park outside Massey home.' },
      { time: '04:12', title: 'Entry into Living Room', description: 'Massey permits deputies to enter to check premises.' },
      { time: '12:38', title: 'Stove Pot Directive', description: 'Grayson commands Massey to turn off boiling water.' },
      { time: '12:41', title: 'Weapon Unholstered', description: 'Grayson draws 9mm service weapon and shouts expletives.' },
      { time: '12:44', title: '3 Rounds Discharged', description: 'Fatal shots fired; assisting deputy calls dispatch.' }
    ]
  },
  {
    id: 'mc-fortson',
    title: 'Senior Airman Roger Fortson Apartment Entry Synchronized Replay',
    caseTitle: 'Roger Fortson Case (Okaloosa County, FL)',
    date: '2024-05-03 16:32:18 EST',
    duration: '04:18',
    description: 'Frame-by-frame acoustic timeline demonstrating knock-to-fire duration under 2 seconds.',
    angles: [
      {
        id: 'ang-f1',
        label: 'Deputy Eddie Duran Bodycam (Corridor Angle)',
        badge: 'Deputy #718 (Shooter)',
        cameraType: 'WatchGuard V300 (1080p)',
        streamUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
        audioPresent: true,
        notes: 'Knocked aggressively on unit 433; fired 6 rounds in 2.1 seconds of door opening.'
      },
      {
        id: 'ang-f2',
        label: 'Facetime Audio/Visual Stream (Interior Victim Angle)',
        badge: 'Eyewitness Cloud Stream',
        cameraType: 'iPhone 15 FaceTime Recording',
        streamUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
        audioPresent: true,
        notes: 'Girlfriend on live FaceTime witnessed Fortson retrieving lawful firearm pointing down at floor.'
      }
    ],
    timelineEvents: [
      { time: '00:15', title: 'Deputy Knocks on Wrong Door', description: 'Duran bangs on apartment door without announcing deputy initially.' },
      { time: '01:45', title: 'Door Opens', description: 'Airman Fortson opens door with firearm held at floor.' },
      { time: '01:47', title: '6 Shots Fired', description: 'Lethal force deployed in under 2 seconds without command to disarm.' }
    ]
  }
];
