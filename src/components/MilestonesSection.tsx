import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MILESTONES } from '../data/shalomData';
import Smooth3DSlideshow from './originkit/ui/coverflowgallery';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MilestonesSectionProps {
  onOpenBooking: () => void;
}

const COUNT = MILESTONES.length;
// How much scroll each card costs, in screen heights. The whole stage is
// one screen plus (COUNT - 1) of these.
const SCREENS_PER_CARD = 0.42;
// Rest on the first and last card for a beat before the scroll hands back.
const DWELL = 0.06;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Selected Engagements — the page's one scroll moment.
 * The section is a tall track with a single sticky screen in it. Scrolling
 * through the track slides the coverflow from the first engagement to the
 * last, frame by frame: nothing autoplays, nothing waits on a timer.
 */
export function MilestonesSection({ onOpenBooking: _onOpenBooking }: MilestonesSectionProps) {
  const trackRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(0);
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const measure = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const toPosition = (progress: number) => {
      const eased = Math.min(1, Math.max(0, (progress - DWELL) / (1 - DWELL * 2)));
      return eased * (COUNT - 1);
    };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setPosition(toPosition(self.progress)),
      onRefresh: (self) => setPosition(toPosition(self.progress)),
    });
    return () => st.kill();
  }, []);

  const mobile = viewport.w < 640;
  const cardH = Math.round(
    Math.max(220, Math.min(mobile ? 300 : 380, viewport.h * (mobile ? 0.34 : 0.4)))
  );
  const cardW = mobile ? Math.round(Math.min(280, viewport.w * 0.72)) : Math.round(cardH * 1.17);

  const slides = MILESTONES.map((m) => ({
    image: { src: m.image, alt: m.title },
    title: m.title,
  }));

  const index = Math.round(position);
  const current = MILESTONES[index];

  return (
    <section
      id="milestones"
      ref={trackRef}
      aria-labelledby="milestones-heading"
      className="stage-track relative bg-[#0E110E] border-t border-white/[0.08]"
      style={{ '--travel': Math.round((COUNT - 1) * SCREENS_PER_CARD * 100) } as React.CSSProperties}
    >
      <div className="stage-sticky flex flex-col justify-center gap-4 sm:gap-6 overflow-hidden pt-[84px] pb-5 sm:pb-8">

        {/* ── Header ── */}
        <div className="site-container w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-8 h-[2px] bg-[#8AC4FF]" />
              <span className="typo-eyebrow">Selected Engagements</span>
            </div>
            <h2
              id="milestones-heading"
              className="typo-section-heading text-[#F0F5F0] text-[clamp(26px,3.4vw,46px)]"
            >
              Milestone <span className="text-[#8AC4FF]">Engagements</span> &amp; Policy Advisory
            </h2>
          </div>
          <p className="typo-body hidden sm:block max-w-[380px] text-[15px]">
            A selection of keynotes, state advisories, international policy forums, and institutional inductions.
          </p>
        </div>

        {/* ── Scroll-driven coverflow ── */}
        <div className="relative w-full" style={{ height: cardH + 56 }}>
          <Smooth3DSlideshow
            position={position}
            slides={slides}
            cardWidth={cardW}
            cardHeight={cardH}
            radius={2.2}
            tilt={10}
            sideTilt={6}
            gap={mobile ? 6 : 9}
            opacity={55}
            showTitle={true}
            titleColor="#F0F5F0"
            titleFont={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: mobile ? '15px' : '19px',
              fontWeight: 600,
              lineHeight: '1.25em',
            }}
            titlePosition={{
              position: 'bottomLeft',
              paddingLeft: 18,
              paddingRight: 18,
              paddingBottom: 18,
              paddingTop: 18,
            }}
            style={{ minWidth: 0, minHeight: 0 }}
          />
        </div>

        {/* ── Caption + progress ── */}
        <div className="site-container w-full flex flex-col gap-4">
          <div
            key={current.id}
            className="caption-in grid sm:grid-cols-[7rem_1fr] gap-x-8 gap-y-2 items-start min-h-[7.5rem] sm:min-h-[5.5rem] pr-14 sm:pr-0"
          >
            <span className="font-mono text-[13px] font-bold text-[#8AC4FF] tabular-nums tracking-[0.08em]">
              {pad(index + 1)} / {pad(COUNT)}
            </span>
            <div className="flex flex-col gap-2">
              <span className="typo-eyebrow text-[#9EAEA0]">{current.category}</span>
              <p className="typo-body text-[14px] sm:text-[16px] max-w-[64ch]">{current.description}</p>
            </div>
          </div>

          <div className="relative pt-6" aria-hidden="true">
            <span
              className="absolute right-0 top-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[#627364] transition-opacity duration-300"
              style={{ opacity: position < 0.15 ? 1 : 0 }}
            >
              Scroll to browse ↓
            </span>
            <div className="relative h-px w-full bg-white/[0.12]">
              <div
                className="absolute inset-y-0 left-0 w-full origin-left bg-[#8AC4FF]"
                style={{ transform: `scaleX(${COUNT > 1 ? position / (COUNT - 1) : 1})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
