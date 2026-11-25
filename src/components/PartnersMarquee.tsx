import React from 'react';
import { GsapScrollReveal } from './GsapScrollReveal';

// Affiliations, certifications and organisations Shalom has served.
// Logos were cut from the composite supplied by the client; replace any file in
// public/src/assets/images/logos/ with a sharper original when one is available.
const LOGOS = [
  { slug: 'noa', name: "National Orientation Agency", w: 168, h: 178 },
  { slug: 'imc', name: "Institute of Management Consultants", w: 152, h: 182 },
  { slug: 'cmc', name: "Certified Management Consultant", w: 212, h: 106 },
  { slug: 'icmci', name: "International Council of Management Consulting Institutes", w: 148, h: 178 },
  { slug: 'ilcs', name: "Institute of Leadership Coaching and Strategy", w: 350, h: 170 },
  { slug: 'lbs', name: "Lagos Business School", w: 346, h: 140 },
  { slug: 'london-graduate-school', name: "London Graduate School", w: 570, h: 162 },
  { slug: 'lagos-state', name: "Lagos State Government", w: 172, h: 170 },
  { slug: 'mwce', name: "Lagos State Ministry of Wealth Creation and Employment", w: 196, h: 168 },
  { slug: 'lascopa', name: "Lagos State Consumer Protection Agency", w: 160, h: 182 },
  { slug: 'rwanda-cooperation', name: "Rwanda Cooperation", w: 264, h: 156 },
  { slug: 'aun', name: "American University of Nigeria", w: 268, h: 124 },
  { slug: 'covenant', name: "Covenant University", w: 168, h: 180 },
  { slug: 'aldc', name: "ALDC", w: 394, h: 140 },
  { slug: 'inspired-2-lead', name: "Inspired 2 Lead", w: 232, h: 174 },
  { slug: 'ili', name: "Inspiring Leadership Institute", w: 266, h: 162 },
  { slug: 'mi', name: "MI", w: 146, h: 162 },
  { slug: 'ndic', name: "Nigeria Deposit Insurance Corporation", w: 244, h: 106 },
  { slug: 'ican', name: "Institute of Chartered Accountants of Nigeria", w: 384, h: 66 },
  { slug: 'nfc', name: "Nigerian Film Corporation", w: 146, h: 150 },
  { slug: 'ljla', name: "Lateef Jakande Leadership Academy", w: 174, h: 172 },
  { slug: 'african-union', name: "African Union", w: 224, h: 96 },
  { slug: 'adoo', name: "A'DOO Creativity Arts Media", w: 172, h: 206 },
  { slug: 'afi', name: "African Film Institute", w: 234, h: 116 },
  { slug: 'unijos', name: "University of Jos", w: 134, h: 144 },
  { slug: 'hand-of-favor', name: "Hand of Favor Foundation", w: 222, h: 130 },
  { slug: 'pannyword', name: "Pannyword", w: 204, h: 124 },
  { slug: 'itr', name: "ITR", w: 174, h: 138 },
  { slug: 'platform-bootcamp', name: "The Platform Public Service Bootcamp", w: 232, h: 327 },
  { slug: 'tef', name: "The Tony Elumelu Foundation", w: 362, h: 80 },
];

const logoSrc = (slug: string) => `/src/assets/images/logos/${slug}.png`;

const half = Math.ceil(LOGOS.length / 2);
const ROWS = [LOGOS.slice(0, half), LOGOS.slice(half)];

function LogoRow({ logos, reverse }: { logos: typeof LOGOS; reverse?: boolean }) {
  // The list is rendered twice so the strip loops without a gap.
  return (
    <div className="logo-marquee group relative overflow-hidden">
      <ul className={`logo-track flex w-max items-center gap-12 sm:gap-16 ${reverse ? 'logo-track-reverse' : ''}`}>
        {[...logos, ...logos].map((logo, i) => (
          <li key={`${logo.slug}-${i}`} className="shrink-0" data-dup={i >= logos.length ? 'true' : undefined}>
            <img
              src={logoSrc(logo.slug)}
              alt=""
              title={logo.name}
              width={logo.w}
              height={logo.h}
              className="h-12 sm:h-16 w-auto max-w-[130px] sm:max-w-[170px] object-contain"
              loading="lazy"
              draggable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section id="partners" className="bg-white text-[#111]" aria-labelledby="credibility-heading">
      <div className="site-container section-padding pb-10 sm:pb-12">
        <GsapScrollReveal>
          <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
            Professional Credibility
          </p>
          <h2 id="credibility-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
            Recognised. Certified. Trusted.
          </h2>
          <p className="mt-5 text-[16px] sm:text-[17px] text-[#555] max-w-[620px]">
            Institutional affiliations, certifications and organisations served.
          </p>
        </GsapScrollReveal>
      </div>

      <div aria-hidden="true" className="pb-24 sm:pb-32 flex flex-col gap-8 sm:gap-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <LogoRow logos={ROWS[0]} />
        <LogoRow logos={ROWS[1]} reverse />
      </div>

      {/* Full list for screen readers (the moving rows repeat for the loop) */}
      <ul className="sr-only">
        {LOGOS.map((l) => <li key={l.slug}>{l.name}</li>)}
      </ul>
    </section>
  );
}
