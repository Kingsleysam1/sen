import React, { useState, useEffect } from 'react';
import { MILESTONES } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';
import Smooth3DSlideshow from './originkit/ui/coverflowgallery';
import { useTheme } from '../context/ThemeContext';

interface MilestonesSectionProps {
  onOpenBooking: () => void;
}

export function MilestonesSection({ onOpenBooking: _onOpenBooking }: MilestonesSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const coverflowSlides = MILESTONES.map((m) => ({
    image: {
      src: m.image,
      alt: m.title,
    },
    title: m.title,
  }));

  return (
    <section id="milestones" className={`py-20 sm:py-28 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
      isLight ? 'bg-[#FAF9F5] text-stone-900' : 'bg-[#0A0B0D] text-[#F3F3EE]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <GsapScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-2 gap-6">
            <div className="space-y-2">
              <span className={`text-xs font-mono uppercase tracking-[0.25em] block ${
                isLight ? 'text-amber-800 font-semibold' : 'text-[#C8C3A7]'
              }`}>
                SELECTED ENGAGEMENTS & MILESTONES
              </span>
              <h2 className={`text-3xl sm:text-5xl font-normal ${
                isLight ? 'text-stone-900' : 'text-[#F3F3EE]'
              }`}>
                Milestone Engagements & Policy Advisory
              </h2>
            </div>
          </div>
        </GsapScrollReveal>

        {/* 3D Coverflow Gallery View without background bounding box */}
        <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center py-2 overflow-hidden">
          <Smooth3DSlideshow
            slides={coverflowSlides}
            cardWidth={isMobile ? 290 : 420}
            cardHeight={isMobile ? 310 : 360}
            radius={2.2}
            tilt={10}
            sideTilt={6}
            gap={isMobile ? 6 : 9}
            opacity={55}
            autoplay={true}
            autoplayDirection="rightToLeft"
            showTitle={true}
            titleColor="#F3F3EE"
            titleFont={{
              fontFamily: '"Almarai", sans-serif',
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: 600,
              lineHeight: '1.2em',
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



