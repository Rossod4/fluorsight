# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Fluorsight** — a decision-support prototype for PFAS water screening. It triages which
water sources, sites, and samples warrant expensive confirmatory lab analysis (LC-MS/MS),
so teams can screen broadly and reserve the lab for samples that matter. It is a screening
and triage tool, not a laboratory replacement.

Built for a university innovation competition. All organisations, sites, and people in the
demo data are fictional. No backend — state lives in `localStorage`.

The local checkout may still sit in a folder named `AEGIS` (a former name); the product is
Fluorsight everywhere in the code, copy and on GitHub.

## Commands

Requires Node 20+ (CI and Netlify build on Node 22).

```bash
npm install
npm run dev        # Vite dev server
npm test           # Vitest unit tests (riskEngine, validation)
npm run typecheck  # tsc --noEmit
npm run build      # production build to dist/
npm run preview    # serve the built output
```

There is no lint script and no test-watch script. `npm test` runs `vitest run` once.

## Architecture

Vite · React 19 · TypeScript (strict) · Tailwind CSS v4 · React Router (HashRouter) ·
Recharts · Leaflet.

**Routing.** `HashRouter` with `base: './'` in `vite.config.ts`, so every route is `/#/…`
and the server only ever serves the index. This is why `netlify.toml` deliberately has no
SPA catch-all redirect. If routing ever moves to `BrowserRouter`, that redirect becomes
mandatory or every deep link 404s.

`src/App.tsx` defines two route trees: public pages under `PublicLayout` (`/`, `/demo`,
`/why`) and the app under `AppLayout` (`/app/…`). `Why`, `Dashboard`, `MapView`, and
`Validation` are lazy-loaded to keep Recharts and Leaflet off the landing-page bundle.

**State.** `src/store/AppStore.tsx` — a single React context + reducer, persisted to
`localStorage` under the key `fluorsight:v2` and seeded from `src/data/seed.ts` on first
load. The seed uses a deterministic PRNG so every reset produces the same demo. When the
shape of persisted `Settings` changes, **bump the storage key** rather than writing a
migration; stale state is discarded on purpose because it is demo data.

**Domain model** (`src/types.ts`): projects → sites → samples → screenings. A sample may
also carry a `labResult`. Risk assessments are computed on demand, never stored.

**Pure library modules** — no UI or storage dependencies, so they stay unit-testable and
swappable:

- `src/lib/riskEngine.ts` — the transparent weighted 0–100 scoring model, plus
  `DEFAULT_SETTINGS`. `assessRisk()` returns every contributing driver by name, so a
  recommendation is always explainable.
- `src/lib/validation.ts` — retrospective back-test, threshold sweep, weight sensitivity.
- `src/lib/economics.ts` — the cost and pricing constants behind the business case.
- `src/lib/csv.ts` — CSV export and screening-batch import, no external dependency.
- `src/lib/labels.ts` — shared display labels and Tailwind badge classes.

`src/components/ui.tsx` holds shared primitives (`Card`, `PageHeader`, `RiskBadge`, …).
Compose these rather than re-styling raw elements.

Tailwind v4 is wired through the `@tailwindcss/vite` plugin; there is **no
`tailwind.config.js`**. Theme tokens live in the `@theme` block at the top of
`src/index.css`.

## Working on the risk model

The weights in `DEFAULT_SETTINGS` total exactly 100 and are a hand-tuned expert prior, not
a calibrated model. Two invariants are load-bearing and were arrived at deliberately:

- **`screeningEvidence` scores the fluorescence signal and the estimated concentration
  band as one weight, taking the stronger of the two, never both.** They are the same
  measurement expressed twice — the operator reads a response and bins it. Scoring them
  separately double-counted one reading.
- **Uncertainty never relaxes a recommendation.** A low-confidence screen with a
  non-trivial signal is raised from `no_action` to `monitor`, and the reason is surfaced
  in `uncertaintyNote`.

Weights and thresholds are user-editable at runtime in Settings, and every sample
re-scores instantly. Changing defaults changes figures quoted elsewhere — see below.

## Factual accuracy

This project was audited for fabricated or unsourced claims in August 2026 (the audit lives in
the private `fluorsight-internal` repository), and the correction discipline matters more here
than in a typical prototype:

- Cost and market figures belong in `src/lib/economics.ts`, defined once so the app and
  the pitch cannot drift apart. Read the comments before changing a constant — several
  record the scope limits of their source (e.g. the published £350 UK benchmark is for
  **soil**, not water, and cannot be used to call the £250 water assumption conservative).
- Anything quoted from the demo, on the site or in competition materials, must match
  `docs/verified-demo-figures.md`, which is computed from the seed data and the engine.
  **Recompute it if the seed data or the default weights change.**
- Do not introduce a claim you cannot source, and do not describe a modelled figure as
  measured.

## Competition materials

The A0 poster, the oral deck and its script, outreach drafts, team briefs and the Q&A
rehearsal bank are **not in this repository**. They live in the private
`Rossod4/fluorsight-internal` repository, moved there when this one went public. Keep it
that way: nothing that is not part of the product or its sourced evidence belongs here.

## Deployment

The live site is **https://fluorsight.co.uk**, built and hosted by Netlify from this
repository on every push to `main` (`netlify.toml`: `npm run build` → `dist`).
`.github/workflows/ci.yml` runs typecheck, tests and a production build on every push and
pull request; it does not deploy.
