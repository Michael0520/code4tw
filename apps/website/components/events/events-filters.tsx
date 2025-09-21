'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { EventFilters } from '@/lib/features/events/actions';
import { EVENTS_CONFIG } from '@/lib/features/events/config';

interface EventsFiltersProps {
  currentFilters: EventFilters;
  total: number;
}

export function EventsFilters({ currentFilters, total }: EventsFiltersProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(currentFilters.searchQuery || '');
  const [selectedType, setSelectedType] = useState(currentFilters.type || 'all');
  const [selectedStatus, setSelectedStatus] = useState(currentFilters.status || 'all');

  const updateFilters = useCallback((newFilters: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url);
  }, [pathname, router, searchParams]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: searchQuery });
    }, EVENTS_CONFIG.search.debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, updateFilters]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    updateFilters({ type: value });
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    updateFilters({ status: value });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedStatus('all');
    router.push(pathname);
  };

  const hasActiveFilters = searchQuery || selectedType !== 'all' || selectedStatus !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('events.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EVENTS_CONFIG.types.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center gap-2">
                      {type.icon && <span>{type.icon}</span>}
                      {t(`events.types.${type.value}`)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EVENTS_CONFIG.statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {t(`events.statuses.${status.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count and Clear Button */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {t('events.showing', { count: total })}
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              {t('common.reset')}
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
              <span>{t('common.search')}: &quot;{searchQuery}&quot;</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {selectedType !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
              <span>{t('common.filter')}: {t(`events.types.${selectedType}`)}</span>
              <button
                onClick={() => handleTypeChange('all')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {selectedStatus !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
              <span>{t('common.filter')}: {t(`events.statuses.${selectedStatus}`)}</span>
              <button
                onClick={() => handleStatusChange('all')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}