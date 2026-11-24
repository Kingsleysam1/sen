import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { PHOTOS } from '../data/photos';

interface HeroSectionProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ onNavClick, onOpenBooking }: HeroSectionProps) {
  return (
    <section id="hero" className="relative w-full bg-black pt-[64px] sm:pt-[72px]" aria-label="Hero">
      <Navbar onNavClick={onNavClick} onOpenBooking={onOpenBooking} />

      <div className="px-3 sm:px-5 pb-3 sm:pb-5">
        <div className="relative overflow-hidden rounded-[22px] sm:rounded-[28px] h-[calc(100svh-76px)] sm:h-[calc(100svh-92px)] min-h-[560px] max-h-[920px] bg-[#0B1626]">
          {/* Photo: Shalom on stage. Portrait crop on phones, wide on desktop. */}
          <motion.picture
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0 block"
          >
            <source media="(min-width: 768px)" srcSet={PHOTOS.stageWide} />
            <img
              src={PHOTOS.stagePodium}
              alt="Shalom C. Ernest speaking on stage at a leadership summit"
              className="w-full h-full object-cover object-[50%_22%] md:object-[60%_35%]"
              fetchPriority="high"
            />
          </motion.picture>

          {/* Legibility: dark from the bottom and the left, photo stays bright on the right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.55) 38%, rgba(5,10,20,0) 65%), linear-gradient(to right, rgba(5,10,20,0.75) 0%, rgba(5,10,20,0.25) 45%, rgba(5,10,20,0) 70%)',
            }}
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <div className="max-w-[720px]">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                className="text-white/80 font-semibold text-[10px] sm:text-[12px] tracking-[0.18em] uppercase mb-4"
              >
                Management Consultant • Strategic Advisor • Institution Builder
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
                className="text-white font-medium tracking-[-0.045em] leading-[0.95] text-[clamp(54px,9vw,128px)]"
              >
                Shalom Ernest
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                className="mt-5 sm:mt-6 text-white/85 text-[16px] sm:text-[19px] leading-[1.55] max-w-[560px]"
              >
                I inspire and facilitate purposeful transformation in individuals &amp; organizations to create meaningful impact &amp; maximize potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
                className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3"
              >
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white hover:bg-[#8AC4FF] text-black text-[14px] sm:text-[15px] font-semibold transition-colors cursor-pointer"
                >
                  Book Shalom Ernest
                </button>
                <button
                  onClick={() => onNavClick('bio')}
                  className="px-5 py-3 sm:py-3.5 rounded-full text-white/85 hover:text-white underline-offset-4 hover:underline text-[14px] sm:text-[15px] font-semibold transition-colors cursor-pointer"
                >
                  Meet Shalom
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mt-6 text-white/70 text-[13px] sm:text-[14px] font-medium"
              >
                10,000+ trained <span aria-hidden="true" className="mx-2 text-white/35">·</span> FIMC, CMC, AILCS
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
