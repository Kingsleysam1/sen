import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

export function Navbar({ onNavClick, onOpenBooking }: NavbarProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

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

  return (
    <header className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[95vw]">
      <nav
        className={`rounded-b-2xl md:rounded-b-3xl px-3.5 py-2 sm:px-6 sm:py-2.5 shadow-2xl transition-colors duration-300 ${
          isLight
            ? 'bg-white/90 backdrop-blur-md border-x border-b border-gray-200 text-gray-900'
            : 'bg-black/90 backdrop-blur-md border-x border-b border-white/10 text-[#F3F3EE]'
        }`}
      >
        <ul className="flex items-center gap-2.5 sm:gap-4 md:gap-7 text-[10px] sm:text-xs md:text-sm font-normal">
          {navItems.map((item) => (
            <li key={item.target}>
              <button
                onClick={() => {
                  triggerHaptic('selection');
                  onNavClick(item.target);
                }}
                className={`transition-colors duration-200 cursor-pointer whitespace-nowrap font-medium ${
                  isLight
                    ? 'text-gray-600 hover:text-black'
                    : 'text-[#E1E0CC]/80 hover:text-[#E1E0CC]'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => {
                triggerHaptic('medium');
                onOpenBooking();
              }}
              className={`text-[10px] sm:text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap ${
                isLight
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-[#E2DFD2] hover:bg-white text-black'
              }`}
            >
              Inquire
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

