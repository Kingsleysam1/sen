import React from 'react';
import { PROFILE_DATA } from '../data/shalomData';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface FooterSectionProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { label: 'About',        target: 'bio' },
  { label: 'Services',     target: 'initiatives' },
  { label: 'Programs',     target: 'programs' },
  { label: 'Engagements',  target: 'milestones' },
  { label: 'Events',       target: 'events' },
  { label: 'FAQ',          target: 'faq' },
];

const SERVICE_LINKS = [
  'Strategic Discovery Session',
  'Executive Leadership Training',
  'Corporate Alignment Advisory',
  'Clarity & Legacy Coaching',
];

export function FooterSection({ onNavClick, onOpenBooking }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="inquiries"
      className="bg-[#080A08] border-t border-white/[0.08]"
      aria-label="Footer"
    >
      <div className="site-container py-16 md:py-20">

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <button onClick={scrollToTop} aria-label="Back to top" className="cursor-pointer self-start flex items-center gap-3">
              <img
                src="/src/assets/images/Untit (1).png"
                alt="SENAPP logo"
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
              <span className="typo-eyebrow text-[#9EAEA0]">Shalom Ernest</span>
            </button>

            <p className="typo-body-sm text-[#627364] max-w-[340px]">
              Management Consultant, Executive Leadership Trainer &amp; Strategic Advisor empowering leaders and organisations to build clarity, alignment, and enduring impact — across Africa and globally.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { href: PROFILE_DATA.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
                { href: PROFILE_DATA.socials.instagram, label: 'Instagram', icon: Instagram },
                { href: PROFILE_DATA.socials.facebook, label: 'Facebook', icon: Facebook },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/[0.08] hover:border-[#C8A96E]/50 flex items-center justify-center text-[#627364] hover:text-[#C8A96E] transition-colors rounded-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['FIMC', 'CMC', 'TEF Mentor'].map((c) => (
                <span key={c} className="font-mono text-[10px] tracking-wider uppercase border border-white/[0.06] text-[#627364] px-2 py-0.5">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="typo-eyebrow text-[#C8A96E] mb-5">Navigate</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => { triggerHaptic('selection'); onNavClick(link.target); }}
                    className="typo-footer-link hover:text-[#F0F5F0] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="typo-eyebrow text-[#C8A96E] mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((svc) => (
                <li key={svc}>
                  <button
                    onClick={() => { triggerHaptic('selection'); onNavClick('initiatives'); }}
                    className="typo-footer-link hover:text-[#F0F5F0] transition-colors cursor-pointer text-left"
                  >
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h3 className="typo-eyebrow text-[#C8A96E]">Contact</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#627364]">Email</span>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="typo-footer-link hover:text-[#F0F5F0] transition-colors"
                >
                  {PROFILE_DATA.email}
                </a>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#627364]">Phone</span>
                <a
                  href={`tel:${PROFILE_DATA.phone}`}
                  className="typo-footer-link hover:text-[#F0F5F0] transition-colors"
                >
                  {PROFILE_DATA.phone}
                </a>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#627364]">Location</span>
                <p className="typo-footer-link text-[#9EAEA0]">
                  {PROFILE_DATA.location}
                </p>
              </div>

              <button
                onClick={() => { triggerHaptic('medium'); onOpenBooking(); }}
                className="btn-primary py-2.5 px-5 typo-btn mt-2 self-start"
              >
                <span>Book a Consultation</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-16 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="typo-footer-copy">
            © {currentYear} {PROFILE_DATA.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="typo-footer-copy">
              Designed for executive excellence
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 border border-white/[0.08] hover:border-[#C8A96E]/50 flex items-center justify-center text-[#627364] hover:text-[#C8A96E] transition-colors cursor-pointer rounded-sm"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
