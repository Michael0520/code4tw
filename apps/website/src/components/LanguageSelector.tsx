'use client';

import {usePathname, useRouter} from 'next/navigation';
import {Globe, Check} from 'lucide-react';
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
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
        aria-label={`Select language. Current language: ${languages.find((lang) => lang.code === currentLocale)?.label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">
          {languages.find((lang) => lang.code === currentLocale)?.label}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl py-1 min-w-[160px] z-50 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
          aria-label="Language options"
        >
          {languages.map((lang) => {
            const isSelected = currentLocale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-left hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 cursor-pointer focus:outline-none focus:bg-gray-100 ${
                  isSelected ? 'bg-gray-50' : ''
                }`}
                role="option"
                aria-selected={isSelected}
                type="button"
              >
                <span
                  className={`text-sm ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
                >
                  {lang.label}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-blue-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
