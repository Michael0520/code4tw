import path from 'path';

/** @type {import('next').NextConfig} */
const createNextConfig = (options = {}) => {
  const {
    eslintIgnore = false,
    typescriptIgnore = false,
    unoptimizedImages = false,
    ...customConfig
  } = options;

  return {
    eslint: {
      ignoreDuringBuilds: eslintIgnore,
    },
    typescript: {
      ignoreBuildErrors: typescriptIgnore,
    },
    images: {
      unoptimized: unoptimizedImages,
    },
    // 解決 workspace root 警告
    outputFileTracingRoot: path.join(process.cwd(), '../../'),
    turbopack: {
      root: path.join(process.cwd(), '../../'),
    },
    // 合併自定義配置
    ...customConfig,
  };
};

// 導出預設配置函數
export default createNextConfig;

// 導出常用的預設配置
export const baseConfig = createNextConfig();
export const productionConfig = createNextConfig({
  eslintIgnore: true,
  typescriptIgnore: true,
  unoptimizedImages: true,
});