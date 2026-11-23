import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  yOffset?: number;
  subtleBlur?: boolean;
}

export function GsapScrollReveal({
  children,
  className = '',
  start = 'top 95%',
  end = 'top 65%',
  scrub = 0.8,
  yOffset = 25,
  subtleBlur = true,
}: GsapScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Visitors who ask for reduced motion get the content as it is, with no fade or blur.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0.15,
          y: yOffset,
          filter: subtleBlur ? 'blur(4px)' : 'blur(0px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          // Once revealed, drop the filter: a leftover blur(0px) keeps a whole
          // section on its own GPU layer for no visual gain.
          onComplete: () => { gsap.set(el, { clearProps: 'filter' }); },
          scrollTrigger: {
            trigger: el,
            start: start,
            end: end,
            scrub: scrub,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [start, end, scrub, yOffset, subtleBlur]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
