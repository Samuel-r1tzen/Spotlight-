import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Actor, 
  SpotlightMoment, 
  CastingCall, 
  AuditionApplication, 
  AuditionStatus, 
  UserRole, 
  SubscriptionTier, 
  NotificationItem,
  StoryGroup,
  MessageThread,
  DirectMessage,
  AudioTrack
} from '../types';
import { 
  INITIAL_ACTORS, 
  INITIAL_MOMENTS, 
  INITIAL_CASTING_CALLS, 
  INITIAL_APPLICATIONS, 
  INITIAL_NOTIFICATIONS,
  INITIAL_STORY_GROUPS,
  INITIAL_MESSAGE_THREADS,
  LEAD_HEADSHOT_URL
} from '../data/mockData';
import { getNextStoryIndex } from '../utils/spotlightLogic';

export type NavView = 
  | 'landing' 
  | 'discover' 
  | 'passport' 
  | 'casting' 
  | 'auditions' 
  | 'scenelab' 
  | 'career';

interface SpotlightContextType {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  subscriptionTier: SubscriptionTier;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  actors: Actor[];
  moments: SpotlightMoment[];
  castingCalls: CastingCall[];
  applications: AuditionApplication[];
  notifications: NotificationItem[];
  storyGroups: StoryGroup[];
  messageThreads: MessageThread[];
  selectedActorId: string;
  setSelectedActorId: (id: string) => void;
  selectedCastingCall: CastingCall | null;
  setSelectedCastingCall: (call: CastingCall | null) => void;
  activeFeedTab: 'foryou' | 'following' | 'explore';
  setActiveFeedTab: (tab: 'foryou' | 'following' | 'explore') => void;
  showSubscriptionModal: boolean;
  setShowSubscriptionModal: (show: boolean) => void;
  showCreateMomentModal: boolean;
  setShowCreateMomentModal: (show: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  toggleFollowActor: (actorId: string) => void;
  toggleLikeMoment: (momentId: string) => void;
  toggleSaveMoment: (momentId: string) => void;
  addComment: (momentId: string, text: string) => void;
  submitAuditionApplication: (castingCallId: string, momentId: string, coverNote: string) => void;
  updateApplicationStatus: (appId: string, newStatus: AuditionStatus, feedback?: string) => void;
  createNewMoment: (data: {
    title: string;
    category: SpotlightMoment['category'];
    prompt?: string;
    skills: string[];
    thumbnailUrl: string;
    durationSeconds: number;
  }) => void;
  // Instagram-style Stories
  activeStoryGroup: StoryGroup | null;
  activeStoryIndex: number;
  openStoryGroup: (group: StoryGroup) => void;
  closeStoryGroup: () => void;
  advanceStory: () => void;
  prevStory: () => void;
  // Direct Messages
  isDMDrawerOpen: boolean;
  setIsDMDrawerOpen: (open: boolean) => void;
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sendMessage: (threadId: string, text: string) => void;
  // Search state & Top Icon Triggers for conditional bottom tab bar visibility
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  isActivityDrawerOpen: boolean;
  setIsActivityDrawerOpen: (open: boolean) => void;
  shouldHideBottomBar: boolean;
  setShouldHideBottomBar: (hide: boolean) => void;
  // YouTube Shorts / TikTok features
  activeAudioTrackModal: AudioTrack | null;
  setActiveAudioTrackModal: (track: AudioTrack | null) => void;
  showCaptions: boolean;
  toggleCaptions: () => void;
  duetPartnerMoment: SpotlightMoment | null;
  startDuetTake: (moment: SpotlightMoment) => void;
  feedDisplayMode: 'grid' | 'immersive';
  setFeedDisplayMode: (mode: 'grid' | 'immersive') => void;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export const SpotlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<NavView>('discover');
  const [userRole, setUserRole] = useState<UserRole>('talent');
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');
  const [selectedActorId, setSelectedActorId] = useState<string>('actor-maya');
  const [selectedCastingCall, setSelectedCastingCall] = useState<CastingCall | null>(null);
  const [activeFeedTab, setActiveFeedTab] = useState<'foryou' | 'following' | 'explore'>('foryou');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);
  const [showCreateMomentModal, setShowCreateMomentModal] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Initial persistent state from localStorage or mockData
  const [actors, setActors] = useState<Actor[]>(() => {
    const saved = localStorage.getItem('spotlight_actors');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ACTORS;
  });

