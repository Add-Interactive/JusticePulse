import React, { useState } from 'react';
import { 
  MessageSquare, 
  Hash, 
  Send, 
  Users, 
  Shield, 
  Sparkles, 
  Smile, 
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialChatChannels } from '../../data/chatRoomsData';

export default function TownhallView({ currentUser, showToast }) {
  const [channels, setChannels] = useState(initialChatChannels);
  const [activeChannelId, setActiveChannelId] = useState('chan-general');
  const [inputText, setInputText] = useState('');

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: `cm-${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      badge: currentUser.badge,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText.trim()
    };

    setChannels(channels.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputText('');
    showToast('Message broadcast to townhall channel!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 rounded-2xl p-6 border border-indigo-900/40 shadow-xl">
        <div className="flex items-center space-x-2 text-indigo-400 mb-1">
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Public Townhall & Legal Caucus</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
          Community Dialogue, Legal Strategy & Mutual Aid Caucus
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Real-time encrypted discussion channels bringing together community members, civil rights attorneys, legal observers, and grassroots organizers.
        </p>
      </div>

      {/* Main Chat Interface Layout */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[600px]">
        {/* Left Channels List (4 Cols) */}
        <div className="md:col-span-4 bg-slate-950/80 border-r border-slate-800 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
              Active Discussion Channels
            </span>
            <div className="space-y-1">
              {channels.map(chan => {
                const isSelected = activeChannelId === chan.id;
                return (
                  <button
                    key={chan.id}
                    onClick={() => setActiveChannelId(chan.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-justice-600 text-white shadow-glow'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Hash className="w-4 h-4 flex-shrink-0 opacity-70" />
                      <span className="truncate">{chan.name.replace('#', '')}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-slate-800/80 text-slate-300">
                      {chan.messages.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Members Indicator */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Online Now
              </span>
              <span className="text-emerald-400 font-mono font-bold">142</span>
            </div>
            <p className="text-[10px] text-slate-500">Legal observers, civil rights attorneys, & community organizers active.</p>
          </div>
        </div>

        {/* Right Chat Stream & Input (8 Cols) */}
        <div className="md:col-span-8 flex flex-col justify-between bg-slate-900/60 p-4 sm:p-5">
          {/* Channel Header */}
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-justice-400" />
                {activeChannel.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 truncate">{activeChannel.topic}</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Encrypted Stream
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-3.5 py-4 pr-1">
            {activeChannel.messages.map(msg => (
              <div key={msg.id} className="flex items-start space-x-3 p-2 rounded-2xl hover:bg-slate-950/40 transition-colors">
                <img
                  src={msg.avatar}
                  alt={msg.author}
                  className="w-8 h-8 rounded-full object-cover border border-slate-700 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-100">{msg.author}</span>
                    {msg.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-justice-950 text-justice-400 rounded border border-justice-800/60">
                        {msg.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Message Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center space-x-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-700 hidden sm:block"
            />
            <input
              type="text"
              placeholder={`Message ${activeChannel.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-justice-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-justice-600 hover:bg-justice-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-glow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
