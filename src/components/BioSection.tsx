import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WordsPullUpMultiStyle, TextSegment } from './WordsPullUpMultiStyle';
import { ScrollRevealedText } from './ScrollRevealedText';
import { ChevronDown, ChevronUp, Award, CheckCircle2 } from 'lucide-react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { GsapHighlight } from './GsapHighlight';
import { useTheme } from '../context/ThemeContext';
import { BlurUpImage } from './BlurUpImage';

export function BioSection() {
  const [showCredentials, setShowCredentials] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const quoteSegments: TextSegment[] = [
    {
      text: "Great organizations don't fail from lack of ambition. They fail from",
      className: `font-normal ${isLight ? 'text-stone-900' : 'text-[#F3F3EE]'}`,
    },
    {
      text: 'lack of clarity.',
      className: `font-dm-serif italic font-normal ${isLight ? 'text-amber-800' : 'text-[#C8C3A7]'}`,
    },
  ];

  return (
    <section id="bio" className={`py-16 sm:py-24 px-6 md:px-12 flex justify-center items-center transition-colors duration-500 ${
      isLight ? 'bg-[#FAF9F5]' : 'bg-[#0A0B0D]'
    }`}>
      <div className={`backdrop-blur-sm rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:p-20 max-w-7xl w-full space-y-12 shadow-2xl transition-all duration-500 ${
        isLight
          ? 'bg-white/95 border border-stone-200/90 shadow-stone-200'
          : 'bg-[#111317]/90 border border-white/5 shadow-2xl'
      }`}>
        
        {/* Top Label */}
        <GsapScrollReveal>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[#C8C3A7] text-xs font-mono uppercase tracking-[0.25em]">
              EXECUTIVE PROFILE & PHILOSOPHY
            </span>
            <span className="text-xs font-mono text-gray-500">
              SHALOM C. ERNEST
            </span>
          </div>
        </GsapScrollReveal>

        {/* Editorial Grid with Executive Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
          
          {/* Executive Portrait Card (5 cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-black aspect-[4/5] shadow-2xl">
            <BlurUpImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80&sat=-100"
              alt="Shalom C. Ernest - Executive Advisory & Leadership Consultant"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-amber-300 text-[10px] uppercase font-mono tracking-widest bg-amber-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 inline-block">
                FIMC & CMC ADVISORY
              </span>
              <h3 className="text-lg font-medium text-[#F3F3EE]">Shalom C. Ernest</h3>
              <p className="text-xs text-gray-400 font-light">Lagos & Abuja, Nigeria &bull; Global Executive Retainers</p>
            </div>
          </div>

          {/* Statement & Concise Story (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left pt-1 sm:pt-2">
            <WordsPullUpMultiStyle
              segments={quoteSegments}
              className="text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[44px] leading-[1.18] font-normal tracking-tight w-full max-w-2xl"
              staggerDelay={0.04}
            />

            {/* 2-3 Concise Sentences of Real Story */}
            <div className={`space-y-4 text-base sm:text-lg leading-relaxed font-light ${
              isLight ? 'text-stone-700' : 'text-[#E2DFD2]/90'
            }`}>
              <p>
                Shalom C. Ernest is a <GsapHighlight delay={0.2}>Management Consultant</GsapHighlight>, <GsapHighlight delay={0.4}>Certified Management Specialist</GsapHighlight> (CMC, FIMC), and Youth Development Lead with nearly a decade of experience advising corporate, public, and non-profit leaders across Africa.
              </p>
              <p>
                He specializes in <GsapHighlight delay={0.6}>eliminating operational noise</GsapHighlight>, instituting governance alignment, and building high-performance execution frameworks that translate strategic vision into <GsapHighlight delay={0.8}>measurable velocity</GsapHighlight>.
              </p>
            </div>

            {/* Restrained Mark-Strip */}
            <div className="pt-2">
              <div className="flex items-center gap-3 flex-wrap text-xs font-mono text-gray-400">
                <span className="text-[#C8C3A7] font-semibold">FIMC</span>
                <span>&bull;</span>
                <span className="text-[#C8C3A7] font-semibold">CMC</span>
                <span>&bull;</span>
                <span>Fellow, Institute of Management Consultants</span>
                <span>&bull;</span>
                <span>Covenant University Alumnus</span>
              </div>
            </div>

            {/* Credentials Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setShowCredentials(!showCredentials)}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#C8C3A7] hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-full border border-white/10 bg-white/5"
              >
                <span>{showCredentials ? 'Hide Full Certifications & Governance' : 'View Full Certifications & Governance'}</span>
                {showCredentials ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Certifications & Governance Detail (Triaged behind toggle) */}
        {showCredentials && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#C8C3A7] font-mono text-xs uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>Certifications & Governance</span>
              </div>
              <div className="space-y-2.5">
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="text-sm font-medium text-[#F3F3EE]">FIMC & CMC</div>
                  <div className="text-xs text-gray-400 font-light">Fellow of the Institute of Management Consultants (IMC) & Certified Management Consultant</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="text-sm font-medium text-[#F3F3EE]">Certified Management Specialist (Distinction)</div>
                  <div className="text-xs text-gray-400 font-light">London Graduate School - Time Management & Corporate Alignment</div>
                </div>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="text-sm font-medium text-[#F3F3EE]">M.Sc. Candidate & Covenant Alumnus</div>
                  <div className="text-xs text-gray-400 font-light">Strategic Leadership at Covenant University, Nigeria</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#C8C3A7] font-mono text-xs uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" />
                <span>Institutional Affiliations & Honors</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                <li className="bg-black/50 p-3 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-[#C8C3A7] font-mono">&bull;</span>
                  <span>Inspired to Lead Institute (Certified by John Maxwell Team)</span>
                </li>
                <li className="bg-black/50 p-3 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-[#C8C3A7] font-mono">&bull;</span>
                  <span>Fellow of the Lateef Jakande Leadership Academy</span>
                </li>
                <li className="bg-black/50 p-3 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-[#C8C3A7] font-mono">&bull;</span>
                  <span>Active Mentor within Tony Elumelu Foundation (TEF) Network</span>
                </li>
                <li className="bg-black/50 p-3 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-[#C8C3A7] font-mono">&bull;</span>
                  <span>Friends for Leadership Network Alumnus (120+ Nations)</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
