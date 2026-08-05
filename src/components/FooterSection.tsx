import React from 'react';
import { PROFILE_DATA } from '../data/shalomData';
import { Linkedin, Instagram, Facebook, ArrowUpRight, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';

interface FooterSectionProps {
  onNavClick: (targetId: string) => void;
  onOpenBooking: () => void;
}

export function FooterSection({ onNavClick, onOpenBooking }: FooterSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="inquiries"
      className={`w-full py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center transition-colors duration-500 ${
        isLight ? 'bg-[#FAFAFA]' : 'bg-[#0A0B0D]'
      }`}
    >
      {/* Top Banner Call-to-Action */}
      <div
        className={`max-w-[1100px] w-full mx-auto mb-8 rounded-[28px] p-8 sm:p-10 md:p-12 text-center border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 ${
          isLight
            ? 'bg-stone-900 text-white border-stone-800'
            : 'bg-[#111317] text-[#F3F3EE] border-white/10'
        }`}
      >
        <span className="text-[#C8C3A7] text-xs uppercase tracking-[0.2em] font-mono font-semibold block mb-2">
          EXECUTIVE STRATEGY & ADVISORY
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white max-w-2xl mx-auto leading-tight mb-6">
          Every transformation begins with a clear conversation.
        </h2>
        <button
          onClick={() => {
            triggerHaptic('medium');
            onOpenBooking();
          }}
          className="inline-flex items-center gap-2.5 bg-[#E2DFD2] hover:bg-[#d5d1c2] text-stone-900 font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer active:scale-95"
        >
          <span>Book Strategy Session</span>
          <ArrowUpRight className="w-4 h-4 text-stone-900" />
        </button>
      </div>

      {/* Main Footer Card Container */}
      <div
        className={`max-w-[1100px] w-full mx-auto rounded-[28px] border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] px-6 py-10 sm:px-12 sm:py-12 md:px-[72px] md:py-[56px] transition-all duration-500 ${
          isLight
            ? 'bg-white border-[#F9FAFB] text-[#0A0A0A]'
            : 'bg-[#111317] border-white/10 text-[#F3F3EE]'
        }`}
      >
        {/* Top Section: Brand & Navigation Grid */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-12">
          
          {/* Left Column (Brand) */}
          <div className="w-full lg:w-[40%] flex flex-col items-start">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center gap-3">
              {/* Custom Logo Image */}
              <div className="h-10 w-auto flex items-center justify-center shrink-0">
                <img 
                  src="/src/assets/images/Untit (1).png" 
                  alt="Brand Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <span
                className={`text-[19px] font-bold tracking-tight ${
                  isLight ? 'text-[#0A0A0A]' : 'text-white'
                }`}
              >
                {PROFILE_DATA.fullName}
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-[13px] leading-[1.6] max-w-[340px] mt-5 mb-6 ${
                isLight ? 'text-[#71717A]' : 'text-stone-400'
              }`}
            >
              Management Consultant & Executive Clarity Coach empowering leaders and organizations to transform complex challenges into clear, actionable, high-impact outcomes across Africa and globally.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4">
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`transition-opacity duration-200 hover:opacity-70 ${
                  isLight ? 'text-[#0A0A0A]' : 'text-white'
                }`}
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a
                href={PROFILE_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-opacity duration-200 hover:opacity-70 ${
                  isLight ? 'text-[#0A0A0A]' : 'text-white'
                }`}
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a
                href={PROFILE_DATA.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`transition-opacity duration-200 hover:opacity-70 ${
                  isLight ? 'text-[#0A0A0A]' : 'text-white'
                }`}
              >
                <Facebook className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className={`transition-opacity duration-200 hover:opacity-70 ${
                  isLight ? 'text-[#0A0A0A]' : 'text-white'
                }`}
              >
                <Twitter className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Right Column (Links Grid) */}
          <div className="w-full lg:w-[50%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-4">
              
              {/* Column 1: Services */}
              <div>
                <h4
                  className={`font-semibold text-[14px] mb-5 ${
                    isLight ? 'text-[#0A0A0A]' : 'text-white'
                  }`}
                >
                  Services
                </h4>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <button
                      onClick={() => onNavClick('initiatives')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Executive Coaching
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('initiatives')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Strategic Advisory
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('initiatives')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Leadership Governance
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('initiatives')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Operational Execution
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Navigation */}
              <div>
                <h4
                  className={`font-semibold text-[14px] mb-5 ${
                    isLight ? 'text-[#0A0A0A]' : 'text-white'
                  }`}
                >
                  Navigation
                </h4>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <button
                      onClick={() => onNavClick('bio')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      About & Story
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('metrics')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Impact & Stats
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('events')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Hosted Events
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('testimonials')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Testimonials
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavClick('faq')}
                      className={`text-[13px] text-left transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      Engagement FAQ
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Direct Contact */}
              <div className="col-span-2 sm:col-span-1">
                <h4
                  className={`font-semibold text-[14px] mb-5 ${
                    isLight ? 'text-[#0A0A0A]' : 'text-white'
                  }`}
                >
                  Direct Contact
                </h4>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <a
                      href={`mailto:${PROFILE_DATA.email}`}
                      className={`text-[13px] flex items-center gap-1.5 transition-colors duration-200 truncate ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{PROFILE_DATA.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${PROFILE_DATA.phone}`}
                      className={`text-[13px] flex items-center gap-1.5 transition-colors duration-200 ${
                        isLight
                          ? 'text-[#71717A] hover:text-[#0A0A0A]'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{PROFILE_DATA.phone}</span>
                    </a>
                  </li>
                  <li>
                    <span
                      className={`text-[13px] flex items-center gap-1.5 ${
                        isLight ? 'text-[#71717A]' : 'text-stone-400'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{PROFILE_DATA.location}</span>
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={onOpenBooking}
                      className={`text-[13px] font-semibold text-left transition-all hover:underline underline-offset-4 ${
                        isLight ? 'text-amber-800' : 'text-[#C8C3A7]'
                      }`}
                    >
                      + Book Session
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Horizontal Divider */}
        <hr
          className={`mb-6 w-full border-t ${
            isLight ? 'border-[#F4F4F5]' : 'border-white/10'
          }`}
        />

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Copyright */}
          <div
            className={`text-[13px] ${
              isLight ? 'text-[#71717A]' : 'text-stone-400'
            }`}
          >
            &copy; {currentYear} Shalom C. Ernest. All rights reserved.
          </div>

          {/* Legal Links & Back to top */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenBooking}
              className={`text-[13px] underline underline-offset-[4px] transition-colors duration-200 ${
                isLight
                  ? 'text-[#71717A] decoration-[#E5E7EB] hover:text-[#0A0A0A] hover:decoration-[#0A0A0A]'
                  : 'text-stone-400 decoration-stone-800 hover:text-white hover:decoration-white'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenBooking}
              className={`text-[13px] underline underline-offset-[4px] transition-colors duration-200 ${
                isLight
                  ? 'text-[#71717A] decoration-[#E5E7EB] hover:text-[#0A0A0A] hover:decoration-[#0A0A0A]'
                  : 'text-stone-400 decoration-stone-800 hover:text-white hover:decoration-white'
              }`}
            >
              Terms of Advisory
            </button>
            <button
              onClick={scrollToTop}
              className={`text-[13px] font-mono flex items-center gap-1 transition-colors duration-200 ${
                isLight
                  ? 'text-[#71717A] hover:text-[#0A0A0A]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <span>Back to Top &uarr;</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}


