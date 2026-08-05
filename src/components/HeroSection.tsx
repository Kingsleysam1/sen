import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './WordsPullUp';
import { Navbar } from './Navbar';
import { PROFILE_DATA } from '../data/shalomData';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';

interface HeroSectionProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

export function HeroSection({ onNavClick, onOpenBooking }: HeroSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className={`relative min-h-screen w-full p-3 sm:p-5 md:p-6 transition-colors duration-500 ${isLight ? 'bg-[#FAF9F5]' : 'bg-[#0A0B0D]'}`}>
      <div className={`relative min-h-[92vh] sm:min-h-screen w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-500 ${
        isLight
          ? 'bg-[#F2F0E8] border border-stone-300/80 shadow-gray-200'
          : 'bg-[#0D0E11] border border-white/10'
      }`}>
        
        {/* Background Cinematic Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 filter transition-all duration-500 ${
            isLight
              ? 'brightness-[0.98] contrast-105 saturate-90 opacity-60'
              : 'brightness-[0.70] contrast-115 saturate-80 opacity-75'
          }`}
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none z-[1]" />

        {/* Ambient Gradient Mask */}
        <div className={`absolute inset-0 z-[2] pointer-events-none transition-all duration-500 ${
          isLight
            ? 'bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/20 to-transparent'
            : 'bg-gradient-to-t from-[#0D0E11] via-transparent to-[#0D0E11]/40'
        }`} />

        {/* Top Navbar */}
        <Navbar onNavClick={onNavClick} onOpenBooking={onOpenBooking} />

        {/* Hero Content (bottom-aligned) */}
        <div className="relative z-10 mt-auto p-6 sm:p-10 md:p-14 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end max-w-7xl mx-auto">
            
            {/* Left 8 columns for Central Headline */}
            <div className="lg:col-span-8 flex flex-col justify-end space-y-4">
              <WordsPullUp
                text="Lead with Clarity. Build with Purpose."
                showAsterisk={true}
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal sm:font-medium leading-[1.08] tracking-tight select-none ${
                  isLight ? 'text-stone-900' : 'text-[#F3F3EE]'
                }`}
              />
            </div>

            {/* Right 4 columns for description + CTA */}
            <div className="lg:col-span-4 space-y-6 pb-1 lg:pb-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-md font-light ${
                  isLight ? 'text-stone-700' : 'text-[#E2DFD2]/80'
                }`}
              >
                Helping visionary leaders remove operational complexity, align strategy, and build organizations that endure across Africa and globally.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-4 flex-wrap pt-2"
              >
                <button
                  onClick={() => {
                    triggerHaptic('medium');
                    onOpenBooking();
                  }}
                  className={`group inline-flex items-center gap-3 font-semibold text-xs sm:text-sm pl-6 pr-2.5 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-xl tracking-tight ${
                    isLight
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-[#E2DFD2] hover:bg-white text-black'
                  }`}
                >
                  <span>Book a Strategy Session</span>
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isLight ? 'bg-amber-900 text-amber-100' : 'bg-black text-[#E2DFD2]'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => {
                    triggerHaptic('light');
                    onNavClick('bio');
                  }}
                  className={`text-xs sm:text-sm transition-colors cursor-pointer font-medium underline underline-offset-4 tracking-tight ${
                    isLight ? 'text-stone-700 hover:text-stone-900' : 'text-[#E2DFD2]/80 hover:text-[#E2DFD2]'
                  }`}
                >
                  Explore the Journey
                </button>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


