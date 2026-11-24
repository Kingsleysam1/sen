import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../data/photos';

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

const initials = (name: string) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative bg-black text-white overflow-hidden" aria-labelledby="testimonials-heading">
      <img
        src={PHOTOS.podiumBlue}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[50%_25%] opacity-45"
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.45) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative site-container py-24 sm:py-36">
        <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-white/70 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8AC4FF]" aria-hidden="true" />
          <span id="testimonials-heading">Executive Testimonials</span>
        </p>

        <div className="min-h-[300px] sm:min-h-[260px] max-w-[980px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="text-[clamp(22px,2.9vw,38px)] font-medium leading-[1.28] tracking-[-0.025em]">
                "{current.quote}"
              </blockquote>
              <figcaption className="mt-7 text-[15px]">
                <span className="font-semibold">{current.name}</span>
                <span className="text-white/65"> · {current.role}, {current.organisation}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 sm:gap-10" role="tablist" aria-label="Choose a testimonial">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setCurrentIndex(i)}
                className="flex flex-col items-center text-center gap-2 cursor-pointer group w-[110px]"
              >
                <span
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-[15px] font-semibold transition-all ${
                    isActive ? 'bg-white text-black ring-2 ring-[#8AC4FF] ring-offset-4 ring-offset-black' : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                  }`}
                >
                  {initials(t.name)}
                </span>
                <span className={`text-[13px] font-semibold leading-tight ${isActive ? 'text-white' : 'text-white/75'}`}>{t.name}</span>
                <span className="text-[11px] text-white/65 leading-tight">{t.role}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
