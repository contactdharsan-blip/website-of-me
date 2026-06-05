/**
 * Single source of truth for all résumé content.
 * Edit this file to update copy, add social links, or swap the CV.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ TODO(you): fill in the social URLs marked `''` below.        │
 * │ TODO(you): CV lives at public/Dharsan-Kesavan-CV.pdf        │
 * └─────────────────────────────────────────────────────────────┘
 */

export const profile = {
  name: 'Dharsan Kesavan',
  firstName: 'Dharsan',
  title: 'Bioengineer & Software Builder',
  // One-liner under the title; keywords in {curly braces} get highlighted in the hero.
  tagline:
    'I build at the seam between {life science} and {systems software} — from a {Rust}-core spaced-repetition app to an {ML}-driven drug-interaction engine.',
  location: 'Arizona, USA',
  email: 'contactdharsan@gmail.com',
  cvPath: '/Dharsan-Kesavan-CV.pdf', // name-bearing filename → engines associate the PDF with the person
  // Hero portrait — lives in site/public/. Cinematically graded to match the dark red/pink theme.
  portraitPath: '/portrait.jpg',
  portraitAlt: 'Dharsan Kesavan',
  available: true,
  availabilityNote: 'Open to internships & research collaborations',
} as const;

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'medium' | 'globe';
}

// TODO(you): replace empty hrefs. Links with href === '' are hidden automatically.
export const socials: SocialLink[] = [
  { label: 'GitHub', href: '', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dharsan-kesavan-22927a285/', icon: 'linkedin' },
  { label: 'X / Twitter', href: '', icon: 'twitter' },
  {
    label: 'Medium',
    href: 'https://medium.com/mindful-mental-health/npts-for-alzheimers-mst-and-cst-a85494de0699',
    icon: 'medium',
  },
  { label: 'Email', href: 'mailto:contactdharsan@gmail.com', icon: 'mail' },
];

/* ============================================================
   About
   ============================================================ */
export const about = {
  // Keywords in {braces} render as highlighted accent text.
  paragraphs: [
    "I'm a pre-medical student in Arizona State's inaugural {McKenna (MLSBE)} cohort, earning dual degrees in {AI in Business} and {Biomedical Sciences} — all while shipping production software. My work lives where rigorous life-science knowledge meets {systems-level engineering}.",
    'On the software side I architect {offline-first}, cross-platform apps around a single {Rust} core, and build {ML} pipelines that integrate a dozen siloed scientific databases. On the clinical side I shadow in {nephrology}, volunteer in {hospital care}, and publish {literature reviews} in neuroscience.',
    "The throughline: I like hard problems where getting the {domain} right matters as much as getting the {code} right.",
  ],
  highlights: [
    { label: 'Focus', value: 'Bio × Software' },
    { label: 'Core', value: 'Rust · Swift · ML' },
    { label: 'Track', value: 'Pre-Med' },
  ],
} as const;

/* ============================================================
   Skills (design.md — grouped pills)
   ============================================================ */
export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Rust', 'Swift', 'Kotlin', 'Python', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['SwiftUI', 'Jetpack Compose', 'React', 'Next.js', 'UniFFI', 'rusqlite'],
  },
  {
    category: 'Infrastructure & Backend',
    skills: ['Supabase', 'Postgres', 'SQLite (WAL)', 'Deno', 'Edge Functions', 'Vercel'],
  },
  {
    category: 'Machine Learning & AI',
    skills: [
      'Morgan FP CNN / MPNN',
      'BindingDB',
      'Tanimoto similarity',
      'Anthropic',
      'OpenAI',
      'Ollama',
    ],
  },
  {
    category: 'Architecture',
    skills: [
      'Offline-first',
      'Single Rust core (FFI)',
      'Multi-DB integration',
      'FSRS-5 SRS',
    ],
  },
  {
    category: 'Biomedical & Scientific',
    skills: [
      'Pharmacology',
      'Bioinformatics DBs',
      'Nephrology',
      'Neuroscience',
      'Clinical research',
    ],
  },
];

/**
 * Tools shown in the Skills "Tools I use" CircularGallery (WebGL).
 * `image` points at a pre-generated branded card in `public/tools/`
 * (see `scripts/gen-tool-cards.mjs`); `text` is the label drawn beneath it.
 */
export interface ToolGalleryItem {
  image: string;
  text: string;
}

