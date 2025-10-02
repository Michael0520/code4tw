import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {baseConfig} from '@repo/next-config/base';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// PostHog reverse proxy configuration to prevent ad-blocker blocking
// Note: baseConfig currently has no rewrites, so we can safely define them here
// If baseConfig adds rewrites in the future, this will need to be updated to merge them
const config: NextConfig = {
  ...baseConfig,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
};

// Use shared base configuration from @repo/next-config with PostHog proxy
export default withNextIntl(config);
