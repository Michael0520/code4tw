/**
 * News Utilities
 * Validation and utility functions for News features
 */

import { NEWS_CONFIG } from '@/lib/features/news/config';

export interface NewsFilters {
  category?: string;
  featured?: boolean;
  searchQuery?: string;
  sortBy?: 'publishedDate' | 'title' | 'readingTime';
  sortOrder?: 'asc' | 'desc';
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * Validate news filters
 */
export function validateFilters(filters: NewsFilters): boolean {
  // Check category
  if (filters.category && filters.category !== 'all') {
    const validCategories = NEWS_CONFIG.categories.map(c => c.value);
    if (!validCategories.includes(filters.category)) {
      return false;
    }
  }

  // Check sort options
  if (filters.sortBy) {
    const validSortFields = ['title', 'publishedAt', 'createdAt', 'readingTime'];
    if (!validSortFields.includes(filters.sortBy)) {
      return false;
    }
  }

  if (filters.sortOrder) {
    const validSortOrders = ['asc', 'desc'];
    if (!validSortOrders.includes(filters.sortOrder)) {
      return false;
    }
  }

  return true;
}