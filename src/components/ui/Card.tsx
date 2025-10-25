// src/components/ui/Card.tsx
import { clsx } from 'clsx';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl border border-gray-200 bg-white shadow-sm',
          {
            'bg-gradient-to-br from-white to-primary-50': variant === 'gradient',
          },
          className
        )}
        {...props}
      />
    );
  }
);