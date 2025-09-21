'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();

  const statsCards = [
    {
      title: t('events.stats.total'),
      value: stats.total,
      icon: Calendar,
      description: t('projects.stats.total'),
    },
    {
      title: t('events.stats.active'),
      value: stats.upcoming,
      icon: Clock,
      description: t('events.upcomingEvents'),
    },
    {
      title: t('events.stats.totalCapacity'),
      value: stats.totalCapacity,
      icon: Users,
      description: 'Total capacity',
    },
    {
      title: t('events.stats.totalRegistered'),
      value: stats.totalRegistered,
      icon: TrendingUp,
      description: 'Total registered',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Icon className="h-4 w-4" />
                <span>{stat.title}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              {stat.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}