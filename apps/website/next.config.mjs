import createNextConfig from '@repo/next-config/base';

/** @type {import('next').NextConfig} */
const nextConfig = createNextConfig({
  eslintIgnore: true,
  typescriptIgnore: true,
  unoptimizedImages: true,
});

export default nextConfig;
