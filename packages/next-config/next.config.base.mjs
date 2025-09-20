import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
  },
  // 解決 workspace root 警告
  outputFileTracingRoot: path.join(process.cwd(), '../../'),
  turbopack: {
    root: path.join(process.cwd(), '../../'),
  },
}

export default nextConfig;