# Aegis — PFAS Screening Decision Support

Aegis is a decision-support platform for **scalable PFAS screening**. It helps
environmental teams triage which water sources, sites, and samples are most
likely to require expensive confirmatory laboratory analysis (LC-MS/MS) — so
organisations can **screen broadly, prioritise intelligently, and reserve the
lab for the samples that matter**.

Aegis is a **screening and triage tool, not a laboratory replacement**.
Screening estimates are treated as uncertain, and every risk recommendation is
fully explainable.

Built as a prototype for a university innovation competition. All organisations,
sites, and data in the demo are fictional.

## What's inside

- **Landing + "Why Aegis" pages** — the product story and a sourced business
  case (UK/EU regulation, lab costs, market sizing, go-to-market, projections).
  Research and citations live in [`docs/research-factsheet.md`](docs/research-factsheet.md).
- **Interactive dashboard** (`/app`) — projects → sites → samples workflow,
  transparent 0–100 risk scoring with a driver-by-driver explanation, a lab
  escalation queue, a risk-coloured map, batch CSV import, CSV export, and
  editable model weights/thresholds.
- **Risk engine** ([`src/lib/riskEngine.ts`](src/lib/riskEngine.ts)) — a pure,
  unit-tested, transparent weighted model. Deliberately modular so the screening
  chemistry/sensor model can be swapped or upgraded (e.g. an ML model) later
  without touching the rest of the app.

## Tech stack

Vite · React · TypeScript · Tailwind CSS · React Router (hash routing) ·
Recharts · Leaflet. State is held in React context and persisted to
`localStorage`, seeded from a demo dataset (reset any time from **Settings**).
No backend.

## Develop

Requires Node 20+.

```bash
npm install
npm run dev        # start the dev server
npm test           # risk-engine unit tests (Vitest)
npm run typecheck  # tsc --noEmit
npm run build      # production build to dist/
```

## Demo tips

- **CSV import demo:** on the **Import data** page, download
  `mock-screening-results.csv`, then upload it to watch a batch of new field
  readings get scored, banded, and pushed into the escalation queue live.
- **Explainability:** open any sample to see exactly which factors drove its
  risk score and recommended action.
- **Tune the model:** change weights/thresholds in **Settings** and every sample
  re-scores instantly.

## Deployment

Pushing to `main` builds and deploys to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The app uses a
relative base and hash routing, so it works from any Pages subpath with no
server configuration.
