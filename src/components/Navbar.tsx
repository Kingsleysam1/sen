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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-xl' : 'bg-black'
        }`}
      >
        <div className="site-container h-[64px] sm:h-[72px] flex items-center justify-between gap-4">
          <button
            onClick={() => handleItemClick('hero')}
            className="shrink-0 min-h-[44px] flex items-center cursor-pointer"
            aria-label="Shalom C. Ernest, home"
          >
            <img src="/logo-signature-white.png" alt="Shalom Ernest" width={521} height={186} className="h-10 sm:h-12 w-auto" />
          </button>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                onClick={() => handleItemClick(item.target)}
                className="min-h-[44px] px-4 py-2 text-[14px] font-medium text-white/75 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBooking}
              className="min-h-[44px] px-5 py-2 rounded-full bg-white hover:bg-[#8AC4FF] text-black text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer"
            >
              Book Shalom
            </button>
            <button
              onClick={handleToggle}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            >
              <span className="block h-[1.5px] w-5 bg-white" />
              <span className="block h-[1.5px] w-5 bg-white" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col px-6 pb-8 pt-24"
          >
            <div className="flex justify-between items-center absolute top-4 left-6 right-6">
              <img src="/logo-signature-white.png" alt="Shalom Ernest" width={521} height={186} className="h-10 w-auto" />
              <button onClick={handleToggle} className="text-white/70 hover:text-white p-2" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col mt-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleItemClick(item.target)}
                  className="text-left text-[34px] font-medium tracking-[-0.03em] text-white/85 hover:text-white py-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              onClick={handleBooking}
              className="mt-auto w-full py-4 rounded-full bg-white text-black font-semibold text-[15px]"
            >
              Book Shalom
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
