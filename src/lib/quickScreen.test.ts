import { describe, expect, it } from 'vitest';
import {
  DEFAULT_CHECKLIST,
  EMPTY_RISK_FACTORS,
  buildQuickAssessment,
  checklistReasons,
  confidenceFromChecklist,
} from './quickScreen';
import { DEFAULT_SETTINGS, assessRisk } from './riskEngine';
import type { QuickScreenInput } from './quickScreen';

const base: QuickScreenInput = {
  signal: 50,
  confidence: 'medium',
  sourceType: 'groundwater',
  sensitivity: 'medium',
  riskFactors: { ...EMPTY_RISK_FACTORS },
};

const ALL_CLEAN = {
  turbidity: 'clear',
  colour: 'clear',
  stayedWet: 'yes',
  baselineSameCartridge: 'yes',
  volumeDrawn: 'full',
  duplicates: 'agree',
} as const;

describe('confidenceFromChecklist', () => {
  it('does not assume a good read from an empty checklist', () => {
    // Every field starts unrecorded. Silence is not evidence of a clean read,
    // so this must not resolve to high.
    expect(confidenceFromChecklist(DEFAULT_CHECKLIST)).toBe('medium');
  });

  it('is high only when every condition was affirmatively observed clean', () => {
    expect(confidenceFromChecklist(ALL_CLEAN)).toBe('high');
    // one field left blank is enough to withhold high
    expect(confidenceFromChecklist({ ...ALL_CLEAN, volumeDrawn: 'unrecorded' })).toBe('medium');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, duplicates: 'unrecorded' })).toBe('medium');
  });

  it('drops to medium on any amber condition', () => {
    expect(confidenceFromChecklist({ ...ALL_CLEAN, turbidity: 'cloudy' })).toBe('medium');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, colour: 'tinted' })).toBe('medium');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, volumeDrawn: 'partial' })).toBe('medium');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, duplicates: 'differ_moderate' })).toBe('medium');
  });

  it('drops to low on any red condition', () => {
    expect(confidenceFromChecklist({ ...ALL_CLEAN, turbidity: 'opaque' })).toBe('low');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, colour: 'brown' })).toBe('low');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, stayedWet: 'no' })).toBe('low');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, baselineSameCartridge: 'no' })).toBe('low');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, volumeDrawn: 'low' })).toBe('low');
    expect(confidenceFromChecklist({ ...ALL_CLEAN, duplicates: 'differ_wide' })).toBe('low');
  });

  it('lets the worst condition govern, not the count of them', () => {
    expect(
      confidenceFromChecklist({
        ...ALL_CLEAN,
        turbidity: 'cloudy',
        colour: 'tinted',
        volumeDrawn: 'low',
      }),
    ).toBe('low');
  });

  it('explains itself', () => {
    expect(checklistReasons(ALL_CLEAN)).toEqual([]);
    expect(checklistReasons({ ...ALL_CLEAN, stayedWet: 'no' })).toHaveLength(1);
    // an incomplete record says so rather than passing silently
    expect(checklistReasons(DEFAULT_CHECKLIST)[0]).toMatch(/not every condition was recorded/i);
  });
});

