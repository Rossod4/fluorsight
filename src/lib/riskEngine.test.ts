import { describe, expect, it } from 'vitest';
import { assessRisk, DEFAULT_SETTINGS } from './riskEngine';
import type { Sample, ScreeningResult, Settings, Site } from '../types';

const baseSite: Site = {
  id: 's1',
  projectId: 'p1',
  name: 'Test Site',
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

function mkSample(screenings: ScreeningResult[]): Sample {
  return {
    id: 'sam1',
    siteId: 's1',
    code: 'TST-001',
    collectedAt: '2026-06-10T00:00:00Z',
    status: 'screened',
    history: [],
    screenings,
    };
}

function mkScreening(over: Partial<ScreeningResult>): ScreeningResult {
  return {
    id: 'scr1',
    takenAt: '2026-06-11T00:00:00Z',
    signal: 10,
    estimatedBand: 'nd',
    confidence: 'high',
    ...over,
  };
}

describe('assessRisk', () => {
  it('scores a clean rural sample as Low / no action', () => {
    const result = assessRisk(
      mkSample([mkScreening({ signal: 8, estimatedBand: 'nd' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    expect(result.band).toBe('Low');
    expect(result.action).toBe('no_action');
    expect(result.score).toBeLessThan(DEFAULT_SETTINGS.thresholds.medium);
  });

  it('scores a strong signal at a high-risk sensitive site as Critical / urgent', () => {
    const site: Site = {
      ...baseSite,
      sourceType: 'private_supply',
      sensitivity: 'high',
      riskFactors: {
        ...baseSite.riskFactors,
        fireTrainingOrAirport: true,
        priorLabConfirmedNearby: true,
        historicalContamination: true,
      },
    };
    const result = assessRisk(
      mkSample([
        mkScreening({ id: 'a', signal: 90, estimatedBand: 'very_high', takenAt: '2026-06-12T00:00:00Z' }),
        mkScreening({ id: 'b', signal: 85, estimatedBand: 'very_high', takenAt: '2026-06-11T00:00:00Z' }),
      ]),
      site,
      DEFAULT_SETTINGS,
    );
    expect(result.band).toBe('Critical');
    expect(result.action).toBe('urgent');
  });

  it('recommends screening when there is no screening data', () => {
    const result = assessRisk(mkSample([]), baseSite, DEFAULT_SETTINGS);
    expect(result.action).toBe('screen');
    expect(result.drivers.every((d) => d.key !== 'screeningEvidence')).toBe(true);
  });

  it('scores signal and band as one measurement, not two', () => {
    // Signal and band are the same reading expressed two ways. The score must
    // track the stronger of them, never their sum -- otherwise a single
    // measurement carries nearly half the available points.
    const w = DEFAULT_SETTINGS.weights.screeningEvidence;
    const bandLeads = assessRisk(
      mkSample([mkScreening({ signal: 0, estimatedBand: 'very_high', confidence: 'high' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    const signalLeads = assessRisk(
      mkSample([mkScreening({ signal: 100, estimatedBand: 'nd', confidence: 'high' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    const both = assessRisk(
      mkSample([mkScreening({ signal: 100, estimatedBand: 'very_high', confidence: 'high' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    const evidence = (r: typeof both) =>
      r.drivers.find((d) => d.key === 'screeningEvidence')!.points;

    expect(evidence(bandLeads)).toBeCloseTo(w, 1);
    expect(evidence(signalLeads)).toBeCloseTo(w, 1);
    // Agreeing on both must not score more than either alone.
    expect(evidence(both)).toBeCloseTo(w, 1);
  });

  it('cannot escalate a sample on a single screening reading alone', () => {
    // The strongest possible single read at a site with no risk factors must
    // stay below the lab-referral threshold. Site context has to agree.
    const result = assessRisk(
      mkSample([mkScreening({ signal: 100, estimatedBand: 'very_high', confidence: 'high' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    expect(result.score).toBeLessThan(DEFAULT_SETTINGS.thresholds.high);
    expect(result.action).not.toBe('lab_confirm');
    expect(result.action).not.toBe('urgent');
  });

  it('has weights summing to exactly 100, so the clamp is not load-bearing', () => {
    const sum = Object.values(DEFAULT_SETTINGS.weights).reduce((a, b) => a + b, 0);
    expect(sum).toBe(100);
  });

  it('driver points sum to the reported score (pre-clamp)', () => {
    const result = assessRisk(
      mkSample([mkScreening({ signal: 60, estimatedBand: 'elevated', confidence: 'medium' })]),
      { ...baseSite, sensitivity: 'medium', riskFactors: { ...baseSite.riskFactors, landfill: true } },
      DEFAULT_SETTINGS,
    );
    const sum = result.drivers.reduce((acc, d) => acc + d.points, 0);
    expect(Math.round(sum)).toBe(result.score);
  });

  it('never resolves a non-trivial low-confidence signal to "no action"', () => {
    const result = assessRisk(
      mkSample([mkScreening({ signal: 40, estimatedBand: 'trace', confidence: 'low' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    expect(result.band).toBe('Low');
    expect(result.action).toBe('monitor');
    expect(result.uncertaintyNote).toBeTruthy();
  });

  it('low confidence weights screening evidence down', () => {
    const high = assessRisk(
      mkSample([mkScreening({ signal: 80, estimatedBand: 'high', confidence: 'high' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    const low = assessRisk(
      mkSample([mkScreening({ signal: 80, estimatedBand: 'high', confidence: 'low' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    expect(low.score).toBeLessThan(high.score);
  });

  it('repeat positive screens increase the score', () => {
    const single = assessRisk(
      mkSample([mkScreening({ signal: 70, estimatedBand: 'high' })]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    const repeated = assessRisk(
      mkSample([
        mkScreening({ id: 'a', signal: 70, estimatedBand: 'high', takenAt: '2026-06-12T00:00:00Z' }),
        mkScreening({ id: 'b', signal: 68, estimatedBand: 'high', takenAt: '2026-06-11T00:00:00Z' }),
        mkScreening({ id: 'c', signal: 72, estimatedBand: 'high', takenAt: '2026-06-10T00:00:00Z' }),
      ]),
      baseSite,
      DEFAULT_SETTINGS,
    );
    expect(repeated.score).toBeGreaterThan(single.score);
  });

  it('respects user-configured thresholds', () => {
    const strict: Settings = {
      ...DEFAULT_SETTINGS,
      thresholds: { medium: 5, high: 10, critical: 15 },
    };
    const result = assessRisk(
      mkSample([mkScreening({ signal: 50, estimatedBand: 'elevated' })]),
      baseSite,
      strict,
    );
    expect(result.band).toBe('Critical');
  });

  it('clamps the score to 100', () => {
    const maxed: Site = {
      ...baseSite,
      sourceType: 'private_supply',
      sensitivity: 'high',
      riskFactors: {
        fireTrainingOrAirport: true,
        landfill: true,
        industrial: true,
        wastewaterTreatment: true,
        historicalContamination: true,
        priorLabConfirmedNearby: true,
      },
    };
    const result = assessRisk(
      mkSample([
        mkScreening({ id: 'a', signal: 100, estimatedBand: 'very_high', takenAt: '2026-06-12T00:00:00Z' }),
        mkScreening({ id: 'b', signal: 100, estimatedBand: 'very_high', takenAt: '2026-06-11T00:00:00Z' }),
        mkScreening({ id: 'c', signal: 100, estimatedBand: 'very_high', takenAt: '2026-06-10T00:00:00Z' }),
      ]),
      maxed,
      DEFAULT_SETTINGS,
    );
    expect(result.score).toBe(100);
  });
});
