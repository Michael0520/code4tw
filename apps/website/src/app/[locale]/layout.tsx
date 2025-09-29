import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {clsx} from 'clsx';
import {Inter} from 'next/font/google';
import localFont from 'next/font/local';
import {routing} from '@/i18n/routing';
import {siteConfig} from '@/config/site';
import {PHProvider, PostHogPageview} from '@/providers/PosthogProvider';
import {Suspense} from 'react';
import './styles.css';

const inter = Inter({subsets: ['latin']});

const brand = localFont({
  variable: '--font-brand',
  src: '../../fonts/Array-Bold.woff2'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>
) {
  const {locale} = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'LocaleLayout'
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: siteConfig.metadata.keywords,
    authors: siteConfig.metadata.authors,
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      type: siteConfig.openGraph.type,
      siteName: siteConfig.openGraph.siteName,
      url: siteConfig.url
    },
    twitter: {
      card: siteConfig.twitter.card,
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
      title: t('title'),
      description: t('description')
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
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
          <Suspense>
            <PostHogPageview />
          </Suspense>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </PHProvider>
      </body>
    </html>
  );
}
