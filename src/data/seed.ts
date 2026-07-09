// Seeded demo dataset. Deterministic (seeded PRNG) so the demo looks the same
// on every reset. Screening signals are generated from concentration-band
// midpoints plus noise, so the numbers are internally consistent with the
// fluorescence-response story rather than random.
//
// All organisations, sites, and people are fictional.

import type {
  AppState,
  ConcentrationBand,
  Confidence,
  Project,
  Sample,
  SampleStatus,
  ScreeningResult,
  Site,
  SiteRiskFactors,
  StatusEvent,
} from '../types';
import { DEFAULT_SETTINGS } from '../lib/riskEngine';

// mulberry32 — tiny deterministic PRNG
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260709);

const NOW = Date.now();
const daysAgo = (d: number) => new Date(NOW - d * 86_400_000).toISOString();

// Signal model: band midpoint (as % of calibration max) + jitter.
const BAND_SIGNAL: Record<ConcentrationBand, [number, number]> = {
  nd: [8, 5],
  trace: [22, 6],
  elevated: [46, 8],
  high: [68, 8],
  very_high: [88, 7],
};

let screeningId = 0;
function screen(
  band: ConcentrationBand,
  confidence: Confidence,
  takenDaysAgo: number,
  operator = 'Field Team A',
  notes?: string,
): ScreeningResult {
  const [mid, jitter] = BAND_SIGNAL[band];
  const signal = Math.max(0, Math.min(100, Math.round(mid + (rand() * 2 - 1) * jitter)));
  screeningId += 1;
  return {
    id: `scr-${screeningId}`,
    takenAt: daysAgo(takenDaysAgo),
    signal,
    estimatedBand: band,
    confidence,
    operator,
    notes,
  };
}

const STATUS_ORDER: SampleStatus[] = ['new', 'screened', 'flagged', 'sent_to_lab', 'lab_received', 'closed'];

/** Build a plausible status history ending at `status`. */
function historyFor(status: SampleStatus, collectedDaysAgo: number): StatusEvent[] {
  const idx = STATUS_ORDER.indexOf(status);
  const steps = STATUS_ORDER.slice(0, idx + 1);
  const gap = collectedDaysAgo / Math.max(steps.length, 1);
  return steps.map((s, i) => ({
    status: s,
    at: daysAgo(collectedDaysAgo - gap * i),
    note:
      s === 'flagged'
        ? 'Risk score exceeded lab-referral threshold.'
        : s === 'sent_to_lab'
          ? 'Submitted for LC-MS/MS confirmatory analysis.'
          : undefined,
  }));
}

const NO_FACTORS: SiteRiskFactors = {
  fireTrainingOrAirport: false,
  landfill: false,
  industrial: false,
  wastewaterTreatment: false,
  historicalContamination: false,
  priorLabConfirmedNearby: false,
};

export const SEED_PROJECTS: Project[] = [
  {
    id: 'p-kestrel',
    name: 'Kestrel Vale DC — Part 2A PFAS Screening Programme',
    client: 'Kestrel Vale District Council',
    description:
      'First-pass screening of council-identified potential PFAS source sites ahead of Part 2A prioritisation, informed by the Environment Agency PFAS source map.',
    createdAt: daysAgo(60),
  },
  {
    id: 'p-airfield',
    name: 'Former RAF Merefield — Redevelopment Phase 1',
    client: 'Harrier Land Partners LLP',
    description:
      'Pre-acquisition contamination screening of a former airfield with an active fire-training legacy, commissioned via environmental consultants.',
    createdAt: daysAgo(45),
  },
  {
    id: 'p-private',
    name: 'River Vale Private Water Supplies',
    client: 'Kestrel Vale DC — Environmental Health',
    description:
      'Screening of unregulated private drinking-water supplies in the River Vale catchment, prioritised by proximity to known PFAS sources.',
    createdAt: daysAgo(30),
  },
];

