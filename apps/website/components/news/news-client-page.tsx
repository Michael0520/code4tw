/**
 * News Client Page Component
 * Handles client-side functionality for news page
 */

'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NewsSearch } from './news-search';
import { NewsFilters } from './news-filters';
import { NewsList } from './news-list';
import { NewsStats } from './news-stats';
import type { NewsResponse } from '@/lib/features/news/actions';

interface NewsClientPageProps {
  newsData: NewsResponse;
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
  showFeatured: boolean;
}

export function NewsClientPage({ newsData, searchParams, showFeatured }: NewsClientPageProps) {
  const t = useTranslations();
  const router = useRouter();

  const updateSearchParams = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value && value !== 'all' && value !== '') {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    router.push(url.toString());
  };

  const clearFilters = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    url.searchParams.delete('category');
    url.searchParams.delete('sort');
    router.push(url.toString());
  };

  return (
    <>
      {/* Filters Section */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <NewsSearch
                onSearch={(query) => updateSearchParams('q', query)}
                placeholder={t('news.searchPlaceholder')}
              />
              <NewsFilters
                selectedCategory={searchParams.category || 'all'}
                onCategoryChange={(category) => updateSearchParams('category', category)}
                selectedSort={searchParams.sort || 'publishedAt-desc'}
                onSortChange={(sort) => updateSearchParams('sort', sort)}
              />
            </div>
            {(searchParams.q || searchParams.category !== 'all') && (
              <Button variant="outline" onClick={clearFilters}>
                {t('common.reset')}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <NewsStats stats={newsData.stats} totalShown={newsData.articles.length} />
          <NewsList articles={newsData.articles} showFeatured={showFeatured} />
        </div>
      </section>
    </>
  );
}