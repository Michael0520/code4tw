/**
 * News Stats Component
 * Display news statistics and metrics
 */

import { useTranslations } from 'next-intl';
import type { NewsResponse } from '@/lib/features/news/actions';
import { StatsGrid, type StatItem } from '@/components/shared/stats-grid';

interface NewsStatsProps {
  stats: NewsResponse['stats'];
  totalShown: number;
}

export function NewsStats({ stats, totalShown }: NewsStatsProps) {
  const t = useTranslations();

  const statsItems: StatItem[] = [
    {
      label: t('common.showing'),
      value: totalShown,
    },
    {
      label: t('news.published'),
      value: stats.published,
    },
    {
      label: t('news.featured'),
      value: stats.featured,
    },
    {
      label: t('news.recent'),
      value: stats.recent,
    },
  ];

  return (
    <div className="mb-8">
      <StatsGrid items={statsItems} variant="card" columns={4} className="bg-card/50" />
    </div>
  );
}