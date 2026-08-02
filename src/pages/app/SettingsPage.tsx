import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../store/AppStore';
import { DEFAULT_SETTINGS } from '../../lib/riskEngine';
import { RISK_COLORS, RISK_FACTOR_LABELS } from '../../lib/labels';
import { Button, Card, Disclaimer, Field, PageHeader, inputClass } from '../../components/ui';
import type { RiskBand, RiskThresholds, RiskWeights, Settings } from '../../types';

const SCREENING_WEIGHT_FIELDS: { key: keyof RiskWeights; label: string; hint: string }[] = [
  {
    key: 'screeningEvidence',
    label: 'Screening evidence',
    hint: 'Maximum points at a full-scale signal or the "very high" (> 500 ng/L) band, at high confidence. Signal and band are one measurement, so we score the stronger of the two rather than both.',
  },
  {
    key: 'repeatPositives',
    label: 'Repeat positive screens',
    hint: 'Maximum points when 3 or more screens reach the elevated band or above.',
  },
];

const FACTOR_WEIGHT_FIELDS: { key: keyof RiskWeights; label: string; hint: string }[] = (
  Object.keys(RISK_FACTOR_LABELS) as (keyof RiskWeights)[]
).map((key) => ({
  key,
  label: RISK_FACTOR_LABELS[key],
  hint: 'Points awarded when this risk factor is present at the site.',
}));

const CONTEXT_WEIGHT_FIELDS: { key: keyof RiskWeights; label: string; hint: string }[] = [
  { key: 'sensitivity', label: 'Receptor sensitivity', hint: 'Maximum points when site sensitivity is "high".' },
  {
    key: 'sourceType',
    label: 'Water source exposure pathway',
    hint: 'Maximum points for the most direct exposure pathway (private supply).',
  },
];

type WeightDraft = Record<keyof RiskWeights, string>;
type ThresholdDraft = Record<keyof RiskThresholds, string>;

function toWeightDraft(weights: RiskWeights): WeightDraft {
  return Object.fromEntries(Object.entries(weights).map(([k, v]) => [k, String(v)])) as WeightDraft;
}
function toThresholdDraft(thresholds: RiskThresholds): ThresholdDraft {
  return Object.fromEntries(Object.entries(thresholds).map(([k, v]) => [k, String(v)])) as ThresholdDraft;
}

const BAND_ORDER: RiskBand[] = ['Low', 'Medium', 'High', 'Critical'];

