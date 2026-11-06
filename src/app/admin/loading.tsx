import { Loader2 } from 'lucide-react';

// Shown instantly while an admin page segment loads (the sidebar stays
// in place), so switching sections never looks frozen.
export default function AdminLoading() {
  return (
    <div aria-busy="true">
      <div className="flex items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-saffron-dark" aria-hidden />
        <p className="font-display font-bold text-navy-900 text-lg">Loading…</p>
      </div>
      <div className="mt-8 animate-pulse space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-slate-200 px-4 py-4 flex items-center gap-3"
          >
            <div className="min-w-0 flex-1">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-100 mt-2" />
            </div>
            <div className="h-6 w-14 rounded-full bg-slate-100 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
