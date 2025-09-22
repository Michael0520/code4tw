'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PROJECTS_CONFIG } from '@/lib/features/projects/config/index';

interface ProjectsSearchProps {
  placeholder?: string;
  defaultValue?: string;
}

export default function ProjectsSearch({ placeholder, defaultValue }: ProjectsSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue || '');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.length >= PROJECTS_CONFIG.search.minQueryLength) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      router.push(`${pathname}?${params.toString()}`);
    }, PROJECTS_CONFIG.search.debounceMs);

    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParams]);

  const handleClear = useCallback(() => {
    setValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="relative w-full sm:w-auto">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder || 'Search projects...'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-10 sm:w-[300px]"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}