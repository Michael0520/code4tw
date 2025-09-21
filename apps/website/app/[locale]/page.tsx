import { HomePage } from "@/components/home/home-page";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <HomePage locale={locale} />;
}