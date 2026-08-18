import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GsapScrollReveal } from './GsapScrollReveal';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  organisation: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Abiodun Lawal',
    role: 'Managing Director',
    organisation: 'Corporate & Financial Services',
    quote:
      "Shalom's approach to organisational clarity is unlike any I have encountered. Within weeks of our engagement, our management team had a shared language around strategy and execution that transformed how we made decisions. The clarity conclave process is genuinely world-class.",
  },
  {
    id: 2,
    name: 'Ngozi Okafor',
    role: 'Executive Director',
    organisation: 'Non-Profit & Development Sector',
    quote:
      "Working with Shalom was a turning point for our organisation. He diagnosed our structural challenges with precision and gave us a governance framework that our team actually follows. His coaching style combines intellectual rigour with deep human empathy.",
  },
  {
    id: 3,
    name: 'Emmanuel Sule',
    role: 'Founder & CEO',
    organisation: 'Technology & Innovation',
    quote:
      "I have attended many leadership programmes — none came close to the executive training Shalom delivered for our team. He doesn't give generic frameworks; he tailors everything to your context. The transformation in our team culture was visible within a month.",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const current = TESTIMONIALS[currentIndex];

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      className="bg-[#080A08] border-t border-white/[0.08]"
      aria-labelledby="testimonials-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex items-center gap-3 mb-16 md:mb-20">
            <span className="block w-8 h-[2px] bg-[#C8A96E]" />
            <span className="typo-eyebrow">Executive Testimonials</span>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: Controls (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start gap-8">
            {/* Quote Mark */}
            <div
              className="text-[#C8A96E]/20 select-none leading-none text-[90px] sm:text-[120px] font-extrabold"
              aria-hidden="true"
            >
              “
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-white/[0.1] hover:border-[#C8A96E]/50 flex items-center justify-center text-[#9EAEA0] hover:text-[#C8A96E] transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full border border-white/[0.1] hover:border-[#C8A96E]/50 flex items-center justify-center text-[#9EAEA0] hover:text-[#C8A96E] transition-colors cursor-pointer"
              >
                →
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`block h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? 'w-8 bg-[#C8A96E]' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Quote Text (9 cols) */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -25 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8"
              >
                {/* Quote: clamp(28px, 3.5vw, 48px), 500-600, 1.25, -0.025em */}
                <blockquote>
                  <p className="typo-testimonial-quote text-[#F0F5F0]">
                    "{current.quote}"
                  </p>
                </blockquote>

                {/* Author Info */}
                <footer className="flex items-center gap-4 border-t border-white/[0.08] pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center shrink-0">
                    <span className="text-[18px] font-bold text-[#C8A96E]">
                      {current.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="typo-testimonial-author">
                      {current.name}
                    </span>
                    <span className="typo-testimonial-role">
                      {current.role} · {current.organisation}
                    </span>
                  </div>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
