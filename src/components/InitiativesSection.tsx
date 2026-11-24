import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GsapScrollReveal } from './GsapScrollReveal';
import { triggerHaptic } from '../utils/haptics';
import { PHOTOS } from '../data/photos';

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
    image: PHOTOS.conference,
    pos: '50% 40%',
  },
  {
    number: '02',
    title: 'Executive Leadership Training',
    subtitle: 'Corporate & Institutional',
    description:
      'Immersive executive training programmes designed for C-suite leaders, management teams, and high-potential professionals. Custom retreats, cohort programmes, and modular workshops.',
    tags: ['Custom Retreats', 'On-site / Virtual'],
    image: PHOTOS.stageWide,
    pos: '55% 35%',
  },
  {
    number: '03',
    title: 'Corporate Alignment Advisory',
    subtitle: 'Systemic Consulting',
    description:
      'Multi-week governance and alignment engagements addressing strategic drift, team velocity, decision-making infrastructure, and cross-functional execution discipline.',
    tags: ['2–12 Week Engagements', 'Systemic'],
    image: PHOTOS.whiteboard,
    pos: '40% 40%',
  },
  {
    number: '04',
    title: 'Clarity & Legacy Coaching',
    subtitle: 'Executive Retainer',
    description:
      'Sustained 1-on-1 advisory for founders, directors, and executives navigating inflection points in their personal leadership trajectory, organisational legacy, and life purpose.',
    tags: ['Monthly Retainer', 'Private'],
    image: PHOTOS.withGuest,
    pos: '50% 30%',
  },
];

type Row = typeof EXPERTISE_ROWS[number];

function Detail({ item, onOpenBooking }: { item: Row; onOpenBooking: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="aspect-[4/3] lg:aspect-[16/10] rounded-[22px] overflow-hidden bg-white/5">
        <img
          src={item.image}
          alt={item.title}
          style={{ objectPosition: item.pos }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8AC4FF]">{item.subtitle}</p>
      <p className="text-white/75 text-[16px] leading-[1.65] lg:min-h-[8.25em] xl:min-h-[6.6em]">{item.description}</p>
      <div className="flex flex-wrap items-center gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="text-[12px] font-medium text-white/80 bg-white/[0.08] px-3 py-1 rounded-full">{tag}</span>
        ))}
        {/* Between lg and xl the button always takes its own line, so every area has the same height */}
        <span className="hidden lg:block xl:hidden basis-full h-0" aria-hidden="true" />
        <button
          onClick={(e) => { e.stopPropagation(); triggerHaptic('medium'); onOpenBooking(); }}
          className="lg:mt-2 xl:mt-0 ml-auto lg:ml-0 xl:ml-auto px-6 py-3 rounded-full bg-white hover:bg-[#8AC4FF] text-black text-[14px] font-semibold transition-colors cursor-pointer"
        >
          Enquire About This
        </button>
      </div>
    </div>
  );
}

export function InitiativesSection({ onOpenBooking }: InitiativesSectionProps) {
  const [active, setActive] = useState(0);
  const current = EXPERTISE_ROWS[active];

  return (
    <section id="initiatives" className="bg-black text-white" aria-labelledby="expertise-heading">
      <div className="site-container section-padding">
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8AC4FF]" aria-hidden="true" />
                Areas of Expertise
              </p>
              <h2 id="expertise-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
                Where Vision Meets Execution
              </h2>
            </div>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch">
          {/* Titles */}
          <ul className="lg:col-span-7 lg:flex lg:flex-col" role="tablist" aria-label="Areas of expertise">
            {EXPERTISE_ROWS.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.number} className="border-t border-white/10 last:border-b lg:flex-1 lg:flex lg:flex-col lg:justify-center">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => { triggerHaptic('selection'); setActive(i); }}
                    onMouseEnter={() => setActive(i)}
                    className="w-full flex items-baseline gap-4 sm:gap-6 py-5 sm:py-7 text-left cursor-pointer group"
                  >
                    <span className={`text-[13px] font-semibold tabular-nums transition-colors ${isActive ? 'text-[#8AC4FF]' : 'text-white/35'}`}>
                      {item.number}
                    </span>
                    <span
                      className={`text-[clamp(26px,3.6vw,48px)] font-medium leading-[1.05] tracking-[-0.035em] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/35 group-hover:text-white/70'
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>

                  {/* Phones: open inline under the title */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="pb-8"><Detail item={item} onOpenBooking={onOpenBooking} /></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop: the photo and details follow the active title */}
          <div className="hidden lg:block lg:col-span-5">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Detail item={current} onOpenBooking={onOpenBooking} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <GsapScrollReveal>
          <div className="mt-20 md:mt-28 max-w-[900px]">
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/50 mb-5">The Approach</p>
            <p className="text-[clamp(24px,3vw,38px)] font-medium leading-[1.2] tracking-[-0.03em] text-white/90">
              "Real leadership is not a title — it is a discipline of clarity, a culture of alignment, and a commitment to measurable progress."
            </p>
          </div>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
