import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getPageContent, getSettings, pageVisible } from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Govt School of Excellence Bal Vinay Mandir, Indore — the school history since 1914, a Government of Madhya Pradesh Excellence school affiliated to the MP Board (MPBSE).',
};


export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const lang = getLang();
  const [page, settings] = await Promise.all([
    getPageContent('about'),
    getSettings(),
  ]);
  if (!pageVisible(settings, 'about')) return <PageUnavailable lang={lang} />;

  const facts = [
    { label: t(lang, 'factBoard'), value: settings.board_name },
    { label: t(lang, 'factAffiliation'), value: settings.affiliation },
    { label: t(lang, 'factEstablished'), value: settings.established_year },
    { label: t(lang, 'factStudents'), value: settings.students_count },
    { label: t(lang, 'factFaculty'), value: settings.staff_count },
    { label: t(lang, 'factLocation'), value: `${settings.city}, ${settings.state}` },
  ].filter((f) => f.value);

  const title = pick(lang, page.title, page.title_hi);
  const body = pick(lang, page.body, page.body_hi);

  return (
    <PageShell kicker={t(lang, 'navAbout')} title={title} lang={lang}>
      <div className="grid lg:grid-cols-12 gap-10">
        <div
          className="lg:col-span-8 cms-body text-[17px] text-slate-600"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {facts.length > 0 && (
          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-navy-900 text-white p-7 shadow-card lg:sticky lg:top-40">
              <h2 className="font-display font-bold text-[22px] text-saffron-light mb-5">
                {t(lang, 'schoolAtAGlance')}
              </h2>
              <dl className="space-y-3.5">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-white/55 text-sm font-semibold">
                      {f.label}
                    </dt>
                    <dd className="font-bold text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        )}
      </div>
    </PageShell>
  );
}
