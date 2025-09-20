import baseConfig from '@repo/next-config/base';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...baseConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
