import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {clsx} from 'clsx';
import {Inter} from 'next/font/google';
import localFont from 'next/font/local';
import {routing} from '@/i18n/routing';
import {siteConfig} from '@/config/site';
import {PHProvider} from '@/providers/PosthogProvider';
import './styles.css';

const inter = Inter({subsets: ['latin']});

const brand = localFont({
  variable: '--font-brand',
  src: '../../fonts/Array-Bold.woff2'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'LocaleLayout'
  });

  // Generate proper URLs for each locale
  const baseUrl = siteConfig.url;
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  // Get OpenGraph locale format from config mapping
  const ogLocale =
    siteConfig.locales.openGraphMap[
      locale as keyof typeof siteConfig.locales.openGraphMap
    ];

  return {
    title: t('title'),
    description: t('description'),
    keywords: siteConfig.metadata.keywords,
    authors: siteConfig.metadata.authors,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: baseUrl,
        zh: `${baseUrl}/zh`
      }
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: ogLocale,
      type: siteConfig.openGraph.type,
      siteName: siteConfig.openGraph.siteName,
      url: currentUrl,
      images: [
        {
          url: siteConfig.openGraph.image,
          width: 1200,
          height: 630,
          alt: t('title')
        }
      ]
    },
    twitter: {
      card: siteConfig.twitter.card,
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
      title: t('title'),
      description: t('description'),
      images: [siteConfig.openGraph.image]
    }
  };
}

export async function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#000095'
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body
        className={clsx(
          inter.className,
          brand.variable,
          'flex h-full flex-col'
        )}
      >
        <PHProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </PHProvider>
      </body>
    </html>
  );
}
