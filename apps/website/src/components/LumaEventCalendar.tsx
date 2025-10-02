'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Calendar, Loader2} from 'lucide-react';
import {usePostHog} from '@/hooks/usePostHog';
import {cn} from '@repo/ui/lib/utils';

interface LumaEventCalendarProps {
  className?: string;
  height?: string | number;
  mobileHeight?: string | number;
}

export function LumaEventCalendar({
  className,
  height = 600,
  mobileHeight = 500
}: LumaEventCalendarProps) {
  const t = useTranslations('IndexPage.events');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const {trackEvent} = usePostHog();

  useEffect(() => {
    // Track calendar view
    trackEvent?.('calendar_viewed', {
      component: 'LumaEventCalendar',
      location: 'events_section'
    });
  }, [trackEvent]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    trackEvent?.('calendar_loaded', {
      component: 'LumaEventCalendar'
    });
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    trackEvent?.('calendar_error', {
      component: 'LumaEventCalendar'
    });
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Calendar className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-400 text-center">{t('calendar_unavailable')}</p>
        <a
          href="https://luma.com/user/code4tw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 underline mt-2"
        >
          {t('view_all_luma')}
        </a>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full', className)}>
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          initial={{opacity: 1}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl"
        >
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-white animate-spin mb-3" />
            <p className="text-gray-400 text-sm">{t('loading_events')}</p>
          </div>
        </motion.div>
      )}

      {/* Iframe container with responsive height */}
      <div
        className={cn(
          'w-full rounded-xl overflow-hidden',
          'bg-white/5 backdrop-blur-sm',
          'border border-gray-800'
        )}
        style={{
          height: typeof height === 'number' ? `${height}px` : height
        }}
      >
        <iframe
          src="https://luma.com/embed/calendar/cal-DLj7yelTE4rnL4k/events"
          className="w-full h-full"
          frameBorder="0"
          style={{
            border: 'none',
            borderRadius: '12px'
          }}
          allowFullScreen
          aria-label="Code for Taiwan events calendar"
          title="Code for Taiwan Events Calendar"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>

      {/* Responsive styles for mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*='height'] {
            height: ${typeof mobileHeight === 'number'
              ? `${mobileHeight}px`
              : mobileHeight} !important;
          }
        }
      `}</style>
    </div>
  );
}
