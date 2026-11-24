import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { PHOTOS } from '../data/photos';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.6,
        ease: 'easeOut',
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + val.toFixed(decimals) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

const IMPACT_STATS = [
  { value: 10000, suffix: '+', decimals: 0, label: 'Leaders & Youths Trained', description: 'Across Africa and international cohorts' },
  { value: 8, suffix: '+', decimals: 0, label: 'Years Public Speaking and Training', description: 'Across different sectors & platforms' },
  { value: 4, suffix: '+', decimals: 0, label: 'Government Engagements', description: 'Governance, corporate advisory and project management' },
  { value: 15, suffix: '+', decimals: 0, label: 'Affiliate Organizations', description: 'Public & corporate institutions' },
];

// Moments from the work. Captions describe the photo only; confirm names of events before adding them.
const MOMENTS = [
  { src: PHOTOS.podiumBlue,  alt: 'Shalom C. Ernest speaking from a podium', caption: 'On stage', pos: '50% 25%' },
  { src: PHOTOS.whiteboard,  alt: 'Shalom C. Ernest teaching at a flipchart', caption: 'Training session', pos: '40% 40%' },
  { src: PHOTOS.roscongress, alt: 'Shalom C. Ernest outdoors beside a Roscongress sign', caption: 'Roscongress', pos: '45% 50%' },
  { src: PHOTOS.award,       alt: 'Shalom C. Ernest with dignitaries at a ceremony', caption: 'Recognition', pos: '50% 40%' },
  { src: PHOTOS.classroom,   alt: 'Shalom C. Ernest presenting in a classroom', caption: 'Workshop', pos: '35% 40%' },
];

export function MetricsSection() {
  return (
    <section id="metrics" className="bg-[#F4F4F2] text-[#111] py-24 sm:py-32" aria-labelledby="metrics-heading">
      <div className="site-container">
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 sm:mb-20">
            <div>
              <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
                Measured Milestones
              </p>
              <h2 id="metrics-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
                The Impact Matrix
              </h2>
            </div>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/10">
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`py-8 sm:py-10 sm:pr-8 border-b border-black/10 ${idx % 2 === 1 ? 'sm:pl-8 sm:border-l' : ''} ${idx > 0 ? 'lg:pl-8 lg:border-l' : ''}`}
            >
              <div className="text-[clamp(56px,6vw,84px)] font-medium leading-none tracking-[-0.05em] text-[#111]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em]">{stat.label}</h3>
              <p className="mt-1 text-[14px] leading-snug text-[#666]">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Moments strip: real photographs, scrolls sideways on small screens */}
      <div className="mt-16 sm:mt-24 overflow-x-auto no-scrollbar">
        <ul className="site-container flex lg:grid lg:grid-cols-5 gap-4 min-w-max lg:min-w-0">
          {MOMENTS.map((m, i) => (
            <motion.li
              key={m.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="w-[62vw] sm:w-[34vw] lg:w-auto"
            >
              <div className="aspect-[3/4] rounded-[20px] overflow-hidden bg-[#E5E5E2] group">
                <img
                  src={m.src}
                  alt={m.alt}
                  style={{ objectPosition: m.pos }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-[14px] font-semibold text-[#111]">{m.caption}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
