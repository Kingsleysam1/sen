import React from 'react';

const MARQUEE_ITEMS = [
  'Management Consultant',
  'Executive Leadership Trainer',
  'Strategic Advisor',
  'CMC · FIMC Certified',
  'Clarity Conclave',
  'Leadview Consulting',
  'Youth Making Impact',
  'Corporate Governance',
  'Organisational Development',
  'Pan-African Leadership',
];

function MarqueeContent() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {MARQUEE_ITEMS.map((item, i) => (
        <React.Fragment key={i}>
          <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.16em] text-stone-300">
            {item}
          </span>
          <span className="block w-2 h-2 rounded-full shrink-0 bg-[#C8A96E]" aria-hidden="true" />
        </React.Fragment>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section
      className="w-full overflow-hidden border-y border-white/[0.08] bg-[#141210] py-4"
      aria-label="Credentials and expertise"
    >
      <div className="flex w-max animate-marquee" aria-hidden="true">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
}