export const toolGallery: ToolGalleryItem[] = [
  { image: '/tools/claude-code.svg', text: 'Claude Code' },
  { image: '/tools/cursor.svg', text: 'Cursor' },
  { image: '/tools/antigravity.svg', text: 'Antigravity' },
  { image: '/tools/vercel.svg', text: 'Vercel' },
  { image: '/tools/anthropic.svg', text: 'Anthropic' },
  { image: '/tools/openai.svg', text: 'OpenAI' },
  { image: '/tools/gemini.svg', text: 'Gemini' },
  { image: '/tools/supabase.svg', text: 'Supabase' },
  { image: '/tools/firebase.svg', text: 'Firebase' },
  { image: '/tools/github.svg', text: 'GitHub' },
  { image: '/tools/copilot.svg', text: 'GitHub Copilot' },
  { image: '/tools/ollama.svg', text: 'Ollama' },
  { image: '/tools/figma.svg', text: 'Figma' },
];

/* ============================================================
   Experience (vertical timeline)
   ============================================================ */
export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  meta?: string;
  href?: string;
  category: 'Software' | 'Clinical & Research';
  summary: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    org: 'AlóJefe',
    role: 'Full-Stack Developer',
    period: 'Freelance',
    meta: 'Next.js · Vercel',
    href: 'https://www.alojefe.com',
    category: 'Software',
    summary:
      'Website + backend for a bilingual AI voice assistant that answers inbound calls 24/7 for solo contractors and trades — qualifying jobs, booking estimates with drive-time routing, and texting summaries to owners, in English and Spanish with mid-sentence language switching.',
    bullets: [
      'Designed backend logic for call handling, calendar integration, and a revenue-tracking dashboard',
      'Built the full Next.js App Router site deployed on Vercel',
      'Targets missed-call revenue loss for on-site contractors who can’t answer while working',
    ],
  },
  {
    org: 'Cognifer Labs',
    role: 'Full-Stack Developer',
    period: 'Freelance',
    meta: 'Next.js · Vercel',
    href: 'https://cogniferlabs.com',
    category: 'Software',
    summary:
      'Website + backend for an AI consulting and automation firm serving small businesses — chatbots, custom workflow automation, data analytics, and cloud migration, positioned as enterprise-grade AI at SMB pricing.',
    bullets: [
      'Implemented backend services for AI chatbot integration and workflow automation',
      'Built and deployed the marketing and product site on Vercel',
    ],
  },
  {
    org: 'Banner Health',
    role: 'Patient-Facing Volunteer',
    period: '2024 – Present',
    meta: '175 hours',
    category: 'Clinical & Research',
    summary:
      'Volunteer at one of the largest nonprofit health systems in the US. Supported clinical staff, assisted patients, and observed care delivery across hospital departments.',
    bullets: [],
  },
  {
    org: 'Desert Kidney Associates',
    role: 'Physician Shadow — Nephrology',
    period: '2024 – Present',
    meta: '120 hours',
    category: 'Clinical & Research',
    summary:
      'Shadowed nephrologist Dr. Prashant Kolar through inpatient rounds, outpatient consults, and dialysis management — chronic kidney disease staging, fluid/electrolyte management, and the intersection of diabetes and hypertension with renal outcomes.',
    bullets: [],
  },
  {
    org: 'Physical Therapy',
    role: 'Clinical Shadow',
    period: '2023',
    meta: '80 hours',
    category: 'Clinical & Research',
    summary:
      'Shadowed physical therapist Salman Ashraf across outpatient rehabilitation — observing movement and gait assessment, therapeutic-exercise progression, manual therapy, and the rehab arc from injury to restored function.',
    bullets: [],
  },
  {
    org: 'Mindful Mental Health (Medium)',
    role: 'Author — Literature Review',
    period: 'Sep 2025',
    meta: 'Non-pharmacological therapies for Alzheimer’s',
    href: 'https://medium.com/mindful-mental-health/npts-for-alzheimers-mst-and-cst-a85494de0699',
    category: 'Clinical & Research',
    summary:
      'A peer-reviewed-style literature review comparing two non-pharmacological interventions for Alzheimer’s disease, analyzing neuroimaging evidence and effect sizes.',
    bullets: [
      'Mnemonic Strategy Training (MST) — encoding techniques leveraging neuroplasticity; effect size d = 0.75',
      'Cognitive Stimulation Therapy (CST) — group-based social stimulation for quality of life',
      'Proposed a combined MST + CST protocol for individualized patient outcomes',
    ],
  },
];

/* ============================================================
   Projects (bento grid)
   ============================================================ */
