import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {baseConfig} from '@repo/next-config/base';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// PostHog reverse proxy configuration to prevent ad-blocker blocking
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
