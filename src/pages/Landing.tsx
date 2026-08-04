import { Link } from 'react-router-dom';
import { Card, StatCard, Disclaimer } from '../components/ui';

const PROBLEM_STATS: { label: string; value: string; detail: string }[] = [
  {
    label: 'Cost per lab sample',
    value: '€175–300',
    detail:
      'Accredited LC-MS/MS analysis. EU published list prices, excl. VAT, plus a €97 per-order service fee (drinking/natural water €175, wastewater €300). No UK laboratory we approached publishes a rate card. Source: Measurlabs product pages, 2025.',
  },
  {
    label: 'Typical turnaround',
    value: '2–3 weeks',
    detail:
      'From the laboratory receiving the sample to an accredited result, before any remediation decision can be made. Source: Measurlabs; SOCOTEC UK quotes 10–15 working days.',
  },
  {
    label: 'Potential PFAS source sites',
    value: '40,000+',
    detail:
      'Mapped in England by the Environment Agency’s PFAS risk-screening work, of which 2,900–10,200 are modelled as high-risk depending on the score threshold. Source: Jacobs U.K. Ltd for the Environment Agency, Phase 4 WP4, July 2023.',
  },
  {
    label: 'EA investigation budget gap',
    value: '£1.8–2.7m vs £300k',
    detail:
      'Estimated cost to investigate just 4 known PFAS sites, against the Environment Agency’s contaminated land budget of £300k plus £200k from a chemicals funding stream, as quoted by the EA in October 2024. This is the contaminated land programme line, not the EA’s total budget. Source: The Guardian / Watershed Investigations.',
  },
];

const STEPS = [
  {
    n: '1',
    title: 'Screen broadly',
    body: 'Run a rapid, low-cost fluorescence screen in the field or site office — no lab, no weeks-long wait.',
  },
  {
    n: '2',
    title: 'Prioritise with a transparent score',
    body: 'Screening signal plus contextual site risk factors (firefighting-foam use, landfill proximity, prior detections) combine into an explainable 0–100 risk score and band.',
  },
  {
    n: '3',
    title: 'Confirm selectively',
    body: 'Only samples that clear the risk threshold are sent for accredited LC-MS/MS lab confirmation — reserving the expensive step for what actually matters.',
  },
  {
    n: '4',
    title: 'Track & audit',
    body: 'Every sample keeps a full status history and audit trail, exportable to CSV for reporting and regulatory conversations.',
  },
];

const AUDIENCES = [
  {
    tag: 'Primary customer',
    title: 'Environmental consultancies',
    body: 'Commissioned to run PFAS investigations at volume under planning and Part 2A duties, and commercially motivated to cut lab spend without cutting corners on due diligence.',
  },
  {
    tag: 'Strategic second wave',
    title: 'UK local authorities',
    body: 'Hold statutory Part 2A duties to identify contaminated land, face acute budget constraints, and will receive the Environment Agency’s GIS PFAS prioritisation map by end of 2026 — a flood of sites that will need cheap, defensible triage.',
  },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-teal-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold tracking-wide text-teal-800 uppercase">
            PFAS screening decision support
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Screen broadly. Prioritise intelligently.
            <span className="block text-teal-700">Reserve the lab for what matters.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Fluorsight triages PFAS (&ldquo;forever chemical&rdquo;) screening so that expensive, accredited
            lab tests are directed only at the samples and sites with the highest estimated risk
            &mdash; turning thousands of possible sites into a short, defensible, budget-fit priority
            list.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800"
            >
              Open the live dashboard
            </Link>
            <Link
              to="/why"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-50"
            >
              See the business case
            </Link>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          PFAS monitoring at scale is slow and expensive
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          New EU Drinking Water Directive PFAS limits took effect on 12 January 2026, and the UK
          government&rsquo;s February 2026 PFAS Plan is pushing toward a statutory UK limit and a
          national site-prioritisation map. Regulators, water companies, consultancies and councils
          all face the same bottleneck: there are far more sites that <em>might</em> be contaminated
          than there is budget to lab-test.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEM_STATS.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} detail={s.detail} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How Fluorsight works</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            A four-step workflow that puts an explainable risk score between raw field data and any
            decision to spend money on a lab.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <Card key={s.n} className="p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The science */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">The science, honestly framed</h2>
        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm leading-relaxed text-slate-600">
              Fluorsight&rsquo;s reference screening approach pairs a fluorescent probe (2,6-ANS, a
              well-established hydrophobic-cavity dye used in biochemistry for 50+ years) with a
              PFAS-selective &beta;-cyclodextrin adsorbent in the style of Cyclopure&rsquo;s DEXSORB+
              material. As PFAS bind the adsorbent, the fluorescence signal shifts in a way that can
              be read out rapidly and cheaply, without shipping a sample to a lab. The isomer matters:
              2,6-ANS binds &beta;-cyclodextrin far more strongly than the more familiar 1,8-ANS
              (K = 80&ndash;11,700 M&#8315;&sup1; against 50&ndash;195 M&#8315;&sup1;
              &mdash;{' '}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/23786974/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
              >
                Sueishi et al., 2013
              </a>
              ), and a 2026 study using both isomers found 2,6-ANS binds most strongly to
              &beta;-cyclodextrin while 1,8-ANS prefers &gamma; (
              <a
                href="https://doi.org/10.1007/s10847-026-01361-0"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
              >
                J. Incl. Phenom. Macrocycl. Chem., 2026
              </a>
              ). Our probe and host are matched deliberately.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Fluorsight builds on the peer-reviewed principle of cyclodextrin host&ndash;dye displacement
              fluorescence sensing for PFAS &mdash; a validated academic sensor-array approach with a
              detection limit around 31&ndash;38 ng/L for PFOS/PFOA (
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S0003267025010748"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
              >
                ScienceDirect, 2025
              </a>
              ). No published study has used 2,6-ANS specifically for PFAS, so Fluorsight is honest that
              it is extending a validated chemistry principle, not citing a pre-existing ANS-PFAS
              paper. The underlying sensor is a modular, swappable component: any equivalent
              screening method (fluorescence, electrochemical, colourimetric) can sit behind the same
              risk-scoring and triage layer.
            </p>
          </div>
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase">Important limitation</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Accredited LC-MS/MS lab methods (EPA 537.1 / 533) detect PFAS down to roughly
              0.7&ndash;16 parts per trillion &mdash; around <strong>1,000&times; more sensitive</strong>{' '}
              than most fluorescence field screens. Fluorsight screening is a triage signal, not a
              replacement for laboratory confirmation, and is never used for regulatory compliance
              reporting.
            </p>
          </Card>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Who it&rsquo;s for</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {AUDIENCES.map((a) => (
              <Card key={a.title} className="p-6">
                <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">{a.tag}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Card className="flex flex-col items-center gap-4 bg-gradient-to-br from-teal-700 to-teal-800 p-10 text-center !border-teal-800">
          <h2 className="text-2xl font-semibold text-white">See Fluorsight triage a portfolio of sites</h2>
          <p className="max-w-xl text-sm text-teal-50">
            Explore the live decision-support dashboard, or read the full business case behind
            Fluorsight.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-teal-800 shadow-sm transition-colors hover:bg-teal-50"
            >
              Open the live dashboard
            </Link>
            <Link
              to="/why"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-900/40 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-teal-100/40 transition-colors hover:bg-teal-900/60"
            >
              See the business case
            </Link>
          </div>
        </Card>
        <div className="mt-8">
          <Disclaimer />
        </div>
      </section>
    </div>
  );
}
