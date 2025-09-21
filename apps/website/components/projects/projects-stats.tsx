'use client';

import { useTranslations } from 'next-intl';
import { Activity, Archive, GitFork, Star } from 'lucide-react';
import { StatsGrid, type StatItem } from '@/components/shared/stats-grid';

interface ProjectsStatsProps {
  stats: {
    total: number;
    active: number;
    totalStars: number;
    totalForks: number;
  };
}

export default function ProjectsStats({ stats }: ProjectsStatsProps) {
  const t = useTranslations();

  const statItems: StatItem[] = [
    {
      label: t('projects.stats.total'),
      value: stats.total,
      icon: Archive,
      color: 'text-blue-600'
    },
    {
      label: t('projects.stats.active'),
      value: stats.active,
      icon: Activity,
      color: 'text-green-600'
    },
    {
      label: t('projects.stats.stars'),
      value: stats.totalStars,
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      label: t('projects.stats.forks'),
      value: stats.totalForks,
      icon: GitFork,
      color: 'text-purple-600'
    }
  ];

  return <StatsGrid items={statItems} variant="simple" columns={4} />;
}