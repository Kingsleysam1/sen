import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type CurtainStage = 'idle' | 'covering' | 'uncovering';

interface CurtainWipeProps {
  stage: CurtainStage;
  targetLabel?: string;
  onCoverComplete: () => void;
  onUncoverComplete: () => void;
}

export function CurtainWipe({
  stage,
  targetLabel,
  onCoverComplete,
  onUncoverComplete,
}: CurtainWipeProps) {

  // High-end cubic bezier easing
  const easeCurve = [0.76, 0, 0.24, 1];

  const variants = {
    idle: { y: '-100%' },
    covering: { y: '0%' },
    uncovering: { y: '100%' },
  };

  return (
    <AnimatePresence>
      {stage !== 'idle' && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col justify-between overflow-hidden">
          <motion.div
            initial={{ y: '-100%' }}
            animate={stage === 'covering' ? 'covering' : 'uncovering'}
            variants={variants}
            transition={{
              duration: 0.42,
              ease: easeCurve,
            }}
            onAnimationComplete={() => {
              if (stage === 'covering') {
                onCoverComplete();
              } else if (stage === 'uncovering') {
                onUncoverComplete();
              }
            }}
            className="w-full h-full flex flex-col items-center justify-center relative shadow-2xl bg-[#080A08]"
          >
            {/* Top Gold / Amber Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-90" />

            {/* Subtle Grid Accent */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Center Monogram Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.25 }}
              className="text-center space-y-3 relative z-10 px-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-amber-500/40 bg-amber-500/10 shadow-lg">
                <span className="font-sans text-amber-400 font-extrabold text-xl tracking-wider">
                  SCE
                </span>
              </div>
              <div>
                <p className="text-stone-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium">
                  TRANSITIONING TO
                </p>
                <h4 className="text-amber-200/90 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold mt-1">
                  {targetLabel || 'SHALOM C. ERNEST'}
                </h4>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto rounded-full" />
            </motion.div>

            {/* Bottom Gold / Amber Line */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

