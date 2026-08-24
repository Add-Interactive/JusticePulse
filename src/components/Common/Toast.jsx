import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-slate-900 border-emerald-500/80 text-emerald-300 shadow-glow-emerald';
      case 'error':
        return 'bg-slate-900 border-crimson-500/80 text-crimson-300 shadow-glow-crimson';
      case 'info':
      default:
        return 'bg-slate-900 border-justice-500/80 text-justice-300 shadow-glow';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-crimson-400 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-justice-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animation-slide-up max-w-md">
      <div className={`p-4 rounded-2xl border flex items-center space-x-3 shadow-2xl backdrop-blur-md ${getStyle()}`}>
        {getIcon()}
        <p className="text-xs font-semibold text-slate-100 flex-1 leading-snug">{toast.message}</p>
        <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
