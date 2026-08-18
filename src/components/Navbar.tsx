import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

const NAV_ITEMS = [
  { label: 'Home',         target: 'hero' },
  { label: 'About',        target: 'bio' },
  { label: 'Services',     target: 'initiatives' },
  { label: 'Programs',     target: 'programs' },
  { label: 'Engagements',  target: 'milestones' },
  { label: 'Events',       target: 'events' },
];

export function Navbar({ onNavClick, onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleToggle = () => {
    triggerHaptic('light');
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (target: string) => {
    triggerHaptic('selection');
    onNavClick(target);
    setIsOpen(false);
  };

  const handleBooking = () => {
    triggerHaptic('medium');
    onOpenBooking();
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0908]/90 backdrop-blur-xl border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="site-container flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-1.5 shrink-0 group cursor-pointer"
            aria-label="Home"
          >
            <span className="font-extrabold text-[20px] sm:text-[22px] tracking-tight text-white uppercase font-sans">
              SHALOM
            </span>
            <span className="font-extrabold text-[20px] sm:text-[22px] tracking-tight text-[#C8A96E] uppercase font-sans">
              ERNEST
            </span>
          </button>

          {/* Center Floating Pill Navbar */}
          <nav
            className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.12] bg-[#1C1916]/60 backdrop-blur-md px-6 py-2 shadow-2xl"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.target}
                onClick={() => handleItemClick(item.target)}
                className={`px-4 py-1.5 text-[14px] font-medium transition-colors duration-200 cursor-pointer rounded-full ${
                  idx === 0
                    ? 'text-white font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTA Button: Pill with warm brown/gold accent */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={handleBooking}
              className="px-6 py-2.5 rounded-full border border-[#C8A96E]/60 hover:border-[#C8A96E] bg-[#C8A96E]/10 hover:bg-[#C8A96E]/20 text-[#C8A96E] hover:text-[#E5C98E] text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(200,169,110,0.15)]"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={handleBooking}
              className="px-4 py-1.5 rounded-full border border-[#C8A96E]/60 bg-[#C8A96E]/10 text-[#C8A96E] text-[12px] font-semibold"
            >
              Contact
            </button>

            <button
              onClick={handleToggle}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            >
              <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
              <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'w-5'}`} />
              <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#0A0908] flex flex-col p-6 pt-24 justify-between"
          >
            <div className="flex justify-between items-center absolute top-6 left-6 right-6">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[20px] text-white">SHALOM</span>
                <span className="font-extrabold text-[20px] text-[#C8A96E]">ERNEST</span>
              </div>
              <button onClick={handleToggle} className="text-stone-300 hover:text-white p-2">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleItemClick(item.target)}
                  className="text-left text-[28px] font-bold text-stone-200 hover:text-[#C8A96E] py-2 border-b border-white/[0.08]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={handleBooking}
              className="w-full py-4 rounded-full bg-[#C8A96E] text-[#0A0908] font-bold text-[15px] tracking-wide"
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
