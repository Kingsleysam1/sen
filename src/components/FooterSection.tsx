import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Globe, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/shalomData';
import { triggerHaptic } from '../utils/haptics';
import { openEnquiryEmail, CONTACT } from '../utils/enquiry';
import { GsapScrollReveal } from './GsapScrollReveal';

interface FooterSectionProps {
  onNavClick?: (targetId: string) => void;
  onOpenBooking?: () => void;
}

export function FooterSection({ onNavClick: _onNavClick, onOpenBooking: _onOpenBooking }: FooterSectionProps) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('medium');
    openEnquiryEmail('Please add me to the Shalom Ernest community', {
      'First name': formData.firstName,
      'Last name': formData.lastName,
      Email: formData.email,
    });
    setSubmitted(true);
  };

  return (
    <footer id="inquiries" className="bg-black pt-20 sm:pt-28 pb-12" aria-label="Footer & Community">
      <div className="site-container">

        {/* ── 1. JOIN COMMUNITY CARD ── */}
        <GsapScrollReveal>
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <span className="text-white/60 font-semibold text-[11px] sm:text-[12px] tracking-[0.16em] uppercase mb-4">
              JOIN COMMUNITY
            </span>
            <h2 className="text-[clamp(34px,5vw,64px)] font-medium text-white tracking-[-0.04em] leading-[1.02]">
              Join Shalom Ernest Community
            </h2>
          </div>
        </GsapScrollReveal>

        {/* ── Form Card ── */}
        <GsapScrollReveal>
          <div className="max-w-2xl mx-auto bg-[#111] rounded-[24px] p-6 sm:p-10 mb-24 sm:mb-32">
            {submitted ? (
              <div className="text-center py-8 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#8AC4FF]/15 border border-[#8AC4FF]/40 flex items-center justify-center text-[#8AC4FF]">
                  <Check size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-white">One last step: press Send</h3>
                <p className="text-stone-400 text-[14px] max-w-md">Your email app has opened with your request to join, addressed to {CONTACT.email}. Press Send and you're on the list.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* 2-column Name inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[13px] font-medium text-stone-300">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                      className="bg-black border border-white/[0.12] focus:border-white/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[13px] font-medium text-stone-300">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                      className="bg-black border border-white/[0.12] focus:border-white/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                    />
                  </div>
                </div>

                {/* Email input */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[13px] font-medium text-stone-300">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="bg-black border border-white/[0.12] focus:border-white/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                  />
                </div>

                {/* Pill Submit Button */}
                <div className="flex justify-center pt-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-w-[220px] py-3.5 px-8 rounded-full bg-white hover:bg-[#8AC4FF] text-black font-semibold text-[14px] tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(138, 196, 255,0.25)]"
                  >
                    <span>Join Community</span>
                    <span className="text-[16px]">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </GsapScrollReveal>

        {/* ── 2. MINIMALIST CENTERED FOOTER ── */}
        <nav aria-label="Footer" className="border-t border-white/[0.08] py-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {[
            ['About', 'bio'], ['Services', 'initiatives'], ['Programs', 'programs'],
            ['Engagements', 'milestones'], ['Events', 'events'], ['FAQ', 'faq'],
          ].map(([label, id]) => (
            <button key={id} onClick={() => _onNavClick?.(id)} className="min-h-[44px] px-2 text-[14px] font-medium text-white/65 hover:text-white transition-colors cursor-pointer">
              {label}
            </button>
          ))}
        </nav>

        {/* Direct contact: real text, not inside an image */}
        <div id="contact" className="border-t border-white/[0.08] py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center sm:text-left">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/50 mb-2">Email</p>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center min-h-[44px] text-[18px] sm:text-[20px] font-medium text-white hover:text-[#8AC4FF] break-all transition-colors">{CONTACT.email}</a>
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/50 mb-2">Phone</p>
            <a href={CONTACT.phoneHref} className="inline-flex items-center min-h-[44px] text-[18px] sm:text-[20px] font-medium text-white hover:text-[#8AC4FF] transition-colors">{CONTACT.phone}</a>
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/50 mb-2">Based in</p>
            <p className="text-[18px] sm:text-[20px] font-medium text-white">{CONTACT.city}</p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-14 pb-8 flex flex-col items-center text-center gap-5">
          {/* Brand Name */}
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-semibold text-[22px] tracking-[-0.02em] text-white">
              SHALOM
            </span>
            <span className="font-medium text-[22px] tracking-[-0.02em] text-white/55">
              ERNEST
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-stone-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium max-w-xl">
            MANAGEMENT CONSULTANT • STRATEGIC ADVISOR • INSTITUTION BUILDER
          </p>

          {/* Social Icons (Square bordered) */}
          <div className="flex items-center gap-3 pt-2">
            {[
              { href: PROFILE_DATA.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
              { href: PROFILE_DATA.socials.instagram, label: 'Instagram', icon: Instagram },
              { href: PROFILE_DATA.socials.facebook, label: 'Facebook', icon: Facebook },
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
          <p className="text-stone-500 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider">
            © {new Date().getFullYear()} SHALOM ERNEST. ALL RIGHTS RESERVED
          </p>
        </div>

      </div>
    </footer>
  );
}
