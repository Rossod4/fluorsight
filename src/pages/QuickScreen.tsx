// One-screen field entry: a fluorescence reading, where you are, and a few
// facts about the site — scored live by the same engine the rest of the app
// uses. Public route, no project setup, no login.
//
// Result is ephemeral by default. Saving is opt-in, and files into its own
// "Field screens" project, so a visitor's readings never mix into the seed
// data the published figures are computed from.

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Disclaimer, RiskBadge } from '../components/ui';
import { useApp, uid } from '../store/AppStore';
import { assessRisk } from '../lib/riskEngine';
import { SENSITIVITY_LABELS, SOURCE_TYPE_LABELS } from '../lib/labels';
import {
  DEFAULT_CHECKLIST,
  EMPTY_RISK_FACTORS,
  buildQuickAssessment,
  checklistReasons,
  confidenceFromChecklist,
  type QualityChecklist,
} from '../lib/quickScreen';
import type { Sensitivity, SiteRiskFactors, SourceType } from '../types';

const FACTOR_CHIPS: Array<{ key: keyof SiteRiskFactors; label: string }> = [
  { key: 'fireTrainingOrAirport', label: 'Airfield / fire-training ground' },
  { key: 'priorLabConfirmedNearby', label: 'PFAS confirmed nearby' },
  { key: 'landfill', label: 'Landfill' },
  { key: 'industrial', label: 'Industrial site' },
  { key: 'wastewaterTreatment', label: 'Wastewater works' },
  { key: 'historicalContamination', label: 'Known historical contamination' },
];

const SOURCE_TYPES = Object.keys(SOURCE_TYPE_LABELS) as SourceType[];
const SENSITIVITIES: Sensitivity[] = ['low', 'medium', 'high'];

const chipClass = (on: boolean) =>
  `rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
    on
      ? 'bg-teal-600 text-white ring-teal-600'
      : 'bg-white text-slate-600 ring-slate-300 hover:bg-slate-50'
  }`;

