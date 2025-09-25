import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The prefix is used for all pathnames
  localePrefix: 'always' // Always include locale prefix for clearer routing
});