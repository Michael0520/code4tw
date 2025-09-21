export const FEATURE_FLAGS = {
  newHomepage: false,
  betaFeatures: process.env.NODE_ENV === 'development',
  advancedSearch: true,
  socialLogin: true,
  darkMode: true,
  multiLanguage: true,
  analytics: process.env.NODE_ENV === 'production',
  debugging: process.env.NODE_ENV === 'development',
} as const;