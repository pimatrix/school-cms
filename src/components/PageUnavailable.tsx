import Link from 'next/link';
import { t, type Lang } from '@/lib/i18n';

// Shown when a page has been switched off in Site Settings →
// Page & Section Visibility. A calm, professional holding page —
// deliberately NOT an error page.
export default function PageUnavailable({ lang }: { lang: Lang }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card px-6 py-12 sm:px-12">
        <p className="text-5xl mb-5" aria-hidden>
          🛠️
        </p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-navy-900">
          {t(lang, 'pageUnavailableTitle')}
        </h1>
        <p className="mt-4 text-slate-500 leading-relaxed max-w-xl mx-auto">
          {t(lang, 'pageUnavailableBody')}
        </p>
        <Link
          href="/"
          className="inline-block mt-8 rounded-full bg-navy-700 hover:bg-navy-800 text-white font-semibold px-7 py-3 shadow-soft transition-colors"
        >
          {t(lang, 'backToHome')}
        </Link>
      </div>
    </section>
  );
}
