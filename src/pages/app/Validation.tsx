// Model validation page. Deliberately leads with what the analysis CANNOT show:
// the weights are an expert prior, the demo dataset is synthetic, and the
// confirmed-sample count is tiny. The threshold sweep and sensitivity analysis
// are structural properties of the model and stand on their own.

import { useMemo } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useApp } from '../../store/AppStore';
import { Card, PageHeader } from '../../components/ui';
import { GUIDELINE_NG_L, backtest, thresholdSweep, weightSensitivity } from '../../lib/validation';
import { WEIGHT_LABELS } from '../../lib/labels';

const pct = (v: number | undefined) => (v === undefined ? '—' : `${Math.round(v * 100)}%`);

function MatrixCell({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: number;
  hint: string;
  tone: 'good' | 'bad' | 'danger';
}) {
  const tones = {
    good: 'bg-teal-50 text-teal-900 ring-teal-200',
    bad: 'bg-amber-50 text-amber-900 ring-amber-200',
    danger: 'bg-red-50 text-red-900 ring-red-200',
  } as const;
  return (
    <div className={`rounded-lg p-4 ring-1 ring-inset ${tones[tone]}`}>
      <p className="text-xs font-semibold tracking-wide uppercase opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs opacity-80">{hint}</p>
    </div>
  );
}

