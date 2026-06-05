import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import { type SocialLink } from '@/data/profile';

interface SocialIconProps {
  icon: SocialLink['icon'];
  className?: string;
}

/** Maps a social key → icon node. Medium has no lucide glyph, so it's inline. */
export function SocialIcon({ icon, className = 'h-5 w-5' }: SocialIconProps) {
  switch (icon) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'twitter':
      return <Twitter className={className} />;
    case 'mail':
      return <Mail className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'medium':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      );
    default:
      return <Globe className={className} />;
  }
}