export const SEED_SITES: Site[] = [
  // --- Kestrel Vale council programme ---
  {
    id: 'st-longmoor',
    projectId: 'p-kestrel',
    name: 'Longmoor WTW Raw Intake',
    description: 'Raw surface-water intake 1.2 km downstream of Longmoor WWTP discharge.',
    lat: 52.482, lng: -1.61,
    sourceType: 'surface_water',
    sensitivity: 'medium',
    riskFactors: { ...NO_FACTORS, wastewaterTreatment: true },
    createdAt: daysAgo(58),
  },
  {
    id: 'st-hartfield',
    projectId: 'p-kestrel',
    name: 'Hartfield Landfill Perimeter BH-3',
    description: 'Downgradient monitoring borehole on the closed Hartfield landfill boundary.',
    lat: 52.517, lng: -1.552,
    sourceType: 'groundwater',
    sensitivity: 'medium',
    riskFactors: { ...NO_FACTORS, landfill: true, historicalContamination: true },
    createdAt: daysAgo(57),
  },
  {
    id: 'st-brackenford',
    projectId: 'p-kestrel',
    name: 'Brackenford Industrial Estate BH-1',
    description: 'Groundwater borehole adjacent to metal-finishing and coatings units.',
    lat: 52.455, lng: -1.585,
    sourceType: 'groundwater',
    sensitivity: 'low',
    riskFactors: { ...NO_FACTORS, industrial: true },
    createdAt: daysAgo(55),
  },
  {
    id: 'st-staidans',
    projectId: 'p-kestrel',
    name: "St Aidan's Rural Spring",
    description: 'Upland spring in pasture catchment; no identified PFAS sources.',
    lat: 52.561, lng: -1.72,
    sourceType: 'surface_water',
    sensitivity: 'low',
    riskFactors: { ...NO_FACTORS },
    createdAt: daysAgo(54),
  },
  // --- Former RAF Merefield ---
  {
    id: 'st-ftg-a',
    projectId: 'p-airfield',
    name: 'Fire Training Ground A',
    description: 'Primary AFFF training pad, in use 1972–2009. Bare-ground burn area.',
    lat: 52.398, lng: -1.48,
    sourceType: 'groundwater',
    sensitivity: 'medium',
    riskFactors: {
      ...NO_FACTORS,
      fireTrainingOrAirport: true,
      historicalContamination: true,
      priorLabConfirmedNearby: true,
    },
    createdAt: daysAgo(44),
  },
  {
    id: 'st-runway',
    projectId: 'p-airfield',
    name: 'Runway Drainage Outfall',
    description: 'Combined runway/apron drainage discharge to the Mere Brook.',
    lat: 52.405, lng: -1.463,
    sourceType: 'surface_water',
    sensitivity: 'medium',
    riskFactors: { ...NO_FACTORS, fireTrainingOrAirport: true },
    createdAt: daysAgo(43),
  },
  {
    id: 'st-perimeter',
    projectId: 'p-airfield',
    name: 'Southern Perimeter Ditch',
    description: 'Boundary ditch receiving surface run-off from hangars and fuel farm.',
    lat: 52.389, lng: -1.472,
    sourceType: 'surface_water',
    sensitivity: 'low',
    riskFactors: { ...NO_FACTORS, fireTrainingOrAirport: true },
    createdAt: daysAgo(42),
  },
  {
    id: 'st-abstraction',
    projectId: 'p-airfield',
    name: 'Offsite Abstraction BH West',
    description: 'Agricultural abstraction borehole 800 m downgradient of the airfield.',
    lat: 52.401, lng: -1.505,
    sourceType: 'groundwater',
    sensitivity: 'high',
    riskFactors: { ...NO_FACTORS, fireTrainingOrAirport: true, priorLabConfirmedNearby: true },
    createdAt: daysAgo(41),
  },
  // --- River Vale private supplies ---
  {
    id: 'st-valefarm',
    projectId: 'p-private',
    name: 'Vale Farm Borehole',
    description: 'Private supply serving farmhouse and two holiday lets.',
    lat: 52.44, lng: -1.66,
    sourceType: 'private_supply',
    sensitivity: 'high',
    riskFactors: { ...NO_FACTORS },
    createdAt: daysAgo(28),
  },
  {
    id: 'st-millcottage',
    projectId: 'p-private',
    name: 'Mill Cottage Spring Supply',
    description: 'Spring-fed private supply 1.5 km from the former RAF Merefield boundary; serves four dwellings including a childminding business.',
    lat: 52.412, lng: -1.52,
    sourceType: 'private_supply',
    sensitivity: 'high',
    riskFactors: { ...NO_FACTORS, fireTrainingOrAirport: true, priorLabConfirmedNearby: true },
    createdAt: daysAgo(27),
  },
  {
    id: 'st-riverside',
    projectId: 'p-private',
    name: 'Riverside Smallholding Well',
    description: 'Shallow well 400 m downstream of the Longmoor WWTP outfall.',
    lat: 52.474, lng: -1.598,
    sourceType: 'private_supply',
    sensitivity: 'medium',
    riskFactors: { ...NO_FACTORS, wastewaterTreatment: true },
    createdAt: daysAgo(26),
  },
];

