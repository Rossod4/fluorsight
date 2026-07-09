import { Route, Routes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Why from './pages/Why';
import Dashboard from './pages/app/Dashboard';
import Projects from './pages/app/Projects';
import ProjectDetail from './pages/app/ProjectDetail';
import SiteDetail from './pages/app/SiteDetail';
import SampleDetail from './pages/app/SampleDetail';
import Queue from './pages/app/Queue';
import MapView from './pages/app/MapView';
import ImportPage from './pages/app/ImportPage';
import SettingsPage from './pages/app/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="why" element={<Why />} />
      </Route>
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="sites/:siteId" element={<SiteDetail />} />
        <Route path="samples/:sampleId" element={<SampleDetail />} />
        <Route path="queue" element={<Queue />} />
        <Route path="map" element={<MapView />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
