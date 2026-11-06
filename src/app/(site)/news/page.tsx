import { Newspaper, Pin } from 'lucide-react';
import Image from 'next/image';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import {
  externalHref,
  formatDate,
  getNews,
  getNotices,
  getSettings,
  pageVisible,
} from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Notices',
  description: 'Latest news and notices from Govt School of Excellence Bal Vinay Mandir, Indore.',
};


export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const lang = getLang();
  const [notices, news, settings] = await Promise.all([
    getNotices(),
    getNews(),
    getSettings(),
  ]);
  if (!pageVisible(settings, 'news')) return <PageUnavailable lang={lang} />;

  return (
    <PageShell kicker={t(lang, 'stayUpdated')} title={t(lang, 'newsAndNoticesTitle')} lang={lang}>
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Notices column */}
        <div className="lg:col-span-5">
          <h2 className="font-display font-bold text-2xl text-navy-900 mb-6 flex items-center gap-2.5">
            <Pin className="w-6 h-6 text-saffron-dark shrink-0" aria-hidden /> {t(lang, 'noticeBoard')}
          </h2>
          <ul className="space-y-3.5">
            {notices.map((n) => (
              <li
                key={n.id}
                className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 p-5"
              >
                <p className="font-bold leading-snug">
                  {n.is_pinned && (
                    <Pin className="inline w-4 h-4 -mt-0.5 mr-1.5 text-clay" aria-hidden />
                  )}
                  {pick(lang, n.title, n.title_hi)}
                </p>
                {pick(lang, n.body, n.body_hi) && (
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed whitespace-pre-wrap">
                    {pick(lang, n.body, n.body_hi)}
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-2.5">
                  {formatDate(n.created_at, lang)}
                  {n.link_url && (
                    <>
                      {' • '}
                      <a
                        href={externalHref(n.link_url)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-navy-700 font-semibold underline underline-offset-2"
                      >
                        {t(lang, 'viewDownload')}
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
            {notices.length === 0 && (
              <li className="text-slate-500">{t(lang, 'noNewsYet')}</li>
            )}
          </ul>
        </div>

        {/* News column */}
        <div className="lg:col-span-7">
          <h2 className="font-display font-bold text-2xl text-navy-900 mb-6 flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-saffron-dark shrink-0" aria-hidden /> {t(lang, 'newsStoriesTitle')}
          </h2>
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 overflow-hidden sm:flex transition-all duration-300 hover:shadow-lift"
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={pick(lang, item.title, item.title_hi)}
                    width={600}
                    height={450}
                    className="w-full sm:w-60 h-48 sm:h-auto object-cover shrink-0"
                  />
                )}
                <div className="p-6">
                  <p className="text-[11px] font-bold text-saffron-dark tracking-[0.14em] uppercase">
                    {formatDate(item.publish_date, lang)}
                  </p>
                  <h3 className="font-display font-bold text-[22px] mt-2 leading-snug text-navy-900">
                    {pick(lang, item.title, item.title_hi)}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
                    {pick(lang, item.excerpt, item.excerpt_hi)}
                  </p>
                  {pick(lang, item.body, item.body_hi) && (
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed whitespace-pre-wrap">
                      {pick(lang, item.body, item.body_hi)}
                    </p>
                  )}
                </div>
              </article>
            ))}
            {news.length === 0 && (
              <p className="text-slate-500">{t(lang, 'noNews')}</p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
