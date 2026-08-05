import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

export function AnimatedBackgroundOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP floating animations for background colored orbs
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 'random(-100, 100)',
          y: 'random(-80, 80)',
          scale: 'random(0.9, 1.25)',
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: 'random(-120, 120)',
          y: 'random(-100, 100)',
          scale: 'random(0.8, 1.3)',
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: 'random(-90, 90)',
          y: 'random(-110, 110)',
          scale: 'random(0.85, 1.2)',
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }

      if (orb4Ref.current) {
        gsap.to(orb4Ref.current, {
          x: 'random(-110, 110)',
          y: 'random(-70, 70)',
          scale: 'random(0.9, 1.3)',
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const blendClass = isLight ? 'mix-blend-multiply opacity-70' : 'mix-blend-screen';

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500">
      {/* Orb 1: Warm Amber / Gold */}
      <div
        ref={orb1Ref}
        className={`absolute top-[10%] left-[15%] w-[450px] h-[450px] rounded-full ${
          isLight
            ? 'bg-gradient-to-r from-amber-300/20 via-yellow-200/20 to-orange-300/15 blur-[70px]'
            : 'bg-gradient-to-r from-amber-600/12 via-yellow-500/8 to-orange-600/8 blur-[80px]'
        } ${blendClass}`}
      />

      {/* Orb 2: Deep Emerald / Teal */}
      <div
        ref={orb2Ref}
        className={`absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full ${
          isLight
            ? 'bg-gradient-to-r from-emerald-300/15 via-teal-200/20 to-cyan-200/15 blur-[80px]'
            : 'bg-gradient-to-r from-emerald-600/10 via-teal-500/8 to-cyan-600/8 blur-[90px]'
        } ${blendClass}`}
      />

      {/* Orb 3: Royal Indigo / Purple / Rose Bronze */}
      <div
        ref={orb3Ref}
        className={`absolute top-[68%] left-[8%] w-[550px] h-[550px] rounded-full ${
          isLight
            ? 'bg-gradient-to-r from-indigo-200/15 via-purple-200/15 to-pink-200/15 blur-[80px]'
            : 'bg-gradient-to-r from-indigo-600/10 via-purple-600/8 to-pink-600/8 blur-[95px]'
        } ${blendClass}`}
      />

      {/* Orb 4: Copper / Warm Ochre */}
      <div
        ref={orb4Ref}
        className={`absolute top-[85%] right-[20%] w-[480px] h-[480px] rounded-full ${
          isLight
            ? 'bg-gradient-to-r from-orange-300/15 via-amber-300/20 to-yellow-200/15 blur-[70px]'
            : 'bg-gradient-to-r from-orange-600/12 via-amber-700/10 to-yellow-600/8 blur-[80px]'
        } ${blendClass}`}
      />
    </div>
  );
}

