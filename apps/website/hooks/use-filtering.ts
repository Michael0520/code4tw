import { useCallback, useMemo, useState } from 'react';

export interface FilterableItem {
  title: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  category?: string;
  type?: string;
  status?: string;
}

export interface UseFilteringConfig<T extends FilterableItem> {
  items: T[];
  searchFields?: (keyof T)[];
  defaultCategory?: string;
  defaultStatus?: string;
}

export function useFiltering<T extends FilterableItem>({
  items,
  searchFields = ['title', 'title_en', 'description_zh', 'description_en'],
  defaultCategory = 'all',
  defaultStatus = 'all',
}: UseFilteringConfig<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search matching
      const matchesSearch = searchQuery.length === 0 ||
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });

      // Category matching
      const matchesCategory = selectedCategory === 'all' ||
        item.category === selectedCategory ||
        item.type === selectedCategory;

      // Status matching
      const matchesStatus = selectedStatus === 'all' ||
        item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, selectedStatus, searchFields]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(defaultCategory);
    setSelectedStatus(defaultStatus);
  }, [defaultCategory, defaultStatus]);

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedStatus,
    filteredItems,

    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedStatus,
    resetFilters,

    // Metadata
    totalCount: items.length,
    filteredCount: filteredItems.length,
    hasActiveFilters: searchQuery !== '' ||
      selectedCategory !== defaultCategory ||
      selectedStatus !== defaultStatus,
  };
}