import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  Lock, 
  CreditCard,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonateModal({ isOpen, onClose, campaign, onDonateSuccess, showToast }) {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !campaign) return null;

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);
    if (!finalAmount || finalAmount <= 0) {
      showToast('Please enter a valid donation amount', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 }
      });
      onDonateSuccess(finalAmount, campaign.title);
      showToast(`Thank you! Your donation of $${finalAmount.toFixed(2)} was sent directly to ${campaign.beneficiary || campaign.title}`, 'success');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Heart className="w-5 h-5 fill-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Direct Family Mutual Aid</span>
            </div>
            <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
            <p className="text-xs text-slate-400">Beneficiary: {campaign.beneficiary || 'Affected Family Sanctuary Trust'}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Contribution Amount (USD)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['25', '50', '100', '250'].map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handlePresetClick(val)}
                  className={`py-2.5 rounded-xl font-bold font-mono text-sm border transition-all ${
                    amount === val && !customAmount
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-glow-emerald'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Or Enter Custom Amount ($)
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 500"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount('');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Donor Name & Message */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Your Name / Organization (Optional)
              </label>
              <input
                type="text"
                placeholder="Leave blank to remain anonymous"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Message of Solidarity & Support (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share words of comfort and encouragement..."
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>
          </div>

          {/* Zero Platform Fee Guarantee */}
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl flex items-center space-x-3 text-xs text-emerald-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>100% Direct Pass-Through:</strong> Unlike traditional crowdfunding platforms that take 5-8%, our platform takes 0% platform fees. Every cent goes directly to verified family trusts.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-bold text-sm shadow-glow-emerald flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isProcessing ? 'Processing Donation...' : `Send $${customAmount || amount} Direct Aid`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
