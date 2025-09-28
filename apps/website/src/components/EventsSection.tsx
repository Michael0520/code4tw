'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import {Ripple} from '@/components/ui/ripple';
import {BrandKeywordHighlight} from '@/components/BrandKeywordHighlight';

export function EventsSection() {
  const t = useTranslations('IndexPage.events');

  const handleViewEvents = () => {
    window.open('https://luma.com/user/code4tw', '_blank');
  };

  return (
    <section className="relative py-48 overflow-hidden bg-gradient-to-b from-gray-950 to-black dark-section">
      {/* Ripple effect background */}
      {/* Responsive Ripple effect - smaller on mobile */}
      <div className="md:hidden">
        <Ripple
          mainCircleSize={120}
          mainCircleOpacity={0.6}
          numCircles={6}
        />
      </div>
      <div className="hidden md:block">
        <Ripple
          mainCircleSize={210}
          mainCircleOpacity={0.6}
          numCircles={8}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          viewport={{once: true}}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Title */}
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.1}}
            viewport={{once: true}}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            <BrandKeywordHighlight
              text={t('title')}
              keywords={['Events']}
              normalClassName="text-white"
              brandKeywordClassName="font-brand text-white"
              animate={true}
            />
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="text-lg md:text-xl text-gray-400 mb-12"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            viewport={{once: true}}
          >
            <button
              onClick={handleViewEvents}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-gray-900 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{t('cta_button')}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}