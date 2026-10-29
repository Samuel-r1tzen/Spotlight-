import React, { useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { AuditionApplication, AuditionStatus } from '../types';
import { canTransitionAuditionStatus } from '../utils/spotlightLogic';
import { 
  Clapperboard, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Play, 
  ChevronRight, 
  UserCheck, 
  Film,
  Building,
  ShieldAlert
} from 'lucide-react';

const STATUS_BADGE_STYLES: Record<AuditionStatus, { bg: string; text: string; border: string }> = {
  'Draft': { bg: 'bg-zinc-800', text: 'text-zinc-300', border: 'border-zinc-700' },
  'Submitted': { bg: 'bg-blue-900/30', text: 'text-blue-400', border: 'border-blue-800/40' },
  'In review': { bg: 'bg-amber-900/30', text: 'text-amber-400', border: 'border-amber-800/40' },
  'Shortlisted': { bg: 'bg-[#D6B36A]/20', text: 'text-[#D6B36A]', border: 'border-[#D6B36A]/40' },
  'Audition invited': { bg: 'bg-purple-900/30', text: 'text-purple-300', border: 'border-purple-700/40' },
  'Decision pending': { bg: 'bg-cyan-900/30', text: 'text-cyan-300', border: 'border-cyan-800/40' },
  'Accepted': { bg: 'bg-emerald-900/30', text: 'text-emerald-400', border: 'border-emerald-700/40' },
  'Not selected': { bg: 'bg-rose-900/20', text: 'text-rose-400', border: 'border-rose-900/30' },
  'Withdrawn': { bg: 'bg-zinc-900', text: 'text-zinc-500', border: 'border-zinc-800' }
};

export const AuditionRoomView: React.FC = () => {
  const { 
    applications, 
    userRole, 
    setUserRole, 
    updateApplicationStatus, 
    setSelectedActorId, 
    setCurrentView,
    showToast
  } = useSpotlight();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<AuditionApplication | null>(applications[0] || null);

  const filteredApps = applications.filter(app => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Active') {
      return !['Accepted', 'Not selected', 'Withdrawn'].includes(app.status);
    }
    return app.status === filterStatus;
  });

  const handleStatusChange = (appId: string, nextStatus: AuditionStatus) => {
    if (!canTransitionAuditionStatus(selectedApp?.status || 'Submitted', nextStatus, userRole)) {
      showToast(`Cannot change status from ${selectedApp?.status} to ${nextStatus} in current role.`);
      return;
    }
    updateApplicationStatus(appId, nextStatus);
    if (selectedApp?.id === appId) {
      setSelectedApp(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
      
      {/* Header with Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#1E222B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B36A] uppercase tracking-wider mb-1">
            <Clapperboard className="w-4 h-4" />
            <span>The Audition Room</span>
          </div>
          <h1 className="text-3xl font-bold text-[#F6F4EF] font-display">
            Role Submissions & Pipeline
          </h1>
          <p className="text-xs text-[#A4A6AD] mt-1">
            Track audition tapes, scheduled call times, and status decisions transparently.
          </p>
        </div>

        {/* Perspective Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-[#111318] border border-[#232731] rounded-lg">
          <span className="text-xs text-[#A4A6AD] px-2">Perspective:</span>
          <button
            onClick={() => setUserRole('talent')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              userRole === 'talent'
                ? 'bg-[#1F232D] text-[#D6B36A] border border-[#D6B36A]/30'
                : 'text-[#A4A6AD] hover:text-[#F6F4EF]'
            }`}
          >
            Actor View
          </button>
          <button
            onClick={() => setUserRole('casting_director')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              userRole === 'casting_director'
                ? 'bg-[#1F232D] text-[#4CAF83] border border-[#4CAF83]/30'
                : 'text-[#A4A6AD] hover:text-[#F6F4EF]'
            }`}
          >
            Casting Director Review
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {['All', 'Active', 'Audition invited', 'Shortlisted', 'In review', 'Accepted'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              filterStatus === status 
                ? 'bg-[#D6B36A] text-black font-semibold' 
                : 'bg-[#14171E] text-[#A4A6AD] hover:text-[#F6F4EF] border border-[#232731]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Applications List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredApps.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#111318] border border-[#1E222B] text-[#A4A6AD] text-xs">
              No applications match the selected filter.
            </div>
          ) : (
            filteredApps.map(app => {
              const badge = STATUS_BADGE_STYLES[app.status] || STATUS_BADGE_STYLES['Submitted'];
              const isSelected = selectedApp?.id === app.id;

              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#171922] border-[#D6B36A]'
                      : 'bg-[#111318] border-[#1E222B] hover:border-[#2D3341]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#F6F4EF]">{app.roleTitle}</h4>
                      <p className="text-xs text-[#D6B36A] font-medium">{app.projectTitle}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#A4A6AD] pt-2 border-t border-[#1C1F27]">
                    <span>Submitted: {app.submittedAt}</span>
                    <span className="flex items-center gap-1 text-[#F6F4EF]">
                      Tape: {app.momentTitle.substring(0, 20)}...
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Audition Record & Action Inspector */}
        <div className="lg:col-span-7">
          {selectedApp ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111318] border border-[#1E222B] space-y-6 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E222B]">
                <div>
                  <span className="text-[11px] font-semibold text-[#A4A6AD] uppercase tracking-wider">
                    {selectedApp.productionType} · {selectedApp.castingCompany}
                  </span>
                  <h2 className="text-2xl font-bold text-[#F6F4EF] font-display mt-0.5">
                    {selectedApp.roleTitle}
                  </h2>
                  <p className="text-sm font-semibold text-[#D6B36A]">{selectedApp.projectTitle}</p>
                </div>

                {/* Status Badge */}
                <div className="flex flex-col sm:items-end">
                  <span className={`px-3 py-1 text-xs font-bold rounded border ${STATUS_BADGE_STYLES[selectedApp.status].bg} ${STATUS_BADGE_STYLES[selectedApp.status].text} ${STATUS_BADGE_STYLES[selectedApp.status].border}`}>
                    {selectedApp.status}
                  </span>
                  <span className="text-[10px] text-[#A4A6AD] mt-1">Updated {selectedApp.updatedAt}</span>
                </div>
              </div>

              {/* Scheduled Audition Banner if invited */}
              {selectedApp.status === 'Audition invited' && selectedApp.auditionDateTime && (
                <div className="p-4 rounded-xl bg-[#D6B36A]/10 border border-[#D6B36A]/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D6B36A]">
                    <Calendar className="w-4 h-4" />
                    <span>In-Person Audition Call Scheduled</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F6F4EF]">
                    <div>
                      <span className="text-[#A4A6AD]">Time: </span>
                      <span className="font-semibold">{selectedApp.auditionDateTime}</span>
                    </div>
                    <div>
                      <span className="text-[#A4A6AD]">Stage: </span>
                      <span className="font-semibold">{selectedApp.auditionLocation}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submitted Tape / Moment Container */}
              <div>
                <h4 className="text-xs font-bold text-[#F6F4EF] uppercase tracking-wider mb-2">
                  Attached Performance Tape
                </h4>
                <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#262A35] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-16 rounded overflow-hidden bg-black shrink-0">
                      <img src={selectedApp.momentThumbnail} alt="Audition tape" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#D6B36A] fill-current" />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#F6F4EF]">{selectedApp.momentTitle}</h5>
                      <p className="text-[11px] text-[#A4A6AD]">Submitted by: {selectedApp.actorName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedActorId(selectedApp.actorId);
                      setCurrentView('passport');
                    }}
                    className="px-3 py-1.5 text-xs text-[#D6B36A] hover:bg-[#D6B36A]/10 border border-[#D6B36A]/30 rounded transition-colors whitespace-nowrap"
                  >
                    View Actor Passport
                  </button>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <h4 className="text-xs font-bold text-[#F6F4EF] uppercase tracking-wider mb-1">
                  Actor's Application Note
                </h4>
                <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#262A35] text-xs text-[#C8C6BE] leading-relaxed whitespace-pre-line">
                  {selectedApp.coverNote}
                </div>
              </div>

              {/* Casting Feedback Note */}
              <div>
                <h4 className="text-xs font-bold text-[#F6F4EF] uppercase tracking-wider mb-1">
                  Casting Office Log / Feedback
                </h4>
                <div className="p-3.5 rounded-xl bg-[#0E1015] border border-[#232731] text-xs text-[#A4A6AD]">
                  {selectedApp.castingFeedback || 'No public notes released.'}
                </div>
              </div>

              {/* Simulated Role Controls */}
              <div className="pt-4 border-t border-[#1E222B]">
                {userRole === 'casting_director' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#4CAF83]">
                        Casting Director Actions (Simulated)
                      </span>
                      <span className="text-[10px] text-[#A4A6AD]">Update candidate pipeline</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'In review')}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#1F232D] hover:bg-[#2A2E38] text-[#F6F4EF] rounded border border-[#2E3342]"
                      >
                        Mark In Review
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'Shortlisted')}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#D6B36A]/20 hover:bg-[#D6B36A]/30 text-[#D6B36A] rounded border border-[#D6B36A]/40"
                      >
                        Shortlist Candidate
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'Audition invited')}
                        className="px-3 py-1.5 text-xs font-semibold bg-purple-900/30 hover:bg-purple-900/50 text-purple-300 rounded border border-purple-700/40"
                      >
                        Invite to Live Audition
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'Accepted')}
                        className="px-3 py-1.5 text-xs font-semibold bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 rounded border border-emerald-700/40"
                      >
                        Issue Role Offer
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'Not selected')}
                        className="px-3 py-1.5 text-xs font-semibold bg-rose-900/20 hover:bg-rose-900/40 text-rose-400 rounded border border-rose-900/30"
                      >
                        Release Candidate
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A4A6AD]">
                      Need to modify or withdraw this submission?
                    </span>
                    {selectedApp.status !== 'Withdrawn' && selectedApp.status !== 'Accepted' && (
                      <button
                        onClick={() => handleStatusChange(selectedApp.id, 'Withdrawn')}
                        className="px-3.5 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-900/20 border border-rose-900/30 rounded transition-colors"
                      >
                        Withdraw Application
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-[#111318] border border-[#1E222B] text-[#A4A6AD] text-sm">
              Select an application on the left to inspect audition records.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
