import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (posthogKey) {
    posthog.init(posthogKey, {
      // Use local reverse proxy to prevent ad-blocker blocking
      api_host: window.location.origin + '/ingest',
      ui_host: 'https://us.posthog.com', // Keep UI host for dashboard links
      person_profiles: 'identified_only',
      capture_pageview: true, // Enable automatic pageview tracking
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
        maskTextFn: (text, element) => {
          // Mask sensitive data for input elements
          const inputElement = element;
          if (inputElement?.type === 'password' || inputElement?.type === 'email') {
            return '*'.repeat(text.length);
          }
          return text;
        }
      },
      // Privacy-focused settings
      opt_out_capturing_by_default: false,
      loaded: (posthog) => {
        // Check if user has opted out
        if (typeof localStorage !== 'undefined' && localStorage.getItem('posthog_opt_out') === 'true') {
          posthog.opt_out_capturing();
        }
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('PostHog initialized with key:', posthogKey.substring(0, 10) + '...');
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('PostHog key not found. Analytics will not be tracked. Please set NEXT_PUBLIC_POSTHOG_KEY in your environment variables.');
  }
}

export default posthog;