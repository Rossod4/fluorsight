import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useApp } from '../../store/AppStore';
import { assessRisk, latestScreening } from '../../lib/riskEngine';
import { RISK_COLORS, fmtDateTime, STATUS_LABELS } from '../../lib/labels';
import { Card, EmptyState, PageHeader, RiskBadge, StatCard } from '../../components/ui';
import { INDICATIVE_LAB_COST_GBP, gbp } from '../../lib/economics';
import type { RiskAssessment, RiskBand, Sample, Site } from '../../types';

const BAND_ORDER: RiskBand[] = ['Low', 'Medium', 'High', 'Critical'];

export default function Dashboard() {
  const { state } = useApp();
  const { sites, samples, settings } = state;

  const siteById = useMemo(() => new Map(sites.map((s) => [s.id, s])), [sites]);

  const assessments = useMemo(() => {
    const rows: { sample: Sample; site: Site; assessment: RiskAssessment }[] = [];
    for (const sample of samples) {
      const site = siteById.get(sample.siteId);
      if (!site) continue;
      rows.push({ sample, site, assessment: assessRisk(sample, site, settings) });
    }
    return rows;
  }, [samples, siteById, settings]);

  const screened = useMemo(
    () => assessments.filter((a) => latestScreening(a.sample) !== undefined),
    [assessments],
  );
  const escalated = useMemo(
    () => screened.filter((a) => a.assessment.action === 'lab_confirm' || a.assessment.action === 'urgent'),
    [screened],
  );
  const awaitingLab = samples.filter((s) => s.status === 'sent_to_lab').length;
  const escalationRate = screened.length > 0 ? Math.round((escalated.length / screened.length) * 100) : 0;
  const notEscalated = screened.length - escalated.length;
  const spendAvoided = notEscalated * INDICATIVE_LAB_COST_GBP;

  const bandData = useMemo(
    () =>
      BAND_ORDER.map((band) => ({
        band,
        count: assessments.filter((a) => a.assessment.band === band).length,
      })),
    [assessments],
  );

  const queuePreview = useMemo(
    () =>
      [...escalated].sort((a, b) => b.assessment.score - a.assessment.score).slice(0, 5),
    [escalated],
  );

  const recentActivity = useMemo(() => {
    const events = samples.flatMap((s) =>
      s.history.map((h) => ({ sampleId: s.id, code: s.code, ...h })),
    );
    return events.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 8);
  }, [samples]);

  if (sites.length === 0 && samples.length === 0) {
    return (
      <div>
        <PageHeader title="Dashboard" subtitle="Portfolio-wide PFAS screening overview." />
        <EmptyState
          title="No data yet"
          hint="Create a project and add sites to start screening samples."
          action={
            <Link to="/app/projects">
              <span className="text-sm font-medium text-teal-700 hover:underline">Go to projects</span>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Portfolio-wide PFAS screening overview." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Sites monitored" value={sites.length} />
        <StatCard label="Samples screened" value={screened.length} detail={`of ${samples.length} total`} />
        <StatCard label="Awaiting lab" value={awaitingLab} detail="sent to lab, result pending" />
        <StatCard
          label="Escalation rate"
          value={`${escalationRate}%`}
          detail="of screened samples flagged for lab confirmation"
        />
        <StatCard
          label="Lab spend avoided"
          value={gbp(spendAvoided)}
          detail={`${notEscalated} of ${screened.length} screened samples not escalated, at ~${gbp(INDICATIVE_LAB_COST_GBP)}/analysis (indicative). This demo portfolio only — see the business case for the annual model.`}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-3">
          <h2 className="text-sm font-semibold text-slate-900">Risk-band distribution</h2>
          <p className="mt-0.5 text-xs text-slate-500">All samples, by current assessed risk band.</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bandData} margin={{ top: 16, right: 8, bottom: 0, left: -16 }} barCategoryGap="30%">
                <CartesianGrid vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="band"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fill: '#475569', fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  width={28}
                />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  formatter={(value) => [`${value} sample${value === 1 ? '' : 's'}`, 'Count']}
                  labelFormatter={(label) => `${label} risk`}
                  contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#e2e8f0' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={64}>
                  {bandData.map((d) => (
                    <Cell key={d.band} fill={RISK_COLORS[d.band]} />
                  ))}
                  <LabelList dataKey="count" position="top" style={{ fill: '#475569', fontSize: 12 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Escalation queue preview</h2>
            <Link to="/app/queue" className="text-xs font-medium text-teal-700 hover:underline">
              View queue
            </Link>
          </div>
          {queuePreview.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">No samples currently need lab escalation.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {queuePreview.map(({ sample, assessment }) => (
                <li key={sample.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <Link
                      to={`/app/samples/${sample.id}`}
                      className="truncate text-sm font-medium text-slate-800 hover:text-teal-700 hover:underline"
                    >
                      {sample.code}
                    </Link>
                    <p className="truncate text-xs text-slate-400">{assessment.actionLabel}</p>
                  </div>
                  <RiskBadge band={assessment.band} score={assessment.score} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
        {recentActivity.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">No activity recorded yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {recentActivity.map((ev, i) => (
              <li key={`${ev.sampleId}-${ev.at}-${i}`} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <Link
                    to={`/app/samples/${ev.sampleId}`}
                    className="text-sm font-medium text-slate-800 hover:text-teal-700 hover:underline"
                  >
                    {ev.code}
                  </Link>
                  <span className="text-sm text-slate-500"> → {STATUS_LABELS[ev.status]}</span>
                  {ev.note && <p className="truncate text-xs text-slate-400">{ev.note}</p>}
                </div>
                <span className="shrink-0 text-xs text-slate-400">{fmtDateTime(ev.at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
