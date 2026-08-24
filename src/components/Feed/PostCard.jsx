import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Shield, 
  CheckCircle, 
  FileText, 
  ExternalLink, 
  MoreHorizontal, 
  Award, 
  HandHeart, 
  Send,
  AlertCircle,
  Eye,
  Vote,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostCard({ 
  post, 
  onLike, 
  onSupport, 
  onAddComment, 
  onOpenCaseDetail, 
  onOpenDonateModal,
  currentUser,
  showToast
}) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.userHasLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [hasSupported, setHasSupported] = useState(post.userHasSupported || false);
  const [supportsCount, setSupportsCount] = useState(post.supportsCount);
  
  // Interactive Poll State
  const [votedOptionId, setVotedOptionId] = useState(null);
  const [pollData, setPollData] = useState(post.poll || null);

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      showToast('You liked this dispatch', 'success');
    }
  };

  const handleSupportClick = () => {
    if (!hasSupported) {
      setHasSupported(true);
      setSupportsCount(prev => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
      showToast('You stood with this community update', 'success');
    }
  };

  const handleShareClick = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied to clipboard for community distribution!', 'success');
  };

  const handlePollVote = (optionId) => {
    if (votedOptionId || !pollData) return;

    const newTotal = pollData.totalVotes + 1;
    const updatedOptions = pollData.options.map(opt => {
      const isChosen = opt.id === optionId;
      const newVotes = isChosen ? opt.votes + 1 : opt.votes;
      return {
        ...opt,
        votes: newVotes,
        percentage: parseFloat(((newVotes / newTotal) * 100).toFixed(1))
      };
    });

    setVotedOptionId(optionId);
    setPollData({
      ...pollData,
      totalVotes: newTotal,
      options: updatedOptions
    });

    confetti({ particleCount: 35, spread: 55 });
    showToast('Your vote has been logged into the community ballot ledger!', 'success');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, {
      author: currentUser.name,
      avatar: currentUser.avatar,
      badge: currentUser.badge,
      text: commentText,
      timestamp: 'Just now',
      likes: 0
    });

    setCommentText('');
    setShowComments(true);
    showToast('Comment published to community record', 'success');
  };

  const getPostStyle = (type) => {
    switch (type) {
      case 'EVIDENCE_RELEASE':
        return {
          borderAccent: 'border-l-4 border-l-indigo-500',
          badge: 'bg-indigo-950 text-indigo-300 border-indigo-700',
          dot: 'bg-indigo-400'
        };
      case 'MUTUAL_AID':
        return {
          borderAccent: 'border-l-4 border-l-emerald-500',
          badge: 'bg-emerald-950 text-emerald-300 border-emerald-700',
          dot: 'bg-emerald-400'
        };
      case 'POLICY_ALERT':
        return {
          borderAccent: 'border-l-4 border-l-purple-500',
          badge: 'bg-purple-950 text-purple-300 border-purple-700',
          dot: 'bg-purple-400'
        };
      case 'LEGAL_GUIDE':
        return {
          borderAccent: 'border-l-4 border-l-amber-500',
          badge: 'bg-amber-950 text-amber-300 border-amber-700',
          dot: 'bg-amber-400'
        };
      case 'INCIDENT_REPORT':
        return {
          borderAccent: 'border-l-4 border-l-crimson-500',
          badge: 'bg-crimson-950 text-crimson-300 border-crimson-700',
          dot: 'bg-crimson-400'
        };
      default:
        return {
          borderAccent: 'border-l-4 border-l-justice-500',
          badge: 'bg-slate-800 text-slate-200 border-slate-700',
          dot: 'bg-justice-400'
        };
    }
  };

  const postStyle = getPostStyle(post.type);

  return (
    <article className={`bg-[#111726] rounded-2xl border-2 border-[#243147] p-4 sm:p-5 shadow-2xl transition-all hover:border-[#3b82f6]/70 hover:shadow-black/70 space-y-4 ${postStyle.borderAccent}`}>
      {/* Header: Author Info & Tag */}
      <div className="flex items-start justify-between border-b border-[#1c273a] pb-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-600 ring-2 ring-justice-500/30"
          />
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap">
              <span className="font-bold text-sm text-white">{post.author.name}</span>
              <span className="text-[10px] px-2 py-0.5 bg-justice-950 text-justice-300 border border-justice-700 rounded-full font-bold flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" />
                {post.author.badge}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
              <span className="font-mono text-slate-400">{post.author.handle}</span>
              <span>•</span>
              <span className="text-slate-400 font-mono">{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Post Type Badge with Sharp Border */}
        <div className="flex items-center space-x-2">
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${postStyle.badge}`}>
            {post.type.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Case Docket Reference Tag (if linked) */}
      {post.caseTag && (
        <div 
          onClick={() => onOpenCaseDetail(post.caseTag.id)}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#080c14] border border-justice-700/80 text-justice-300 hover:bg-justice-950/60 text-xs font-semibold cursor-pointer transition-all hover:border-justice-400"
        >
          <Shield className="w-3.5 h-3.5 text-justice-400" />
          <span>Case Docket: {post.caseTag.title}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </div>
      )}

      {/* Content Text */}
      <div className="text-slate-100 text-sm leading-relaxed whitespace-pre-line font-normal">
        {post.content}
      </div>

      {/* Interactive Community Poll (if present) */}
      {pollData && (
        <div className="p-4 bg-[#080c14] rounded-2xl border-2 border-indigo-700/70 space-y-3 shadow-inner">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 font-mono">
              <Vote className="w-4 h-4 text-indigo-400" />
              <span>Civic Ballot: {pollData.question}</span>
            </h5>
            <span className="text-[10px] font-mono text-slate-400 bg-[#121927] px-2 py-0.5 rounded border border-slate-700">
              {pollData.totalVotes.toLocaleString()} Votes Logged
            </span>
          </div>

          <div className="space-y-2">
            {pollData.options.map(opt => {
              const isSelected = votedOptionId === opt.id;
              const hasVoted = votedOptionId !== null;

              return (
                <button
                  key={opt.id}
                  onClick={() => handlePollVote(opt.id)}
                  disabled={hasVoted}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all relative overflow-hidden flex flex-col justify-center ${
                    isSelected
                      ? 'bg-indigo-950/90 border-indigo-400 text-white font-bold'
                      : hasVoted
                      ? 'bg-[#111726] border-slate-800 text-slate-300 cursor-default'
                      : 'bg-[#111726] border-slate-700 hover:border-indigo-500 hover:bg-slate-800 text-slate-200 cursor-pointer'
                  }`}
                >
                  {/* Progress Fill Bar */}
                  {hasVoted && (
                    <div
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-700 rounded-l-xl ${
                        isSelected ? 'bg-indigo-600/30' : 'bg-slate-700/20'
                      }`}
                      style={{ width: `${opt.percentage}%` }}
                    ></div>
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                      <span>{opt.text}</span>
                    </span>
                    {hasVoted && (
                      <span className="font-mono text-[11px] font-bold text-indigo-300">
                        {opt.percentage}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Media Attachment (if present) */}
      {post.media && (
        <div className="rounded-2xl overflow-hidden border-2 border-[#1e2a3f] bg-slate-950 shadow-inner">
          <img
            src={post.media.url}
            alt={post.media.alt || 'Post attachment'}
            className="w-full max-h-96 object-cover"
          />
          {post.media.caption && (
            <div className="p-2.5 bg-[#080c14] border-t border-[#1e2a3f] text-xs text-slate-400 font-mono">
              {post.media.caption}
            </div>
          )}
        </div>
      )}

      {/* Mutual Aid Campaign Card (if present) */}
      {post.campaign && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-[#080c14] to-[#080c14] border-2 border-emerald-700/70 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <HandHeart className="w-4 h-4 text-emerald-400" />
              <span>Verified Mutual Aid Campaign</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-[#080c14] px-2 py-0.5 rounded border border-emerald-800">
              0% Platform Fee
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">${post.campaign.raised.toLocaleString()} raised</span>
              <span className="text-slate-400">Goal: ${post.campaign.target.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-emerald-900">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (post.campaign.raised / post.campaign.target) * 100)}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => onOpenDonateModal(post.campaign)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald transition-all active:scale-95"
          >
            Direct Tax-Deductible Contribution
          </button>
        </div>
      )}

      {/* Bottom Action Controls */}
      <div className="pt-2 border-t border-[#1c273a] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1 sm:space-x-3">
          {/* Like Button */}
          <button
            onClick={handleLikeToggle}
            className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition-all ${
              isLiked
                ? 'bg-crimson-950/80 text-crimson-400 border-crimson-700/80 font-bold'
                : 'bg-[#080c14] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-crimson-500 text-crimson-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          {/* Stand With Button */}
          <button
            onClick={handleSupportClick}
            className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition-all ${
              hasSupported
                ? 'bg-justice-950/80 text-justice-400 border-justice-700/80 font-bold'
                : 'bg-[#080c14] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${hasSupported ? 'fill-justice-500 text-justice-500' : ''}`} />
            <span>{supportsCount} Stand</span>
          </button>

          {/* Comments Toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="px-3 py-1.5 rounded-xl bg-[#080c14] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 flex items-center space-x-1.5 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{post.commentsCount || 0}</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="p-1.5 rounded-xl bg-[#080c14] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
          title="Share Dispatch"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="pt-3 border-t border-[#1c273a] space-y-3 animation-fade-in">
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Leave community commentary or verified note..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-[#080c14] border border-[#243147] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-justice-500"
            />
            <button
              type="submit"
              className="p-2 bg-justice-600 hover:bg-justice-500 text-white rounded-xl shadow-glow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {(post.comments || []).map((comm, idx) => (
              <div key={idx} className="p-2.5 bg-[#080c14] rounded-xl border border-[#1e2a3f] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{comm.author}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{comm.timestamp}</span>
                </div>
                <p className="text-slate-300 leading-snug">{comm.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
