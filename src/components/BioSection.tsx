import React from 'react';
import { GsapScrollReveal } from './GsapScrollReveal';
import { BlurUpImage } from './BlurUpImage';
import { PHOTOS } from '../data/photos';

const CREDENTIALS = [
  { tag: 'FIMC', full: 'Fellow, Institute of Management Consultants' },
  { tag: 'CMC', full: 'Certified Management Consultant' },
  { tag: 'AILCS', full: 'Associate, Institute of Leadership Coaching and Strategy' },
];

export function BioSection() {
  return (
    <section id="bio" className="bg-white text-[#111] py-24 sm:py-32" aria-labelledby="bio-heading">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 flex flex-col gap-7">
            <GsapScrollReveal>
              <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
                About Shalom
              </p>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <h2
                id="bio-heading"
                className="text-[clamp(36px,5.2vw,68px)] font-medium text-[#111] leading-[1.02] tracking-[-0.04em]"
              >
                I build and strengthen ecosystems for transformational Leadership
              </h2>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <p className="text-[#222] text-[17px] sm:text-[18px] leading-[1.65]">
                Shalom C. Ernest is a leadership strategist, management consultant (FIMC, CMC), certified trainer, coach and Principal Consultant at Leadview Consulting. Through a growing ecosystem of initiatives spanning leadership development trainings, executive advisory, corporate governance, and community transformation, he is raising leaders, building enduring institutions, and creating lasting impact across Africa and beyond.
              </p>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <p className="text-[#555] text-[16px] sm:text-[17px] leading-[1.65]">
                As the chief steward at Clarity Conclave, CEO of Leadview Management Consulting and Founder of Youth Making Impact Initiative, Shalom has trained over 10,000 professionals and young leaders across Africa. He helps corporate boards, founders, and innovators tackle complex challenges with clear structures, focused execution, and resilient leadership.
              </p>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <img
                src="/logo-signature-dark.png"
                alt="Signed, Shalom Ernest"
                width={521}
                height={186}
                className="h-14 sm:h-16 w-auto -mt-1"
                loading="lazy"
              />
            </GsapScrollReveal>

            <GsapScrollReveal>
              <ul className="flex flex-wrap gap-2 pt-1" aria-label="Credentials">
                {CREDENTIALS.map((c) => (
                  <li key={c.tag} title={c.full} className="text-[13px] font-semibold text-[#111] bg-[#F2F2F0] px-3.5 py-1.5 rounded-full">
                    <abbr title={c.full} className="no-underline">{c.tag}</abbr>
                  </li>
                ))}
              </ul>
            </GsapScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <GsapScrollReveal>
              <div className="relative max-w-[480px] mx-auto lg:ml-auto">
                <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-[#EEE]">
                  <BlurUpImage
                    src={PHOTOS.relaxed}
                    alt="Shalom C. Ernest smiling, seated in a white shirt and tie"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-[50%_30%]"
                  />
                </div>
                {/* Second, smaller photo: on stage, for a sense of the work */}
                <div className="hidden sm:block absolute -left-10 -bottom-10 w-[42%] aspect-square rounded-[22px] overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                  <img
                    src={PHOTOS.worldMap}
                    alt="Shalom C. Ernest at a podium in front of a world map"
                    className="w-full h-full object-cover object-[50%_45%]"
                    loading="lazy"
                  />
                </div>
              </div>
            </GsapScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
