import { Fragment } from 'react';

/**
 * Renders a string with {curly-braced} spans emphasized in accent color.
 * Lets copy live as plain strings in profile.ts while still getting
 * inline keyword highlighting.
 */
export function Highlight({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('{') && part.endsWith('}')) {
          return (
            <span key={i} className="font-medium text-text-primary">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </span>
  );
}
