'use client';

import posthog from 'posthog-js';
import {PostHogProvider, usePostHog} from 'posthog-js/react';

export function PHProvider({children}: {children: React.ReactNode}) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export {usePostHog};
