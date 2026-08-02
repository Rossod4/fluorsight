import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Disclaimer } from './ui';

const items = [
  { to: '/app', end: true, label: 'Dashboard', icon: '▦' },
  { to: '/app/projects', label: 'Projects', icon: '▤' },
  { to: '/app/queue', label: 'Escalation queue', icon: '⚑' },
  { to: '/app/map', label: 'Map', icon: '◎' },
  { to: '/app/validation', label: 'Model validation', icon: '◑' },
  { to: '/app/import', label: 'Import data', icon: '⇪' },
  { to: '/app/settings', label: 'Settings', icon: '⚙' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-teal-50 text-teal-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

function BrandMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 6 L88 22 V50 C88 72 72 88 50 94 C28 88 12 72 12 50 V22 Z" fill="#0d9488" />
      <path
        d="M50 20 L74 30 V50 C74 65 64 76 50 81 C36 76 26 65 26 50 V30 Z"
        fill="#ffffff"
        fillOpacity="0.9"
      />
      <circle cx="50" cy="50" r="9" fill="#0f766e" />
    </svg>
  );
}

export default function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile drawer whenever we navigate, otherwise it stays over the page.
  useEffect(() => setNavOpen(false), [pathname]);

  return (
    <div className="min-h-screen">
      {/* Mobile top bar. Judges scan the poster QR code on a phone, so the app has to
          work at 375px, not just on a laptop. */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open navigation"
          aria-expanded={navOpen}
          className="-ml-2 rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <Link to="/" className="flex items-center gap-2">
          <BrandMark className="h-6 w-6" />
          <span className="font-semibold tracking-tight text-slate-900">Aegis</span>
        </Link>
      </header>

      {navOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 pr-2 pl-4">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark />
            <span className="text-lg font-semibold tracking-tight text-slate-900">Aegis</span>
          </Link>
          <button
            type="button"
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
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

      <div className="lg:ml-56">
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
