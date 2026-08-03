import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, PageHeader, StatCard } from '../components/ui';
import {
  AEGIS_ANNUAL_COST_GBP,
  ALL_LAB_COST_GBP,
  CONSUMABLES_ANNUAL_GBP,
  CONSUMABLE_COST_PER_SAMPLE_GBP,
  ESCALATED_SAMPLES,
  ESCALATION_RATE_RANGE,
  INDICATIVE_LAB_COST_GBP,
  LAB_SAMPLES_AVOIDED,
  MODELLED_ANNUAL_SAVING_GBP,
  MODELLED_COST_REDUCTION,
  MODELLED_ESCALATION_RATE,
  MODELLED_PORTFOLIO_SAMPLES,
  SUBSCRIPTION_PROGRAMME_GBP,
  SUBSCRIPTION_STANDARD_GBP,
  TRIAGED_LAB_COST_GBP,
  TRIAGED_TOTAL_COST_GBP,
  UK_PUBLISHED_SOIL_LAB_COST_GBP,
  gbp,
  savingAtEscalationRate,
} from '../lib/economics';

// ---------------------------------------------------------------------------
// Data — every figure below is either a directly-cited public statistic
// (see the Sources section) or an explicitly-labelled illustrative model.
// ---------------------------------------------------------------------------

interface Milestone {
  date: string;
  title: string;
  body: string;
  sourceHref: string;
  sourceLabel: string;
}

const MILESTONES: Milestone[] = [
  {
    date: 'March 2025',
    title: 'UK DWI revises PFAS guidance',
    body:
      'The Drinking Water Inspectorate issues a 0.1 µg/L wholesomeness/reporting guideline covering 48 named PFAS (broader than the EU list), with a tiered monitoring system. Currently non-statutory guidance for England & Wales.',
    sourceHref: 'https://www.dwi.gov.uk/pfas-and-forever-chemicals/',
    sourceLabel: 'DWI PFAS guidance',
  },
  {
    date: '12 Jan 2026',
    title: 'EU Drinking Water Directive PFAS limits in force',
    body:
      'Directive (EU) 2020/2184’s PFAS parametric values — 0.10 µg/L "Sum of PFAS" (20 named substances) and 0.50 µg/L "PFAS Total" — must be complied with from this date. Member States may apply either one or both of the two parameters, and monitoring is risk-triggered rather than universal at every supply.',
    sourceHref: 'https://environment.ec.europa.eu/news/new-eu-rules-limit-pfas-drinking-water-2026-01-12_en',
    sourceLabel: 'European Commission, 12 Jan 2026',
  },
  {
    date: '3 Feb 2026',
    title: 'Defra publishes the UK PFAS Plan',
    body:
      'The UK’s first national PFAS strategy: understand sources, tackle spread, reduce exposure. Commits to a 2026 consultation on a statutory drinking-water limit, an EA site-prioritisation map for public bodies, and updated advice for councils on managing PFAS-contaminated land under Part 2A.',
    sourceHref: 'https://www.gov.uk/government/publications/pfas-plan/pfas-plan-building-a-safer-future-together',
    sourceLabel: 'GOV.UK PFAS Plan',
  },
  {
    date: 'Mar 2026',
    title: 'EU REACH restriction advances',
    body:
      'ECHA’s RAC issues a final opinion (2 Mar) and SEAC a draft opinion (10 Mar) on a broad PFAS-as-a-class restriction covering an estimated 10,000+ substances.',
    sourceHref: 'https://www.arnoldporter.com/en/perspectives/advisories/2026/03/echa-committees-advance-broad-pfas-restriction-under-reach',
    sourceLabel: 'Arnold & Porter',
  },
  {
    date: '2026 (in progress)',
    title: 'Consultation on a statutory UK limit',
    body:
      'Government commits to consult during 2026 on introducing a statutory PFAS limit into England’s public water supply regulations (PFAS Plan Action 3.6). Today there is only a DWI guideline value of 0.1 µg/L, above which water companies must report a water quality event and act to reduce concentrations. The consultation does not commit to setting the statutory limit at that value.',
    sourceHref: 'https://www.gov.uk/government/publications/pfas-plan/pfas-plan-building-a-safer-future-together',
    sourceLabel: 'GOV.UK PFAS Plan',
  },
  {
    date: 'End of 2026',
    title: 'EA prioritisation map reaches every council',
    body:
      'The Environment Agency’s GIS-based PFAS Prioritisation Map — risk-scoring 40,000+ mapped sites in England — is made available to all public sector bodies, including local authorities. Defra additionally plans to develop an interactive website by Q3 2027, though its own narrative text says only that this will be "explored" by the end of 2027. No public-access date has been committed.',
    sourceHref: 'https://www.gov.uk/government/publications/pfas-plan/pfas-plan-building-a-safer-future-together',
    sourceLabel: 'GOV.UK PFAS Plan, Action 1.2',
  },
  {
    date: '2027 (expected)',
    title: 'Technical guidance on legacy PFAS; REACH restriction likely finalised',
    body:
      'Defra’s PFAS Plan commits to technical guidance on legacy PFAS contamination by 2027 (action 3.16). The earlier commitment — updated information and advice to help councils manage such land under Part 2A (action 3.15) — carries no delivery date, only "engagement with local authorities as required", and is not a rewrite of the statutory guidance. Separately, the EU REACH class restriction is expected to reach the Commission, with adoption unlikely before 2027.',
    sourceHref: 'https://www.gov.uk/government/publications/pfas-plan/pfas-plan-building-a-safer-future-together',
    sourceLabel: 'GOV.UK PFAS Plan, actions 3.15–3.16',
  },
];

