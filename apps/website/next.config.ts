import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {baseConfig} from '@repo/next-config/base';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Use shared base configuration from @repo/next-config
export default withNextIntl(baseConfig as NextConfig);
