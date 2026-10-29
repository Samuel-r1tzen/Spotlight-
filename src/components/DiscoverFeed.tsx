import React, { useState, useEffect } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { filterMoments } from '../utils/spotlightLogic';
import { SpotlightMoment } from '../types';
import { StoriesTray } from './StoriesTray';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Play, 
  Pause, 
  Search, 
  ChevronRight, 
  X, 
  AlertCircle,
  Flag,
  Clapperboard,
  Sparkles,
  ArrowLeft,
  Trash2,
  Send,
  Repeat,
  ThumbsUp,
  Smile,
  Star,
  Pin,
  CheckCircle2
} from 'lucide-react';
import { LEAD_HEADSHOT_URL } from '../data/mockData';

const CATEGORIES = [
  'All',
  'Dramatic Monologue',
  'Classical & Period',
  'Comedy & Timing',
  'Character Secret',
  'Physical & Combat',
  'Emotional Range'
];

const EMOJI_PALETTE = ['🔥', '👏', '❤️', '👍', '🎭', '💡', '✨', '⭐'];

const FEEDBACK_TAGS = [
  '#Subtext',
  '#AuditionRead',
  '#EmotionalTruth',
  '#Pacing',
  '#VoiceControl',
  '#ScreenPresence'
];

export const DiscoverFeed: React.FC = () => {
  const { 
    moments, 
    actors, 
    activeFeedTab, 
    setActiveFeedTab, 
    toggleLikeMoment, 
    toggleSaveMoment, 
    toggleFollowActor, 
    addComment, 
    setSelectedActorId, 
    setCurrentView,
    showToast,
    setIsSearching,
    castingCalls,
    submitAuditionApplication,
    applications,
    setShowCreateMomentModal
  } = useSpotlight();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Video playback simulation states per moment ID
  const [playingMomentId, setPlayingMomentId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState<Record<string, number>>({});
  
  // Comment / Feedback drawer state
  const [activeCommentMomentId, setActiveCommentMomentId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');
  const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({});
  const [deletedCommentIds, setDeletedCommentIds] = useState<Record<string, boolean>>({});
  const [commentFilter, setCommentFilter] = useState<'all' | 'directors' | 'praised' | 'craft'>('all');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [pinnedNoteLiked, setPinnedNoteLiked] = useState<boolean>(false);
  const [pinnedLikesCount, setPinnedLikesCount] = useState<number>(18);
  const [postReactions, setPostReactions] = useState<Record<string, Record<string, number>>>({});
  const [localComments, setLocalComments] = useState<Record<string, Array<{
    id: string;
    userName: string;
    userRole?: string;
    text: string;
    timestamp: string;
    isOwn?: boolean;
    likesCount: number;
  }>>>({});

  // Report modal state
  const [reportModalMomentId, setReportModalMomentId] = useState<string | null>(null);

  // Applied casting calls map
  const [appliedCallIds, setAppliedCallIds] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    applications.forEach(a => { map[a.castingCallId] = true; });
    return map;
  });

  const followingActorIds = actors.filter(a => a.isFollowing).map(a => a.id);
  const filteredMoments = filterMoments(moments, activeFeedTab, activeCategory, searchQuery, followingActorIds);

  // Auto-play the first visible moment on mount
  useEffect(() => {
    if (filteredMoments.length > 0 && !playingMomentId) {
      setPlayingMomentId(filteredMoments[0].id);
    }
  }, [filteredMoments, playingMomentId]);

  // Video progress simulation ticker
  useEffect(() => {
    if (!playingMomentId) return;
    const interval = setInterval(() => {
      setPlaybackProgress(prev => {
        const current = prev[playingMomentId] || 0;
        const next = current >= 100 ? 0 : current + 2.5;
        return { ...prev, [playingMomentId]: next };
      });
    }, 600);
    return () => clearInterval(interval);
  }, [playingMomentId]);

  // Sync isSearching state to context so mobile bottom nav hides strictly when searching
  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleShare = (moment: SpotlightMoment) => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Link to "${moment.title}" copied to clipboard`);
  };

  const handleOpenPassport = (actorId: string) => {
    setSelectedActorId(actorId);
    setCurrentView('passport');
  };

  const handleApplyCasting = (castingId: string, roleTitle: string) => {
    if (appliedCallIds[castingId]) {
      showToast(`Already applied for ${roleTitle}`);
      return;
    }
    setAppliedCallIds(prev => ({ ...prev, [castingId]: true }));
    submitAuditionApplication(castingId, moments[0]?.id || 'moment-1', 'Submitted via Scene Lab Discover');
    showToast(`Application submitted for ${roleTitle}`);
  };

  const handleRecordPrompt = () => {
    setShowCreateMomentModal(true);
    showToast('Scene Lab Prompt loaded: The unsaid');
  };

  const handleInsertEmoji = (emoji: string) => {
    setCommentInput(prev => `${prev} ${emoji} `.trimStart());
    const input = document.getElementById('comment-reply-input');
    if (input) input.focus();
  };

  const handleInsertTag = (tag: string) => {
    setCommentInput(prev => `${prev} ${tag} `.trimStart());
    const input = document.getElementById('comment-reply-input');
    if (input) input.focus();
  };

  const handleReactToPost = (reactionId: string, emoji: string) => {
    if (!activeCommentMomentId) return;
    setPostReactions(prev => {
      const cur = prev[activeCommentMomentId] || { like: 19, love: 42, fire: 38, bravo: 15, craft: 8, note: 5 };
      return {
        ...prev,
        [activeCommentMomentId]: {
          ...cur,
          [reactionId]: (cur[reactionId] || 0) + 1
        }
      };
    });
    showToast(`Added ${emoji} reaction to performance take`);
  };

  const handleReplyToUser = (userName: string) => {
    setCommentInput(`@${userName.toLowerCase().replace(/\s+/g, '')} `);
    const input = document.getElementById('comment-reply-input');
    if (input) input.focus();
  };

  const handleToggleLikeComment = (commentId: string) => {
    setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleDeleteComment = (commentId: string) => {
    setDeletedCommentIds(prev => ({ ...prev, [commentId]: true }));
    showToast('Reply deleted');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activeCommentMomentId) return;

    const newComment = {
      id: `c-local-${Date.now()}`,
      userName: 'Maya Lin',
      userRole: 'Verified Performer',
      text: commentInput.trim(),
      timestamp: 'Just now',
      isOwn: true,
      likesCount: 0
    };

    setLocalComments(prev => ({
      ...prev,
      [activeCommentMomentId]: [newComment, ...(prev[activeCommentMomentId] || [])]
    }));

    addComment(activeCommentMomentId, commentInput);
    setCommentInput('');
    setShowEmojiPicker(false);
    showToast('Director & peer feedback note posted');
  };

  const activeCommentMoment = moments.find(m => m.id === activeCommentMomentId);

  // Compute active comments including initial mock + locally added ones - deleted
  const baseComments = activeCommentMoment?.comments.map((c, i) => ({
    id: c.id,
    userName: c.userName,
    userRole: c.userRole,
    text: c.text,
    timestamp: c.timestamp,
    isOwn: false,
    likesCount: [6, 4, 11, 2][i % 4]
  })) || [];

  const addedComments = (activeCommentMomentId && localComments[activeCommentMomentId]) || [];
  const rawComments = [...addedComments, ...baseComments].filter(c => !deletedCommentIds[c.id]);
  
  // Apply filter
  const displayComments = rawComments.filter(c => {
    if (commentFilter === 'all') return true;
    if (commentFilter === 'directors') {
      const r = (c.userRole || '').toLowerCase();
      return r.includes('director') || r.includes('casting') || r.includes('producer');
    }
    if (commentFilter === 'praised') {
      return (c.likesCount || 0) >= 4;
    }
    if (commentFilter === 'craft') {
      return c.text.includes('#') || c.text.toLowerCase().includes('beat') || c.text.toLowerCase().includes('pause') || c.text.toLowerCase().includes('monologue');
    }
    return true;
  });

  const totalCommentsCount = rawComments.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-28">
      
      {/* 1. Instagram-Style Stories Tray */}
      <StoriesTray />

      {/* 2. Minimalist Header: Feed Switcher & Integrated Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-[#141F36]">
        
        {/* Minimalist Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-[#090F1E] rounded-xl border border-[#162440]">
          <button
            onClick={() => setActiveFeedTab('foryou')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFeedTab === 'foryou' 
                ? 'bg-[#14213B] text-[#D6B36A] shadow-sm font-bold border border-[#D6B36A]/30' 
                : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveFeedTab('following')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFeedTab === 'following' 
                ? 'bg-[#14213B] text-[#D6B36A] shadow-sm font-bold border border-[#D6B36A]/30' 
                : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
          >
            Following ({followingActorIds.length})
          </button>
          <button
            onClick={() => setActiveFeedTab('explore')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeFeedTab === 'explore' 
                ? 'bg-[#14213B] text-[#D6B36A] shadow-sm font-bold border border-[#D6B36A]/30' 
                : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
          >
            Explore Talent
          </button>
        </div>

        {/* Minimalist Search Bar with Auto Tab-Bar Hiding */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8E94A5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onChange={handleSearchChange}
            placeholder="Search actors, roles, monologues..."
            className="w-full pl-9 pr-8 py-2 bg-[#090F1E] border border-[#162440] rounded-xl text-xs text-[#F6F4EF] placeholder-[#737A8C] focus:outline-none focus:border-[#D6B36A]/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8E94A5] hover:text-[#F6F4EF] transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Acting Categories Filter Chips in Dark Blue with Gold Highlights */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === category 
                ? 'bg-[#D6B36A] text-black font-bold shadow-[0_0_12px_rgba(214,179,106,0.35)]' 
                : 'bg-[#080E1C] text-[#8E94A5] hover:text-[#F6F4EF] border border-[#142038] hover:border-[#D6B36A]/40'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 3. Scene Lab · Weekly Prompt Card ("The Lap" from template) */}
      <div className="my-4 p-5 sm:p-6 rounded-2xl border border-[#D6B36A]/35 bg-gradient-to-br from-[#12254A]/90 via-[#0E1628] to-[#070B14] shadow-[0_4px_30px_rgba(2,4,10,0.8)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-radial from-[#D6B36A]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#D6B36A] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scene Lab · Weekly Prompt</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F6F4EF] font-display">
              The unsaid
            </h3>
            <p className="text-xs sm:text-sm text-[#A4A6AD] leading-relaxed">
              Perform a 60-second monologue where the words say one thing and the character feels another.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2.5">
            <button
              onClick={handleRecordPrompt}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#F0DCAE] text-black font-bold text-xs shadow-md shadow-[#D6B36A]/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Clapperboard className="w-4 h-4 stroke-[2.2]" />
              <span>Record this prompt</span>
            </button>
            <button
              onClick={() => setCurrentView('scenelab')}
              className="px-4 py-2.5 rounded-xl bg-[#141B2D] text-[#D6B36A] border border-[#263554] hover:border-[#D6B36A]/50 text-xs font-semibold transition-all cursor-pointer"
            >
              View Lab Details
            </button>
          </div>
        </div>
      </div>

      {/* 4. Horizontal Casting Calls Shelf (from template .hs2 and .cc) */}
      <div className="mb-6 space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#D6B36A]">
            Casting Calls · Recommended Listings
          </p>
          <button
            onClick={() => setCurrentView('casting')}
            className="text-xs text-[#8E94A5] hover:text-[#D6B36A] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Browse all calls</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none">
          {castingCalls.slice(0, 5).map(call => {
            const isApplied = !!appliedCallIds[call.id];
            return (
              <div 
                key={call.id}
                className="shrink-0 w-64 p-4 rounded-xl bg-[#090F1E] border border-[#16233B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-[#8E94A5] uppercase tracking-wider">
                      {call.isPaid ? 'Paid · In person' : 'Remote'}
                    </span>
                    <span className="text-[9px] font-bold text-[#D6B36A] bg-[#D6B36A]/10 px-1.5 py-0.5 rounded border border-[#D6B36A]/20">
                      {call.productionType}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F6F4EF] font-display line-clamp-1">
                    {call.roleTitle}
                  </h4>
                  <p className="text-xs text-[#8E94A5] line-clamp-1 mt-0.5">
                    “{call.projectTitle}”
                  </p>
                  <p className="text-[11px] text-[#4CAF83] font-medium mt-2 flex items-center gap-1">
                    <span>Casting Fit: matches {call.requiredSkills.slice(0, 2).join(', ')}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleApplyCasting(call.id, call.roleTitle)}
                  className={`w-full py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isApplied
                      ? 'bg-transparent text-[#A4A6AD] border border-[#262A35]'
                      : 'bg-[#D6B36A] text-black hover:bg-[#F0DCAE] shadow-sm shadow-[#D6B36A]/20'
                  }`}
                >
                  {isApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Performance Showcase Stage */}
      {filteredMoments.length === 0 ? (
        <div className="my-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-[#080E1C] border border-[#142038]">
          <AlertCircle className="w-8 h-8 text-[#D6B36A] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#F6F4EF]">No Moments Found</h3>
          <p className="text-xs text-[#8E94A5] mt-1.5 mb-5 leading-relaxed">
            {activeFeedTab === 'following' 
              ? "You aren't following any performers yet, or they haven't posted in this category." 
              : "No performances match your current category or search criteria."}
          </p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); setActiveFeedTab('foryou'); setIsSearching(false); }}
            className="px-5 py-2 text-xs font-bold bg-[#D6B36A] text-black rounded-lg hover:bg-[#F0DCAE] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
          {filteredMoments.map((moment, index) => {
            const isPlaying = playingMomentId === moment.id;
            const progress = playbackProgress[moment.id] || 0;
            const actor = actors.find(a => a.id === moment.actorId);
            const isActorFollowed = actor?.isFollowing || false;

            return (
              <div
                key={moment.id}
                className="relative rounded-2xl overflow-hidden border border-[#142038] bg-[#070C18] shadow-[0_4px_30px_rgba(2,4,10,0.7)] flex flex-col group transition-all duration-300 hover:border-[#D6B36A]/40"
              >
                {/* 9:16 Cinematic Video Container */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black flex items-center justify-center">
                  
                  <img
                    src={moment.thumbnailUrl}
                    alt={moment.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isPlaying ? 'scale-[1.03]' : 'scale-100'
                    }`}
                  />

                  {/* Contrast Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/95 pointer-events-none" />

                  {/* Top Bar on Card: Theatrical Tag & Category (Sound button removed) */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-auto">
                    <div className="flex items-center gap-1.5">
                      {/* Theatrical Dark Red Badge for Featured / Audition Takes */}
                      {index % 2 === 0 ? (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#450A0A]/95 text-[#FFF6E0] border border-[#7F1D1D] shadow">
                          Audition Take
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#090F1E]/90 text-[#D6B36A] border border-[#D6B36A]/30">
                          {moment.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center Play / Pause Click Action */}
                  <button
                    onClick={() => setPlayingMomentId(isPlaying ? null : moment.id)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center group/btn focus:outline-none cursor-pointer"
                    aria-label={isPlaying ? "Pause performance take" : "Play performance take"}
                  >
                    {!isPlaying && (
                      <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-[#D6B36A]/50 flex items-center justify-center text-[#D6B36A] group-hover/btn:scale-110 transition-transform shadow-[0_0_24px_rgba(214,179,106,0.3)]">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    )}
                  </button>

                  {/* Minimalist Scrub Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 z-20">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D6B36A] to-[#F0DCAE] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Elegant Floating Right Actions Bar matching template .act */}
                  <div className="absolute right-2.5 bottom-16 sm:bottom-20 z-20 flex flex-col items-center gap-3 p-1.5 rounded-3xl bg-black/55 backdrop-blur-md border border-[#D6B36A]/25 shadow-lg">
                    
                    {/* Like / Talent Endorsement (Instagram Rose / Sunset Glow) */}
                    <button
                      onClick={() => toggleLikeMoment(moment.id)}
                      className="flex flex-col items-center group/act focus:outline-none cursor-pointer"
                      title="Demonstrates high craft (Like)"
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        moment.isLiked 
                          ? 'bg-gradient-to-tr from-[#E1306C] via-[#FD1D1D] to-[#F58529] text-white shadow-[0_0_16px_rgba(225,48,108,0.5)] scale-105' 
                          : 'text-[#F6F4EF] hover:bg-white/10'
                      }`}>
                        <Heart className={`w-4 h-4 ${moment.isLiked ? 'fill-current' : ''}`} />
                      </div>
                      <span className="text-[10px] font-bold text-[#F6F4EF] mt-0.5 tabular-nums drop-shadow">
                        {moment.likesCount}
                      </span>
                    </button>

                    {/* Casting & Peer Feedback Notes */}
                    <button
                      onClick={() => setActiveCommentMomentId(moment.id)}
                      className="flex flex-col items-center group/act focus:outline-none cursor-pointer"
                      title="Director & peer feedback notes"
                    >
                      <div className="w-9 h-9 rounded-full text-[#F6F4EF] hover:bg-[#1877F2]/20 hover:text-[#1877F2] flex items-center justify-center transition-all">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-[#F6F4EF] mt-0.5 tabular-nums drop-shadow">
                        {moment.commentsCount}
                      </span>
                    </button>

                    {/* Save to Portfolio Collection */}
                    <button
                      onClick={() => toggleSaveMoment(moment.id)}
                      className="flex flex-col items-center group/act focus:outline-none cursor-pointer"
                      title="Save to portfolio collection"
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        moment.isSaved 
                          ? 'text-[#D6B36A] bg-[#D6B36A]/10' 
                          : 'text-[#F6F4EF] hover:bg-white/10'
                      }`}>
                        <Bookmark className={`w-4 h-4 ${moment.isSaved ? 'fill-current' : ''}`} />
                      </div>
                      <span className="text-[10px] font-bold text-[#F6F4EF] mt-0.5 tabular-nums drop-shadow">
                        {moment.savesCount}
                      </span>
                    </button>

                    {/* Share Performance */}
                    <button
                      onClick={() => handleShare(moment)}
                      className="flex flex-col items-center group/act focus:outline-none cursor-pointer"
                      title="Copy share link"
                    >
                      <div className="w-9 h-9 rounded-full text-[#F6F4EF] hover:bg-[#1877F2]/20 hover:text-[#1877F2] flex items-center justify-center transition-all">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-medium text-[#8E94A5] mt-0.5 drop-shadow">
                        Share
                      </span>
                    </button>

                    {/* Report Content */}
                    <button
                      onClick={() => setReportModalMomentId(moment.id)}
                      className="p-1.5 rounded-full text-white/40 hover:text-white/80 transition-colors"
                      title="Report inappropriate content"
                    >
                      <Flag className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Actor Identity & Performance Excerpt */}
                  <div className="absolute bottom-3 left-3.5 right-14 z-20 text-left pointer-events-auto">
                    
                    {/* Performer Card */}
                    <div className="flex items-center gap-2 mb-2">
                      <button 
                        onClick={() => handleOpenPassport(moment.actorId)}
                        className="flex items-center gap-2 group/actor hover:opacity-95 text-left cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow shrink-0">
                          <img
                            src={moment.actorAvatar}
                            alt={moment.actorName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#F6F4EF] group-hover/actor:text-[#D6B36A] transition-colors leading-tight">
                              {moment.actorName}
                            </span>
                            {/* Facebook Blue Verified Badge */}
                            <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[8.5px] font-black shadow-sm shadow-[#1877F2]/40" title="Spotlight Verified Talent">✓</span>
                          </div>
                          <span className="text-[10px] text-[#A4A9B8] truncate max-w-[130px] leading-tight">
                            {moment.actorHeadline}
                          </span>
                        </div>
                      </button>

                      {/* Follow Performer */}
                      <button
                        onClick={() => toggleFollowActor(moment.actorId)}
                        className={`ml-1 px-2.5 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                          isActorFollowed 
                            ? 'bg-[#121B2F] text-[#8E94A5] border border-[#1E2C48]' 
                            : 'bg-[#D6B36A] text-black hover:bg-[#F0DCAE]'
                        }`}
                      >
                        {isActorFollowed ? 'Following' : 'Follow'}
                      </button>
                    </div>

                    {/* Performance Take Title */}
                    <h4 className="text-sm font-bold text-[#F6F4EF] line-clamp-1 mb-1 font-display">
                      {moment.title}
                    </h4>

                    {moment.prompt && (
                      <p className="text-[11px] text-[#C4C8D4] line-clamp-2 mb-2 leading-relaxed font-light">
                        {moment.prompt}
                      </p>
                    )}

                    {/* Zero-Pill Skill Metadata */}
                    <div className="flex flex-wrap items-center gap-1 text-[11px] text-[#D6B36A] font-medium">
                      {moment.skills.map((skill, idx) => (
                        <React.Fragment key={skill}>
                          <span>#{skill.replace(/\s+/g, '')}</span>
                          {idx < moment.skills.length - 1 && (
                            <span className="text-[#8E94A5]" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Talent Passport Link */}
                    <button
                      onClick={() => handleOpenPassport(moment.actorId)}
                      className="mt-2.5 text-[11px] font-semibold text-[#F6F4EF] hover:text-[#D6B36A] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Full Actor Portfolio</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D6B36A]" />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 5. Customized Comments & Notes Drawer with Instagram & Facebook Color Accents */}
      {activeCommentMoment && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#07090E] border-l border-[#1A2438] h-full flex flex-col shadow-2xl">
            
            {/* Header with Back button and Post title */}
            <div className="px-4 py-3 bg-[#0A0D16] border-b border-[#162136] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveCommentMomentId(null)}
                  className="p-1.5 rounded-lg text-[#F6F4EF] hover:text-[#D6B36A] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Back to feed"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-sm font-bold text-[#F6F4EF] tracking-wide flex items-center gap-2">
                    <span>Performance Notes</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/30">
                      {totalCommentsCount}
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#8E94A5]">Director critiques, peer praise & audition notes</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCommentMomentId(null)}
                className="p-1.5 rounded-lg text-[#8E94A5] hover:text-[#F6F4EF] hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container with Quote Card, Reaction Bar, Pinned Director Note, and Comments */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              
              {/* Original Post Summary Card with Instagram Sunset Ring & Facebook Blue Badge */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0C1222] via-[#090E1A] to-[#06080E] border border-[#182642] shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0 shadow">
                    <img src={activeCommentMoment.thumbnailUrl} alt={activeCommentMoment.actorName} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <b className="text-xs sm:text-sm text-[#F6F4EF] font-bold truncate">{activeCommentMoment.actorName}</b>
                      {/* Facebook Blue Verified Badge */}
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[8.5px] font-black shadow-sm shrink-0" title="Verified Performer">✓</span>
                    </div>
                    <span className="text-[10px] text-[#8E94A5] block truncate">@{activeCommentMoment.actorName.toLowerCase().replace(/\s+/g, '')} · Take Take #1</span>
                  </div>
                </div>

                <p className="text-xs text-[#E1E4EC] leading-relaxed bg-[#050810]/70 p-2.5 rounded-xl border border-[#141F33]">
                  <span className="text-[#D6B36A] font-semibold">“{activeCommentMoment.title}”</span> — {activeCommentMoment.prompt}
                </p>

                {/* Post Action Metrics Row */}
                <div className="pt-2 border-t border-[#142036] flex items-center justify-between text-xs text-[#8E94A5]">
                  <button
                    onClick={() => handleReplyToUser(activeCommentMoment.actorName)}
                    className="flex items-center gap-1.5 hover:text-[#1877F2] transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  <button
                    onClick={() => showToast('Take echoed to your feed')}
                    className="flex items-center gap-1.5 hover:text-[#D6B36A] transition-colors cursor-pointer"
                  >
                    <Repeat className="w-4 h-4" />
                    <span>Echo</span>
                  </button>
                  <button
                    onClick={() => toggleLikeMoment(activeCommentMoment.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeCommentMoment.isLiked ? 'text-[#E1306C] font-semibold' : 'hover:text-[#E1306C]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activeCommentMoment.isLiked ? 'fill-current text-[#E1306C]' : ''}`} />
                    <span className="tabular-nums">{activeCommentMoment.likesCount}</span>
                  </button>
                  <button
                    onClick={() => toggleSaveMoment(activeCommentMoment.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeCommentMoment.isSaved ? 'text-[#D6B36A]' : 'hover:text-[#D6B36A]'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${activeCommentMoment.isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleShare(activeCommentMoment)}
                    className="flex items-center gap-1.5 hover:text-[#1877F2] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Facebook / Instagram Interactive Reaction Dock */}
              <div className="p-2.5 rounded-2xl bg-[#090E1C] border border-[#16233B] shadow-inner space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-[#8E94A5] tracking-wider uppercase">
                    Industry Reactions
                  </span>
                  <span className="text-[9.5px] text-[#A4A9B8]">Tap to react</span>
                </div>
                
                <div className="grid grid-cols-6 gap-1.5 pt-0.5">
                  {[
                    { id: 'like', emoji: '👍', label: 'Like', count: (postReactions[activeCommentMoment.id]?.like || 22), color: 'text-[#1877F2]' },
                    { id: 'love', emoji: '❤️', label: 'Love', count: (postReactions[activeCommentMoment.id]?.love || 48), color: 'text-[#E1306C]' },
                    { id: 'fire', emoji: '🔥', label: 'Fire', count: (postReactions[activeCommentMoment.id]?.fire || 39), color: 'text-[#FF5722]' },
                    { id: 'bravo', emoji: '👏', label: 'Bravo', count: (postReactions[activeCommentMoment.id]?.bravo || 19), color: 'text-[#D6B36A]' },
                    { id: 'craft', emoji: '🎭', label: 'Craft', count: (postReactions[activeCommentMoment.id]?.craft || 14), color: 'text-[#8B5CF6]' },
                    { id: 'note', emoji: '💡', label: 'Note', count: (postReactions[activeCommentMoment.id]?.note || 7), color: 'text-[#10B981]' },
                  ].map(rx => (
                    <button
                      key={rx.id}
                      type="button"
                      onClick={() => handleReactToPost(rx.id, rx.emoji)}
                      className="flex flex-col items-center py-1.5 px-1 rounded-xl bg-[#0E172C] hover:bg-[#152342] border border-[#1E2D4E] hover:border-[#D6B36A]/50 transition-all active:scale-125 cursor-pointer group"
                      title={rx.label}
                    >
                      <span className="text-base group-hover:scale-115 transition-transform">{rx.emoji}</span>
                      <span className={`text-[10px] font-bold tabular-nums mt-0.5 ${rx.color}`}>{rx.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Segmented Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {[
                  { id: 'all', label: `All Notes (${totalCommentsCount})` },
                  { id: 'directors', label: '⭐ Director Notes' },
                  { id: 'praised', label: '🔥 Top Praised' },
                  { id: 'craft', label: '🎭 Craft Analysis' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCommentFilter(tab.id as any)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      commentFilter === tab.id
                        ? 'bg-gradient-to-r from-[#1877F2] to-[#0A58CA] text-white shadow-sm'
                        : 'bg-[#0B1020] text-[#8E94A5] hover:text-[#F6F4EF] border border-[#16223B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Pinned Casting Director Note */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0C152B] via-[#091122] to-[#070D18] border border-[#1877F2]/40 shadow-lg space-y-2.5 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#14223E] pb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1877F2] tracking-wider uppercase">
                    <Pin className="w-3.5 h-3.5 fill-current text-[#D6B36A]" />
                    <span>Pinned Casting Director Note</span>
                  </div>
                  <span className="text-[10px] text-[#A4A9B8]">Head of Casting · Synchrony Films</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="relative w-8 h-8 rounded-full ring-2 ring-[#1877F2] shrink-0 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" 
                      alt="Fiona MacIntyre" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#F6F4EF]">Fiona MacIntyre (CDG)</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[8px] font-black" title="Verified Casting Director">✓</span>
                      <span className="text-[9px] font-semibold text-[#1877F2] bg-[#1877F2]/10 border border-[#1877F2]/30 px-1.5 py-0.2 rounded">
                        Casting Director
                      </span>
                    </div>
                    <p className="text-xs text-[#E1E4EC] leading-relaxed mt-1.5">
                      “Exquisite subtext shift at <span className="text-[#1877F2] font-semibold">0:24</span>. The deliberate hesitation in breathing before the confession delivers true emotional vulnerability. Strongly recommended for the callback round.”
                    </p>
                    <div className="mt-2.5 flex items-center gap-4 text-xs text-[#8E94A5]">
                      <button
                        onClick={() => {
                          setPinnedNoteLiked(prev => !prev);
                          setPinnedLikesCount(prev => prev + (pinnedNoteLiked ? -1 : 1));
                        }}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          pinnedNoteLiked ? 'text-[#E1306C] font-bold' : 'hover:text-[#E1306C]'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${pinnedNoteLiked ? 'fill-current text-[#E1306C]' : ''}`} />
                        <span className="tabular-nums">{pinnedLikesCount}</span>
                      </button>
                      <button
                        onClick={() => handleReplyToUser('fionamacintyre')}
                        className="hover:text-[#1877F2] transition-colors cursor-pointer flex items-center gap-1 font-medium"
                      >
                        <span>Reply</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText('Fiona MacIntyre Note: Exquisite subtext shift at 0:24.');
                          showToast('Director note copied');
                        }}
                        className="hover:text-[#F6F4EF] transition-colors cursor-pointer"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threaded Comments List */}
              <div className="space-y-3">
                {displayComments.length === 0 ? (
                  <div className="text-center py-10 text-[#8E94A5] text-xs space-y-1">
                    <p className="font-semibold text-[#F6F4EF]">No matching feedback notes</p>
                    <p className="text-[11px]">Be the first casting director or peer performer to leave feedback.</p>
                  </div>
                ) : (
                  displayComments.map(c => {
                    const isLiked = !!commentLikes[c.id];
                    const likesCount = c.likesCount + (isLiked ? 1 : 0);
                    const isDirector = (c.userRole || '').toLowerCase().includes('director') || (c.userRole || '').toLowerCase().includes('casting');

                    return (
                      <div 
                        key={c.id} 
                        className={`p-3.5 rounded-2xl border transition-colors space-y-2.5 ${
                          c.isOwn 
                            ? 'bg-[#0E162A] border-[#1877F2]/40 shadow-sm'
                            : 'bg-[#090D18] border-[#141E33] hover:border-[#1E2E4E]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            {/* Role-Based Avatar Ring (Facebook Blue for Pro/Director, Instagram Sunset for Actor) */}
                            <div className={`w-8 h-8 rounded-full p-[1.5px] shrink-0 ${
                              isDirector
                                ? 'bg-[#1877F2] ring-1 ring-[#1877F2]/50'
                                : 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]'
                            }`}>
                              <div className="w-full h-full rounded-full bg-[#08090B] flex items-center justify-center text-[10px] font-bold text-[#F6F4EF]">
                                {c.userName.slice(0, 1)}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-[#F6F4EF]">{c.userName}</span>
                                {/* Facebook Blue Checkmark */}
                                <span className="w-3 h-3 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[7.5px] font-bold" title="Verified Profile">✓</span>
                                {c.userRole && (
                                  <span className={`text-[9px] font-medium px-1.5 py-0.2 rounded border ${
                                    isDirector
                                      ? 'text-[#1877F2] bg-[#1877F2]/10 border-[#1877F2]/30'
                                      : 'text-[#D6B36A] bg-[#D6B36A]/10 border-[#D6B36A]/20'
                                  }`}>
                                    {c.userRole}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-[#737A8C]">@{c.userName.toLowerCase().replace(/\s+/g, '')} · {c.timestamp}</span>
                            </div>
                          </div>

                          {c.isOwn && (
                            <button
                              onClick={() => handleDeleteComment(c.id)}
                              className="p-1 text-[#8E94A5] hover:text-[#FF7070] transition-colors cursor-pointer"
                              title="Delete note"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Comment Body */}
                        <div className="pl-10 space-y-1">
                          <span className="text-[11px] text-[#8E94A5] block">
                            Replying to <span className="text-[#1877F2] font-medium">@{activeCommentMoment.actorName.toLowerCase().replace(/\s+/g, '')}</span>
                          </span>
                          <p className="text-xs text-[#DCDAD2] leading-relaxed">
                            {c.text}
                          </p>
                          
                          {/* "Liked by author" micro-badge like IG / TikTok */}
                          {!c.isOwn && (
                            <div className="pt-0.5 flex items-center gap-1 text-[10px] text-[#A4A9B8]">
                              <span className="text-[#E1306C]">❤️</span>
                              <span>Liked by {activeCommentMoment.actorName.split(' ')[0]}</span>
                            </div>
                          )}
                        </div>

                        {/* Comment actions: Reply, Like, Share */}
                        <div className="pl-10 pt-1 flex items-center gap-4 text-xs text-[#8E94A5]">
                          <button
                            onClick={() => handleReplyToUser(c.userName)}
                            className="hover:text-[#1877F2] transition-colors cursor-pointer flex items-center gap-1 font-medium"
                          >
                            <span>Reply</span>
                          </button>
                          <button
                            onClick={() => handleToggleLikeComment(c.id)}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isLiked ? 'text-[#E1306C] font-semibold' : 'hover:text-[#E1306C]'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-[#E1306C]' : ''}`} />
                            <span className="tabular-nums">{likesCount > 0 ? likesCount : ''}</span>
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(c.text);
                              showToast('Comment copied');
                            }}
                            className="hover:text-[#F6F4EF] transition-colors cursor-pointer"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Quick Feedback Tags Shelf */}
            <div className="px-3.5 pt-2 pb-1 bg-[#080B12] border-t border-[#141E33] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-[#8E94A5] font-semibold shrink-0">Tags:</span>
              {FEEDBACK_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleInsertTag(tag)}
                  className="px-2.5 py-0.5 rounded-full text-[10.5px] font-medium bg-[#0E172A] hover:bg-[#182644] text-[#D6B36A] hover:text-[#FFF6E0] border border-[#1E2E4E] shrink-0 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Sticky Bottom Reply Bar with Instagram & Facebook Gradients */}
            <form onSubmit={handlePostComment} className="p-3 bg-[#0A0D16] border-t border-[#162136] flex flex-col gap-2">
              
              {/* Optional Quick Emoji Bar */}
              {showEmojiPicker && (
                <div className="flex items-center gap-2 p-1.5 bg-[#0D1526] rounded-xl border border-[#1A2640] overflow-x-auto animate-fade-in">
                  {EMOJI_PALETTE.map(em => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => handleInsertEmoji(em)}
                      className="text-lg p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      {em}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* User Avatar with Instagram Ring */}
                <div className="w-8 h-8 rounded-full p-[1px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0">
                  <img src={LEAD_HEADSHOT_URL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>

                <div className="flex-1 relative">
                  <input
                    id="comment-reply-input"
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Leave director feedback or peer praise..."
                    maxLength={280}
                    className="w-full pl-3.5 pr-8 py-2 bg-[#101728] border border-[#1C2A44] rounded-xl text-xs text-[#F6F4EF] placeholder-[#737A8C] focus:outline-none focus:border-[#1877F2] transition-colors"
                  />
                  {/* Emoji Picker Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E94A5] hover:text-[#D6B36A] transition-colors cursor-pointer"
                    title="Insert emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>

                {/* Submit button with dynamic Facebook Blue to Instagram Rose Gradient */}
                <button
                  type="submit"
                  disabled={!commentInput.trim()}
                  className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    commentInput.trim()
                      ? 'bg-gradient-to-r from-[#1877F2] via-[#E1306C] to-[#D6B36A] text-white shadow-md shadow-[#1877F2]/30 hover:brightness-110 active:scale-95'
                      : 'bg-[#151D2E] text-[#636C80] border border-[#1E2940] cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Post</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Character Count */}
              <div className="flex items-center justify-between text-[10px] text-[#6D7486] px-1">
                <span>Supports Markdown & tags (#subtext)</span>
                <span className="tabular-nums">{commentInput.length}/280</span>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Safety Report Modal */}
      {reportModalMomentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#080E1C] border border-[#1A2640] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F6F4EF]">Report Performance Take</h3>
            <p className="text-xs text-[#8E94A5]">
              Spotlight upholds strict community safety, authenticity, and harassment standards.
            </p>
            <div className="space-y-2">
              {['Copyright infringement', 'Inappropriate or harmful content', 'Misleading casting claim', 'Spam'].map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    setReportModalMomentId(null);
                    showToast('Report submitted for review by moderation team.');
                  }}
                  className="w-full text-left p-2.5 rounded-lg bg-[#0E1628] hover:bg-[#16223D] border border-[#172542] text-xs text-[#F6F4EF] transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
            <button
              onClick={() => setReportModalMomentId(null)}
              className="w-full py-2 text-xs font-semibold text-[#8E94A5] hover:text-[#F6F4EF]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
