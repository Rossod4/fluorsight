import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useApp, uid } from '../../store/AppStore';
import { assessRisk } from '../../lib/riskEngine';
import { fmtDate } from '../../lib/labels';
import { Button, Card, EmptyState, Field, PageHeader, RiskBadge, inputClass } from '../../components/ui';
import { worstBand } from './helpers';
import type { Project } from '../../types';

export default function Projects() {
  const { state } = useApp();
  const { projects, sites, samples, settings } = state;
  const [showForm, setShowForm] = useState(false);

  const rows = useMemo(() => {
    return projects.map((project) => {
      const projectSites = sites.filter((s) => s.projectId === project.id);
      const siteIds = new Set(projectSites.map((s) => s.id));
      const projectSamples = samples.filter((s) => siteIds.has(s.siteId));
      const bands = projectSamples.map((sample) => {
        const site = sites.find((s) => s.id === sample.siteId)!;
        return assessRisk(sample, site, settings).band;
      });
      return {
        project,
        siteCount: projectSites.length,
        sampleCount: projectSamples.length,
        worst: worstBand(bands),
      };
    });
  }, [projects, sites, samples, settings]);

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Screening programmes across clients and sites."
        actions={
          <Button onClick={() => setShowForm((v) => !v)}>{showForm ? 'Cancel' : '+ New project'}</Button>
        }
      />

      {showForm && <NewProjectForm onDone={() => setShowForm(false)} />}

      {rows.length === 0 ? (
        <EmptyState
          title="No projects yet"
          hint="Create your first screening programme to start adding sites and samples."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rows.map(({ project, siteCount, sampleCount, worst }) => (
            <Link key={project.id} to={`/app/projects/${project.id}`}>
              <Card className="h-full p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-900">{project.name}</h2>
                  {worst && <RiskBadge band={worst} />}
                </div>
                {project.client && <p className="mt-1 text-sm text-slate-500">{project.client}</p>}
                {project.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">{project.description}</p>
                )}
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                  <span>{siteCount} site{siteCount === 1 ? '' : 's'}</span>
                  <span>{sampleCount} sample{sampleCount === 1 ? '' : 's'}</span>
                  <span>Created {fmtDate(project.createdAt)}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function NewProjectForm({ onDone }: { onDone: () => void }) {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Project name is required.');
      return;
    }
    const project: Project = {
      id: uid('p'),
      name: name.trim(),
      client: client.trim() || undefined,
      description: description.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'addProject', project });
    onDone();
  }

  return (
    <Card className="mb-6 p-5">
      <h2 className="text-sm font-semibold text-slate-900">New project</h2>
      <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project name *">
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kestrel Vale DC — Part 2A PFAS Screening" />
        </Field>
        <Field label="Client">
          <input className={inputClass} value={client} onChange={(e) => setClient(e.target.value)} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea className={inputClass} rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </div>
        {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
        <div className="flex gap-2 sm:col-span-2">
          <Button type="submit">Create project</Button>
          <Button type="button" variant="secondary" onClick={onDone}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
