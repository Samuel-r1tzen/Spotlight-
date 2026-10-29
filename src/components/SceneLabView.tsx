import React, { useState, useEffect } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { INITIAL_SCENE_LAB_PROMPTS, MONOLOGUE_IMAGE_URL, PERIOD_DRAMA_IMAGE_URL } from '../data/mockData';
import { SceneLabPrompt } from '../types';
import { 
  Sparkles, 
  Video, 
  Play, 
  Bookmark, 
  Flame, 
  Clock, 
  Lightbulb, 
  Camera, 
  Square, 
  RotateCcw, 
  Check, 
  X,
  ChevronRight
} from 'lucide-react';

export const SceneLabView: React.FC = () => {
  const { createNewMoment, showToast, setCurrentView } = useSpotlight();

  const [prompts] = useState<SceneLabPrompt[]>(INITIAL_SCENE_LAB_PROMPTS);
  const [selectedPrompt, setSelectedPrompt] = useState<SceneLabPrompt>(prompts[0]);
  const [savedPromptIds, setSavedPromptIds] = useState<string[]>([]);
  
  // Studio Recorder Modal State
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [recorderState, setRecorderState] = useState<'idle' | 'countdown' | 'recording' | 'preview'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [recordSeconds, setRecordSeconds] = useState(0);

  // Form input for recorded take
  const [takeTitle, setTakeTitle] = useState('');
  const [takeSkills, setTakeSkills] = useState('Subtext Delivery, Stillness');

  const weeklyPrompt = prompts.find(p => p.weeklyChallenge) || prompts[0];

  // Countdown timer effect
  useEffect(() => {
    if (recorderState !== 'countdown') return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setRecorderState('recording');
      setRecordSeconds(0);
    }
  }, [recorderState, countdown]);

  // Recording seconds ticker effect
  useEffect(() => {
    if (recorderState !== 'recording') return;
    const interval = setInterval(() => {
      setRecordSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [recorderState]);

  const handleStartRecording = (prompt: SceneLabPrompt) => {
    setSelectedPrompt(prompt);
    setTakeTitle(`${prompt.title} (Take 1)`);
    setRecorderState('countdown');
    setCountdown(3);
    setIsRecordingModalOpen(true);
  };

  const handleStopRecording = () => {
    setRecorderState('preview');
  };

  const handleSavePrompt = (promptId: string) => {
    setSavedPromptIds(prev => {
      const isSaved = prev.includes(promptId);
      showToast(isSaved ? 'Prompt removed from saved list' : 'Prompt saved to your actor notebook');
      return isSaved ? prev.filter(id => id !== promptId) : [...prev, promptId];
    });
  };

  const handlePublishTake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!takeTitle.trim()) return;

    createNewMoment({
      title: takeTitle,
      category: 'Dramatic Monologue',
      prompt: selectedPrompt.description,
      skills: takeSkills.split(',').map(s => s.trim()).filter(Boolean),
      thumbnailUrl: MONOLOGUE_IMAGE_URL,
      durationSeconds: Math.max(15, recordSeconds)
    });

    setIsRecordingModalOpen(false);
    setRecorderState('idle');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B36A] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>The Craft Development Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F6F4EF] font-display">
          Scene Lab
        </h1>
        <p className="text-sm text-[#A4A6AD] mt-2">
          Develop and demonstrate your acting craft. Challenge yourself with weekly performance prompts, explore technique, and submit audition takes to the community.
        </p>
      </div>

      {/* Featured Weekly Challenge Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#171922] via-[#13151D] to-[#0E1015] border border-[#D6B36A]/30 p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B36A]/15 border border-[#D6B36A]/30 text-xs font-bold text-[#D6B36A]">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Weekly Spotlight Challenge #42</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#F6F4EF] font-display">
            {weeklyPrompt.title}
          </h2>

          <p className="text-sm text-[#D3D1CB] leading-relaxed">
            {weeklyPrompt.description}
          </p>

          <div className="p-4 rounded-xl bg-[#08090B]/80 border border-[#232731] flex items-start gap-3 text-xs">
            <Lightbulb className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#F6F4EF]">Craft Guidance: </span>
              <span className="text-[#A4A6AD]">{weeklyPrompt.actingCraftTip}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => handleStartRecording(weeklyPrompt)}
              className="px-6 py-3 bg-[#D6B36A] hover:bg-[#e4c47f] text-black font-semibold text-xs rounded-md shadow-lg shadow-[#D6B36A]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Record Your Take Now</span>
            </button>

            <button
              onClick={() => handleSavePrompt(weeklyPrompt.id)}
              className="px-4 py-3 bg-[#17191F] hover:bg-[#20232B] text-[#F6F4EF] border border-[#2A2E38] rounded-md text-xs font-medium transition-colors flex items-center gap-2"
            >
              <Bookmark className={`w-4 h-4 ${savedPromptIds.includes(weeklyPrompt.id) ? 'text-[#D6B36A] fill-current' : 'text-[#A4A6AD]'}`} />
              <span>{savedPromptIds.includes(weeklyPrompt.id) ? 'Prompt Saved' : 'Save Prompt'}</span>
            </button>

            <span className="text-xs text-[#A4A6AD] tabular-nums">
              {weeklyPrompt.submissionsCount} actors submitted takes this week
            </span>
          </div>
        </div>
      </div>

      {/* Acting Craft Prompts Catalog */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#F6F4EF] font-display mb-2">
          Acting Technique & Monologue Prompts
        </h3>
        <p className="text-xs text-[#A4A6AD]">
          Select an acting prompt to study the objective, target specific skills, and record your audition take.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map(prompt => {
          const isSaved = savedPromptIds.includes(prompt.id);

          return (
            <div
              key={prompt.id}
              className="p-6 rounded-xl bg-[#111318] border border-[#1E222B] hover:border-[#D6B36A]/40 transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#D6B36A]">
                    {prompt.category}
                  </span>
                  <button
                    onClick={() => handleSavePrompt(prompt.id)}
                    className="text-[#A4A6AD] hover:text-[#D6B36A]"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#D6B36A] fill-current' : ''}`} />
                  </button>
                </div>

                <h4 className="text-lg font-bold text-[#F6F4EF] font-display">
                  {prompt.title}
                </h4>

                <p className="text-xs text-[#A4A6AD] mt-2 line-clamp-3 leading-relaxed">
                  {prompt.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#1C1F27] flex items-center gap-2 text-[11px] text-[#A4A6AD]">
                  <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Suggested runtime: {prompt.durationAdvice}</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-[#D6B36A]">
                  {prompt.skillsTargeted.map((s, i) => (
                    <span key={s}>
                      #{s.replace(/\s+/g, '')}{i < prompt.skillsTargeted.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#A4A6AD] tabular-nums">
                  {prompt.submissionsCount} submissions
                </span>

                <button
                  onClick={() => handleStartRecording(prompt)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md transition-colors flex items-center gap-1.5 shadow"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Record Take</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Simulated Studio Camera Recorder Modal */}
      {isRecordingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-2xl w-full bg-[#111318] border border-[#262A35] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Studio Header */}
            <div className="p-4 bg-[#0A0C0F] border-b border-[#1E222B] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E06464] animate-pulse" />
                <span className="text-xs font-bold text-[#F6F4EF] uppercase tracking-wider">
                  Scene Lab Live Recording Studio
                </span>
              </div>
              <button
                onClick={() => setIsRecordingModalOpen(false)}
                className="text-[#A4A6AD] hover:text-[#F6F4EF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="relative aspect-[16/9] bg-[#050608] flex items-center justify-center overflow-hidden">
              
              {/* Background preview image */}
              <img
                src={MONOLOGUE_IMAGE_URL}
                alt="Studio preview"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Viewfinder Gridlines */}
              <div className="absolute inset-4 border border-white/10 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between p-2 text-[10px] font-mono text-[#D6B36A]">
                  <span>4K 24FPS · 1/50</span>
                  <span>REC [PRO-RES]</span>
                </div>
                <div className="flex justify-between p-2 text-[10px] font-mono text-white/60">
                  <span>ISO 800 · 3200K</span>
                  <span className="tabular-nums">TIME: 00:{recordSeconds < 10 ? `0${recordSeconds}` : recordSeconds}</span>
                </div>
              </div>

              {/* State 1: Countdown */}
              {recorderState === 'countdown' && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <span className="text-7xl font-bold text-[#D6B36A] font-display animate-ping">
                    {countdown}
                  </span>
                  <span className="text-xs font-semibold text-[#F6F4EF] mt-4 tracking-widest uppercase">
                    Get Ready...
                  </span>
                </div>
              )}

              {/* State 2: Recording In Progress */}
              {recorderState === 'recording' && (
                <div className="absolute bottom-6 flex flex-col items-center gap-2">
                  <div className="px-4 py-1.5 rounded-full bg-red-600/80 backdrop-blur-md text-white text-xs font-mono font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>00:{recordSeconds < 10 ? `0${recordSeconds}` : recordSeconds} SECONDS</span>
                  </div>

                  <button
                    onClick={handleStopRecording}
                    className="px-6 py-2 bg-white text-black font-bold text-xs rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-xl"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Cut & Review Take</span>
                  </button>
                </div>
              )}

              {/* State 3: Preview */}
              {recorderState === 'preview' && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Check className="w-10 h-10 text-[#4CAF83] mx-auto" />
                    <p className="text-sm font-bold text-[#F6F4EF]">Take Recorded Successfully ({recordSeconds}s)</p>
                    <p className="text-xs text-[#A4A6AD]">Review and publish to your portfolio and Discover feed.</p>
                  </div>
                </div>
              )}

            </div>

            {/* Recorder Footer / Publish Form */}
            {recorderState === 'preview' ? (
              <form onSubmit={handlePublishTake} className="p-6 bg-[#111318] space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">Take Title:</label>
                  <input
                    type="text"
                    value={takeTitle}
                    onChange={(e) => setTakeTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">Demonstrated Skills (comma separated):</label>
                  <input
                    type="text"
                    value={takeSkills}
                    onChange={(e) => setTakeSkills(e.target.value)}
                    className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRecorderState('countdown');
                      setCountdown(3);
                      setRecordSeconds(0);
                    }}
                    className="px-4 py-2 text-xs text-[#A4A6AD] hover:text-[#F6F4EF] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md shadow-md"
                  >
                    Publish to Spotlight Moments
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-[#111318] flex items-center justify-between text-xs text-[#A4A6AD]">
                <span>Prompt: {selectedPrompt.title}</span>
                <span>Camera: Simulated HD Studio Stream</span>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
