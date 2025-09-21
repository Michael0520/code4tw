import { NewsPage } from "@/components/news/news-page"

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <NewsPage locale={locale} />;
}