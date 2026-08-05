import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, Minimize2, ChevronDown } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome-msg',
  role: 'assistant',
  content: "Hello! I am **Clarity AI**, official assistant to Shalom C. Ernest. How can I assist you today regarding executive advisory, corporate workshops, or booking inquiries?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_QUESTIONS = [
  "What executive advisory services are offered?",
  "How can I book Shalom for a keynote speaking engagement?",
  "Tell me about Leadview Consulting & Clarity Conclave",
  "What is the Youth Making Impact (YMI) initiative?",
];

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
      // Prepare history format for backend endpoint
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history,
          message: messageContent,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or feel free to reach out directly via **shalom4impact@gmail.com** or the booking form.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    triggerHaptic('light');
    setMessages([INITIAL_MESSAGE]);
  };

  // Basic markdown/bold text renderer helper
  const renderFormattedText = (text: string) => {
    // Split lines for list/bullet rendering
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold text replacement
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-[#DEDBC8]">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc my-1">
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#101010] border border-[#8B5E3C]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 text-[#E1E0CC]"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#141414] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5E3C] to-[#D4A373] p-0.5 shadow-md flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#101010]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#141414] rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#DEDBC8] flex items-center gap-1">
                    Clarity AI <Sparkles className="w-3 h-3 text-[#D4A373]" />
                  </h4>
                  <p className="text-[10px] text-stone-400">Shalom Ernest Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-[#DEDBC8] hover:bg-stone-800/80 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#8B5E3C]/20 border border-[#8B5E3C]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-[#D4A373]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#8B5E3C] text-white font-medium rounded-br-none shadow-md'
                        : 'bg-[#18191C] border border-white/10 text-[#E1E0CC] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div>{renderFormattedText(msg.content)}</div>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.role === 'user' ? 'text-white/70' : 'text-stone-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-[#DEDBC8]" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center text-stone-400 text-xs pl-1">
                  <div className="w-6 h-6 rounded-full bg-[#8B5E3C]/20 border border-[#8B5E3C]/40 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-[#D4A373]" />
                  </div>
                  <div className="bg-[#18191C] border border-white/10 rounded-2xl rounded-bl-none px-3 py-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length < 4 && !isLoading && (
              <div className="px-3 py-2 bg-[#0C0D0E]/80 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="shrink-0 text-[10px] bg-[#18191C] hover:bg-[#8B5E3C]/30 hover:text-[#DEDBC8] border border-white/10 hover:border-[#8B5E3C]/60 text-[#E1E0CC]/90 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Direct Booking Callout */}
            {onOpenBooking && (
              <div className="px-3 py-1.5 bg-[#1A1815] border-t border-[#8B5E3C]/30 flex items-center justify-between text-[11px] shrink-0">
                <span className="text-[#E1E0CC]/80">Need executive consultation?</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="text-[#D4A373] hover:text-[#DEDBC8] font-semibold hover:underline flex items-center gap-0.5"
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
              className="p-2.5 bg-[#141414] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Clarity AI..."
                disabled={isLoading}
                className="flex-1 bg-[#18191C] border border-white/10 focus:border-[#8B5E3C] rounded-xl px-3 py-2 text-xs text-[#E1E0CC] placeholder-stone-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-[#8B5E3C] hover:bg-[#A6734A] disabled:opacity-40 disabled:hover:bg-[#8B5E3C] text-white font-bold rounded-xl transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
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
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#101010] to-[#1A1815] border border-[#8B5E3C]/60 text-[#DEDBC8] shadow-2xl hover:shadow-[#8B5E3C]/20 hover:border-[#D4A373] transition-all cursor-pointer flex items-center justify-center overflow-hidden"
        aria-label="Toggle Chatbot"
      >
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A373]" />
          ) : (
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A373] group-hover:rotate-6 transition-transform" />
          )}
        </div>

        {/* Pulsing indicator when closed */}
        {!isOpen && (
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5E3C]" />
          </span>
        )}

        <div className="absolute inset-0 bg-[#8B5E3C]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
}
