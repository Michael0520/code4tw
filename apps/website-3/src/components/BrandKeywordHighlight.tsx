'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BrandKeywordHighlightProps {
  text: string;
  keywords: string[];
  className?: string;
  brandKeywordClassName?: string;
  normalClassName?: string;
  animate?: boolean;
}

export function BrandKeywordHighlight({
  text,
  keywords,
  className = '',
  brandKeywordClassName = 'font-brand',
  normalClassName = '',
  animate = true
}: BrandKeywordHighlightProps): ReactNode {
  // Create a regex pattern to match any of the keywords (case insensitive)
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');

  // Split the text into parts, keeping the separators (keywords)
  const parts = text.split(keywordPattern);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isKeyword = keywords.some(keyword =>
          part.toLowerCase() === keyword.toLowerCase()
        );

        if (isKeyword) {
          return animate ? (
            <motion.span
              key={index}
              className={`${brandKeywordClassName} ${normalClassName} align-baseline`}
              style={{ lineHeight: 'inherit' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              {part}
            </motion.span>
          ) : (
            <span
              key={index}
              className={`${brandKeywordClassName} ${normalClassName} align-baseline`}
              style={{ lineHeight: 'inherit' }}
            >
              {part}
            </span>
          );
        }

        return (
          <span key={index} className={normalClassName}>
            {part}
          </span>
        );
      })}
    </span>
  );
}

// Predefined keyword sets for consistent usage
export const BRAND_KEYWORDS = {
  // Core brand terms
  brand: ['Taiwan', 'Code', 'Technology', 'Tech', 'Digital'],

  // Action words
  action: ['Innovation', 'Build', 'Create', 'Transform', 'Join'],

  // Tech terms
  tech: ['Open Source', 'Community', 'Civic', 'Development', 'Platform'],

  // Values
  values: ['Transparency', 'Collaboration', 'Democracy', 'Participation'],

  // Common combinations
  common: ['Taiwan', 'Code', 'Technology', 'Innovation', 'Community', 'Open Source', 'Transform', 'Digital']
} as const;