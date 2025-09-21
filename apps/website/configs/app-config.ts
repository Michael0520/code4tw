export const APP_CONFIG = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
    timeout: 5000,
  },
  features: {
    enableAnalytics: process.env.NODE_ENV === 'production',
    enableDebugMode: process.env.NODE_ENV === 'development',
  },
  ui: {
    theme: 'light',
    language: 'zh',
  },
} as const;