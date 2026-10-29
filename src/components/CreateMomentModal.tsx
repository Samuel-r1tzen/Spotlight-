import React, { useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { SpotlightMoment } from '../types';
import { MONOLOGUE_IMAGE_URL, PERIOD_DRAMA_IMAGE_URL, HERO_IMAGE_URL } from '../data/mockData';
import { X, Upload, Clapperboard, Sparkles, Check } from 'lucide-react';

const CATEGORIES: SpotlightMoment['category'][] = [
  'Dramatic Monologue',
  'Classical & Period',
  'Comedy & Timing',
  'Character Secret',
  'Emotional Range',
  'Physical & Combat',
  'Voice / Dialect',
  'Improvisation'
];

export const CreateMomentModal: React.FC = () => {
  const { showCreateMomentModal, setShowCreateMomentModal, createNewMoment } = useSpotlight();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SpotlightMoment['category']>('Dramatic Monologue');
  const [prompt, setPrompt] = useState('');
  const [skills, setSkills] = useState('Subtext Delivery, Controlled Vulnerability');
  const [duration, setDuration] = useState(60);
  const [selectedThumbnail, setSelectedThumbnail] = useState(MONOLOGUE_IMAGE_URL);
  const [inPortfolio, setInPortfolio] = useState(true);

  if (!showCreateMomentModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createNewMoment({
      title: title.trim(),
      category,
      prompt: prompt.trim() || undefined,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      thumbnailUrl: selectedThumbnail,
      durationSeconds: Number(duration) || 60
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 overflow-y-auto">
      <div className="relative max-w-xl w-full bg-[#111318] border border-[#262A35] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1E222B]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D6B36A]/20 border border-[#D6B36A]/40 flex items-center justify-center text-[#D6B36A]">
              <Clapperboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F6F4EF] font-display">
                Publish a Spotlight Moment
              </h2>
              <p className="text-xs text-[#A4A6AD]">
                Showcase a distinct acting skill, monologue, or audition take.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateMomentModal(false)}
            className="text-[#A4A6AD] hover:text-[#F6F4EF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">
              Performance Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lady Macbeth: The Sleepwalking Soliloquy (60s)"
              className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">
                Duration (Seconds)
              </label>
              <input
                type="number"
                min={15}
                max={180}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
              />
            </div>
          </div>

          {/* Acting Prompt / Scene Context */}
          <div>
            <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">
              Scene Context or Prompt Description
            </label>
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Delivering life-shattering news without raising voice or breaking eye contact."
              className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          {/* Demonstrated Skills */}
          <div>
            <label className="block text-xs font-semibold text-[#F6F4EF] mb-1">
              Demonstrated Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Subtext Delivery, British RP, Breath Control"
              className="w-full px-3 py-2 bg-[#17191F] border border-[#262A35] rounded-md text-xs text-[#F6F4EF] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          {/* Cinematic Thumbnail Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#F6F4EF] mb-1.5">
              Select Performance Video Frame:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { url: MONOLOGUE_IMAGE_URL, label: 'Dramatic Studio' },
                { url: PERIOD_DRAMA_IMAGE_URL, label: 'Period Stage' },
                { url: HERO_IMAGE_URL, label: 'Film Set Action' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedThumbnail(item.url)}
                  className={`relative aspect-[9/16] rounded-lg overflow-hidden border cursor-pointer ${
                    selectedThumbnail === item.url ? 'border-[#D6B36A] ring-1 ring-[#D6B36A]' : 'border-[#262A35]'
                  }`}
                >
                  <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                    <span className="text-[10px] font-semibold text-[#F6F4EF]">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio toggle */}
          <label className="flex items-center gap-2 text-xs text-[#A4A6AD] cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={inPortfolio}
              onChange={(e) => setInPortfolio(e.target.checked)}
              className="rounded border-[#262A35] text-[#D6B36A] focus:ring-0"
            />
            <span>Feature this Moment on my public Talent Passport</span>
          </label>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E222B]">
            <button
              type="button"
              onClick={() => setShowCreateMomentModal(false)}
              className="px-4 py-2 text-xs text-[#A4A6AD] hover:text-[#F6F4EF]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md shadow-md shadow-[#D6B36A]/20"
            >
              Publish Moment
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
