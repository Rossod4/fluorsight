# Fluorsight

**Decision support for PFAS water screening.** Fluorsight ranks water sources, sites and
samples by how likely they are to need expensive confirmatory lab analysis (LC-MS/MS), so
an environmental team can screen broadly with cheap field methods and only send the
samples that matter to the lab.

Live site: **https://fluorsight.co.uk**

We built it as a University of Bristol student team (chemistry, aerospace engineering and
mathematics) for the 2026 Aegis Innovation Competition. Every organisation, site and
sample in the demo is made up. Fluorsight is a screening and triage tool, not a lab
replacement: screening estimates are treated as uncertain, and every recommendation shows
the factors behind it.

## What it does

- **Explainable risk scoring.** Each sample gets a 0 to 100 score from a transparent
  weighted model over site history, land use, hydrology, screening evidence and
  measurement confidence, with a driver-by-driver breakdown so you can see exactly why.
- **Escalation queue.** Samples above the escalation threshold go into a lab queue,
  ordered by score, with the reason next to each one.
- **Projects, sites, samples.** The structure an environmental consultancy actually works
  in, with a risk-coloured map view.
- **Batch import and export.** Upload a CSV of field readings and watch them get scored,
  banded and queued live; export any view back to CSV.
- **Tunable model.** Weights and thresholds are editable in Settings and every sample
  re-scores instantly. Uncertainty can raise a recommendation but never relax one.
- **Validation page.** A retrospective back-test of the model against known lab results,
  a threshold sweep, and a weight-sensitivity analysis.
- **Business case.** The "Why Fluorsight" page sets out the case: UK and EU regulation,
  lab costs, market size and go-to-market. Sources and how far each was verified are in
  [`docs/research-2026-08.md`](docs/research-2026-08.md); the figures quoted from the
  demo are reproduced in [`docs/verified-demo-figures.md`](docs/verified-demo-figures.md);
  the financial model is [`docs/fluorsight-model.xlsx`](docs/fluorsight-model.xlsx).

## Try it

1. Open https://fluorsight.co.uk and go to **Demo** or **Open the app**.
2. On **Import data**, download `mock-screening-results.csv` and upload it to see a batch
   of readings scored and queued.
3. Open any sample to see which factors drove its score and recommended action.
4. Change a weight in **Settings** and watch the queue reorder.

## How the risk model works

The model is [`src/lib/riskEngine.ts`](src/lib/riskEngine.ts). It's a pure function with
no UI or storage dependencies, so it can be unit-tested on its own and swapped for a
calibrated or learned model later without touching the rest of the app. Two rules in it
are deliberate:

- The fluorescence signal and the estimated concentration band are the same measurement
  read twice, so they share one weight and only the stronger of the two counts.
- A low-confidence screen with a non-trivial signal gets raised from "no action" to
  "monitor", and the note says why. Uncertainty never lowers a recommendation.

The default weights are a hand-set expert prior, not a calibrated model. The app says so.
That's the main limitation of a prototype with no field data of its own.

## Tech stack

Vite, React 19, TypeScript (strict), Tailwind CSS v4, React Router (hash routing),
Recharts, Leaflet. State is a single React context persisted to `localStorage` and seeded
from a deterministic demo dataset. No backend.

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

Needs Node 20 or later. CI runs on Node 22.

```bash
npm install
npm run dev        # dev server
npm test           # 44 unit tests over the risk engine, validation and quick screen
npm run typecheck  # tsc --noEmit
npm run build      # production build to dist/
```

CI runs typecheck, tests and a production build on every push.

## Deployment

Netlify builds `dist/` from this repository on every push to `main`; see
[`netlify.toml`](netlify.toml). The app uses hash routing, so the server only ever serves
the index and there's no SPA redirect rule.

## How we built it

Most of the code was written with [Claude Code](https://claude.com/claude-code), working
from our product decisions, the chemistry, and the business research. We set the scoring
model's structure and rules, did and checked the research, and reviewed each change as it
went in. In August 2026 we audited every claim in the site copy against primary sources,
and the cost and market constants now live in one place,
[`src/lib/economics.ts`](src/lib/economics.ts), with their sources noted, so the app and
the pitch can't drift apart.

MIT licence, see [`LICENSE`](LICENSE).
