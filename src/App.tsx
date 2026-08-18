import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { HeroSection }        from './components/HeroSection';
import { MarqueeStrip }       from './components/MarqueeStrip';
import { BioSection }         from './components/BioSection';
import { MetricsSection }     from './components/MetricsSection';
import { InitiativesSection } from './components/InitiativesSection';
import { ProgramsSection }    from './components/ProgramsSection';
import { PartnersMarquee }    from './components/PartnersMarquee';
import { MilestonesSection }  from './components/MilestonesSection';
import { EventsSection }      from './components/EventsSection';
import { TestimonialSlider }  from './components/TestimonialSlider';
import { ArticlesSection }    from './components/ArticlesSection';
import { FAQSection }         from './components/FAQSection';
import { CTASection }         from './components/CTASection';
import { FooterSection }      from './components/FooterSection';
import { GsapScrollReveal }   from './components/GsapScrollReveal';
import { ArticleModal }       from './components/ArticleModal';
import { BookingModal }       from './components/BookingModal';
import { Chatbot }            from './components/Chatbot';
import { Article }            from './data/shalomData';
import { CurtainWipe, CurtainStage } from './components/CurtainWipe';

// Dynamic SEO section map
const SECTION_LABELS: Record<string, string> = {
  hero:         'EXECUTIVE LEADERSHIP',
  bio:          'ABOUT SHALOM ERNEST',
  metrics:      'IMPACT METRICS',
  initiatives:  'AREAS OF EXPERTISE',
  programs:     'FEATURED PROGRAMS',
  partners:     'PROFESSIONAL CREDIBILITY',
  milestones:   'SELECTED ENGAGEMENTS',
  events:       'HOSTED EVENTS',
  testimonials: 'EXECUTIVE TESTIMONIALS',
  articles:     'INSIGHTS & THINKING',
  faq:          'ENGAGEMENT ENQUIRIES',
};

const SECTION_SEO: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Shalom C. Ernest | Management Consultant & Executive Leadership Trainer',
    description: 'Equipping leaders. Transforming organisations. Shalom C. Ernest (FIMC, CMC) — Strategic Advisor helping executives and institutions build strategic clarity and lasting impact across Africa.',
  },
  bio: {
    title: 'About Shalom C. Ernest | Management Consultant & Strategic Advisor',
    description: 'Shalom C. Ernest is a Certified Management Consultant (CMC, FIMC) with over 9 years of experience advising corporate boards, non-profits, and government agencies across Africa.',
  },
  metrics: {
    title: 'Impact Record | Shalom C. Ernest',
    description: '10,000+ leaders trained, 9+ years executive advisory, 95% client satisfaction rate. The measured impact of Shalom C. Ernest.',
  },
  initiatives: {
    title: 'Areas of Expertise | Shalom C. Ernest',
    description: 'Strategic Discovery, Executive Leadership Training, Corporate Alignment Advisory, and Clarity Coaching — delivered by Shalom C. Ernest (FIMC, CMC).',
  },
  programs: {
    title: 'Programs & Initiatives | Shalom C. Ernest',
    description: 'Clarity Conclave, Leadview Consulting, and Youth Making Impact — an ecosystem of leadership programs for individuals, corporations, and youth across Africa.',
  },
  partners: {
    title: 'Professional Credibility | Shalom C. Ernest',
    description: 'FIMC, CMC certified. Fellow of the Lateef Jakande Leadership Academy. Tony Elumelu Foundation Mentor. John Maxwell Team Certified.',
  },
  milestones: {
    title: 'Selected Engagements | Shalom C. Ernest',
    description: 'Keynote addresses, state advisory, international policy forums, and institutional inductions across Africa and globally.',
  },
  events: {
    title: 'Hosted Events & Calendar | Shalom C. Ernest',
    description: 'Register for upcoming executive leadership summits, masterclasses, and keynote lectures hosted by Shalom C. Ernest.',
  },
  testimonials: {
    title: 'Executive Testimonials | Shalom C. Ernest',
    description: 'What leaders, executives, and professionals say about working with Shalom C. Ernest.',
  },
  articles: {
    title: 'Insights & Thinking | Shalom C. Ernest',
    description: 'Strategic essays, leadership insights, and executive reflections by Shalom C. Ernest (FIMC, CMC).',
  },
  faq: {
    title: 'Engagement Enquiries | Shalom C. Ernest',
    description: 'Frequently asked questions about executive coaching, management consulting, speaker engagements, and strategy session bookings with Shalom C. Ernest.',
  },
};

