import { HomePage } from "@/components/home/home-page";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// SSG: 預生成所有支援的語言路由
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ];
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <HomePage locale={locale} />;
}