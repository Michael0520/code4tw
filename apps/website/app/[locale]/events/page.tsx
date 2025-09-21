import { EventsPage } from "@/components/events/events-page"

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <EventsPage locale={locale} />;
}