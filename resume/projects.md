# Projects

## Avorio
*Native spaced repetition app — macOS, iOS, Android*
[In development]

### What it is
Avorio is a cross-platform flashcard app built around the FSRS-5 spaced repetition algorithm, designed to be both algorithmically rigorous and genuinely pleasant to use — filling the gap between Anki (powerful but dated) and Quizlet (polished but algorithmically weak).

### Features
- **FSRS-5 scheduling** — state-of-the-art SRS algorithm schedules reviews at optimal intervals
- **Offline-first** — all data and scheduling logic live on-device via embedded SQLite (WAL mode)
- **Gamification** — gems, streaks, and an in-app shop to sustain long-term study habits
- **AI card generation** — automated flashcard creation via Anthropic / OpenAI / Ollama
- **Social layer** — planned shared decks and community features
- **Multi-platform** — single shared codebase for macOS, iOS, and Android (Windows/Linux planned for v2)

### Architecture
The defining architectural decision is a **single Rust core** (`avorio-core`, `avorio-db`, `avorio-ffi`) shared across all platforms. All SRS logic, scheduling, imports, gamification state, and AI integration live in Rust. Platform UIs (SwiftUI on Apple, Compose on Android) are pure presentation layers that call through a UniFFI-generated `AvorioDatabase` facade — no algorithm reimplementation per platform.

| Layer | Technology |
|---|---|
| Shared business logic | Rust (`avorio-core`, `avorio-db`, `avorio-ffi`) |
| Cross-platform FFI | UniFFI (Mozilla) → Swift + Kotlin bindings |
| Database | rusqlite (bundled SQLite, WAL mode) |
| Apple UI | SwiftUI, macOS 14+ / iOS 17+ |
| Android UI | Jetpack Compose, minSdk 26 |
| AI features | Anthropic / OpenAI / Ollama via Supabase Edge Functions |
| Backend | Supabase (Postgres, Auth, Storage, Edge Functions / Deno) |
| Website | Next.js App Router (TypeScript) |

### Status
macOS + iOS: ~87% complete. Android in active development against the same Rust core.

---

## BioPath
*Drug interaction checker & compound body impact analysis*
[biopath.space](https://biopath.space)

### What it is
BioPath answers the question: *"I have this compound — what will it do to my body, and is it safe with what I'm already taking?"* It stitches together a dozen specialized scientific databases that each speak a different language, running the full resolution chain automatically from four real-world starting points: a drug name, a plant photo, a plant name, or a pill imprint.

### The problem it solves
Critical pharmacological data is fragmented across siloed databases — PubChem knows structures but not targets, ChEMBL knows targets but not pathways, Reactome knows pathways but not drugs, OpenFDA knows side effects but not plants. A pharmacologist mentally integrates these; BioPath does it automatically.

### How it works
```
input → resolve chemical identity
      → find protein binding targets (ChEMBL + ML prediction)
      → map biological pathways (Reactome)
      → score organ-level impact
      → check interactions, side effects, dosage, pregnancy safety (OpenFDA / RxNorm)
      → return unified BodyImpactReport
```

### ML layer (BioPathML)
For compounds with no measured data — obscure natural products, novel molecules — BioPathML predicts binding affinity across ~700 human proteins using a Morgan-fingerprint CNN / MPNN trained on BindingDB. The key insight: when an ML prediction agrees with a measured ChEMBL target, confidence is boosted; when they conflict, it's flagged. Tanimoto similarity (≥ 0.70) transfers side effects, pregnancy categories, and interaction risk from structurally analogous known drugs.

### Data sources integrated
PubChem · ChEMBL · Reactome · OpenFDA · RxNorm · PlantNet · Dr. Duke's Phytochemical Database

### Stack
| Layer | Technology |
|---|---|
| Backend | Python |
| Frontend | React |
| ML | Morgan fingerprint CNN / MPNN (BindingDB) |
| Hosting | biopath.space |
