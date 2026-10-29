import { Actor, SpotlightMoment, CastingCall, AuditionApplication, SceneLabPrompt, NotificationItem, StoryGroup, MessageThread } from '../types';

export const HERO_IMAGE_URL = '/src/assets/images/hero_cinematic_acting_1793196920324.jpg';
export const MONOLOGUE_IMAGE_URL = '/src/assets/images/moment_dramatic_monologue_1793196920524.jpg';
export const PERIOD_DRAMA_IMAGE_URL = '/src/assets/images/moment_period_drama_1793196920904.jpg';
export const LEAD_HEADSHOT_URL = '/src/assets/images/actor_headshot_lead_1793196920840.jpg';

export const INITIAL_ACTORS: Actor[] = [
  {
    id: 'actor-maya',
    name: 'Maya Lin',
    headline: 'Screen & Classical Stage Actor · RADA Honours',
    location: 'London / Pinewood, UK',
    locationPrivacy: 'City Only',
    bio: 'British-Singaporean actor trained at the Royal Academy of Dramatic Art. Specializing in intense psychological realism, period drama, and nuanced subtext. Recent West End and independent cinema credits with BBC Film and Film4.',
    languages: ['English (Native)', 'French (Conversational)', 'Mandarin (Basic)'],
    accents: ['British RP (Native)', 'London Contemporary', 'General American', 'Mid-Atlantic'],
    categories: ['Dramatic Monologue', 'Classical & Period', 'Screen Drama', 'Character Secret'],
    skills: ['Stage Combat (Rapier & Dagger Level 2)', 'Meisner Technique', 'Horse Riding', 'Sight Reading', 'Voiceover'],
    height: "5'8\" (173cm)",
    playingAge: '24 - 34',
    headshots: [
      LEAD_HEADSHOT_URL,
      MONOLOGUE_IMAGE_URL
    ],
    showreelUrl: 'https://spotlight-demo-showreels.storage/maya-lin-cinematic-reel-2026.mp4',
    voiceReelUrl: 'https://spotlight-demo-showreels.storage/maya-lin-commercial-audio.mp3',
    availability: 'Available Immediately',
    representation: {
      agencyName: 'Tavistock Wood Artists',
      agentName: 'Eleanor Sterling',
      contactEmail: 'e.sterling@tavistockwood.example',
      phone: '+44 (0)20 7494 2200',
      region: 'UK & International'
    },
    verifiedCredentials: [
      'RADA BA (Hons) in Acting (2022)',
      'Equity UK Professional Member (No. 0049281)',
      'British Academy of Stage & Screen Combat (BASSC Certification)'
    ],
    unverifiedClaims: [
      'Conversational Italian',
      'Classical Violin (Grade 6)'
    ],
    isFollowing: false,
    followerCount: 3840,
    momentsCount: 4,
    featuredMomentId: 'moment-1'
  },
  {
    id: 'actor-julian',
    name: 'Julian Vance',
    headline: 'Classical Stage & Television Drama · Royal Shakespeare Alum',
    location: 'Stratford / London, UK',
    locationPrivacy: 'Public',
    bio: 'Classical stage actor with over 10 years of theatrical and period television experience. Former associate at the Royal Shakespeare Company with leading turns in Hamlet, Richard II, and BBC historical dramas.',
    languages: ['English (Native)', 'German (Conversational)'],
    accents: ['British RP', 'Northern English (Yorkshire)', 'Scottish (Standard)', 'Highland'],
    categories: ['Classical & Period', 'Dramatic Monologue', 'Emotional Range'],
    skills: ['Classical Verse Speaking', 'Fencing', 'Period Waltz', 'Baritone Singing', 'Dialect Coaching'],
    height: "6'1\" (185cm)",
    playingAge: '30 - 42',
    headshots: [
      PERIOD_DRAMA_IMAGE_URL,
      MONOLOGUE_IMAGE_URL
    ],
    showreelUrl: 'https://spotlight-demo-showreels.storage/julian-vance-reel.mp4',
    availability: 'Booking Next Season',
    representation: {
      agencyName: 'Independent Talent Group',
      agentName: 'Arthur Pendelton',
      contactEmail: 'a.pendelton@independenttalent.example',
      region: 'London & Worldwide'
    },
    verifiedCredentials: [
      'Guildhall School of Music & Drama Graduate',
      'Olivier Award Nominee (Best Supporting Actor)',
      'Spotlight UK Verified Talent'
    ],
    unverifiedClaims: [
      'Acoustic Guitarist'
    ],
    isFollowing: true,
    followerCount: 6120,
    momentsCount: 5,
    featuredMomentId: 'moment-2'
  },
  {
    id: 'actor-elena',
    name: 'Elena Rostova',
    headline: 'Action Screen Actor & Movement Artist · Stunt Trained',
    location: 'London & Berlin',
    locationPrivacy: 'City Only',
    bio: 'Physical performer and screen actress known for high-stakes action thrillers, martial arts choreography, and nuanced Eastern European character roles. Certified screen combatant.',
    languages: ['English (Fluent)', 'Russian (Native)', 'German (Fluent)'],
    accents: ['Eastern European', 'Russian', 'German', 'Neutral European'],
    categories: ['Physical & Combat', 'Screen Drama', 'Character Secret'],
    skills: ['Screen Combat', 'Muay Thai Kickboxing', 'Precision Firearms Stunt', 'Wirework', 'Scuba Certified'],
    height: "5'7\" (170cm)",
    playingAge: '26 - 36',
    headshots: [
      LEAD_HEADSHOT_URL
    ],
    showreelUrl: 'https://spotlight-demo-showreels.storage/elena-rostova-action.mp4',
    availability: 'Available Immediately',
    representation: {
      agencyName: 'United Agents Berlin',
      agentName: 'Klaus Weidemann',
      contactEmail: 'klaus@unitedagents-berlin.example',
      region: 'Europe'
    },
    verifiedCredentials: [
      'Ernst Busch Academy of Dramatic Arts Berlin',
      'British Stunt Register Candidate'
    ],
    unverifiedClaims: [
      'Advanced Motorcycle Stunt License'
    ],
    isFollowing: false,
    followerCount: 4290,
    momentsCount: 3,
    featuredMomentId: 'moment-5'
  },
  {
    id: 'actor-marcus',
    name: 'Marcus Brody',
    headline: 'Comedic Timing, Character Improvisation & Voice Actor',
    location: 'Manchester & London, UK',
    locationPrivacy: 'City Only',
    bio: 'Character actor blending deadpan comedic timing with emotional vulnerability. Extensive comedy television pilot work, BBC Radio 4 drama, and video game voiceover performance.',
    languages: ['English (Native)'],
    accents: ['Manchester (Native)', 'Brummie', 'General American', 'Cockney'],
    categories: ['Comedy & Timing', 'Voice / Dialect', 'Improvisation'],
    skills: ['Longform Improv (Second City trained)', 'Voice Characterization', 'Stand-up Comedian', 'Motion Capture'],
    height: "5'10\" (178cm)",
    playingAge: '28 - 38',
    headshots: [
      LEAD_HEADSHOT_URL
    ],
    showreelUrl: 'https://spotlight-demo-showreels.storage/marcus-brody-comedy.mp4',
    availability: 'Available Immediately',
    representation: {
      agencyName: 'Gersh & Partners UK',
      agentName: 'Samira Patel',
      contactEmail: 'spatel@gersh-uk.example',
      region: 'UK'
    },
    verifiedCredentials: [
      'Manchester School of Theatre BA Acting',
      'The Groundlings Core Track'
    ],
    unverifiedClaims: [
      'Over 40 Distinct Regional Dialects'
    ],
    isFollowing: false,
    followerCount: 2950,
    momentsCount: 6,
    featuredMomentId: 'moment-3'
  }
];

