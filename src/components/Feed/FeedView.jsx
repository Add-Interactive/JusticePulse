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
    <div className="space-y-4 select-none">
      {/* Quick Post Creator Trigger Card (High Contrast) */}
      <div className="bg-[#111726] rounded-3xl border-2 border-[#243147] p-4 sm:p-5 shadow-2xl space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-600 ring-2 ring-justice-500/30"
          />
          <button
            onClick={onOpenCreatePost}
            className="flex-1 bg-[#080c14] hover:bg-[#151f33] border-2 border-[#1e2a3f] hover:border-justice-500/80 rounded-2xl px-4 py-2.5 text-left text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between shadow-inner"
          >
            <span>What injustice, legal update, or mutual aid need do you want to share?</span>
            <Sparkles className="w-4 h-4 text-justice-400" />
          </button>
        </div>

        <div className="pt-3 border-t border-[#1c273a] flex items-center justify-around text-xs text-slate-300">
          <button
            onClick={onOpenCreatePost}
            className="flex items-center space-x-2 py-1.5 px-3 rounded-xl bg-[#080c14] border border-[#1e2a3f] hover:border-crimson-600 hover:text-crimson-400 transition-all active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-crimson-500" />
            <span className="font-bold text-[11px]">Eyewitness Report</span>
          </button>
          <button
            onClick={onOpenCreatePost}
            className="flex items-center space-x-2 py-1.5 px-3 rounded-xl bg-[#080c14] border border-[#1e2a3f] hover:border-justice-600 hover:text-justice-400 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-justice-400" />
            <span className="font-bold text-[11px]">FOIA / Document</span>
          </button>
          <button
            onClick={onOpenCreatePost}
            className="flex items-center space-x-2 py-1.5 px-3 rounded-xl bg-[#080c14] border border-[#1e2a3f] hover:border-emerald-600 hover:text-emerald-400 transition-all active:scale-95"
          >
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-[11px]">Mutual Aid Goal</span>
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
          filteredPosts.map((post) => (
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
          <div className="bg-[#111726] rounded-3xl border-2 border-[#243147] p-10 text-center space-y-3 shadow-2xl">
            <Info className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-sm font-bold text-white uppercase font-mono">No Dispatches Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No matching community reports for this filter. Try selecting "All Dispatches" or clearing your search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
