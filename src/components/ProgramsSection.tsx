import React from 'react';
import { motion } from 'framer-motion';
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
    tagline: 'Enterprise Training & Advisory Firm',
    image: PHOTOS.podiumBlue2,
    alt: 'Shalom Ernest speaking from a podium on stage',
    position: '50% 30%',
  },
  {
    number: '02',
    name: 'Clarity Conclave',
    tagline: 'Thought Leadership & Clarity Hub',
    image: PHOTOS.worldMap,
    alt: 'Shalom Ernest speaking at a wooden podium in front of a large world map',
    position: '50% 42%',
  },
  {
    number: '03',
    name: 'Youth Making Impact',
    tagline: 'Pan-African Youth Development',
    image: PHOTOS.outdoors,
    alt: 'Shalom Ernest standing beside a guest outdoors',
    position: '50% 35%',
  },
];

export function ProgramsSection({ onOpenBooking }: ProgramsSectionProps) {
  return (
    <section id="programs" className="bg-black text-white" aria-labelledby="programs-heading">
      <div className="site-container pb-24 sm:pb-32 pt-4">
        <GsapScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8AC4FF]" aria-hidden="true" />
                Featured Programs
              </p>
              <h2 id="programs-heading" className="text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.04em]">
                An Ecosystem of Impact
              </h2>
            </div>
            <button
              onClick={() => { triggerHaptic('medium'); onOpenBooking(); }}
              className="self-start sm:self-end shrink-0 text-[14px] font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Get Involved ›
            </button>
          </div>
        </GsapScrollReveal>

        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
          <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5">
            {PROGRAMS.map((program, idx) => (
              <motion.button
                type="button"
                key={program.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { triggerHaptic('light'); onOpenBooking(); }}
                className="group relative shrink-0 w-[78vw] sm:w-auto aspect-[3/4] overflow-hidden rounded-[22px] text-left cursor-pointer"
              >
                <img
                  src={program.image}
                  alt={program.alt}
                  style={{ objectPosition: program.position }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
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
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
