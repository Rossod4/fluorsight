import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../store/AppStore';
import { assessRisk, BAND_LABELS } from '../../lib/riskEngine';
import { fmtDateTime } from '../../lib/labels';
import { parseScreeningCsv, type ScreeningImportRow } from '../../lib/csv';
import { Button, Card, EmptyState, Field, PageHeader, inputClass } from '../../components/ui';

interface ImportRequest {
  rows: ScreeningImportRow[];
  existingKeys: Set<string>;
}

interface ImportSummary {
  count: number;
  items: { sampleId: string; code: string; created: boolean; escalated: boolean }[];
  escalatedCount: number;
}

export default function ImportPage() {
  const { state, dispatch } = useApp();
  const { projects, sites, samples, settings } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectId, setProjectId] = useState(projects[0]?.id ?? '');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [validRows, setValidRows] = useState<ScreeningImportRow[]>([]);
  const [importRequest, setImportRequest] = useState<ImportRequest | null>(null);
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  const projectSites = useMemo(() => sites.filter((s) => s.projectId === projectId), [sites, projectId]);
  const siteByName = useMemo(
    () => new Map(projectSites.map((s) => [s.name.trim().toLowerCase(), s])),
    [projectSites],
  );

  const matchedRows = useMemo(
    () => validRows.filter((r) => siteByName.has(r.siteName.trim().toLowerCase())),
    [validRows, siteByName],
  );
  const unmatchedNames = useMemo(() => {
    const names = validRows
      .filter((r) => !siteByName.has(r.siteName.trim().toLowerCase()))
      .map((r) => r.siteName);
    return [...new Set(names)];
  }, [validRows, siteByName]);

  // Once the import dispatch has been applied to the store, compute the
  // created/updated summary from the resulting sample list.
  useEffect(() => {
    if (!importRequest) return;
    const items: ImportSummary['items'] = [];
    const seen = new Set<string>();
    for (const row of importRequest.rows) {
      const site = siteByName.get(row.siteName.trim().toLowerCase());
      if (!site) continue;
      const sample = samples.find((s) => s.siteId === site.id && s.code === row.sampleCode);
      if (!sample || seen.has(sample.id)) continue;
      seen.add(sample.id);
      const assessment = assessRisk(sample, site, settings);
      items.push({
        sampleId: sample.id,
        code: sample.code,
        created: !importRequest.existingKeys.has(`${site.id}|${row.sampleCode}`),
        escalated: assessment.action === 'lab_confirm' || assessment.action === 'urgent',
      });
    }
    setSummary({
      count: importRequest.rows.length,
      items,
      escalatedCount: items.filter((i) => i.escalated).length,
    });
    setImportRequest(null);
    setValidRows([]);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [samples]);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSummary(null);
    setFileName(file.name);
    const text = await file.text();
    const result = parseScreeningCsv(text);
    setParseErrors(result.errors);
    setValidRows(result.rows);
  }

  function runImport() {
    if (matchedRows.length === 0) return;
    const existingKeys = new Set(
      samples
        .filter((s) => projectSites.some((site) => site.id === s.siteId))
        .map((s) => `${s.siteId}|${s.code}`),
    );
    setImportRequest({ rows: matchedRows, existingKeys });
    dispatch({ type: 'importScreenings', projectId, rows: matchedRows });
  }

  function startOver() {
    setSummary(null);
    setParseErrors([]);
    setValidRows([]);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  if (projects.length === 0) {
    return (
      <div>
        <PageHeader title="Import screening results" subtitle="Batch upload from field screening devices." />
        <EmptyState title="No projects yet" hint="Create a project before importing screening results." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Import screening results"
        subtitle="Upload a batch of field-screening readings exported from the handheld reader. Each row updates or creates a sample under the selected project."
      />

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900">1. Choose a project and file</h2>
        <p className="mt-1 text-xs text-slate-500">
          The CSV must have a header row with: site_name, sample_code, collected_at, signal, estimated_band,
          confidence, and optionally operator, notes.{' '}
          <a
            href={`${import.meta.env.BASE_URL}mock-screening-results.csv`}
            download
            className="font-medium text-teal-700 hover:underline"
          >
            Download example file
          </a>
          .
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Project">
            <select
              className={inputClass}
              value={projectId}
              onChange={(e) => {
                setProjectId(e.target.value);
                startOver();
              }}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Screening results CSV">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFile}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-700 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-teal-800"
            />
          </Field>
        </div>
      </Card>

      {fileName && parseErrors.length > 0 && (
        <Card className="mt-6 border-red-200 bg-red-50 p-5">
          <h2 className="text-sm font-semibold text-red-800">
            {parseErrors.length} row{parseErrors.length === 1 ? '' : 's'} in "{fileName}" could not be read
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-red-700">
            {parseErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </Card>
      )}

      {fileName && unmatchedNames.length > 0 && (
        <Card className="mt-6 border-amber-200 bg-amber-50 p-5">
          <h2 className="text-sm font-semibold text-amber-900">
            {unmatchedNames.length} site name{unmatchedNames.length === 1 ? '' : 's'} not found in this project
          </h2>
          <p className="mt-1 text-sm text-amber-800">
            These rows will be skipped. Check spelling against the site names in{' '}
            <strong>{projects.find((p) => p.id === projectId)?.name}</strong>, or add the site first.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-800">
            {unmatchedNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Card>
      )}

      {fileName && matchedRows.length > 0 && (
        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              2. Preview — {matchedRows.length} result{matchedRows.length === 1 ? '' : 's'} ready to import
            </h2>
            <Button onClick={runImport}>Import {matchedRows.length} result{matchedRows.length === 1 ? '' : 's'}</Button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                  <th className="py-2 pr-4">Site</th>
                  <th className="py-2 pr-4">Sample code</th>
                  <th className="py-2 pr-4">Collected</th>
                  <th className="py-2 pr-4">Signal</th>
                  <th className="py-2 pr-4">Band</th>
                  <th className="py-2 pr-4">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matchedRows.map((row, i) => (
                  <tr key={`${row.sampleCode}-${i}`}>
                    <td className="py-2 pr-4 text-slate-600">{row.siteName}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800">{row.sampleCode}</td>
                    <td className="py-2 pr-4 text-slate-600">{fmtDateTime(row.collectedAt)}</td>
                    <td className="py-2 pr-4 text-slate-600">{row.signal}/100</td>
                    <td className="py-2 pr-4 text-slate-600">{BAND_LABELS[row.estimatedBand]}</td>
                    <td className="py-2 pr-4 text-slate-600">{row.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {summary && (
        <Card className="mt-6 border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-sm font-semibold text-emerald-900">
            {summary.count} result{summary.count === 1 ? '' : 's'} imported successfully
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-emerald-800">
            {summary.items.map((item) => (
              <li key={item.sampleId}>
                <Link to={`/app/samples/${item.sampleId}`} className="font-medium hover:underline">
                  {item.code}
                </Link>{' '}
                — {item.created ? 'new sample created' : 'existing sample updated'}
                {item.escalated && ' — now recommends lab confirmation'}
              </li>
            ))}
          </ul>
          {summary.escalatedCount > 0 && (
            <p className="mt-3 text-sm text-emerald-900">
              {summary.escalatedCount} sample{summary.escalatedCount === 1 ? '' : 's'} now assess as needing lab
              confirmation.{' '}
              <Link to="/app/queue" className="font-medium hover:underline">
                View escalation queue
              </Link>
              .
            </p>
          )}
          <div className="mt-4">
            <Button variant="secondary" onClick={startOver}>
              Import another file
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
