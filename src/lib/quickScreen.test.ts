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

describe('confidenceFromChecklist', () => {
  it('is high when every condition is clean', () => {
    expect(confidenceFromChecklist(DEFAULT_CHECKLIST)).toBe('high');
  });

  it('drops to medium on any amber condition', () => {
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, turbidity: 'cloudy' })).toBe('medium');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, colour: 'tinted' })).toBe('medium');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, volumeDrawn: 'partial' })).toBe('medium');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, duplicates: 'differ_moderate' })).toBe('medium');
  });

  it('drops to low on any red condition', () => {
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, turbidity: 'opaque' })).toBe('low');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, colour: 'brown' })).toBe('low');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, stayedWet: false })).toBe('low');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, baselineSameCartridge: false })).toBe('low');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, volumeDrawn: 'low' })).toBe('low');
    expect(confidenceFromChecklist({ ...DEFAULT_CHECKLIST, duplicates: 'differ_wide' })).toBe('low');
  });

  it('lets the worst condition govern, not the count of them', () => {
    // one red among otherwise-amber conditions still resolves to low
    expect(
      confidenceFromChecklist({
        ...DEFAULT_CHECKLIST,
        turbidity: 'cloudy',
        colour: 'tinted',
        volumeDrawn: 'low',
      }),
    ).toBe('low');
  });

  it('explains itself', () => {
    expect(checklistReasons(DEFAULT_CHECKLIST)).toEqual([]);
    expect(checklistReasons({ ...DEFAULT_CHECKLIST, stayedWet: false })).toHaveLength(1);
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
      confidence: confidenceFromChecklist({ ...DEFAULT_CHECKLIST, stayedWet: false }),
      sourceType: 'leachate',
      sensitivity: 'low',
    });
    const result = assessRisk(sample, site, DEFAULT_SETTINGS);
    expect(result.action).not.toBe('no_action');
    expect(result.uncertaintyNote).toBeTruthy();
  });
});
