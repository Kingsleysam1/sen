import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from './components/HeroSection';
import { BioSection } from './components/BioSection';
import { CurtainWipe, CurtainStage } from './components/CurtainWipe';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { MetricsSection } from './components/MetricsSection';
import { InitiativesSection } from './components/InitiativesSection';
import { MilestonesSection } from './components/MilestonesSection';
import { EventsSection } from './components/EventsSection';
import { TestimonialSlider } from './components/TestimonialSlider';
import { PartnersMarquee } from './components/PartnersMarquee';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { GsapScrollReveal } from './components/GsapScrollReveal';
import { AnimatedBackgroundOrbs } from './components/AnimatedBackgroundOrbs';
import { ArticleModal } from './components/ArticleModal';
import { BookingModal } from './components/BookingModal';
import { Chatbot } from './components/Chatbot';
import { Article } from './data/shalomData';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const SECTION_LABELS: Record<string, string> = {
  hero: 'EXECUTIVE DIRECTIVE',
  bio: 'EXECUTIVE PROFILE & PHILOSOPHY',
  metrics: 'IMPACT METRICS',
  partners: 'TRUSTED ORGANIZATIONS',
  initiatives: 'STRATEGIC ADVISORY & SERVICES',
  milestones: 'SELECTED ENGAGEMENTS',
  events: 'HOSTED EVENTS & CALENDAR',
  testimonials: 'EXECUTIVE TESTIMONIALS',
  faq: 'ENGAGEMENT ENQUIRIES',
};

const SECTION_SEO: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Shalom C. Ernest | Management Consultant & Leadership Trainer',
    description: 'Official executive platform of Shalom C. Ernest — Management Consultant, Certified Management Specialist (CMC, FIMC), and Executive Leadership Advisor helping organizations build strategic clarity.',
  },
  bio: {
    title: 'Executive Profile & Philosophy | Shalom C. Ernest',
    description: 'Discover Shalom C. Ernest\'s leadership thesis: Great organizations don\'t fail from lack of ambition, they fail from lack of clarity. Nearly a decade advising corporate, public, and non-profit leaders.',
  },
  metrics: {
    title: 'Impact Metrics & Key Accomplishments | Shalom C. Ernest',
    description: 'Over 10,000+ executives trained, 45+ institutional advisories, and 12+ international keynotes across Africa.',
  },
  partners: {
    title: 'Trusted Organizations & Partners | Shalom C. Ernest',
    description: 'Organizations, public sector institutions, and multinational corporations advised by Shalom C. Ernest.',
  },
  initiatives: {
    title: 'Strategic Advisory & Leadership Services | Shalom C. Ernest',
    description: 'Explore executive services in corporate governance, organizational design, strategic leadership development, and policy advisory.',
  },
  milestones: {
    title: 'Selected Engagements & Policy Advisory | Shalom C. Ernest',
    description: 'High-impact policy advisories, institutional transformations, and capacity development milestones across public and private sectors.',
  },
  events: {
    title: 'Hosted Events & Keynote Calendar | Shalom C. Ernest',
    description: 'Explore and register for upcoming executive leadership summits, masterclasses, and keynote lectures hosted by Shalom C. Ernest.',
  },
  testimonials: {
    title: 'Executive Testimonials & Endorsements | Shalom C. Ernest',
    description: 'Read testimonials and executive feedback from board members, managing directors, and public sector leaders.',
  },
  faq: {
    title: 'Engagement Enquiries & Consultations | Shalom C. Ernest',
    description: 'Frequently asked questions regarding executive coaching, management consulting, speaker engagements, and strategy session bookings.',
  },
};

