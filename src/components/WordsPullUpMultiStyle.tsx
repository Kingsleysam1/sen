import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  delay = 0,
  staggerDelay = 0.06,
}: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  let globalWordIndex = 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap items-baseline ${className}`}
    >
      {segments.map((segment, segIdx) => {
        // Trim and split by whitespace to avoid empty tokens
        const words = segment.text.trim().split(/\s+/).filter(Boolean);

        return (
          <React.Fragment key={segIdx}>
            {words.map((word, wordIdx) => {
              const currentIndex = globalWordIndex++;

              return (
                <span
                  key={`${segIdx}-${wordIdx}`}
                  className="inline-block whitespace-nowrap mr-[0.25em] mb-[0.1em]"
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: delay + currentIndex * staggerDelay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${segment.className || ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
