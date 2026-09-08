import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Demo from './pages/Demo';
import QuickScreen from './pages/QuickScreen';
import NotFound from './pages/NotFound';
import Projects from './pages/app/Projects';
import ProjectDetail from './pages/app/ProjectDetail';
import SiteDetail from './pages/app/SiteDetail';
import SampleDetail from './pages/app/SampleDetail';
import Queue from './pages/app/Queue';
import ImportPage from './pages/app/ImportPage';
import SettingsPage from './pages/app/SettingsPage';

// Recharts and Leaflet are the two heavy dependencies. Splitting them out keeps the
// landing page light — it is the first thing a judge loads, often on venue wifi.
const Why = lazy(() => import('./pages/Why'));
const Dashboard = lazy(() => import('./pages/app/Dashboard'));
const MapView = lazy(() => import('./pages/app/MapView'));
const Validation = lazy(() => import('./pages/app/Validation'));

function RouteFallback() {
  return <p className="p-6 text-sm text-slate-400">Loading…</p>;
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="demo" element={<Demo />} />
          <Route path="screen" element={<QuickScreen />} />
          <Route path="why" element={<Why />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="sites/:siteId" element={<SiteDetail />} />
          <Route path="samples/:sampleId" element={<SampleDetail />} />
          <Route path="queue" element={<Queue />} />
          <Route path="map" element={<MapView />} />
          <Route path="validation" element={<Validation />} />
          <Route path="import" element={<ImportPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
