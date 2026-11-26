import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Globe, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/shalomData';
import { triggerHaptic } from '../utils/haptics';
import { sendEnquiry } from '../utils/enquiry';
import { GsapScrollReveal } from './GsapScrollReveal';

interface FooterSectionProps {
  onNavClick?: (targetId: string) => void;
  onOpenBooking?: () => void;
}

export function FooterSection({ onNavClick: _onNavClick, onOpenBooking: _onOpenBooking }: FooterSectionProps) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    triggerHaptic('medium');
    setStatus('sending');
    const result = await sendEnquiry('New newsletter subscriber: ' + `${formData.firstName} ${formData.lastName}`.trim(), {
      'First name': formData.firstName,
      'Last name': formData.lastName,
      Email: formData.email,
    }, formData.email);
    setStatus(result.ok ? 'sent' : 'failed');
  };

  return (
    <footer id="inquiries" className="bg-black pt-20 sm:pt-28 pb-12" aria-label="Footer & Community">
      <div className="site-container">

        {/* ── 1. JOIN COMMUNITY CARD ── */}
        <GsapScrollReveal>
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <span className="text-white/60 font-semibold text-[12px] tracking-[0.16em] uppercase mb-4">
              JOIN COMMUNITY
            </span>
            <h2 className="text-[clamp(36px,5.2vw,68px)] font-medium text-white tracking-[-0.04em] leading-[1.02]">
              Sign Up for Newsletter
            </h2>
          </div>
        </GsapScrollReveal>

        {/* ── Form Card ── */}
        <GsapScrollReveal>
          <div className="max-w-2xl mx-auto bg-[#111] rounded-[24px] p-6 sm:p-10 mb-24 sm:mb-32">
            {status === 'sent' ? (
              <div className="text-center py-8 flex flex-col items-center gap-3" role="status" aria-live="polite">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">
                  <Check size={24} />
                </div>
                <h3 className="text-[22px] font-medium tracking-[-0.02em] text-white">You're subscribed, {formData.firstName || 'friend'}.</h3>
                <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                  Shalom's newsletter will arrive at {formData.email}, with upcoming events, programmes and leadership notes.
                </p>
              </div>
            ) : status === 'failed' ? (
              <div className="text-center py-8 flex flex-col items-center gap-3" role="alert">
                <h3 className="text-[22px] font-medium tracking-[-0.02em] text-white">That didn't go through.</h3>
                <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                  Please check your connection and try again in a moment.
                </p>
                <button onClick={() => setStatus('idle')} className="mt-2 px-6 py-3 rounded-full bg-white text-black text-[14px] font-semibold cursor-pointer">Try again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* 2-column Name inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[14px] font-medium text-stone-300">First Name</label>
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
                    <label className="text-[14px] font-medium text-stone-300">Last Name</label>
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
                  <label className="text-[14px] font-medium text-stone-300">Email Address</label>
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
                    disabled={status === 'sending'}
                    className="disabled:opacity-60 disabled:cursor-wait w-full sm:w-auto min-w-[220px] py-3.5 px-8 rounded-full bg-white hover:bg-[#8AC4FF] text-black font-semibold text-[14px] tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(138, 196, 255,0.25)]"
                  >
                    <span>{status === 'sending' ? 'Subscribing…' : 'Subscribe'}</span>
                    {status !== 'sending' && <span className="text-[16px]" aria-hidden="true">→</span>}
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
