import React from 'react';
import { SocialLinks } from './SocialLinks';

interface FooterSectionProps {
  onNavClick?: (targetId: string) => void;
  onOpenBooking?: () => void;
}

export function FooterSection({ onNavClick: _onNavClick, onOpenBooking: _onOpenBooking }: FooterSectionProps) {
  return (
    <footer id="inquiries" className="bg-black pb-12" aria-label="Footer">
      <div className="site-container">

        {/* ── Footer links ── */}
        <nav aria-label="Footer" className="border-t border-white/[0.08] py-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {[
            ['About', 'bio'], ['Services', 'initiatives'], ['Programs', 'programs'],
            ['Listen', 'milestones'], ['Mentorship', 'mentorship'], ['Contact', 'contact'], ['FAQ', 'faq'],
          ].map(([label, id]) => (
            <button key={id} onClick={() => _onNavClick?.(id)} className="min-h-[44px] px-2 text-[14px] font-medium text-white/65 hover:text-white transition-colors cursor-pointer">
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/[0.08] pt-14 pb-8 flex flex-col items-center text-center gap-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="min-h-[44px] cursor-pointer"
            aria-label="Back to top"
          >
            <img src="/logo-signature-white.png" alt="Shalom Ernest" width={521} height={186} className="h-14 sm:h-16 w-auto" loading="lazy" />
          </button>

          <SocialLinks className="pt-2" />
        </div>

        {/* ── 3. COPYRIGHT STRIP ── */}
        <div className="border-t border-white/[0.08] pt-8 flex justify-center text-center">
          <p className="text-stone-500 font-mono text-[12px] uppercase tracking-[0.16em]">
            © {new Date().getFullYear()} SHALOM ERNEST. ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
