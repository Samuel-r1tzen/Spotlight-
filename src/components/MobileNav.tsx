import React from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { Clapperboard, Compass, Film, Plus } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    applications, 
    setShowCreateMomentModal, 
    actors, 
    selectedActorId,
    shouldHideBottomBar,
    setIsSearching
  } = useSpotlight();

  const currentActor = actors.find(a => a.id === selectedActorId) || actors[0];
  const activeAuditionsCount = applications.filter(a => a.status === 'Audition invited' || a.status === 'Shortlisted').length;

  return (
    <nav 
      aria-label="Bottom navigation" 
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out transform ${
        shouldHideBottomBar 
          ? 'translate-y-full opacity-0 pointer-events-none' 
          : 'translate-y-0 opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background with Instagram / X ultra-black obsidian glass styling */}
      <div className="w-full bg-[#050608]/96 sm:bg-[#070A12]/92 backdrop-blur-2xl border-t border-[#161F33] sm:border-t-0 sm:pb-3 sm:pt-1">
        <div className="max-w-lg mx-auto sm:rounded-2xl sm:border sm:border-[#1E2942] sm:bg-[#080D1A]/95 sm:shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(214,179,106,0.1)] px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] flex items-center justify-between">
          
          {/* 1. Feed (Instagram / X Home) */}
          <button
            onClick={() => {
              setCurrentView('discover');
              setIsSearching(false);
            }}
            className={`flex-1 flex flex-col items-center py-1 text-[10px] tracking-wider uppercase font-medium transition-all cursor-pointer group active:scale-90 ${
              currentView === 'discover' ? 'text-[#D6B36A] font-semibold' : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
            title="Discover Performance Feed"
          >
            <Film className={`w-5 h-5 mb-0.5 transition-transform group-hover:scale-110 ${currentView === 'discover' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[9.5px]">Feed</span>
            {currentView === 'discover' && (
              <span className="w-1 h-1 rounded-full bg-[#D6B36A] mt-0.5 shadow-[0_0_6px_#D6B36A]" />
            )}
          </button>

          {/* 2. Casting Calls (X Explore / Instagram Search) */}
          <button
            onClick={() => setCurrentView('casting')}
            className={`flex-1 flex flex-col items-center py-1 text-[10px] tracking-wider uppercase font-medium transition-all cursor-pointer group active:scale-90 ${
              currentView === 'casting' ? 'text-[#D6B36A] font-semibold' : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
            title="Casting Opportunities"
          >
            <Compass className={`w-5 h-5 mb-0.5 transition-transform group-hover:scale-110 ${currentView === 'casting' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[9.5px]">Casting</span>
            {currentView === 'casting' && (
              <span className="w-1 h-1 rounded-full bg-[#D6B36A] mt-0.5 shadow-[0_0_6px_#D6B36A]" />
            )}
          </button>

          {/* 3. TikTok/IG Center Create Button (Cinematic Gold / Facebook Blue & Instagram Sunset Rose wings) */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowCreateMomentModal(true)}
              className="flex flex-col items-center group focus:outline-none cursor-pointer active:scale-90 transition-transform"
              aria-label="Record New Performance Take"
              title="Record New Performance Take"
            >
              <div className="relative flex items-center justify-center my-0.5">
                {/* Lateral offset wings: Facebook Blue / Gold on left, Instagram Rose on right */}
                <div className="w-11 h-7.5 rounded-lg bg-gradient-to-r from-[#1877F2] to-[#D6B36A] absolute -left-[2px] top-0 opacity-90" />
                <div className="w-11 h-7.5 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] absolute -right-[2px] top-0 opacity-90" />
                {/* Crisp White/Cream center pill */}
                <div className="relative w-10 h-7.5 rounded-md bg-[#F6F4EF] hover:bg-white text-black flex items-center justify-center shadow-md transition-all">
                  <Plus className="w-4 h-4 stroke-[3] text-black" />
                </div>
              </div>
              <span className="text-[9px] tracking-wider uppercase font-bold text-[#D6B36A] group-hover:text-[#FFF6E0]">
                Take
              </span>
            </button>
          </div>

          {/* 4. Auditions Pipeline (TikTok Inbox / X Notifications style with Badge) */}
          <button
            onClick={() => setCurrentView('auditions')}
            className={`flex-1 relative flex flex-col items-center py-1 text-[10px] tracking-wider uppercase font-medium transition-all cursor-pointer group active:scale-90 ${
              currentView === 'auditions' ? 'text-[#D6B36A] font-semibold' : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
            title="Auditions Pipeline"
          >
            <div className="relative">
              <Clapperboard className={`w-5 h-5 mb-0.5 transition-transform group-hover:scale-110 ${currentView === 'auditions' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {activeAuditionsCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 min-w-[15px] bg-[#E11D48] text-white text-[8.5px] font-extrabold rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(225,29,72,0.6)]">
                  {activeAuditionsCount}
                </span>
              )}
            </div>
            <span className="text-[9.5px]">Auditions</span>
            {currentView === 'auditions' && (
              <span className="w-1 h-1 rounded-full bg-[#D6B36A] mt-0.5 shadow-[0_0_6px_#D6B36A]" />
            )}
          </button>

          {/* 5. Talent Passport (Instagram Profile Avatar with Gradient Active Ring) */}
          <button
            onClick={() => setCurrentView('passport')}
            className={`flex-1 flex flex-col items-center py-1 text-[10px] tracking-wider uppercase font-medium transition-all cursor-pointer group active:scale-90 ${
              currentView === 'passport' ? 'text-[#D6B36A] font-semibold' : 'text-[#8E94A5] hover:text-[#F6F4EF]'
            }`}
            title="Talent Passport"
          >
            <div className={`w-5.5 h-5.5 rounded-full overflow-hidden mb-0.5 transition-all ${
              currentView === 'passport' 
                ? 'p-[1.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] ring-2 ring-[#D6B36A] ring-offset-2 ring-offset-[#050608] scale-110 shadow-[0_0_12px_rgba(221,42,123,0.4)]' 
                : 'border border-[#2A3752] group-hover:border-[#D6B36A]/70 opacity-80 group-hover:opacity-100'
            }`}>
              {currentActor?.headshots?.[0] ? (
                <img 
                  src={currentActor.headshots[0]} 
                  alt={currentActor.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-[8px] font-bold text-[#D6B36A] flex items-center justify-center h-full">
                  {currentActor?.name ? currentActor.name[0] : 'P'}
                </span>
              )}
            </div>
            <span className="text-[9.5px]">Passport</span>
            {currentView === 'passport' && (
              <span className="w-1 h-1 rounded-full bg-[#D6B36A] mt-0.5 shadow-[0_0_6px_#D6B36A]" />
            )}
          </button>

        </div>
      </div>
    </nav>
  );
};
