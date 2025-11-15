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
    events: 'https://luma.com/code4tw',
    threads: 'https://www.threads.com/@code4tw',
    instagram: 'https://www.instagram.com/code4tw/',
    youtube: 'https://www.youtube.com/@CodeforTaiwan',
    github: 'https://github.com/codefortaiwan'
  },

  // Contact information
  contact: {
    email: 'codefortaiwan.org@gmail.com'
  },

  // External links
  links: {
    docs: 'https://docs.codefortaiwan.org',
    privacy: '#privacy',
    terms: '#terms'
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
    image: '/og-image.jpg'
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
    supported: ['zh', 'en'] as const,
    // Mapping for OpenGraph locale formats
    openGraphMap: {
      zh: 'zh_TW',
      en: 'en_US'
    } as const
  }
} as const;

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
export type SocialPlatform = keyof typeof siteConfig.social;
export type ExternalLink = keyof typeof siteConfig.links;