export default function SettingsPage() {
  const { state, dispatch } = useApp();
  const { settings } = state;

  const [weightDraft, setWeightDraft] = useState<WeightDraft>(() => toWeightDraft(settings.weights));
  const [thresholdDraft, setThresholdDraft] = useState<ThresholdDraft>(() => toThresholdDraft(settings.thresholds));

  useEffect(() => {
    setWeightDraft(toWeightDraft(settings.weights));
    setThresholdDraft(toThresholdDraft(settings.thresholds));
  }, [settings]);

  const parsedWeights = useMemo(() => {
    const out: Partial<RiskWeights> = {};
    let ok = true;
    for (const key of Object.keys(weightDraft) as (keyof RiskWeights)[]) {
      const n = Number(weightDraft[key]);
      if (!Number.isFinite(n) || n < 0 || n > 100) {
        ok = false;
      } else {
        out[key] = n;
      }
    }
    return ok ? (out as RiskWeights) : null;
  }, [weightDraft]);

  const parsedThresholds = useMemo(() => {
    const medium = Number(thresholdDraft.medium);
    const high = Number(thresholdDraft.high);
    const critical = Number(thresholdDraft.critical);
    if (![medium, high, critical].every(Number.isFinite)) return null;
    if (!(medium > 0 && medium < high && high < critical && critical <= 100)) return null;
    return { medium, high, critical };
  }, [thresholdDraft]);

  const thresholdError = parsedThresholds === null ? 'Thresholds must satisfy 0 < medium < high < critical ≤ 100.' : null;

  const valid = parsedWeights !== null && parsedThresholds !== null;
  const draftSettings: Settings | null = valid ? { weights: parsedWeights!, thresholds: parsedThresholds! } : null;
  const dirty = draftSettings !== null && JSON.stringify(draftSettings) !== JSON.stringify(settings);

  function save() {
    if (!draftSettings) return;
    dispatch({ type: 'updateSettings', settings: draftSettings });
  }

  function resetModelDefaults() {
    dispatch({ type: 'updateSettings', settings: structuredClone(DEFAULT_SETTINGS) });
  }

  function resetDemoData() {
    if (
      !window.confirm(
        'Reset all demo data? This discards every project, site, sample and settings change you have made, and restores the original seeded dataset.',
      )
    ) {
      return;
    }
    dispatch({ type: 'reset' });
  }

  function setWeight(key: keyof RiskWeights, value: string) {
    setWeightDraft((d) => ({ ...d, [key]: value }));
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure the risk-scoring model. Aegis is a transparent, editable weighted heuristic — not a black box."
      />

      <div className="space-y-6">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Risk model weights</h2>
          <p className="mt-1 text-xs text-slate-500">
            Each weight is the maximum number of points (of 100) that factor can contribute to a sample's risk
            score.
          </p>

          <h3 className="mt-5 text-xs font-semibold tracking-wide text-slate-500 uppercase">Screening evidence</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCREENING_WEIGHT_FIELDS.map(({ key, label, hint }) => (
              <Field key={key} label={label} hint={hint}>
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  max={100}
                  value={weightDraft[key]}
                  onChange={(e) => setWeight(key, e.target.value)}
                />
              </Field>
            ))}
          </div>

          <h3 className="mt-6 text-xs font-semibold tracking-wide text-slate-500 uppercase">Site context</h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...FACTOR_WEIGHT_FIELDS, ...CONTEXT_WEIGHT_FIELDS].map(({ key, label, hint }) => (
              <Field key={key} label={label} hint={hint}>
                <input
                  className={inputClass}
                  type="number"
                  min={0}
                  max={100}
                  value={weightDraft[key]}
                  onChange={(e) => setWeight(key, e.target.value)}
                />
              </Field>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Risk band thresholds</h2>
          <p className="mt-1 text-xs text-slate-500">The minimum score (of 100) required to reach each band.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Medium ≥">
              <input
                className={inputClass}
                type="number"
                min={1}
                max={99}
                value={thresholdDraft.medium}
                onChange={(e) => setThresholdDraft((d) => ({ ...d, medium: e.target.value }))}
              />
            </Field>
            <Field label="High ≥">
              <input
                className={inputClass}
                type="number"
                min={1}
                max={99}
                value={thresholdDraft.high}
                onChange={(e) => setThresholdDraft((d) => ({ ...d, high: e.target.value }))}
              />
            </Field>
            <Field label="Critical ≥">
              <input
                className={inputClass}
                type="number"
                min={1}
                max={100}
                value={thresholdDraft.critical}
                onChange={(e) => setThresholdDraft((d) => ({ ...d, critical: e.target.value }))}
              />
            </Field>
          </div>
          {thresholdError && <p className="mt-2 text-sm text-red-600">{thresholdError}</p>}

          <ThresholdBar thresholds={parsedThresholds ?? { medium: 30, high: 55, critical: 75 }} />

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={save} disabled={!valid || !dirty}>
              Save changes
            </Button>
            {dirty && valid && <span className="text-xs text-slate-400">Unsaved changes</span>}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Data</h2>
          <p className="mt-1 text-xs text-slate-500">
            Reset the risk model to its shipped defaults, or discard all projects, sites and samples and restore
            the original demo dataset.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={resetModelDefaults}>
              Reset model to defaults
            </Button>
            <Button variant="danger" onClick={resetDemoData}>
              Reset demo data
            </Button>
          </div>
        </Card>

        <Card className="space-y-3 p-5">
          <h2 className="text-sm font-semibold text-slate-900">Model assumptions</h2>
          <p className="text-sm text-slate-600">
            Aegis uses a transparent, weighted scoring model: every point contributed to a sample's risk score is
            attributed to a named, explainable driver. Field screening results are treated as uncertain evidence
            — weighted down at lower confidence — rather than a definitive measurement. The model is deliberately
            modular so it can later be replaced or supplemented by a calibrated sensor model or a trained ML
            model without changing the rest of the application.
          </p>
          <Disclaimer />
        </Card>
      </div>
    </div>
  );
}

function ThresholdBar({ thresholds }: { thresholds: RiskThresholds }) {
  const segments: { band: RiskBand; from: number; to: number }[] = [
    { band: 'Low', from: 0, to: Math.max(0, Math.min(100, thresholds.medium)) },
    { band: 'Medium', from: thresholds.medium, to: Math.max(thresholds.medium, Math.min(100, thresholds.high)) },
    { band: 'High', from: thresholds.high, to: Math.max(thresholds.high, Math.min(100, thresholds.critical)) },
    { band: 'Critical', from: thresholds.critical, to: 100 },
  ];
  return (
    <div className="mt-4">
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {segments.map((seg) => (
          <div
            key={seg.band}
            style={{ width: `${Math.max(0, seg.to - seg.from)}%`, backgroundColor: RISK_COLORS[seg.band] }}
            title={`${seg.band}: ${seg.from}-${seg.to}`}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-slate-400">
        {BAND_ORDER.map((band) => (
          <span key={band} className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: RISK_COLORS[band] }} />
            {band}
          </span>
        ))}
      </div>
    </div>
  );
}
