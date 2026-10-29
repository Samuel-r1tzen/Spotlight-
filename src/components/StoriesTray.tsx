import React, { useEffect, useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { StoryGroup } from '../types';
import { Plus, X, ChevronLeft, ChevronRight, Send, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { LEAD_HEADSHOT_URL } from '../data/mockData';

export const StoriesTray: React.FC = () => {
  const { 
    storyGroups, 
    activeStoryGroup, 
    activeStoryIndex, 
    openStoryGroup, 
    closeStoryGroup, 
    advanceStory, 
    prevStory,
    showToast
  } = useSpotlight();

  const [storyProgress, setStoryProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance story timer
  useEffect(() => {
    if (!activeStoryGroup || isPaused) return;

    setStoryProgress(0);
    const durationMs = 5000;
    const intervalTime = 50;
    const step = (intervalTime / durationMs) * 100;

    const interval = setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 100) {
          advanceStory();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [activeStoryGroup, activeStoryIndex, isPaused]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Reply sent to ${activeStoryGroup?.actorName}`);
    setReplyText('');
    setIsPaused(false);
  };

  const currentStory = activeStoryGroup?.stories[activeStoryIndex];

  return (
    <>
      {/* Horizontal Stories Tray */}
      <div className="flex items-center gap-4 overflow-x-auto py-3 px-1 scrollbar-none mb-4 border-b border-[#1E222B]/70">
        
        {/* Your Story Button with Facebook Blue / Instagram styling */}
        <button
          onClick={() => showToast('Select a 15-second backstage take or rehearsal video to add to your story.')}
          className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none cursor-pointer"
        >
          <div className="relative w-16 h-16 rounded-full p-0.5 border-2 border-dashed border-[#1877F2]/60 group-hover:border-[#1877F2] flex items-center justify-center transition-colors">
            <img
              src={LEAD_HEADSHOT_URL}
              alt="Your story"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
            {/* Facebook Blue Add Badge */}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md shadow-[#1877F2]/40 ring-2 ring-[#050608]">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-[#A4A6AD] group-hover:text-[#F6F4EF] transition-colors truncate max-w-[68px]">
            Your Story
          </span>
        </button>

        {/* Other Performers' Stories with Authentic Instagram Sunset Gradient Ring */}
        {storyGroups.map(group => (
          <button
            key={group.id}
            onClick={() => openStoryGroup(group)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-full p-[2.5px] transition-all ${
              group.hasUnseen
                ? 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-[0_0_14px_rgba(221,42,123,0.35)]'
                : 'border border-[#262A35]'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-black p-[1.5px]">
                <img
                  src={group.actorAvatar}
                  alt={group.actorName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <span className="text-[11px] font-medium text-[#E1DFD8] group-hover:text-[#D6B36A] transition-colors truncate max-w-[70px]">
              {group.actorName.split(' ')[0]}
            </span>
          </button>
        ))}

      </div>

      {/* Full-Screen Stories Modal Viewer (Instagram-style) */}
      {activeStoryGroup && currentStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4">
          
          <div className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl flex flex-col justify-between border border-[#262A35]">
            
            {/* Background Story Media */}
            <img
              src={currentStory.mediaUrl}
              alt="Story frame"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85" />

            {/* Top Bar: Multi-Segment Progress Bars */}
            <div className="relative z-10 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5">
                {activeStoryGroup.stories.map((st, i) => (
                  <div key={st.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D6B36A] transition-all"
                      style={{
                        width: i < activeStoryIndex ? '100%' : i === activeStoryIndex ? `${storyProgress}%` : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between text-xs text-[#F6F4EF] pt-1">
                <div className="flex items-center gap-2">
                  <img
                    src={activeStoryGroup.actorAvatar}
                    alt={activeStoryGroup.actorName}
                    className="w-8 h-8 rounded-full object-cover border border-[#D6B36A]"
                  />
                  <div>
                    <span className="font-bold leading-none block">{activeStoryGroup.actorName}</span>
                    <span className="text-[10px] text-[#A4A6AD]">{activeStoryGroup.headline} · {currentStory.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-[#D6B36A] border border-white/10"
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={closeStoryGroup}
                    className="p-1 rounded-full text-white/70 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tap Left / Right Hotspots for Navigation */}
            <div className="absolute inset-0 z-0 flex">
              <div 
                className="w-1/3 h-full cursor-pointer"
                onClick={prevStory}
                title="Previous story"
              />
              <div 
                className="w-2/3 h-full cursor-pointer"
                onClick={advanceStory}
                title="Next story"
              />
            </div>

            {/* Bottom Caption & Interactive Reply Input */}
            <div className="relative z-10 p-4 space-y-3">
              <p className="text-xs text-[#F6F4EF] font-medium leading-relaxed drop-shadow-md">
                {currentStory.caption}
              </p>

              <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={replyText}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${activeStoryGroup.actorName}...`}
                  className="flex-1 px-3 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D6B36A]"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="p-2 bg-[#D6B36A] text-black rounded-full disabled:opacity-40 shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}
    </>
  );
};
