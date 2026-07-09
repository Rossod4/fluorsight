import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { useApp } from '../../store/AppStore';
import { assessRisk } from '../../lib/riskEngine';
import { RISK_COLORS } from '../../lib/labels';
import { Card, EmptyState, PageHeader, RiskBadge } from '../../components/ui';
import { worstBand } from './helpers';
import type { RiskBand } from '../../types';

const BAND_ORDER: RiskBand[] = ['Low', 'Medium', 'High', 'Critical'];

export default function MapView() {
  const { state } = useApp();
  const { projects, sites, samples, settings } = state;

  const projectById = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);

  const siteMarkers = useMemo(() => {
    return sites.map((site) => {
      const siteSamples = samples.filter((s) => s.siteId === site.id);
      const bands = siteSamples.map((s) => assessRisk(s, site, settings).band);
      const band = worstBand(bands) ?? 'Low';
      return { site, band, sampleCount: siteSamples.length, project: projectById.get(site.projectId) };
    });
  }, [sites, samples, settings, projectById]);

  if (sites.length === 0) {
    return (
      <div>
        <PageHeader title="Site map" subtitle="Geographic view of all screening sites." />
        <EmptyState title="No sites to show" hint="Add sites to a project to see them plotted here." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Site map" subtitle="Geographic view of all screening sites, coloured by current risk band." />
      <div className="relative h-[calc(100vh-12rem)]">
        <Card className="h-full overflow-hidden p-0">
          <MapContainer center={[52.45, -1.57]} zoom={11} scrollWheelZoom className="h-full w-full">
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {siteMarkers.map(({ site, band, sampleCount, project }) => (
              <CircleMarker
                key={site.id}
                center={[site.lat, site.lng]}
                radius={10}
                pathOptions={{ color: RISK_COLORS[band], fillColor: RISK_COLORS[band], fillOpacity: 0.7 }}
              >
                <Popup>
                  <div className="min-w-[10rem] space-y-1.5">
                    <p className="font-semibold text-slate-900">{site.name}</p>
                    {project && <p className="text-xs text-slate-500">{project.name}</p>}
                    <RiskBadge band={band} />
                    <p className="text-xs text-slate-500">
                      {sampleCount} sample{sampleCount === 1 ? '' : 's'}
                    </p>
                    <Link to={`/app/sites/${site.id}`} className="text-xs font-medium text-teal-700 hover:underline">
                      View site
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </Card>
        <Card className="absolute right-4 bottom-4 z-[1000] p-3 shadow-md">
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase">Risk band</p>
          <ul className="space-y-1">
            {BAND_ORDER.map((band) => (
              <li key={band} className="flex items-center gap-2 text-xs text-slate-700">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: RISK_COLORS[band] }}
                />
                {band}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
