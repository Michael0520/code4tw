import { locales, type Locale } from '@/i18n'

export const DEFAULT_LOCALE: Locale = 'zh'

export function getValidLocale(locale: string | undefined): Locale {
  if (!locale || !locales.includes(locale as Locale)) {
    return DEFAULT_LOCALE
  }
  return locale as Locale
}

export function createLocalizedUrl(path: string, locale?: string): string {
  const validLocale = getValidLocale(locale)

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // Don't add locale prefix for external URLs
  if (cleanPath.startsWith('http')) {
    return path
  }

  return `/${validLocale}/${cleanPath}`.replace(/\/+/g, '/')
}

export function extractLocaleFromPath(pathname: string): {
  locale: Locale
  pathWithoutLocale: string
} {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (locales.includes(firstSegment as Locale)) {
    return {
      locale: firstSegment as Locale,
      pathWithoutLocale: '/' + segments.slice(1).join('/')
    }
  }

  return {
    locale: DEFAULT_LOCALE,
    pathWithoutLocale: pathname
  }
}