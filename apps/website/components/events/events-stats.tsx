'use client';

import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatsGrid, type StatItem } from '@/components/shared/stats-grid';

interface EventsStatsProps {
  stats: {
    total: number;
    upcoming: number;
    past: number;
    featured: number;
    withAvailableSpots: number;
    totalCapacity: number;
    totalRegistered: number;
    averageOccupancy: number;
    typeDistribution: Record<string, number>;
  };
}

export function EventsStats({ stats }: EventsStatsProps) {
  const { t } = useTranslation();

  const statsItems: StatItem[] = [
    {
      label: t('events.stats.total'),
      value: stats.total,
      icon: Calendar,
      description: t('projects.stats.total'),
    },
    {
      label: t('events.stats.active'),
      value: stats.upcoming,
      icon: Clock,
      description: t('events.upcomingEvents'),
    },
    {
      label: t('events.stats.totalCapacity'),
      value: stats.totalCapacity,
      icon: Users,
      description: 'Total capacity',
    },
    {
      label: t('events.stats.totalRegistered'),
      value: stats.totalRegistered,
      icon: TrendingUp,
      description: 'Total registered',
    },
  ];

  return <StatsGrid items={statsItems} variant="card" columns={4} />;
}