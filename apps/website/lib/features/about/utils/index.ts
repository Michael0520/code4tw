/**
 * About Utilities
 * Validation and utility functions for About features
 */

export interface TeamSearchFilters {
  query?: string;
  role?: string;
  isActive?: boolean;
}

/**
 * Validate team search filters
 */
export function validateTeamFilters(filters: TeamSearchFilters): boolean {
  if (filters.query && filters.query.length > 100) {
    return false;
  }

  if (filters.role && filters.role.length > 100) {
    return false;
  }

  return true;
}