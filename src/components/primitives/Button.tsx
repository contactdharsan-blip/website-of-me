import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'glass';
type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm sm:text-base',
  lg: 'h-14 px-7 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 font-medium select-none whitespace-nowrap ' +
  'min-h-[44px] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function buttonClasses({ variant = 'primary', size = 'md', className }: Omit<BaseProps, 'children'>) {
  return cn(base, sizes[size], variant === 'primary' ? 'btn-primary' : 'btn-glass', className);
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export function LinkButton({ variant, size, className, children, ...props }: LinkButtonProps) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </a>
  );
}