export const INITIAL_MOMENTS: SpotlightMoment[] = [
  {
    id: 'moment-1',
    actorId: 'actor-maya',
    actorName: 'Maya Lin',
    actorHeadline: 'Screen & Classical Stage Actor · RADA',
    actorAvatar: LEAD_HEADSHOT_URL,
    title: 'The Confession: 60s Monologue',
    category: 'Dramatic Monologue',
    prompt: 'Deliver an emotionally shattering confession to someone you love without raising your voice.',
    sceneContext: 'From an unproduced psychological thriller by Sarah Kane. Character admits she knowingly withheld life-saving information.',
    skills: ['Subtext Delivery', 'Controlled Vulnerability', 'Eye Focus', 'British RP'],
    durationSeconds: 58,
    thumbnailUrl: MONOLOGUE_IMAGE_URL,
    likesCount: 1420,
    commentsCount: 88,
    savesCount: 512,
    isLiked: false,
    isSaved: true,
    inPortfolio: true,
    createdAt: '2 days ago',
    comments: [
      {
        id: 'c1',
        userName: 'Fiona MacIntyre (Casting Director)',
        userRole: 'BBC / Pinewood Casting',
        text: 'The stillness in this take is exceptional, Maya. The beat before the final line gives immense gravity.',
        timestamp: '1 day ago'
      },
      {
        id: 'c2',
        userName: 'Julian Vance',
        userRole: 'RSC Alum',
        text: 'Masterclass in breath control and quiet devastation.',
        timestamp: '18 hours ago'
      }
    ]
  },
  {
    id: 'moment-2',
    actorId: 'actor-julian',
    actorName: 'Julian Vance',
    actorHeadline: 'Classical Stage & Television Drama',
    actorAvatar: PERIOD_DRAMA_IMAGE_URL,
    title: 'The Abdication Soliloquy (Richard II)',
    category: 'Classical & Period',
    prompt: 'Deliver Shakespearean blank verse with contemporary naturalism and sorrow.',
    sceneContext: 'King Richard surrendering his crown and divine right to Henry Bolingbroke.',
    skills: ['Verse Phrasing', 'Period Composure', 'Vocal Resonance', 'British RP'],
    durationSeconds: 74,
    thumbnailUrl: PERIOD_DRAMA_IMAGE_URL,
    likesCount: 2890,
    commentsCount: 143,
    savesCount: 840,
    isLiked: true,
    isSaved: false,
    inPortfolio: true,
    createdAt: '4 days ago',
    comments: [
      {
        id: 'c3',
        userName: 'David Lowery',
        userRole: 'Director',
        text: 'Incredible vocal weight. The modern cadence makes the text feel written this morning.',
        timestamp: '3 days ago'
      }
    ]
  },
  {
    id: 'moment-3',
    actorId: 'actor-marcus',
    actorName: 'Marcus Brody',
    actorHeadline: 'Comedy & Character Improvisation',
    actorAvatar: LEAD_HEADSHOT_URL,
    title: 'The Awkward Interrogation (Deadpan Timing)',
    category: 'Comedy & Timing',
    prompt: 'Play a suspect who tries too hard to sound completely innocent during a routine traffic stop.',
    sceneContext: 'Original comedic sketch exploring defensive pauses and misdirected enthusiasm.',
    skills: ['Deadpan Timing', 'Micro-expressions', 'Pacing', 'Comedic Beats'],
    durationSeconds: 49,
    thumbnailUrl: HERO_IMAGE_URL,
    likesCount: 1850,
    commentsCount: 96,
    savesCount: 310,
    isLiked: false,
    isSaved: false,
    inPortfolio: true,
    createdAt: '1 week ago',
    comments: [
      {
        id: 'c4',
        userName: 'Clara Oswald',
        userRole: 'Producer',
        text: 'The pause with the wallet had me laughing out loud. Pitch-perfect.',
        timestamp: '5 days ago'
      }
    ]
  },
  {
    id: 'moment-4',
    actorId: 'actor-maya',
    actorName: 'Maya Lin',
    actorHeadline: 'Screen & Classical Stage Actor',
    actorAvatar: LEAD_HEADSHOT_URL,
    title: 'The Silent Telegram (No Dialogue)',
    category: 'Character Secret',
    prompt: 'Read an incoming wartime telegram and convey devastation without uttering a single syllable.',
    sceneContext: 'Period 1944. A mother learns her youngest brother will not be returning home.',
    skills: ['Physical Subtext', 'Breath Suspension', 'Authentic Grief', 'Micro-expression'],
    durationSeconds: 42,
    thumbnailUrl: MONOLOGUE_IMAGE_URL,
    likesCount: 3100,
    commentsCount: 215,
    savesCount: 1120,
    isLiked: false,
    isSaved: true,
    inPortfolio: true,
    createdAt: '2 weeks ago',
    comments: [
      {
        id: 'c5',
        userName: 'Sarah Greenwood',
        userRole: 'Production Designer',
        text: 'The drop in posture when the hands stop trembling is heartbreaking.',
        timestamp: '1 week ago'
      }
    ]
  },
  {
    id: 'moment-5',
    actorId: 'actor-elena',
    actorName: 'Elena Rostova',
    actorHeadline: 'Action Screen Actor & Movement Artist',
    actorAvatar: LEAD_HEADSHOT_URL,
    title: 'Close Quarters Disarm & Tactical Recovery',
    category: 'Physical & Combat',
    prompt: 'Demonstrate cinematic fight reaction, timing with invisible partner, and realistic exhaustion.',
    sceneContext: 'Choreographed tactical disarm drill with cinematic framing and sharp focus pulls.',
    skills: ['Stage Combat', 'Spatial Awareness', 'Physical Reaction', 'Rhythm'],
    durationSeconds: 38,
    thumbnailUrl: HERO_IMAGE_URL,
    likesCount: 2210,
    commentsCount: 110,
    savesCount: 670,
    isLiked: true,
    isSaved: false,
    inPortfolio: true,
    createdAt: '3 days ago',
    comments: []
  }
];