const COST_DATA = [
  { scenario: 'Test everything in the lab', labCost: ALL_LAB_COST_GBP, platformCost: 0 },
  { scenario: 'Aegis-triaged', labCost: TRIAGED_LAB_COST_GBP, platformCost: AEGIS_ANNUAL_COST_GBP },
];

const MARKET_DATA = [
  { year: 2026, value: 439 },
  { year: 2027, value: 489 },
  { year: 2028, value: 545 },
  { year: 2029, value: 607 },
  { year: 2030, value: 676 },
  { year: 2031, value: 752 },
  { year: 2032, value: 838 },
  { year: 2033, value: 933 },
  { year: 2034, value: 1037 },
];

const PROJECTION_DATA = [
  { year: 'Year 1', consultancyArr: 15000, councilArr: 0, consultancies: 3, councils: 0 },
  { year: 'Year 2', consultancyArr: 75000, councilArr: 75000, consultancies: 15, councils: 5 },
  { year: 'Year 3', consultancyArr: 200000, councilArr: 375000, consultancies: 40, councils: 25 },
];

const COMPETITORS: { name: string; approach: string; realTime: string; commercial: string; note: string }[] = [
  {
    name: 'Cyclopure',
    approach:
      'DEXSORB® extraction disc mailed to Cyclopure’s own HPLC-MS/MS lab (55 PFAS incl. all 40 EPA 1633 compounds, LOQ 1.0 ppt), $85/kit, 10–14 business days of lab processing after the kit arrives back',
    realTime: 'No — lab turnaround',
    commercial: 'Yes — direct from the US',
    note: 'A finished lab result, not a workflow: no risk scoring, no site prioritisation, no audit trail. International orders accepted on request at the customer’s expense, but the UK is not a named market and there is no UK lab or UK pricing.',
  },
  {
    name: 'FREDsense',
    approach: 'Portable electrochemical biosensor field kit for PFAS, result in ~3–4 hours',
    realTime: 'Same-day, on-site',
    commercial: 'Yes — sold via contact-sales',
    note: 'A detection company, not a workflow one: they pair the field kit with their own LC-MS/MS confirmation lab, but publish no risk-scoring, site-prioritisation or case-management layer. Aegis is method-agnostic and can sit behind any screening chemistry, including theirs.',
  },
  {
    name: 'Academic fluorescence sensor arrays',
    approach:
      'Cyclodextrin host–dye displacement, LOD 31–38 ng/L for PFOS/PFOA (Zha et al. 2025, Anal. Chim. Acta 1377, 344680)',
    realTime: 'Lab prototype',
    commercial: 'No',
    note: 'Validates the general principle Aegis builds on — cyclodextrin host–dye competitive displacement at ng/L levels — but with a four-dye array (NPN, AFR, CC, PR) plus a trained classifier, not our single 2,6-ANS probe, which has not been published for PFAS. No product, workflow or UK market presence. Their array approach is the basis of our proposed selectivity roadmap.',
  },
  {
    name: 'ESdat / EQuIS / Locus EIM',
    approach:
      'Environmental data management: ingest lab results, compare against configured regulatory limits, flag exceedances, report. ESdat additionally ships pre-loaded UK guideline values; EQuIS and Locus require the user to define limits.',
    realTime: 'Post-lab',
    commercial: 'ESdat and EQuIS established in the UK; Locus is US-based',
    note: 'The closest real competitors. All three include sample-planning and chain-of-custody modules, so they do touch the pre-lab workflow — but their planning is schedule- and template-driven, not risk-driven. None uses field screening data to rank which collected samples are worth paying to analyse. We expect to sit alongside these, not replace them.',
  },
  {
    name: 'EA PFAS Risk Screening Programme',
    approach:
      'National GIS risk-scoring of 40,000+ mapped sites in England; prioritisation map to reach all public sector bodies by end-2026. A dedicated interactive website is only being "explored" by end-2027.',
    realTime: 'Desk-based',
    commercial: 'Provided to public bodies (cost not stated)',
    note: 'Ranks sites to allocate regulatory attention — it tells a council where to look. It does not tell an investigator standing on a site which of their samples to pay to analyse. It generates our pipeline rather than competing with us. No public-access date has been committed.',
  },
];

