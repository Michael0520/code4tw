import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import MarketingHeroSection from '@/sections/marketing-hero-radial-gradient/page';

export default function DemoPage({params}: PageProps<'/[locale]/demo'>) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale as Locale);

  return <MarketingHeroSection />;
}
