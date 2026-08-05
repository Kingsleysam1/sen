import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'motion/react';
import Globe from './originkit/ui/globe';
import { useTheme } from '../context/ThemeContext';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 0.015,
  className = '',
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={parentVariants}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + val.toFixed(decimals) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

export function MetricsSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Impact pinpointed locations on the globe
  const impactHubs = [
    { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792 },
    { name: 'Abuja, Nigeria', lat: 9.0765, lng: 7.3986 },
    { name: 'Yola, Nigeria', lat: 9.2035, lng: 12.4954 },
    { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219 },
    { name: 'Accra, Ghana', lat: 5.6037, lng: -0.187 },
    { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  ];

  const leftColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const statsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const stats = [
    {
      value: 10000,
      suffix: '+',
      decimals: 0,
      label: 'Young Leaders Reached',
    },
    {
      value: 99.4,
      suffix: '%',
      decimals: 1,
      label: 'Client Transformation Rate',
    },
    {
      value: 9,
      suffix: '+',
      decimals: 0,
      label: 'Years Executive Advisory',
    },
    {
      value: 6,
      suffix: '+',
      decimals: 0,
      label: 'Global Hubs & Footprint',
    },
    {
      value: 100,
      suffix: '+',
      decimals: 0,
      label: 'Keynotes & Workshops',
    },
  ];

  return (
    <section
      id="stats"
      className={`py-8 md:py-24 px-6 md:px-12 lg:px-[120px] w-full border-t border-white/10 overflow-hidden font-sans transition-colors duration-500 ${
        isLight ? 'bg-[#FAF9F5] text-stone-900' : 'bg-black text-white'
      }`}
    >
      {/* Anchor for nav smooth scrolling */}
      <div id="metrics" className="absolute -top-10" />

      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-[160px] items-stretch">
          
          {/* Left Column (flex-1, flex flex-col justify-start) */}
          <motion.div
            className="flex-1 flex flex-col justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={leftColumnVariants}
          >
            {/* Heading (h2) */}
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full">
              <Typewriter text="Empowering " delay={0} speed={0.012} />
              <span className="font-dm-serif italic font-normal text-amber-800 dark:text-[#C8C3A7]">
                <Typewriter text="Global Leaders" delay={0.15} speed={0.012} />
              </span>
            </h2>

            {/* Subtitle (p) */}
            <p
              className={`text-base md:text-lg leading-relaxed font-light max-w-lg whitespace-normal mb-16 ${
                isLight ? 'text-stone-600' : 'text-white/40'
              }`}
            >
              <Typewriter
                text="For over a decade, visionary executives, institutions, and young leaders across Africa and globally have relied on strategic advisory, executive clarity, and corporate governance to achieve lasting impact."
                delay={0.1}
                speed={0.012}
              />
            </p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24"
              variants={statsGridVariants}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col"
                  variants={statItemVariants}
                >
                  <div
                    className={`text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3 ${
                      isLight ? 'text-amber-900' : 'text-[#F3F3EE]'
                    }`}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <div
                    className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider ${
                      isLight ? 'text-amber-800/80' : 'text-white/40'
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Globe Integration */}
          <div className="flex justify-center lg:justify-end items-center shrink-0 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1.1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
              className="w-full max-w-[500px] lg:max-w-none lg:w-[120%] aspect-square origin-center relative flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <Globe
                speed={1.2}
                smoothing={8}
                scale={9.5}
                initialLatitude={9.0765}
                initialLongitude={7.3986}
                oceanColor={isLight ? '#FAF9F5' : '#000000'}
                outlineColor={isLight ? '#B38B38' : '#8B5E3C'}
                showOutline={true}
                outlineWidth={1.2}
                graticuleColor={isLight ? '#E5E7EB' : '#2A1C12'}
                showGrid={true}
                dots={{
                  color: isLight ? '#8C6D2D' : '#D4A373',
                  size: 5,
                  density: 8,
                  allDots: false,
                }}
                fill="dots"
                fillColor={isLight ? '#D97706' : '#8B5E3C'}
                markerConfig={{
                  color: isLight ? '#111827' : '#FFFFFF',
                  size: 65,
                  markers: impactHubs.map((h) => ({ lat: h.lat, lng: h.lng })),
                }}
                stopOnHover={true}
                dragSpeed={6}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
