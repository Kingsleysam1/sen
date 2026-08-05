import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { INITIATIVES, Initiative } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';
import { useTheme } from '../context/ThemeContext';
import { BlurUpImage } from './BlurUpImage';

interface InitiativesSectionProps {
  onOpenBooking: () => void;
}

function SecondaryInitiativeCard({
  initiative,
  isInView,
  index,
  onOpenBooking,
}: {
  key?: React.Key;
  initiative: Initiative;
  isInView: boolean;
  index: number;
  onOpenBooking: () => void;
}) {
  const [showHighlights, setShowHighlights] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Colorful theme per card index
  const themeAccents = [
    { badge: isLight ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-amber-500/20 text-amber-300 border-amber-500/30", glow: "group-hover:border-amber-500/40", icon: "text-amber-500" },
    { badge: isLight ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", glow: "group-hover:border-emerald-500/40", icon: "text-emerald-500" },
    { badge: isLight ? "bg-indigo-100 text-indigo-900 border-indigo-300" : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30", glow: "group-hover:border-indigo-500/40", icon: "text-indigo-500" },
    { badge: isLight ? "bg-rose-100 text-rose-900 border-rose-300" : "bg-rose-500/20 text-rose-300 border-rose-500/30", glow: "group-hover:border-rose-500/40", icon: "text-rose-500" }
  ];

  const currentAccent = themeAccents[index % themeAccents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-between min-h-[380px] border shadow-xl ${currentAccent.glow} transition-all duration-300 group hover:shadow-2xl ${
        isLight
          ? 'bg-white border-stone-200/90 hover:border-amber-400'
          : 'bg-[#111317]/90 border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top Image Header */}
      <div className="relative h-44 overflow-hidden bg-black">
        <BlurUpImage
          src={initiative.image}
          alt={initiative.title}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/30 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[10px] font-mono font-medium px-2.5 py-1 rounded-full border backdrop-blur-md ${currentAccent.badge}`}>
            {initiative.subtitle}
          </span>
          <span className="text-[10px] font-mono text-gray-300 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
            {initiative.number}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-[#F3F3EE] group-hover:text-amber-200 transition-colors">
            {initiative.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            {initiative.description}
          </p>
        </div>

        {/* Triage: Toggle secondary highlights */}
        <div>
          <button
            onClick={() => setShowHighlights(!showHighlights)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C8C3A7] hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>{showHighlights ? 'Hide Key Highlights' : 'View Key Highlights'}</span>
            {showHighlights ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHighlights && (
            <ul className="space-y-2 pt-3 border-t border-white/10 mt-2">
              {initiative.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2 text-xs text-gray-300 font-light">
                  <Check className={`w-3.5 h-3.5 ${currentAccent.icon} shrink-0 mt-0.5`} />
                  <span className="leading-tight">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom Link */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={onOpenBooking}
            className="group/btn inline-flex items-center gap-1.5 text-xs text-[#E2DFD2] hover:text-amber-300 transition-colors cursor-pointer font-medium"
          >
            <span>Inquire About Engagement</span>
            <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function InitiativesSection({ onOpenBooking }: InitiativesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="initiatives" className={`min-h-screen py-20 sm:py-28 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
      isLight ? 'bg-[#FAF9F5] text-stone-900' : 'bg-[#0A0B0D] text-[#F3F3EE]'
    }`}>
      {/* Subtle bg-noise overlay */}
      <div className="bg-noise opacity-[0.1] absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Clean top divider & action button */}
        <GsapScrollReveal>
          <div className="flex items-center justify-between pb-2">
            <span className={`text-xs font-mono uppercase tracking-[0.25em] ${
              isLight ? 'text-amber-800 font-semibold' : 'text-[#C8C3A7]'
            }`}>
              SERVICES & CORE INITIATIVES
            </span>
            <button
              onClick={onOpenBooking}
              className={`inline-flex items-center gap-2 font-medium text-xs sm:text-sm px-5 py-2 rounded-full transition-all duration-300 cursor-pointer shrink-0 shadow-md ${
                isLight
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-[#E2DFD2] hover:bg-white text-black'
              }`}
            >
              <span>Request Advisory Briefing</span>
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </button>
          </div>
        </GsapScrollReveal>

        {/* 4-column card grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {INITIATIVES.map((initiative, index) => {
            if (index === 0) {
              return (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative rounded-2xl overflow-hidden bg-[#111317] min-h-[380px] p-6 sm:p-8 flex flex-col justify-between group shadow-xl border border-white/10"
                >
                  <video
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 filter contrast-125 brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-[1]" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#C8C3A7] bg-black/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                      {initiative.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2BA6E] bg-black/80 px-2.5 py-1 rounded-full border border-[#E2BA6E]/30 backdrop-blur-md">
                      Executive Strategy
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-medium text-[#F3F3EE]">
                      {initiative.title}
                    </h3>
                    <p className="text-xs text-[#C8C3A7] font-mono uppercase tracking-wider">
                      Executive Strategy & Advisory Hub
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      {initiative.description}
                    </p>
                    <button
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[#C8C3A7] hover:text-white transition-colors cursor-pointer pt-2"
                    >
                      <span>Explore Advisory Briefing</span>
                      <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                    </button>
                  </div>
                </motion.div>
              );
            }

            return (
              <SecondaryInitiativeCard
                key={initiative.id}
                initiative={initiative}
                isInView={isInView}
                index={index}
                onOpenBooking={onOpenBooking}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
