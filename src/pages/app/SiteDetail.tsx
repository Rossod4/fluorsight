import { useMemo, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp, uid } from '../../store/AppStore';
import { assessRisk } from '../../lib/riskEngine';
import { SENSITIVITY_LABELS, SOURCE_TYPE_LABELS, RISK_FACTOR_LABELS, fmtDate, fmtDateTime } from '../../lib/labels';
import { Button, Card, EmptyState, Field, PageHeader, RiskBadge, StatusBadge, inputClass } from '../../components/ui';
import { suggestNextCode } from './helpers';
import type { SiteRiskFactors } from '../../types';

const RISK_FACTOR_KEYS = Object.keys(RISK_FACTOR_LABELS) as (keyof SiteRiskFactors)[];

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function SiteDetail() {
  const { siteId } = useParams<{ siteId: string }>();
  const { state } = useApp();
  const { projects, sites, samples, settings } = state;
  const [showForm, setShowForm] = useState(false);

  const site = sites.find((s) => s.id === siteId);
  const project = site ? projects.find((p) => p.id === site.projectId) : undefined;

  const siteSamples = useMemo(
    () => samples.filter((s) => s.siteId === siteId),
    [samples, siteId],
  );

  const sampleRows = useMemo(() => {
    if (!site) return [];
    return [...siteSamples]
      .sort((a, b) => b.collectedAt.localeCompare(a.collectedAt))
      .map((sample) => ({ sample, assessment: assessRisk(sample, site, settings) }));
  }, [siteSamples, site, settings]);

  if (!site) {
    return (
      <EmptyState
        title="Site not found"
        hint="It may have been deleted."
        action={
          <Link to="/app/projects" className="text-sm font-medium text-teal-700 hover:underline">
            Back to projects
          </Link>
        }
      />
    );
  }

  return (
    <div>
      {project && (
        <nav className="mb-2 text-sm text-slate-400">
          <Link to={`/app/projects/${project.id}`} className="hover:text-teal-700 hover:underline">
            {project.name}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-600">{site.name}</span>
        </nav>
      )}
      <PageHeader title={site.name} subtitle={site.description} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Site information</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Source type</dt>
              <dd className="font-medium text-slate-800">{SOURCE_TYPE_LABELS[site.sourceType]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Sensitivity</dt>
              <dd className="font-medium text-slate-800">{SENSITIVITY_LABELS[site.sensitivity]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Coordinates</dt>
              <dd className="font-medium text-slate-800">
                {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Created</dt>
              <dd className="font-medium text-slate-800">{fmtDate(site.createdAt)}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Risk factors</h2>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {RISK_FACTOR_KEYS.map((key) => {
              const present = site.riskFactors[key];
              return (
                <li
                  key={key}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm ${
                    present ? 'bg-amber-50 text-amber-900' : 'text-slate-400'
                  }`}
                >
                  <span aria-hidden="true">{present ? '●' : '○'}</span>
                  {RISK_FACTOR_LABELS[key]}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Samples</h2>
          <Button onClick={() => setShowForm((v) => !v)}>{showForm ? 'Cancel' : '+ Add sample'}</Button>
        </div>

        {showForm && (
          <NewSampleForm
            siteId={site.id}
            existingCodes={siteSamples.map((s) => s.code)}
            onDone={() => setShowForm(false)}
          />
        )}

        {sampleRows.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">No samples collected at this site yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                  <th className="py-2 pr-4">Code</th>
                  <th className="py-2 pr-4">Collected</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sampleRows.map(({ sample, assessment }) => (
                  <tr key={sample.id}>
                    <td className="py-2.5 pr-4">
                      <Link
                        to={`/app/samples/${sample.id}`}
                        className="font-medium text-slate-800 hover:text-teal-700 hover:underline"
                      >
                        {sample.code}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-600">{fmtDateTime(sample.collectedAt)}</td>
                    <td className="py-2.5 pr-4">
                      <StatusBadge status={sample.status} />
                    </td>
                    <td className="py-2.5 pr-4">
                      <RiskBadge band={assessment.band} score={assessment.score} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function NewSampleForm({
  siteId,
  existingCodes,
  onDone,
}: {
  siteId: string;
  existingCodes: string[];
  onDone: () => void;
}) {
  const { dispatch } = useApp();
  const [code, setCode] = useState(() => suggestNextCode(existingCodes));
  const [collectedAt, setCollectedAt] = useState(() => toLocalInputValue(new Date()));
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) {
      setError('Sample code is required.');
      return;
    }
    if (existingCodes.some((c) => c.toLowerCase() === code.trim().toLowerCase())) {
      setError('A sample with this code already exists at this site.');
      return;
    }
    const collectedIso = collectedAt ? new Date(collectedAt).toISOString() : new Date().toISOString();
    dispatch({
      type: 'addSample',
      sample: {
        id: uid('sm'),
        siteId,
        code: code.trim(),
        collectedAt: collectedIso,
        status: 'new',
        history: [{ status: 'new', at: new Date().toISOString() }],
        screenings: [],
        notes: notes.trim() || undefined,
      },
    });
    onDone();
  }

  return (
    <Card className="my-4 border-slate-200 bg-slate-50 p-5">
      <h3 className="text-sm font-semibold text-slate-900">New sample</h3>
      <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sample code *" hint={existingCodes.length > 0 ? 'Suggested from existing codes' : undefined}>
          <input className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} />
        </Field>
        <Field label="Collected at">
          <input
            type="datetime-local"
            className={inputClass}
            value={collectedAt}
            onChange={(e) => setCollectedAt(e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2 lg:col-span-1">
          <Field label="Notes">
            <input className={inputClass} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
        </div>
        {error && <p className="text-sm text-red-600 sm:col-span-2 lg:col-span-3">{error}</p>}
        <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
          <Button type="submit">Add sample</Button>
          <Button type="button" variant="secondary" onClick={onDone}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