export const INITIAL_CASTING_CALLS: CastingCall[] = [
  {
    id: 'brief-1',
    projectTitle: 'The Hollow Crown: Chronicles',
    productionType: 'TV Drama',
    roleTitle: 'Lady Eleanor (Lead Role)',
    roleDescription: 'A shrewd young aristocrat orchestrating dynastic succession amidst political turmoil in 15th-century England. Nuanced, emotionally guarded, articulate.',
    characterRequirements: [
      'Strong command of British RP and period text',
      'Nuanced classical emotional delivery without melodrama',
      'Comfort with historical riding or period movement'
    ],
    requiredSkills: ['British RP', 'Stage Combat', 'Classical & Period', 'Subtext Delivery'],
    preferredExperience: 'Minimum 2 professional screen or theatre credits in drama',
    location: 'London & Pinewood Studios, UK',
    auditionFormat: 'Self-Tape Spotlight',
    deadline: '15 Nov 2026',
    compensation: 'Equity Tier 1 (£2,100/wk) + Relocation',
    isPaid: true,
    ageRange: '25 - 34',
    castingCompany: 'BBC & FilmNation Television',
    castingDirectorName: 'Fiona MacIntyre CDG',
    contactEmail: 'fiona.casting@hollowcrown.example',
    postedDate: '24 Oct 2026',
    openRolesCount: 2
  },
  {
    id: 'brief-2',
    projectTitle: 'Neon Meridian',
    productionType: 'Feature Film',
    roleTitle: 'Dr. Katherine Ren (Supporting Lead)',
    roleDescription: 'A neuro-architect investigating high-level corporate memory tampering in a near-future metropolis. Pragmatic, sharp-witted, fighting against personal guilt.',
    characterRequirements: [
      'High-velocity dialogue delivery with emotional restraint',
      'Comfort with physical action set pieces and wire stunts',
      'Multilingual or neutral international accent a strong plus'
    ],
    requiredSkills: ['Screen Drama', 'Controlled Vulnerability', 'Eye Focus'],
    preferredExperience: 'Feature film or premium episodic guest star credits',
    location: 'London & Berlin (International Shoots)',
    auditionFormat: 'Self-Tape Spotlight',
    deadline: '28 Nov 2026',
    compensation: 'SAG-AFTRA / Equity Scale (£3,400/wk)',
    isPaid: true,
    ageRange: '27 - 38',
    castingCompany: 'Synchrony Films',
    castingDirectorName: 'Markus Weber CDG',
    contactEmail: 'casting@neonmeridian.example',
    postedDate: '22 Oct 2026',
    openRolesCount: 3
  },
  {
    id: 'brief-3',
    projectTitle: 'The Glass Garden',
    productionType: 'West End Theatre',
    roleTitle: 'Thomas Hastings (Leading Character)',
    roleDescription: 'A botanist returning from war to find his family estate sold. Intensely moving, poetic, exploring themes of belonging and sensory memory.',
    characterRequirements: [
      'Exceptional vocal projection and stage resonance',
      'Deep emotional stamina for eight shows a week',
      'Subtle vulnerability under a formal exterior'
    ],
    requiredSkills: ['Vocal Resonance', 'British RP', 'Verse Phrasing', 'Authentic Grief'],
    preferredExperience: 'Accredited drama school training or West End/Off-West End credits',
    location: 'Harold Pinter Theatre, West End London',
    auditionFormat: 'In-Person Studio (London/LA)',
    deadline: '05 Dec 2026',
    compensation: 'SOLT / Equity West End Agreement (£1,250/wk)',
    isPaid: true,
    ageRange: '28 - 40',
    castingCompany: 'Playful Productions',
    castingDirectorName: 'Gemma Davenport CDG',
    contactEmail: 'submissions@glassgardenwestend.example',
    postedDate: '19 Oct 2026',
    openRolesCount: 1
  },
  {
    id: 'brief-4',
    projectTitle: 'Whispers in the Pine',
    productionType: 'Indie Film',
    roleTitle: 'Sloan (Lead)',
    roleDescription: 'An isolated wildlife ranger who discovers evidence of an illicit operation deep inside a national park.',
    characterRequirements: [
      'Physical presence and comfort in cold outdoor environments',
      'Compelling on-screen silence and micro-reactions'
    ],
    requiredSkills: ['Micro-expressions', 'Physical Reaction', 'Meisner Technique'],
    preferredExperience: 'Indie drama or screen background',
    location: 'Scottish Highlands & Glasgow',
    auditionFormat: 'Self-Tape Spotlight',
    deadline: '20 Nov 2026',
    compensation: 'BFI / Pact Indie Rate (£950/wk)',
    isPaid: true,
    ageRange: '25 - 42',
    castingCompany: 'Black Pines Cinema',
    castingDirectorName: 'Rory Stewart',
    contactEmail: 'casting@blackpines.example',
    postedDate: '26 Oct 2026',
    openRolesCount: 1
  }
];

