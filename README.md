# Fluorsight

**Decision support for PFAS water screening.** Fluorsight ranks water sources, sites and
samples by how likely they are to need expensive confirmatory laboratory analysis
(LC-MS/MS), so an environmental team can screen broadly with cheap field methods and
reserve the lab for the samples that matter.

Live site: **https://fluorsight.co.uk**

Built by a University of Bristol student team (chemistry, aerospace engineering and
mathematics) for the 2026 Aegis Innovation Competition. Every organisation, site and
sample in the demo is fictional. Fluorsight is a screening and triage tool, not a
laboratory replacement: screening estimates are treated as uncertain, and every
recommendation shows the factors that produced it.

## What it does

- **Explainable risk scoring.** Each sample gets a 0 to 100 score from a transparent
  weighted model over site history, land use, hydrology, screening evidence and
  measurement confidence. The score comes with a driver-by-driver breakdown, so a
  recommendation is never a black box.
- **Escalation queue.** Samples above the escalation threshold land in a lab queue,
  ordered by score, with the reason alongside.
- **Projects, sites, samples.** The working structure an environmental consultancy
  actually uses, with a risk-coloured map view.
- **Batch import and export.** Upload a CSV of field readings and watch them score,
  band and queue live; export any view back to CSV.
- **Tunable model.** Weights and thresholds are editable in Settings and every sample
  re-scores instantly. Uncertainty can raise a recommendation but never relax one.
- **Validation page.** A retrospective back-test of the model against known lab results,
  a threshold sweep, and a weight-sensitivity analysis.
- **Business case.** The "Why Fluorsight" page carries a sourced case covering UK and EU
  regulation, laboratory costs, market sizing and go-to-market. Sources and their
  verification status are in [`docs/research-2026-08.md`](docs/research-2026-08.md);
  the figures quoted from the demo are reproduced in
  [`docs/verified-demo-figures.md`](docs/verified-demo-figures.md); the financial model
  is [`docs/fluorsight-model.xlsx`](docs/fluorsight-model.xlsx).

## Try it

1. Open https://fluorsight.co.uk and go to **Demo** or **Open the app**.
2. On **Import data**, download `mock-screening-results.csv` and upload it to see a batch
   of readings scored and queued.
3. Open any sample to see which factors drove its score and recommended action.
4. Change a weight in **Settings** and watch the queue reorder.

## How the risk model works

The model lives in [`src/lib/riskEngine.ts`](src/lib/riskEngine.ts) and is deliberately a
pure function with no UI or storage dependencies, so it can be unit-tested on its own and
swapped for a calibrated or learned model later without touching the rest of the app.
Two design rules are worth knowing:

- The fluorescence signal and the estimated concentration band are the same measurement
  expressed twice, so they share one weight and the stronger of the two counts, never both.
- A low-confidence screen with a non-trivial signal is raised from "no action" to
  "monitor", and the note says why. Uncertainty never lowers a recommendation.

The default weights are a hand-set expert prior, not a calibrated model. That is stated in
the app and is the main limitation of a prototype with no field data of its own.

## Tech stack

Vite, React 19, TypeScript (strict), Tailwind CSS v4, React Router (hash routing),
Recharts, Leaflet. State is a single React context persisted to `localStorage` and seeded
from a deterministic demo dataset. There is no backend.

```
src/
  lib/          pure modules: riskEngine, validation, economics, csv, quickScreen, labels
  store/        AppStore: context + reducer, localStorage persistence, seed loading
  pages/        public pages (Landing, Why, Demo, QuickScreen) and the app under /app
  components/   layouts and shared UI primitives
  data/         deterministic seed dataset
docs/           research references, verified demo figures, financial model
```

## Develop

Requires Node 20 or later. CI runs on Node 22.

```bash
npm install
npm run dev        # dev server
npm test           # 44 unit tests over the risk engine, validation and quick screen
npm run typecheck  # tsc --noEmit
npm run build      # production build to dist/
```

Continuous integration runs typecheck, tests and a production build on every push.

## Deployment

Netlify builds `dist/` from this repository on every push to `main`; see
[`netlify.toml`](netlify.toml). Because the app uses hash routing, the server only ever
serves the index and no SPA redirect rule is needed.

## How this was built

The app was built with Claude Code, an AI coding assistant, working from the team's
product decisions, chemistry input and business research. The team set the scoring
model's structure and rules, wrote and verified the research, and reviewed each change;
the assistant wrote most of the code. Claims in the site copy were audited against
primary sources in August 2026, and the constants behind cost and market figures are
defined once in [`src/lib/economics.ts`](src/lib/economics.ts) with their sources noted.

## License

MIT. See [`LICENSE`](LICENSE).
