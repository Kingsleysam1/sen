import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedLetterProps {
  key?: React.Key;
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}

function AnimatedLetter({
  char,
  index,
  totalChars,
  scrollYProgress,
}: AnimatedLetterProps) {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
}

interface ScrollRevealedTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealedText({
  text,
  className = '',
}: ScrollRevealedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = Array.from(text);
  const totalChars = characters.length;

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, index) => (
        <AnimatedLetter
          key={index}
          char={char}
          index={index}
          totalChars={totalChars}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}
