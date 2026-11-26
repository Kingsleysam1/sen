import React, { useState, useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
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
import { VideoSection }       from './components/VideoSection';
import { EventsSection }      from './components/EventsSection';
import { ContactSection }     from './components/ContactSection';
import { TestimonialSlider }  from './components/TestimonialSlider';
import { FAQSection }         from './components/FAQSection';
import { FooterSection }      from './components/FooterSection';
import { ArticleModal }       from './components/ArticleModal';
import { BookingModal }       from './components/BookingModal';
import { Chatbot }            from './components/Chatbot';
import { Article }            from './data/shalomData';

// Dynamic SEO section map
// The tab title and share text stay put while the visitor scrolls. Only the
// booking form and an open article change them.
const HOME_SEO = {
  title: 'Shalom C. Ernest | Management Consultant & Executive Leadership Trainer',
  description: 'Equipping leaders. Transforming organisations. Shalom C. Ernest (FIMC, CMC, AILCS) — Strategic Advisor helping executives and institutions build strategic clarity and lasting impact across Africa.',
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function MainContent() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isBookingOpen, setIsBookingOpen]     = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll — one loop, shared with GSAP's ticker. Skipped entirely
  // for visitors who ask their system for reduced motion.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Menu links scroll straight to the section, clear of the fixed header.
  const handleNavClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -88, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  };


  const currentSEO = isBookingOpen
    ? { title: 'Book a Consultation | Shalom C. Ernest', description: 'Reserve an executive consultation or strategy session with Shalom C. Ernest (CMC, FIMC), Management Consultant and Strategic Advisor.' }
    : selectedArticle
    ? { title: `${selectedArticle.title} | Shalom C. Ernest Insights`, description: selectedArticle.summary }
    : HOME_SEO;

  return (
    <MotionConfig reducedMotion="user">
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

      <main className="w-full overflow-x-clip">

        {/* 1. HERO — Who is this person? */}
        <HeroSection onNavClick={handleNavClick} onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2. MARQUEE STRIP — Credential ticker */}
        <MarqueeStrip />

        {/* 3. BIO — What do they stand for? */}
        <BioSection />

        {/* 4. IMPACT METRICS — Why should I trust them? */}
        <MetricsSection />

        {/* 5. EXPERTISE — What do they do? */}
        <InitiativesSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 6. PROGRAMS — How can they help me? */}
        <ProgramsSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 7. CREDIBILITY — Why trust them? */}
        <PartnersMarquee />

        {/* 8. MILESTONES — What impact have they made? */}
        <VideoSection />

        {/* 9. EVENTS — Active programmes */}
        <EventsSection />

        {/* 9b. CONTACT — after mentorship */}
        <ContactSection />

        {/* 10. TESTIMONIALS — What have others said? */}
        <TestimonialSlider />

        {/* 11. FAQ — Engagement enquiries */}
        <FAQSection />
      </main>

      {/* Footer */}
      <FooterSection onNavClick={handleNavClick} onOpenBooking={() => setIsBookingOpen(true)} />

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
    </MotionConfig>
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
