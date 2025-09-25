import createNextConfig from '@repo/next-config/base';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = createNextConfig({
  eslintIgnore: true,
  typescriptIgnore: true,
  unoptimizedImages: true,
});

export default withNextIntl(nextConfig);