  const [moments, setMoments] = useState<SpotlightMoment[]>(() => {
    const saved = localStorage.getItem('spotlight_moments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_MOMENTS;
  });

  const [castingCalls, setCastingCalls] = useState<CastingCall[]>(() => {
    const saved = localStorage.getItem('spotlight_casting_calls');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_CASTING_CALLS;
  });

  const [applications, setApplications] = useState<AuditionApplication[]>(() => {
    const saved = localStorage.getItem('spotlight_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_APPLICATIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>(INITIAL_STORY_GROUPS);
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>(INITIAL_MESSAGE_THREADS);
  
  // Stories player state
  const [activeStoryGroup, setActiveStoryGroup] = useState<StoryGroup | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);

  // Direct message drawer state
  const [isDMDrawerOpen, setIsDMDrawerOpen] = useState<boolean>(false);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isActivityDrawerOpen, setIsActivityDrawerOpen] = useState<boolean>(false);
  const [shouldHideBottomBarOverride, setShouldHideBottomBarOverride] = useState<boolean | null>(null);

  // Bottom bar disappears ONLY when top icons are active (Search, DMs, Activity, Post Take)
  const shouldHideBottomBar = shouldHideBottomBarOverride !== null 
    ? shouldHideBottomBarOverride 
    : (isSearching || isDMDrawerOpen || showCreateMomentModal || isActivityDrawerOpen);

  const setShouldHideBottomBar = (hide: boolean) => {
    setShouldHideBottomBarOverride(hide);
  };

  // Audio track modal & YouTube Shorts/TikTok controls
  const [activeAudioTrackModal, setActiveAudioTrackModal] = useState<AudioTrack | null>(null);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [duetPartnerMoment, setDuetPartnerMoment] = useState<SpotlightMoment | null>(null);
  const [feedDisplayMode, setFeedDisplayMode] = useState<'grid' | 'immersive'>('grid');

  const openStoryGroup = (group: StoryGroup) => {
    setActiveStoryGroup(group);
    setActiveStoryIndex(0);
    // Mark as seen
    setStoryGroups(prev => prev.map(g => g.id === group.id ? { ...g, hasUnseen: false } : g));
  };

  const closeStoryGroup = () => {
    setActiveStoryGroup(null);
    setActiveStoryIndex(0);
  };

  const advanceStory = () => {
    if (!activeStoryGroup) return;
    const currentGroupIdx = storyGroups.findIndex(g => g.id === activeStoryGroup.id);
    const result = getNextStoryIndex(
      activeStoryIndex,
      activeStoryGroup.stories.length,
      currentGroupIdx,
      storyGroups.length
    );

    if (result.isFinished) {
      closeStoryGroup();
    } else if (result.groupIdx !== currentGroupIdx) {
      const nextGroup = storyGroups[result.groupIdx];
      setActiveStoryGroup(nextGroup);
      setActiveStoryIndex(0);
    } else {
      setActiveStoryIndex(result.storyIdx);
    }
  };

  const prevStory = () => {
    if (!activeStoryGroup) return;
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(prev => prev - 1);
    } else {
      const currentGroupIdx = storyGroups.findIndex(g => g.id === activeStoryGroup.id);
      if (currentGroupIdx > 0) {
        const prevGroup = storyGroups[currentGroupIdx - 1];
        setActiveStoryGroup(prevGroup);
        setActiveStoryIndex(prevGroup.stories.length - 1);
      }
    }
  };

  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: DirectMessage = {
      id: 'msg-' + Date.now(),
      senderId: 'actor-maya',
      senderName: 'Maya Lin',
      text: text.trim(),
      timestamp: 'Just now',
      isSelf: true
    };

    setMessageThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          lastMessage: text.trim(),
          lastTimestamp: 'Just now',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    // Simulated reply after 1.5 seconds if talking to casting director or agent!
    setTimeout(() => {
      const replyMsg: DirectMessage = {
        id: 'reply-' + Date.now(),
        senderId: 'participant',
        senderName: 'Received Message',
        text: 'Received! Thank you Maya. Forwarding to the production coordinator.',
        timestamp: 'Just now',
        isSelf: false
      };
      setMessageThreads(prev => prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: replyMsg.text,
            lastTimestamp: 'Just now',
            messages: [...t.messages, replyMsg]
          };
        }
        return t;
      }));
    }, 1800);
  };

  const toggleCaptions = () => {
    setShowCaptions(prev => !prev);
    showToast(showCaptions ? 'Closed captions disabled' : 'Closed captions enabled');
  };

  const startDuetTake = (moment: SpotlightMoment) => {
    setDuetPartnerMoment(moment);
    setShowCreateMomentModal(true);
    showToast(`Starting Scene Chemistry Read with ${moment.actorName}!`);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('spotlight_actors', JSON.stringify(actors));
  }, [actors]);

  useEffect(() => {
    localStorage.setItem('spotlight_moments', JSON.stringify(moments));
  }, [moments]);

  useEffect(() => {
    localStorage.setItem('spotlight_applications', JSON.stringify(applications));
  }, [applications]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleFollowActor = (actorId: string) => {
    setActors(prev => prev.map(actor => {
      if (actor.id === actorId) {
        const nextFollowing = !actor.isFollowing;
        showToast(nextFollowing ? `Following ${actor.name}` : `Unfollowed ${actor.name}`);
        return {
          ...actor,
          isFollowing: nextFollowing,
          followerCount: nextFollowing ? actor.followerCount + 1 : Math.max(0, actor.followerCount - 1)
        };
      }
      return actor;
    }));
  };

  const toggleLikeMoment = (momentId: string) => {
    setMoments(prev => prev.map(m => {
      if (m.id === momentId) {
        const nextLiked = !m.isLiked;
        return {
          ...m,
          isLiked: nextLiked,
          likesCount: nextLiked ? m.likesCount + 1 : Math.max(0, m.likesCount - 1)
        };
      }
      return m;
    }));
  };

  const toggleSaveMoment = (momentId: string) => {
    setMoments(prev => prev.map(m => {
      if (m.id === momentId) {
        const nextSaved = !m.isSaved;
        showToast(nextSaved ? 'Saved to your portfolio collection' : 'Removed from saved collection');
        return {
          ...m,
          isSaved: nextSaved,
          savesCount: nextSaved ? m.savesCount + 1 : Math.max(0, m.savesCount - 1)
        };
      }
      return m;
    }));
  };

  const addComment = (momentId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'comment-' + Date.now(),
      userName: userRole === 'talent' ? 'Maya Lin' : 'Fiona MacIntyre (CDG)',
      userRole: userRole === 'talent' ? 'Actor' : 'Casting Director',
      userAvatar: LEAD_HEADSHOT_URL,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMoments(prev => prev.map(m => {
      if (m.id === momentId) {
        return {
          ...m,
          commentsCount: m.commentsCount + 1,
          comments: [newComment, ...m.comments]
        };
      }
      return m;
    }));
    showToast('Comment published');
  };

  const submitAuditionApplication = (castingCallId: string, momentId: string, coverNote: string) => {
    const brief = castingCalls.find(c => c.id === castingCallId);
    const moment = moments.find(m => m.id === momentId);
    const currentActor = actors.find(a => a.id === 'actor-maya') || actors[0];

    if (!brief) return;

    const newApp: AuditionApplication = {
      id: 'app-' + Date.now(),
      castingCallId: brief.id,
      projectTitle: brief.projectTitle,
      roleTitle: brief.roleTitle,
      productionType: brief.productionType,
      castingCompany: brief.castingCompany,
      actorId: currentActor.id,
      actorName: currentActor.name,
      actorAvatar: currentActor.headshots[0] || LEAD_HEADSHOT_URL,
      momentId: moment ? moment.id : 'custom-tape',
      momentTitle: moment ? moment.title : 'Direct Audition Take',
      momentThumbnail: moment ? moment.thumbnailUrl : LEAD_HEADSHOT_URL,
      coverNote,
      status: 'Submitted',
      submittedAt: 'Today',
      updatedAt: 'Today',
      castingFeedback: 'Audition submission received. Awaiting casting director review.'
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Audition submitted for ${brief.projectTitle}`);
    setCurrentView('auditions');
  };

  const updateApplicationStatus = (appId: string, newStatus: AuditionStatus, feedback?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: newStatus,
          updatedAt: 'Just now',
          castingFeedback: feedback || (
            newStatus === 'Shortlisted' 
              ? 'Candidate placed on priority shortlist for second round.'
              : newStatus === 'Audition invited'
              ? 'Invited to live audition session. Call time dispatched.'
              : newStatus === 'Accepted'
              ? 'Offer issued for the role! Contract details dispatched to representation.'
              : newStatus === 'Not selected'
              ? 'Thank you for your audition. This role has moved in another direction.'
              : app.castingFeedback
          )
        };
      }
      return app;
    }));
    showToast(`Status updated to: ${newStatus}`);
  };

  const createNewMoment = (data: {
    title: string;
    category: SpotlightMoment['category'];
    prompt?: string;
    skills: string[];
    thumbnailUrl: string;
    durationSeconds: number;
  }) => {
    const currentActor = actors.find(a => a.id === 'actor-maya') || actors[0];
    const newMoment: SpotlightMoment = {
      id: 'moment-' + Date.now(),
      actorId: currentActor.id,
      actorName: currentActor.name,
      actorHeadline: currentActor.headline,
      actorAvatar: currentActor.headshots[0] || LEAD_HEADSHOT_URL,
      title: data.title,
      category: data.category,
      prompt: data.prompt,
      skills: data.skills,
      durationSeconds: data.durationSeconds,
      thumbnailUrl: data.thumbnailUrl,
      likesCount: 1,
      commentsCount: 0,
      savesCount: 0,
      isLiked: false,
      isSaved: true,
      inPortfolio: true,
      createdAt: 'Just now',
      comments: []
    };

    setMoments(prev => [newMoment, ...prev]);
    // update actor count
    setActors(prev => prev.map(a => a.id === currentActor.id ? { ...a, momentsCount: a.momentsCount + 1 } : a));
    showToast('Spotlight Moment published to your portfolio & feed!');
    setShowCreateMomentModal(false);
  };

  return (
    <SpotlightContext.Provider value={{
      currentView,
      setCurrentView,
      userRole,
      setUserRole,
      subscriptionTier,
      setSubscriptionTier,
      actors,
      moments,
      castingCalls,
      applications,
      notifications,
      storyGroups,
      messageThreads,
      selectedActorId,
      setSelectedActorId,
      selectedCastingCall,
      setSelectedCastingCall,
      activeFeedTab,
      setActiveFeedTab,
      showSubscriptionModal,
      setShowSubscriptionModal,
      showCreateMomentModal,
      setShowCreateMomentModal,
      toast,
      showToast,
      toggleFollowActor,
      toggleLikeMoment,
      toggleSaveMoment,
      addComment,
      submitAuditionApplication,
      updateApplicationStatus,
      createNewMoment,
      activeStoryGroup,
      activeStoryIndex,
      openStoryGroup,
      closeStoryGroup,
      advanceStory,
      prevStory,
      isDMDrawerOpen,
      setIsDMDrawerOpen,
      activeThreadId,
      setActiveThreadId,
      sendMessage,
      isSearching,
      setIsSearching,
      isActivityDrawerOpen,
      setIsActivityDrawerOpen,
      shouldHideBottomBar,
      setShouldHideBottomBar,
      activeAudioTrackModal,
      setActiveAudioTrackModal,
      showCaptions,
      toggleCaptions,
      duetPartnerMoment,
      startDuetTake,
      feedDisplayMode,
      setFeedDisplayMode
    }}>
      {children}
    </SpotlightContext.Provider>
  );
};

export const useSpotlight = () => {
  const context = useContext(SpotlightContext);
  if (!context) {
    throw new Error('useSpotlight must be used within a SpotlightProvider');
  }
  return context;
};
