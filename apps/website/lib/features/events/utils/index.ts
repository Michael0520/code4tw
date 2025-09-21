/**
 * Events Utilities
 * Validation and utility functions for Events features
 */

import { EVENTS_CONFIG } from '@/lib/features/events/config';

export interface EventFilters {
  type?: string;
  status?: string;
  searchQuery?: string;
  sortBy?: 'title' | 'eventDate' | 'registrations' | 'capacity';
  sortOrder?: 'asc' | 'desc';
  isFeatured?: boolean;
  hasAvailableSpots?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * Validate event filters
 */
export function validateFilters(filters: EventFilters): boolean {
  // Check type
  if (filters.type && filters.type !== 'all') {
    const validTypes = EVENTS_CONFIG.types.map(t => t.value);
    if (!validTypes.includes(filters.type)) {
      return false;
    }
  }

  // Check status
  if (filters.status && filters.status !== 'all') {
    const validStatuses = EVENTS_CONFIG.statuses.map(s => s.value);
    if (!validStatuses.includes(filters.status)) {
      return false;
    }
  }

  // Check sort options
  if (filters.sortBy) {
    const validSortFields = ['title', 'eventDate', 'registrations', 'capacity'];
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