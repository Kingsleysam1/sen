import React from 'react';

const MARQUEE_ITEMS = [
  'Executive Leadership Trainer',
  'Certified Management Consultant',
  'Clarity Coach',
  'Youth Development Professional',
  'Public Speaker',
  'Strategic Advisor',
];

function MarqueeContent() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {MARQUEE_ITEMS.map((item, i) => (
        <React.Fragment key={i}>
          <span className="whitespace-nowrap text-[22px] sm:text-[30px] font-medium tracking-[-0.02em] text-white">
            {item}
          </span>
          <span className="block w-2.5 h-2.5 rounded-full shrink-0 bg-[#8AC4FF]" aria-hidden="true" />
        </React.Fragment>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section
      className="w-full overflow-hidden bg-black py-6 sm:py-8"
      aria-label="Credentials and expertise"
    >
      <div className="flex w-max animate-marquee" aria-hidden="true">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
}
