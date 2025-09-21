/**
 * Projects Utilities
 * Validation and utility functions for Projects features
 */

import { PROJECTS_CONFIG } from '@/lib/features/projects/config';

export interface ProjectFilters {
  category?: string;
  status?: string;
  featured?: boolean;
  searchQuery?: string;
  sortBy?: 'title' | 'lastUpdated' | 'createdAt' | 'stars';
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
}

/**
 * Validate project filters
 */
export function validateFilters(filters: ProjectFilters): boolean {
  // Check category
  if (filters.category && filters.category !== 'all') {
    const validCategories = PROJECTS_CONFIG.categories.map(c => c.value);
    if (!validCategories.includes(filters.category)) {
      return false;
    }
  }

  // Check status
  if (filters.status && filters.status !== 'all') {
    const validStatuses = PROJECTS_CONFIG.statuses.map(s => s.value);
    if (!validStatuses.includes(filters.status)) {
      return false;
    }
  }

  // Check sort options
  if (filters.sortBy) {
    const validSortFields = ['title', 'lastUpdated', 'createdAt', 'stars'];
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