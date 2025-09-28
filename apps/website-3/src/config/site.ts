export const siteConfig = {
  // Site metadata
  name: 'Code for Taiwan',
  title:
    'Code for Taiwan - Building Digital Infrastructure for a Better Society',
  description:
    'Code for Taiwan is a civic tech community dedicated to creating open-source solutions that improve government transparency, civic engagement, and public services.',
  url: 'https://codefortaiwan.org',

  // Organization info
  organization: {
    name: 'Code for Taiwan',
    founded: 2025,
    type: 'Civic Tech Community'
  },

  // Social media links
  social: {
    facebook: 'https://www.facebook.com/CFTcodefortaiwan/',
    discord: 'https://discord.gg/pRFjDXeFyv',
    events: 'https://luma.com/0ckf5dio',
    github: 'https://github.com/codefortaiwan'
  },

  // Contact information
  contact: {
    email: 'codefortaiwan.org@gmail.com'
  },

  // External links
  links: {
    docs: 'https://docs.codefortaiwan.org',
    awesomeTaiwan: 'https://github.com/codefortaiwan/awesome-taiwan',
    g0v: 'https://g0v.tw',
    vTaiwan: 'https://vtaiwan.tw'
  },

  // Copyright
  copyright: {
    year: 2025,
    holder: 'Code for Taiwan',
    rights: 'All rights reserved'
  },

  // Additional metadata
  metadata: {
    keywords: [
      'civic tech',
      'open source',
      'taiwan',
      'democracy',
      'government transparency',
      'citizen engagement',
      'digital infrastructure',
      '公民科技',
      '開源',
      '台灣',
      '數位民主'
    ],
    authors: [
      {
        name: 'Code for Taiwan Community',
        url: 'https://codefortaiwan.org'
      }
    ]
  },

  // OpenGraph settings
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: 'en_US',
    siteName: 'Code for Taiwan',
    image: '/og-image.png'
  },

  // Twitter/X card settings (keeping for compatibility)
  twitter: {
    card: 'summary_large_image',
    site: '@codefortaiwan',
    creator: '@codefortaiwan'
  },

  // Supported locales
  locales: {
    default: 'zh',
    supported: ['zh', 'en'] as const
  }
} as const;

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
export type SocialPlatform = keyof typeof siteConfig.social;
export type ExternalLink = keyof typeof siteConfig.links;
