# Projects

## Avorio
*Native spaced-repetition app — macOS and iOS shipped, Android in development*
[avorio.ai](https://avorio.ai) · [App Store](https://apps.apple.com)

### What it is
A cross-platform flashcard app built around the FSRS-5 spaced repetition algorithm, designed to be both algorithmically rigorous and genuinely pleasant to use — filling the gap between Anki (powerful but dated) and Quizlet (polished but algorithmically weak).

### Status
**Shipped.** Version 1.0 was approved for the App Store in July 2026; version 1.1 was approved and released the day it was submitted. The Mac app ships as a Developer ID-signed, notarized direct download with Sparkle auto-updates. Android (Jetpack Compose) is in active development against the same Rust core.

### Features
- **FSRS-5 and SM-2 scheduling** — switchable per deck without resetting progress
- **Personalized parameters** — Avorio replays your imported Anki review log to fit your own FSRS-5 parameters, above a 1,000-review floor where a fitted model would be worse than the default
- **Zero-loss Anki migration** — `.apkg`/`.colpkg` import preserving ease factors, intervals, lapses, review history, media, cloze, and image occlusion, with a diff report before anything commits. Export back to `.apkg` too
- **Offline-first** — data and scheduling live on-device via embedded SQLite (WAL mode); no network calls during a review session
- **AI layer** — managed gateway with server-held keys and free choice of model, plus free on-device paths through Apple Intelligence and Ollama: document-to-cards with generated diagrams, per-card explanations, and a tutor that reads a card's own scheduling signals
- **Gamification** — gems, streaks, an in-app shop, and a deep-focus mode that silences all of it mid-session without pausing the underlying progress
- **Localized** into eight languages beyond English

### Architecture
The defining decision is a **single Rust core** (`avorio-core`, `avorio-db`, `avorio-ffi`) shared across all platforms. All SRS logic, scheduling, imports, gamification state, and AI routing live in Rust. Platform UIs (SwiftUI on Apple, Compose on Android) are pure presentation layers calling through a UniFFI-generated facade — no algorithm reimplementation per platform.

| Layer | Technology |
|---|---|
| Shared business logic | Rust (`avorio-core`, `avorio-db`, `avorio-ffi`) |
| Cross-platform FFI | UniFFI (Mozilla) → Swift + Kotlin bindings |
| Database | rusqlite (bundled SQLite, WAL mode) |
| Apple UI | SwiftUI, macOS 14+ / iOS 17+ |
| Android UI | Jetpack Compose, minSdk 26 |
| AI features | Managed gateway; Apple Intelligence / Ollama on-device |
| Backend | Supabase (Postgres, Auth, Storage, Edge Functions / Deno) — 66 migrations, 12 edge functions |
| Payments | Stripe web checkout; RevenueCat / StoreKit, three tiers |
| Tests | ~1,079 Rust, 245 Swift, 160 Kotlin, gated in CI |

### Business model
The flashcard core is free forever on Mac and iPhone. Paid tiers (from $3.99/mo) cover the managed cloud-AI gateway and optional Mac↔iPhone sync. Every paid tier can pick any model; tiers differ by allowance, not capability.

---

## BioPath
*Drug interaction checker & compound body impact analysis*
[biopath.space](https://biopath.space)

### What it is
BioPath answers: *"I have this compound — what will it do to my body, and is it safe with what I'm already taking?"* It stitches together ten specialized scientific databases that each speak a different language, running the full resolution chain automatically from four starting points: a drug name, a plant photo, a plant name, or a pill imprint.

### The problem it solves
Critical pharmacological data is fragmented across siloed databases — PubChem knows structures but not targets, ChEMBL knows targets but not pathways, Reactome knows pathways but not drugs, OpenFDA knows side effects but not plants. A pharmacologist mentally integrates these; BioPath does it automatically.

### How it works
```
input → resolve chemical identity
      → find protein binding targets (ChEMBL + ML prediction)
      → map biological pathways (Reactome, 200+ pathways)
      → score organ-level impact
      → check interactions, side effects, dosage, pregnancy safety (OpenFDA / RxNorm)
      → return unified BodyImpactReport with provenance and confidence
```

### ML layer (BioPathML)
For compounds with no measured data — obscure natural products, novel molecules — BioPathML predicts binding affinity across ~700 human proteins using a Morgan-fingerprint CNN / MPNN trained on BindingDB. When an ML prediction agrees with a measured ChEMBL target, confidence is boosted; when they conflict, it's flagged rather than hidden. Tanimoto similarity (≥ 0.70) transfers side effects, pregnancy categories, and interaction risk from structurally analogous known drugs.

### Data sources integrated
PubChem · ChEMBL · Reactome · Open Targets · DGIdb · OpenFDA · RxNorm · PlantNet · Dr. Duke's Phytochemical Database

### Stack
| Layer | Technology |
|---|---|
| Backend | Python |
| Frontend | React |
| ML | Morgan fingerprint CNN / MPNN (BindingDB) |
| Hosting | biopath.space |

---

## Agent Bridge
*Desktop app that drives Claude Code, Codex, and Cursor from one shell*
[github.com/Cognifer-Labs/agent-bridge](https://github.com/Cognifer-Labs/agent-bridge)

Tauri + Rust + React. Each agent is spawned as a subprocess over the Agent Client Protocol (ACP), rendered through one accept/reject diff UI with zero per-agent branches.

- **Projection Engine** — one canonical config projects into each tool's native format (Claude JSON, Codex TOML, Cursor JSON) and round-trips back unchanged, verified by identity tests
- **Handoff Bridge** — captures a context snapshot and reconstructs an honest opening turn on agent switch, labelled "reconstructed, not resumed" rather than silently migrated
- **Cross-agent Profile Skill** — one authored `SKILL.md` runs natively inside each agent, emits schema-validated JSON, and merges confidence-weighted by data volume
- ~10,400 lines (5.6k Rust / 4.8k TypeScript) across a seven-crate Cargo workspace; 92 Rust and 25 Vitest tests

---

## Backglass
*Local-first commitment ledger · open source (MIT)*
[github.com/Cognifer-Labs/backglass](https://github.com/Cognifer-Labs/backglass)

A single-user Python + SQLite application that reads Gmail, Drive, Calendar, notes, iMessage, Slack, GitHub, and Canvas on a schedule and extracts typed records — what you owe, what's owed to you, deadlines, and goal checkpoints — each linked back to the source item it came from. It returns a 6 a.m. brief and a dashboard you keep open.

- **No chat interface, no vector database, no semantic search.** The queries are fixed and known in advance (what's due today, what's overdue, what's owed to me), so they're plain `WHERE` clauses over typed columns. The work happens once at ingest instead of repeatedly at query time.
- **Local-first, BYOK.** No hosted service and no account; extraction calls whichever model backend the user configures (own Anthropic/DeepInfra key, or free via an existing Claude subscription through the Claude Code CLI).
- **Two-tier triage-then-extract** under a hard monthly spend cap enforced in code, degrading to triage-only rather than silently overspending. Across 3,687 real iMessage items, a zero-cost pre-filter removed 10.9% of the volume with zero disagreement against the model verdicts it replaced; batching by character budget cut one workload from 308 model calls to 55 with identical verdicts.
- **Personal fact base served over MCP.** A `fact` table with a supersession history holds what is currently true about the owner; a read-only MCP server exposes it to other AI agent sessions.
- 184 Python modules, 18 source connectors, 147 test files (3,281 test functions), 47 SQL migrations; more than 16,000 source items ingested. FastAPI + Jinja2 + HTMX dashboard, no frontend framework. *(Counts from `git ls-files` on main, 2026-09-25.)*

---

## Tradgent
*Personal investing companion with a fenced paper-trading lane · private repo (Cognifer-Labs)*

A companion that tracks contributions, allocation drift against rebalance bands, tax lots, wash sales, and dividend windows — and places no trades from its core: there is no broker write path there, and a test enforces it.

- **Fenced signals lane.** Consumes news wires, SEC/EDGAR filings, Federal Reserve / Federal Register / Treasury feeds, GDELT, and daily bars; scores every headline; compiles a weighted 0–100 rating per instrument; sizes and submits orders to Alpaca's **paper** endpoint only, dry by default, on a launchd schedule. News can only shrink an allocation, never enlarge or forecast one.
- **Money is never a float.** `Decimal` in Python, `INTEGER` cents in SQLite; the database has no `REAL` column and a trigger rejects one.
- **Risk, not return.** Estimates concentration and correlation (e.g. how many independent bets a set of funds really is) and forecasts nothing.
- 66 Python modules, 89 test files (2,330 test functions), 184 commits since 2026-08-24. *(Counts from `git ls-files`, 2026-09-25.)*

---

## Misinformation contagion simulators
*Agent-based models of claim spread through a synthetic Phoenix*
[misinformation-simulation-aoa](https://github.com/contactdharsan-blip/misinformation-simulation-aoa) (C++) · [Misinformation-simulator-](https://github.com/contactdharsan-blip/Misinformation-simulator-) (Python)

Two models of how a misinformation claim competes against a true claim in a social network.

**C++ / SFML build.** 10,000 agents in a single Phoenix district over 690 timesteps, on an **SEDPNR** state model (Susceptible, Exposed, Doubtful, Propagating, Not-Spreading, Recovered). Exposure probability is weighted by demographic homophily — shared school hub, workplace, age group, ethnicity — with tunable weights. False claims carry a 6× transmission multiplier, matching the falsehood-spread advantage Vosoughi, Roy, and Aral measured in *Science* (2018). Ships a live SFML visualizer and writes per-timestep state counts plus spatial data to CSV, with a Python script for demographic-cluster analysis.

**Python build.** Adds a dual-process cognitive layer — System 1 / System 2 reasoning with identity-threat detection — and demographically biased media diets, so adoption depends on who the agent is rather than only on how many neighbours already believe the claim. SEDPNR parameters calibrated against a 2024 *Nature* study.

> Note: the demographic calibration ("Phoenix 2024 estimates") and several parameter citations (Sunstein 2001, Centola 2010, Lewandowsky 2012, Daley–Kendall) exist as inline code comments only — there is no bibliography file in either repo. Worth adding before citing this work formally.
