import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { projects, type Project } from '@/data/profile';
import { SectionWrapper } from '@/components/primitives/SectionWrapper';
import { GlassCard } from '@/components/primitives/GlassCard';
import { TiltCard } from '@/components/effects/TiltCard';
import { revealOnScroll, staggerContainer, staggerItem, useMotionSafe } from '@/lib/motion';

/** Makes the whole card a link to the project site when an href exists. */
function CardShell({ href, label, children }: { href?: string; label: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${label}`}
      className="block h-full rounded-[1.5rem] focus-visible:outline-none"
    >
      {children}
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="group h-full" max={5}>
      <CardShell href={project.href} label={project.name}>
      <GlassCard
        featured={project.featured}
        className={`flex h-full flex-col p-6 sm:p-8 ${project.href ? 'cursor-pointer' : ''}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {project.name}
            </h3>
            <p className="typo-caption mt-1">{project.blurb}</p>
          </div>
          <span className="pill typo-badge shrink-0 text-primary-300">
            {project.status.includes('Live') ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse-slow" /> Live
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3" /> Building
              </>
            )}
          </span>
        </div>

        <p className="typo-body mt-4">{project.description}</p>

        {/* Highlights */}
        <ul className="mt-5 grid gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="typo-mono cursor-default rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400/40 hover:bg-primary-400/10 hover:text-text-secondary">
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center gap-3 pt-1">
          <span className="typo-caption">{project.status}</span>
          {project.href && (
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary-300 transition-colors group-hover:text-primary-200">
              Visit <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </GlassCard>
      </CardShell>
    </TiltCard>
  );
}

export function Projects() {
  const safe = useMotionSafe();

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Work"
      title="Selected projects"
      description="Two products I’ve designed and built end-to-end — one shipping, one in active development."
    >
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="grid gap-5 md:grid-cols-2"
      >
        {projects.map((p) => (
          <motion.div key={p.name} variants={staggerItem} transition={safe ? undefined : { duration: 0 }}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
