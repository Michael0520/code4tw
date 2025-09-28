'use client';

import {usePathname, useRouter} from 'next/navigation';
import {Globe} from 'lucide-react';
import {useState, useRef, useEffect} from 'react';

const languages = [
  {code: 'zh', label: '中文'},
  {code: 'en', label: 'English'}
];

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'zh';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-all shadow-lg"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find((lang) => lang.code === currentLocale)?.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg py-1 min-w-[120px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                currentLocale === lang.code ? 'bg-gray-50 font-semibold' : ''
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
