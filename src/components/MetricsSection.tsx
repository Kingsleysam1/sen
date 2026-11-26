import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { MomentsSlider } from './MomentsSlider';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

const fmt = (n: number, d: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // The markup carries the final value; the count-up only runs when motion is allowed.
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isInView && ref.current && !reduce) {
      const controls = animate(0, value, {
        duration: 1.6,
        ease: 'easeOut',
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + fmt(val, decimals) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, prefix, suffix, decimals, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}{fmt(value, decimals)}{suffix}
    </span>
  );
}

const IMPACT_STATS = [
  { value: 10000, suffix: '+', decimals: 0, label: 'Leaders & Youths Trained', description: 'Across Africa and international cohorts' },
  { value: 8, suffix: '+', decimals: 0, label: 'Years Public Speaking and Training', description: 'Across different sectors & platforms' },
  { value: 4, suffix: '+', decimals: 0, label: 'Government Engagements', description: 'Governance, corporate advisory and project management' },
  { value: 15, suffix: '+', decimals: 0, label: 'Affiliate Organizations', description: 'Public & corporate institutions' },
];

export function MetricsSection() {
  return (
    <section id="metrics" className="bg-[#F4F4F2] text-[#111] py-24 sm:py-32" aria-labelledby="metrics-heading">
      <div className="site-container">
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 sm:mb-20">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
                Measured Milestones
              </p>
              <h2 id="metrics-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
                The Impact Matrix
              </h2>
            </div>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/10">
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`py-6 sm:py-10 pr-3 sm:pr-8 border-b border-black/10 ${idx % 2 === 1 ? 'pl-4 sm:pl-8 border-l' : ''} ${idx > 0 ? 'lg:pl-8 lg:border-l' : ''}`}
            >
              <div className="text-[clamp(40px,6vw,84px)] font-medium leading-none tracking-[-0.05em] text-[#111]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <h3 className="mt-3 sm:mt-5 text-[16px] sm:text-[18px] font-semibold leading-snug tracking-[-0.01em]">{stat.label}</h3>
              <p className="mt-1 text-[14px] leading-snug text-[#666]">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <MomentsSlider />
    </section>
  );
}
