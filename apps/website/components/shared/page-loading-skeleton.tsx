import { Skeleton } from '@/components/ui/skeleton';

interface PageLoadingSkeletonProps {
  showFeatured?: boolean;
  gridCols?: 2 | 3;
  filterCount?: number;
}

export function PageLoadingSkeleton({
  showFeatured = true,
  gridCols = 3,
  filterCount = 3,
}: PageLoadingSkeletonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/5 to-background">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-6">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-6">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section Skeleton */}
        <section className="mb-12 rounded-2xl bg-gradient-to-br from-muted/20 via-muted/10 to-transparent p-12">
          <Skeleton className="mb-4 h-12 w-3/4 max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-3xl" />
        </section>

        {/* Filters Section Skeleton */}
        <section className="mb-8 rounded-lg bg-card/50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full sm:w-64" />
            <div className="flex gap-2">
              {Array.from({ length: filterCount }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-32" />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section Skeleton */}
        {showFeatured && (
          <section className="mb-12">
            <Skeleton className="mb-6 h-8 w-32" />
            <div className="grid gap-6">
              <div className="rounded-xl bg-card p-6">
                <div className="flex gap-6">
                  <Skeleton className="h-48 w-48 shrink-0 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-8 w-3/4" />
                    <Skeleton className="mb-4 h-4 w-full" />
                    <Skeleton className="mb-4 h-4 w-5/6" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Grid Section Skeleton */}
        <section>
          <div className={`grid gap-6 ${gridCols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-card p-6">
                <Skeleton className="mb-4 h-40 w-full rounded-lg" />
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="mt-4 flex justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}