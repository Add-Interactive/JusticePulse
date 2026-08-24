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

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'EVIDENCE_RELEASE':
        return 'bg-justice-950 text-justice-400 border-justice-800/60';
      case 'MUTUAL_AID':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800/60';
      case 'POLICY_ALERT':
        return 'bg-purple-950 text-purple-300 border-purple-800/60';
      case 'LEGAL_GUIDE':
        return 'bg-amber-950 text-amber-300 border-amber-800/60';
      case 'INCIDENT_REPORT':
        return 'bg-crimson-950 text-crimson-400 border-crimson-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <article className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl transition-all hover:border-slate-700/80 space-y-4">
      {/* Header: Author Info & Tag */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-700 ring-1 ring-justice-500/20"
          />
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap">
              <span className="font-bold text-sm text-slate-100">{post.author.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-justice-950/80 text-justice-400 border border-justice-800/50 rounded font-medium flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" />
                {post.author.badge}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
              <span>{post.author.handle}</span>
              <span>•</span>
              <span className="text-slate-500">{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Post Type Badge */}
        <div className="flex items-center space-x-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeStyle(post.type)}`}>
            {post.type.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Case Docket Reference Tag (if linked) */}
      {post.caseTag && (
        <div 
          onClick={() => onOpenCaseDetail(post.caseTag.id)}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-950 border border-justice-800/50 text-justice-300 hover:bg-justice-950/40 text-xs font-semibold cursor-pointer transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-justice-400" />
          <span>Case Docket: {post.caseTag.title}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </div>
      )}

      {/* Content Text */}
      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-normal">
        {post.content}
      </div>

      {/* Interactive Community Poll (if present) */}
      {pollData && (
        <div className="p-4 bg-slate-950/90 rounded-2xl border-2 border-indigo-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 font-mono">
              <Vote className="w-4 h-4 text-indigo-400" />
              <span>Civic Ballot: {pollData.question}</span>
            </h5>
            <span className="text-[10px] font-mono text-slate-400">
              {pollData.totalVotes.toLocaleString()} Votes
            </span>
          </div>

          <div className="space-y-2">
            {pollData.options.map(opt => {
              const isSelected = votedOptionId === opt.id;
              const hasVoted = votedOptionId !== null;

              return (
                <div
                  key={opt.id}
                  onClick={() => handlePollVote(opt.id)}
                  className={`p-3 rounded-xl border text-xs relative overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/60 shadow-glow'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {/* Progress Fill Bar */}
                  {hasVoted && (
                    <div
                      className="absolute inset-y-0 left-0 bg-indigo-600/30 transition-all duration-700"
                      style={{ width: `${opt.percentage}%` }}
                    ></div>
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                      {opt.label}
                    </span>
                    {hasVoted && (
                      <span className="font-mono font-bold text-indigo-300">
                        {opt.percentage}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Media Attachments */}
      {post.media && (
        <div className="mt-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80">
          {post.media.type === 'image' && (
            <div>
              <img
                src={post.media.url}
                alt={post.media.caption || 'Post image'}
                className="w-full max-h-80 object-cover"
              />
              {post.media.caption && (
                <p className="p-2.5 text-xs text-slate-400 bg-slate-950 border-t border-slate-800">
                  {post.media.caption}
                </p>
              )}
            </div>
          )}

          {post.media.type === 'document_preview' && (
            <div className="p-4 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-justice-950 border border-justice-800/60 flex items-center justify-center text-justice-400 flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h5 className="text-xs font-bold text-slate-200 truncate">{post.media.title}</h5>
                  {post.media.verified && (
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800/60 font-mono">
                      SHA-256 Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">{post.media.snippet}</p>
                <div className="mt-2 flex items-center space-x-3 text-xs">
                  <button 
                    onClick={() => showToast('Opening encrypted document viewer...', 'info')}
                    className="text-justice-400 hover:text-justice-300 font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Full Unredacted PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stat Graphic Component (if policy alert) */}
      {post.statGraphic && (
        <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">{post.statGraphic.title}</h5>
            <span className="text-[10px] text-slate-500 font-mono">Civic Analytics DB</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {post.statGraphic.topCities.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80">
                <p className="text-[11px] text-slate-400 truncate">{item.city}</p>
                <p className="text-sm font-bold font-mono text-crimson-400 mt-0.5">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mutual Aid Card (if fundraiser) */}
      {post.mutualAidGoal && (
        <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-300 flex items-center gap-1.5">
              <HandHeart className="w-4 h-4 text-emerald-400" />
              Direct Family Mutual Aid Goal
            </span>
            <span className="text-emerald-400 font-mono">
              ${post.mutualAidGoal.raised.toLocaleString()} / ${post.mutualAidGoal.target.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              style={{ width: `${(post.mutualAidGoal.raised / post.mutualAidGoal.target) * 100}%` }}
            ></div>
          </div>
          <button
            onClick={() => onOpenDonateModal({
              title: post.caseTag?.title || 'Community Mutual Aid Support',
              beneficiary: post.author.name,
              raised: post.mutualAidGoal.raised,
              target: post.mutualAidGoal.target
            })}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-glow-emerald"
          >
            Contribute Direct Family Sanctuary Support (0% Platform Fee)
          </button>
        </div>
      )}

      {/* Action Footer Bar */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1 sm:space-x-4">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center space-x-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
              isLiked 
                ? 'text-crimson-400 bg-crimson-950/40' 
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={handleSupportClick}
            className={`flex items-center space-x-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
              hasSupported 
                ? 'text-justice-400 bg-justice-950/40 font-semibold' 
                : 'hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Shield className={`w-4 h-4 ${hasSupported ? 'fill-justice-400/20' : ''}`} />
            <span>Stand With Them ({supportsCount})</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1.5 py-1.5 px-2.5 rounded-lg hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentsCount || (post.comments ? post.comments.length : 0)}</span>
          </button>
        </div>

        <button
          onClick={handleShareClick}
          className="flex items-center space-x-1 py-1.5 px-2.5 rounded-lg hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          title="Share to social networks"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Distribute</span>
        </button>
      </div>

      {/* Comments Section Drawer */}
      {showComments && (
        <div className="pt-3 border-t border-slate-800/60 space-y-3 animation-fade-in">
          {/* Add Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-700"
            />
            <input
              type="text"
              placeholder="Add your voice, testimony, or legal perspective..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-justice-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="p-1.5 bg-justice-600 hover:bg-justice-500 disabled:opacity-40 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* List of Comments */}
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {post.comments && post.comments.map(c => (
              <div key={c.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-start space-x-2.5 text-xs">
                <img
                  src={c.avatar}
                  alt={c.author}
                  className="w-6 h-6 rounded-full object-cover border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-200">{c.author}</span>
                    {c.badge && (
                      <span className="text-[9px] bg-slate-900 text-justice-400 px-1 rounded border border-slate-800">
                        {c.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500">• {c.timestamp}</span>
                  </div>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
