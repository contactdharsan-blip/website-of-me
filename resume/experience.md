# Experience

## Ventures and Products

### Cognifer Labs — Founder
*Mar 2026 – Present · Chandler, AZ · [avorio.ai](https://avorio.ai)*

Building Avorio, a native spaced-repetition learning app for macOS and iOS, plus the infrastructure behind it.

- Shipped Avorio to the App Store: v1.0 approved July 2026, v1.1 approved and released the day it was submitted. The Mac app ships as a Developer ID-signed, notarized direct download with Sparkle auto-updates.
- Built the product on one shared Rust core (FSRS-5 and SM-2 scheduling, rusqlite storage, Anki import/export, gamification, AI routing) exposed to Swift and Kotlin through a single UniFFI interface, so three platforms run one implementation instead of three that drift apart.
- Made switching from Anki lossless: importing `.apkg`/`.colpkg` keeps ease factors, intervals, lapses, review history, media, cloze, and image occlusion, with a diff report before anything commits. Avorio then replays that review log to fit the learner's own FSRS-5 parameters, above a 1,000-review floor where a fitted model would be worse than the default.
- Shipped the AI layer as a managed gateway with server-held keys and free choice of model, plus free on-device paths through Apple Intelligence and Ollama: document-to-cards with generated diagrams, per-card explanations, and a tutor that reads a card's own scheduling signals to teach the point the learner keeps missing.
- Ran the backend and monetization: Supabase with 66 Postgres migrations and 12 edge functions, Stripe web checkout, RevenueCat/StoreKit subscriptions across three tiers. The flashcard core is free; paid tiers cover cloud AI and optional Mac↔iPhone sync.
- Localized into eight languages beyond English, with roughly 1,079 Rust, 245 Swift, and 160 Kotlin tests gated in CI on every change. Android (Jetpack Compose) is in active development against the same core.

---

### BioPath — Founder & Sole Engineer
*2025 – Present · [biopath.space](https://biopath.space)*

See `projects.md` for the full write-up.

---

### AlóJefe — Full-Stack Developer (client)
*2025 – 2026 · [alojefe.com](https://www.alojefe.com) · Next.js / Vercel*

Built the site and backend for a bilingual AI phone assistant sold to solo contractors in roofing, HVAC, and plumbing. It answers the calls an owner can't take from a roof, qualifies the job, books an estimate with drive-time routing, and texts back a summary, switching between English and Spanish mid-sentence.

---

## Clinical

### Banner Health — Patient-Facing Volunteer
*2024 – Present · 175 hours*

Assisted patients and clinical staff across inpatient and outpatient departments at one of the largest nonprofit health systems in the country. Built a front-desk data system that cut the time it took to log and retrieve patient information.

---

### Desert Kidney Associates — Physician Shadowing, Nephrology
*2024 – 2026 · 120 hours*

Shadowed Dr. Prashant Kolar through inpatient rounds, outpatient consultations, and dialysis management. Followed chronic kidney disease staging, fluid and electrolyte management, and the way diabetes and hypertension end up as renal outcomes. Sat in on patient education about lifestyle change, which is where much of the disease course actually gets decided.

---

### ROC Physical Therapy — Clinical Shadowing
*2023 · 80 hours*

Observed outpatient rehabilitation with physical therapist Salman Ashraf: gait and movement assessment, therapeutic exercise progression, manual therapy, and the arc from injury back to function.

---

### Emergency Medical Technician — training in progress
*2026*

---

## Research and Scholarly Writing

### Literature Review — Non-Pharmacological Therapies for Alzheimer's Disease
*Published September 2025 · Mindful Mental Health (Medium)*

Compared two non-pharmacological interventions for Alzheimer's disease:

- **Mnemonic Strategy Training (MST)** — encoding strategies that improve retrieval via neuroplasticity, with the largest gains on trained material in mild cognitive impairment
- **Cognitive Stimulation Therapy (CST)** — group-based social stimulation; smaller cognitive effects, but measurable gains in mood, communication, and self-reported quality of life

Worked through the neuroimaging evidence, showed why the two interventions' effect sizes cannot be compared head-to-head — different outcome measures, different patient populations — and argued they are complementary rather than competing.

[Read on Medium →](https://medium.com/mindful-mental-health/npts-for-alzheimers-mst-and-cst-a85494de0699)

---

## Leadership and Teaching

### Flare Review — Director of Operations
*Oct 2025 – Aug 2026 · Remote*

Ran operations for a student-led video editing nonprofit: scheduling, project intake, and hand-off between editors.

---

### Schoolhouse.world — Senior Tutor
*Nov 2023 – Jun 2026 · Remote*

Tutored one on one, building each plan around what the student was actually getting wrong. Recruited and onboarded new tutors, which is what let the program reach more students than any one person could.

---

### Volunteer Teacher — student meal program
*2023 – 2025*

Raised $7,000 for student meal programs and taught in the classrooms that money paid for. Also coached students on career paths, the part they asked for most.

---

### Arizona Tamil School — Teaching Assistant
*10+ years*

Taught language and culture classes for a decade and coordinated the annual performances, from rehearsal scheduling through the night itself.
