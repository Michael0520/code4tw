const path = require('path');

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
  outputFileTracingRoot: path.join(__dirname, '../../'),
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
}

module.exports = nextConfig