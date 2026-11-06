import { Loader2 } from 'lucide-react';

// Shown instantly while a public page segment loads (header, ticker and
// footer stay in place), so a click never looks like the site is stuck:
// the school colours, a spinner, and a soft skeleton of the page body.
export default function SiteLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20" aria-busy="true">
      <div className="flex items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-saffron-dark" aria-hidden />
        <p className="font-display font-bold text-navy-900 text-lg">Loading…</p>
      </div>
      <div className="mt-10 animate-pulse space-y-8">
        <div>
          <div className="h-3 w-28 rounded bg-navy-100" />
          <div className="h-9 w-2/3 max-w-md rounded-lg bg-navy-100 mt-3" />
          <div className="h-4 w-full max-w-2xl rounded bg-slate-200 mt-5" />
          <div className="h-4 w-5/6 max-w-xl rounded bg-slate-200 mt-2.5" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white ring-1 ring-slate-900/5 shadow-card p-6"
            >
              <div className="h-36 rounded-xl bg-navy-50" />
              <div className="h-4 w-3/4 rounded bg-slate-200 mt-5" />
              <div className="h-3.5 w-full rounded bg-slate-100 mt-2.5" />
              <div className="h-3.5 w-2/3 rounded bg-slate-100 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
