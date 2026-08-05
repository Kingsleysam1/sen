import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
  staggerDelay?: number;
}

export function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delay = 0,
  staggerDelay = 0.08,
}: WordsPullUpProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const words = text.split(' ');

  return (
    <h1 ref={containerRef} className={`inline-flex flex-wrap items-baseline ${className}`}>
      {words.map((word, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;

        return (
          <span
            key={wordIndex}
            className="inline-block whitespace-nowrap mr-[0.2em] relative"
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.65,
                delay: delay + wordIndex * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block relative"
            >
              {word}
              {showAsterisk && isLastWord && (
                <span
                  className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] select-none text-primary pointer-events-none font-normal"
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}
