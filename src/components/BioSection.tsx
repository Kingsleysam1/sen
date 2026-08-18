import React from 'react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { BlurUpImage } from './BlurUpImage';

export function BioSection() {
  return (
    <section
      id="bio"
      className="bg-[#0A0908] py-24 sm:py-32"
      aria-labelledby="bio-heading"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT: Statement + Bio Paragraphs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Statement with vertical brown/gold accent bar */}
            <GsapScrollReveal>
              <div className="border-l-2 border-[#C8A96E] pl-6 sm:pl-8">
                <h2
                  id="bio-heading"
                  className="text-[clamp(28px,3.8vw,44px)] font-bold text-white leading-[1.2] tracking-tight font-sans"
                >
                  I don't just build companies, I build the leaders who will run them.
                </h2>
              </div>
            </GsapScrollReveal>

            {/* Paragraph 1: High Contrast */}
            <GsapScrollReveal>
              <p className="text-white text-[16px] sm:text-[17px] leading-[1.7] font-normal">
                Shalom C. Ernest is a leadership strategist, management consultant (FIMC, CMC), certified advisor, and Principal Consultant at Leadview Consulting. Through a growing ecosystem of initiatives spanning executive advisory, leadership development, corporate governance, and community transformation, he is raising leaders, building enduring institutions, and creating lasting impact across Africa and beyond.
              </p>
            </GsapScrollReveal>

            {/* Paragraph 2: Muted Secondary Text */}
            <GsapScrollReveal>
              <p className="text-stone-400 text-[15px] sm:text-[16px] leading-[1.7] font-normal">
                As the executive force behind Clarity Conclave and Youth Making Impact, Shalom has trained over 10,000 professionals and young leaders across Africa, bringing together corporate boards, founders, and innovators to solve complex organizational challenges with structural competence, execution velocity, and deep character resilience.
              </p>
            </GsapScrollReveal>

            {/* Credential Tags */}
            <GsapScrollReveal>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {['FIMC', 'CMC', 'Lateef Jakande Fellow', 'Tony Elumelu Foundation Mentor', 'John Maxwell Team'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-stone-400 border border-white/[0.1] px-3 py-1 uppercase bg-[#141210] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GsapScrollReveal>
          </div>

          {/* RIGHT: Rounded Executive Portrait (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <GsapScrollReveal>
              <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-[32px] overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
                <BlurUpImage
                  src="/src/assets/images/LLS_2026-124.jpg"
                  alt="Shalom C. Ernest — Management Consultant & Leadership Strategist"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-top contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0.05) 50%, transparent 100%)',
                  }}
                />
              </div>
            </GsapScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
