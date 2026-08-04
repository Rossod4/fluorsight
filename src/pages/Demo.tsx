// Guided 60-second walkthrough, built for a judge holding a phone at the poster
// stand. It drives the real app rather than mocking it: the import button below
// dispatches the same action the Import page does, and every link lands on a
// live page. Steps self-detect completion, so navigating away and back is safe.

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Disclaimer } from '../components/ui';
import { useApp } from '../store/AppStore';
import { parseScreeningCsv } from '../lib/csv';
import { assessRisk } from '../lib/riskEngine';
import type { AppState } from '../types';

/** Samples the model currently says are worth paying a lab for. */
function escalations(state: AppState) {
  const sites = new Map(state.sites.map((s) => [s.id, s]));
  return state.samples.filter((sample) => {
    const site = sites.get(sample.siteId);
    if (!site) return false;
    const { action } = assessRisk(sample, site, state.settings);
    return action === 'lab_confirm' || action === 'urgent';
  });
}

/** Highest-scoring sample overall — the one worth opening in front of a judge. */
function topSample(state: AppState) {
  const sites = new Map(state.sites.map((s) => [s.id, s]));
  let best: { id: string; code: string; score: number } | undefined;
  for (const sample of state.samples) {
    const site = sites.get(sample.siteId);
    if (!site) continue;
    const { score } = assessRisk(sample, site, state.settings);
    if (!best || score > best.score) best = { id: sample.id, code: sample.code, score };
  }
  return best;
}

const IMPORT_MARKER = 'RM-FTG-004'; // first sample code in the demo batch

function Step({
  n,
  title,
  done,
  children,
}: {
  n: number;
  title: string;
  done?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            done ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
          }`}
          aria-hidden="true"
        >
          {done ? '✓' : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <div className="mt-2 space-y-3 text-sm text-slate-600">{children}</div>
        </div>
      </div>
    </Card>
  );
}

export default function Demo() {
  const { state, dispatch } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [importedRows, setImportedRows] = useState<number>();

  const imported = useMemo(
    () => state.samples.some((s) => s.code === IMPORT_MARKER),
    [state.samples],
  );
  const escalated = useMemo(() => escalations(state), [state]);
  const top = useMemo(() => topSample(state), [state]);

  async function runImport() {
    setBusy(true);
    setError(undefined);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}mock-screening-results.csv`);
      if (!res.ok) throw new Error(`Could not load the demo batch (${res.status}).`);
      const { rows, errors } = parseScreeningCsv(await res.text());
      if (errors.length > 0) throw new Error(errors[0]);

      // Match the batch to a project by site name rather than hard-coding an id,
      // so this keeps working if the seed data is edited.
      const names = new Set(rows.map((r) => r.siteName.trim().toLowerCase()));
      const scored = state.projects.map((p) => ({
        project: p,
        hits: state.sites.filter(
          (s) => s.projectId === p.id && names.has(s.name.trim().toLowerCase()),
        ).length,
      }));
      const best = scored.sort((a, b) => b.hits - a.hits)[0];
      if (!best || best.hits === 0) throw new Error('No project matches the sites in the demo batch.');

      dispatch({ type: 'importScreenings', projectId: best.project.id, rows });
      setImportedRows(rows.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">
          Guided demo · about 60 seconds
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          See Fluorsight decide which samples are worth a lab test
        </h1>
        <p className="text-slate-600">
          PFAS laboratory confirmation is slow and expensive, so most water samples never get
          tested. Fluorsight triages them: it scores every sample from cheap field screening plus site
          history, and shows its full reasoning so an engineer can overrule it. Work through the
          steps below — everything you touch is the real, working prototype.
        </p>
      </header>

      <Step n={1} title="Bring in a batch of field screening results" done={imported}>
        <p>
          Eight screening results from a former airfield, the way a field team would upload them
          after a sampling round. Nothing here is a mock-up — this runs the same import the app
          uses.
        </p>
        {!imported && (
          <Button onClick={runImport} disabled={busy}>
            {busy ? 'Importing…' : 'Import 8 screening results'}
          </Button>
        )}
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {imported && (
          <p className="rounded-lg bg-teal-50 px-3 py-2 text-teal-900">
            Batch loaded{importedRows ? ` — ${importedRows} results across 4 sites` : ''}.{' '}
            <strong>{escalated.length} samples</strong> now warrant laboratory confirmation out of{' '}
            {state.samples.length} in the programme.
          </p>
        )}
      </Step>

      <Step n={2} title="Look at what the model escalated" done={imported}>
        <p>
          The queue ranks every sample by risk score. This is the decision the tool exists to
          support: with a fixed budget, these are the samples to spend it on.
        </p>
        <Link
          to="/app/queue"
          className="inline-flex rounded-lg bg-teal-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          Open the escalation queue
        </Link>
      </Step>

      <Step n={3} title="Ask the model why">
        <p>
          Every score breaks down driver by driver — signal strength, estimated concentration band,
          repeat positives, site history, receptor sensitivity — each showing points scored against
          points available. Low-confidence screening is explicitly down-weighted, and a weak result
          at low confidence is never allowed to resolve to “no action”.
        </p>
        {top && (
          <Link
            to={`/app/samples/${top.id}`}
            className="inline-flex rounded-lg bg-teal-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Open {top.code} — the highest-scoring sample ({top.score}/100)
          </Link>
        )}
      </Step>

      <Step n={4} title="Disagree with it, and change it">
        <p>
          The weights and escalation thresholds are editable. Change one and every score in the
          programme moves immediately. A consultancy can encode its own risk appetite, and can show
          a regulator exactly what rule produced a decision.
        </p>
        <Link
          to="/app/settings"
          className="inline-flex rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300 ring-inset transition-colors hover:bg-slate-50"
        >
          Tune the model
        </Link>
      </Step>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({ type: 'reset' });
            setImportedRows(undefined);
            setError(undefined);
          }}
        >
          Reset the demo
        </Button>
        <Link to="/why" className="text-sm font-medium text-teal-700 hover:underline">
          Read the business case →
        </Link>
      </div>

      <div className="pt-4">
        <Disclaimer />
        <p className="mt-2 text-xs text-slate-400">
          All organisations, sites, and data shown are fictional demo content. Data is stored only
          in this browser.
        </p>
      </div>
    </section>
  );
}
