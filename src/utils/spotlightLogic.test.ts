import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculateCastingFit, 
  calculateProfileCompleteness, 
  canTransitionAuditionStatus, 
  filterMoments,
  aggregateAudioTracks,
  getNextStoryIndex
} from './spotlightLogic';
import { Actor, CastingCall, SpotlightMoment } from '../types';

const mockActor: Actor = {
  id: 'actor-1',
  name: 'Maya Lin',
  headline: 'Classical Stage & Screen Actor | RADA Alum',
  location: 'London, UK',
  locationPrivacy: 'City Only',
  bio: 'Experienced dramatic actress with 8 years of London stage and independent British screen roles.',
  languages: ['English', 'French (Conversational)'],
  accents: ['British RP', 'London Estuary', 'Standard American'],
  categories: ['Dramatic Monologue', 'Classical & Period', 'Screen Drama'],
  skills: ['Stage Combat (Rapier & Dagger)', 'Meisner Technique', 'Horse Riding', 'Sight Reading'],
  headshots: ['/path1.jpg', '/path2.jpg'],
  showreelUrl: 'https://example.com/showreel.mp4',
  availability: 'Available Immediately',
  representation: {
    agencyName: 'Curtis Brown Talent',
    agentName: 'Harriet Cole',
    contactEmail: 'harriet@curtisbrown.example',
    region: 'UK & Europe'
  },
  verifiedCredentials: ['RADA BA (Hons) Acting', 'Equity UK Member'],
  unverifiedClaims: ['Conversational Italian'],
  followerCount: 1420,
  momentsCount: 4
};

const mockCastingCall: CastingCall = {
  id: 'brief-1',
  projectTitle: 'The Hollow Crown: Chronicles',
  productionType: 'TV Drama',
  roleTitle: 'Lady Eleanor (Lead)',
  roleDescription: 'A shrewd young aristocrat orchestrating dynastic succession amidst political turmoil.',
  characterRequirements: ['Nuanced classical emotional delivery', 'Period composure'],
  requiredSkills: ['British RP', 'Stage Combat', 'Period Composure'],
  preferredExperience: 'Minimum 2 professional credits in drama or period pieces',
  location: 'London / Pinewood Studios, UK',
  auditionFormat: 'Self-Tape Spotlight',
  deadline: '2026-11-15',
  compensation: 'Equity Minimum + Relocation (£1,850/wk)',
  isPaid: true,
  ageRange: '25 - 34',
  castingCompany: 'BBC / Pinewood Casting',
  castingDirectorName: 'Fiona MacIntyre CDG',
  contactEmail: 'casting@hollowcrown.example',
  postedDate: '2026-10-24',
  openRolesCount: 2
};

test('calculateCastingFit calculates high fit when skills and location match', () => {
  const result = calculateCastingFit(mockActor, mockCastingCall);
  assert.ok(result.score >= 75, `Expected score >= 75, got ${result.score}`);
  assert.ok(result.matchReasons.length > 0, 'Should return matching reasons');
  assert.ok(result.matchReasons.some(r => r.includes('skills & accents')), 'Should report skill matches');
});

test('calculateProfileCompleteness accurately tracks actor portfolio items', () => {
  const result = calculateProfileCompleteness(mockActor);
  assert.equal(result.totalCount, 8);
  assert.equal(result.completedCount, 8);
  assert.equal(result.percentage, 100);
  assert.deepEqual(result.missingItems, []);
});

test('calculateProfileCompleteness detects missing items', () => {
  const partialActor: Actor = {
    ...mockActor,
    showreelUrl: undefined,
    headshots: ['single.jpg'],
    representation: undefined
  };
  const result = calculateProfileCompleteness(partialActor);
  assert.ok(result.percentage < 100);
  assert.ok(result.missingItems.includes('Showreel Link'));
  assert.ok(result.missingItems.includes('Representation Details'));
});

test('canTransitionAuditionStatus enforces role-based audition permissions', () => {
  // Casting director transitions
  assert.equal(canTransitionAuditionStatus('Submitted', 'In review', 'casting_director'), true);
  assert.equal(canTransitionAuditionStatus('In review', 'Shortlisted', 'casting_director'), true);
  assert.equal(canTransitionAuditionStatus('Shortlisted', 'Audition invited', 'casting_director'), true);
  
  // Talent cannot invite themselves to audition
  assert.equal(canTransitionAuditionStatus('In review', 'Audition invited', 'talent'), false);
  
  // Talent can withdraw
  assert.equal(canTransitionAuditionStatus('In review', 'Withdrawn', 'talent'), true);
  assert.equal(canTransitionAuditionStatus('Accepted', 'Withdrawn', 'talent'), false);
});

