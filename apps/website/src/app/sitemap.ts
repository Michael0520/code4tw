import {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codefortaiwan.org';
  const currentDate = new Date();

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add root page for each locale
  routing.locales.forEach((locale) => {
    const url =
      locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`;

    sitemapEntries.push({
      url,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: locale === routing.defaultLocale ? 1.0 : 0.9,
      alternates: {
        languages: routing.locales.reduce(
          (acc, lang) => {
            const langUrl =
              lang === routing.defaultLocale ? baseUrl : `${baseUrl}/${lang}`;
            acc[lang] = langUrl;
            return acc;
          },
          {} as Record<string, string>
        )
      }
    });
  });

  return sitemapEntries;
}