interface SampleSpec {
  id: string;
  siteId: string;
  code: string;
  collectedDaysAgo: number;
  status: SampleStatus;
  screenings: ScreeningResult[];
  labSumNgL?: number;
  notes?: string;
}

function sample(spec: SampleSpec): Sample {
  return {
    id: spec.id,
    siteId: spec.siteId,
    code: spec.code,
    collectedAt: daysAgo(spec.collectedDaysAgo),
    status: spec.status,
    history: historyFor(spec.status, spec.collectedDaysAgo),
    screenings: spec.screenings,
    labResult:
      spec.labSumNgL !== undefined
        ? {
            receivedAt: daysAgo(Math.max(1, spec.collectedDaysAgo - 18)),
            sumPfasNgL: spec.labSumNgL,
            method: 'LC-MS/MS (EPA 537.1)',
            laboratory: 'Accredited partner laboratory',
          }
        : undefined,
    notes: spec.notes,
  };
}

export const SEED_SAMPLES: Sample[] = [
  // Longmoor WTW intake — medium archetype (near WWTP)
  sample({
    id: 'sm-lm-1', siteId: 'st-longmoor', code: 'KV-LM-001', collectedDaysAgo: 49, status: 'closed',
    screenings: [screen('trace', 'high', 48)],
    labSumNgL: 34,
    notes: 'Baseline quarterly screen. Lab confirmation requested by client for programme calibration.',
  }),
  sample({
    id: 'sm-lm-2', siteId: 'st-longmoor', code: 'KV-LM-002', collectedDaysAgo: 21, status: 'screened',
    screenings: [screen('trace', 'medium', 20)],
  }),
  sample({
    id: 'sm-lm-3', siteId: 'st-longmoor', code: 'KV-LM-003', collectedDaysAgo: 7, status: 'screened',
    screenings: [screen('elevated', 'medium', 6, 'Field Team A', 'Signal rise vs previous quarter; retest scheduled.')],
  }),
  // Hartfield landfill — medium/high
  sample({
    id: 'sm-hf-1', siteId: 'st-hartfield', code: 'KV-HF-001', collectedDaysAgo: 40, status: 'sent_to_lab',
    screenings: [screen('elevated', 'high', 39), screen('elevated', 'high', 33)],
    notes: 'Two consistent elevated screens; escalated per threshold policy.',
  }),
  sample({
    id: 'sm-hf-2', siteId: 'st-hartfield', code: 'KV-HF-002', collectedDaysAgo: 5, status: 'screened',
    screenings: [screen('trace', 'medium', 4)],
  }),
  // Brackenford industrial — medium
  sample({
    id: 'sm-bf-1', siteId: 'st-brackenford', code: 'KV-BF-001', collectedDaysAgo: 35, status: 'screened',
    screenings: [screen('trace', 'high', 34)],
  }),
  sample({
    id: 'sm-bf-2', siteId: 'st-brackenford', code: 'KV-BF-002', collectedDaysAgo: 3, status: 'screened',
    screenings: [screen('trace', 'low', 2, 'Field Team B', 'High turbidity; low read confidence — retest advised.')],
  }),
  // St Aidan's — low archetype
  sample({
    id: 'sm-sa-1', siteId: 'st-staidans', code: 'KV-SA-001', collectedDaysAgo: 33, status: 'closed',
    screenings: [screen('nd', 'high', 32)],
    notes: 'Clean baseline; no lab submission required.',
  }),
  sample({
    id: 'sm-sa-2', siteId: 'st-staidans', code: 'KV-SA-002', collectedDaysAgo: 4, status: 'screened',
    screenings: [screen('nd', 'high', 3)],
  }),
  // Fire Training Ground A — high/critical archetype
  sample({
    id: 'sm-ftg-1', siteId: 'st-ftg-a', code: 'RM-FTG-001', collectedDaysAgo: 38, status: 'lab_received',
    screenings: [screen('very_high', 'high', 37), screen('very_high', 'high', 35)],
    labSumNgL: 1840,
    notes: 'Lab confirmed 1.84 µg/L sum-of-PFAS — 18× the 0.1 µg/L guideline. Screening band matched lab result.',
  }),
  sample({
    id: 'sm-ftg-2', siteId: 'st-ftg-a', code: 'RM-FTG-002', collectedDaysAgo: 9, status: 'sent_to_lab',
    screenings: [screen('very_high', 'high', 8)],
  }),
  // Runway outfall
  sample({
    id: 'sm-rw-1', siteId: 'st-runway', code: 'RM-RW-001', collectedDaysAgo: 36, status: 'sent_to_lab',
    screenings: [screen('high', 'medium', 35), screen('high', 'high', 30)],
  }),
  sample({
    id: 'sm-rw-2', siteId: 'st-runway', code: 'RM-RW-002', collectedDaysAgo: 6, status: 'screened',
    screenings: [screen('elevated', 'medium', 5)],
  }),
  // Perimeter ditch
  sample({
    id: 'sm-pd-1', siteId: 'st-perimeter', code: 'RM-PD-001', collectedDaysAgo: 34, status: 'closed',
    screenings: [screen('trace', 'high', 33)],
    labSumNgL: 41,
    notes: 'Lab check confirmed low band; site de-prioritised.',
  }),
  sample({
    id: 'sm-pd-2', siteId: 'st-perimeter', code: 'RM-PD-002', collectedDaysAgo: 8, status: 'screened',
    screenings: [screen('elevated', 'low', 7, 'Field Team B', 'Windy conditions, possible surfactant interference.')],
  }),
  // Offsite abstraction — high archetype
  sample({
    id: 'sm-ab-1', siteId: 'st-abstraction', code: 'RM-AB-001', collectedDaysAgo: 30, status: 'flagged',
    screenings: [screen('high', 'high', 29), screen('high', 'medium', 24)],
    notes: 'Awaiting client authorisation for lab submission.',
  }),
  sample({
    id: 'sm-ab-2', siteId: 'st-abstraction', code: 'RM-AB-002', collectedDaysAgo: 2, status: 'new',
    screenings: [],
    notes: 'Collected; screening scheduled.',
  }),
  // Vale Farm — low/medium (sensitive source, clean screens)
  sample({
    id: 'sm-vf-1', siteId: 'st-valefarm', code: 'RV-VF-001', collectedDaysAgo: 22, status: 'screened',
    screenings: [screen('nd', 'high', 21)],
  }),
  sample({
    id: 'sm-vf-2', siteId: 'st-valefarm', code: 'RV-VF-002', collectedDaysAgo: 5, status: 'screened',
    screenings: [screen('trace', 'medium', 4)],
  }),
  // Mill Cottage — critical archetype
  sample({
    id: 'sm-mc-1', siteId: 'st-millcottage', code: 'RV-MC-001', collectedDaysAgo: 19, status: 'sent_to_lab',
    screenings: [screen('very_high', 'high', 18), screen('high', 'high', 12)],
    notes: 'Urgent escalation: strong repeat signals on a sensitive drinking-water supply. Residents advised on interim precautions by EH.',
  }),
  sample({
    id: 'sm-mc-2', siteId: 'st-millcottage', code: 'RV-MC-002', collectedDaysAgo: 1, status: 'new',
    screenings: [],
    notes: 'Follow-up sample collected pending lab result on RV-MC-001.',
  }),
  // Riverside smallholding — medium
  sample({
    id: 'sm-rs-1', siteId: 'st-riverside', code: 'RV-RS-001', collectedDaysAgo: 15, status: 'flagged',
    screenings: [screen('elevated', 'medium', 14)],
  }),
  sample({
    id: 'sm-rs-2', siteId: 'st-riverside', code: 'RV-RS-002', collectedDaysAgo: 3, status: 'screened',
    screenings: [screen('trace', 'high', 2)],
  }),
];

export function seedState(): AppState {
  return {
    projects: SEED_PROJECTS,
    sites: SEED_SITES,
    samples: SEED_SAMPLES,
    settings: structuredClone(DEFAULT_SETTINGS),
  };
}
