import React, { useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Play, 
  Share2, 
  UserPlus, 
  UserCheck, 
  Grid3X3, 
  Film, 
  Bookmark, 
  Send, 
  Plus, 
  ChevronDown, 
  ExternalLink,
  Award,
  Sparkles,
  Heart
} from 'lucide-react';
import { calculateProfileCompleteness } from '../utils/spotlightLogic';

export const TalentPassport: React.FC = () => {
  const { 
    actors, 
    selectedActorId, 
    setSelectedActorId, 
    moments, 
    toggleFollowActor,
    showToast,
    setCurrentView,
    setIsDMDrawerOpen,
    setActiveThreadId,
    openStoryGroup,
    storyGroups
  } = useSpotlight();

  const currentActor = actors.find(a => a.id === selectedActorId) || actors[0];
  const actorMoments = moments.filter(m => m.actorId === currentActor.id);
  const completeness = calculateProfileCompleteness(currentActor);
  const actorStoryGroup = storyGroups.find(g => g.actorId === currentActor.id);

  const [activeTab, setActiveTab] = useState<'grid' | 'reels' | 'credits' | 'training'>('grid');
  const [showHeadshotModal, setShowHeadshotModal] = useState<string | null>(null);

  const handleSharePortfolio = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Instagram Portfolio Link for @${currentActor.name.toLowerCase().replace(/\s+/g, '_')} copied!`);
  };

  const handleMessageActor = () => {
    setActiveThreadId('thread-fiona');
    setIsDMDrawerOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24">
      
      {/* Top Bar Switcher (Select Profile) */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1E222B]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#F6F4EF]">
            @{currentActor.name.toLowerCase().replace(/\s+/g, '_')}
          </span>
          {currentActor.verifiedCredentials.length > 0 && (
            <ShieldCheck className="w-4 h-4 text-[#4CAF83]" />
          )}
        </div>

        {/* Quick Switch Actor Profile */}
        <div className="relative">
          <select
            value={currentActor.id}
            onChange={(e) => setSelectedActorId(e.target.value)}
            className="appearance-none bg-[#14171E] border border-[#262A35] text-xs text-[#F6F4EF] py-1.5 pl-3 pr-7 rounded-lg focus:outline-none focus:border-[#D6B36A] cursor-pointer"
          >
            {actors.map(actor => (
              <option key={actor.id} value={actor.id}>
                {actor.name} ({actor.categories[0]})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#A4A6AD] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Instagram Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 mb-8">
        
        {/* Profile Picture with Colorful Gradient Story Ring */}
        <div className="relative shrink-0">
          <div 
            onClick={() => actorStoryGroup ? openStoryGroup(actorStoryGroup) : setShowHeadshotModal(currentActor.headshots[0])}
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 cursor-pointer transition-transform hover:scale-102 ${
              actorStoryGroup 
                ? 'bg-gradient-to-tr from-[#D6B36A] via-[#E4C47F] to-[#7A5B1D] ring-2 ring-[#D6B36A]/30' 
                : 'border border-[#2A2E38]'
            }`}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-black p-0.5">
              <img
                src={currentActor.headshots[0]}
                alt={currentActor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          {actorStoryGroup && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.2 bg-[#D6B36A] text-black text-[9px] font-bold rounded-full uppercase tracking-wider">
              Story
            </span>
          )}
        </div>

        {/* Profile Stats & Bio */}
        <div className="flex-1 space-y-4">
          
          {/* Top Row: Handle & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#F6F4EF]">
              {currentActor.name}
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFollowActor(currentActor.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentActor.isFollowing
                    ? 'bg-[#1F232D] text-[#A4A6AD] border border-[#2E3342] hover:text-[#F6F4EF]'
                    : 'bg-[#D6B36A] text-black hover:bg-[#e4c47f]'
                }`}
              >
                {currentActor.isFollowing ? 'Following' : 'Follow'}
              </button>

              <button
                onClick={handleMessageActor}
                className="px-4 py-1.5 text-xs font-semibold text-[#F6F4EF] bg-[#171922] hover:bg-[#20232B] border border-[#2A2E38] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>

              <button
                onClick={handleSharePortfolio}
                className="p-2 text-[#A4A6AD] hover:text-[#F6F4EF] bg-[#171922] hover:bg-[#20232B] border border-[#2A2E38] rounded-lg transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Followers / Following / Takes Numbers Row */}
          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-[#F6F4EF] tabular-nums">{actorMoments.length} </span>
              <span className="text-[#A4A6AD]">takes</span>
            </div>
            <div>
              <span className="font-bold text-[#F6F4EF] tabular-nums">{currentActor.followerCount} </span>
              <span className="text-[#A4A6AD]">followers</span>
            </div>
            <div>
              <span className="font-bold text-[#F6F4EF] tabular-nums">142 </span>
              <span className="text-[#A4A6AD]">following</span>
            </div>
            <div>
              <span className="font-bold text-[#D6B36A] tabular-nums">94% </span>
              <span className="text-[#A4A6AD]">Casting Fit</span>
            </div>
          </div>

          {/* Bio Description */}
          <div className="text-xs sm:text-sm text-[#D3D1CB] space-y-1">
            <p className="font-semibold text-[#F6F4EF]">{currentActor.headline}</p>
            <p className="text-[#A4A6AD] leading-relaxed">{currentActor.bio}</p>
            
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#D6B36A]">
              <span>📍 {currentActor.location}</span>
              <span>·</span>
              <span>🎭 {currentActor.playingAge}</span>
              <span>·</span>
              <span>📏 {currentActor.height}</span>
            </div>

            {currentActor.representation && (
              <p className="text-xs text-[#A4A6AD] pt-1">
                Rep: <span className="text-[#F6F4EF] font-medium">{currentActor.representation.agencyName}</span> ({currentActor.representation.agentName})
              </p>
            )}
          </div>

        </div>

      </div>

      {/* Instagram Story Highlights Tray */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-6 border-b border-[#1E222B]/60 scrollbar-none">
        {[
          { label: "Showreel '26", img: currentActor.headshots[1] || currentActor.headshots[0] },
          { label: "Pinewood BTS", img: currentActor.headshots[0] },
          { label: "Monologues", img: currentActor.headshots[1] || currentActor.headshots[0] },
          { label: "Combat", img: currentActor.headshots[0] },
          { label: "Press", img: currentActor.headshots[1] || currentActor.headshots[0] }
        ].map((highlight, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className="w-14 h-14 rounded-full p-0.5 border border-[#2E3342] group-hover:border-[#D6B36A] transition-colors">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img src={highlight.img} alt={highlight.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <span className="text-[10px] font-medium text-[#A4A6AD] group-hover:text-[#F6F4EF] truncate max-w-[60px]">
              {highlight.label}
            </span>
          </div>
        ))}
      </div>

      {/* Instagram Profile Navigation Tabs */}
      <div className="flex items-center justify-around border-b border-[#1E222B] mb-6 text-xs font-bold uppercase tracking-wider text-[#A4A6AD]">
        <button
          onClick={() => setActiveTab('grid')}
          className={`py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'grid' ? 'text-[#D6B36A] border-b-2 border-[#D6B36A]' : 'hover:text-[#F6F4EF]'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          <span>Takes Grid</span>
        </button>

        <button
          onClick={() => setActiveTab('reels')}
          className={`py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'reels' ? 'text-[#D6B36A] border-b-2 border-[#D6B36A]' : 'hover:text-[#F6F4EF]'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Showreel 4K</span>
        </button>

        <button
          onClick={() => setActiveTab('credits')}
          className={`py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'credits' ? 'text-[#D6B36A] border-b-2 border-[#D6B36A]' : 'hover:text-[#F6F4EF]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Credits</span>
        </button>

        <button
          onClick={() => setActiveTab('training')}
          className={`py-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'training' ? 'text-[#D6B36A] border-b-2 border-[#D6B36A]' : 'hover:text-[#F6F4EF]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Training</span>
        </button>
      </div>

      {/* 3-Column Square Grid (Instagram Style) */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {actorMoments.map(m => (
            <div
              key={m.id}
              onClick={() => setCurrentView('discover')}
              className="relative aspect-square bg-[#111318] group overflow-hidden cursor-pointer"
            >
              <img
                src={m.thumbnailUrl}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Play className="w-4 h-4 text-white fill-current drop-shadow-md" />
              </div>

              {/* Instagram Hover Overlay with Like & Comment Counts */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-current text-white" />
                  <span>{m.likesCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4 fill-current text-white" />
                  <span>{m.durationSeconds}s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reels / Showreel Tab */}
      {activeTab === 'reels' && (
        <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F6F4EF]">Official Dramatic Showreel</h3>
            <span className="text-xs text-[#4CAF83] font-semibold bg-[#4CAF83]/10 px-2 py-0.5 rounded border border-[#4CAF83]/20">
              Verified Asset
            </span>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <img src={currentActor.headshots[1] || currentActor.headshots[0]} alt="Showreel" className="w-full h-full object-cover opacity-60" />
            <button
              onClick={() => showToast('Playing official showreel...')}
              className="w-14 h-14 rounded-full bg-[#D6B36A] text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            >
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Production Credits Tab */}
      {activeTab === 'credits' && (
        <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B] space-y-3">
          <h3 className="text-base font-bold text-[#F6F4EF] mb-2">Production History</h3>
          <div className="divide-y divide-[#1E222B]">
            <div className="py-3 flex justify-between">
              <div>
                <p className="text-xs font-bold text-[#F6F4EF]">The Hollow Crown: Chronicles</p>
                <p className="text-xs text-[#A4A6AD]">Lady Eleanor (Guest Lead) · BBC Television Drama</p>
              </div>
              <span className="text-xs text-[#D6B36A] font-semibold">2025</span>
            </div>
            <div className="py-3 flex justify-between">
              <div>
                <p className="text-xs font-bold text-[#F6F4EF]">The Seagull</p>
                <p className="text-xs text-[#A4A6AD]">Nina (Lead) · Almeida Theatre London</p>
              </div>
              <span className="text-xs text-[#D6B36A] font-semibold">2024</span>
            </div>
            <div className="py-3 flex justify-between">
              <div>
                <p className="text-xs font-bold text-[#F6F4EF]">A Quiet Midnight</p>
                <p className="text-xs text-[#A4A6AD]">Clara (Supporting) · Film4 Feature</p>
              </div>
              <span className="text-xs text-[#D6B36A] font-semibold">2023</span>
            </div>
          </div>
        </div>
      )}

      {/* Training Tab */}
      {activeTab === 'training' && (
        <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B] space-y-4">
          <h3 className="text-base font-bold text-[#F6F4EF]">Accredited Training</h3>
          <div className="p-4 rounded-xl bg-[#171922] border border-[#262A35]">
            <p className="text-xs font-bold text-[#F6F4EF]">Royal Academy of Dramatic Art (RADA)</p>
            <p className="text-xs text-[#D6B36A] mt-0.5">BA (Hons) in Acting · Class of 2022</p>
          </div>
        </div>
      )}

      {/* Headshot Zoom Modal */}
      {showHeadshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="relative max-w-md w-full bg-[#111318] border border-[#262A35] rounded-xl overflow-hidden p-3">
            <button
              onClick={() => setShowHeadshotModal(null)}
              className="absolute top-4 right-4 text-white z-10"
            >
              ✕
            </button>
            <img src={showHeadshotModal} alt="Enlarged Headshot" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}

    </div>
  );
};
