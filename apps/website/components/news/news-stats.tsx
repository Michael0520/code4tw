/**
 * News Stats Component
 * Display news statistics and metrics
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import type { NewsResponse } from '@/lib/features/news/actions';

interface NewsStatsProps {
  stats: NewsResponse['stats'];
  totalShown: number;
}

export function NewsStats({ stats, totalShown }: NewsStatsProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalShown}</div>
          <div className="text-sm text-muted-foreground">{t('common.showing')}</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{stats.published}</div>
          <div className="text-sm text-muted-foreground">{t('news.published')}</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{stats.featured}</div>
          <div className="text-sm text-muted-foreground">{t('news.featured')}</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{stats.recent}</div>
          <div className="text-sm text-muted-foreground">{t('news.recent')}</div>
        </CardContent>
      </Card>
    </div>
  );
}