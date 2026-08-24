import React, { useState } from 'react';
import { 
  PlusCircle, 
  Image as ImageIcon, 
  FileText, 
  HeartHandshake, 
  ShieldAlert, 
  Sparkles,
  Info,
  TrendingUp
} from 'lucide-react';
import PostCard from './PostCard';
import PostFilterBar from './PostFilterBar';

export default function FeedView({ 
  posts, 
  onLike, 
  onSupport, 
  onAddComment, 
  onOpenCreatePost, 
  onOpenCaseDetail, 
  onOpenDonateModal, 
  currentUser,
  showToast,
  searchQuery
}) {
  const [filter, setFilter] = useState('ALL');

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'ALL' || post.type === filter;
    const matchesSearch = !searchQuery || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.caseTag?.title && post.caseTag.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const postCounts = {
    all: posts.length,
    evidence: posts.filter(p => p.type === 'EVIDENCE_RELEASE').length,
    mutualAid: posts.filter(p => p.type === 'MUTUAL_AID').length,
    legal: posts.filter(p => p.type === 'LEGAL_GUIDE').length,
    policy: posts.filter(p => p.type === 'POLICY_ALERT').length
  };

  return (
    <div className="space-y-4">
      {/* Quick Post Creator Trigger Card (Facebook-style) */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-700 ring-1 ring-justice-500/20"
          />
          <button
            onClick={onOpenCreatePost}
            className="flex-1 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl px-4 py-2.5 text-left text-xs text-slate-400 hover:text-slate-200 transition-all flex items-center justify-between"
          >
            <span>What injustice, legal update, or mutual aid need do you want to share?</span>
            <Sparkles className="w-4 h-4 text-justice-400" />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-around text-xs text-slate-300">
          <button
            onClick={onOpenCreatePost}
            className="flex items-center space-x-2 py-1 px-2.5 rounded-lg hover:bg-slate-800 hover:text-crimson-400 transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-crimson-500" />
            <span className="font-semibold text-[11px]">Eyewitness Report</span>
          </button>
          <button
            onClick={onOpenCreatePost}
            className="flex items-center space-x-2 py-1 px-2.5 rounded-lg hover:bg-slate-800 hover:text-justice-400 transition-all"
          >
            <FileText className="w-4 h-4 text-justice-400" />
            <span className="font-semibold text-[11px]">FOIA / Document</span>
          </button>
          <button
            onClick={onOpenCreatePost}
            className="flex items-center space-x-2 py-1 px-2.5 rounded-lg hover:bg-slate-800 hover:text-emerald-400 transition-all"
          >
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-[11px]">Mutual Aid Goal</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <PostFilterBar 
        activeFilter={filter} 
        setFilter={setFilter} 
        postCounts={postCounts} 
      />

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={onLike}
              onSupport={onSupport}
              onAddComment={onAddComment}
              onOpenCaseDetail={onOpenCaseDetail}
              onOpenDonateModal={onOpenDonateModal}
              currentUser={currentUser}
              showToast={showToast}
            />
          ))
        ) : (
          <div className="bg-slate-900/60 rounded-2xl p-8 border border-slate-800 text-center space-y-3">
            <Info className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-200">No Dispatches Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No posts matched your current category or search criteria. Be the first to publish an eyewitness report or legal update.
            </p>
            <button
              onClick={onOpenCreatePost}
              className="px-4 py-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl text-xs font-bold shadow-glow"
            >
              Publish New Dispatch
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