function MainContent() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isBookingOpen, setIsBookingOpen]     = useState(false);
  const [curtainStage, setCurtainStage]       = useState<CurtainStage>('idle');
  const [pendingTargetId, setPendingTargetId] = useState<string | null>(null);
  const [targetLabel, setTargetLabel]         = useState<string>('');
  const [activeSection, setActiveSection]     = useState<string>('hero');

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, []);

  // Active section detection for SEO
  useEffect(() => {
    const sectionIds = ['hero', 'bio', 'metrics', 'initiatives', 'programs', 'partners', 'milestones', 'events', 'testimonials', 'articles', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => { observer.disconnect(); };
  }, []);

  const handleNavClick = (targetId: string) => {
    if (curtainStage !== 'idle') return;
    setPendingTargetId(targetId);
    setTargetLabel(SECTION_LABELS[targetId] || targetId.toUpperCase());
    setCurtainStage('covering');
  };

  const handleCoverComplete = () => {
    if (pendingTargetId) {
      const el = document.getElementById(pendingTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
        setActiveSection(pendingTargetId);
      }
    }
    setTimeout(() => { setCurtainStage('uncovering'); }, 40);
  };

  const handleUncoverComplete = () => {
    setCurtainStage('idle');
    setPendingTargetId(null);
  };

  const currentSEO = isBookingOpen
    ? { title: 'Book a Consultation | Shalom C. Ernest', description: 'Reserve an executive consultation or strategy session with Shalom C. Ernest (CMC, FIMC), Management Consultant and Strategic Advisor.' }
    : selectedArticle
    ? { title: `${selectedArticle.title} | Shalom C. Ernest Insights`, description: selectedArticle.summary }
    : SECTION_SEO[activeSection] || SECTION_SEO.hero;

  return (
    <div className="min-h-screen bg-[#080A08] text-[#F0F5F0] relative">
      {/* Dynamic SEO */}
      <Helmet>
        <html lang="en" />
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content="Shalom C. Ernest, Management Consultant Nigeria, Certified Management Consultant, CMC, FIMC, Leadership Trainer Africa, Executive Advisory, Corporate Governance, Strategic Execution, Leadview Consulting, Youth Making Impact, Clarity Conclave" />
        <meta name="author" content="Shalom C. Ernest" />
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shalom C. Ernest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />
        <meta name="theme-color" content="#080A08" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Shalom C. Ernest',
            jobTitle: 'Management Consultant & Strategic Advisor',
            description: 'Certified Management Consultant (CMC, FIMC) and Executive Leadership Trainer advising corporate boards, non-profits, and public sector teams across Africa and globally.',
            email: 'shalom4impact@gmail.com',
            telephone: '+234 813 207 8249',
            address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
            knowsAbout: ['Management Consulting', 'Corporate Governance', 'Strategic Execution', 'Youth Leadership Development', 'Organisational Design'],
            sameAs: [
              'https://www.linkedin.com/in/shalom-ernest-fimc-cmc-4028061a5',
              'https://instagram.com/shalomernest1',
              'https://www.facebook.com/shalom.ernest.98',
            ],
          })}
        </script>
      </Helmet>

      {/* Curtain transition */}
      <CurtainWipe
        stage={curtainStage}
        targetLabel={targetLabel}
        onCoverComplete={handleCoverComplete}
        onUncoverComplete={handleUncoverComplete}
      />

      <main className="w-full overflow-x-hidden">

        {/* 1. HERO — Who is this person? */}
        <HeroSection onNavClick={handleNavClick} onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2. MARQUEE STRIP — Credential ticker */}
        <MarqueeStrip />

        {/* 3. BIO — What do they stand for? */}
        <GsapScrollReveal>
          <BioSection />
        </GsapScrollReveal>

        {/* 4. IMPACT METRICS — Why should I trust them? */}
        <GsapScrollReveal>
          <MetricsSection />
        </GsapScrollReveal>

        {/* 5. EXPERTISE — What do they do? */}
        <GsapScrollReveal>
          <InitiativesSection onOpenBooking={() => setIsBookingOpen(true)} />
        </GsapScrollReveal>

        {/* 6. PROGRAMS — How can they help me? */}
        <GsapScrollReveal>
          <ProgramsSection onOpenBooking={() => setIsBookingOpen(true)} />
        </GsapScrollReveal>

        {/* 7. CREDIBILITY — Why trust them? */}
        <GsapScrollReveal>
          <PartnersMarquee />
        </GsapScrollReveal>

        {/* 8. MILESTONES — What impact have they made? */}
        <GsapScrollReveal>
          <MilestonesSection onOpenBooking={() => setIsBookingOpen(true)} />
        </GsapScrollReveal>

        {/* 9. EVENTS — Active programmes */}
        <GsapScrollReveal>
          <EventsSection />
        </GsapScrollReveal>

        {/* 10. TESTIMONIALS — What have others said? */}
        <GsapScrollReveal>
          <TestimonialSlider />
        </GsapScrollReveal>

        {/* 11. FAQ — Engagement enquiries */}
        <GsapScrollReveal>
          <FAQSection />
        </GsapScrollReveal>
      </main>

      {/* Footer */}
      <GsapScrollReveal>
        <FooterSection onNavClick={handleNavClick} onOpenBooking={() => setIsBookingOpen(true)} />
      </GsapScrollReveal>

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Floating Chatbot */}
      <Chatbot onOpenBooking={() => setIsBookingOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}