test('filterMoments filters by category, following, and search keywords', () => {
  const moments: SpotlightMoment[] = [
    {
      id: 'm1',
      actorId: 'actor-1',
      actorName: 'Maya Lin',
      actorHeadline: 'Classical Stage & Screen',
      actorAvatar: '',
      title: 'Lady Macbeth Monologue',
      category: 'Dramatic Monologue',
      skills: ['British RP', 'Shakespeare'],
      durationSeconds: 58,
      thumbnailUrl: '',
      likesCount: 12,
      commentsCount: 2,
      savesCount: 4,
      inPortfolio: true,
      createdAt: '2026-10-25',
      comments: []
    },
    {
      id: 'm2',
      actorId: 'actor-2',
      actorName: 'Marcus Brody',
      actorHeadline: 'Comedy & Voice Artist',
      actorAvatar: '',
      title: 'Coffee Shop Heist Comedy Timing',
      category: 'Comedy & Timing',
      skills: ['Deadpan', 'Physical Comedy'],
      durationSeconds: 45,
      thumbnailUrl: '',
      likesCount: 30,
      commentsCount: 5,
      savesCount: 10,
      inPortfolio: true,
      createdAt: '2026-10-26',
      comments: []
    }
  ];

  // Category filter
  const comedyOnly = filterMoments(moments, 'foryou', 'Comedy & Timing', '', []);
  assert.equal(comedyOnly.length, 1);
  assert.equal(comedyOnly[0].id, 'm2');

  // Search filter
  const macbethSearch = filterMoments(moments, 'foryou', 'All', 'Macbeth', []);
  assert.equal(macbethSearch.length, 1);
  assert.equal(macbethSearch[0].id, 'm1');

  // Following filter
  const followingOnly = filterMoments(moments, 'following', 'All', '', ['actor-2']);
  assert.equal(followingOnly.length, 1);
  assert.equal(followingOnly[0].id, 'm2');
});

test('aggregateAudioTracks groups moments by sound/script title', () => {
  const moments: SpotlightMoment[] = [
    {
      id: 'm1',
      actorId: 'actor-1',
      actorName: 'Maya Lin',
      actorHeadline: 'Classical Stage & Screen',
      actorAvatar: '',
      title: 'Lady Macbeth Monologue',
      category: 'Dramatic Monologue',
      skills: ['British RP'],
      durationSeconds: 58,
      thumbnailUrl: '',
      likesCount: 12,
      commentsCount: 2,
      savesCount: 4,
      inPortfolio: true,
      createdAt: '2026-10-25',
      comments: []
    },
    {
      id: 'm2',
      actorId: 'actor-2',
      actorName: 'Julian Vance',
      actorHeadline: 'Stage Actor',
      actorAvatar: '',
      title: 'Lady Macbeth Monologue',
      category: 'Dramatic Monologue',
      skills: ['Verse'],
      durationSeconds: 50,
      thumbnailUrl: '',
      likesCount: 5,
      commentsCount: 1,
      savesCount: 2,
      inPortfolio: true,
      createdAt: '2026-10-26',
      comments: []
    }
  ];

  const tracks = aggregateAudioTracks(moments);
  assert.equal(tracks.length, 1);
  assert.equal(tracks[0].title, 'Lady Macbeth Monologue');
  assert.equal(tracks[0].takesCount, 2);
});

test('getNextStoryIndex advances within group and transitions to next group', () => {
  // Advance to story 2 of same group
  const step1 = getNextStoryIndex(0, 3, 0, 2);
  assert.equal(step1.groupIdx, 0);
  assert.equal(step1.storyIdx, 1);
  assert.equal(step1.isFinished, false);

  // Reaching end of story group 0 moves to group 1 story 0
  const step2 = getNextStoryIndex(2, 3, 0, 2);
  assert.equal(step2.groupIdx, 1);
  assert.equal(step2.storyIdx, 0);
  assert.equal(step2.isFinished, false);

  // Reaching end of last group finishes
  const step3 = getNextStoryIndex(1, 2, 1, 2);
  assert.equal(step3.isFinished, true);
});

