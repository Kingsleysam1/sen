import React from 'react';
import { motion } from 'framer-motion';
import { triggerHaptic } from '../utils/haptics';

interface CTASectionProps {
  onOpenBooking: () => void;
}

export function CTASection({ onOpenBooking }: CTASectionProps) {
  return (
    <section
      id="cta"
      className="bg-[#F0F5F0] relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #080A08 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C8A96E]" />

      <div className="site-container py-20 sm:py-28 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 sm:gap-10">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="block w-8 h-[2px] bg-[#C8A96E]" />
            <span className="typo-eyebrow text-[#080A08]">
              Start a Conversation
            </span>
            <span className="block w-8 h-[2px] bg-[#C8A96E]" />
          </motion.div>

          {/* Headline: clamp(48px, 5vw, 76px), 800, -0.04em */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[38px] sm:text-[56px] lg:text-[72px] font-extrabold text-[#080A08] tracking-tight leading-[1.05]"
          >
            Ready to build stronger leaders and stronger organisations?
          </motion.h2>

          {/* Supporting Copy: max-width 650px, 17px, line-height 1.6 */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#404D41] text-[16px] sm:text-[18px] leading-[1.6] max-w-[650px]"
          >
            Whether you need executive advisory, a corporate training retreat, a clarity session, or a keynote speaker — let us start with a conversation and build from there.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <button
              onClick={() => { triggerHaptic('medium'); onOpenBooking(); }}
              className="btn-primary bg-[#080A08] text-[#F0F5F0] hover:bg-[#141714] py-4 px-8 typo-btn"
            >
              <span>Book a Consultation</span>
              <span className="btn-arrow bg-[#C8A96E] text-[#080A08]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="#080A08" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            <a
              href="mailto:shalom4impact@gmail.com"
              className="typo-btn text-[#080A08]/75 hover:text-[#080A08] transition-colors py-3 px-4"
            >
              <span>Start an Email Conversation →</span>
            </a>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-[#080A08]/10 w-full"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] uppercase tracking-wider text-[#627364]">shalom4impact@gmail.com</span>
            </div>
            <div className="hidden sm:block h-3 w-[1px] bg-[#080A08]/15" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] uppercase tracking-wider text-[#627364]">Lagos, Nigeria · Global Advisory</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
