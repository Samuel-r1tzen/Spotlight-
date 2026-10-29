import React from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { calculateProfileCompleteness } from '../utils/spotlightLogic';
import { 
  Award, 
  CheckCircle2, 
  Circle, 
  Film, 
  Clapperboard, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const CareerStageView: React.FC = () => {
  const { 
    actors, 
    applications, 
    moments, 
    castingCalls, 
    setCurrentView, 
    setSelectedActorId, 
    setShowSubscriptionModal 
  } = useSpotlight();

  const currentActor = actors.find(a => a.id === 'actor-maya') || actors[0];
  const completeness = calculateProfileCompleteness(currentActor);
  const activeApps = applications.filter(a => !['Accepted', 'Not selected', 'Withdrawn'].includes(a.status));
  const invitedApps = applications.filter(a => a.status === 'Audition invited');
  const savedMoments = moments.filter(m => m.isSaved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B36A] uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Professional Actor Development</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display">
          The Career Stage
        </h1>
        <p className="text-sm text-[#A4A6AD] mt-2">
          Track your portfolio readiness, audition submissions, and craft development metrics. Structured to help you prepare, not rank you against arbitrary scores.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Completeness Card */}
        <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#A4A6AD] uppercase tracking-wider">
              Talent Passport Readiness
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-[#D6B36A] font-display tabular-nums">
                {completeness.percentage}%
              </span>
              <span className="text-xs text-[#A4A6AD]">
                ({completeness.completedCount}/{completeness.totalCount} items completed)
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#1A1D24] rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-gradient-to-r from-[#D6B36A] to-[#997734] transition-all duration-500"
                style={{ width: `${completeness.percentage}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedActorId(currentActor.id);
              setCurrentView('passport');
            }}
            className="mt-4 text-xs font-semibold text-[#F6F4EF] hover:text-[#D6B36A] flex items-center gap-1 transition-colors"
          >
            <span>Review Talent Passport</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Active Audition Pipeline */}
        <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#A4A6AD] uppercase tracking-wider">
              Active Submissions Pipeline
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-[#F6F4EF] font-display tabular-nums">
                {activeApps.length}
              </span>
              <span className="text-xs text-[#4CAF83] font-semibold">
                {invitedApps.length > 0 ? `${invitedApps.length} live invitation` : 'In review'}
              </span>
            </div>
            <p className="text-xs text-[#A4A6AD] mt-2">
              Audition tapes submitted to BBC Drama, Synchrony Films, and West End productions.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('auditions')}
            className="mt-4 text-xs font-semibold text-[#F6F4EF] hover:text-[#D6B36A] flex items-center gap-1 transition-colors"
          >
            <span>Open Audition Room</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Spotlight Moments in Portfolio */}
        <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#A4A6AD] uppercase tracking-wider">
              Showcased Moments
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-[#F6F4EF] font-display tabular-nums">
                {currentActor.momentsCount}
              </span>
              <span className="text-xs text-[#D6B36A]">Active in Portfolio</span>
            </div>
            <p className="text-xs text-[#A4A6AD] mt-2">
              Demonstrating dramatic monologues, classical verse, and micro-reaction subtext.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('scenelab')}
            className="mt-4 text-xs font-semibold text-[#F6F4EF] hover:text-[#D6B36A] flex items-center gap-1 transition-colors"
          >
            <span>Record New Technique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Two-Column Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Actionable Readiness Checklist */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B]">
            <h3 className="text-base font-bold text-[#F6F4EF] mb-4">
              Portfolio Preparedness Checklist
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'Professional Headshots (2+ angles)', desc: 'High-resolution commercial and theatrical headshots on file', done: true },
                { name: 'Official Showreel Link', desc: 'Current 4K dramatic reel linked directly to passport', done: true },
                { name: 'Verified Drama School Credentials', desc: 'RADA Honours accreditation validated by Spotlight', done: true },
                { name: 'Stage & Screen Combat Certification', desc: 'BASSC Rapier & Dagger Level 2 documented', done: true },
                { name: 'Representation Contact Info', desc: 'Tavistock Wood Artists agent representation listed', done: true },
                { name: 'Comedy & Timing Spotlight Moment', desc: 'Upload a comedy take to maximize commercial Casting Fit', done: false }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#17191F] border border-[#232731] flex items-start gap-3">
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF83] mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#D6B36A] mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${item.done ? 'text-[#F6F4EF]' : 'text-[#D6B36A]'}`}>
                      {item.name}
                    </p>
                    <p className="text-[11px] text-[#A4A6AD] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Audition Schedule */}
          {invitedApps.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#F6F4EF]">Upcoming Audition Sessions</h3>
                <span className="text-xs text-[#D6B36A] font-semibold">1 Live Session</span>
              </div>

              {invitedApps.map(app => (
                <div key={app.id} className="p-4 rounded-xl bg-[#17191F] border border-[#D6B36A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#D6B36A]">In-Person Director Call</span>
                    <h4 className="text-sm font-bold text-[#F6F4EF]">{app.projectTitle} · {app.roleTitle}</h4>
                    <p className="text-xs text-[#A4A6AD]">
                      <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#D6B36A]" />
                      {app.auditionDateTime} · {app.auditionLocation}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('auditions')}
                    className="px-4 py-2 text-xs font-semibold bg-[#D6B36A] hover:bg-[#e4c47f] text-black rounded transition-colors whitespace-nowrap"
                  >
                    View Call Sheet
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Saved Collections & Career Tools */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Saved Performance Takes */}
          <div className="p-6 rounded-2xl bg-[#111318] border border-[#1E222B]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#F6F4EF]">Saved Performance Takes</h3>
              <span className="text-xs text-[#A4A6AD] tabular-nums">{savedMoments.length} saved</span>
            </div>

            {savedMoments.length === 0 ? (
              <p className="text-xs text-[#A4A6AD]">No saved performance moments yet.</p>
            ) : (
              <div className="space-y-3">
                {savedMoments.map(m => (
                  <div 
                    key={m.id}
                    onClick={() => setCurrentView('discover')}
                    className="p-3 rounded-lg bg-[#17191F] border border-[#232731] hover:border-[#D6B36A]/40 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img src={m.thumbnailUrl} alt={m.title} className="w-10 h-12 object-cover rounded" />
                      <div>
                        <p className="text-xs font-bold text-[#F6F4EF]">{m.title}</p>
                        <p className="text-[11px] text-[#A4A6AD]">{m.actorName} · {m.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A4A6AD]" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Membership Tier Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#171922] to-[#111318] border border-[#D6B36A]/30 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D6B36A]" />
              <h4 className="text-sm font-bold text-[#F6F4EF]">Spotlight Plus Subscription</h4>
            </div>
            <p className="text-xs text-[#A4A6AD] leading-relaxed">
              Unlock unlimited Moment uploads, custom showreel hosting, and real-time Casting Fit alerts.
            </p>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="w-full py-2.5 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md transition-colors shadow-md"
            >
              Explore Membership Benefits
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
