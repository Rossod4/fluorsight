import { useMemo, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp, uid } from '../../store/AppStore';
import { assessRisk, BAND_LABELS } from '../../lib/riskEngine';
import { STATUS_LABELS, STATUS_ORDER, fmtDate, fmtDateTime } from '../../lib/labels';
import { Button, Card, EmptyState, Field, PageHeader, RiskBadge, StatusBadge, inputClass } from '../../components/ui';
import type { ConcentrationBand, Confidence, LabResult, SampleStatus, ScreeningResult } from '../../types';

const CONFIDENCE_LABELS: Record<Confidence, string> = { low: 'Low', medium: 'Medium', high: 'High' };
const CONCENTRATION_BANDS = Object.keys(BAND_LABELS) as ConcentrationBand[];
const CONFIDENCES: Confidence[] = ['low', 'medium', 'high'];
const GUIDELINE_NGL = 100;

// Statuses that can be manually advanced one step via a workflow button.
// `sent_to_lab -> lab_received` is handled by the Lab result form instead,
// since that transition requires lab data. Any status can move to `closed`.
const MANUAL_ADVANCE_FROM: SampleStatus[] = ['new', 'screened', 'flagged'];

export default function SampleDetail() {
  const { sampleId } = useParams<{ sampleId: string }>();
  const { state } = useApp();
  const { projects, sites, samples, settings } = state;

  const sample = samples.find((s) => s.id === sampleId);
  const site = sample ? sites.find((s) => s.id === sample.siteId) : undefined;
  const project = site ? projects.find((p) => p.id === site.projectId) : undefined;

  const assessment = useMemo(
    () => (sample && site ? assessRisk(sample, site, settings) : undefined),
    [sample, site, settings],
  );

  const sortedScreenings = useMemo(
    () => (sample ? [...sample.screenings].sort((a, b) => b.takenAt.localeCompare(a.takenAt)) : []),
    [sample],
  );

  const sortedHistory = useMemo(
    () => (sample ? [...sample.history].sort((a, b) => b.at.localeCompare(a.at)) : []),
    [sample],
  );

  if (!sample || !site || !assessment) {
    return (
      <EmptyState
        title="Sample not found"
        hint="It may have been deleted."
        action={
          <Link to="/app/projects" className="text-sm font-medium text-teal-700 hover:underline">
            Back to projects
          </Link>
        }
      />
    );
  }

  const isEscalated = assessment.action === 'lab_confirm' || assessment.action === 'urgent';

  return (
    <div>
      <nav className="mb-2 text-sm text-slate-400">
        {project && (
          <>
            <Link to={`/app/projects/${project.id}`} className="hover:text-teal-700 hover:underline">
              {project.name}
            </Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        <Link to={`/app/sites/${site.id}`} className="hover:text-teal-700 hover:underline">
          {site.name}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-600">{sample.code}</span>
      </nav>
      <PageHeader title={sample.code} subtitle={`Collected ${fmtDateTime(sample.collectedAt)}`} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-slate-900">{assessment.score}</span>
                <div>
                  <RiskBadge band={assessment.band} />
                  <p className="mt-1 text-xs text-slate-400">out of 100</p>
                </div>
              </div>
            </div>

            <div
              className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
                isEscalated ? 'bg-red-50 text-red-800' : 'bg-slate-50 text-slate-700'
              }`}
            >
              {assessment.actionLabel}
            </div>

            <p className="mt-3 text-sm text-slate-600">{assessment.summary}</p>

            {assessment.uncertaintyNote && (
              <div className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <span className="font-semibold">Uncertainty note. </span>
                {assessment.uncertaintyNote}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">Why this recommendation</h2>
            <div className="mt-4 space-y-3">
              {assessment.drivers.map((d) => (
                <div key={d.key}>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-800">{d.label}</span>
                    <span className="shrink-0 text-slate-500">
                      {d.points} / {d.max} pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{d.detail}</p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-teal-600"
                      style={{ width: `${d.max > 0 ? Math.min(100, (d.points / d.max) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">Screening results</h2>
            {sortedScreenings.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No field screening results recorded yet.</p>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead>
                    <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Signal</th>
                      <th className="py-2 pr-4">Estimated band</th>
                      <th className="py-2 pr-4">Confidence</th>
                      <th className="py-2 pr-4">Operator</th>
                      <th className="py-2 pr-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedScreenings.map((sc) => (
                      <tr key={sc.id}>
                        <td className="py-2.5 pr-4 whitespace-nowrap text-slate-600">{fmtDateTime(sc.takenAt)}</td>
                        <td className="py-2.5 pr-4 text-slate-800">{sc.signal}/100</td>
                        <td className="py-2.5 pr-4 text-slate-600">{BAND_LABELS[sc.estimatedBand]}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{CONFIDENCE_LABELS[sc.confidence]}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{sc.operator ?? '—'}</td>
                        <td className="py-2.5 pr-4 text-slate-500">{sc.notes ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <AddScreeningForm sampleId={sample.id} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">Status</h2>
            <div className="mt-2">
              <StatusBadge status={sample.status} />
            </div>
            <StatusActions sampleId={sample.id} status={sample.status} />
          </Card>

          <LabResultCard sampleId={sample.id} status={sample.status} labResult={sample.labResult} />

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">Audit trail</h2>
            <ol className="mt-3 space-y-4 border-l border-slate-200 pl-4">
              {sortedHistory.map((ev, i) => (
                <li key={`${ev.status}-${ev.at}-${i}`} className="relative">
                  <span className="absolute top-1 -left-[21px] h-2.5 w-2.5 rounded-full bg-teal-600" />
                  <p className="text-sm font-medium text-slate-800">{STATUS_LABELS[ev.status]}</p>
                  <p className="text-xs text-slate-400">{fmtDateTime(ev.at)}</p>
                  {ev.note && <p className="mt-0.5 text-xs text-slate-500">{ev.note}</p>}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatusActions({ sampleId, status }: { sampleId: string; status: SampleStatus }) {
  const { dispatch } = useApp();
  const idx = STATUS_ORDER.indexOf(status);
  const next = MANUAL_ADVANCE_FROM.includes(status) ? STATUS_ORDER[idx + 1] : undefined;

  const NOTES: Partial<Record<SampleStatus, string>> = {
    screened: 'Screening reviewed and status advanced manually.',
    flagged: 'Flagged for lab escalation review.',
    sent_to_lab: 'Submitted for LC-MS/MS confirmatory analysis.',
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      {next && (
        <Button
          onClick={() =>
            dispatch({ type: 'setStatus', sampleId, status: next, note: NOTES[next] ?? `Marked as ${STATUS_LABELS[next]}.` })
          }
        >
          Mark as {STATUS_LABELS[next]}
        </Button>
      )}
      {status !== 'closed' && (
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'setStatus', sampleId, status: 'closed', note: 'Closed.' })}
        >
          Close sample
        </Button>
      )}
      {status === 'closed' && <p className="text-sm text-slate-400">This sample is closed.</p>}
    </div>
  );
}

function LabResultCard({
  sampleId,
  status,
  labResult,
}: {
  sampleId: string;
  status: SampleStatus;
  labResult?: LabResult;
}) {
  const { state, dispatch } = useApp();
  const [sumPfasNgL, setSumPfasNgL] = useState('');
  const [method, setMethod] = useState('LC-MS/MS (EPA 537.1)');
  const [laboratory, setLaboratory] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (labResult) {
    const exceedance = labResult.sumPfasNgL / GUIDELINE_NGL;
    return (
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900">Lab result</h2>
        <p className="mt-2 text-2xl font-bold text-slate-900">{labResult.sumPfasNgL.toLocaleString('en-GB')} ng/L</p>
        <p className="text-xs text-slate-500">
          Guideline = {GUIDELINE_NGL} ng/L ({exceedance >= 1 ? `${exceedance.toFixed(1)}× the guideline` : `${(exceedance * 100).toFixed(0)}% of guideline`})
        </p>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Method</dt>
            <dd className="font-medium text-slate-800">{labResult.method}</dd>
          </div>
          {labResult.laboratory && (
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Laboratory</dt>
              <dd className="font-medium text-slate-800">{labResult.laboratory}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Received</dt>
            <dd className="font-medium text-slate-800">{fmtDate(labResult.receivedAt)}</dd>
          </div>
        </dl>
      </Card>
    );
  }

  if (status !== 'sent_to_lab') return null;

  function submit(e: FormEvent) {
    e.preventDefault();
    const value = Number(sumPfasNgL);
    if (sumPfasNgL.trim() === '' || Number.isNaN(value) || value < 0) {
      setError('Enter a valid sum-of-PFAS concentration (ng/L), 0 or greater.');
      return;
    }
    const sample = state.samples.find((s) => s.id === sampleId);
    if (!sample) return;
    const result: LabResult = {
      receivedAt: new Date().toISOString(),
      sumPfasNgL: value,
      method: method.trim() || 'LC-MS/MS (EPA 537.1)',
      laboratory: laboratory.trim() || undefined,
    };
    dispatch({ type: 'updateSample', sample: { ...sample, labResult: result } });
    dispatch({
      type: 'setStatus',
      sampleId,
      status: 'lab_received',
      note: `Lab result received: ${value} ng/L sum-of-PFAS.`,
    });
  }

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-slate-900">Lab result</h2>
      <p className="mt-1 text-xs text-slate-500">Record the confirmatory laboratory result for this sample.</p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <Field label="Sum-of-PFAS (ng/L) *">
          <input
            className={inputClass}
            value={sumPfasNgL}
            onChange={(e) => setSumPfasNgL(e.target.value)}
            inputMode="decimal"
          />
        </Field>
        <Field label="Method">
          <input className={inputClass} value={method} onChange={(e) => setMethod(e.target.value)} />
        </Field>
        <Field label="Laboratory">
          <input className={inputClass} value={laboratory} onChange={(e) => setLaboratory(e.target.value)} />
        </Field>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full justify-center">
          Record result
        </Button>
      </form>
    </Card>
  );
}

function AddScreeningForm({ sampleId }: { sampleId: string }) {
  const { dispatch } = useApp();
  const [signal, setSignal] = useState('');
  const [band, setBand] = useState<ConcentrationBand>('nd');
  const [confidence, setConfidence] = useState<Confidence>('medium');
  const [operator, setOperator] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const value = Number(signal);
    if (signal.trim() === '' || Number.isNaN(value) || value < 0 || value > 100) {
      setError('Signal must be a number between 0 and 100.');
      return;
    }
    const screening: ScreeningResult = {
      id: uid('scr'),
      takenAt: new Date().toISOString(),
      signal: value,
      estimatedBand: band,
      confidence,
      operator: operator.trim() || undefined,
      notes: notes.trim() || undefined,
    };
    dispatch({ type: 'addScreening', sampleId, screening });
    setSignal('');
    setOperator('');
    setNotes('');
    setError(null);
    setOpen(false);
  }

  if (!open) {
    return (
      <div className="mt-4">
        <Button onClick={() => setOpen(true)}>+ Add screening result</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
      <Field label="Signal (0-100) *">
        <input className={inputClass} value={signal} onChange={(e) => setSignal(e.target.value)} inputMode="decimal" />
      </Field>
      <Field label="Estimated band *">
        <select className={inputClass} value={band} onChange={(e) => setBand(e.target.value as ConcentrationBand)}>
          {CONCENTRATION_BANDS.map((b) => (
            <option key={b} value={b}>
              {BAND_LABELS[b]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Confidence *">
        <select className={inputClass} value={confidence} onChange={(e) => setConfidence(e.target.value as Confidence)}>
          {CONFIDENCES.map((c) => (
            <option key={c} value={c}>
              {CONFIDENCE_LABELS[c]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Operator">
        <input className={inputClass} value={operator} onChange={(e) => setOperator(e.target.value)} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Notes">
          <input className={inputClass} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
      </div>
      {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit">Save screening result</Button>
        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