const RISKS: string[] = [
  'Screening sensitivity is roughly 1–2 orders of magnitude below accredited LC-MS/MS — published cyclodextrin fluorescence arrays report LODs of 31–38 ng/L against accredited reporting levels of about 0.5–20 ng/L — so screening estimates carry real uncertainty and are never used for regulatory compliance reporting.',
  'The specific sensor chemistry (2,6-ANS with a β-cyclodextrin adsorbent, applied to PFAS) has not itself been peer-reviewed. The probe–host pairing is well characterised in the binding literature and a 2026 study confirms 2,6-ANS binds β-cyclodextrin most strongly of the native hosts, but no published work applies it to PFAS. Aegis treats the sensor as a modular, swappable component while validation of this exact combination matures.',
  'The UK statutory PFAS limit and the Environment Agency’s prioritisation map are both still pending (2026 consultation; map due end-2026) — the regulatory tailwind is real but not yet fully crystallised.',
  'Local-authority procurement is slow and fragmented across roughly 290 separate Part 2A enforcing authorities in England (district and unitary councils; county councils are not Part 2A authorities), and that number is falling as reorganisation creates larger unitaries; consultancies are the faster initial commercial path.',
  'UK GBP lab pricing is quote-only from major labs (ALS, SOCOTEC, Eurofins, RPS); the cost model below uses a published EU proxy figure, explicitly flagged as an assumption pending direct UK quotes.',
];

