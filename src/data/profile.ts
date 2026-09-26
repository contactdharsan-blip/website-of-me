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
  { label: 'GitHub', href: 'https://github.com/contactdharsan-blip', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dharsan-kesavan', icon: 'linkedin' },
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
    'On the software side I architect {offline-first}, cross-platform apps around a single {Rust} core, and build {ML} pipelines that integrate a dozen siloed scientific databases. On the clinical side I volunteer in {hospital care}, have shadowed in {nephrology}, and publish {literature reviews} in neuroscience.',
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
  category: 'Software' | 'Clinical & Research' | 'Leadership & Teaching';
  summary: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    org: 'VivaMed BioPharma',
    role: 'Paid Technical Intern',
    period: 'Aug 2026 – Present',
    meta: '2 mos · Contract',
    category: 'Software',
    summary:
      'Primary engineer on a computational screening platform for drug candidates — most of its screening engines, the scoring and red-team review stages, and the orchestration that runs them end to end, so each run yields a reproducible, provenance-tracked evidence dossier.',
    bullets: [
      'Built loaders and reconciliation over a 500 GB Postgres research warehouse (DepMap, ClinVar, FAERS), plus a licence gate that stops any engine from reading a source whose terms bar that use — on by default, every bypass needing a recorded reason',
      'Merged the platform with the CTO’s discovery-engine codebase into one pipeline of 19 cost-ordered gates, and pulled the scoring logic both had duplicated into one shared package',
      'Hardened the CTO-led engine suite: verification gates, a default-deny network egress allowlist, and database writes that fail loudly instead of silently',
      '10–20 hrs/week alongside a dual-degree course load at ASU · Python, Pydantic, Polars, RDKit, Postgres',
    ],
  },
  {
    org: 'Cognifer Labs',
    role: 'Founder',
    period: 'Mar 2026 – Present',
    meta: '7 mos · Self-employed',
    href: 'https://cogniferlabs.com',
    category: 'Software',
    summary:
      'Founded Cognifer Labs and built Avorio (avorio.ai), a native spaced-repetition app for Mac and iPhone that launched in July 2026.',
    bullets: [
      'Built one engine that handles scheduling, storage, and Anki import everywhere, so every platform behaves identically instead of quietly drifting apart',
      'Added an AI layer with a free on-device option, and launched paid subscriptions',
      'Porting to Android on the same foundation, not a rebuild',
    ],
  },
  {
    org: 'AlóJefe',
    role: 'Full-Stack Developer',
    period: '2025 – 2026',
    meta: 'Freelance · Next.js · Vercel',
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
    org: 'Banner Health',
    role: 'Patient-Facing Volunteer',
    period: '2024 – Present',
    meta: '175 hours',
    category: 'Clinical & Research',
    summary:
      'Volunteer at one of the largest nonprofit health systems in the US, assisting patients and clinical staff across inpatient and outpatient departments.',
    bullets: ['Built a front-desk data system that cut the time to log and retrieve patient information'],
  },
  {
    org: 'Desert Kidney Associates',
    role: 'Physician Shadow — Nephrology',
    period: '2024 – 2026',
    meta: '120 hours',
    category: 'Clinical & Research',
    summary:
      'Shadowed nephrologist Dr. Prashant Kolar through inpatient rounds, outpatient consults, and dialysis management — chronic kidney disease staging, fluid/electrolyte management, and the intersection of diabetes and hypertension with renal outcomes.',
    bullets: ['Sat in on the patient-education conversations — where much of the disease course actually gets decided'],
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
      'A literature review comparing two non-pharmacological interventions for Alzheimer’s disease, working through the neuroimaging evidence and the published effect sizes for each.',
    bullets: [
      'Mnemonic Strategy Training (MST) — encoding strategies that show their largest gains on trained material in mild cognitive impairment',
      'Cognitive Stimulation Therapy (CST) — group-based social stimulation, with smaller cognitive effects but measurable gains in mood and self-reported quality of life',
      'Argued the two are complementary rather than competing, and that a combined approach is worth testing',
    ],
  },
  {
    org: 'Flare Review',
    role: 'Director of Operations',
    period: 'Oct 2025 – Aug 2026',
    meta: '11 mos · Self-employed · Remote',
    category: 'Leadership & Teaching',
    summary:
      'Ran operations for a student-led video editing nonprofit — scheduling, project intake, and hand-off between editors.',
    bullets: [],
  },
  {
    org: 'Schoolhouse.world',
    role: 'Senior Tutor',
    period: 'Nov 2023 – Jun 2026',
    meta: '2 yrs 8 mos · Freelance · Remote',
    category: 'Leadership & Teaching',
    summary:
      'Tutored one-on-one, building each plan around what the student was actually getting wrong rather than working through a fixed syllabus.',
    bullets: ['Recruited and onboarded new tutors, extending the program beyond what one person could reach'],
  },
  {
    org: 'Student meal program',
    role: 'Volunteer Teacher and Fundraiser',
    period: '2023 – 2025',
    category: 'Leadership & Teaching',
    summary: 'Raised $7,000 for student meal programs and taught in the classrooms that money paid for.',
    bullets: ['Coached students on career paths — the part they asked for most'],
  },
  {
    org: 'Arizona Tamil School',
    role: 'Teaching Assistant',
    period: '2016 – Present',
    meta: '10 yrs',
    category: 'Leadership & Teaching',
    summary:
      'Taught language and culture classes for a decade and coordinated the annual performances, from rehearsal scheduling through the night itself.',
    bullets: [],
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
      "Avorio is a native flashcard app for macOS and iOS that resurfaces what you're about to forget right before you forget it — the scheduling rigor people love about Anki, in a Mac and iPhone experience that actually feels like one. Free, no account, works fully offline, with one shared engine keeping every platform in step as Android joins on the same foundation.",
    status: 'Live · Free on Mac & iPhone',
    featured: true,
    href: 'https://avorio.ai',
    tech: ['Rust', 'UniFFI', 'SwiftUI', 'Jetpack Compose', 'rusqlite', 'Supabase'],
    highlights: [
      "Learns your personal forgetting curve instead of fixed intervals — cards come back exactly when you're about to lose them",
      'Anki switchers keep everything: full deck, review history, and study habits carry over, nothing starts from zero',
      'Set how much time you want to spend studying each day; the app decides which cards earn it',
      'Turns a document, photo, or class note into ready-to-study cards',
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
  {
    name: 'Agent Bridge',
    blurb: 'Bridge Claude Code, Codex, Cursor',
    description:
      "Desktop app (Tauri + Rust + React) that drives Claude Code, Codex, and Cursor from one unified shell — spawning each as a subprocess over the Agent Client Protocol (ACP), rendering one accept/reject diff UI with zero per-agent branches. It exists to solve the seam between AI coding tools: a Projection Engine round-trips one canonical config into each agent's native format (MCP JSON/TOML, skills, instructions), a Handoff Bridge honestly reconstructs context when switching agents (labeled 'reconstructed, not resumed', never silently migrated), and a cross-agent Profile Skill merges usage data from all three tools into one coder profile with confidence-weighted scoring.",
    status: 'In development · ~85%',
    featured: true,
    repo: 'https://github.com/Cognifer-Labs/agent-bridge',
    tech: [
      'Rust',
      'TypeScript',
      'React 18',
      'Tauri v2',
      'tokio',
      'serde',
      'agent-client-protocol (ACP, Zed)',
      'Vite',
      'Vitest',
      'Radix UI',
      'Framer Motion',
      'JSON Schema',
    ],
    highlights: [
      'Two-engine architecture: a pure Projection Engine (canonical → Claude JSON / Codex TOML / Cursor JSON, round-trip-identity tested) plus a stateful Handoff Bridge that captures a ContextSnapshot and reconstructs an honest opening turn on agent switch',
      'One ACP transport core (crates/acp-host) frozen behind a narrow AgentEvent contract — adding a new agent is a registry-row change, not new integration code; zero if(agent===X) branches anywhere in the UI',
      'Cross-agent Vibe-Coder Profile: one authored SKILL.md runs natively inside each agent, emits schema-validated JSON, and gets merged confidence-weighted by data volume into a Workflow Continuity Report with equivalent-vs-approximation gap-filling',
      '~10.4k lines (5.6k Rust / 4.8k TS) across a 7-crate Cargo workspace + React frontend, with 92 Rust test functions and 25 Vitest tests',
      "Explicit 'honesty by design' UX constraint: secrets are never inlined (keychain refs + spawn-time resolution), drift review and carry-diff acknowledgment handled transparently, confidence and labels always sourced from real backend fields",
    ],
  },
  {
    name: 'Backglass',
    blurb: 'Personal commitment ledger + morning brief',
    description:
      'Backglass reads mail, messages, calendars, Canvas, and notes on a schedule, extracts typed records — commitments made, commitments owed, deadlines, goal progress — and plans the day against actual available capacity. Single-user and local-first: the ledger, database, and dashboard never leave the machine, and every extraction call is BYO-key (Anthropic/DeepInfra, or free via an existing Claude Code subscription).',
    status: 'Open source · MIT',
    featured: true,
    repo: 'https://github.com/Cognifer-Labs/backglass',
    tech: ['Python', 'FastAPI', 'Pydantic', 'Tauri', 'React', 'TypeScript', 'Anthropic API', 'Google Workspace APIs'],
    highlights: [
      'Deterministic ingest-time extraction instead of runtime vector search — known queries computed once, not chat/RAG',
      'Sends a two-minute morning brief at 06:00 and serves a live dashboard; scheduling engine plans the day against real capacity',
      'No automatic calendar writes — every proposed change requires explicit accept',
      'MIT-licensed, single-user, no account and no hosted service; text only leaves the machine via the model backend the user configures',
      'Keeps a personal fact base with a supersession history and serves it read-only to other AI agents over an MCP server',
      '184 Python modules, 18 source connectors, 3,200+ tests gated by pytest + mypy + ruff, plus a Tauri + React desktop shell',
    ],
  },
  {
    name: 'Tradgent',
    blurb: 'Investing companion with a fenced paper-trading lane',
    description:
      'Tradgent is a personal investing companion: it tracks contributions, checks whether an allocation has drifted outside its rebalance bands, and watches tax lots, wash sales, and dividend windows — placing no trades, because the core has no broker write path and a test enforces that. A separately fenced signals lane scores news wires, SEC filings, and Federal Reserve and Treasury feeds into a rating per instrument and trades a paper account only, dry by default.',
    status: 'In development',
    featured: true,
    tech: ['Python', 'SQLite', 'Alpaca (paper)', 'SEC EDGAR', 'GDELT', 'launchd'],
    highlights: [
      'Alerts by default; orders only on paper, only when asked — nothing in the repo can reach a broker holding real funds',
      'Money is never a float: Decimal in Python, integer cents in SQLite, and a trigger that rejects a REAL column',
      'News is an unsigned uncertainty signal — it can shrink an allocation, never enlarge or forecast one',
      'Measures risk (concentration, correlation, worst-month cost) and forecasts no return',
      '66 Python modules, 2,300+ tests',
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
  track: 'Barrett Honors · McKenna (MLSBE) Inaugural Cohort',
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
    a: 'Avorio is a native spaced-repetition flashcard app for macOS and iOS built by Dharsan Kesavan on the FSRS-5 algorithm — free, no account, works offline — with one shared Rust core also driving an in-development Android app.',
  },
  {
    q: 'What is BioPath?',
    a: "BioPath is a machine-learning drug-interaction and body-impact engine built by Dharsan Kesavan that resolves a compound's identity, biological targets, pathways, organ impact, and safety across a dozen scientific databases.",
  },
  {
    q: 'What does Dharsan Kesavan study and build?',
    a: 'Dharsan Kesavan studies biomedical sciences and AI on a pre-medical track while building production software, with nephrology shadowing and hospital volunteering alongside Rust, Swift, and machine-learning projects.',
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
