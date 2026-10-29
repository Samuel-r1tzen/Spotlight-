import { Actor, CastingCall, AuditionStatus, UserRole, SpotlightMoment } from '../types';

export interface CastingFitResult {
  score: number;
  matchReasons: string[];
  missingSkills: string[];
}

/**
 * Calculates rule-based transparent Casting Fit score and explains match reasons.
 */
export function calculateCastingFit(actor: Actor, brief: CastingCall): CastingFitResult {
  const matchReasons: string[] = [];
  const missingSkills: string[] = [];
  let points = 0;
  const maxPoints = 100;

  // 1. Skill Matching (up to 50 pts)
  const actorSkillsSet = new Set(
    [...actor.skills, ...actor.accents, ...actor.languages, ...actor.categories].map(s => s.toLowerCase().trim())
  );

  let matchedSkillsCount = 0;
  for (const reqSkill of brief.requiredSkills) {
    const lowerReq = reqSkill.toLowerCase().trim();
    const hasSkill = Array.from(actorSkillsSet).some(s => s.includes(lowerReq) || lowerReq.includes(s));
    if (hasSkill) {
      matchedSkillsCount++;
    } else {
      missingSkills.push(reqSkill);
    }
  }

  if (brief.requiredSkills.length > 0) {
    const skillRatio = matchedSkillsCount / brief.requiredSkills.length;
    const skillPoints = Math.round(skillRatio * 50);
    points += skillPoints;
    if (matchedSkillsCount > 0) {
      matchReasons.push(`Matches ${matchedSkillsCount} of ${brief.requiredSkills.length} required skills & accents`);
    }
  } else {
    points += 35;
  }

  // 2. Production Type / Category Alignment (up to 20 pts)
  const hasCategoryMatch = actor.categories.some(cat => 
    brief.productionType.toLowerCase().includes(cat.toLowerCase()) ||
    cat.toLowerCase().includes('drama') ||
    cat.toLowerCase().includes('screen')
  );
  if (hasCategoryMatch) {
    points += 20;
    matchReasons.push(`Specializes in ${brief.productionType} format`);
  } else {
    points += 10;
  }

  // 3. Location & Audition Flexibility (up to 15 pts)
  const actorLoc = actor.location.toLowerCase();
  const briefLoc = brief.location.toLowerCase();
  const isCityMatch = actorLoc.includes('london') && briefLoc.includes('london') ||
                      actorLoc.includes('new york') && briefLoc.includes('new york') ||
                      actorLoc.includes('los angeles') && briefLoc.includes('los angeles');

  if (isCityMatch) {
    points += 15;
    matchReasons.push(`Based locally in ${brief.location}`);
  } else if (brief.auditionFormat.toLowerCase().includes('self-tape') || brief.auditionFormat.toLowerCase().includes('remote')) {
    points += 12;
    matchReasons.push('Eligible for self-tape & remote submission');
  } else {
    points += 5;
  }

  // 4. Portfolio & Verified Credentials (up to 15 pts)
  if (actor.verifiedCredentials.length > 0) {
    points += 10;
    matchReasons.push('Verified professional credentials on file');
  }
  if (actor.showreelUrl) {
    points += 5;
  }

  // Normalize between 40 and 98 to keep credible
  const finalScore = Math.min(98, Math.max(40, points));

  return {
    score: finalScore,
    matchReasons: matchReasons.slice(0, 3),
    missingSkills
  };
}

export interface ProfileCompletenessResult {
  percentage: number;
  completedCount: number;
  totalCount: number;
  missingItems: string[];
}

/**
 * Calculates actor profile readiness and portfolio health checklist.
 */
export function calculateProfileCompleteness(actor: Actor): ProfileCompletenessResult {
  const checks = [
    { name: 'Professional Headshots', passed: actor.headshots.length >= 2 },
    { name: 'Showreel Link', passed: !!actor.showreelUrl && actor.showreelUrl.length > 0 },
    { name: 'Actor Biography', passed: !!actor.bio && actor.bio.length >= 40 },
    { name: 'Special Skills & Dialects', passed: actor.skills.length >= 3 && actor.accents.length >= 1 },
    { name: 'Verified / Accredited Training', passed: actor.verifiedCredentials.length > 0 },
    { name: 'Representation Details', passed: !!actor.representation?.agencyName },
    { name: 'Spotlight Moments in Portfolio', passed: actor.momentsCount >= 2 },
    { name: 'Availability Status', passed: !!actor.availability }
  ];

  const completed = checks.filter(c => c.passed);
  const missing = checks.filter(c => !c.passed).map(c => c.name);
  const percentage = Math.round((completed.length / checks.length) * 100);

  return {
    percentage,
    completedCount: completed.length,
    totalCount: checks.length,
    missingItems: missing
  };
}

