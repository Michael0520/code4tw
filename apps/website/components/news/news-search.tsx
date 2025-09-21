/**
 * News Search Component
 * Search functionality for news articles with debouncing
 */

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NEWS_CONFIG } from '@/lib/features/news/config';

interface NewsSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function NewsSearch({ onSearch, placeholder }: NewsSearchProps) {
  const t = useTranslations();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= NEWS_CONFIG.search.minQueryLength || query.length === 0) {
        onSearch(query);
      }
    }, NEWS_CONFIG.search.debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder || t('news.searchPlaceholder') || 'Search news...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}