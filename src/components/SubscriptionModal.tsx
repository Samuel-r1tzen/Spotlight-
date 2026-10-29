import React from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { SubscriptionTier } from '../types';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';

export const SubscriptionModal: React.FC = () => {
  const { 
    showSubscriptionModal, 
    setShowSubscriptionModal, 
    subscriptionTier, 
    setSubscriptionTier, 
    showToast 
  } = useSpotlight();

  if (!showSubscriptionModal) return null;

  const handleSelectTier = (tier: SubscriptionTier) => {
    setSubscriptionTier(tier);
    showToast(`Membership updated to: ${tier === 'free' ? 'Free Talent' : tier === 'plus' ? 'Spotlight Plus' : 'Industry Professional'}`);
    setShowSubscriptionModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 overflow-y-auto">
      <div className="relative max-w-4xl w-full bg-[#111318] border border-[#262A35] rounded-2xl p-6 sm:p-8 space-y-6 max-h-[95vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1E222B]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B36A] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Membership Tiers</span>
            </div>
            <h2 className="text-2xl font-bold text-[#F6F4EF] font-display">
              Transparent, Professional Access
            </h2>
            <p className="text-xs text-[#A4A6AD] mt-1">
              No artificial algorithmic boosts or fake guarantees. Upgraded capacity for working performers and casting directors.
            </p>
          </div>
          <button
            onClick={() => setShowSubscriptionModal(false)}
            className="text-[#A4A6AD] hover:text-[#F6F4EF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Free Tier */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between transition-colors ${
            subscriptionTier === 'free' ? 'bg-[#171922] border-[#D6B36A]' : 'bg-[#14171E] border-[#222631]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[#F6F4EF]">Free Talent</h3>
                {subscriptionTier === 'free' && (
                  <span className="text-[10px] font-bold text-[#D6B36A] uppercase">Current</span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#F6F4EF] font-display">$0</span>
                <span className="text-xs text-[#A4A6AD]"> / month</span>
              </div>
              <p className="text-xs text-[#A4A6AD] mb-4">
                For emerging performers building their professional foundation.
              </p>
              <ul className="space-y-2.5 text-xs text-[#F6F4EF]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Talent Passport & Verified Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>3 Spotlight Moments upload capacity</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Casting Calls browsing & applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Scene Lab weekly challenge access</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectTier('free')}
              className="mt-6 w-full py-2 text-xs font-semibold text-[#F6F4EF] bg-[#1C1F28] hover:bg-[#252A36] rounded-md transition-colors"
            >
              {subscriptionTier === 'free' ? 'Active Plan' : 'Switch to Free'}
            </button>
          </div>

          {/* Plus Tier */}
          <div className={`p-6 rounded-xl border-2 flex flex-col justify-between relative transition-colors ${
            subscriptionTier === 'plus' ? 'bg-[#171922] border-[#D6B36A]' : 'bg-[#14171E] border-[#D6B36A]/60'
          }`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#D6B36A] text-black text-[10px] font-bold rounded-full uppercase tracking-wider">
              Recommended
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[#F6F4EF]">Spotlight Plus</h3>
                {subscriptionTier === 'plus' && (
                  <span className="text-[10px] font-bold text-[#D6B36A] uppercase">Current</span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#D6B36A] font-display">$19</span>
                <span className="text-xs text-[#A4A6AD]"> / month</span>
              </div>
              <p className="text-xs text-[#A4A6AD] mb-4">
                For active working actors managing auditions and extensive showreels.
              </p>
              <ul className="space-y-2.5 text-xs text-[#F6F4EF]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Unlimited Spotlight Moments uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>High-def 4K showreel & voice reel hosting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Advanced Casting Fit notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Audition Room pipeline notes & tracking</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectTier('plus')}
              className="mt-6 w-full py-2 text-xs font-semibold text-black bg-[#D6B36A] hover:bg-[#e4c47f] rounded-md transition-colors shadow-md shadow-[#D6B36A]/20"
            >
              {subscriptionTier === 'plus' ? 'Active Plan' : 'Select Spotlight Plus'}
            </button>
          </div>

          {/* Pro Tier */}
          <div className={`p-6 rounded-xl border flex flex-col justify-between transition-colors ${
            subscriptionTier === 'pro' ? 'bg-[#171922] border-[#4CAF83]' : 'bg-[#14171E] border-[#222631]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[#F6F4EF]">Industry Pro</h3>
                {subscriptionTier === 'pro' && (
                  <span className="text-[10px] font-bold text-[#4CAF83] uppercase">Current</span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#F6F4EF] font-display">$49</span>
                <span className="text-xs text-[#A4A6AD]"> / month</span>
              </div>
              <p className="text-xs text-[#A4A6AD] mb-4">
                For casting directors, production houses, and talent agencies.
              </p>
              <ul className="space-y-2.5 text-xs text-[#F6F4EF]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4CAF83]" />
                  <span>Publish & manage unlimited casting briefs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4CAF83]" />
                  <span>Full Audition Room candidate review board</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4CAF83]" />
                  <span>Talent shortlist collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4CAF83]" />
                  <span>Direct agent contact & verification</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectTier('pro')}
              className="mt-6 w-full py-2 text-xs font-semibold text-[#F6F4EF] bg-[#1C1F28] hover:bg-[#252A36] rounded-md transition-colors"
            >
              {subscriptionTier === 'pro' ? 'Active Plan' : 'Select Industry Pro'}
            </button>
          </div>

        </div>

        {/* Professional Trust Notice */}
        <div className="p-4 rounded-lg bg-[#08090B] border border-[#1E222B] text-[11px] text-[#A4A6AD] leading-relaxed">
          <strong className="text-[#F6F4EF]">Entertainment Industry Fair Play Promise: </strong>
          Spotlight subscriptions never grant unfair algorithmic preference in searches, nor do they guarantee auditions or role bookings. Ratings and discoverability remain rooted in demonstrated craft, verified credits, and casting director specifications.
        </div>

      </div>
    </div>
  );
};
