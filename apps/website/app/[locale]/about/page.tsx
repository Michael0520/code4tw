import { AboutPage } from "@/components/about/about-page"

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <AboutPage locale={locale} />;
}