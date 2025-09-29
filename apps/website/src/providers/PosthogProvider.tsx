'use client';

import posthog from 'posthog-js';
import {PostHogProvider} from 'posthog-js/react';
import {useEffect} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url
      });
    }
  }, [pathname, searchParams]);

  return <></>;
}

export function PHProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (!posthogKey) {
      console.warn('PostHog key not found. Analytics will not be tracked.');
      return;
    }

    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only',
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
        maskTextFn: (text, element) => {
          // Mask sensitive data for input elements
          const inputElement = element as HTMLInputElement;
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
        if (localStorage.getItem('posthog_opt_out') === 'true') {
          posthog.opt_out_capturing();
        }
      }
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}