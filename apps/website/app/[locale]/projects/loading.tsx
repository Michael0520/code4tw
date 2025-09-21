import { PageLoadingSkeleton } from '@/components/shared/page-loading-skeleton';

export default function Loading() {
  return <PageLoadingSkeleton showFeatured={true} gridCols={2} filterCount={3} />;
}