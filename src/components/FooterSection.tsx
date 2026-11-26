import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube, Globe } from 'lucide-react';
import { PROFILE_DATA } from '../data/shalomData';

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

          {/* Social Icons (Square bordered) */}
          <div className="flex items-center gap-3 pt-2">
            {[
              { href: PROFILE_DATA.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
              { href: PROFILE_DATA.socials.instagram, label: 'Instagram', icon: Instagram },
              { href: PROFILE_DATA.socials.facebook, label: 'Facebook', icon: Facebook },
              { href: PROFILE_DATA.socials.youtube, label: 'YouTube', icon: Youtube },
              { href: 'https://leadviewconsulting.com', label: 'Website', icon: Globe },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 min-w-[44px] min-h-[44px] bg-white/[0.08] hover:bg-white flex items-center justify-center text-white/80 hover:text-black transition-all rounded-full"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
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
