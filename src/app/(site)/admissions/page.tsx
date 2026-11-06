import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getPageContent, getSettings, pageVisible } from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function AdmissionsPage() {
  const lang = getLang();
  const [page, settings] = await Promise.all([
    getPageContent('admissions'),
    getSettings(),
  ]);
  if (!pageVisible(settings, 'admissions')) return <PageUnavailable lang={lang} />;

  return (
    <PageShell
      kicker={t(lang, 'navAdmissions')}
      title={pick(lang, page.title, page.title_hi)}
      lang={lang}
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <div
          className="lg:col-span-8 cms-body text-[17px] text-slate-600"
          dangerouslySetInnerHTML={{ __html: pick(lang, page.body, page.body_hi) }}
        />
        <aside className="lg:col-span-4">
          <div className="rounded-2xl bg-saffron p-7 shadow-card lg:sticky lg:top-40">
            <h2 className="font-display font-extrabold text-[22px] text-navy-950">
              {t(lang, 'haveAQuestion')}
            </h2>
            <p className="text-sm mt-2.5 leading-relaxed text-navy-950/80">
              {t(lang, 'admissionsAside')}
            </p>
            {pageVisible(settings, 'contact') && (
              <Link
                href="/contact"
                className="inline-block mt-5 rounded-full bg-navy-950 text-white font-bold px-6 py-3 hover:bg-navy-900 transition-all hover:-translate-y-0.5"
              >
                {t(lang, 'contactTheOffice')} →
              </Link>
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
