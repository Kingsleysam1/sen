import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { GsapScrollReveal } from './GsapScrollReveal';

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
  {
    value: 10000,
    suffix: '+',
    decimals: 0,
    label: 'Leaders & Youth Trained',
    description: 'Across Africa and international cohorts',
  },
  {
    value: 9,
    suffix: '+',
    decimals: 0,
    label: 'Years Executive Advisory',
    description: 'Governance & corporate advisory',
  },
  {
    value: 95,
    suffix: '%',
    decimals: 0,
    label: 'Client Satisfaction Rate',
    description: 'Executive post-session audits',
  },
  {
    value: 15,
    suffix: '+',
    decimals: 0,
    label: 'Partner Organisations',
    description: 'Public & corporate institutions',
  },
];

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="bg-[#0A0908] pb-24 sm:pb-32 border-b border-white/[0.08]"
      aria-labelledby="metrics-heading"
    >
      <div className="site-container">

        {/* ── Centered Header ── */}
        <GsapScrollReveal>
          <div className="flex flex-col items-center text-center space-y-3 mb-16 sm:mb-20">
            <span className="text-[#C8A96E] font-bold text-[13px] tracking-[0.2em] uppercase">
              MEASURED MILESTONES
            </span>
            <h2
              id="metrics-heading"
              className="text-[40px] sm:text-[56px] text-white font-bold leading-tight tracking-tight font-sans"
            >
              The <span className="text-[#C8A96E]">Impact</span> Matrix
            </h2>
          </div>
        </GsapScrollReveal>

        {/* ── 4-Column Stats Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#141210] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-2xl p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 group shadow-lg hover:shadow-[0_10px_30px_rgba(200,169,110,0.1)]"
            >
              {/* Stat Number in Brown/Gold Sans-serif */}
              <div className="text-[48px] sm:text-[60px] font-extrabold text-[#C8A96E] leading-none tracking-tight font-sans">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>

              {/* Stat Description */}
              <div className="space-y-1 mt-6">
                <h3 className="text-white text-[15px] sm:text-[16px] font-semibold tracking-tight">
                  {stat.label}
                </h3>
                <p className="text-stone-400 text-[13px] leading-snug">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
