import { AmbientBackground } from './components/effects/AmbientBackground';
import { CursorGlow } from './components/effects/CursorGlow';
import { ScrollProgress } from './components/effects/ScrollProgress';
import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Stats } from './sections/Stats';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    // `app-bg` paints the fixed radial wash (Layer A, design.md §6) behind everything.
    <div className="app-bg relative min-h-screen">
      <AmbientBackground />
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink-secondary focus:px-4 focus:py-2 focus:text-text-primary"
      >
        Skip to content
      </a>

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Stats />
        <Contact />
      </main>
    </div>
  );
}
