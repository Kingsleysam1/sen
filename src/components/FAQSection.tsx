import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="bg-[#0A0908] border-t border-white/[0.08]"
      aria-labelledby="faq-heading"
    >
      <div className="site-container section-padding">
        {/* ── Uniform Section Header (matches Testimonials) ── */}
        <GsapScrollReveal>
          <div className="flex items-center gap-3 mb-12 sm:mb-16">
            <span className="block w-8 h-[2px] bg-[#C8A96E]" />
            <h2
              id="faq-heading"
              className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C8A96E]"
            >
              FAQ
            </h2>
          </div>
        </GsapScrollReveal>

        {/* ── Accordion List ── */}
        <div className="max-w-4xl mx-auto border-t border-white/[0.08]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="border-b border-white/[0.08]"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] sm:text-[19px] font-semibold text-white group-hover:text-[#C8A96E] transition-colors leading-snug tracking-tight">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-7 h-7 rounded-full border border-white/[0.1] group-hover:border-[#C8A96E]/50 flex items-center justify-center text-stone-400 group-hover:text-[#C8A96E] transition-colors text-sm mt-0.5"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-stone-400 text-[15px] sm:text-[16px] pb-6 leading-[1.7] pr-6 font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
