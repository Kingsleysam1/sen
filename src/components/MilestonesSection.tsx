import React from 'react';
import { motion } from 'framer-motion';
import { GsapScrollReveal } from './GsapScrollReveal';
import { MILESTONES } from '../data/shalomData';
import Smooth3DSlideshow from './originkit/ui/coverflowgallery';
import { useEffect, useState } from 'react';

interface MilestonesSectionProps {
  onOpenBooking: () => void;
}

export function MilestonesSection({ onOpenBooking: _onOpenBooking }: MilestonesSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const coverflowSlides = MILESTONES.map((m) => ({
    image: { src: m.image, alt: m.title },
    title: m.title,
  }));

  return (
    <section
      id="milestones"
      className="bg-[#0E110E] border-t border-white/[0.08]"
      aria-labelledby="milestones-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#C8A96E]" />
                <span className="typo-eyebrow">Selected Engagements</span>
              </div>
              <h2
                id="milestones-heading"
                className="typo-section-heading text-[#F0F5F0]"
              >
                Milestone <span className="text-[#C8A96E]">Engagements</span> &amp; Policy Advisory
              </h2>
            </div>
            <p className="typo-body text-[16px] sm:text-[17px] max-w-[380px] leading-relaxed">
              A selection of keynotes, state advisories, international policy forums, and institutional inductions.
            </p>
          </div>
        </GsapScrollReveal>

        {/* ── 3D Coverflow Gallery ── */}
        <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center overflow-hidden">
          <Smooth3DSlideshow
            slides={coverflowSlides}
            cardWidth={isMobile ? 280 : 420}
            cardHeight={isMobile ? 300 : 360}
            radius={2.2}
            tilt={10}
            sideTilt={6}
            gap={isMobile ? 6 : 9}
            opacity={55}
            autoplay={true}
            autoplayDirection="rightToLeft"
            showTitle={true}
            titleColor="#F0F5F0"
            titleFont={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: isMobile ? '16px' : '20px',
              fontWeight: 600,
              lineHeight: '1.25em',
            }}
            titlePosition={{
              position: 'bottomLeft',
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 20,
              paddingTop: 20,
            }}
            transition={{
              duration: 0.6,
              delay: 3.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>


      </div>
    </section>
  );
}
