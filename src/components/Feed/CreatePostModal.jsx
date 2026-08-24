import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  FileText, 
  ShieldAlert, 
  HeartHandshake, 
  Scale, 
  Sparkles,
  Lock,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CreatePostModal({ isOpen, onClose, onAddPost, currentUser, cases, showToast }) {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('INCIDENT_REPORT');
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState('none');
  const [fundTarget, setFundTarget] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      showToast('Please enter post content', 'error');
      return;
    }

    const selectedCase = cases.find(c => c.id === selectedCaseId);

    const newPost = {
      id: `post-user-${Date.now()}`,
      author: {
        name: currentUser.name,
        handle: `@${currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        avatar: currentUser.avatar,
        badge: currentUser.badge,
        role: currentUser.role
      },
      timestamp: 'Just now',
      type: postType,
      caseTag: selectedCase ? { id: selectedCase.id, title: selectedCase.title } : null,
      content: content.trim(),
      likesCount: 1,
      supportsCount: 1,
      sharesCount: 0,
      commentsCount: 0,
      userHasLiked: true,
      userHasSupported: true,
      comments: []
    };

    if (mediaType === 'document' && mediaTitle.trim()) {
      newPost.media = {
        type: 'document_preview',
        title: mediaTitle.trim(),
        snippet: 'User-verified public docket or witness statement indexed with cryptographic proof.',
        verified: true
      };
    } else if (mediaType === 'image') {
      newPost.media = {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
        caption: mediaTitle || 'Eyewitness evidentiary photo record'
      };
    }

    if (postType === 'MUTUAL_AID' && fundTarget) {
      newPost.mutualAidGoal = {
        raised: 50,
        target: parseInt(fundTarget, 10) || 5000,
        currency: '$'
      };
    }

    onAddPost(newPost);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Post published to the Public Square community feed!', 'success');
    onClose();
    setContent('');
    setSelectedCaseId('');
    setMediaTitle('');
    setMediaType('none');
    setFundTarget('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-justice-400" />
            <h3 className="font-bold text-sm text-white">Create Community Dispatch</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Author display */}
          <div className="flex items-center space-x-3">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover border border-justice-500/40" />
            <div>
              <p className="text-xs font-bold text-slate-100">{currentUser.name}</p>
              <span className="text-[10px] text-justice-400 bg-justice-950 px-1.5 py-0.2 rounded border border-justice-800">
                {currentUser.badge}
              </span>
            </div>
          </div>

          {/* Post Type Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'INCIDENT_REPORT', label: 'Eyewitness Report', icon: ShieldAlert },
                { id: 'EVIDENCE_RELEASE', label: 'FOIA / Evidence', icon: FileText },
                { id: 'MUTUAL_AID', label: 'Mutual Aid Fund', icon: HeartHandshake },
                { id: 'LEGAL_GUIDE', label: 'Legal Defense', icon: Scale }
              ].map(type => {
                const Icon = type.icon;
                const isSelected = postType === type.id;
                return (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`p-2 rounded-xl text-left border text-xs font-medium flex items-center space-x-1.5 transition-all ${
                      isSelected 
                        ? 'bg-justice-950 border-justice-500 text-justice-300 shadow-glow' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Case Tagging (Optional) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-justice-400" />
              Link to Verified Case Docket (Optional)
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
            >
              <option value="">-- No specific case / General update --</option>
              {cases.map(c => (
                <option key={c.id} value={c.id}>{c.title} ({c.victim})</option>
              ))}
            </select>
          </div>

          {/* Content TextArea */}
          <div>
            <textarea
              rows={4}
              placeholder="What happened? Share facts, witness statements, officer badge numbers, or call for community support..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-justice-500"
            ></textarea>
          </div>

          {/* Mutual Aid Target if selected */}
          {postType === 'MUTUAL_AID' && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2">
              <label className="block text-[11px] font-bold text-emerald-300 uppercase">
                Mutual Aid Goal Amount ($ USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={fundTarget}
                onChange={(e) => setFundTarget(e.target.value)}
                className="w-full bg-slate-950 border border-emerald-800/50 rounded-lg px-3 py-1.5 text-xs text-emerald-200 focus:outline-none"
              />
              <p className="text-[10px] text-emerald-400">100% goes directly to the verified family without platform processing deductions.</p>
            </div>
          )}

          {/* Media Attachments Selector */}
          <div className="border-t border-slate-800 pt-3 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Attach Evidence / Document
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setMediaType(mediaType === 'document' ? 'none' : 'document')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 ${
                  mediaType === 'document' ? 'bg-justice-950 border-justice-500 text-justice-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>FOIA / Legal Doc</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaType(mediaType === 'image' ? 'none' : 'image')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 ${
                  mediaType === 'image' ? 'bg-justice-950 border-justice-500 text-justice-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo / Evidentiary Video</span>
              </button>
            </div>

            {mediaType !== 'none' && (
              <input
                type="text"
                placeholder={mediaType === 'document' ? "Document title (e.g. 'Bodycam FOIA Log #402.pdf')" : "Photo caption or description"}
                value={mediaTitle}
                onChange={(e) => setMediaTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-2"
              />
            )}
          </div>

          {/* Footer Submit Button */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-justice-400" />
              <span>Immutable SHA-256 Ledger Record</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-justice-600 to-justice-500 hover:from-justice-500 hover:to-justice-400 text-white rounded-xl text-xs font-bold shadow-glow"
              >
                Publish Dispatch
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
