import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PHOTOS } from '../data/photos';

const m = (file: string) => encodeURI('/src/assets/images/moments/' + file);

// Captions describe what each photo shows. Confirm event names with Shalom before adding more detail.
const SLIDES = [
  { src: m('moment-summit-stage.jpg'), caption: 'On stage', alt: 'Shalom C. Ernest speaking on stage at a summit', pos: '50% 25%' },
  { src: m('moment-clarity-experience.jpg'), caption: 'The Clarity Experience', alt: 'Shalom C. Ernest presenting an award at The Clarity Experience', pos: '50% 45%' },
  { src: m('moment-training-cohort.jpg'), caption: 'Training cohort', alt: 'Shalom C. Ernest with a full training cohort', pos: '50% 50%' },
  { src: m('moment-workshop.jpg'), caption: 'Workshop', alt: 'Shalom C. Ernest leading a workshop around a boardroom table', pos: '14% 50%' },
  { src: PHOTOS.roscongress, caption: 'Russian conference', alt: 'Shalom C. Ernest outdoors at a conference in Russia', pos: '45% 50%' },
  { src: m('moment-panel.jpg'), caption: 'Panel discussion', alt: 'Shalom C. Ernest speaking on a panel', pos: '50% 35%' },
  { src: m('moment-lagos-business-school.jpg'), caption: 'Lagos Business School', alt: 'Shalom C. Ernest at Lagos Business School', pos: '50% 35%' },
  { src: m('moment-ymi-jos.jpg'), caption: 'Youth Making Impact, Jos', alt: 'A Youth Making Impact session in Jos', pos: '34% 50%' },
  { src: m('moment-fireside-chat.jpg'), caption: 'Fireside chat', alt: 'Shalom C. Ernest in conversation on stage', pos: '28% 45%' },
  { src: m('moment-chamber.jpg'), caption: 'Public sector engagement', alt: 'Shalom C. Ernest speaking in a council chamber', pos: '68% 40%' },
  { src: m('moment-ilcs.jpg'), caption: 'Recognition', alt: 'Shalom C. Ernest wearing an ILCS stole at an induction', pos: '50% 30%' },
  { src: m('moment-keynote.jpg'), caption: 'Keynote', alt: 'Shalom C. Ernest speaking into a microphone', pos: '50% 40%' },
  { src: m('moment-speaking.jpg'), caption: 'Speaking engagement', alt: 'Shalom C. Ernest speaking to a young audience', pos: '56% 50%' },
];

const AUTOPLAY_MS = 3500;

export function MomentsSlider() {
  const railRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  // Line the first card up with the page's content edge, at any width
  const headRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ pad: 20, inner: 350 });

  useEffect(() => {
    const measure = () => {
      const el = headRef.current;
      if (!el) return;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const pad = r.left + parseFloat(cs.paddingLeft);
      const inner = r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setEdge({ pad: Math.round(pad), inner: Math.round(inner) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const step = useCallback(() => {
    const rail = railRef.current;
    const card = rail?.querySelector('li');
    if (!rail || !card) return 0;
    const gap = parseFloat(getComputedStyle(rail).columnGap || '16') || 16;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    if (dir === 1 && atEnd) rail.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
    else rail.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
  }, [reduce, step]);

  const updateEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanPrev(rail.scrollLeft > 4);
    setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, []);

  // Only run while on screen
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(rail);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, visible, go]);

  return (
    <div
      className="mt-16 sm:mt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Moments from Shalom's work"
    >
      <div ref={headRef} className="site-container flex items-end justify-between gap-4 mb-6">
        <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555]">In the room</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous photos"
            className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#111] hover:bg-black hover:text-white transition-colors disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#111] cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={canNext ? 'Next photos' : 'Back to the first photo'}
            className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#111] hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <ul
        ref={railRef}
        onScroll={updateEdges}
        className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{ paddingLeft: edge.pad, paddingRight: edge.pad, scrollPaddingLeft: edge.pad, ['--inner' as string]: `${edge.inner}px` } as React.CSSProperties}
      >
        {SLIDES.map((s, i) => (
          <li
            key={s.src}
            className="snap-start shrink-0 w-[68vw] sm:w-[38vw] md:w-[30vw] lg:w-[calc((var(--inner)-4rem)/4.4)]"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}: ${s.caption}`}
          >
            <div className="aspect-[3/4] rounded-[20px] overflow-hidden bg-[#E5E5E2] group">
              <img
                src={s.src}
                alt={s.alt}
                style={{ objectPosition: s.pos }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading={i < 5 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
            <p className="mt-3 text-[14px] font-semibold text-[#111]">{s.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
