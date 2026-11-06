import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getPageContent, getSettings, pageVisible } from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Academics at Govt School of Excellence Bal Vinay Mandir, Indore — MP Board (MPBSE) curriculum, English medium, Classes 1 to 12.',
};


export const dynamic = 'force-dynamic';

export default async function AcademicsPage() {
  const lang = getLang();
  const [page, settings] = await Promise.all([
    getPageContent('academics'),
    getSettings(),
  ]);
  if (!pageVisible(settings, 'academics')) return <PageUnavailable lang={lang} />;

  return (
    <PageShell
      kicker={t(lang, 'navAcademics')}
      title={pick(lang, page.title, page.title_hi)}
      lang={lang}
    >
      <div
        className="cms-body text-[17px] text-slate-600 max-w-4xl"
        dangerouslySetInnerHTML={{ __html: pick(lang, page.body, page.body_hi) }}
      />
    </PageShell>
  );
}
