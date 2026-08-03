// Model validation — retrospective back-test, threshold sweep, weight sensitivity.
//
// The honest position on all of this: the weights in DEFAULT_SETTINGS are a
// hand-tuned expert prior, not a calibrated model. Nothing here turns them into
// one. What these functions do is make the model's behaviour *inspectable*:
//
//   backtest()          — how the recommendation compares with lab outcomes,
//                         on however many confirmed samples exist. Small n is a
//                         real limitation and the caller must say so.
//   thresholdSweep()    — the cost/safety trade-off curve. This is a structural
//                         property of the scoring model and is informative
//                         regardless of how many lab results are available.
//   weightSensitivity() — which weights actually change decisions, and which
//                         are decorative. Also structural.
//
// Pure and dependency-free, same as riskEngine, so it can be unit-tested and
// reused by the UI, a poster figure, or a future calibration script.

import type { Sample, Settings, Site } from '../types';
import { assessRisk, latestScreening } from './riskEngine';

/**
 * EU Drinking Water Directive 2020/2184 "Sum of PFAS" parametric value:
 * 0.10 µg/L = 100 ng/L. Used as the exceedance test for back-testing.
 */
export const GUIDELINE_NG_L = 100;

export interface ScoredSample {
  sampleId: string;
  code: string;
  score: number;
  /**
   * Whether the sample has a field screening result. Samples without one score
   * on site context alone and the engine recommends screening them, not sending
   * them to a laboratory — so they must not count toward an escalation rate.
   */
  screened: boolean;
  /** The model said this is worth paying a laboratory for. */
  escalated: boolean;
  /** Sum-PFAS from confirmatory analysis, when the sample has been to a lab. */
  labNgL?: number;
  /** Whether the lab result exceeded the guideline. Undefined without a lab result. */
  exceeded?: boolean;
}

export interface ConfusionMatrix {
  /** Escalated, and the lab confirmed an exceedance. Money well spent. */
  truePositives: number;
  /** Escalated, but the lab came back clean. Wasted analysis cost. */
  falsePositives: number;
  /** Not escalated, but the lab would have found an exceedance. The dangerous error. */
  falseNegatives: number;
  /** Correctly not escalated. This is where the saving comes from. */
  trueNegatives: number;
}

export interface BacktestResult {
  matrix: ConfusionMatrix;
  /** Samples with a lab result — the size of the evidence base. */
  n: number;
  /** TP / (TP + FN): share of real exceedances the model caught. Undefined when no exceedances. */
  sensitivity?: number;
  /** TN / (TN + FP): share of clean samples correctly not escalated. */
  specificity?: number;
  /** TP / (TP + FP): share of escalations that were justified. */
  precision?: number;
  samples: ScoredSample[];
}

/** Score every sample that belongs to a known site. */
export function scoreAll(samples: Sample[], sites: Site[], settings: Settings): ScoredSample[] {
  const byId = new Map(sites.map((s) => [s.id, s]));
  const out: ScoredSample[] = [];
  for (const sample of samples) {
    const site = byId.get(sample.siteId);
    if (!site) continue;
    const { score, action } = assessRisk(sample, site, settings);
    out.push({
      sampleId: sample.id,
      code: sample.code,
      score,
      screened: latestScreening(sample) !== undefined,
      escalated: action === 'lab_confirm' || action === 'urgent',
      labNgL: sample.labResult?.sumPfasNgL,
      exceeded:
        sample.labResult === undefined
          ? undefined
          : sample.labResult.sumPfasNgL >= GUIDELINE_NG_L,
    });
  }
  return out;
}

/**
 * Compare the model's escalate/don't-escalate call against confirmatory lab
 * results, for every sample that has one.
 *
 * Callers MUST report `n` alongside any rate derived from this. With a handful
 * of confirmed samples these rates are illustrative of the method, not evidence
 * about the model.
 */
export function backtest(samples: Sample[], sites: Site[], settings: Settings): BacktestResult {
  const scored = scoreAll(samples, sites, settings).filter((s) => s.exceeded !== undefined);
  const matrix: ConfusionMatrix = {
    truePositives: 0,
    falsePositives: 0,
    falseNegatives: 0,
    trueNegatives: 0,
  };
  for (const s of scored) {
    if (s.escalated && s.exceeded) matrix.truePositives++;
    else if (s.escalated && !s.exceeded) matrix.falsePositives++;
    else if (!s.escalated && s.exceeded) matrix.falseNegatives++;
    else matrix.trueNegatives++;
  }
  const { truePositives: tp, falsePositives: fp, falseNegatives: fn, trueNegatives: tn } = matrix;
  const ratio = (num: number, den: number) => (den === 0 ? undefined : num / den);
  return {
    matrix,
    n: scored.length,
    sensitivity: ratio(tp, tp + fn),
    specificity: ratio(tn, tn + fp),
    precision: ratio(tp, tp + fp),
    samples: scored,
  };
}

export interface ThresholdPoint {
  /** Candidate value for the "High" (escalate) threshold. */
  threshold: number;
  /** Samples that would be sent to a laboratory at this threshold. */
  escalated: number;
  /** Escalated as a share of all screened samples. Drives the cost model. */
  escalationRate: number;
  /** Confirmed exceedances that would NOT have been escalated. The safety cost. */
  missedExceedances: number;
}

