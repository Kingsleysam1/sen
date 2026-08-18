import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';

function PartnerItem({ name }: { key?: React.Key; name: string }) {
  return (
    <div className="shrink-0 flex items-center px-8 border-r border-white/[0.06]">
      <span className="text-[15px] font-medium text-[#627364] hover:text-[#9EAEA0] transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

const CREDENTIALS = [
  { code: 'FIMC', full: 'Fellow, Institute of Management Consultants' },
  { code: 'CMC',  full: 'Certified Management Consultant' },
  { code: 'CMS',  full: 'Certified Management Specialist — Distinction' },
  { code: 'JMT',  full: 'John Maxwell Team Certified' },
];

const AFFILIATIONS = [
  'Tony Elumelu Foundation Mentor',
  'Lateef Jakande Leadership Fellow',
  'Friends for Leadership Network (120+ Nations)',
  'Platform Public Service Bootcamp Alumnus',
];

const HONOURS = [
  'MLA Foundation Leadership Award',
  'National Orientation Agency Civic Impact Award',
  '100 Change-Makers on the Plateau',
  '20 Most Influential Young People — Taraba State (2021)',
];

export function PartnersMarquee() {
  return (
    <section
      id="partners"
      className="bg-[#080A08] border-t border-white/[0.08]"
      aria-labelledby="credibility-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex items-center gap-3 mb-16 md:mb-20">
            <span className="block w-8 h-[2px] bg-[#C8A96E]" />
            <span className="typo-eyebrow">Professional Credibility</span>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <GsapScrollReveal>
              <h2
                id="credibility-heading"
                className="typo-section-heading text-[#F0F5F0]"
              >
                Recognised. Certified. <span className="text-[#C8A96E]">Trusted.</span>
              </h2>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <div className="space-y-4">
                <span className="typo-eyebrow block mb-4">Certifications</span>
                {CREDENTIALS.map((cred, i) => (
                  <motion.div
                    key={cred.code}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="flex items-start gap-4 border-b border-white/[0.06] pb-3"
                  >
                    <span className="font-bold text-[#C8A96E] text-[16px] shrink-0 mt-0.5">
                      {cred.code}
                    </span>
                    <span className="text-[14px] text-[#9EAEA0] leading-snug">
                      {cred.full}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <div className="space-y-2.5">
                <span className="typo-eyebrow block mb-4">Honours & Recognition</span>
                {HONOURS.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#C8A96E] mt-1 text-[10px]">◆</span>
                    <p className="text-[13px] text-[#627364] leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </GsapScrollReveal>
          </div>

          {/* RIGHT: Affiliations & Partners (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <GsapScrollReveal>
              <div className="space-y-3">
                <span className="typo-eyebrow block mb-4">Institutional Affiliations</span>
                {AFFILIATIONS.map((aff, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="border border-white/[0.08] bg-[#0E110E] px-5 py-4 rounded-sm"
                  >
                    <p className="text-[14px] font-medium text-[#9EAEA0]">{aff}</p>
                  </motion.div>
                ))}
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <div>
                <span className="typo-eyebrow block mb-6">Partner Organisations</span>
                <div className="overflow-hidden border-y border-white/[0.06] py-3">
                  <div className="flex w-max animate-marquee-slow">
                    {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                      <PartnerItem key={`${partner}-${i}`} name={partner} />
                    ))}
                  </div>
                </div>
              </div>
            </GsapScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
