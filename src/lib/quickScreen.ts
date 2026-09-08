// Adapter between the one-screen field form and the risk engine.
//
// The engine scores a (Sample, Site) pair. The quick screen collects a subset
// of that — one fluorescence reading plus a handful of site facts — so this
// module builds the minimal valid pair and nothing else. It deliberately holds
// no UI and no storage, so the scoring path used by /#/screen is exactly the
// path used everywhere else in the app and stays unit-testable.

import type {
  Confidence,
  Sample,
  Sensitivity,
  Site,
  SiteRiskFactors,
  SourceType,
} from '../types';

/** The six observable conditions that degrade a wet in-cartridge read.
 *
 * Every field starts UNRECORDED. Nothing is assumed clean: an operator who
 * opens the checklist and answers nothing has told us nothing, and inferring a
 * good read from silence would manufacture confidence we have not earned.
 */
export type Observed<T extends string> = 'unrecorded' | T;

export interface QualityChecklist {
  /** Visibly cloudy (amber) or opaque (red) — scatters light, attenuates signal. */
  turbidity: Observed<'clear' | 'cloudy' | 'opaque'>;
  /** Humics both absorb light and compete for the cyclodextrin cavity. */
  colour: Observed<'clear' | 'tinted' | 'brown'>;
  /** Dry unbound dye fluoresces and masks the change. */
  stayedWet: Observed<'yes' | 'no'>;
  /** The reading is a change from baseline, so the baseline must be this cartridge. */
  baselineSameCartridge: Observed<'yes' | 'no'>;
  /** Preconcentration is load-bearing; less volume means a lower factor. */
  volumeDrawn: Observed<'full' | 'partial' | 'low'>;
  /** Only meaningful if duplicates were actually run. */
  duplicates: Observed<'not_run' | 'agree' | 'differ_moderate' | 'differ_wide'>;
}

export const DEFAULT_CHECKLIST: QualityChecklist = {
  turbidity: 'unrecorded',
  colour: 'unrecorded',
  stayedWet: 'unrecorded',
  baselineSameCartridge: 'unrecorded',
  volumeDrawn: 'unrecorded',
  duplicates: 'unrecorded',
};

/**
 * Derive the confidence flag from observed conditions rather than from the
 * operator's opinion of their own performance.
 *
 * Worst case governs: any red condition gives low, any amber gives medium.
 * High is granted only when every condition has been affirmatively observed
 * clean — an unrecorded checklist resolves to medium, the same as not opening
 * it at all. That is precautionary, and consistent with the engine's rule that
 * uncertainty never relaxes a recommendation.
 *
 * NOTE: these cut-offs are a designed starting protocol, not calibrated from
 * data — no bench experiment has been run. Setting them properly is the first
 * job of the pilot, and the UI says so.
 */
export function confidenceFromChecklist(c: QualityChecklist): Confidence {
  const red =
    c.turbidity === 'opaque' ||
    c.colour === 'brown' ||
    c.stayedWet === 'no' ||
    c.baselineSameCartridge === 'no' ||
    c.volumeDrawn === 'low' ||
    c.duplicates === 'differ_wide';
  if (red) return 'low';

  const amber =
    c.turbidity === 'cloudy' ||
    c.colour === 'tinted' ||
    c.volumeDrawn === 'partial' ||
    c.duplicates === 'differ_moderate';
  if (amber) return 'medium';

  // High only on a complete, affirmatively clean record.
  const complete =
    c.turbidity === 'clear' &&
    c.colour === 'clear' &&
    c.stayedWet === 'yes' &&
    c.baselineSameCartridge === 'yes' &&
    c.volumeDrawn === 'full' &&
    c.duplicates !== 'unrecorded';
  return complete ? 'high' : 'medium';
}

/** Plain-language reasons the flag came out as it did, for display under the result. */
export function checklistReasons(c: QualityChecklist): string[] {
  const out: string[] = [];
  if (c.turbidity === 'opaque') out.push('Sample is opaque — light scatter will attenuate the reading.');
  else if (c.turbidity === 'cloudy') out.push('Sample is cloudy — some light scatter expected.');
  if (c.colour === 'brown') out.push('Strong colour — organic matter both absorbs light and competes for the cavity.');
  else if (c.colour === 'tinted') out.push('Slight colour — some interference expected.');
  if (c.stayedWet === 'no') out.push('Cartridge ran dry — unbound dye fluoresces and masks the change.');
  if (c.baselineSameCartridge === 'no') out.push('Baseline not taken on this cartridge — the change is not comparable.');
  if (c.volumeDrawn === 'low') out.push('Under 150 mL drawn — preconcentration factor is well below design.');
  else if (c.volumeDrawn === 'partial') out.push('150–250 mL drawn — preconcentration slightly below design.');
  if (c.duplicates === 'differ_wide') out.push('Duplicates disagree by more than 25%.');
  else if (c.duplicates === 'differ_moderate') out.push('Duplicates disagree by 10–25%.');
  if (out.length === 0 && confidenceFromChecklist(c) === 'medium') {
    out.push('Not every condition was recorded — confidence held at medium rather than assumed good.');
  }
  return out;
}

export interface QuickScreenInput {
  /** Fluorescence change from baseline, 0–100 (% of calibration maximum). */
  signal: number;
  confidence: Confidence;
  sourceType: SourceType;
  sensitivity: Sensitivity;
  riskFactors: SiteRiskFactors;
  lat?: number;
  lng?: number;
  label?: string;
}

export const EMPTY_RISK_FACTORS: SiteRiskFactors = {
  fireTrainingOrAirport: false,
  landfill: false,
  industrial: false,
  wastewaterTreatment: false,
  historicalContamination: false,
  priorLabConfirmedNearby: false,
};

/**
 * Build the (Sample, Site) pair the engine expects.
 *
 * `estimatedBand` is fixed at 'nd'. The quick screen captures a fluorescence
 * change and nothing else, and there is no calibration from % to ng/L — so
 * inferring a concentration band here would invent one. The engine scores the
 * stronger of signal and band, so a band of 'nd' (fraction 0) simply lets the
 * signal lead, which is the honest behaviour.
 */
export function buildQuickAssessment(
  input: QuickScreenInput,
  now: string = new Date().toISOString(),
): { sample: Sample; site: Site } {
  const site: Site = {
    id: 'quick-site',
    projectId: 'quick-project',
    name: input.label?.trim() || 'Unnamed location',
    lat: input.lat ?? 0,
    lng: input.lng ?? 0,
    sourceType: input.sourceType,
    sensitivity: input.sensitivity,
    riskFactors: input.riskFactors,
    createdAt: now,
  };

  const sample: Sample = {
    id: 'quick-sample',
    siteId: site.id,
    code: 'QUICK-001',
    collectedAt: now,
    status: 'screened',
    history: [{ status: 'screened', at: now }],
    screenings: [
      {
        id: 'quick-screening',
        takenAt: now,
        signal: Math.min(100, Math.max(0, Math.round(input.signal))),
        estimatedBand: 'nd',
        confidence: input.confidence,
      },
    ],
  };

  return { sample, site };
}