export const INITIAL_APPLICATIONS: AuditionApplication[] = [
  {
    id: 'app-1',
    castingCallId: 'brief-1',
    projectTitle: 'The Hollow Crown: Chronicles',
    roleTitle: 'Lady Eleanor (Lead Role)',
    productionType: 'TV Drama',
    castingCompany: 'BBC & FilmNation Television',
    actorId: 'actor-maya',
    actorName: 'Maya Lin',
    actorAvatar: LEAD_HEADSHOT_URL,
    momentId: 'moment-1',
    momentTitle: 'The Confession: 60s Monologue',
    momentThumbnail: MONOLOGUE_IMAGE_URL,
    coverNote: 'Attached is my recent Spotlight Moment exploring high-stakes subtext and vocal restraint in period drama. I am based in London with full BASSC Stage Combat certification.',
    status: 'Audition invited',
    submittedAt: '25 Oct 2026',
    updatedAt: '27 Oct 2026',
    castingFeedback: 'Audition tape received and shortlisted. Invited to live director call on Wednesday, 4 Nov at Pinewood Studios.',
    auditionDateTime: '04 Nov 2026, 14:30 GMT',
    auditionLocation: 'Pinewood Studios, Stage 4 Audition Suite, Iver Heath'
  },
  {
    id: 'app-2',
    castingCallId: 'brief-2',
    projectTitle: 'Neon Meridian',
    roleTitle: 'Dr. Katherine Ren (Supporting Lead)',
    productionType: 'Feature Film',
    castingCompany: 'Synchrony Films',
    actorId: 'actor-maya',
    actorName: 'Maya Lin',
    actorAvatar: LEAD_HEADSHOT_URL,
    momentId: 'moment-4',
    momentTitle: 'The Silent Telegram (No Dialogue)',
    momentThumbnail: MONOLOGUE_IMAGE_URL,
    coverNote: 'Dr. Ren requires intense internal calculation and micro-reaction. Submitted silent performance moment as demonstration of subtext.',
    status: 'In review',
    submittedAt: '26 Oct 2026',
    updatedAt: '26 Oct 2026',
    castingFeedback: 'Submission forwarded to Director of Photography and Director for review.'
  }
];

