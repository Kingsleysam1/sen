import React from 'react';
import { motion } from 'framer-motion';
import { GsapScrollReveal } from './GsapScrollReveal';

// Partner names live in shalomData PARTNERS; logos are added here as they are supplied.
// Names without a logo are not shown as plain text.
const PARTNER_LOGOS: { name: string; src: string }[] = [];


const CREDENTIALS = [
  { code: 'FIMC', full: 'Fellow, Institute of Management Consultants' },
  { code: 'CMC',  full: 'Certified Management Consultant' },
  { code: 'CMS',  full: 'Certified Management Specialist — Distinction' },
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

type Row = { key: string; lead?: string; text: string };

const COLUMNS: { title: string; rows: Row[] }[] = [
  { title: 'Certifications', rows: CREDENTIALS.map((c) => ({ key: c.code, lead: c.code, text: c.full })) },
  { title: 'Honours & Recognition', rows: HONOURS.map((h) => ({ key: h, text: h })) },
  { title: 'Institutional Affiliations', rows: AFFILIATIONS.map((a) => ({ key: a, text: a })) },
];

export function PartnersMarquee() {
  return (
    <section id="partners" className="bg-white text-[#111]" aria-labelledby="credibility-heading">
      <div className="site-container section-padding">
        <GsapScrollReveal>
          <p className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#555] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111]" aria-hidden="true" />
            Professional Credibility
          </p>
          <h2 id="credibility-heading" className="text-[clamp(36px,5.2vw,68px)] font-medium leading-[1.02] tracking-[-0.04em] mb-12 md:mb-16">
            Recognised. Certified. Trusted.
          </h2>
        </GsapScrollReveal>

        {/* Three equal columns that share one top line and one row rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-14">
          {COLUMNS.map((col, ci) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#666] pb-4 border-b border-black/15">
                {col.title}
              </h3>
              <ul>
                {col.rows.map((row, i) => (
                  <motion.li
                    key={row.key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: ci * 0.08 + i * 0.05 }}
                    className="flex items-baseline gap-4 py-4 border-b border-black/10 min-h-[56px] md:min-h-[80px]"
                  >
                    {row.lead && <span className="font-bold text-[15px] leading-snug text-[#111] w-12 shrink-0">{row.lead}</span>}
                    <span className="text-[15px] leading-snug text-[#333]">{row.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {PARTNER_LOGOS.length > 0 && (
          <GsapScrollReveal>
            <div className="mt-16">
              <h3 className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#666] mb-6">Partner Organisations</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 items-center">
                {PARTNER_LOGOS.map((logo) => (
                  <li key={logo.name} className="h-10 flex items-center">
                    <img src={logo.src} alt={logo.name} className="max-h-10 w-auto grayscale opacity-70" loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </GsapScrollReveal>
        )}
      </div>
    </section>
  );
}
