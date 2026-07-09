// Aegis risk engine — transparent weighted scoring.
//
// Deliberately a pure module with no UI or storage dependencies so the model
// can later be swapped for a calibrated sensor model or ML model without
// touching the rest of the app. Every point contributed to the score is
// reported as a named driver so recommendations are always explainable.

import type {
  ConcentrationBand,
  Confidence,
  RecommendedActionId,
  RiskAssessment,
  RiskBand,
  RiskDriver,
  Sample,
  ScreeningResult,
  Settings,
  Site,
} from '../types';

export const DEFAULT_SETTINGS: Settings = {
  weights: {
    screeningSignal: 30,
    concentrationBand: 15,
    repeatPositives: 10,
    fireTrainingOrAirport: 10,
    landfill: 6,
    industrial: 6,
    wastewaterTreatment: 5,
    historicalContamination: 4,
    priorLabConfirmedNearby: 8,
    sensitivity: 10,
    sourceType: 6,
  },
  thresholds: { medium: 30, high: 55, critical: 75 },
};

export const BAND_FRACTION: Record<ConcentrationBand, number> = {
  nd: 0,
  trace: 0.25,
  elevated: 0.55,
  high: 0.85,
  very_high: 1,
};

export const CONFIDENCE_FACTOR: Record<Confidence, number> = {
  low: 0.7,
  medium: 0.85,
  high: 1,
};

// Exposure-pathway weighting: how directly the sampled matrix reaches people
// or sensitive receptors. Leachate/effluent are expected to contain PFAS but
// are not directly consumed, so they contribute less to receptor risk.
export const SOURCE_TYPE_FACTOR: Record<Site['sourceType'], number> = {
  private_supply: 1,
  treated_drinking_water: 0.9,
  groundwater: 0.6,
  surface_water: 0.45,
  wastewater_effluent: 0.2,
  leachate: 0.1,
};

const SENSITIVITY_FACTOR: Record<Site['sensitivity'], number> = {
  low: 0,
  medium: 0.5,
  high: 1,
};

export const ACTION_LABELS: Record<RecommendedActionId, string> = {
  screen: 'Field screening required',
  no_action: 'No lab test needed — routine monitoring',
  monitor: 'Monitor / retest',
  lab_confirm: 'Send for confirmatory lab analysis',
  urgent: 'Urgent escalation — prioritise lab confirmation',
};

export const BAND_LABELS: Record<ConcentrationBand, string> = {
  nd: '< 10 ng/L (not detected)',
  trace: '10–50 ng/L (trace)',
  elevated: '50–100 ng/L (approaching guideline)',
  high: '100–500 ng/L (exceeds 0.1 µg/L guideline)',
  very_high: '> 500 ng/L (exceeds EU PFAS-Total value)',
};

/** A screening counts as "positive" when its estimated band reaches this level. */
const POSITIVE_BANDS: ConcentrationBand[] = ['elevated', 'high', 'very_high'];

export function latestScreening(sample: Sample): ScreeningResult | undefined {
  if (sample.screenings.length === 0) return undefined;
  return [...sample.screenings].sort((a, b) => b.takenAt.localeCompare(a.takenAt))[0];
}

