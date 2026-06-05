import { type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Accent gradient-filled text (design.md §2.4 / decorative text). */
export function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  return <Tag className={cn('text-gradient', className)}>{children}</Tag>;
}
