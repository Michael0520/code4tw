'use client';

import { useTranslations } from 'next-intl';
import { Activity, Archive, GitFork, Star } from 'lucide-react';

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

  const statItems = [
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

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-lg bg-background p-4"
        >
          <div className={`rounded-lg bg-muted p-2 ${item.color}`}>
            <item.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}