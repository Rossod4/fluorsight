import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../store/AppStore';
import { assessRisk } from '../../lib/riskEngine';
import { fmtDate } from '../../lib/labels';
import { Button, Card, EmptyState, PageHeader, RiskBadge, StatCard, StatusBadge } from '../../components/ui';

type SortMode = 'score' | 'date';

export default function Queue() {
  const { state, dispatch } = useApp();
  const { projects, sites, samples, settings } = state;
  const [sortMode, setSortMode] = useState<SortMode>('score');

  const siteById = useMemo(() => new Map(sites.map((s) => [s.id, s])), [sites]);
  const projectById = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);

  const rows = useMemo(() => {
    const out: { sample: (typeof samples)[number]; site: (typeof sites)[number]; assessment: ReturnType<typeof assessRisk> }[] = [];
    for (const sample of samples) {
      const site = siteById.get(sample.siteId);
      if (!site) continue;
      const assessment = assessRisk(sample, site, settings);
      const inQueue =
        assessment.action === 'lab_confirm' ||
        assessment.action === 'urgent' ||
        sample.status === 'flagged' ||
        sample.status === 'sent_to_lab';
      if (inQueue) out.push({ sample, site, assessment });
    }
    return out.sort((a, b) =>
      sortMode === 'score'
        ? b.assessment.score - a.assessment.score
        : b.sample.collectedAt.localeCompare(a.sample.collectedAt),
    );
  }, [samples, siteById, settings, sortMode]);

  const flaggedCount = rows.filter((r) => r.sample.status === 'flagged').length;
  const atLabCount = rows.filter((r) => r.sample.status === 'sent_to_lab').length;

  return (
    <div>
      <PageHeader title="Lab escalation queue" subtitle="Samples requiring lab confirmation or currently awaiting one." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="In queue" value={rows.length} />
        <StatCard label="Awaiting authorisation" value={flaggedCount} detail="flagged for lab submission" />
        <StatCard label="At lab" value={atLabCount} detail="sent to lab, result pending" />
      </div>

      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Queue</h2>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400">Sort by</span>
            <button
              className={`rounded-full px-2.5 py-1 font-medium ${sortMode === 'score' ? 'bg-teal-50 text-teal-800' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setSortMode('score')}
            >
              Score
            </button>
            <button
              className={`rounded-full px-2.5 py-1 font-medium ${sortMode === 'date' ? 'bg-teal-50 text-teal-800' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setSortMode('date')}
            >
              Date collected
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Queue is empty" hint="No samples currently need lab escalation or authorisation." />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                  <th className="py-2 pr-4">Project</th>
                  <th className="py-2 pr-4">Site</th>
                  <th className="py-2 pr-4">Sample</th>
                  <th className="py-2 pr-4">Risk</th>
                  <th className="py-2 pr-4">Recommended action</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(({ sample, site, assessment }) => {
                  const project = projectById.get(site.projectId);
                  return (
                    <tr key={sample.id}>
                      <td className="py-2.5 pr-4 text-slate-600">
                        {project ? (
                          <Link to={`/app/projects/${project.id}`} className="hover:text-teal-700 hover:underline">
                            {project.name}
                          </Link>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-600">
                        <Link to={`/app/sites/${site.id}`} className="hover:text-teal-700 hover:underline">
                          {site.name}
                        </Link>
                      </td>
                      <td className="py-2.5 pr-4">
                        <Link
                          to={`/app/samples/${sample.id}`}
                          className="font-medium text-slate-800 hover:text-teal-700 hover:underline"
                        >
                          {sample.code}
                        </Link>
                        <p className="text-xs text-slate-400">{fmtDate(sample.collectedAt)}</p>
                      </td>
                      <td className="py-2.5 pr-4">
                        <RiskBadge band={assessment.band} score={assessment.score} />
                      </td>
                      <td className="py-2.5 pr-4 text-slate-600">{assessment.actionLabel}</td>
                      <td className="py-2.5 pr-4">
                        <StatusBadge status={sample.status} />
                      </td>
                      <td className="py-2.5 pr-4 text-right">
                        {sample.status === 'flagged' && (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              dispatch({
                                type: 'setStatus',
                                sampleId: sample.id,
                                status: 'sent_to_lab',
                                note: 'Submitted for LC-MS/MS confirmatory analysis.',
                              })
                            }
                          >
                            Mark sent to lab
                          </Button>
                        )}
                        {sample.status === 'sent_to_lab' && (
                          <Link to={`/app/samples/${sample.id}`}>
                            <Button variant="secondary">Record result</Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