const SOURCES: { label: string; href: string }[] = [
  { label: 'EUR-Lex, Directive (EU) 2020/2184', href: 'https://eur-lex.europa.eu/eli/dir/2020/2184/oj/eng' },
  { label: 'European Commission news, 12 Jan 2026', href: 'https://environment.ec.europa.eu/news/new-eu-rules-limit-pfas-drinking-water-2026-01-12_en' },
  { label: 'DWI — PFAS and forever chemicals', href: 'https://www.dwi.gov.uk/pfas-and-forever-chemicals/' },
  { label: 'DWI — guidance for local authorities on PFAS', href: 'https://www.dwi.gov.uk/private-water-supplies/local-authorities/guidance-on-specific-parameters/poly-and-perfluorinated-alkyl-substances-pfas/' },
  { label: 'Chemistry World — stricter PFAS limits in England & Wales', href: 'https://www.chemistryworld.com/news/water-regulator-applies-stricter-pfas-limits-to-drinking-water-in-england-and-wales/4020476.article' },
  { label: 'DWI 2024 Chief Inspector’s report — PFAS', href: 'https://www.dwi.gov.uk/what-we-do/annual-report/drinking-water-2024/drinking-water-2024-summary-of-the-chief-inspectors-report-for-drinking-water-in-england/perfluoroalkyl-and-polyfluoroalkyl-substances-pfas/' },
  { label: 'GOV.UK — PFAS Plan: building a safer future together', href: 'https://www.gov.uk/government/publications/pfas-plan/pfas-plan-building-a-safer-future-together' },
  { label: 'Defra blog — forever chemicals, the problem and our plan', href: 'https://defraenvironment.blog.gov.uk/2026/02/03/forever-chemicals-the-problem-and-our-plan/' },
  { label: 'C&EN — UK PFAS action plan', href: 'https://cen.acs.org/policy/chemical-regulation/pfas-uk-action-plan-defra/104/web/2026/02' },
  { label: 'Envirotec — what the UK PFAS Plan means for industry', href: 'https://envirotecmagazine.com/2026/02/12/what-the-uk-governments-pfas-plan-means-for-industry/' },
  { label: 'ENDS Report — England’s multi-billion-pound PFAS problem', href: 'https://www.endsreport.com/article/1888657/englands-multi-billion-pound-pfas-problem-7-insights-unpublished-ea-report' },
  { label: 'International Fire & Safety Journal — PFAS sites strain EA budget', href: 'https://internationalfireandsafetyjournal.com/rising-pfas-contamination-sites-in-england-strain-environment-agency-budget/' },
  { label: 'Arnold & Porter — ECHA committees advance PFAS restriction', href: 'https://www.arnoldporter.com/en/perspectives/advisories/2026/03/echa-committees-advance-broad-pfas-restriction-under-reach' },
  { label: 'White & Case — Europe’s PFAS restriction proposal moving forward', href: 'https://www.whitecase.com/insight-alert/europes-pfas-restriction-proposal-moving-forward' },
  { label: 'ECHA — Q&A on PFAS opinions', href: 'https://www.echa.europa.eu/documents/d/guest/echa_qa_pfas_opinions_final_en' },
  { label: 'Forever Pollution Project — lobbying & cleanup cost', href: 'https://foreverpollution.eu/lobbying/' },
  { label: 'NGI — staggering cost of cleaning PFAS pollution in Europe', href: 'https://www.ngi.no/en/news/now-we-know-the-staggering-costs-of-cleaning-pfas-pollution-for-europe/' },
  { label: 'Measurlabs — PFAS testing laboratory comparison', href: 'https://measurlabs.com/blog/pfas-testing-laboratory-comparison/' },
  { label: 'ResolveMass — PFAS testing', href: 'https://resolvemass.ca/pfas-testing-2/' },
  { label: 'FREDsense — PFAS field kit', href: 'https://fredsense.com/pfas-home/pfas-field-kit/' },
  { label: 'MOSL — water resource zones', href: 'https://mosl.co.uk/market-insight/market-performance/environmental-impact/water-resource-zones-wrzs' },
  { label: 'Fortune Business Insights — PFAS testing market', href: 'https://www.fortunebusinessinsights.com/pfas-testing-market-115213' },
  { label: 'Roots Analysis — PFAS testing market', href: 'https://www.rootsanalysis.com/reports/pfas-testing-market.html' },
  { label: 'Towards Healthcare — PFAS testing market sizing', href: 'https://www.towardshealthcare.com/insights/pfas-testing-market-sizing' },
  { label: 'Research and Markets — PFAS testing', href: 'https://www.researchandmarkets.com/reports/6170631/per-polyfluoroalkyl-substances-pfas-testing' },
  { label: 'House of Commons Library — local authorities briefing', href: 'https://commonslibrary.parliament.uk/research-briefings/cbp-10494/' },
  { label: 'Part 2A statutory guidance (Environmental Protection Act 1990)', href: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/223705/pb13735cont-land-guidance.pdf' },
  { label: 'Sueishi et al. 2013 — fluorescence quantum yields of anilinonaphthalene sulfonic acids with cyclodextrins and CB[7] (Spectrochim. Acta A 114, 344–349)', href: 'https://pubmed.ncbi.nlm.nih.gov/23786974/' },
  { label: 'J. Incl. Phenom. Macrocycl. Chem. 2026 — weakly interacting cyclodextrin complexes: 2,6-ANS and 8,1-ANS across native cyclodextrins', href: 'https://doi.org/10.1007/s10847-026-01361-0' },
  { label: 'ScienceDirect — cyclodextrin-polymer fluorescent sensor array for PFAS', href: 'https://www.sciencedirect.com/science/article/abs/pii/S0003267025010748' },
  { label: 'Cyclopure — DEXSORB', href: 'https://cyclopure.com/dexsorb/' },
  { label: 'Kurita — investment in Cyclopure / DEXSORB', href: 'https://www.kuritaamerica.com/the-splash/kurita-invests-in-cyclopure-to-accelerate-pfas-business-expansion-utilizing-dexsorb-in-the-united-states' },
];

function SourceLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-teal-700 underline underline-offset-2 hover:text-teal-800"
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
    </div>
  );
}