/**
 * Sweep the escalation threshold and report what it costs and what it misses.
 *
 * This is the curve a consultancy actually needs: lowering the threshold buys
 * safety with analysis budget. Because a sample's score does not depend on the
 * thresholds, scores are computed once and reused.
 */
export function thresholdSweep(
  samples: Sample[],
  sites: Site[],
  settings: Settings,
  step = 5,
): ThresholdPoint[] {
  const scored = scoreAll(samples, sites, settings);
  const screened = scored.filter((s) => s.screened);
  const points: ThresholdPoint[] = [];
  for (let threshold = step; threshold <= 100; threshold += step) {
    const escalated = screened.filter((s) => s.score >= threshold);
    points.push({
      threshold,
      escalated: escalated.length,
      escalationRate: screened.length === 0 ? 0 : escalated.length / screened.length,
      missedExceedances: scored.filter((s) => s.exceeded === true && s.score < threshold).length,
    });
  }
  return points;
}

export interface WeightSensitivity {
  weight: keyof Settings['weights'];
  /** Escalation decisions that flip when this weight is reduced by `delta`. */
  flipsWhenReduced: number;
  /** Escalation decisions that flip when this weight is increased by `delta`. */
  flipsWhenIncreased: number;
  /** Total decisions affected — the headline "does this weight matter?" number. */
  totalFlips: number;
  /**
   * Smallest fractional change to this weight, in either direction, that flips
   * at least one escalation decision. Undefined if nothing flips within
   * `maxDelta`. See `breakdownPoints` for why this is the better statistic.
   */
  breakdownPoint?: number;
}

/**
 * Rescale one weight and renormalise the rest so the total is unchanged.
 *
 * Renormalising matters here and the naive version was wrong. Scores are
 * compared against a FIXED threshold, so if you scale one weight and leave the
 * others alone, the maximum achievable score moves too — and you can no longer
 * tell whether a decision flipped because that factor matters or merely because
 * the whole scale shifted underneath the threshold. Holding the total constant
 * isolates the weight's *relative* contribution, which is the question being
 * asked.
 */
function reweight(settings: Settings, key: keyof Settings['weights'], factor: number): Settings {
  const w = settings.weights;
  const keys = Object.keys(w) as Array<keyof Settings['weights']>;
  const total = keys.reduce((sum, k) => sum + w[k], 0);
  const target = w[key] * factor;
  const restTotal = total - w[key];
  const restTarget = total - target;
  // If the perturbed weight would consume the entire budget there is nothing
  // left to renormalise into; fall back to the unrenormalised form.
  const scale = restTotal === 0 ? 1 : restTarget / restTotal;
  const next = {} as Settings['weights'];
  for (const k of keys) next[k] = k === key ? target : w[k] * scale;
  return { ...settings, weights: next };
}

/**
 * One-at-a-time perturbation: vary each weight by ±`delta` (default 25%),
 * renormalising the others, and count how many escalate/don't-escalate
 * decisions change.
 *
 * ⚠️ READ BEFORE QUOTING A FLIP COUNT. On a small dataset this statistic is
 * close to meaningless, and saying so is more defensible than reporting it. A
 * ±25% change to a weight of w moves any score by at most 0.25·w. If the
 * closest sample sits 4 points from the threshold, then every weight below 16
 * is arithmetically incapable of flipping anything — the "finding" that most
 * weights change no decision is fixed before the code runs. Report
 * `breakdownPoints` instead, which asks how far each weight would have to move.
 */
export function weightSensitivity(
  samples: Sample[],
  sites: Site[],
  settings: Settings,
  delta = 0.25,
): WeightSensitivity[] {
  const baseline = scoreAll(samples, sites, settings);
  const baselineById = new Map(baseline.map((s) => [s.sampleId, s.escalated]));

  const countFlips = (next: Settings) =>
    scoreAll(samples, sites, next).filter((s) => baselineById.get(s.sampleId) !== s.escalated)
      .length;

  const keys = Object.keys(settings.weights) as Array<keyof Settings['weights']>;
  return keys
    .map((weight) => {
      const flipsWhenReduced = countFlips(reweight(settings, weight, 1 - delta));
      const flipsWhenIncreased = countFlips(reweight(settings, weight, 1 + delta));

      // How far does this weight actually have to move before anything changes?
      let breakdownPoint: number | undefined;
      for (let d = 0.05; d <= 1; d = Math.round((d + 0.05) * 100) / 100) {
        if (
          countFlips(reweight(settings, weight, 1 - d)) > 0 ||
          countFlips(reweight(settings, weight, 1 + d)) > 0
        ) {
          breakdownPoint = d;
          break;
        }
      }

      return {
        weight,
        flipsWhenReduced,
        flipsWhenIncreased,
        totalFlips: flipsWhenReduced + flipsWhenIncreased,
        breakdownPoint,
      };
    })
    .sort((a, b) => {
      // Rank by how little it takes to matter; weights that never flip go last.
      const ab = a.breakdownPoint ?? Infinity;
      const bb = b.breakdownPoint ?? Infinity;
      if (ab !== bb) return ab - bb;
      return b.totalFlips - a.totalFlips;
    });
}
