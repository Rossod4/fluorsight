import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from './riskEngine';
import { GUIDELINE_NG_L, backtest, scoreAll, thresholdSweep, weightSensitivity } from './validation';
import type { LabResult, Sample, ScreeningResult, Settings, Site } from '../types';

const cleanSite: Site = {
  id: 'clean',
  projectId: 'p1',
  name: 'Clean Site',
  lat: 52,
  lng: -1,
  sourceType: 'groundwater',
  sensitivity: 'low',
  riskFactors: {
    fireTrainingOrAirport: false,
    landfill: false,
    industrial: false,
    wastewaterTreatment: false,
    historicalContamination: false,
    priorLabConfirmedNearby: false,
  },
  createdAt: '2026-06-01T00:00:00Z',
};

const hotSite: Site = {
  ...cleanSite,
  id: 'hot',
  name: 'Fire Training Ground',
  sourceType: 'private_supply',
  sensitivity: 'high',
  riskFactors: { ...cleanSite.riskFactors, fireTrainingOrAirport: true, priorLabConfirmedNearby: true },
};

function mkSample(
  id: string,
  siteId: string,
  screening: Partial<ScreeningResult>,
  labResult?: LabResult,
): Sample {
  return {
    id,
    siteId,
    code: id.toUpperCase(),
    collectedAt: '2026-06-10T00:00:00Z',
    status: 'screened',
    history: [],
    screenings: [
      { id: `${id}-scr`, takenAt: '2026-06-11T00:00:00Z', signal: 10, estimatedBand: 'nd', confidence: 'high', ...screening },
    ],
    labResult,
  };
}

const lab = (sumPfasNgL: number): LabResult => ({
  receivedAt: '2026-06-20T00:00:00Z',
  sumPfasNgL,
  method: 'LC-MS/MS (EPA 537.1)',
});

const sites = [cleanSite, hotSite];

// A true positive, a true negative, and a sample with no lab result at all.
const samples: Sample[] = [
  mkSample('tp', 'hot', { signal: 92, estimatedBand: 'very_high' }, lab(1840)),
  mkSample('tn', 'clean', { signal: 6, estimatedBand: 'nd' }, lab(12)),
  mkSample('unconfirmed', 'clean', { signal: 45, estimatedBand: 'elevated' }),
];

describe('scoreAll', () => {
  it('scores every sample whose site exists and skips orphans', () => {
    const withOrphan = [...samples, mkSample('orphan', 'missing-site', { signal: 50 })];
    const scored = scoreAll(withOrphan, sites, DEFAULT_SETTINGS);
    expect(scored).toHaveLength(3);
    expect(scored.map((s) => s.sampleId)).not.toContain('orphan');
  });

  it('marks exceedance against the 100 ng/L guideline and leaves it undefined without a lab result', () => {
    const scored = scoreAll(samples, sites, DEFAULT_SETTINGS);
    expect(scored.find((s) => s.sampleId === 'tp')?.exceeded).toBe(true);
    expect(scored.find((s) => s.sampleId === 'tn')?.exceeded).toBe(false);
    expect(scored.find((s) => s.sampleId === 'unconfirmed')?.exceeded).toBeUndefined();
  });

  it('treats a result exactly on the guideline as an exceedance', () => {
    const onLimit = [mkSample('edge', 'clean', { signal: 50 }, lab(GUIDELINE_NG_L))];
    expect(scoreAll(onLimit, sites, DEFAULT_SETTINGS)[0].exceeded).toBe(true);
  });
});

describe('backtest', () => {
  it('counts only lab-confirmed samples and classifies them correctly', () => {
    const result = backtest(samples, sites, DEFAULT_SETTINGS);
    expect(result.n).toBe(2); // the unconfirmed sample is excluded
    expect(result.matrix.truePositives).toBe(1);
    expect(result.matrix.trueNegatives).toBe(1);
    expect(result.matrix.falseNegatives).toBe(0);
    expect(result.matrix.falsePositives).toBe(0);
    expect(result.sensitivity).toBe(1);
    expect(result.specificity).toBe(1);
  });

  it('records a false negative when an exceedance is not escalated', () => {
    // Weak signal at a benign site, but the lab finds an exceedance anyway —
    // exactly the failure mode that matters.
    const missed = [mkSample('fn', 'clean', { signal: 5, estimatedBand: 'nd' }, lab(500))];
    const result = backtest(missed, sites, DEFAULT_SETTINGS);
    expect(result.matrix.falseNegatives).toBe(1);
    expect(result.sensitivity).toBe(0);
  });

  it('leaves rates undefined rather than dividing by zero on an empty evidence base', () => {
    const result = backtest([], sites, DEFAULT_SETTINGS);
    expect(result.n).toBe(0);
    expect(result.sensitivity).toBeUndefined();
    expect(result.specificity).toBeUndefined();
    expect(result.precision).toBeUndefined();
  });
});

describe('thresholdSweep', () => {
  it('escalates fewer samples as the threshold rises', () => {
    const points = thresholdSweep(samples, sites, DEFAULT_SETTINGS);
    const counts = points.map((p) => p.escalated);
    for (let i = 1; i < counts.length; i++) {
      expect(counts[i]).toBeLessThanOrEqual(counts[i - 1]);
    }
  });

  it('misses more confirmed exceedances as the threshold rises', () => {
    const points = thresholdSweep(samples, sites, DEFAULT_SETTINGS);
    const missed = points.map((p) => p.missedExceedances);
    for (let i = 1; i < missed.length; i++) {
      expect(missed[i]).toBeGreaterThanOrEqual(missed[i - 1]);
    }
    // The high-scoring true positive must eventually be missed at a punitive threshold.
    expect(missed[missed.length - 1]).toBe(1);
  });

  it('reports escalation rate as a fraction of screened samples', () => {
    const points = thresholdSweep(samples, sites, DEFAULT_SETTINGS, 25);
    expect(points.map((p) => p.threshold)).toEqual([25, 50, 75, 100]);
    for (const p of points) {
      expect(p.escalationRate).toBeGreaterThanOrEqual(0);
      expect(p.escalationRate).toBeLessThanOrEqual(1);
    }
  });
});

describe('weightSensitivity', () => {
  it('returns every weight, ranked by how many decisions it changes', () => {
    const result = weightSensitivity(samples, sites, DEFAULT_SETTINGS);
    expect(result).toHaveLength(Object.keys(DEFAULT_SETTINGS.weights).length);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].totalFlips).toBeLessThanOrEqual(result[i - 1].totalFlips);
    }
  });

  it('flips no decisions on a sample sitting far from the threshold', () => {
    // A single overwhelming sample stays escalated under any ±25% perturbation.
    const settled: Sample[] = [mkSample('tp', 'hot', { signal: 100, estimatedBand: 'very_high' }, lab(5000))];
    const result = weightSensitivity(settled, sites, DEFAULT_SETTINGS);
    expect(result.every((w) => w.totalFlips === 0)).toBe(true);
  });

  it('detects a weight that does change decisions near the threshold', () => {
    // Tuned to sit just under the escalation threshold, so raising the dominant
    // signal weight tips it over.
    const borderline: Settings = {
      ...DEFAULT_SETTINGS,
      thresholds: { medium: 10, high: 20, critical: 90 },
    };
    const onEdge: Sample[] = [mkSample('edge', 'clean', { signal: 60, estimatedBand: 'elevated' })];
    const result = weightSensitivity(onEdge, sites, borderline, 0.9);
    expect(result.some((w) => w.totalFlips > 0)).toBe(true);
  });
});
