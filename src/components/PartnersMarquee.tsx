import React from 'react';
import { motion } from 'motion/react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { useTheme } from '../context/ThemeContext';

const TRUSTED_ORGANIZATIONS = [
  "African Union",
  "American University of Nigeria",
  "G-Organization",
  "A'Doo Arts & Media",
  "Taraba State University",
  "University of Jos",
  "African Film Institute",
  "Hand of Favor Foundation",
  "Impact Training Room",
  "Pannyword",
  "Nobis Solutions",
  "Youth Ministers International (YMI)"
];

export function PartnersMarquee() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Duplicate list twice to ensure infinite seamless looping
  const marqueeItems = [...TRUSTED_ORGANIZATIONS, ...TRUSTED_ORGANIZATIONS];

  return (
    <section
      id="partners"
      className={`py-12 overflow-hidden relative transition-colors duration-500 border-y ${
        isLight ? 'bg-[#FAF9F5] border-stone-200/80' : 'bg-[#0A0B0D] border-white/10'
      }`}
    >
      <GsapScrollReveal>
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <span
            className={`text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] ${
              isLight ? 'text-amber-800 font-semibold' : 'text-[#C8C3A7]'
            }`}
          >
            TRUSTED BY
          </span>
        </div>
      </GsapScrollReveal>

      <div className="relative w-full overflow-hidden py-2">
        {/* Soft edge fade overlays */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none bg-gradient-to-r ${
            isLight ? 'from-[#FAF9F5] to-transparent' : 'from-[#0A0B0D] to-transparent'
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none bg-gradient-to-l ${
            isLight ? 'from-[#FAF9F5] to-transparent' : 'from-[#0A0B0D] to-transparent'
          }`}
        />

        {/* Straight Horizontal Marquee Track */}
        <motion.div
          className="flex whitespace-nowrap items-center gap-8 sm:gap-12 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          }}
        >
          {marqueeItems.map((org, index) => (
            <div key={index} className="flex items-center gap-8 sm:gap-12">
              <span
                className={`text-sm sm:text-base font-mono font-medium uppercase tracking-widest transition-colors ${
                  isLight ? 'text-stone-800 hover:text-amber-800' : 'text-[#E2DFD2]/80 hover:text-[#C8C3A7]'
                }`}
              >
                {org}
              </span>
              <span className={`text-xs ${isLight ? 'text-amber-700/60' : 'text-[#C8C3A7]/50'}`}>
                ✦
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}




