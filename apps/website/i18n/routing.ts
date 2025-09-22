import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['zh', 'en'] as const,

  // The default locale to use
  defaultLocale: 'zh',

  // How locale should be shown in the URL
  localePrefix: 'always'
})