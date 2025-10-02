import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Brand variants
        'primary-brand':
          'bg-[#000095] text-white shadow-lg hover:bg-[#0000b3] hover:shadow-xl hover:scale-105 active:scale-95',
        'primary-white':
          'bg-white text-[#000095] shadow-lg hover:bg-gray-100 hover:shadow-xl hover:scale-105 active:scale-95',
        'outline-white':
          'border-2 border-white/50 bg-transparent text-white hover:bg-white/10 hover:border-white/70 hover:scale-105 active:scale-95',
        'outline-gray':
          'border-2 border-gray-300 bg-white text-gray-900 hover:border-blue-500 hover:scale-105 active:scale-95'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        xl: 'h-14 px-8 text-base',
        icon: 'h-9 w-9'
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        lg: 'rounded-lg',
        none: 'rounded-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, rounded, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({variant, size, rounded, className}))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
