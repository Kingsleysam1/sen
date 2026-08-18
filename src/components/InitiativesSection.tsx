import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GsapScrollReveal } from './GsapScrollReveal';
import { triggerHaptic } from '../utils/haptics';

interface InitiativesSectionProps {
  onOpenBooking: () => void;
}

const EXPERTISE_ROWS = [
  {
    number: '01',
    title: 'Strategic Discovery & Clarity',
    subtitle: 'Executive Clarity Consulting',
    description:
      'A structured diagnostic process to eliminate operational noise, identify the single point of impact, and create a 90-day execution roadmap aligned to your core strategic objectives.',
    tags: ['90-min Virtual', 'On-site Available'],
    image: '/src/assets/images/shalom_ernest_hero_1782810399094.jpg',
  },
  {
    number: '02',
    title: 'Executive Leadership Training',
    subtitle: 'Corporate & Institutional',
    description:
      'Immersive executive training programmes designed for C-suite leaders, management teams, and high-potential professionals. Custom retreats, cohort programmes, and modular workshops.',
    tags: ['Custom Retreats', 'On-site / Virtual'],
    image: '/src/assets/images/LLS_2026-92.jpg',
  },
  {
    number: '03',
    title: 'Corporate Alignment Advisory',
    subtitle: 'Systemic Consulting',
    description:
      'Multi-week governance and alignment engagements addressing strategic drift, team velocity, decision-making infrastructure, and cross-functional execution discipline.',
    tags: ['2–12 Week Engagements', 'Systemic'],
    image: '/src/assets/images/_DSC0794.jpg',
  },
  {
    number: '04',
    title: 'Clarity & Legacy Coaching',
    subtitle: 'Executive Retainer',
    description:
      'Sustained 1-on-1 advisory for founders, directors, and executives navigating inflection points in their personal leadership trajectory, organisational legacy, and life purpose.',
    tags: ['Monthly Retainer', 'Private'],
    image: '/src/assets/images/20260629_070734.jpg',
  },
];

function ExpertiseRow({
  item,
  index,
  onOpenBooking,
}: {
  key?: React.Key;
  item: typeof EXPERTISE_ROWS[0];
  index: number;
  onOpenBooking: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`border-t border-white/[0.08] cursor-pointer group transition-colors duration-300 ${
        isOpen ? 'bg-[#0E110E]' : 'hover:bg-white/[0.02]'
      }`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Row Header */}
      <div className="py-6 sm:py-8 px-2 sm:px-4 flex items-start gap-5 sm:gap-8">
        {/* Number */}
        <span className="font-mono text-[18px] sm:text-[22px] font-bold text-[#C8A96E]/50 group-hover:text-[#C8A96E] transition-colors shrink-0 mt-1">
          {item.number}
        </span>

        {/* Title block */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="typo-card-title text-[#F0F5F0] group-hover:text-[#C8A96E] transition-colors">
              {item.title}
            </h3>
            <span className="typo-eyebrow text-[#627364] group-hover:text-[#9EAEA0] transition-colors">
              {item.subtitle}
            </span>
          </div>

          {/* Tags + Arrow */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] border border-white/[0.08] text-[#627364] px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full border border-white/[0.1] group-hover:border-[#C8A96E]/50 flex items-center justify-center shrink-0 text-[#9EAEA0] group-hover:text-[#C8A96E] transition-colors duration-300"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.span>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-2 sm:px-4 pl-10 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 flex flex-col gap-5">
                <p className="typo-card-desc">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-[0.1em] border border-white/[0.08] text-[#627364] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHaptic('medium');
                    onOpenBooking();
                  }}
                  className="self-start btn-primary py-2.5 px-5 typo-btn mt-2"
                >
                  <span>Enquire About This</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
              <div className="md:col-span-5 overflow-hidden aspect-[16/9] rounded-sm border border-white/[0.08]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[30%] contrast-105 brightness-85"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function InitiativesSection({ onOpenBooking }: InitiativesSectionProps) {
  return (
    <section
      id="initiatives"
      className="bg-[#080A08]"
      aria-labelledby="expertise-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#C8A96E]" />
                <span className="typo-eyebrow">Areas of Expertise</span>
              </div>
              <h2
                id="expertise-heading"
                className="typo-section-heading text-[#F0F5F0]"
              >
                Where Vision Meets{' '}
                <span className="text-[#C8A96E]">Execution</span>
              </h2>
            </div>
            <button
              onClick={() => { triggerHaptic('medium'); onOpenBooking(); }}
              className="self-start lg:self-end btn-primary py-3 px-6 typo-btn"
            >
              <span>Book a Session</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </GsapScrollReveal>

        {/* ── Expertise Rows ── */}
        <div className="border-b border-white/[0.08]">
          {EXPERTISE_ROWS.map((item, index) => (
            <ExpertiseRow
              key={item.number}
              item={item}
              index={index}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>

        {/* ── Philosophy Statement ── */}
        <GsapScrollReveal>
          <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-6 md:gap-16 border-t border-white/[0.08] pt-10">
            <span className="typo-eyebrow shrink-0">The Approach</span>
            <p className="typo-statement text-[#9EAEA0]">
              "Real leadership is not a title — it is a discipline of clarity, a culture of alignment, and a commitment to measurable progress."
            </p>
          </div>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
