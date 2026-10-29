import React from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import {
  Film,
  Compass,
  Clapperboard,
  Sparkles,
  Plus,
  Heart,
  Send,
  Search,
} from 'lucide-react';
import { LEAD_HEADSHOT_URL } from '../data/mockData';

const SpotlightHeaderLogo: React.FC = () => {
  const gradientId = 'spotlightHeaderGold';

  return (
    <div className="flex items-center gap-2.5 shrink-0">
      {/* Cinematic aperture emblem matching the loading screen */}
      <div className="w-9 h-9 shrink-0">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FFF6D8" />
              <stop offset="45%" stopColor="#FFD97A" />
              <stop offset="85%" stopColor="#E8A33F" />
              <stop offset="100%" stopColor="#B8462A" />
            </linearGradient>
          </defs>

          {/* Fine outer rings */}
          <circle
            cx="100"
            cy="100"
            r="94"
            stroke="url(#spotlightHeaderGold)"
            strokeWidth="3"
            opacity="0.85"
          />
          <circle
            cx="100"
            cy="100"
            r="86"
            stroke="url(#spotlightHeaderGold)"
            strokeWidth="2"
            opacity="0.5"
          />

          {/* Six cinematic aperture blades */}
          {Array.from({ length: 6 }, (_, index) => (
            <path
              key={index}
              d="M100 35 A65 65 0 0 1 153.25 62.72 L132.77 77.06 A40 40 0 0 0 100 60 Z"
              transform={`rotate(${index * 60} 100 100)`}
              fill="url(#spotlightHeaderGold)"
              opacity="0.95"
            />
          ))}

          {/* Inner ring */}
          <circle
            cx="100"
            cy="100"
            r="31"
            stroke="url(#spotlightHeaderGold)"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Signature Spotlight star */}
          <path
            d="M100 62 L107.55 85.60 L132.34 86.15 L112.24 101.15 L119.22 125.10 L100 111.2 L80.78 125.10 L87.76 101.15 L67.66 86.15 L92.45 85.60 Z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      </div>

      {/* Wordmark */}
      <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.16em] text-[#F6F4EF] group-hover:text-[#D6B36A] transition-colors">
        SPOTLIGHT
      </span>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    applications,
    setShowCreateMomentModal,
    setIsDMDrawerOpen,
    setSelectedActorId,
    notifications,
    setIsSearching,
    setIsActivityDrawerOpen,
  } = useSpotlight();

  const activeAuditionsCount = applications.filter(
    (a) => a.status === 'Audition invited' || a.status === 'Shortlisted'
  ).length;

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleOpenSearch = () => {
    setCurrentView('discover');
    setIsSearching(true);

    setTimeout(() => {
      const input =
        document.getElementById('search-input-field') ||
        document.querySelector('input[type="text"]');

      if (input instanceof HTMLElement) {
        input.focus();
      }
    }, 100);
  };

  const openDiscover = () => {
    setCurrentView('discover');
    setIsSearching(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060A14]/96 backdrop-blur-2xl border-b border-[#142036] shadow-[0_4px_24px_rgba(2,4,10,0.7)]">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-6">

        {/* Left: Cinematic Spotlight Brand */}
        <button
          onClick={openDiscover}
          className="flex items-center text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B36A] rounded-md group"
          aria-label="Spotlight Discover"
        >
          <SpotlightHeaderLogo />
        </button>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-semibold text-[#8E94A5]">
          <button
            onClick={openDiscover}
            className={`transition-all py-1.5 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'discover'
                ? 'text-[#F6F4EF] border-b-2 border-[#D6B36A]'
                : 'hover:text-[#F6F4EF]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Feed</span>
          </button>

          <button
            onClick={() => setCurrentView('casting')}
            className={`transition-all py-1.5 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'casting'
                ? 'text-[#F6F4EF] border-b-2 border-[#D6B36A]'
                : 'hover:text-[#F6F4EF]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Casting</span>
          </button>

          <button
            onClick={() => setCurrentView('auditions')}
            className={`transition-all py-1.5 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'auditions'
                ? 'text-[#F6F4EF] border-b-2 border-[#D6B36A]'
                : 'hover:text-[#F6F4EF]'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Auditions</span>

            {activeAuditionsCount > 0 && (
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-[#450A0A] border border-[#7F1D1D] text-[#FFF6E0] rounded-full shadow">
                {activeAuditionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('scenelab')}
            className={`transition-all py-1.5 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'scenelab'
                ? 'text-[#F6F4EF] border-b-2 border-[#D6B36A]'
                : 'hover:text-[#F6F4EF]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scene Lab</span>
          </button>
        </nav>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

          {/* Search */}
          <button
            onClick={handleOpenSearch}
            className="p-2 text-[#8E94A5] hover:text-[#D6B36A] hover:bg-white/5 rounded-full transition-all cursor-pointer"
            aria-label="Search Feed and Topics"
            title="Search clips, actors, topics"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Activity and Notifications */}
          <button
            onClick={() => setIsActivityDrawerOpen(true)}
            className="relative p-2 text-[#8E94A5] hover:text-[#E1306C] hover:bg-white/5 rounded-full transition-all cursor-pointer"
            aria-label="Activity & Career Stage"
            title="Activity & Notifications"
          >
            <Heart className="w-4 h-4" />

            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E1306C] ring-2 ring-[#060A14] rounded-full shadow-[0_0_8px_#E1306C]" />
            )}
          </button>

          {/* Direct Messages */}
          <button
            onClick={() => setIsDMDrawerOpen(true)}
            className="relative p-2 text-[#8E94A5] hover:text-[#1877F2] hover:bg-white/5 rounded-full transition-all cursor-pointer"
            aria-label="Direct Messages"
            title="Direct Messages"
          >
            <Send className="w-4 h-4" />

            <span className="absolute top-1 right-1 px-1 py-0.2 min-w-[14px] bg-[#1877F2] border border-[#3B82F6] text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow-md shadow-[#1877F2]/40">
              1
            </span>
          </button>

          {/* Post Take */}
          <button
            onClick={() => setShowCreateMomentModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-black bg-gradient-to-r from-[#D6B36A] to-[#F0DCAE] hover:brightness-105 rounded-xl transition-all active:scale-95 shadow-md shadow-[#D6B36A]/20 cursor-pointer ml-1"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Post Take</span>
          </button>

          {/* Actor Profile Avatar */}
          <button
            onClick={() => {
              setSelectedActorId('actor-maya');
              setCurrentView('passport');
            }}
            className={`w-7 h-7 rounded-full overflow-hidden transition-all cursor-pointer ml-1 ${
              currentView === 'passport'
                ? 'p-[1.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] ring-2 ring-[#D6B36A] shadow-[0_0_12px_rgba(221,42,123,0.4)]'
                : 'hover:ring-1 hover:ring-[#D6B36A]/60'
            }`}
            title="My Talent Passport"
          >
            <img
              src={LEAD_HEADSHOT_URL}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};