export default function Validation() {
  const { state } = useApp();
  const { samples, sites, settings } = state;

  const result = useMemo(() => backtest(samples, sites, settings), [samples, sites, settings]);
  const sweep = useMemo(() => thresholdSweep(samples, sites, settings), [samples, sites, settings]);
  const sensitivity = useMemo(
    () => weightSensitivity(samples, sites, settings),
    [samples, sites, settings],
  );

  const sweepData = useMemo(
    () =>
      sweep.map((p) => ({
        threshold: p.threshold,
        escalationRate: Math.round(p.escalationRate * 100),
        missedExceedances: p.missedExceedances,
      })),
    [sweep],
  );

  return (
    <div>
      <PageHeader
        title="Model validation"
        subtitle="How the risk model behaves, where it is fragile, and what this analysis does not prove."
      />

      <Card className="border-amber-200 bg-amber-50/60 p-5">
        <h2 className="text-sm font-semibold text-amber-900">Read this first</h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-900/90">
          The scoring weights are a <strong>hand-tuned expert prior</strong>, not a statistically
          calibrated model, and the data in this demo is synthetic. The back-test below is
          therefore a demonstration of the validation protocol we would run against a real
          dataset — it is <strong>not</strong> evidence that the model is accurate. The threshold
          sweep and weight-sensitivity analysis are different: they describe the structure of the
          scoring model itself, and hold regardless of how much confirmatory data exists.
        </p>
      </Card>

      <Card className="mt-6 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Retrospective back-test against laboratory results
          </h2>
          <span className="text-xs font-medium text-slate-500">
            n = {result.n} confirmed sample{result.n === 1 ? '' : 's'}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          Each sample that has been to a laboratory is compared against what the model recommended
          before the result came back. Exceedance is defined as sum-PFAS ≥ {GUIDELINE_NG_L} ng/L
          (the EU Drinking Water Directive parametric value).
        </p>

        {result.n === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            No samples have laboratory results yet, so there is nothing to back-test.
          </p>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MatrixCell
                label="True positives"
                value={result.matrix.truePositives}
                hint="Escalated, and the lab confirmed an exceedance."
                tone="good"
              />
              <MatrixCell
                label="True negatives"
                value={result.matrix.trueNegatives}
                hint="Correctly not escalated. This is where the saving comes from."
                tone="good"
              />
              <MatrixCell
                label="False positives"
                value={result.matrix.falsePositives}
                hint="Escalated, but the lab came back clean. Wasted analysis cost."
                tone="bad"
              />
              <MatrixCell
                label="False negatives"
                value={result.matrix.falseNegatives}
                hint="Missed exceedance. The error that actually matters."
                tone="danger"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Sensitivity
                </p>
                <p className="mt-0.5 text-lg font-semibold text-slate-900">
                  {pct(result.sensitivity)}
                </p>
                <p className="text-xs text-slate-500">
                  Share of real exceedances caught. The safety-critical measure — a triage tool
                  that misses contamination is worse than no tool.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Specificity
                </p>
                <p className="mt-0.5 text-lg font-semibold text-slate-900">
                  {pct(result.specificity)}
                </p>
                <p className="text-xs text-slate-500">
                  Share of clean samples correctly not escalated. This is what generates the cost
                  saving.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Precision
                </p>
                <p className="mt-0.5 text-lg font-semibold text-slate-900">
                  {pct(result.precision)}
                </p>
                <p className="text-xs text-slate-500">
                  Share of escalations that were justified after the fact.
                </p>
              </div>
            </div>

            <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
              With n = {result.n}, these rates carry no statistical weight — and the denominator for
              a false-negative claim is confirmed <em>exceedances</em>, of which there is exactly
              one. The 95% interval on sensitivity spans roughly 2.5%&ndash;100%. We report the n
              and refuse the rate.
            </p>
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 ring-1 ring-amber-200 ring-inset">
              <strong>The sharper limitation.</strong> The confirmed samples measured 34, 41 and
              1,840 ng/L — nothing between 41 and 1,840. Because of that gap,{' '}
              <strong>every escalation threshold from 23 to 72 produces an identical confusion
              matrix</strong>, so this back-test contains no information about where the threshold
              belongs. No confirmed sample falls anywhere near the decision boundary, which is the
              only region triage actually decides. A pilot has to be stratified to fill it.
            </p>
          </>
        )}
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-slate-900">
          Escalation threshold: what it costs, and what it misses
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Moving the escalation threshold trades analysis budget against the risk of missing a
          contaminated sample. This curve is the decision a consultancy actually has to make, and
          it is a property of the scoring model rather than of any particular dataset.
        </p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sweepData} margin={{ top: 8, right: 8, bottom: 16, left: 0 }}>
              <CartesianGrid vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="threshold"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#475569', fontSize: 12 }}
                label={{
                  value: 'Escalation threshold (score)',
                  position: 'insideBottom',
                  offset: -2,
                  style: { fill: '#94a3b8', fontSize: 11 },
                }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                width={52}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                unit="%"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                width={28}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#e2e8f0' }}
                labelFormatter={(v) => `Threshold ${v}`}
                formatter={(value, name) =>
                  name === 'Escalation rate'
                    ? [`${value}%`, name]
                    : [`${value}`, 'Missed exceedances']
                }
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="escalationRate"
                name="Escalation rate"
                stroke="#0d9488"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="missedExceedances"
                name="Missed exceedances"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          The current escalation threshold is {settings.thresholds.high}. Lowering it catches more
          contamination and costs more in laboratory analysis; raising it saves money and starts
          missing exceedances. Aegis makes that trade explicit rather than burying it.
        </p>
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-slate-900">
          Weight sensitivity — how far each weight must move to change a decision
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Each weight is scaled while the others are renormalised to hold the total at 100, so a
          changed decision reflects that factor&rsquo;s relative importance rather than a shift in
          the overall scale. The bar shows the <strong>breakdown point</strong>: the smallest change
          to that weight that flips any escalate / hold decision. Shorter is more influential.
        </p>
        <div className="mt-4 space-y-2">
          {sensitivity.map((w) => {
            const bp = w.breakdownPoint;
            return (
              <div key={w.weight} className="flex items-center gap-3">
                <span className="w-56 shrink-0 truncate text-sm text-slate-700">
                  {WEIGHT_LABELS[w.weight]}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${bp === undefined ? 'bg-slate-300' : 'bg-teal-600'}`}
                    style={{ width: `${Math.min(1, bp ?? 1) * 100}%` }}
                  />
                </div>
                <span className="w-32 shrink-0 text-right text-xs text-slate-500">
                  {bp === undefined ? 'over 100%' : `${Math.round(bp * 100)}%`}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <strong>Why this replaced a simpler statistic.</strong> We previously reported how many
          decisions each weight flips under a fixed ±25% perturbation, and concluded the model was
          over-parameterised because most weights flipped none. That conclusion was an arithmetic
          artefact: a ±25% change to a weight of <em>w</em> moves any score by at most 0.25<em>w</em>,
          and the closest sample here sits 4 points from the threshold — so every weight below 16
          was incapable of flipping anything before the code ran. The breakdown point asks the
          question that actually has an answer.
        </p>
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-slate-900">What would make this real</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
          <li>
            A paired dataset — field screening signal alongside LC-MS/MS confirmation for the same
            sample — of order 100+ samples across varied site types.
          </li>
          <li>
            Fit the weights against that data rather than asserting them, and report sensitivity
            with a confidence interval instead of a point estimate.
          </li>
          <li>
            Choose the operating threshold explicitly from the curve above, against a stated
            tolerance for missed exceedances rather than a round number.
          </li>
          <li>
            Hold out a test set, and re-validate per site archetype — an airfield and a rural
            borehole should not be assumed to share a calibration.
          </li>
        </ol>
      </Card>
    </div>
  );
}
