import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, Minimize2 } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { PROFILE_DATA, SERVICES, EVENTS_DATA } from '../data/shalomData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome-msg',
  role: 'assistant',
  content: "Hello! I am **Clarity AI**, executive assistant to Shalom C. Ernest. How can I assist you today regarding executive advisory, keynote speaking, corporate workshops, or booking inquiries?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_QUESTIONS = [
  "What advisory services are offered?",
  "How can I book Shalom for speaking?",
  "Tell me about Clarity Conclave",
  "What is Leadview Consulting?",
  "What is Youth Making Impact (YMI)?",
];

// Built-in intelligent response engine for instant responses
function getLocalKnowledgeReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('book') || q.includes('hire') || q.includes('consultation') || q.includes('contact') || q.includes('price') || q.includes('cost')) {
    return `To book **Shalom C. Ernest** for executive advisory, board retreats, or speaking engagements:\n\n- **Email:** ${PROFILE_DATA.email}\n- **Phone:** ${PROFILE_DATA.phone}\n- **Format:** Virtual or On-site across Africa & internationally.\n\nYou can also click **"Book a Consultation"** in the navigation or modal to send a direct request.`;
  }

  if (q.includes('service') || q.includes('offer') || q.includes('advisory') || q.includes('training')) {
    const serviceList = SERVICES.map(s => `• **${s.title}** (${s.duration}, ${s.format})`).join('\n');
    return `Shalom C. Ernest provides specialized executive advisory through Leadview Consulting:\n\n${serviceList}\n\nEach engagement is customized to eliminate operational friction and align organizational strategy with execution.`;
  }

  if (q.includes('clarity conclave') || q.includes('conclave')) {
    return `**Clarity Conclave** is a curated thought leadership and clarity hub convened by Shalom C. Ernest. It empowers founders, executives, and emerging leaders to eliminate operational noise, discover purpose, and operate with strategic execution velocity.`;
  }

  if (q.includes('leadview') || q.includes('firm')) {
    return `**Leadview Consulting** is an enterprise management consulting and leadership development firm where Shalom C. Ernest serves as Principal. The firm delivers governance audits, executive retreats, and cross-functional performance frameworks for corporate and public sector clients.`;
  }

  if (q.includes('youth') || q.includes('ymi') || q.includes('impact')) {
    return `**Youth Making Impact (YMI)** is a pan-African youth empowerment non-profit initiative founded to bridge leadership, soft skills, and civic competence for young leaders aged 18–35 across Africa. Over 10,000 youth and professionals have been equipped to date.`;
  }

  if (q.includes('certif') || q.includes('credential') || q.includes('qualification') || q.includes('who is')) {
    return `**Shalom C. Ernest** is a Certified Management Consultant (CMC, FIMC) with distinctions in management specialist training. He is a **Fellow of the Institute of Management Consultants (FIMC)**, a **Lateef Jakande Leadership Fellow**, a **Tony Elumelu Foundation Mentor**, and a **John Maxwell Certified Trainer**.`;
  }

  if (q.includes('event') || q.includes('upcoming') || q.includes('masterclass') || q.includes('summit')) {
    const eventList = EVENTS_DATA.map(e => `• **${e.title}** — ${e.dateDisplay} (${e.venue})`).join('\n');
    return `Here are the featured upcoming programmes and masterclasses:\n\n${eventList}\n\nYou can register directly on the website under the **Events** section.`;
  }

  return `Shalom C. Ernest (FIMC, CMC) is a Management Consultant and Strategic Advisor helping executives, boards, and institutions achieve clarity and build sustainable organizations.\n\nWould you like to know more about **Executive Advisory**, **Upcoming Events**, or **Booking a Consultation**?`;
}

export function Chatbot({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    triggerHaptic('light');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      let replyText = '';
      try {
        const history = messages.map((m) => ({ role: m.role, content: m.content }));
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history, message: messageContent }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply) replyText = data.reply;
        }
      } catch {
        // Fallback to local knowledge
      }

      if (!replyText) {
        // Fallback with realistic delay
        await new Promise(r => setTimeout(r, 600));
        replyText = getLocalKnowledgeReply(messageContent);
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getLocalKnowledgeReply(messageContent),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    triggerHaptic('light');
    setMessages([INITIAL_MESSAGE]);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-[#E5C98E]">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('• ') || line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc my-1 text-stone-300">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[390px] h-[530px] max-h-[82vh] bg-[#141210] border border-white/[0.1] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 text-white font-sans"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#1C1916] border-b border-white/[0.08] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#C8A96E]/20 border border-[#C8A96E]/40 flex items-center justify-center text-[#C8A96E]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#C8A96E] border-2 border-[#1C1916] rounded-full" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 font-sans">
                    Clarity AI <Sparkles className="w-3 h-3 text-[#C8A96E]" />
                  </h4>
                  <p className="text-[10px] text-stone-400 font-mono">Shalom Ernest Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[13px] leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A96E]">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-2xl p-3.5 ${
                      msg.role === 'user'
                        ? 'bg-[#C8A96E] text-[#0A0908] font-medium rounded-br-none shadow-md'
                        : 'bg-[#1C1916] border border-white/[0.08] text-stone-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div>{renderFormattedText(msg.content)}</div>
                    <span
                      className={`block text-[9px] mt-1.5 text-right font-mono ${
                        msg.role === 'user' ? 'text-[#0A0908]/70' : 'text-stone-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-stone-800 border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5 text-stone-300">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center text-stone-400 text-xs pl-1">
                  <div className="w-6 h-6 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center shrink-0 text-[#C8A96E]">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-[#1C1916] border border-white/[0.08] rounded-2xl rounded-bl-none px-3.5 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#C8A96E] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#C8A96E] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#C8A96E] rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length < 4 && !isLoading && (
              <div className="px-3 py-2 bg-[#0E0D0C] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="shrink-0 text-[11px] bg-[#1C1916] hover:bg-[#C8A96E]/20 hover:text-[#E5C98E] border border-white/[0.08] hover:border-[#C8A96E]/50 text-stone-300 px-3 py-1 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Direct Booking Callout */}
            {onOpenBooking && (
              <div className="px-3.5 py-2 bg-[#191613] border-t border-[#C8A96E]/20 flex items-center justify-between text-[11px] shrink-0">
                <span className="text-stone-300">Need executive consultation?</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="text-[#C8A96E] hover:text-[#E5C98E] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Book Session →
                </button>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#141210] border-t border-white/[0.08] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Clarity AI..."
                disabled={isLoading}
                className="flex-1 bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-stone-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-[#C8A96E] hover:bg-[#E5C98E] disabled:opacity-40 text-[#0A0908] font-bold rounded-xl transition-all shrink-0 cursor-pointer shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Toggle Button */}
      <motion.button
        onClick={() => {
          triggerHaptic('medium');
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#141210] border border-[#C8A96E]/50 text-white shadow-2xl hover:border-[#C8A96E] transition-all cursor-pointer flex items-center justify-center overflow-hidden hover:shadow-[0_0_25px_rgba(200,169,110,0.3)]"
        aria-label="Toggle Clarity AI Chatbot"
      >
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6 text-[#C8A96E]" />
          ) : (
            <MessageSquare className="w-6 h-6 text-[#C8A96E] group-hover:rotate-6 transition-transform" />
          )}
        </div>

        {/* Pulsing indicator when closed */}
        {!isOpen && (
          <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A96E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8A96E]" />
          </span>
        )}

        <div className="absolute inset-0 bg-[#C8A96E]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
}
