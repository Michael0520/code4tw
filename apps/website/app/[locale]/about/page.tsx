import { AboutPage } from "@/lib/features/about/components/about-page"

interface PageProps {
  params: Promise<{ locale: string }>;
}

import { routing } from '@/i18n/routing';

// SSG: 從 i18n 配置自動生成支援的語言路由
export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale
  }));
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <AboutPage locale={locale} />;
}