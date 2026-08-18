import React from 'react';
import { motion } from 'framer-motion';
import { GsapScrollReveal } from './GsapScrollReveal';
import { triggerHaptic } from '../utils/haptics';

interface ProgramsSectionProps {
  onOpenBooking: () => void;
}

const PROGRAMS = [
  {
    number: '01',
    name: 'Clarity Conclave',
    tagline: 'Thought Leadership & Clarity Hub',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '02',
    name: 'Leadview Consulting',
    tagline: 'Enterprise Training & Advisory Firm',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '03',
    name: 'Youth Making Impact',
    tagline: 'Pan-African Youth Development',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
];

export function ProgramsSection({ onOpenBooking }: ProgramsSectionProps) {
  return (
    <section
      id="programs"
      className="bg-[#0A0908] border-t border-white/[0.08]"
      aria-labelledby="programs-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-[2px] bg-[#C8A96E]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C8A96E]">
              Featured Programs
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <h2
              id="programs-heading"
              className="text-[36px] sm:text-[50px] text-white font-bold leading-tight tracking-tight font-sans"
            >
              An <span className="text-[#C8A96E]">Ecosystem</span> of Impact
            </h2>
            <button
              onClick={() => { triggerHaptic('medium'); onOpenBooking(); }}
              className="self-start sm:self-end shrink-0 px-5 py-2.5 rounded-full border border-[#C8A96E]/50 hover:border-[#C8A96E] bg-[#C8A96E]/10 hover:bg-[#C8A96E]/20 text-[#C8A96E] text-[13px] font-semibold transition-all cursor-pointer"
            >
              Get Involved →
            </button>
          </div>
        </GsapScrollReveal>

        {/* ── 3-Column Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PROGRAMS.map((program, idx) => (
            <motion.div
              key={program.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => { triggerHaptic('light'); onOpenBooking(); }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer border border-white/[0.07] hover:border-[#C8A96E]/40 transition-colors duration-300"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover grayscale-[30%] brightness-75 contrast-105 group-hover:scale-105 group-hover:brightness-80 transition-all duration-700"
                  loading="lazy"
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.3) 50%, transparent 100%)' }}
              />

              {/* Number — top left */}
              <span className="absolute top-5 left-5 font-mono text-[12px] font-bold text-[#C8A96E] tracking-[0.12em]">
                {program.number}
              </span>

              {/* Title block — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1.5">
                <h3 className="text-[22px] font-bold text-white leading-tight tracking-tight">
                  {program.name}
                </h3>
                <p className="text-[13px] text-stone-400 font-medium">
                  {program.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#C8A96E] text-[12px] font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
