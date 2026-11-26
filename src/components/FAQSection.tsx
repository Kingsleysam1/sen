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
      className="bg-white text-[#111]"
      aria-labelledby="faq-heading"
    >
      <div className="site-container section-padding">
        {/* ── Uniform Section Header (matches Testimonials) ── */}
        <GsapScrollReveal>
          <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
            <h2
              id="faq-heading"
              className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]"
            >
              FAQ
            </h2>
          </div>
        </GsapScrollReveal>

        {/* ── Accordion List ── */}
        <div className="max-w-4xl mx-auto border-t border-black/10">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="border-b border-black/10"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] sm:text-[22px] font-medium text-[#111] leading-snug tracking-[-0.02em]">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-[#F2F2F0] group-hover:bg-black group-hover:text-white flex items-center justify-center text-[#111] transition-colors text-[16px] mt-0.5"
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
                      <p className="text-[#555] text-[16px] pb-6 leading-[1.7] pr-6">
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