export const INITIAL_SCENE_LAB_PROMPTS: SceneLabPrompt[] = [
  {
    id: 'prompt-1',
    title: 'The unsaid',
    category: 'Dramatic Monologue',
    weeklyChallenge: true,
    description: 'Perform a 60-second monologue where the words say one thing and the character feels another.',
    actingCraftTip: 'Ground the performance in what you are fighting to hold inside rather than what you display. High stakes come from emotional resistance and internal subtext.',
    durationAdvice: '60 seconds',
    skillsTargeted: ['Subtext Delivery', 'Micro-expressions', 'Vocal Restraint', 'Stillness'],
    submissionsCount: 342,
    sampleMomentIds: ['moment-1', 'moment-4']
  },
  {
    id: 'prompt-2',
    title: 'Three Emotions in One Sentence',
    category: 'Emotional Range',
    weeklyChallenge: false,
    description: 'Deliver the sentence: "I knew you were never going to come back." Perform it three times in one take: 1. Disbelief masked as humor; 2. Bitter understanding; 3. Total forgiveness.',
    actingCraftTip: 'Ensure the transition between beats feels earned by an internal discovery rather than mechanical gear-shifting.',
    durationAdvice: '40 to 60 seconds',
    skillsTargeted: ['Emotional Transition', 'Vocal Cadence', 'Internal Rhythm'],
    submissionsCount: 189,
    sampleMomentIds: ['moment-2']
  },
  {
    id: 'prompt-3',
    title: 'The Silent Telegram / Revelation',
    category: 'Character Secret',
    weeklyChallenge: false,
    description: 'Receive life-altering news via a handwritten note or digital tablet. Convey the full realization without uttering a single spoken word.',
    actingCraftTip: 'Allow the body to process information in stages: reading the words, physical comprehension, the sudden shift in breathing.',
    durationAdvice: '30 to 45 seconds',
    skillsTargeted: ['Physical Subtext', 'Eye Movement', 'Breath Control'],
    submissionsCount: 275,
    sampleMomentIds: ['moment-4']
  },
  {
    id: 'prompt-4',
    title: 'The High-Stakes Comedic Lie',
    category: 'Comedy & Timing',
    weeklyChallenge: false,
    description: 'You are an ordinary person trying to explain why there is an alligator in your bathtub to a skeptical building inspector.',
    actingCraftTip: 'The funniest comedy comes from utter, desperate sincerity. The character must believe they are one sentence away from total ruin.',
    durationAdvice: '45 to 60 seconds',
    skillsTargeted: ['Deadpan Timing', 'Rapid Justification', 'Comedic Beats'],
    submissionsCount: 145,
    sampleMomentIds: ['moment-3']
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Audition Invitation Received',
    message: 'Fiona MacIntyre invited you to an in-person audition for The Hollow Crown: Lady Eleanor on Nov 4 at Pinewood Studios.',
    time: '2 hours ago',
    read: false,
    type: 'audition'
  },
  {
    id: 'n2',
    title: 'Casting Director Review',
    message: 'Synchrony Films marked your submission for Neon Meridian as "In review".',
    time: '1 day ago',
    read: true,
    type: 'audition'
  },
  {
    id: 'n3',
    title: 'Scene Lab Spotlight',
    message: 'Your moment "The Confession" was highlighted in this week\'s Scene Lab Editor\'s Picks!',
    time: '2 days ago',
    read: true,
    type: 'challenge'
  }
];

