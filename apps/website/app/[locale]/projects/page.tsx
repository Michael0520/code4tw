import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { getProjects, getFeaturedProjects } from '@/lib/features/projects/actions';
import { PROJECTS_CONFIG } from '@/lib/features/projects/config';
import ProjectsList from '@/components/projects/projects-list';
import ProjectsFilters from '@/components/projects/projects-filters';
import ProjectsSearch from '@/components/projects/projects-search';
import ProjectsStats from '@/components/projects/projects-stats';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ProjectsPageProps {
  searchParams?: {
    category?: string;
    status?: string;
    search?: string;
    sort?: string;
    tags?: string;
  };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const t = useTranslations();

  // Parse filters from search params
  const filters = {
    category: searchParams?.category || PROJECTS_CONFIG.defaults.category,
    status: searchParams?.status || PROJECTS_CONFIG.defaults.status,
    searchQuery: searchParams?.search,
    tags: searchParams?.tags?.split(',').filter(Boolean),
    sortBy: (searchParams?.sort || PROJECTS_CONFIG.defaults.sortBy) as any,
    sortOrder: PROJECTS_CONFIG.defaults.sortOrder as any
  };

  // Fetch projects using server action
  const { projects, total, stats } = await getProjects(filters);
  const featuredProjects = await getFeaturedProjects(6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('projects.title')}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-6 sm:px-6 lg:px-8">
          <ProjectsStats stats={stats} />
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ProjectsFilters
              categories={PROJECTS_CONFIG.categories}
              statuses={PROJECTS_CONFIG.statuses}
              currentFilters={filters}
            />
            <ProjectsSearch
              placeholder={t('common.search')}
              defaultValue={searchParams?.search}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Featured Projects (only show when no filters) */}
          {!searchParams?.search && filters.category === 'all' && filters.status === 'all' && (
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold">
                {t('projects.featured')}
              </h2>
              <Suspense fallback={<LoadingSpinner />}>
                <ProjectsList
                  projects={featuredProjects}
                  featured={true}
                />
              </Suspense>
            </section>
          )}

          {/* All Projects */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {searchParams?.search
                  ? t('projects.searchResults', { query: searchParams.search })
                  : t('projects.allProjects')}
              </h2>
              <span className="text-sm text-muted-foreground">
                {t('projects.showing', { count: total })}
              </span>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
              {projects.length > 0 ? (
                <ProjectsList projects={projects} />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-lg text-muted-foreground">
                      {t('projects.noResults')}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t('projects.tryDifferentFilters')}
                    </p>
                  </div>
                </div>
              )}
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}