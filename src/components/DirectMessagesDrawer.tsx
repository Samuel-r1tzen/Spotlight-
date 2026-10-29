import React, { useState } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import { X, Send, MessageCircle, CheckCheck, User, ShieldCheck } from 'lucide-react';

export const DirectMessagesDrawer: React.FC = () => {
  const { 
    isDMDrawerOpen, 
    setIsDMDrawerOpen, 
    messageThreads, 
    activeThreadId, 
    setActiveThreadId, 
    sendMessage 
  } = useSpotlight();

  const [inputMessage, setInputMessage] = useState('');

  if (!isDMDrawerOpen) return null;

  const activeThread = messageThreads.find(t => t.id === activeThreadId) || messageThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeThread) return;
    sendMessage(activeThread.id, inputMessage);
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-[#111318] border-l border-[#262A35] h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#0A0C0F] border-b border-[#1E222B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#D6B36A]" />
            <h3 className="text-sm font-bold text-[#F6F4EF]">Industry Messages & Inquiries</h3>
          </div>
          <button
            onClick={() => setIsDMDrawerOpen(false)}
            className="p-1 rounded-md text-[#A4A6AD] hover:text-[#F6F4EF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Column Chat: Threads List & Active Message History */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Threads Sidebar */}
          <div className="w-1/3 border-r border-[#1E222B] overflow-y-auto">
            {messageThreads.map(thread => {
              const isSelected = activeThread?.id === thread.id;

              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-3 border-b border-[#1E222B]/50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#171922] border-l-2 border-l-[#D6B36A]' : 'hover:bg-[#14171E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={thread.participantAvatar}
                      alt={thread.participantName}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F6F4EF] truncate">
                          {thread.participantName.split(' ')[0]}
                        </span>
                        <span className="text-[9px] text-[#A4A6AD]">{thread.lastTimestamp}</span>
                      </div>
                      <p className="text-[10px] text-[#A4A6AD] truncate">{thread.lastMessage}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Conversation Pane */}
          {activeThread ? (
            <div className="flex-1 flex flex-col bg-[#0B0D11]">
              
              {/* Thread Top Bar */}
              <div className="p-3.5 bg-[#111318] border-b border-[#1E222B] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeThread.participantAvatar}
                    alt={activeThread.participantName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#F6F4EF] leading-tight">
                      {activeThread.participantName}
                    </h4>
                    <span className="text-[10px] text-[#D6B36A] leading-tight block">
                      {activeThread.participantRole}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#1877F2] flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1877F2]" />
                  Verified Pro
                </span>
              </div>

              {/* Message Bubbles */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {activeThread.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.isSelf
                          ? 'bg-gradient-to-r from-[#1877F2] to-[#0D6EFD] text-white rounded-tr-xs font-medium shadow-md shadow-[#1877F2]/20'
                          : 'bg-[#1A1D25] text-[#F6F4EF] border border-[#272B37] rounded-tl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-[#A4A6AD] mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Message Input Box with Facebook Blue Send */}
              <form onSubmit={handleSend} className="p-3 bg-[#111318] border-t border-[#1E222B] flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Message ${activeThread.participantName.split(' ')[0]}...`}
                  className="flex-1 px-3.5 py-2 bg-[#17191F] border border-[#262A35] rounded-full text-xs text-[#F6F4EF] placeholder-[#A4A6AD] focus:outline-none focus:border-[#1877F2]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold rounded-full disabled:opacity-40 transition-colors shadow-sm shadow-[#1877F2]/40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#A4A6AD]">
              Select a conversation to start messaging.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