/**
 * Validates whether an audition status change is permissible.
 */
export function canTransitionAuditionStatus(
  current: AuditionStatus, 
  next: AuditionStatus, 
  role: UserRole
): boolean {
  if (current === next) return true;

  if (role === 'talent') {
    // Actor can withdraw unless already accepted or withdrawn
    if (next === 'Withdrawn') {
      return current !== 'Accepted' && current !== 'Withdrawn';
    }
    // Actor can submit draft
    if (current === 'Draft' && next === 'Submitted') {
      return true;
    }
    return false;
  }

  if (role === 'casting_director') {
    // Casting director can advance through pipeline
    const validNextStates: Record<AuditionStatus, AuditionStatus[]> = {
      'Draft': ['Submitted'],
      'Submitted': ['In review', 'Shortlisted', 'Not selected'],
      'In review': ['Shortlisted', 'Audition invited', 'Not selected'],
      'Shortlisted': ['Audition invited', 'Decision pending', 'Not selected'],
      'Audition invited': ['Decision pending', 'Accepted', 'Not selected'],
      'Decision pending': ['Accepted', 'Not selected'],
      'Accepted': [],
      'Not selected': ['In review'], // Can reconsider
      'Withdrawn': []
    };

    return validNextStates[current]?.includes(next) ?? false;
  }

  return false;
}

/**
 * Filters Spotlight Moments based on feed category, search query, and following status.
 */
export function filterMoments(
  moments: SpotlightMoment[],
  feedTab: 'foryou' | 'following' | 'explore',
  activeCategory: string,
  searchQuery: string,
  followingActorIds: string[]
): SpotlightMoment[] {
  let list = [...moments];

  if (feedTab === 'following') {
    list = list.filter(m => followingActorIds.includes(m.actorId));
  }

  if (activeCategory && activeCategory !== 'All') {
    list = list.filter(m => m.category.toLowerCase().includes(activeCategory.toLowerCase()));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(m => 
      m.title.toLowerCase().includes(q) ||
      m.actorName.toLowerCase().includes(q) ||
      m.skills.some(s => s.toLowerCase().includes(q)) ||
      (m.prompt && m.prompt.toLowerCase().includes(q))
    );
  }

  return list;
}

/**
 * Aggregates unique sound/script tracks from performance moments (like YouTube Shorts / TikTok sound hub).
 */
export function aggregateAudioTracks(moments: SpotlightMoment[]) {
  const map = new Map<string, { title: string; creatorName: string; category: string; takesCount: number }>();
  
  for (const m of moments) {
    const key = m.title;
    if (map.has(key)) {
      map.get(key)!.takesCount++;
    } else {
      map.set(key, {
        title: m.title,
        creatorName: m.actorName,
        category: m.category,
        takesCount: 1
      });
    }
  }

  return Array.from(map.entries()).map(([id, val]) => ({
    id: 'audio-' + id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    ...val,
    durationSeconds: 60
  }));
}

/**
 * Calculates next story and story group progression (Instagram-style Stories navigation).
 */
export function getNextStoryIndex(
  currentStoryIdx: number,
  storyCount: number,
  currentGroupIdx: number,
  totalGroups: number
): { groupIdx: number; storyIdx: number; isFinished: boolean } {
  if (currentStoryIdx < storyCount - 1) {
    return { groupIdx: currentGroupIdx, storyIdx: currentStoryIdx + 1, isFinished: false };
  }
  if (currentGroupIdx < totalGroups - 1) {
    return { groupIdx: currentGroupIdx + 1, storyIdx: 0, isFinished: false };
  }
  return { groupIdx: currentGroupIdx, storyIdx: currentStoryIdx, isFinished: true };
}
