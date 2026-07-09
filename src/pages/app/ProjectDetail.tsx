import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp, uid } from '../../store/AppStore';
import { assessRisk, latestScreening } from '../../lib/riskEngine';
import {
  SENSITIVITY_LABELS,
  SOURCE_TYPE_LABELS,
  RISK_FACTOR_LABELS,
  fmtDate,
} from '../../lib/labels';
import { toCsv, downloadCsv } from '../../lib/csv';
import {
  Button,
  Card,
  EmptyState,
  Field,
  PageHeader,
  RiskBadge,
  inputClass,
  labelClass,
} from '../../components/ui';
import { slugify, worstBand } from './helpers';
import type { Site, SiteRiskFactors, SourceType, Sensitivity } from '../../types';

const SOURCE_TYPES = Object.keys(SOURCE_TYPE_LABELS) as SourceType[];
const SENSITIVITIES = Object.keys(SENSITIVITY_LABELS) as Sensitivity[];
const RISK_FACTOR_KEYS = Object.keys(RISK_FACTOR_LABELS) as (keyof SiteRiskFactors)[];

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { projects, sites, samples, settings } = state;
  const [showSiteForm, setShowSiteForm] = useState(false);

  const project = projects.find((p) => p.id === projectId);

  const projectSites = useMemo(
    () => sites.filter((s) => s.projectId === projectId),
    [sites, projectId],
  );
  const siteIds = useMemo(() => new Set(projectSites.map((s) => s.id)), [projectSites]);
  const projectSamples = useMemo(
    () => samples.filter((s) => siteIds.has(s.siteId)),
    [samples, siteIds],
  );

  const siteRows = useMemo(() => {
    return projectSites.map((site) => {
      const siteSamples = projectSamples.filter((s) => s.siteId === site.id);
      const bands = siteSamples.map((s) => assessRisk(s, site, settings).band);
      const activeFactors = RISK_FACTOR_KEYS.filter((k) => site.riskFactors[k]).length;
      return { site, sampleCount: siteSamples.length, activeFactors, worst: worstBand(bands) };
    });
  }, [projectSites, projectSamples, settings]);

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        hint="It may have been deleted."
        action={
          <Link to="/app/projects" className="text-sm font-medium text-teal-700 hover:underline">
            Back to projects
          </Link>
        }
      />
    );
  }

  function exportCsv() {
    if (!project) return;
    const rows = projectSamples.map((sample) => {
      const site = sites.find((s) => s.id === sample.siteId)!;
      const assessment = assessRisk(sample, site, settings);
      const screening = latestScreening(sample);
      return { project, site, sample, assessment, screening };
    });
    const csv = toCsv(rows, [
      { header: 'Project', value: (r) => r.project.name },
      { header: 'Site', value: (r) => r.site.name },
      { header: 'Sample code', value: (r) => r.sample.code },
      { header: 'Collected', value: (r) => fmtDate(r.sample.collectedAt) },
      { header: 'Status', value: (r) => r.sample.status },
      { header: 'Latest signal', value: (r) => r.screening?.signal ?? '' },
      { header: 'Latest band', value: (r) => r.screening?.estimatedBand ?? '' },
      { header: 'Score', value: (r) => r.assessment.score },
      { header: 'Risk band', value: (r) => r.assessment.band },
      { header: 'Recommended action', value: (r) => r.assessment.actionLabel },
    ]);
    downloadCsv(`${slugify(project.name)}.csv`, csv);
  }

  function deleteProject() {
    if (!project) return;
    if (!window.confirm(`Delete "${project.name}" and all of its sites and samples? This cannot be undone.`)) {
      return;
    }
    dispatch({ type: 'deleteProject', projectId: project.id });
    navigate('/app/projects');
  }

  return (
    <div>
      <PageHeader
        title={project.name}
        subtitle={
          <span>
            {project.client && <span className="font-medium text-slate-600">{project.client}</span>}
            {project.description && (
              <>
                {project.client && ' — '}
                {project.description}
              </>
            )}
          </span>
        }
        actions={
          <>
            <Button variant="secondary" onClick={exportCsv}>
              Export CSV
            </Button>
            <Button variant="danger" onClick={deleteProject}>
              Delete project
            </Button>
          </>
        }
      />

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Sites</h2>
          <Button onClick={() => setShowSiteForm((v) => !v)}>{showSiteForm ? 'Cancel' : '+ Add site'}</Button>
        </div>

        {showSiteForm && <NewSiteForm projectId={project.id} onDone={() => setShowSiteForm(false)} />}

        {siteRows.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">No sites yet. Add one to start collecting samples.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Source type</th>
                  <th className="py-2 pr-4">Sensitivity</th>
                  <th className="py-2 pr-4">Risk factors</th>
                  <th className="py-2 pr-4">Samples</th>
                  <th className="py-2 pr-4">Worst band</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {siteRows.map(({ site, sampleCount, activeFactors, worst }) => (
                  <tr key={site.id}>
                    <td className="py-2.5 pr-4">
                      <Link to={`/app/sites/${site.id}`} className="font-medium text-slate-800 hover:text-teal-700 hover:underline">
                        {site.name}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-600">{SOURCE_TYPE_LABELS[site.sourceType]}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{SENSITIVITY_LABELS[site.sensitivity]}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{activeFactors} / {RISK_FACTOR_KEYS.length}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{sampleCount}</td>
                    <td className="py-2.5 pr-4">{worst ? <RiskBadge band={worst} /> : <span className="text-slate-400">—</span>}</td>
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

function NewSiteForm({ projectId, onDone }: { projectId: string; onDone: () => void }) {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [sourceType, setSourceType] = useState<SourceType>('groundwater');
  const [sensitivity, setSensitivity] = useState<Sensitivity>('medium');
  const [description, setDescription] = useState('');
  const [factors, setFactors] = useState<SiteRiskFactors>({
    fireTrainingOrAirport: false,
    landfill: false,
    industrial: false,
    wastewaterTreatment: false,
    historicalContamination: false,
    priorLabConfirmedNearby: false,
  });
  const [errors, setErrors] = useState<string[]>([]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const latNum = Number(lat);
    const lngNum = Number(lng);
    const errs: string[] = [];
    if (!name.trim()) errs.push('Site name is required.');
    if (lat.trim() === '' || Number.isNaN(latNum) || latNum < -90 || latNum > 90) {
      errs.push('Latitude must be a number between -90 and 90.');
    }
    if (lng.trim() === '' || Number.isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
      errs.push('Longitude must be a number between -180 and 180.');
    }
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    const site: Site = {
      id: uid('st'),
      projectId,
      name: name.trim(),
      description: description.trim() || undefined,
      lat: latNum,
      lng: lngNum,
      sourceType,
      sensitivity,
      riskFactors: factors,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'addSite', site });
    onDone();
  }

  return (
    <Card className="my-4 border-slate-200 bg-slate-50 p-5">
      <h3 className="text-sm font-semibold text-slate-900">New site</h3>
      <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Site name *">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Latitude *" hint="-90 to 90">
          <input className={inputClass} value={lat} onChange={(e) => setLat(e.target.value)} inputMode="decimal" />
        </Field>
        <Field label="Longitude *" hint="-180 to 180">
          <input className={inputClass} value={lng} onChange={(e) => setLng(e.target.value)} inputMode="decimal" />
        </Field>
        <Field label="Source type">
          <select className={inputClass} value={sourceType} onChange={(e) => setSourceType(e.target.value as SourceType)}>
            {SOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {SOURCE_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sensitivity">
          <select className={inputClass} value={sensitivity} onChange={(e) => setSensitivity(e.target.value as Sensitivity)}>
            {SENSITIVITIES.map((s) => (
              <option key={s} value={s}>
                {SENSITIVITY_LABELS[s]}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2 lg:col-span-3">
          <Field label="Description">
            <textarea className={inputClass} rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className={labelClass}>Known risk factors</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {RISK_FACTOR_KEYS.map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={factors[key]}
                  onChange={(e) => setFactors((f) => ({ ...f, [key]: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                />
                {RISK_FACTOR_LABELS[key]}
              </label>
            ))}
          </div>
        </div>
        {errors.length > 0 && (
          <div className="sm:col-span-2 lg:col-span-3">
            {errors.map((err) => (
              <p key={err} className="text-sm text-red-600">
                {err}
              </p>
            ))}
          </div>
        )}
        <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
          <Button type="submit">Add site</Button>
          <Button type="button" variant="secondary" onClick={onDone}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
