export type UserRole = 'talent' | 'casting_director';

export type AuditionStatus = 
  | 'Draft'
  | 'Submitted'
  | 'In review'
  | 'Shortlisted'
  | 'Audition invited'
  | 'Decision pending'
  | 'Accepted'
  | 'Not selected'
  | 'Withdrawn';

export interface ProductionCredit {
  id: string;
  title: string;
  role: string;
  productionType: 'Feature Film' | 'Television' | 'Theatre' | 'Short Film' | 'Commercial' | 'Voice / Animation';
  year: number;
  directorOrCompany: string;
}

export interface TrainingCredit {
  id: string;
  institution: string;
  qualification: string;
  year: number;
  instructor?: string;
}

export interface Representation {
  agencyName: string;
  agentName: string;
  contactEmail: string;
  phone?: string;
  region: string;
}

export interface Actor {
  id: string;
  name: string;
  headline: string;
  location: string;
  locationPrivacy: 'Public' | 'City Only' | 'Private';
  bio: string;
  languages: string[];
  accents: string[];
  categories: string[];
  skills: string[];
  height?: string;
  playingAge?: string;
  headshots: string[];
  showreelUrl?: string;
  voiceReelUrl?: string;
  availability: 'Available Immediately' | 'Booking Next Season' | 'In Production';
  representation?: Representation;
  verifiedCredentials: string[];
  unverifiedClaims: string[];
  isFollowing?: boolean;
  followerCount: number;
  momentsCount: number;
  featuredMomentId?: string;
}

export interface Comment {
  id: string;
  userName: string;
  userRole?: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
}

export interface SpotlightMoment {
  id: string;
  actorId: string;
  actorName: string;
  actorHeadline: string;
  actorAvatar: string;
  title: string;
  category: 'Dramatic Monologue' | 'Comedy & Timing' | 'Character Secret' | 'Emotional Range' | 'Classical & Period' | 'Voice / Dialect' | 'Physical & Combat' | 'Improvisation';
  prompt?: string;
  sceneContext?: string;
  skills: string[];
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl?: string;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  inPortfolio: boolean;
  createdAt: string;
  comments: Comment[];
}

export interface CastingCall {
  id: string;
  projectTitle: string;
  productionType: 'Feature Film' | 'TV Drama' | 'West End Theatre' | 'Indie Film' | 'Animation & Gaming' | 'Docudrama';
  roleTitle: string;
  roleDescription: string;
  characterRequirements: string[];
  requiredSkills: string[];
  preferredExperience: string;
  location: string;
  auditionFormat: 'Self-Tape Spotlight' | 'Live Video Audition' | 'In-Person Studio (London/LA)' | 'Hybrid';
  deadline: string;
  compensation: string;
  isPaid: boolean;
  ageRange: string;
  castingCompany: string;
  castingDirectorName: string;
  contactEmail: string;
  postedDate: string;
  openRolesCount: number;
}

export interface AuditionApplication {
  id: string;
  castingCallId: string;
  projectTitle: string;
  roleTitle: string;
  productionType: string;
  castingCompany: string;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  momentId: string;
  momentTitle: string;
  momentThumbnail: string;
  coverNote: string;
  status: AuditionStatus;
  submittedAt: string;
  updatedAt: string;
  castingFeedback?: string;
  auditionDateTime?: string;
  auditionLocation?: string;
}

export interface SceneLabPrompt {
  id: string;
  title: string;
  category: string;
  weeklyChallenge: boolean;
  description: string;
  actingCraftTip: string;
  durationAdvice: string;
  skillsTargeted: string[];
  submissionsCount: number;
  sampleMomentIds: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'audition' | 'social' | 'challenge';
}

export interface StoryItem {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  duration: number; // in seconds
}

export interface StoryGroup {
  id: string;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  headline: string;
  hasUnseen: boolean;
  stories: StoryItem[];
}

export interface AudioTrack {
  id: string;
  title: string;
  creatorName: string;
  category: string;
  durationSeconds: number;
  takesCount: number;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

export interface MessageThread {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: DirectMessage[];
}

export type SubscriptionTier = 'free' | 'plus' | 'pro';
