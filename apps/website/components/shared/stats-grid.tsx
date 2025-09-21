'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface StatItem {
  label: string;
  value: number;
  icon?: LucideIcon;
  color?: string;
  description?: string;
}

interface StatsGridProps {
  items: StatItem[];
  variant?: 'card' | 'simple';
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({
  items,
  variant = 'card',
  columns = 4,
  className = ''
}: StatsGridProps) {
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  if (variant === 'simple') {
    return (
      <div className={`grid gap-4 ${gridClasses[columns]} ${className}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg bg-background p-4"
          >
            {item.icon && (
              <div className={`rounded-lg bg-muted p-2 ${item.color || 'text-primary'}`}>
                <item.icon className="h-5 w-5" />
              </div>
            )}
            <div>
              <p className="text-2xl font-semibold">{item.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${gridClasses[columns]} ${className}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              {Icon && (
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-1">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              )}
              {!Icon && (
                <div className="text-sm text-muted-foreground mb-1">
                  {item.label}
                </div>
              )}
              <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
              {item.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}