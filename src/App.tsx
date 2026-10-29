import React, { useEffect } from 'react';
import {
  SpotlightProvider,
  useSpotlight,
} from './context/SpotlightContext';

import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DiscoverFeed } from './components/DiscoverFeed';
import { TalentPassport } from './components/TalentPassport';
import { CastingCallsView } from './components/CastingCallsView';
import { AuditionRoomView } from './components/AuditionRoomView';
import { SceneLabView } from './components/SceneLabView';
import { CareerStageView } from './components/CareerStageView';

import { DirectMessagesDrawer } from './components/DirectMessagesDrawer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CreateMomentModal } from './components/CreateMomentModal';
import { ActivityDrawer } from './components/ActivityDrawer';
import { MobileNav } from './components/MobileNav';
import { SpotlightLoader } from './components/SpotlightLoader';

import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    toast,
  } = useSpotlight();

  // Handle direct links that request the Discover view.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('autostart') === '1') {
      (setCurrentView as unknown as (view: 'discover') => void)('discover');
    }
  }, [setCurrentView]);

  // Return the user to the top when switching views.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#050608] bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(14,24,46,0.4),transparent_60%)] text-[#F6F4EF] flex flex-col antialiased">

      {/* Toast Notifications */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#090F1E] border border-[#D6B36A]/50 text-xs text-[#F6F4EF] shadow-2xl animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-[#D6B36A] shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Header */}
      <Navbar />

      {/* Main Application Views */}
      <main className="flex-1 pb-20 sm:pb-24">
        {currentView === 'landing' && <LandingPage />}

        {currentView === 'discover' && <DiscoverFeed />}

        {currentView === 'passport' && <TalentPassport />}

        {currentView === 'casting' && <CastingCallsView />}

        {currentView === 'auditions' && <AuditionRoomView />}

        {currentView === 'scenelab' && <SceneLabView />}

        {currentView === 'career' && <CareerStageView />}
      </main>

      {/* Subscription and Content Modals */}
      <SubscriptionModal />
      <CreateMomentModal />

      {/* Drawers */}
      <DirectMessagesDrawer />
      <ActivityDrawer />

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  return (
    <SpotlightProvider>
      {isLoading ? (
        <SpotlightLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <AppContent />
      )}
    </SpotlightProvider>
  );
}