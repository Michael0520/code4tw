import React, {CSSProperties} from 'react';
import {cn} from '../lib/utils';

interface RippleProps extends React.HTMLProps<HTMLDivElement> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className
}: RippleProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center',
        className
      )}
    >
      {Array.from({length: numCircles}, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const delay = i * 0.06;
        // 光暈從內到外遞減 - 超強烈版
        const glowIntensity = Math.max(0.7 - i * 0.05, 0.15);
        const glowSize = Math.max(160 - i * 12, 40);

        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay: `${delay}s`,
                border: `3px solid rgba(100, 100, 255, ${0.6 - i * 0.04})`,
                boxShadow: `
                  0 0 ${glowSize}px rgba(100, 100, 255, ${glowIntensity}),
                  0 0 ${glowSize * 1.5}px rgba(100, 100, 255, ${glowIntensity * 0.5}),
                  inset 0 0 ${glowSize / 2}px rgba(100, 100, 255, ${glowIntensity * 0.4})
                `,
                '--index': i
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';
