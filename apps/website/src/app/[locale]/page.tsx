'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';
import {AnimatedRadialGradientBackground} from '@/sections/marketing-hero-radial-gradient/animated-radial-background';
import {FAQSection} from '@/components/FAQSection';
import {Footer} from '@/components/Footer';
import {Navbar} from '@/components/Navbar';
import {LanguageSelector} from '@/components/LanguageSelector';
import {JoinSectionImmersive} from '@/components/JoinSectionImmersive';
import {AboutSectionBento} from '@/components/AboutSectionBento';
import {BrandKeywordHighlight} from '@/components/BrandKeywordHighlight';
import {EventsSection} from '@/components/EventsSection';
import {motion} from 'framer-motion';
import {usePostHog} from '@/hooks/usePostHog';
import {siteConfig} from '@repo/config/site';
import {Button} from '@repo/ui/ui/button';

export default function IndexPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const {trackCTAClick} = usePostHog();

  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const eventsRef = useRef<HTMLElement | null>(null);
  const joinRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionRefs = {
      hero: heroRef,
      about: aboutRef,
      events: eventsRef,
      join: joinRef,
      faq: faqRef
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {threshold: 0.1}
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const t = useTranslations('IndexPage');

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      {/* Navbar with positioning wrapper */}
      <div className="fixed bottom-10 md:top-10 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none will-change-transform">
        <motion.div
          initial={{opacity: 0, y: -120}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 120}}
          transition={{duration: 1.6, delay: 0.9, type: 'spring'}}
          className="pointer-events-auto"
          style={{contain: 'layout style paint'}}
        >
          <Navbar activeSection={activeSection} />
        </motion.div>
      </div>

      {/* Language Selector positioned separately */}
      <div className="fixed top-10 right-10 z-[9999] will-change-transform pointer-events-auto">
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.6, delay: 1.1, type: 'spring'}}
        >
          <LanguageSelector />
        </motion.div>
      </div>

      {/* Main content */}
      <main className="overflow-x-hidden">
        <div className="overflow-x-hidden">
          {/* Custom Layout without Container */}
          {/* Hero Section with Animated Background */}
          <section
            id="hero"
            ref={heroRef}
            className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
          >
            <AnimatedRadialGradientBackground
              Breathing={true}
              containerClassName="absolute inset-0 z-0"
            />
            <div className="relative z-10 text-center text-white px-4 w-full pointer-events-none">
              <div className="pointer-events-auto">
                <motion.h1
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.8, delay: 0.5}}
                  className="text-4xl md:text-5xl font-bold mb-6 text-white"
                >
                  <BrandKeywordHighlight
                    text={t('title')}
                    keywords={['Taiwan', 'Code']}
                    normalClassName="text-white"
                    brandKeywordClassName="font-brand text-white"
                    animate={true}
                  />
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-200 mb-4"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.8, delay: 0.8}}
                >
                  <BrandKeywordHighlight
                    text={t('subtitle')}
                    keywords={['Digital', 'Technology', 'Society']}
                    normalClassName="text-gray-200"
                    brandKeywordClassName="font-brand text-gray-200"
                    animate={true}
                  />
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-gray-300 mb-12 max-w-4xl mx-auto"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.8, delay: 1.1}}
                >
                  <BrandKeywordHighlight
                    text={t('description')}
                    keywords={[
                      'technology',
                      'transparency',
                      'civic',
                      'open-source'
                    ]}
                    normalClassName="text-gray-300"
                    brandKeywordClassName="font-brand text-gray-300"
                    animate={true}
                  />
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center relative z-[100] pointer-events-auto"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.8, delay: 1.3}}
                >
                  <Button
                    onClick={() => {
                      trackCTAClick('Join Discord', 'hero_section');
                      window.open(siteConfig.social.discord, '_blank');
                    }}
                    variant="primary-white"
                    size="xl"
                    rounded="full"
                    className="relative z-[100]"
                    type="button"
                  >
                    {t('hero.cta')}
                  </Button>
                  <Button
                    onClick={() => {
                      scrollToAbout();
                    }}
                    variant="outline-white"
                    size="xl"
                    rounded="full"
                    className="relative z-[100]"
                    type="button"
                  >
                    {t('hero.learn_more')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" ref={aboutRef}>
            <AboutSectionBento />
          </section>

          {/* Events Section */}
          <section id="events" ref={eventsRef}>
            <EventsSection />
          </section>

          {/* Join Section */}
          <section id="join" ref={joinRef}>
            <JoinSectionImmersive />
          </section>
        </div>

        {/* FAQ Section - Outside main container for full width */}
        <section id="faq" ref={faqRef} className="relative">
          <FAQSection />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
