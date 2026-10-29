import React, { useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { calculateCastingFit } from '../utils/spotlightLogic';
import { CastingCall } from '../types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Briefcase, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  X,
  Play,
  Check,
  Send
} from 'lucide-react';

export const CastingCallsView: React.FC = () => {
  const { 
    castingCalls, 
    actors, 
    moments, 
    selectedCastingCall, 
    setSelectedCastingCall, 
    submitAuditionApplication,
    showToast
  } = useSpotlight();

  const currentActor = actors.find(a => a.id === 'actor-maya') || actors[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [paidOnly, setPaidOnly] = useState(false);

  // Application submission modal state
  const [submittingCall, setSubmittingCall] = useState<CastingCall | null>(null);
  const [selectedMomentId, setSelectedMomentId] = useState<string>(moments[0]?.id || '');
  const [coverNote, setCoverNote] = useState<string>('');

  const filteredCalls = castingCalls.filter(call => {
    if (selectedFormat !== 'All' && !call.productionType.toLowerCase().includes(selectedFormat.toLowerCase())) {
      return false;
    }
    if (paidOnly && !call.isPaid) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        call.projectTitle.toLowerCase().includes(q) ||
        call.roleTitle.toLowerCase().includes(q) ||
        call.location.toLowerCase().includes(q) ||
        call.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenApply = (call: CastingCall) => {
    setSubmittingCall(call);
    setSelectedMomentId(moments[0]?.id || '');
    setCoverNote(`Dear ${call.castingDirectorName},\n\nI am submitting my Spotlight Moment for the role of ${call.roleTitle} in ${call.projectTitle}. My training at RADA and background in ${currentActor.categories.join(', ')} align closely with the character brief.`);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingCall) return;
    submitAuditionApplication(submittingCall.id, selectedMomentId, coverNote);
    setSubmittingCall(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
      
      {/* Page Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B36A] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Casting Fit Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display">
          Active Casting Opportunities
        </h1>
        <p className="text-sm text-[#A4A6AD] mt-2">
          Opportunities evaluated against your verified skills, accents, and playing age. Transparent criteria without opaque algorithms.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-[#111318] border border-[#1E222B] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#A4A6AD] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, projects, skills..."
            className="w-full pl-9 pr-4 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] placeholder-[#A4A6AD] focus:outline-none focus:border-[#D6B36A]"
          />
        </div>

        {/* Format Filter Tabs & Paid Toggle */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 p-1 bg-[#17191F] rounded-lg border border-[#262A35]">
            {['All', 'TV Drama', 'Feature Film', 'West End', 'Indie'].map(format => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  selectedFormat === format 
                    ? 'bg-[#262A35] text-[#D6B36A] font-semibold' 
                    : 'text-[#A4A6AD] hover:text-[#F6F4EF]'
                }`}
              >
                {format}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-[#A4A6AD] cursor-pointer ml-auto md:ml-2">
            <input
              type="checkbox"
              checked={paidOnly}
              onChange={(e) => setPaidOnly(e.target.checked)}
              className="rounded border-[#262A35] text-[#D6B36A] focus:ring-0"
            />
            <span>Paid Roles Only</span>
          </label>
        </div>

      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCalls.map(call => {
          const fitResult = calculateCastingFit(currentActor, call);

          return (
            <div
              key={call.id}
              className="p-6 rounded-xl bg-[#111318] border border-[#1E222B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Header: Project and Fit Score */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#A4A6AD] uppercase tracking-wider">
                      {call.productionType} · {call.castingCompany}
                    </span>
                    <h3 className="text-xl font-bold text-[#F6F4EF] font-display mt-0.5">
                      {call.roleTitle}
                    </h3>
                    <p className="text-xs font-medium text-[#D6B36A]">{call.projectTitle}</p>
                  </div>

                  {/* Casting Fit Indicator */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#17191F] border border-[#D6B36A]/30 text-xs font-bold text-[#D6B36A]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{fitResult.score}% Fit</span>
                    </div>
                    <span className="text-[10px] text-[#A4A6AD] mt-1">Rule-based match</span>
                  </div>
                </div>

                {/* Brief description */}
                <p className="text-xs text-[#C8C6BE] line-clamp-2 mt-3 leading-relaxed">
                  {call.roleDescription}
                </p>

                {/* Why it matches this actor */}
                <div className="mt-4 p-3 rounded-lg bg-[#0E1015] border border-[#232731] space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A4A6AD]">
                    Why this matches your profile:
                  </span>
                  {fitResult.matchReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[#E1DFD8]">
                      <Check className="w-3 h-3 text-[#4CAF83] shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#A4A6AD] mt-4 pt-3 border-t border-[#1C1F27]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D6B36A]" />
                    {call.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#4CAF83]" />
                    {call.compensation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#A4A6AD]" />
                    Deadline: {call.deadline}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setSelectedCastingCall(call)}
                  className="text-xs font-semibold text-[#A4A6AD] hover:text-[#F6F4EF] transition-colors"
                >
                  View Full Brief
                </button>

                <button
                  onClick={() => handleOpenApply(call)}
                  className="px-4 py-2 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md transition-colors flex items-center gap-1.5 shadow-md shadow-[#D6B36A]/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Audition Tape</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Full Casting Brief Modal */}
      {selectedCastingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111318] border border-[#262A35] rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A4A6AD]">
                  {selectedCastingCall.productionType} · {selectedCastingCall.castingCompany}
                </span>
                <h2 className="text-2xl font-bold text-[#F6F4EF] font-display mt-1">
                  {selectedCastingCall.roleTitle}
                </h2>
                <p className="text-sm font-semibold text-[#D6B36A]">{selectedCastingCall.projectTitle}</p>
              </div>
              <button
                onClick={() => setSelectedCastingCall(null)}
                className="text-[#A4A6AD] hover:text-[#F6F4EF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#D3D1CB]">
              <div>
                <h4 className="font-bold text-[#F6F4EF] text-sm mb-1">Role Description</h4>
                <p className="leading-relaxed">{selectedCastingCall.roleDescription}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#F6F4EF] text-sm mb-1">Character Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-[#A4A6AD]">
                  {selectedCastingCall.characterRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#F6F4EF] text-sm mb-1">Required Skills & Audition Format</h4>
                <p className="mb-1">Format: <span className="text-[#D6B36A]">{selectedCastingCall.auditionFormat}</span></p>
                <div className="flex flex-wrap gap-2">
                  {selectedCastingCall.requiredSkills.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-[#17191F] border border-[#262A35] rounded text-[11px] text-[#F6F4EF]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#17191F] border border-[#262A35] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A4A6AD]">Compensation:</span>
                  <span className="font-semibold text-[#4CAF83]">{selectedCastingCall.compensation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A4A6AD]">Deadline:</span>
                  <span className="font-semibold text-[#F6F4EF]">{selectedCastingCall.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A4A6AD]">Casting Director:</span>
                  <span className="font-semibold text-[#F6F4EF]">{selectedCastingCall.castingDirectorName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E222B]">
              <button
                onClick={() => setSelectedCastingCall(null)}
                className="px-4 py-2 text-xs text-[#A4A6AD] hover:text-[#F6F4EF]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const call = selectedCastingCall;
                  setSelectedCastingCall(null);
                  handleOpenApply(call);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md shadow-md shadow-[#D6B36A]/20"
              >
                Apply for Role
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Audition Submission Modal */}
      {submittingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111318] border border-[#262A35] rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#F6F4EF]">Submit Audition Take</h3>
                <p className="text-xs text-[#A4A6AD]">
                  Applying for {submittingCall.roleTitle} · {submittingCall.projectTitle}
                </p>
              </div>
              <button
                onClick={() => setSubmittingCall(null)}
                className="text-[#A4A6AD] hover:text-[#F6F4EF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSubmit} className="space-y-4">
              
              {/* Select Spotlight Moment */}
              <div>
                <label className="block text-xs font-semibold text-[#F6F4EF] mb-2">
                  Select Portfolio Spotlight Moment to Attach:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {moments.map(m => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMomentId === m.id
                          ? 'bg-[#1C202B] border-[#D6B36A]'
                          : 'bg-[#14171E] border-[#232731] hover:border-[#2D3341]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="moment"
                        value={m.id}
                        checked={selectedMomentId === m.id}
                        onChange={() => setSelectedMomentId(m.id)}
                        className="text-[#D6B36A] focus:ring-0"
                      />
                      <img src={m.thumbnailUrl} alt={m.title} className="w-10 h-14 object-cover rounded" />
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-[#F6F4EF]">{m.title}</p>
                        <p className="text-[10px] text-[#A4A6AD]">{m.category} · {m.durationSeconds}s</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-semibold text-[#F6F4EF] mb-1.5">
                  Audition Cover Note:
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full p-3 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A] leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#A4A6AD]">
                  Simulated submission tracking active.
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmittingCall(null)}
                    className="px-4 py-2 text-xs text-[#A4A6AD] hover:text-[#F6F4EF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md shadow-md"
                  >
                    Dispatch Application
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