function MainContent() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [curtainStage, setCurtainStage] = useState<CurtainStage>('idle');
  const [pendingTargetId, setPendingTargetId] = useState<string | null>(null);
  const [targetLabel, setTargetLabel] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Initialize Lenis smooth scroll
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

    return () => {
      lenis.destroy();
    };
  }, []);

  // IntersectionObserver to dynamically detect current visible section for SEO metadata
  useEffect(() => {
    const sectionIds = ['hero', 'bio', 'metrics', 'partners', 'initiatives', 'milestones', 'events', 'testimonials', 'faq'];
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
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
    setTimeout(() => {
      setCurtainStage('uncovering');
    }, 40);
  };

  const handleUncoverComplete = () => {
    setCurtainStage('idle');
    setPendingTargetId(null);
  };

  // Determine active dynamic SEO content
  const currentSEO = isBookingOpen
    ? {
        title: 'Book Strategy Session | Shalom C. Ernest - Leadership Advisor',
        description: 'Reserve an executive consultation or strategy session with Shalom C. Ernest (CMC, FIMC), Management Consultant and Certified Leadership Specialist.',
      }
    : selectedArticle
    ? {
        title: `${selectedArticle.title} | Shalom C. Ernest Insights`,
        description: selectedArticle.excerpt || selectedArticle.readTime,
      }
    : SECTION_SEO[activeSection] || SECTION_SEO.hero;

  return (
    <div className={`min-h-screen transition-colors duration-500 relative font-sans ${
      isLight ? 'bg-[#FAF9F5] text-stone-900 selection:bg-amber-200 selection:text-amber-950' : 'bg-[#0A0B0D] text-[#F3F3EE] selection:bg-[#C8C3A7] selection:text-black'
    }`}>
      {/* React Helmet Dynamic SEO Meta Tags & Schema */}
      <Helmet>
        <html lang="en" />
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta
          name="keywords"
          content="Shalom C. Ernest, Management Consultant Nigeria, Certified Management Consultant, CMC, FIMC, Leadership Trainer Africa, Executive Advisory, Corporate Governance, Strategic Execution, Leadview Consulting, Youth Making Impact, YMI"
        />
        <meta name="author" content="Shalom C. Ernest" />

        {/* OpenGraph Tags for Social Sharing */}
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shalom C. Ernest Executive Advisory" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />

        {/* Theme Color Meta */}
        <meta name="theme-color" content={isLight ? '#FAF9F5' : '#0A0B0D'} />

        {/* Structured Schema.org JSON-LD for Search Engines */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Shalom C. Ernest',
            jobTitle: 'Management Consultant & Strategic Advisor',
            description: 'Certified Management Consultant (CMC, FIMC) and Executive Leadership Trainer advising corporate boards, non-profits, and public sector teams across Africa and globally.',
            email: 'shalom4impact@gmail.com',
            telephone: '+234 813 207 8249',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Lagos',
              addressCountry: 'NG',
            },
            knowsAbout: [
              'Management Consulting',
              'Corporate Governance',
              'Strategic Execution',
              'Youth Leadership Development',
              'Organizational Design',
            ],
            sameAs: [
              'https://www.linkedin.com/in/shalom-ernest-fimc-cmc-4028061a5',
              'https://instagram.com/shalomernest1',
              'https://www.facebook.com/shalom.ernest.98',
            ],
          })}
        </script>
      </Helmet>

      {/* High-End Curtain Transition Overlay */}
      <CurtainWipe
        stage={curtainStage}
        targetLabel={targetLabel}
        onCoverComplete={handleCoverComplete}
        onUncoverComplete={handleUncoverComplete}
      />

      {/* GSAP Animated Background Ambient Color Orbs */}
      <AnimatedBackgroundOrbs />

      <main className="w-full overflow-x-hidden relative z-10">
        {/* SECTION 1: HERO */}
        <HeroSection
          onNavClick={handleNavClick}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* SECTION 2: STATS */}
        <GsapScrollReveal>
          <MetricsSection />
        </GsapScrollReveal>

        {/* SECTION 3: ABOUT / BIO */}
        <GsapScrollReveal>
          <BioSection />
        </GsapScrollReveal>

        {/* SECTION 4: PARTNERSHIPS */}
        <GsapScrollReveal>
          <PartnersMarquee />
        </GsapScrollReveal>

        {/* SECTION 5: SERVICES & INITIATIVES */}
        <GsapScrollReveal>
          <InitiativesSection
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </GsapScrollReveal>

        {/* SECTION 6: EXECUTIVE TESTIMONIALS & ENDORSEMENTS */}
        <GsapScrollReveal>
          <TestimonialSlider />
        </GsapScrollReveal>

        {/* SECTION 7: SELECTED ENGAGEMENTS & MILESTONES */}
        <GsapScrollReveal>
          <MilestonesSection
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </GsapScrollReveal>

        {/* SECTION 8: HOSTED EVENTS & CALENDAR */}
        <GsapScrollReveal>
          <EventsSection />
        </GsapScrollReveal>

        {/* SECTION 9: FAQ */}
        <GsapScrollReveal>
          <FAQSection />
        </GsapScrollReveal>
      </main>

      {/* FOOTER */}
      <GsapScrollReveal>
        <FooterSection
          onNavClick={handleNavClick}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      </GsapScrollReveal>

      {/* MODALS */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* FLOATING GEMINI CHATBOT */}
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


