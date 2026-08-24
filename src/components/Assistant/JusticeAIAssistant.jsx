import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  HelpCircle, 
  Scale, 
  ShieldCheck, 
  BookOpen, 
  User,
  Trash2
} from 'lucide-react';
import { predefinedQuestions } from '../../data/aiAssistantKnowledge';

export default function JusticeAIAssistant({ showToast }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Hello. I am **Veritas AI**, your automated civil rights and police accountability legal research assistant.\n\nI can answer questions regarding constitutional protections (4th, 5th, 1st Amendments), filing FOIA / State Open Records requests, Section 1983 federal lawsuits, and overcoming Qualified Immunity.\n\nClick any topic below or type a question to begin.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Find match in knowledge base or construct structured legal response
      const matched = predefinedQuestions.find(item => 
        query.toLowerCase().includes(item.q.toLowerCase().slice(0, 15)) ||
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(item.category.toLowerCase())
      );

      let responseText = '';
      if (matched) {
        responseText = matched.a;
      } else if (query.toLowerCase().includes('traffic stop') || query.toLowerCase().includes('pulled over')) {
        responseText = '🚗 **Traffic Stop Constitutional Defense Protocol:**\n\n1. **Right to Remain Silent (5th Amend):** You only have to provide Driver\'s License, Registration, and Proof of Insurance. Say: *"Officer, I am exercising my 5th Amendment right to remain silent."*\n2. **Search Refusal (4th Amend):** State clearly: *"I do not consent to any search of my vehicle."*\n3. **Detention Status:** Ask: *"Officer, am I being detained or am I free to go?"*\n4. **K-9 Delays:** Police cannot prolong a traffic stop to wait for drug dogs past the normal time required to issue a ticket (Rodriguez v. United States, 2015).';
      } else if (query.toLowerCase().includes('recording') || query.toLowerCase().includes('film')) {
        responseText = '📹 **Filming Police in Public (1st Amendment):**\n\n• Citizens have a clearly established First Amendment right to record police officers performing duties in public spaces (Fields v. City of Philadelphia, Glik v. Cunniffe).\n• Maintain 10-15 feet distance to avoid obstruction claims.\n• Police cannot confiscate your phone without a judicial warrant or delete video files (deleting footage constitutes felony evidence tampering).';
      } else {
        responseText = `⚖️ **Legal Research & Procedural Guidance for "${query}":**\n\nUnder federal civil rights statutes (42 U.S.C. § 1983) and State Open Records Acts, civilian oversight and accountability depend on:\n\n1. **Preserving Objective Evidence:** Secure unedited video, audio, and CAD transmissions via immediate FOIA requests before 30-day retention purge cycles.\n2. **Defeating Qualified Immunity:** Document whether officer violated established departmental general orders or binding Circuit Court precedent.\n3. **Legal Clinic Referral:** We recommend submitting a formal report through our platform\'s "Report Incident" modal to have our 640+ pro bono network attorneys review your case.`;
      }

      const botMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: responseText
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: 'Session cleared. Ask a legal question or select a predefined topic below.'
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 rounded-2xl p-6 border border-purple-900/40 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 mb-1">
            <Bot className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Veritas AI Legal Assistant</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Constitutional Rights & Police Accountability AI
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Instant legal research, Supreme Court citations, FOIA requirements, and civil rights defense guidance.
          </p>
        </div>

        <button
          onClick={handleClear}
          className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
          title="Reset conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Frequent Legal Defense Questions:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {predefinedQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.q)}
              className="p-3 bg-slate-900/80 hover:bg-purple-950/40 rounded-xl border border-slate-800 hover:border-purple-600/50 text-left text-xs transition-all space-y-1 group"
            >
              <span className="text-[10px] text-purple-400 uppercase font-mono font-bold">{item.category}</span>
              <p className="text-slate-200 group-hover:text-white font-medium line-clamp-2 leading-snug">{item.q}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-5 shadow-2xl flex flex-col h-[480px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-justice-600 text-white' : 'bg-purple-950 border border-purple-700 text-purple-300'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-justice-600 text-white rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-purple-400 text-xs p-2 font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Veritas AI is analyzing legal statutes...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-3 border-t border-slate-800 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask a civil rights, FOIA, Qualified Immunity, or police procedure question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-glow flex items-center space-x-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Veritas</span>
          </button>
        </form>
      </div>
    </div>
  );
}
