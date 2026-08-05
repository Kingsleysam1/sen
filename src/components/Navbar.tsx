import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

export function Navbar({ onNavClick, onOpenBooking }: NavbarProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', target: 'bio' },
    { label: 'Impact', target: 'metrics' },
    { label: 'Partnerships', target: 'partners' },
    { label: 'Services', target: 'initiatives' },
    { label: 'Testimonials', target: 'testimonials' },
    { label: 'Engagements', target: 'milestones' },
    { label: 'Events & Articles', target: 'events' },
    { label: 'FAQ', target: 'faq' },
  ];

  const handleToggle = () => {
    triggerHaptic('light');
    setIsOpen(!isOpen);
  };

  const handleItemClick = (target: string) => {
    triggerHaptic('selection');
    onNavClick(target);
    setIsOpen(false);
  };

  return (
    <header className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[95vw] md:w-auto max-w-[95vw]">
      <nav
        className={`rounded-b-2xl md:rounded-b-3xl px-4 py-2 sm:px-6 sm:py-2.5 shadow-2xl transition-all duration-300 ${
          isLight
            ? 'bg-white/95 backdrop-blur-md border-x border-b border-gray-200 text-gray-900'
            : 'bg-black/95 backdrop-blur-md border-x border-b border-white/10 text-[#F3F3EE]'
        }`}
      >
        {/* Desktop View: Horizontal Layout */}
        <div className="hidden md:flex items-center gap-7">
          <img 
            src="/src/assets/images/Untit (1).png" 
            alt="Brand Logo" 
            className="h-7 w-auto object-contain cursor-pointer drop-shadow-sm"
            onClick={() => handleItemClick('bio')}
          />
          <ul className="flex items-center gap-6 text-sm font-normal">
            {navItems.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => handleItemClick(item.target)}
                  className={`transition-colors duration-200 cursor-pointer whitespace-nowrap font-medium ${
                    isLight ? 'text-gray-600 hover:text-black' : 'text-[#E1E0CC]/80 hover:text-[#E1E0CC]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              triggerHaptic('medium');
              onOpenBooking();
            }}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap ${
              isLight ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-[#E2DFD2] hover:bg-white text-black'
            }`}
          >
            Inquire
          </button>
        </div>

        {/* Mobile View: Header bar + toggle */}
        <div className="md:hidden flex flex-col w-full">
          <div className="flex items-center justify-between w-full gap-2">
            <img 
              src="/src/assets/images/Untit (1).png" 
              alt="Brand Logo" 
              className="h-6 w-auto object-contain cursor-pointer"
              onClick={() => handleItemClick('bio')}
            />
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenBooking();
                  setIsOpen(false);
                }}
                className={`text-[10px] font-semibold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer shadow-sm ${
                  isLight ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-[#E2DFD2] hover:bg-white text-black'
                }`}
              >
                Inquire
              </button>

              <button
                onClick={handleToggle}
                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Animated Dropdown Menu for Mobile */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="flex flex-col gap-3.5 pt-4 pb-2 text-xs font-medium border-t border-white/10 mt-3">
                  {navItems.map((item) => (
                    <li key={item.target}>
                      <button
                        onClick={() => handleItemClick(item.target)}
                        className={`w-full text-left transition-colors duration-200 cursor-pointer py-1 ${
                          isLight ? 'text-gray-600 hover:text-black' : 'text-[#E1E0CC]/80 hover:text-[#E1E0CC]'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
