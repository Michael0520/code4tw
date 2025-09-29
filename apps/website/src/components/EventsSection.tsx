'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {ExternalLink} from 'lucide-react';
import {Ripple} from '@/components/ui/ripple';
import {BrandKeywordHighlight} from '@/components/BrandKeywordHighlight';
import {usePostHog} from '@/hooks/usePostHog';
import {siteConfig} from '@/config/site';
import {Button} from '@/components/ui/button';

export function EventsSection() {
  const t = useTranslations('IndexPage.events');
  const {trackCTAClick} = usePostHog();

  const handleViewEvents = () => {
    trackCTAClick('View Events', 'events_section');
    window.open(siteConfig.social.events, '_blank');
  };

  return (
    <section className="relative py-48 overflow-hidden bg-gradient-to-b from-gray-950 to-black dark-section">
      {/* Ripple effect background */}
      {/* Responsive Ripple effect - smaller on mobile */}
      <div className="md:hidden">
        <Ripple mainCircleSize={120} mainCircleOpacity={0.6} numCircles={6} />
      </div>
      <div className="hidden md:block">
        <Ripple mainCircleSize={210} mainCircleOpacity={0.6} numCircles={8} />
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
            <Button
              onClick={handleViewEvents}
              variant="primary-white"
              size="xl"
              rounded="full"
              className="group text-gray-900"
            >
              <span>{t('cta_button')}</span>
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