function bandForScore(score: number, settings: Settings): RiskBand {
  const t = settings.thresholds;
  if (score >= t.critical) return 'Critical';
  if (score >= t.high) return 'High';
  if (score >= t.medium) return 'Medium';
  return 'Low';
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function assessRisk(sample: Sample, site: Site, settings: Settings): RiskAssessment {
  const w = settings.weights;
  const drivers: RiskDriver[] = [];
  const screening = latestScreening(sample);

  // --- Screening evidence ---
  let uncertaintyNote: string | undefined;
  if (screening) {
    const conf = CONFIDENCE_FACTOR[screening.confidence];
    const signalPts = (Math.min(Math.max(screening.signal, 0), 100) / 100) * w.screeningSignal * conf;
    drivers.push({
      key: 'screeningSignal',
      label: 'Screening signal strength',
      points: round1(signalPts),
      max: w.screeningSignal,
      detail: `Fluorescence response ${screening.signal}/100 at ${screening.confidence} confidence (evidence weighted ×${conf}).`,
    });

    const bandPts = BAND_FRACTION[screening.estimatedBand] * w.concentrationBand;
    drivers.push({
      key: 'concentrationBand',
      label: 'Estimated PFAS concentration band',
      points: round1(bandPts),
      max: w.concentrationBand,
      detail: `Estimated ${BAND_LABELS[screening.estimatedBand]}.`,
    });

    const positives = sample.screenings.filter((s) =>
      POSITIVE_BANDS.includes(s.estimatedBand),
    ).length;
    const repeatPts = (Math.min(positives, 3) / 3) * w.repeatPositives;
    drivers.push({
      key: 'repeatPositives',
      label: 'Repeat positive screens',
      points: round1(repeatPts),
      max: w.repeatPositives,
      detail:
        positives === 0
          ? 'No screens at or above the 50 ng/L (elevated) band.'
          : `${positives} screen${positives > 1 ? 's' : ''} at or above the elevated band (capped at 3).`,
    });

    if (screening.confidence === 'low') {
      uncertaintyNote =
        'Latest screening has LOW confidence — treat the estimate as indicative only and consider a repeat screen before acting on this result.';
    }
  }

  // --- Site context ---
  const factorDefs: Array<{
    key: keyof typeof w & keyof Site['riskFactors'];
    label: string;
    detail: string;
  }> = [
    {
      key: 'fireTrainingOrAirport',
      label: 'Firefighting foam / airfield proximity',
      detail: 'AFFF use at airfields and fire-training grounds is the dominant UK PFAS point source.',
    },
    { key: 'landfill', label: 'Landfill proximity', detail: 'Landfill leachate is a recognised PFAS pathway.' },
    { key: 'industrial', label: 'Industrial activity nearby', detail: 'Industrial processes and coatings can release PFAS.' },
    {
      key: 'wastewaterTreatment',
      label: 'Wastewater treatment proximity',
      detail: 'WWTP effluent and biosolids concentrate PFAS from the catchment.',
    },
    {
      key: 'historicalContamination',
      label: 'Historical contamination concerns',
      detail: 'Previously recorded contamination concerns at or near this site.',
    },
    {
      key: 'priorLabConfirmedNearby',
      label: 'Prior lab-confirmed PFAS nearby',
      detail: 'Laboratory-confirmed PFAS detection in the vicinity.',
    },
  ];
  for (const f of factorDefs) {
    const present = site.riskFactors[f.key];
    drivers.push({
      key: f.key,
      label: f.label,
      points: present ? w[f.key] : 0,
      max: w[f.key],
      detail: present ? f.detail : 'Not identified for this site.',
    });
  }

  const sensPts = SENSITIVITY_FACTOR[site.sensitivity] * w.sensitivity;
  drivers.push({
    key: 'sensitivity',
    label: 'Receptor sensitivity',
    points: round1(sensPts),
    max: w.sensitivity,
    detail: `Population/environmental sensitivity assessed as ${site.sensitivity}.`,
  });

  const srcPts = SOURCE_TYPE_FACTOR[site.sourceType] * w.sourceType;
  drivers.push({
    key: 'sourceType',
    label: 'Water source exposure pathway',
    points: round1(srcPts),
    max: w.sourceType,
    detail: `Source type "${site.sourceType.replace(/_/g, ' ')}" weighted by how directly it reaches receptors.`,
  });

  const raw = drivers.reduce((sum, d) => sum + d.points, 0);
  const score = Math.min(100, Math.round(raw));
  const band = bandForScore(score, settings);

  // --- Recommendation ---
  let action: RecommendedActionId;
  if (!screening) {
    action = 'screen';
  } else {
    action = (
      { Low: 'no_action', Medium: 'monitor', High: 'lab_confirm', Critical: 'urgent' } as const
    )[band];
    // Precautionary rule: a noticeable signal at low confidence should never
    // resolve to "no action" — uncertainty is a reason to retest, not to relax.
    if (action === 'no_action' && screening.confidence === 'low' && screening.signal >= 35) {
      action = 'monitor';
      uncertaintyNote =
        'Score is in the Low band, but the screening signal is non-trivial and confidence is LOW — recommendation raised to monitor/retest as a precaution.';
    }
  }

  const topDrivers = [...drivers].filter((d) => d.points > 0).sort((a, b) => b.points - a.points);
  const summary = !screening
    ? `Site-context score ${score}/100 (${band}). No screening data yet — run a field screen before deciding on lab submission.`
    : `Risk score ${score}/100 (${band}). Main drivers: ${topDrivers
        .slice(0, 3)
        .map((d) => d.label.toLowerCase())
        .join(', ')}.`;

  return {
    score,
    band,
    action,
    actionLabel: ACTION_LABELS[action],
    drivers: topDrivers.concat(drivers.filter((d) => d.points === 0)),
    summary,
    uncertaintyNote,
  };
}
