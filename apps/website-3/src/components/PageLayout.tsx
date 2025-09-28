'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const [activeSection, setActiveSection] = useState('hero');

  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const joinRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);

  const sectionRefs = {
    hero: heroRef,
    about: aboutRef,
    join: joinRef,
    faq: faqRef,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 } // this means "start the event when 10% of the target is visible"
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

  return (
    <>
      {/* Navbar with positioning wrapper matching cult-landing-page */}
      <div className="relative z-[9999] w-screen">
        <div className="flex items-center justify-center">
          <div className="fixed bottom-10 md:top-10 z-[9999]">
            <motion.div
              initial={{ opacity: 0, y: -120 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 120 }}
              transition={{ duration: 1.6, delay: 0.9, type: 'spring' }}
              className="max-w-4xl"
            >
              <Navbar activeSection={activeSection} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main>
        {children}
      </main>
    </>
  );
}