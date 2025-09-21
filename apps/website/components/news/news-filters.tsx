/**
 * News Filters Component
 * Category and sort filtering for news articles
 */

'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NEWS_CONFIG } from '@/lib/features/news/config';

interface NewsFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

export function NewsFilters({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange
}: NewsFiltersProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder={t('common.filter')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('projects.categories.all')}</SelectItem>
          {NEWS_CONFIG.categories.slice(1).map((category) => (
            <SelectItem key={category.value} value={category.value}>
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort Filter */}
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder={t('common.sort')} />
        </SelectTrigger>
        <SelectContent>
          {NEWS_CONFIG.sortOptions.map((option) => (
            <SelectItem
              key={`${option.value}-${option.order}`}
              value={`${option.value}-${option.order}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}