export const INITIAL_STORY_GROUPS: StoryGroup[] = [
  {
    id: 'sg-maya',
    actorId: 'actor-maya',
    actorName: 'Maya Lin',
    actorAvatar: LEAD_HEADSHOT_URL,
    headline: 'Pinewood Studios BTS',
    hasUnseen: true,
    stories: [
      {
        id: 's1',
        mediaUrl: HERO_IMAGE_URL,
        caption: 'Night shoot on Stage 4. 20-minute setup before our first dialogue master take.',
        timestamp: '3h ago',
        duration: 5
      },
      {
        id: 's2',
        mediaUrl: MONOLOGUE_IMAGE_URL,
        caption: 'Working with voice coach on the Estuary to British RP cadence transition.',
        timestamp: '1h ago',
        duration: 5
      }
    ]
  },
  {
    id: 'sg-julian',
    actorId: 'actor-julian',
    actorName: 'Julian Vance',
    actorAvatar: PERIOD_DRAMA_IMAGE_URL,
    headline: 'Stratford Dressing Room',
    hasUnseen: true,
    stories: [
      {
        id: 's3',
        mediaUrl: PERIOD_DRAMA_IMAGE_URL,
        caption: '30 minutes to curtain call for Richard II. Diaphragm warmup complete.',
        timestamp: '4h ago',
        duration: 5
      }
    ]
  },
  {
    id: 'sg-elena',
    actorId: 'actor-elena',
    actorName: 'Elena Rostova',
    actorAvatar: LEAD_HEADSHOT_URL,
    headline: 'BASSC Stunt Hall',
    hasUnseen: true,
    stories: [
      {
        id: 's4',
        mediaUrl: HERO_IMAGE_URL,
        caption: 'Quarterstaff & rapier choreography timing with team in London.',
        timestamp: '6h ago',
        duration: 5
      }
    ]
  },
  {
    id: 'sg-marcus',
    actorId: 'actor-marcus',
    actorName: 'Marcus Brody',
    actorAvatar: LEAD_HEADSHOT_URL,
    headline: 'Pilot Table Read',
    hasUnseen: false,
    stories: [
      {
        id: 's5',
        mediaUrl: HERO_IMAGE_URL,
        caption: 'Episode 3 table read. The punchline on page 14 finally landed!',
        timestamp: '12h ago',
        duration: 5
      }
    ]
  }
];