describe('buildQuickAssessment', () => {
  it('never invents a concentration band', () => {
    // There is no calibration from fluorescence % to ng/L, so the band must stay
    // at 'nd' and let the signal lead the score.
    const { sample } = buildQuickAssessment({ ...base, signal: 100 });
    expect(sample.screenings[0].estimatedBand).toBe('nd');
  });

  it('clamps the signal to 0-100', () => {
    expect(buildQuickAssessment({ ...base, signal: 250 }).sample.screenings[0].signal).toBe(100);
    expect(buildQuickAssessment({ ...base, signal: -40 }).sample.screenings[0].signal).toBe(0);
  });

  it('a maximum reading alone cannot reach the lab-referral threshold', () => {
    // The property the poster claims: one measurement never escalates a sample
    // on its own under the default weights. 35 points against a threshold of 50.
    const { sample, site } = buildQuickAssessment({
      ...base,
      signal: 100,
      confidence: 'high',
      sourceType: 'leachate',
      sensitivity: 'low',
      riskFactors: { ...EMPTY_RISK_FACTORS },
    });
    const result = assessRisk(sample, site, DEFAULT_SETTINGS);
    expect(result.score).toBeLessThan(DEFAULT_SETTINGS.thresholds.high);
    expect(result.action).not.toBe('lab_confirm');
    expect(result.action).not.toBe('urgent');
  });

  it('escalates once site context agrees', () => {
    const { sample, site } = buildQuickAssessment({
      ...base,
      signal: 100,
      confidence: 'high',
      sourceType: 'private_supply',
      sensitivity: 'high',
      riskFactors: { ...EMPTY_RISK_FACTORS, fireTrainingOrAirport: true },
    });
    const result = assessRisk(sample, site, DEFAULT_SETTINGS);
    expect(result.score).toBeGreaterThanOrEqual(DEFAULT_SETTINGS.thresholds.high);
  });

  it('carries location through without letting it change the score', () => {
    const withLoc = buildQuickAssessment({ ...base, lat: 51.45, lng: -2.6, label: 'Test site' });
    const withoutLoc = buildQuickAssessment(base);
    expect(withLoc.site.lat).toBe(51.45);
    expect(withLoc.site.name).toBe('Test site');
    expect(assessRisk(withLoc.sample, withLoc.site, DEFAULT_SETTINGS).score).toBe(
      assessRisk(withoutLoc.sample, withoutLoc.site, DEFAULT_SETTINGS).score,
    );
  });

  it('low confidence from the checklist never relaxes a recommendation', () => {
    const { sample, site } = buildQuickAssessment({
      ...base,
      signal: 40,
      confidence: confidenceFromChecklist({ ...ALL_CLEAN, stayedWet: 'no' }),
      sourceType: 'leachate',
      sensitivity: 'low',
    });
    const result = assessRisk(sample, site, DEFAULT_SETTINGS);
    expect(result.action).not.toBe('no_action');
    expect(result.uncertaintyNote).toBeTruthy();
  });
});

describe('the point budget the quick screen claims on screen', () => {
  // The result card tells the user "35 screening evidence + 55 site context +
  // 10 repeat positives", and that this page tops out at 90. Those are claims
  // shown to judges, so they are asserted here rather than trusted.
  const maxed = buildQuickAssessment({
    signal: 100,
    confidence: 'high',
    sourceType: 'private_supply', // exposure factor 1.0 -> full 6
    sensitivity: 'high', // factor 1.0 -> full 10
    riskFactors: {
      fireTrainingOrAirport: true,
      landfill: true,
      industrial: true,
      wastewaterTreatment: true,
      historicalContamination: true,
      priorLabConfirmedNearby: true,
    },
  });
  const result = assessRisk(maxed.sample, maxed.site, DEFAULT_SETTINGS);
  const points = (key: string) => result.drivers.find((d) => d.key === key)?.points ?? 0;

  it('gives screening evidence a ceiling of 35', () => {
    expect(points('screeningEvidence')).toBe(35);
  });

  it('gives site context a ceiling of exactly 55', () => {
    const siteContext = result.drivers
      .filter((d) => d.key !== 'screeningEvidence' && d.key !== 'repeatPositives')
      .reduce((sum, d) => sum + d.points, 0);
    expect(siteContext).toBe(55);
  });

  it('cannot award repeat positives, because no band is inferred', () => {
    expect(points('repeatPositives')).toBe(0);
  });

  it('tops out at 90, not 100', () => {
    expect(result.score).toBe(90);
    expect(result.action).toBe('urgent');
  });

  it('the three parts total the full 100 the engine distributes', () => {
    const w = DEFAULT_SETTINGS.weights;
    const siteContextWeights =
      w.fireTrainingOrAirport + w.landfill + w.industrial + w.wastewaterTreatment +
      w.historicalContamination + w.priorLabConfirmedNearby + w.sensitivity + w.sourceType;
    expect(w.screeningEvidence).toBe(35);
    expect(siteContextWeights).toBe(55);
    expect(w.repeatPositives).toBe(10);
    expect(w.screeningEvidence + siteContextWeights + w.repeatPositives).toBe(100);
  });
});
