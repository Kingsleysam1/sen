import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
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
    url: 'https://www.instagram.com/leadviewconsulting',
    linkLabel: 'on Instagram',
    image: PHOTOS.programLeadview,
    alt: 'Shalom Ernest leading a training session',
    position: '38% 30%',
  },
  {
    number: '02',
    name: 'Clarity Conclave',
    tagline: 'Thought Leadership & Clarity Hub',
    url: 'https://www.instagram.com/clarityconclave',
    linkLabel: 'on Instagram',
    image: PHOTOS.programClarity,
    alt: 'Shalom Ernest speaking from an armchair at a Clarity Conclave session',
    position: '62% 40%',
  },
  {
    number: '03',
    name: 'Youth Making Impact',
    tagline: 'Youth Development Ecosystem',
    url: 'https://youthmakingimpact.org/',
    linkLabel: 'website',
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

        <div className="relative">
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
              <a
                key={program.number}
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                data-card
                aria-label={`${program.name} ${program.linkLabel} (opens in a new tab)`}
                onClick={() => triggerHaptic('light')}
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
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-white group-hover:bg-white group-hover:text-black transition-colors">
                    {program.linkLabel === 'website' ? 'Visit website' : 'View on Instagram'} <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Phone slider arrows, over the cards */}
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous program"
          className={`sm:hidden absolute left-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/55 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300 cursor-pointer ${active === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next program"
          className={`sm:hidden absolute right-1 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 cursor-pointer ${active === PROGRAMS.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronRight size={24} />
        </button>
        </div>

        {/* Phone position: segmented bar plus the program name */}
        <div className="sm:hidden mt-5">
          <div className="flex gap-2" role="tablist" aria-label="Choose a program">
            {PROGRAMS.map((p, i) => (
              <button
                key={p.number}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show ${p.name}`}
                onClick={() => goTo(i)}
                className="flex-1 h-8 flex items-center cursor-pointer"
              >
                <span className={`block w-full h-1 rounded-full transition-colors duration-300 ${active === i ? 'bg-white' : 'bg-white/20'}`} />
              </button>
            ))}
          </div>
          <p className="mt-1 text-[14px] text-white/70" aria-live="polite">
            <span className="text-white font-semibold">{String(active + 1).padStart(2, '0')}</span> / {String(PROGRAMS.length).padStart(2, '0')} · {PROGRAMS[active].name}
          </p>
        </div>
      </div>
    </section>
  );
}
