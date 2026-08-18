import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Globe, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/shalomData';
import { triggerHaptic } from '../utils/haptics';
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
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '' });
    }, 4000);
  };

  return (
    <footer id="inquiries" className="bg-[#0A0908] pt-20 sm:pt-28 pb-12" aria-label="Footer & Community">
      <div className="site-container">

        {/* ── 1. JOIN COMMUNITY CARD ── */}
        <GsapScrollReveal>
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <span className="text-[#C8A96E] font-bold text-[12px] sm:text-[13px] tracking-[0.22em] uppercase mb-3">
              JOIN COMMUNITY
            </span>
            <h2 className="text-[34px] sm:text-[46px] font-bold text-white tracking-tight leading-tight font-sans">
              Join <span className="text-[#C8A96E]">Shalom Ernest</span> Community
            </h2>
          </div>
        </GsapScrollReveal>

        {/* ── Form Card ── */}
        <GsapScrollReveal>
          <div className="max-w-2xl mx-auto bg-[#141210] border border-white/[0.08] rounded-2xl p-6 sm:p-10 mb-24 sm:mb-32 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/40 flex items-center justify-center text-[#C8A96E]">
                  <Check size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-white">Welcome to the Community</h3>
                <p className="text-stone-400 text-[14px]">You've been successfully subscribed to executive briefings and updates.</p>
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
                      className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
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
                      className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
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
                    className="bg-[#0A0908] border border-white/[0.08] focus:border-[#C8A96E]/60 rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-colors placeholder:text-stone-600"
                  />
                </div>

                {/* Pill Submit Button */}
                <div className="flex justify-center pt-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-w-[220px] py-3.5 px-8 rounded-full bg-[#C8A96E] hover:bg-[#E5C98E] text-[#0A0908] font-bold text-[14px] tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(200,169,110,0.25)]"
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
        <div className="border-t border-white/[0.08] pt-14 pb-8 flex flex-col items-center text-center gap-5">
          {/* Brand Name */}
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-extrabold text-[22px] tracking-tight text-white uppercase font-sans">
              SHALOM
            </span>
            <span className="font-extrabold text-[22px] tracking-tight text-[#C8A96E] uppercase font-sans">
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
                className="w-11 h-11 border border-white/[0.1] hover:border-[#C8A96E]/60 bg-[#141210] hover:bg-[#1C1916] flex items-center justify-center text-stone-400 hover:text-[#C8A96E] transition-all rounded-lg"
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
