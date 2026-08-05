import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapHighlightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gradient?: string;
}

export function GsapHighlight({
  children,
  className = '',
  delay = 0.2,
  gradient = 'from-amber-500/30 via-yellow-500/25 to-amber-600/30 border-amber-400/40',
}: GsapHighlightProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const hl = highlightRef.current;
    if (!el || !hl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hl,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <span ref={containerRef} className={`relative inline-block px-1.5 py-0.5 my-0.5 rounded ${className}`}>
      {/* GSAP animated gold-accented background span */}
      <span
        ref={highlightRef}
        className={`absolute inset-0 rounded bg-gradient-to-r ${gradient} border backdrop-blur-[2px] pointer-events-none z-0`}
      />
      <span className="relative z-10 text-[#F3F3EE] font-medium">{children}</span>
    </span>
  );
}
