import { Link, NavLink, Outlet } from 'react-router-dom';
import { Disclaimer } from './ui';

const items = [
  { to: '/app', end: true, label: 'Dashboard', icon: '▦' },
  { to: '/app/projects', label: 'Projects', icon: '▤' },
  { to: '/app/queue', label: 'Escalation queue', icon: '⚑' },
  { to: '/app/map', label: 'Map', icon: '◎' },
  { to: '/app/import', label: 'Import data', icon: '⇪' },
  { to: '/app/settings', label: 'Settings', icon: '⚙' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-teal-50 text-teal-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 z-40 flex w-56 flex-col border-r border-slate-200 bg-white">
        <Link to="/" className="flex h-16 items-center gap-2 border-b border-slate-200 px-4">
          <svg viewBox="0 0 100 100" className="h-7 w-7" aria-hidden="true">
            <path d="M50 6 L88 22 V50 C88 72 72 88 50 94 C28 88 12 72 12 50 V22 Z" fill="#0d9488" />
            <path
              d="M50 20 L74 30 V50 C74 65 64 76 50 81 C36 76 26 65 26 50 V30 Z"
              fill="#ffffff"
              fillOpacity="0.9"
            />
            <circle cx="50" cy="50" r="9" fill="#0f766e" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-slate-900">Aegis</span>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
              <span aria-hidden="true" className="w-4 text-center">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <Disclaimer />
        </div>
      </aside>
      <div className="ml-56 flex-1">
        <main className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
