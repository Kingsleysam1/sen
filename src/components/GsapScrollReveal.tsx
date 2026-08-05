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
  start = 'top 88%',
  end = 'top 45%',
  scrub = 0.8,
  yOffset = 25,
  subtleBlur = true,
}: GsapScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

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
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
