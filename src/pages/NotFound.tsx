import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
      <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">404</p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
      <p className="text-sm text-slate-500">
        That page does not exist. Try the product overview, the business case, or open the
        dashboard to explore the working prototype.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/"
          className="rounded-lg bg-teal-700 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          Product overview
        </Link>
        <Link
          to="/app"
          className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300 ring-inset transition-colors hover:bg-slate-50"
        >
          Open dashboard
        </Link>
      </div>
    </section>
  );
}
