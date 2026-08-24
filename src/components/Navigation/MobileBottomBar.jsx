import React from 'react';
import { 
  MessageSquare, 
  Scale, 
  Video, 
  Map, 
  Menu, 
  Flame, 
  Radio 
} from 'lucide-react';

export default function MobileBottomBar({ 
  activeTab, 
  setActiveTab, 
  onOpenSOSModal, 
  onOpenMenu 
}) {
  const navItems = [
    { id: 'feed', label: 'Feed', icon: MessageSquare },
    { id: 'cases', label: 'Docket', icon: Scale },
    { id: 'sos', label: 'SOS', icon: Video, isAction: true },
    { id: 'map', label: 'Shield', icon: Map },
    { id: 'menu', label: 'Menu', icon: Menu, isMenu: true }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={onOpenSOSModal}
                className="flex flex-col items-center justify-center -mt-5"
                title="Immediate SOS Live Stream"
              >
                <div className="w-12 h-12 rounded-full bg-crimson-600 hover:bg-crimson-500 text-white flex items-center justify-center shadow-glow-crimson border-2 border-slate-950 active:scale-95 transition-all">
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-crimson-400 font-mono mt-0.5">SOS</span>
              </button>
            );
          }

          if (item.isMenu) {
            return (
              <button
                key={item.id}
                onClick={onOpenMenu}
                className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold mt-1">Menu</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-justice-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-justice-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-semibold mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
