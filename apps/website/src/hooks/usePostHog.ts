'use client';

import {usePostHog as usePostHogOriginal} from 'posthog-js/react';

export function usePostHog() {
  const posthog = usePostHogOriginal();

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.capture(eventName, properties);
    }
  };

  const trackSocialClick = (platform: string, location: string) => {
    trackEvent('social_link_clicked', {
      platform,
      location,
      timestamp: new Date().toISOString()
    });
  };

  const trackCTAClick = (ctaName: string, location: string) => {
    trackEvent('cta_clicked', {
      cta_name: ctaName,
      location,
      timestamp: new Date().toISOString()
    });
  };

  const trackPageView = (pageName: string, properties?: Record<string, any>) => {
    trackEvent('page_viewed', {
      page_name: pageName,
      ...properties
    });
  };

  const identifyUser = (userId: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.identify(userId, properties);
    }
  };

  const setUserProperty = (property: string, value: any) => {
    if (posthog) {
      posthog.people.set({[property]: value});
    }
  };

  return {
    posthog,
    trackEvent,
    trackSocialClick,
    trackCTAClick,
    trackPageView,
    identifyUser,
    setUserProperty
  };
}