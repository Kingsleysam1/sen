import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';

interface HeroSectionProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

export function HeroSection({ onNavClick, onOpenBooking }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.playbackRate = 0.75;
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#0A0908] overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background Video with Overlay ── */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.42] contrast-110 motion-reduce:hidden"
        aria-hidden="true"
      />

      {/* ── Vignette / Gradient Overlays ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0.25) 40%, rgba(10,9,8,0.75) 80%, #0A0908 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Floating Header ── */}
      <Navbar onNavClick={onNavClick} onOpenBooking={onOpenBooking} />

      {/* ── Hero Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-28 sm:pt-36 pb-16">
        <div className="site-container w-full">
          <div className="flex flex-col items-start max-w-6xl">

            {/* Eyebrow: Warm Brown/Gold Uppercase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-3 sm:mb-4"
            >
              <span className="text-[#C8A96E] font-bold text-[13px] sm:text-[15px] tracking-[0.2em] uppercase">
                MANAGEMENT CONSULTANT • STRATEGIC ADVISOR • INSTITUTION BUILDER
              </span>
            </motion.div>

            {/* Giant Dominant Headline: SHALOM ERNEST */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-hero text-white text-[clamp(68px,15vw,190px)] font-normal tracking-[-0.01em] leading-[0.92] uppercase select-none"
            >
              SHALOM ERNEST
            </motion.h1>

            {/* Description on the left */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 sm:mt-8 text-stone-200 text-[16px] sm:text-[18px] leading-[1.65] max-w-[540px] font-normal"
            >
              Building generational legacies, shaping the next generation of African leaders, and redefining what's possible at the intersection of vision and execution.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Center Bottom Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        onClick={() => onNavClick('bio')}
        className="relative z-10 flex flex-col items-center pb-8 cursor-pointer group"
      >
        <div className="w-[3px] h-7 bg-[#C8A96E] rounded-full group-hover:scale-y-110 transition-transform shadow-[0_0_12px_rgba(200,169,110,0.8)]" />
        <span className="text-[12px] text-stone-400 font-medium tracking-wider mt-2.5 group-hover:text-white transition-colors">
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
}
