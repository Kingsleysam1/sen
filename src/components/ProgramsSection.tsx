import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { triggerHaptic } from '../utils/haptics';
import { PHOTOS } from '../data/photos';

interface ProgramsSectionProps {
  onOpenBooking: () => void;
}

const PROGRAMS = [
  {
    number: '01',
    name: 'Leadview Consulting',
    tagline: 'Executive Training & Consulting Firm',
    image: PHOTOS.programLeadview,
    alt: 'Shalom Ernest leading a training session',
    position: '38% 30%',
  },
  {
    number: '02',
    name: 'Clarity Conclave',
    tagline: 'Thought Leadership & Clarity Hub',
    image: PHOTOS.programClarity,
    alt: 'Shalom Ernest speaking from an armchair at a Clarity Conclave session',
    position: '62% 40%',
  },
  {
    number: '03',
    name: 'Youth Making Impact',
    tagline: 'Youth Development Ecosystem',
    image: PHOTOS.programYmi,
    alt: 'Shalom Ernest with the Youth Making Impact team',
    position: '48% 40%',
  },
];

export function ProgramsSection({ onOpenBooking }: ProgramsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cards = (): HTMLElement[] =>
    scrollerRef.current ? Array.from(scrollerRef.current.querySelectorAll<HTMLElement>('[data-card]')) : [];

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const list = cards();
    if (!list.length) return;
    // Closest card to the left edge is the active one.
    let best = 0, bestDist = Infinity;
    list.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - el.scrollLeft - list[0].offsetLeft);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = list.length - 1;
    setActive(best);
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    const list = cards();
    if (!el || !list[i]) return;
    triggerHaptic('light');
    el.scrollTo({ left: list[i].offsetLeft - list[0].offsetLeft, behavior: 'smooth' });
  };

  return (
    <section id="programs" className="bg-black text-white" aria-labelledby="programs-heading">
      <div className="site-container pb-24 sm:pb-32 pt-4">
        <GsapScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8AC4FF]" aria-hidden="true" />
                Featured Programs
              </p>
              <h2 id="programs-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
                An Ecosystem of Impact
              </h2>
            </div>
            <button
              onClick={() => { triggerHaptic('medium'); onOpenBooking(); }}
              className="self-start sm:self-end shrink-0 inline-flex items-center min-h-[44px] text-[14px] font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Get Involved ›
            </button>
          </div>
        </GsapScrollReveal>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:snap-none scroll-px-5"
          aria-roledescription="carousel"
          aria-label="Featured programs"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5"
          >
            {PROGRAMS.map((program, idx) => (
              <button
                type="button"
                key={program.number}
                data-card
                aria-label={`${program.name}, ${idx + 1} of ${PROGRAMS.length}`}
                onClick={() => { triggerHaptic('light'); onOpenBooking(); }}
                className="group relative shrink-0 w-[78vw] max-w-[340px] sm:max-w-none sm:w-auto aspect-[3/4] overflow-hidden rounded-[22px] text-left cursor-pointer snap-start"
              >
                <img
                  src={program.image}
                  alt={program.alt}
                  style={{ objectPosition: program.position }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 42%, rgba(0,0,0,0) 65%)' }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col items-center text-center">
                  <h3 className="text-[clamp(26px,2.6vw,34px)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white">
                    {program.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] text-white/80">{program.tagline}</p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Phone controls: the cards sit side by side, so show that there's more to swipe */}
        <div className="sm:hidden mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose a program">
            {PROGRAMS.map((p, i) => (
              <button
                key={p.number}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show ${p.name}`}
                onClick={() => goTo(i)}
                className="h-11 flex items-center cursor-pointer"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${active === i ? 'w-7 bg-white' : 'w-1.5 bg-white/35'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous program"
              className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer active:scale-95 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === PROGRAMS.length - 1}
              aria-label="Next program"
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 cursor-pointer active:scale-95 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