const chartTooltipStyle = {
  borderRadius: 8,
  border: '1px solid #e2e8f0',
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
};

export default function Why() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Why Aegis"
        subtitle="The regulatory driver, the pain point, the cost model, and the market opportunity behind Aegis — every figure sourced, every projection labelled."
      />

      {/* 1. Regulatory driver */}
      <section className="mb-16" aria-labelledby="regulatory">
        <SectionHeading eyebrow="1 · Demand signal" title="The regulatory driver" />
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600">
          A sequence of binding and near-binding deadlines is converging on 2026, each widening the
          gap between how many sites must be assessed for PFAS and how much lab-testing budget
          exists to assess them.
        </p>
        <ol className="space-y-4 border-l-2 border-teal-200 pl-6">
          {MILESTONES.map((m) => (
            <li key={m.title} className="relative">
              <span className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full border-2 border-white bg-teal-600 shadow" />
              <p className="text-xs font-semibold tracking-wide text-teal-700">{m.date}</p>
              <h3 className="text-base font-semibold text-slate-900">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{m.body}</p>
              <p className="mt-1 text-xs text-slate-400">
                Source: <SourceLink href={m.sourceHref}>{m.sourceLabel}</SourceLink>
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. Pain point */}
      <section className="mb-16" aria-labelledby="pain-point">
        <SectionHeading eyebrow="2 · Pain point" title="Cost and scale" />
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600">
          Accredited PFAS analysis is slow, and the number of sites that plausibly need it dwarfs
          current budgets.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Cost per accredited lab sample"
            value="€175–300"
            detail="EU published list prices, excl. VAT, plus a €97 per-order service fee (drinking/natural water €175, wastewater €300). Typically 2–3 weeks from the lab receiving the sample. UK labs (ALS, SOCOTEC, Eurofins, RPS) are quote-only — a data gap, honestly flagged. Source: Measurlabs product pages."
          />
          <StatCard
            label="Potential PFAS source sites"
            value="40,000+"
            detail="Mapped in England by the Environment Agency's PFAS risk-screening work, of which 2,900–10,200 are modelled as high-risk depending on the score threshold. Source: Jacobs U.K. Ltd for the Environment Agency, PFAS Risk Screening Project Phase 4 WP4, July 2023."
          />
          <StatCard
            label="Water-company PFAS analyses, 2024"
            value="770,000+"
            detail="Individual analyses performed in England & Wales in 2024 alone (1.7m+ since 2012); only 46 of 1,067 treatment works (4.3%) had Tier 2 detections. Source: DWI 2024 Chief Inspector's report."
          />
          <StatCard
            label="EA contaminated land budget mismatch"
            value="£1.8–2.7m vs ~£300k"
            detail="Estimated cost to investigate just 4 known PFAS sites, against the EA's contaminated land budget of £300k plus £200k from a chemicals funding stream, as quoted by the EA in October 2024. This is the contaminated land programme line only — the EA's total annual expenditure is ~£2.1bn. Source: The Guardian / Watershed Investigations, 15 Oct 2024."
          />
        </div>
      </section>

      {/* 3. Cost model chart */}
      <section className="mb-16" aria-labelledby="cost-model">
        <SectionHeading eyebrow="3 · Value proposition" title="An illustrative cost model" />
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600">
          For a council or consultancy running a portfolio of 500 samples a year, triaging with
          Aegis before committing to lab confirmation materially cuts monitoring spend.
        </p>
        <Card className="p-5">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COST_DATA} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  tickFormatter={(v: number) => `£${v / 1000}k`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  label={{ value: 'Modelled annual cost (£)', position: 'insideBottom', offset: -6, fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                  type="category"
                  dataKey="scenario"
                  width={168}
                  tick={{ fontSize: 12, fill: '#334155' }}
                />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value, name) => [`£${Number(value).toLocaleString()}`, String(name)]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="labCost" stackId="a" name="Lab testing cost" fill="#d97706" stroke="#fff" strokeWidth={2} />
                <Bar
                  dataKey="platformCost"
                  stackId="a"
                  name="Aegis platform & consumables"
                  fill="#0d9488"
                  stroke="#fff"
                  strokeWidth={2}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Illustrative model, not a vendor quote. Portfolio of {MODELLED_PORTFOLIO_SAMPLES}{' '}
            samples/year. Lab cost modelled at {gbp(INDICATIVE_LAB_COST_GBP)}/sample —{' '}
            <strong>an assumption, not a quote.</strong> No UK laboratory we approached publishes a
            PFAS rate card; we checked seven providers and all quote on request. The nearest
            published UK figure is {gbp(UK_PUBLISHED_SOIL_LAB_COST_GBP)}/sample (Environmental
            Industries Association, written evidence PFAS0121 to the Environmental Audit Committee,
            May 2025) — but that is a rough figure for <strong>soil</strong> analysis and explicitly
            excludes water, so it sets scale rather than validating our number. We do not know
            whether water analysis costs more or less, and we are not claiming our figure is
            conservative. Aegis cost is split into a {gbp(SUBSCRIPTION_STANDARD_GBP)}/year software
            subscription plus screening consumables at{' '}
            {gbp(CONSUMABLE_COST_PER_SAMPLE_GBP)}/sample ({gbp(CONSUMABLES_ANNUAL_GBP)}/year at this
            volume — a founder estimate, not a supplier quote), giving{' '}
            {gbp(AEGIS_ANNUAL_COST_GBP)} total. Escalation rate of{' '}
            {Math.round(MODELLED_ESCALATION_RATE * 100)}% is an assumption, not an observation — see
            the sensitivity range below.
          </p>
        </Card>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Modelled cost reduction"
            value={`${Math.round(MODELLED_COST_REDUCTION * 100)}%`}
            detail={`${gbp(ALL_LAB_COST_GBP)} (all-lab) vs ${gbp(TRIAGED_TOTAL_COST_GBP)} (Aegis-triaged), illustrative ${MODELLED_PORTFOLIO_SAMPLES}-sample portfolio.`}
          />
          <StatCard
            label="Modelled annual saving"
            value={gbp(MODELLED_ANNUAL_SAVING_GBP)}
            detail={`Net of subscription and consumables, per ${MODELLED_PORTFOLIO_SAMPLES}-sample portfolio. Illustrative figures above.`}
          />
          <StatCard
            label="Lab samples avoided"
            value={`${LAB_SAMPLES_AVOIDED} / year`}
            detail={`${MODELLED_PORTFOLIO_SAMPLES} samples minus the ~${ESCALATED_SAMPLES} escalated for lab confirmation.`}
          />
        </div>

        {/* The escalation rate is the assumption the whole model hinges on and the
            one we have no data for, so we show what happens when it is wrong. */}
        <Card className="mt-4 p-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Sensitivity to the assumption we are least sure about
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            We have no empirical basis for the escalation rate — establishing it against paired
            LC-MS/MS results is the point of a pilot. So rather than defend a single number, here is
            what the saving becomes if we are wrong in either direction. The case survives even at
            double our assumed rate.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {ESCALATION_RATE_RANGE.map((rate) => {
              const saving = savingAtEscalationRate(rate);
              const isBase = rate === MODELLED_ESCALATION_RATE;
              return (
                <div
                  key={rate}
                  className={`rounded-lg p-4 ring-1 ring-inset ${
                    isBase ? 'bg-teal-50 ring-teal-200' : 'bg-slate-50 ring-slate-200'
                  }`}
                >
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                    {Math.round(rate * 100)}% escalated{isBase ? ' · modelled' : ''}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{gbp(saving)}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {Math.round((saving / ALL_LAB_COST_GBP) * 100)}% below the all-lab cost
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* 4. Market opportunity */}
      <section className="mb-16" aria-labelledby="market">
        <SectionHeading eyebrow="4 · Market opportunity" title="Market size — TAM, SAM, SOM" />
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600">
          Independent market reports disagree sharply on the size of the "PFAS testing market" —
          by a factor of about eight. Their <em>published</em> segmentations are nearly identical
          (both cover instruments, consumables, software and services), so the gap reflects
          differing revenue definitions and estimation methodology rather than any stated
          difference in scope: the higher estimate appears to count method development, compliance
          testing, environmental risk assessment and PFAS consulting, while the lower one is
          defined as laboratory analysis of samples. 2026 estimates range from roughly{' '}
          <strong>$439m</strong> (<SourceLink href="https://www.fortunebusinessinsights.com/pfas-testing-market-115213">Fortune Business Insights</SourceLink>) to{' '}
          <strong>$3.6bn</strong> (<SourceLink href="https://www.researchandmarkets.com/reports/6170631/per-polyfluoroalkyl-substances-pfas-testing">Research and Markets</SourceLink>
          ), with CAGR estimates clustering around <strong>11–14.5%</strong>. We present this honestly as a
          range rather than picking the most flattering number.
        </p>
        <Card className="p-5">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MARKET_DATA} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <defs>
                  <linearGradient id="marketFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  tickFormatter={(v: number) => `$${v}m`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={64}
                  label={{ value: 'Global PFAS testing market ($m)', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value) => [`$${Number(value)}m`, 'FBI market estimate']}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Global PFAS testing market ($m)"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="url(#marketFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Single clearly-sourced series shown for consistency: Fortune Business Insights, PFAS
            Testing Market Report. <strong>Only the endpoints are published</strong> — $439.0m
            (2026) and $1,037.4m (2034). The intermediate years are smoothed at the implied 11.3%
            CAGR for illustration and are not separately published by FBI. Other estimates in the
            text above use different revenue definitions and are not plotted here, to avoid mixing
            incompatible series on one axis.
          </p>
        </Card>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="TAM"
            value="$439m–$3.6bn"
            detail="Global PFAS testing market, 2026 — the range reflects differing revenue definitions across market reports, not a stated scope difference. Europe is ~$106m and the UK ~$11.5m (2025, Fortune Business Insights); those are the anchors that matter to us."
          />
          <StatCard
            label="SAM"
            value="~300–370 UK bodies"
            detail="UK environmental consultancies plus local authorities with Part 2A contaminated-land duties (count shifting with 2026–2028 council reorganisation)."
          />
          <StatCard
            label="SOM (early beachhead)"
            value="A handful of pilots"
            detail="Illustrative Year 1–2 target: 1–2 consultancy pilots expanding toward a small number of pilot councils once the EA map lands."
          />
        </div>
      </section>

      {/* 5. Customers & GTM */}
      <section className="mb-16" aria-labelledby="gtm">
        <SectionHeading eyebrow="5 · Go-to-market" title="Customers and sequencing" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">Primary — first customer</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">Environmental consultancies</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Consultancies are commissioned by developers and landowners to run PFAS
              investigations at volume under planning and Part 2A duties. They have a fast sales
              cycle, normal commercial procurement, and a direct economic incentive to cut lab
              spend without cutting due diligence.
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase">Strategic — second wave</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">UK local authorities</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Councils hold the statutory Part 2A duty to identify and inspect contaminated land,
              and are the payer of last resort for orphan sites. The 2026 PFAS Plan reinforces this
              with an incoming prioritisation map, but procurement across ~290 fragmented
              authorities is slower.
            </p>
          </Card>
        </div>
        <Card className="mt-4 p-6">
          <h3 className="text-sm font-semibold text-slate-900">Sequencing</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Pilot with 1–2 environmental consultancies first, proving cost savings and workflow fit
            with a fast-moving commercial buyer. Expand toward local authorities once the
            Environment Agency's GIS prioritisation map reaches councils (end of 2026), positioning
            Aegis as the tool that turns that map's raw site list into a fundable, defensible
            investigation priority order.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Source: <SourceLink href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/223705/pb13735cont-land-guidance.pdf">Part 2A statutory guidance</SourceLink>
            {' · '}
            <SourceLink href="https://www.gov.uk/government/publications/pfas-plan/pfas-plan-building-a-safer-future-together">GOV.UK PFAS Plan</SourceLink>
          </p>
        </Card>
      </section>

      {/* 6. Business model */}
      <section className="mb-16" aria-labelledby="business-model">
        <SectionHeading eyebrow="6 · Business model" title="Revenue model and illustrative projection" />
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600">
          Aegis combines a SaaS platform subscription with screening-kit consumables (dye and
          adsorbent cartridges) and an optional per-sample decision-support fee. The chart below is
          an illustrative founder projection, not a committed pipeline or guaranteed outcome.
        </p>
        <Card className="p-5">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROJECTION_DATA} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  tickFormatter={(v: number) => `£${v / 1000}k`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={64}
                  label={{ value: 'Modelled ARR (£)', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value, name) => [`£${Number(value).toLocaleString()}`, String(name)]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="consultancyArr" stackId="a" name="Consultancies" fill="#0d9488" stroke="#fff" strokeWidth={2} />
                <Bar
                  dataKey="councilArr"
                  stackId="a"
                  name="Local authorities"
                  fill="#d97706"
                  stroke="#fff"
                  strokeWidth={2}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Illustrative founder projections only — not guarantees or a signed pipeline. Revenue is
            the <strong>software subscription only</strong>, priced by programme scale rather than by
            customer type: {gbp(SUBSCRIPTION_STANDARD_GBP)}/year standard tier, and{' '}
            {gbp(SUBSCRIPTION_PROGRAMME_GBP)}/year for large multi-site programmes. We assume a
            share of local-authority Part 2A portfolios reach that tier — a founder assumption, not
            a measured distribution. The most recent national survey (EA/Defra Part 2A review, to
            Dec 2013) found 47% of responding councils had 50 or more sites still requiring detailed
            inspection, 19% had 10–50 and 34% had fewer than 10.
            Screening consumables ({gbp(CONSUMABLE_COST_PER_SAMPLE_GBP)}/sample in the cost model
            above) are assumed <strong>passed through at cost and excluded from revenue</strong>, so
            these projections are deliberately conservative; consumable margin is a plausible second
            revenue line but we are not counting it. Customer counts: Year 1 — 3 consultancies;
            Year 2 — 15 consultancies + 5 councils; Year 3 — 40 consultancies + 25 councils. The
            Year 3 council figure is the most optimistic number here. It depends on Defra’s 2026
            consultation (PFAS Plan action 3.6) actually resulting in a statutory limit — no in-force
            date has been published — and on the Part 2A material for local authorities (action
            3.15, undated) and technical guidance on legacy PFAS (action 3.16, by 2027) landing on
            schedule.
          </p>
        </Card>
      </section>

      {/* 7. Competitive landscape */}
      <section className="mb-16" aria-labelledby="competition">
        <SectionHeading eyebrow="7 · Competitive landscape" title="How Aegis differs" />
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          The honest framing is <strong>pre-lab versus post-lab</strong>. Established environmental
          data platforms already do exceedance screening well — ESdat, for instance, ships UK
          regulatory standards pre-loaded and sends real-time exceedance alerts. They do ingest
          field and sensor data as well as lab results, and they include sample-planning modules, so
          it would be wrong to say they never touch the pre-lab workflow. But that planning is
          schedule- and template-driven, and their screening and reporting are built around
          accredited laboratory chemistry. None of them uses a field measurement to decide whether a
          collected sample is worth analysing at all. Aegis targets that specific decision, and the
          saving comes from analyses never ordered. It is also not tied to one sensor — it is the
          risk-scoring, prioritisation, workflow and audit-trail layer, and it can sit behind any
          screening chemistry.
        </p>
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                <th className="px-4 py-3">Competitor</th>
                <th className="px-4 py-3">Approach</th>
                <th className="px-4 py-3">Real-time</th>
                <th className="px-4 py-3">Commercial</th>
                <th className="px-4 py-3">Aegis differentiation</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c) => (
                <tr key={c.name} className="border-b border-slate-100 align-top last:border-0">
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.approach}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{c.realTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{c.commercial}</td>
                  <td className="px-4 py-3 text-slate-600">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="mt-2 text-xs text-slate-400">
          Sources: <SourceLink href="https://cyclopure.com/dexsorb/">Cyclopure</SourceLink>
          {' · '}
          <SourceLink href="https://fredsense.com/pfas-home/pfas-field-kit/">FREDsense</SourceLink>
          {' · '}
          <SourceLink href="https://www.sciencedirect.com/science/article/abs/pii/S0003267025010748">ScienceDirect sensor array</SourceLink>
        </p>
      </section>

      {/* 8. Risks */}
      <section className="mb-16" aria-labelledby="risks">
        <SectionHeading eyebrow="8 · Candour" title="Risks and limitations" />
        <Card className="p-6">
          <ul className="space-y-3">
            {RISKS.map((r) => (
              <li key={r} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 9. Sources */}
      <section className="mb-8" aria-labelledby="sources">
        <SectionHeading eyebrow="9 · References" title="Sources" />
        <Card className="p-6">
          <ol className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-slate-600 sm:grid-cols-2">
            {SOURCES.map((s, i) => (
              <li key={s.href} className="truncate">
                <span className="text-slate-400">{i + 1}.</span>{' '}
                <SourceLink href={s.href}>{s.label}</SourceLink>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <p className="text-xs italic text-slate-400">
        Figures marked "illustrative" or "modelled" are founder projections built on explicit,
        stated assumptions — not guarantees. All other figures are drawn from the cited public
        sources above; see Sources.
      </p>
    </div>
  );
}