export const INITIAL_MESSAGE_THREADS: MessageThread[] = [
  {
    id: 'thread-fiona',
    participantId: 'cdg-fiona',
    participantName: 'Fiona MacIntyre CDG',
    participantAvatar: PERIOD_DRAMA_IMAGE_URL,
    participantRole: 'BBC / Pinewood Head of Casting',
    lastMessage: 'Maya, we loved your take on the subtext monologue. Are you free next Wednesday for the director chemistry read?',
    lastTimestamp: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'cdg-fiona',
        senderName: 'Fiona MacIntyre CDG',
        text: 'Hello Maya, we reviewed your self-tape for Lady Eleanor in The Hollow Crown.',
        timestamp: 'Yesterday, 4:15 PM',
        isSelf: false
      },
      {
        id: 'm2',
        senderId: 'actor-maya',
        senderName: 'Maya Lin',
        text: 'Thank you Fiona! Really appreciate the feedback on the quiet beat before the final line.',
        timestamp: 'Yesterday, 5:02 PM',
        isSelf: true
      },
      {
        id: 'm3',
        senderId: 'cdg-fiona',
        senderName: 'Fiona MacIntyre CDG',
        text: 'The director specifically noted your eye focus. Are you free next Wednesday at 14:30 at Pinewood for the live chemistry read?',
        timestamp: '10:42 AM',
        isSelf: false
      }
    ]
  },
  {
    id: 'thread-eleanor',
    participantId: 'agent-eleanor',
    participantName: 'Eleanor Sterling',
    participantAvatar: LEAD_HEADSHOT_URL,
    participantRole: 'Tavistock Wood Talent Agent',
    lastMessage: 'Contract rider for Neon Meridian sent over for review. Standard SAG-AFTRA terms confirmed.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'agent-eleanor',
        senderName: 'Eleanor Sterling',
        text: 'Contract rider for Neon Meridian sent over for review. Standard SAG-AFTRA terms confirmed.',
        timestamp: 'Yesterday',
        isSelf: false
      }
    ]
  },
  {
    id: 'thread-julian',
    participantId: 'actor-julian',
    participantName: 'Julian Vance',
    participantAvatar: PERIOD_DRAMA_IMAGE_URL,
    participantRole: 'RSC Associate & Co-star',
    lastMessage: 'Brilliant stillness on the Richard II response take. Let us know if you want to run lines this weekend!',
    lastTimestamp: '2 days ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm5',
        senderId: 'actor-julian',
        senderName: 'Julian Vance',
        text: 'Brilliant stillness on the Richard II response take. Let us know if you want to run lines this weekend!',
        timestamp: '2 days ago',
        isSelf: false
      }
    ]
  }
];