export interface Project {
  name: string;
  blurb: string;
  description: string;
  status: string;
  featured: boolean;
  href?: string;
  repo?: string;
  tech: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    name: 'Avorio',
    blurb: 'Native spaced-repetition app',
    description:
      'Avorio is a cross-platform spaced-repetition flashcard app built on the FSRS-5 algorithm — algorithmically rigorous and genuinely pleasant to use, filling the gap between Anki (powerful but dated) and Quizlet (polished but algorithmically weak). One shared Rust core drives macOS, iOS, and Android; platform UIs are pure presentation calling through a UniFFI-generated facade.',
    status: 'In development · macOS & iOS ~87%',
    featured: true,
    href: 'https://avorio.ai',
    tech: ['Rust', 'UniFFI', 'SwiftUI', 'Jetpack Compose', 'rusqlite', 'Supabase'],
    highlights: [
      'FSRS-5 scheduling for optimal review intervals',
      'Offline-first — on-device SQLite (WAL mode)',
      'AI card generation via Anthropic / OpenAI / Ollama',
      'Gamification: gems, streaks, in-app shop',
    ],
  },
  {
    name: 'BioPath',
    blurb: 'Drug-interaction & body-impact engine',
    description:
      'BioPath is a drug-interaction and body-impact engine. “I have this compound — what will it do to my body, and is it safe with what I’m already taking?” It stitches together a dozen specialized scientific databases that each speak a different language, running the full resolution chain automatically from a drug name, a plant photo, a plant name, or a pill imprint.',
    status: 'Live',
    featured: true,
    href: 'https://biopath.space',
    tech: ['Python', 'React', 'Morgan FP CNN/MPNN', 'BindingDB', 'ChEMBL', 'Reactome'],
    highlights: [
      'Resolves identity → targets → pathways → organ impact → safety',
      'BioPathML predicts binding across ~700 human proteins',
      'Cross-validates ML predictions against measured ChEMBL targets',
      'Tanimoto ≥ 0.70 transfers risk from analogous known drugs',
    ],
  },
];

/* ============================================================
   Stats / social proof (animated counters)
   ============================================================ */
export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 375, suffix: '+', label: 'Clinical hours' },
  { value: 2, label: 'Products shipped' },
  { value: 700, suffix: '+', label: 'Proteins modeled (BioPathML)' },
  { value: 1530, label: 'SAT (~99th pctl)' },
];

/* ============================================================
   Education
   ============================================================ */
export const education = {
  school: 'Arizona State University',
  degree: 'Dual B.S. — AI in Business + Biological Sciences (Biomedical Sciences)',
  period: '2026 – Present',
  track: 'McKenna (MLSBE) · Inaugural Cohort',
  note: "McKenna Life Sciences, Business and Entrepreneurship (MLSBE) — a selective 30-student cohort program run jointly by W. P. Carey and The College of Liberal Arts and Sciences. Two bachelor's degrees plus an Entrepreneurship & Innovation certificate in four years, training leaders at the intersection of medicine, biotech, and business.",
  coursework: ['Biomedical Sciences', 'AI in Business', 'Biochemistry', 'Human Physiology', 'Entrepreneurship & Innovation'],
  testing: [{ test: 'SAT', score: '1530', percentile: '~99th' }],
} as const;

/* ============================================================
   In brief — third-person, self-contained Q&A (answer-engine friendly)
   ------------------------------------------------------------
   Each answer is a single citable sentence: subject + claim, no pronoun-
   dependent context, the exact name "Dharsan Kesavan" early. This is the
   surface AI assistants quote when asked "Who is Dharsan Kesavan?".
   NOTE: rendered as VISIBLE prose only — deliberately NOT marked up as
   FAQPage/QAPage JSON-LD (Google removed FAQ rich results for non-gov/health
   sites in 2023, and AI engines extract from visible text, not the markup).
   ============================================================ */
export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: 'Who is Dharsan Kesavan?',
    a: "Dharsan Kesavan is a bioengineer and software builder, and a student in Arizona State University's inaugural McKenna (MLSBE) cohort pursuing dual degrees in Biomedical Sciences and AI in Business.",
  },
  {
    q: 'What is Avorio?',
    a: 'Avorio is a cross-platform spaced-repetition flashcard app built by Dharsan Kesavan on the FSRS-5 algorithm, with one shared Rust core driving native macOS, iOS, and Android apps.',
  },
  {
    q: 'What is BioPath?',
    a: "BioPath is a machine-learning drug-interaction and body-impact engine built by Dharsan Kesavan that resolves a compound's identity, biological targets, pathways, organ impact, and safety across a dozen scientific databases.",
  },
  {
    q: 'What does Dharsan Kesavan study and build?',
    a: 'Dharsan Kesavan studies biomedical sciences and AI on a pre-medical track while building production software — shadowing in nephrology and volunteering in hospital care alongside Rust, Swift, and machine-learning projects.',
  },
];

/* ============================================================
   Section nav (anchors)
   ============================================================ */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;
