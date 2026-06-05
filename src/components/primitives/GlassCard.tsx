import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the animated conic glow ring around the card (design.md §7.2). */
  featured?: boolean;
}

/** The primary surface (design.md §7.1). Frosted, translucent, lit top edge. */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, featured, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('glass-card relative overflow-hidden', featured && 'glow-ring', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';
