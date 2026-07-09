import { Link, NavLink, Outlet } from 'react-router-dom';
import { Disclaimer } from './ui';

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

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-teal-700' : 'text-slate-600 hover:text-slate-900'}`;

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <BrandMark />
            <span className="text-lg font-semibold tracking-tight text-slate-900">Aegis</span>
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>
              Product
            </NavLink>
            <NavLink to="/why" className={navLinkClass}>
              Why Aegis
            </NavLink>
            <Link
              to="/app"
              className="rounded-lg bg-teal-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
            >
              Open dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BrandMark className="h-5 w-5" /> Aegis — PFAS screening decision support
          </div>
          <Disclaimer />
          <p className="text-xs text-slate-400">
            Innovation-competition prototype. All organisations, sites, and data shown are
            fictional demo content.
          </p>
        </div>
      </footer>
    </div>
  );
}
