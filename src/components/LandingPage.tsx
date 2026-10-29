
import React from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import {
  Play,
  Sparkles,
  UserCheck,
  Film,
  Clapperboard,
  ArrowRight,
  Check,
  ChevronRight,
} from 'lucide-react';
import {
  HERO_IMAGE_URL,
} from '../data/mockData';

const SpotlightBrandLogo: React.FC = () => (
  <svg
    viewBox="0 0 200 200"
    aria-hidden="true"
    className="w-7 h-7 shrink-0"
  >
    <defs>
      <linearGradient
        id="spotlightLandingStarGrad"
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

    <circle
      cx="100"
      cy="100"
      r="94"
      fill="none"
      stroke="#E8C473"
      strokeWidth="2"
      opacity="0.7"
    />

    <circle
      cx="100"
      cy="100"
      r="88"
      fill="none"
      stroke="#E8C473"
      strokeWidth="1"
      opacity="0.35"
    />

    <circle
      cx="100"
      cy="100"
      r="82"
      fill="none"
      stroke="#E8C473"
      strokeWidth="1.5"
      opacity="0.45"
    />

    <g>
      {Array.from({ length: 6 }, (_, index) => (
        <path
          key={index}
          d="M100 35 A65 65 0 0 1 153.25 62.72 L132.77 77.06 A40 40 0 0 0 100 60 Z"
          transform={`rotate(${index * 60} 100 100)`}
          fill="#D6B36A"
          fillOpacity="0.35"
          stroke="#E8C473"
          strokeWidth="1"
        />
      ))}
    </g>

    <path
      d="M100 62 L107.55 85.60 L132.34 86.15 L112.24 101.15 L119.22 125.10 L100 111.2 L80.78 125.10 L87.76 101.15 L67.66 86.15 L92.45 85.60 Z"
      fill="url(#spotlightLandingStarGrad)"
    />
  </svg>
);

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    setShowSubscriptionModal,
    setShowCreateMomentModal,
  } = useSpotlight();

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F6F4EF] selection:bg-[#D6B36A]/30">

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-[#1A1D24]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D6B36A]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B36A] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#D6B36A]" />
                <span>The Premier Performance Discovery Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F6F4EF] font-display text-balance leading-[1.12]">
                Your Talent. Your Moment.{' '}
                <span className="text-[#D6B36A]">Your Spotlight.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A4A6AD] max-w-2xl leading-relaxed">
                Show the world what you can do. Build your acting portfolio,
                discover new talent, and connect with verified opportunities
                in film, television, theatre, and beyond.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('discover')}
                  className="px-6 py-3.5 bg-[#D6B36A] hover:bg-[#e4c47f] text-black font-semibold rounded-md shadow-lg shadow-[#D6B36A]/20 transition-all flex items-center gap-2 cursor-pointer text-sm"
                >
                  <span>Discover Talent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowCreateMomentModal(true)}
                  className="px-6 py-3.5 bg-[#17191F] hover:bg-[#20232B] text-[#F6F4EF] font-medium border border-[#2A2E38] rounded-md transition-all flex items-center gap-2 cursor-pointer text-sm"
                >
                  <Clapperboard className="w-4 h-4 text-[#D6B36A]" />
                  <span>Join Spotlight</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#A4A6AD] pt-4">
                <span>Verified Drama School Alumni</span>
                <span aria-hidden="true">·</span>
                <span>Direct Casting Submissions</span>
                <span aria-hidden="true">·</span>
                <span>Equitable Discovery</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-[#262A35] shadow-2xl bg-[#111318] group">
                <img
                  src={HERO_IMAGE_URL}
                  alt="Actor performing under dramatic cinema set lighting"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#111318]/90 backdrop-blur-md border border-[#2A2E38]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D6B36A]" />
                      <span className="text-xs font-semibold text-[#F6F4EF]">
                        Spotlight Moment #1402
                      </span>
                    </div>
                    <span className="text-xs text-[#A4A6AD]">60s Monologue</span>
                  </div>

                  <p className="text-sm font-medium text-[#F6F4EF] mb-2">
                    "The Confession" · Maya Lin (RADA Honours)
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#A4A6AD]">
                    <div className="flex items-center gap-2">
                      <span>Subtext</span>
                      <span>·</span>
                      <span>British RP</span>
                    </div>
                    <button
                      onClick={() => setCurrentView('discover')}
                      className="text-[#D6B36A] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Take</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proof & Metrics Band */}
      <section className="py-12 border-b border-[#1A1D24] bg-[#0E1015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display tabular-nums">4,800+</p>
              <p className="text-xs text-[#A4A6AD] uppercase tracking-wider mt-1">Vetted Performance Moments</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#D6B36A] font-display tabular-nums">320+</p>
              <p className="text-xs text-[#A4A6AD] uppercase tracking-wider mt-1">Active Casting Briefs</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display tabular-nums">94%</p>
              <p className="text-xs text-[#A4A6AD] uppercase tracking-wider mt-1">Casting Fit Precision</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#D6B36A] font-display tabular-nums">1,250+</p>
              <p className="text-xs text-[#A4A6AD] uppercase tracking-wider mt-1">Verified Industry Pros</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Pillars */}
      <section className="py-24 border-b border-[#1A1D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-semibold text-[#D6B36A] tracking-wider uppercase mb-3">
              An Original Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display text-balance">
              Not another social network. A professional performance ecosystem.
            </h3>
            <p className="text-[#A4A6AD] mt-4 text-base sm:text-lg">
              Spotlight blends immersive video discovery with professional
              actor credentials, structured casting briefs, and craft
              development tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#17191F] border border-[#2A2E38] flex items-center justify-center text-[#D6B36A] mb-6">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <h4 className="text-xl font-bold text-[#F6F4EF] font-display mb-2">01. Spotlight Moments</h4>
                <p className="text-[#A4A6AD] text-sm leading-relaxed mb-6">
                  Performances crafted to prove specific techniques: 60-second
                  dramatic monologues, three-emotion shifts, comedic timing,
                  or non-dialogue subtext. Direct attribution with verified
                  skill tagging.
                </p>
              </div>
              <button onClick={() => setCurrentView('discover')} className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B36A] hover:underline">
                <span>Explore Moments Feed</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#17191F] border border-[#2A2E38] flex items-center justify-center text-[#D6B36A] mb-6">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-[#F6F4EF] font-display mb-2">02. The Talent Passport</h4>
                <p className="text-[#A4A6AD] text-sm leading-relaxed mb-6">
                  A professional actor dossier distinguishing verified
                  credentials (RADA, Equity, BASSC) from self-reported claims.
                  Integrates high-res headshots, showreels, voice recordings,
                  and agent representation.
                </p>
              </div>
              <button onClick={() => setCurrentView('passport')} className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B36A] hover:underline">
                <span>View Maya Lin’s Passport</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#17191F] border border-[#2A2E38] flex items-center justify-center text-[#D6B36A] mb-6">
                  <Film className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-[#F6F4EF] font-display mb-2">03. Casting Fit & Audition Room</h4>
                <p className="text-[#A4A6AD] text-sm leading-relaxed mb-6">
                  Transparent criteria matching. Actors see precisely why an
                  opportunity suits their dialects, physical training, and
                  playing age. Submit specific performance takes directly
                  with full pipeline status tracking.
                </p>
              </div>
              <button onClick={() => setCurrentView('casting')} className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B36A] hover:underline">
                <span>Browse Casting Calls</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#17191F] border border-[#2A2E38] flex items-center justify-center text-[#D6B36A] mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-[#F6F4EF] font-display mb-2">04. Scene Lab</h4>
                <p className="text-[#A4A6AD] text-sm leading-relaxed mb-6">
                  Weekly acting challenges and structured prompt exercises.
                  Test your skills on challenging scenes, review fellow
                  performers' interpretations, and submit your audition
                  recordings to the community.
                </p>
              </div>
              <button onClick={() => setCurrentView('scenelab')} className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B36A] hover:underline">
                <span>Enter Scene Lab</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Two Connected Audiences Section */}
      <section className="py-24 border-b border-[#1A1D24] bg-[#0A0C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#D6B36A] tracking-wider uppercase mb-3">
              Dual Ecosystem
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display">
              Designed for performers and decision-makers
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B]">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 text-xs font-semibold text-[#D6B36A] bg-[#D6B36A]/10 border border-[#D6B36A]/20 rounded">
                  FOR TALENT
                </span>
                <h4 className="text-xl font-bold text-[#F6F4EF]">Actors & Creators</h4>
              </div>
              <p className="text-sm text-[#A4A6AD] mb-6">
                Break out of the algorithm lottery. Let your actual acting
                craft speak for itself through focused performance tapes and
                verified credentials.
              </p>
              <ul className="space-y-3 text-sm text-[#F6F4EF]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D6B36A]" /><span>Permanent professional Talent Passport with verified training credits</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D6B36A]" /><span>Scene Lab weekly monologue and timing challenges</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D6B36A]" /><span>Direct casting applications with self-tape reel submissions</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D6B36A]" /><span>Real-time Audition Room status tracking (No ghosting)</span></li>
              </ul>
            </div>

            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B]">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 text-xs font-semibold text-[#4CAF83] bg-[#4CAF83]/10 border border-[#4CAF83]/20 rounded">
                  FOR INDUSTRY
                </span>
                <h4 className="text-xl font-bold text-[#F6F4EF]">Casting Directors & Producers</h4>
              </div>
              <p className="text-sm text-[#A4A6AD] mb-6">
                Cut through thousands of static headshots. Search and filter
                talent by dialect, combat training, classical verse, and
                proven performance video.
              </p>
              <ul className="space-y-3 text-sm text-[#F6F4EF]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4CAF83]" /><span>Skill-based casting brief matching (Casting Fit logic)</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4CAF83]" /><span>Review 60-second video tapes directly alongside verified agency representation</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4CAF83]" /><span>Pipeline management: Shortlist, Invite to Audition, or Dispatch Offers</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4CAF83]" /><span>No unverified claims presented as official credentials</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Preview */}
      <section className="py-24 border-b border-[#1A1D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[#D6B36A] tracking-wider uppercase mb-3">
              Transparent Membership
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display">
              Equitable access for every stage of your career
            </h3>
            <p className="text-[#A4A6AD] mt-3 text-sm">
              No pay-to-win ranking. Paid tiers provide enhanced workflow
              capacity, not guaranteed casting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B] flex flex-col justify-between">
              <div>
                <p className="text-lg font-bold text-[#F6F4EF]">Free Talent</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-[#F6F4EF] font-display">$0</span>
                  <span className="text-xs text-[#A4A6AD]"> / forever</span>
                </div>
                <p className="text-xs text-[#A4A6AD] mb-6">
                  For emerging actors building their initial presence and
                  discovering opportunities.
                </p>
                <ul className="space-y-3 text-xs text-[#F6F4EF] mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Create complete Talent Passport</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Upload up to 3 Spotlight Moments</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Browse & apply to eligible casting calls</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Participate in Scene Lab challenges</span></li>
                </ul>
              </div>
              <button onClick={() => setCurrentView('discover')} className="w-full py-2.5 text-xs font-semibold text-[#F6F4EF] bg-[#17191F] hover:bg-[#20232B] border border-[#2A2E38] rounded-md transition-colors">
                Current Default
              </button>
            </div>

            <div className="p-8 rounded-xl bg-[#17191F] border-2 border-[#D6B36A] relative flex flex-col justify-between shadow-xl shadow-[#D6B36A]/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#D6B36A] text-black text-[11px] font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <p className="text-lg font-bold text-[#F6F4EF]">Spotlight Plus</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-[#D6B36A] font-display">$19</span>
                  <span className="text-xs text-[#A4A6AD]"> / month</span>
                </div>
                <p className="text-xs text-[#A4A6AD] mb-6">
                  For dedicated actors managing active audition pipelines and
                  custom portfolios.
                </p>
                <ul className="space-y-3 text-xs text-[#F6F4EF] mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Unlimited Spotlight Moments upload capacity</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Custom showreel & voice-reel hosting</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Advanced Casting Fit notifications</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D6B36A]" /><span>Application tracker & private audition notes</span></li>
                </ul>
              </div>
              <button onClick={() => setShowSubscriptionModal(true)} className="w-full py-2.5 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md transition-colors shadow-md shadow-[#D6B36A]/20">
                Explore Spotlight Plus
              </button>
            </div>

            <div className="p-8 rounded-xl bg-[#111318] border border-[#1E222B] flex flex-col justify-between">
              <div>
                <p className="text-lg font-bold text-[#F6F4EF]">Industry Professional</p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-[#F6F4EF] font-display">$49</span>
                  <span className="text-xs text-[#A4A6AD]"> / month</span>
                </div>
                <p className="text-xs text-[#A4A6AD] mb-6">
                  For casting directors, production houses, agencies, and
                  directors.
                </p>
                <ul className="space-y-3 text-xs text-[#F6F4EF] mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#4CAF83]" /><span>Publish & manage unlimited casting briefs</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#4CAF83]" /><span>Casting room candidate review board</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#4CAF83]" /><span>Shortlist management & collaborative notes</span></li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#4CAF83]" /><span>Direct contact with verified agency reps</span></li>
                </ul>
              </div>
              <button onClick={() => setShowSubscriptionModal(true)} className="w-full py-2.5 text-xs font-semibold text-[#F6F4EF] bg-[#17191F] hover:bg-[#20232B] border border-[#2A2E38] rounded-md transition-colors">
                Industry Verification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#050608] border-t border-[#14171E] text-xs text-[#A4A6AD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <SpotlightBrandLogo />
              <span className="font-cinzel font-bold text-[#F6F4EF] tracking-widest text-sm">
                SPOTLIGHT
              </span>
            </span>
            <span>·</span>
            <span>Your Talent. Your Moment. Your Spotlight.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('discover')} className="hover:text-[#F6F4EF] transition-colors">
              Discover
            </button>
            <button onClick={() => setCurrentView('casting')} className="hover:text-[#F6F4EF] transition-colors">
              Casting Calls
            </button>
            <button onClick={() => setCurrentView('scenelab')} className="hover:text-[#F6F4EF] transition-colors">
              Scene Lab
            </button>
            <button onClick={() => setShowSubscriptionModal(true)} className="hover:text-[#F6F4EF] transition-colors">
              Pricing
            </button>
          </div>

          <p className="text-[11px]">
            © 2026 SPOTLIGHT Entertainment Network. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};
