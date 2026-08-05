import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '../data/shalomData';
import { X, Clock, User, Sparkles, ArrowRight } from 'lucide-react';
import { BlurUpImage } from './BlurUpImage';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function ArticleModal({ article, onClose, onOpenBooking }: ArticleModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-[#101010] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="relative border-b border-white/10 flex flex-col bg-[#141414]">
            {/* Article Hero Image */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
              <BlurUpImage
                src={article.image}
                alt={article.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover grayscale contrast-125 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer shrink-0 border border-white/10 backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-3 -mt-8 relative z-10">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                <span className="text-primary bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-gray-300 bg-black/50 px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3 h-3 text-primary" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#E1E0CC] leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          {/* Body Content Scrollable */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-base text-gray-300 font-light leading-relaxed">
            
            {/* Author Byline */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/5 text-xs font-mono text-gray-400">
              <User className="w-4 h-4 text-primary" />
              <span>By {article.author}</span>
            </div>

            {/* Key Takeaway Box */}
            <div className="bg-[#1A1A1A] p-5 rounded-xl border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Core Strategic Takeaway</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#E1E0CC] italic font-serif">
                "{article.keyTakeaway}"
              </p>
            </div>

            {/* Essay Paragraphs */}
            <div className="space-y-4 text-gray-300 font-light whitespace-pre-line leading-relaxed">
              {article.content}
            </div>

          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-white/10 bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-gray-400">
              Ready to implement these principles in your organization?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="bg-primary hover:bg-[#E8E5D5] text-black text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Advisory Briefing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