export default function QuickScreen() {
  const { state, dispatch } = useApp();

  const [signal, setSignal] = useState(45);
  const [sourceType, setSourceType] = useState<SourceType>('groundwater');
  const [sensitivity, setSensitivity] = useState<Sensitivity>('medium');
  const [riskFactors, setRiskFactors] = useState<SiteRiskFactors>({ ...EMPTY_RISK_FACTORS });

  const [checklistOpen, setChecklistOpen] = useState(false);
  const [useChecklist, setUseChecklist] = useState(false);
  const [checklist, setChecklist] = useState<QualityChecklist>({ ...DEFAULT_CHECKLIST });

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [label, setLabel] = useState('');

  const [saved, setSaved] = useState<string | null>(null);

  const confidence = useChecklist ? confidenceFromChecklist(checklist) : 'medium';

  const { assessment, pair } = useMemo(() => {
    const built = buildQuickAssessment({
      signal,
      confidence,
      sourceType,
      sensitivity,
      riskFactors,
      lat: coords?.lat,
      lng: coords?.lng,
      label,
    });
    return { assessment: assessRisk(built.sample, built.site, state.settings), pair: built };
  }, [signal, confidence, sourceType, sensitivity, riskFactors, coords, label, state.settings]);

  function locate() {
    if (!('geolocation' in navigator)) {
      setLocError('This browser does not support location.');
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: +pos.coords.latitude.toFixed(5), lng: +pos.coords.longitude.toFixed(5) });
        setLocating(false);
      },
      (err) => {
        setLocError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission denied — enter it manually below.'
            : 'Could not get a location — enter it manually below.',
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function save() {
    let project = state.projects.find((p) => p.name === 'Field screens');
    const now = new Date().toISOString();
    if (!project) {
      project = { id: uid('prj'), name: 'Field screens', description: 'Readings logged from the quick screen.', createdAt: now };
      dispatch({ type: 'addProject', project });
    }
    const site = { ...pair.site, id: uid('site'), projectId: project.id, createdAt: now };
    dispatch({ type: 'addSite', site });
    const n = state.samples.length + 1;
    dispatch({
      type: 'addSample',
      sample: {
        ...pair.sample,
        id: uid('smp'),
        siteId: site.id,
        code: `FS-${String(n).padStart(3, '0')}`,
        collectedAt: now,
        screenings: pair.sample.screenings.map((s) => ({ ...s, id: uid('scr'), takenAt: now })),
        history: [{ status: 'screened', at: now }],
      },
    });
    setSaved(site.name);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Quick screen</h1>
      <p className="mt-2 text-sm text-slate-600">
        One cartridge reading, a few facts about where it came from, and you get a recommendation —
        with every point in the score attributed. Nothing is saved unless you choose to save it.
      </p>

      <div className="mt-8 grid gap-6">
        {/* ---- 1. The reading ---- */}
        <Card className="p-5">
          <div className="flex items-baseline justify-between">
            <label htmlFor="signal" className="text-sm font-medium text-slate-700">
              1 · Fluorescence change from baseline
            </label>
            <span className="text-2xl font-semibold tabular-nums text-slate-900">{signal}%</span>
          </div>
          <input
            id="signal"
            type="range"
            min={0}
            max={100}
            value={signal}
            onChange={(e) => setSignal(Number(e.target.value))}
            className="mt-3 w-full accent-teal-600"
          />
          <p className="mt-2 text-xs text-slate-500">
            The drop in signal as PFAS displaces the dye, as a percentage of your calibration
            maximum. We record the change, never an absolute — so this produces a rank, not a
            concentration.
          </p>

          <button
            type="button"
            onClick={() => { setChecklistOpen(!checklistOpen); setUseChecklist(true); }}
            className="mt-3 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {checklistOpen ? 'Hide' : 'How reliable was this reading?'}
          </button>

          {checklistOpen && (
            <div className="mt-4 grid gap-3 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                We don't ask how well you think you did — we ask what you saw. Worst case governs.
              </p>
              <Choice label="Turbidity" value={checklist.turbidity}
                onChange={(v) => setChecklist({ ...checklist, turbidity: v as QualityChecklist['turbidity'] })}
                options={[['clear', 'Clear'], ['cloudy', 'Cloudy'], ['opaque', 'Opaque']]} />
              <Choice label="Colour" value={checklist.colour}
                onChange={(v) => setChecklist({ ...checklist, colour: v as QualityChecklist['colour'] })}
                options={[['clear', 'Clear'], ['tinted', 'Tinted'], ['brown', 'Brown / peaty']]} />
              <Choice label="Volume drawn" value={checklist.volumeDrawn}
                onChange={(v) => setChecklist({ ...checklist, volumeDrawn: v as QualityChecklist['volumeDrawn'] })}
                options={[['full', 'Full 250 mL'], ['partial', '150–250 mL'], ['low', 'Under 150 mL']]} />
              <Choice label="Duplicates" value={checklist.duplicates}
                onChange={(v) => setChecklist({ ...checklist, duplicates: v as QualityChecklist['duplicates'] })}
                options={[['not_run', 'Not run'], ['agree', 'Agree'], ['differ_moderate', '10–25% apart'], ['differ_wide', '>25% apart']]} />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={checklist.stayedWet} className="accent-teal-600"
                  onChange={(e) => setChecklist({ ...checklist, stayedWet: e.target.checked })} />
                Cartridge stayed wet throughout
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={checklist.baselineSameCartridge} className="accent-teal-600"
                  onChange={(e) => setChecklist({ ...checklist, baselineSameCartridge: e.target.checked })} />
                Baseline taken on this same cartridge
              </label>
              <p className="rounded-md bg-amber-50 p-2 text-xs text-amber-800">
                These thresholds are our designed starting protocol, <strong>not calibrated from
                data</strong> — no bench experiment has been run yet. Setting them properly is the
                first job of the pilot.
              </p>
            </div>
          )}
        </Card>

        {/* ---- 2. Where ---- */}
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-700">2 · Where was it taken?</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button type="button" onClick={locate} disabled={locating}>
              {locating ? 'Locating…' : 'Use my location'}
            </Button>
            {coords && (
              <span className="text-sm tabular-nums text-slate-600">
                {coords.lat}, {coords.lng}
              </span>
            )}
          </div>
          {locError && <p className="mt-2 text-xs text-amber-700">{locError}</p>}
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <input className={fieldClass} placeholder="Name this location (optional)"
              value={label} onChange={(e) => setLabel(e.target.value)} />
            <input className={fieldClass} placeholder="Latitude" inputMode="decimal"
              value={coords?.lat ?? ''} onChange={(e) => setCoords({ lat: Number(e.target.value), lng: coords?.lng ?? 0 })} />
            <input className={fieldClass} placeholder="Longitude" inputMode="decimal"
              value={coords?.lng ?? ''} onChange={(e) => setCoords({ lat: coords?.lat ?? 0, lng: Number(e.target.value) })} />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Location is recorded and mapped, but <strong>does not yet affect the score</strong> —
            the site factors below are entered by hand. Deriving them automatically from
            coordinates, against published landfill, airfield and industrial datasets, is planned
            and not built.
          </p>
        </Card>

        {/* ---- 3. Site context ---- */}
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-700">3 · About the site</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs text-slate-500">What is the water?</span>
              <select className={fieldClass} value={sourceType} onChange={(e) => setSourceType(e.target.value as SourceType)}>
                {SOURCE_TYPES.map((s) => <option key={s} value={s}>{SOURCE_TYPE_LABELS[s]}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-slate-500">Receptor sensitivity</span>
              <select className={fieldClass} value={sensitivity} onChange={(e) => setSensitivity(e.target.value as Sensitivity)}>
                {SENSITIVITIES.map((s) => <option key={s} value={s}>{SENSITIVITY_LABELS[s]}</option>)}
              </select>
            </label>
          </div>
          <p className="mt-4 text-xs text-slate-500">Anything nearby? Tap all that apply.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FACTOR_CHIPS.map((f) => (
              <button key={f.key} type="button" className={chipClass(riskFactors[f.key])}
                aria-pressed={riskFactors[f.key]}
                onClick={() => setRiskFactors({ ...riskFactors, [f.key]: !riskFactors[f.key] })}>
                {f.label}
              </button>
            ))}
          </div>
        </Card>

        {/* ---- Result ---- */}
        <Card className="border-teal-200 bg-teal-50/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Recommendation</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{assessment.actionLabel}</p>
            </div>
            <RiskBadge band={assessment.band} score={assessment.score} />
          </div>

          {assessment.uncertaintyNote && (
            <p className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
              {assessment.uncertaintyNote}
            </p>
          )}

          {useChecklist && checklistReasons(checklist).length > 0 && (
            <ul className="mt-3 list-inside list-disc text-xs text-slate-600">
              {checklistReasons(checklist).map((r) => <li key={r}>{r}</li>)}
            </ul>
          )}

          <p className="mt-4 text-xs font-medium tracking-wide text-slate-500 uppercase">Where the points came from</p>
          <ul className="mt-2 divide-y divide-slate-200">
            {assessment.drivers.filter((d) => d.points > 0).map((d) => (
              <li key={d.key} className="flex items-baseline justify-between py-1.5 text-sm">
                <span className="text-slate-700">{d.label}</span>
                <span className="tabular-nums text-slate-500">{d.points} / {d.max}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-slate-500">
            No concentration is estimated. There is no calibration from fluorescence change to
            ng/L — the output is a rank that decides whether accredited LC-MS/MS is worth paying
            for.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button type="button" variant="secondary" onClick={save} disabled={!!saved}>
              {saved ? 'Saved' : 'Save to a project'}
            </Button>
            {saved && (
              <span className="text-sm text-slate-600">
                Saved as “{saved}”. <Link className="font-medium text-teal-700" to="/app/queue">Open the queue →</Link>
              </span>
            )}
          </div>
        </Card>

        <Disclaimer />
      </div>
    </div>
  );
}

const fieldClass =
  'mt-1 block w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600';

function Choice({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {options.map(([v, l]) => (
          <button key={v} type="button" onClick={() => onChange(v)} aria-pressed={value === v}
            className={`rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors ${
              value === v ? 'bg-slate-800 text-white ring-slate-800' : 'bg-white text-slate-600 ring-slate-300 hover:bg-slate-50'
            }`}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
