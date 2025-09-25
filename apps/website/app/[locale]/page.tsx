import { HomePage } from "@/lib/features/home/components/home-page";

interface PageProps {
  params: Promise<{ locale: string }>;
}

import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale
  }));
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <HomePage locale={locale} />;
}