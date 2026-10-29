import React, { useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { 
  Heart, 
  Clapperboard, 
  Sparkles, 
  UserPlus, 
  X, 
  ChevronRight, 
  Bell, 
  CheckCircle,
  Repeat
} from 'lucide-react';

export const ActivityDrawer: React.FC = () => {
  const { 
    isActivityDrawerOpen, 
    setIsActivityDrawerOpen, 
    notifications, 
    setCurrentView,
    actors,
    showToast 
  } = useSpotlight();

  const [activeFilter, setActiveFilter] = useState<'all' | 'auditions' | 'likes' | 'follows'>('all');

  if (!isActivityDrawerOpen) return null;

  const mockActivityItems = [
    {
      id: 'act-1',
      type: 'audition',
      title: 'Audition Invitation',
      body: 'Fiona MacIntyre invited you to Lady Eleanor (Lead Role) in "The Hollow Crown: Chronicles"',
      time: '20m ago',
      unread: true,
      actionLabel: 'View Brief',
      actionView: 'auditions'
    },
    {
      id: 'act-2',
      type: 'like',
      title: 'Talent Endorsement',
      body: 'Julian Vance and 18 others praised your stillness in "The Confession: 60s Monologue"',
      time: '1h ago',
      unread: true,
      actionLabel: 'Watch Take',
      actionView: 'discover'
    },
    {
      id: 'act-3',
      type: 'follow',
      title: 'New Follower',
      body: 'Elena Rostova (Stunt Performer · Berlin) started following your Talent Passport',
      time: '3h ago',
      unread: false,
      actionLabel: 'View Actor',
      actionView: 'passport'
    },
    {
      id: 'act-4',
      type: 'echo',
      title: 'Monologue Echo',
      body: 'Marcus Brody created an echo response to your Scene Lab prompt submission',
      time: '6h ago',
      unread: false,
      actionLabel: 'See Echo',
      actionView: 'discover'
    },
    {
      id: 'act-5',
      type: 'audition',
      title: 'Status Update',
      body: 'Synchrony Films advanced your application for "Neon Meridian" to Shortlisted Stage',
      time: 'Yesterday',
      unread: false,
      actionLabel: 'Pipeline',
      actionView: 'auditions'
    }
  ];

  const filteredItems = mockActivityItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'auditions') return item.type === 'audition';
    if (activeFilter === 'likes') return item.type === 'like' || item.type === 'echo';
    if (activeFilter === 'follows') return item.type === 'follow';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#08090B] border-l border-[#1C2333] h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#0A0D14] border-b border-[#161E2E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#121B2F] border border-[#233354] flex items-center justify-center text-[#D6B36A]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F6F4EF] tracking-wide">Activity</h2>
              <span className="text-[11px] text-[#A4A6AD]">Notifications & Opportunities</span>
            </div>
          </div>
          <button
            onClick={() => setIsActivityDrawerOpen(false)}
            className="p-1.5 rounded-lg text-[#8E94A5] hover:text-[#F6F4EF] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close activity drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 border-b border-[#141C2B] flex items-center gap-2 overflow-x-auto scrollbar-none bg-[#090C14]">
          {[
            { id: 'all', label: 'All' },
            { id: 'auditions', label: 'Auditions' },
            { id: 'likes', label: 'Likes & Echoes' },
            { id: 'follows', label: 'Followers' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-[#D6B36A] text-black font-bold shadow-sm'
                  : 'bg-[#101624] text-[#8E94A5] hover:text-[#F6F4EF] border border-[#1A253A]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                item.unread 
                  ? 'bg-[#0E1526] border-[#D6B36A]/40 shadow-sm' 
                  : 'bg-[#0A0E18] border-[#141E30] hover:border-[#1E2E4A]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  item.type === 'audition' 
                    ? 'bg-[#450A0A] text-[#FFF6E0] border border-[#7F1D1D]'
                    : item.type === 'like'
                    ? 'bg-[#1C1628] text-[#FF7070] border border-[#3E2248]'
                    : item.type === 'follow'
                    ? 'bg-[#0F1E28] text-[#D6B36A] border border-[#1C364A]'
                    : 'bg-[#172033] text-[#F0DCAE] border border-[#273756]'
                }`}>
                  {item.type === 'audition' && <Clapperboard className="w-4 h-4" />}
                  {item.type === 'like' && <Heart className="w-4 h-4 fill-current" />}
                  {item.type === 'follow' && <UserPlus className="w-4 h-4" />}
                  {item.type === 'echo' && <Repeat className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F6F4EF]">{item.title}</span>
                    <span className="text-[10px] text-[#737A8C]">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#C5CAD6] mt-1 leading-relaxed">
                    {item.body}
                  </p>
                  
                  <div className="mt-2.5 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setIsActivityDrawerOpen(false);
                        setCurrentView(item.actionView as any);
                      }}
                      className="text-[11px] font-bold text-[#D6B36A] hover:text-[#FFF6E0] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{item.actionLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#D6B36A]" title="Unread notification" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0A0D14] border-t border-[#141C2B] text-center">
          <button
            onClick={() => {
              setIsActivityDrawerOpen(false);
              showToast('All notifications marked as read');
            }}
            className="text-xs text-[#8E94A5] hover:text-[#D6B36A] transition-colors cursor-pointer font-medium"
          >
            Mark all as read
          </button>
        </div>

      </div>
    </div>
  );
};
