import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BlurUpImage } from './BlurUpImage';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Tech Innovations",
    quote: "They brought clarity to complex problems, breaking down barriers and delivering innovative solutions.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "David Smith",
    role: "Founder, Nexus Dynamics",
    quote: "Their team was an absolute game-changer for our workflow. We scaled faster and with much more confidence.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "VP of Engineering, GlobalCorp",
    quote: "A truly collaborative process from start to finish. The results completely exceeded our initial expectations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  }
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const currentTestimonial = TESTIMONIALS[currentIndex];
  const words = currentTestimonial.quote.split(" ");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden transition-colors duration-500 selection:bg-[#C8C3A7] selection:text-stone-900 ${
        isLight ? 'bg-[#FAF9F5] text-stone-900' : 'bg-[#0A0B0D] text-[#F3F3EE]'
      }`}
    >
      {/* Inline styles for custom word-by-word reveal & fade-in animations */}
      <style>{`
        @keyframes testimonialWordReveal {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes testimonialFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-testimonial-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(100%);
          will-change: transform, opacity;
          animation: testimonialWordReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-testimonial-author {
          opacity: 0;
          animation: testimonialFadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.4s;
        }
        .animate-testimonial-controls {
          opacity: 0;
          animation: testimonialFadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.5s;
        }
      `}</style>

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center text-center space-y-10 md:space-y-12">
        
        {/* Top Label */}
        <div className="text-center">
          <span
            className={`text-xs uppercase tracking-[0.2em] font-mono font-semibold ${
              isLight ? 'text-amber-800' : 'text-[#C8C3A7]'
            }`}
          >
            • TESTIMONIALS
          </span>
        </div>

        {/* Animated Quote - Key re-triggers CSS animations when index changes */}
        <div key={currentIndex} className="w-full flex flex-col items-center">
          <h2
            className={`text-[28px] sm:text-[38px] md:text-[48px] lg:text-[54px] font-normal tracking-tight leading-[1.25] text-center max-w-4xl mx-auto px-2 ${
              isLight ? 'text-stone-900' : 'text-[#F3F3EE]'
            }`}
          >
            &ldquo;
            {words.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-block overflow-hidden align-top pb-1">
                  <span
                    className="animate-testimonial-word"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    {word}
                  </span>
                </span>
                {idx < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
            &rdquo;
          </h2>

          {/* Author Block */}
          <div className="mt-10 sm:mt-12 flex justify-center items-center animate-testimonial-author">
            <div className="flex items-center gap-4 text-left">
              <BlurUpImage
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                containerClassName="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0"
                className={`w-full h-full rounded-full object-cover shadow-md border-2 ${
                  isLight ? 'border-amber-800/20' : 'border-[#C8C3A7]/30'
                }`}
              />
              <div className="flex flex-col">
                <span
                  className={`text-base sm:text-lg font-semibold tracking-tight ${
                    isLight ? 'text-stone-900' : 'text-white'
                  }`}
                >
                  {currentTestimonial.name}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    isLight ? 'text-amber-800' : 'text-[#C8C3A7]'
                  }`}
                >
                  {currentTestimonial.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-3 animate-testimonial-controls">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="group w-14 h-14 bg-[#241E17] hover:bg-[#120F0C] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-stone-950/20 cursor-pointer active:scale-95 border border-stone-800/40"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8C3A7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Button */}
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="group w-14 h-14 bg-[#241E17] hover:bg-[#120F0C] rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-stone-950/20 cursor-pointer active:scale-95 border border-stone-800/40"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8C3A7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? isLight
                      ? 'w-6 bg-amber-800'
                      : 'w-6 bg-[#C8C3A7]'
                    : isLight
                    ? 'w-2 bg-stone-300 hover:bg-amber-700/60'
                    : 'w-2 bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
