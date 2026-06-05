import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { applyPerfClass } from './lib/perf';

// Score the device's perf tier once at boot and tag <html> with perf-low/perf-medium.
// This lets pure-CSS effects down-shift (less blur, fewer particles) before any JS runs.
applyPerfClass();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
