import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { useTheme } from '../context/ThemeContext';

const BOOKING_FAQS = [
  {
    question: "What is your methodology for Executive Clarity Advisory?",
    answer: "We employ a diagnostic-first methodology: auditing operational inputs, mapping friction points across executive leadership, aligning strategic priorities, and implementing lightweight governance frameworks that drive execution velocity."
  },
  {
    question: "What is the typical engagement duration and format?",
    answer: "Engagements range from intensive 90-minute Strategic Discovery Sessions to 2–4 week Alignment Diagnostic Retreats, and 3–6 month Executive Advisory retainers. Sessions are delivered both virtually and on-site globally."
  },
  {
    question: "Do you consult for early-stage startups, enterprises, and non-profits alike?",
    answer: "Yes. Through Leadview Consulting and Clarity Conclave, we tailor institutional frameworks specifically for venture-backed founders, corporate boards, educational institutions, and public sector ministries."
  },
  {
    question: "How do we begin a strategic advisory engagement?",
    answer: "Begin by submitting a request for a Strategic Discovery Session. Our team will review your organizational context, schedule an initial consultation, and propose a customized advisory scope."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-20 sm:py-28 px-6 md:px-12 transition-colors duration-500 ${
      isLight ? 'bg-[#FAF9F5] text-stone-900' : 'bg-[#0A0B0D] text-[#F3F3EE]'
    }`}>
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <GsapScrollReveal>
          <div className="flex flex-col items-center text-center space-y-3">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${
              isLight ? 'text-amber-800 font-semibold' : 'text-[#C8C3A7]'
            }`}>
              ENGAGEMENT ENQUIRIES
            </span>
            <h2 className={`text-3xl sm:text-5xl font-normal ${
              isLight ? 'text-stone-900' : 'text-[#F3F3EE]'
            }`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-sm font-light max-w-md ${
              isLight ? 'text-stone-600' : 'text-gray-400'
            }`}>
              Key details on advisory scope, methodology, and how to begin an executive engagement.
            </p>
          </div>
        </GsapScrollReveal>

        {/* Accordion */}
        <div className="space-y-4">
          {BOOKING_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border overflow-hidden transition-colors shadow-lg ${
                  isLight
                    ? 'bg-white border-stone-200 hover:border-amber-500/50 shadow-stone-200'
                    : 'bg-[#111317] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-base sm:text-lg font-medium ${
                    isLight ? 'text-stone-900' : 'text-[#F3F3EE]'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isLight ? 'text-amber-800' : 'text-[#C8C3A7]'
                    } ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 sm:px-7 pb-7 text-sm sm:text-base font-light leading-relaxed border-t pt-4 ${
                        isLight ? 'text-stone-700 border-stone-200' : 'text-gray-300 border-white/10'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

