import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../data/shalomData';
import { GsapScrollReveal } from './GsapScrollReveal';

function PartnerItem({ name }: { key?: React.Key; name: string }) {
  return (
    <div className="shrink-0 flex items-center px-8 border-r border-black/10">
      <span className="text-[16px] font-semibold text-[#333] hover:text-black transition-colors whitespace-nowrap">
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
      className="bg-white text-[#111]"
      aria-labelledby="credibility-heading"
    >
      <div className="site-container section-padding">

        {/* ── Header ── */}
        <GsapScrollReveal>
          <div className="flex items-center gap-2 mb-10 md:mb-14">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555]">Professional Credibility</span>
          </div>
        </GsapScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: Credentials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <GsapScrollReveal>
              <h2
                id="credibility-heading"
                className="text-[clamp(34px,4.4vw,58px)] font-medium leading-[1.02] tracking-[-0.04em] text-[#111]"
              >
                Recognised. Certified. Trusted.
              </h2>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <div className="space-y-4">
                <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#777] block mb-4">Certifications</span>
                {CREDENTIALS.map((cred, i) => (
                  <motion.div
                    key={cred.code}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="flex items-baseline gap-4 border-b border-black/10 pb-3"
                  >
                    <span className="font-bold text-[#111] text-[16px] shrink-0 w-12">
                      {cred.code}
                    </span>
                    <span className="text-[15px] text-[#444] leading-snug">
                      {cred.full}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <div className="space-y-2.5">
                <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#777] block mb-4">Honours & Recognition</span>
                {HONOURS.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111] mt-2 shrink-0" aria-hidden="true" />
                    <p className="text-[15px] text-[#333] leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </GsapScrollReveal>
          </div>

          {/* RIGHT: Affiliations & Partners (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <GsapScrollReveal>
              <div className="space-y-3">
                <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#777] block mb-4">Institutional Affiliations</span>
                {AFFILIATIONS.map((aff, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="bg-[#F4F4F2] px-5 py-4 rounded-2xl"
                  >
                    <p className="text-[15px] font-medium text-[#111]">{aff}</p>
                  </motion.div>
                ))}
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal>
              <div>
                <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#777] block mb-6">Partner Organisations</span>
                <div className="overflow-hidden border-y border-black/10 py-4">
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
