import { ProjectsPage } from "@/components/projects/projects-page"

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <ProjectsPage locale={locale} />;
}