import { Component, type ReactNode } from 'react';

/**
 * Error boundary for decorative effects. If a WebGL/canvas effect throws on
 * init (context blocked, driver crash, etc.), we silently render the fallback
 * instead of taking down the whole page — decorative layers must never gate
 * access to content (design.md §7.0).
 */
export class SafeEffect extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    /* swallow — decorative only */
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
