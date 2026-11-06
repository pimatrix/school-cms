import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { externalHref, formatDate, getNews, getNotices } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const [notices, news] = await Promise.all([getNotices(), getNews()]);

  return (
    <PageShell kicker="Stay Updated" title="News & Notices">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Notices column */}
        <div className="lg:col-span-5">
          <h2 className="font-display font-bold text-2xl text-pine-deep mb-6">
            📌 Notice Board
          </h2>
          <ul className="space-y-3.5">
            {notices.map((n) => (
              <li
                key={n.id}
                className="rounded-2xl bg-white shadow-card ring-1 ring-ink/5 p-5"
              >
                <p className="font-bold leading-snug">
                  {n.is_pinned && <span className="text-clay">📌 </span>}
                  {n.title}
                </p>
                {n.body && (
                  <p className="text-sm text-ink/75 mt-2 leading-relaxed whitespace-pre-wrap">
                    {n.body}
                  </p>
                )}
                <p className="text-xs text-ink/55 mt-2.5">
                  {formatDate(n.created_at)}
                  {n.link_url && (
                    <>
                      {' • '}
                      <a
                        href={externalHref(n.link_url)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pine font-semibold underline underline-offset-2"
                      >
                        View / Download
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
            {notices.length === 0 && (
              <li className="text-ink/60">No notices at the moment.</li>
            )}
          </ul>
        </div>

        {/* News column */}
        <div className="lg:col-span-7">
          <h2 className="font-display font-bold text-2xl text-pine-deep mb-6">
            📰 News & Stories
          </h2>
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-white shadow-card ring-1 ring-ink/5 overflow-hidden sm:flex transition-all duration-300 hover:shadow-lift"
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={600}
                    height={450}
                    className="w-full sm:w-60 h-48 sm:h-auto object-cover shrink-0"
                  />
                )}
                <div className="p-6">
                  <p className="text-[11px] font-bold text-marigold-dark tracking-[0.14em] uppercase">
                    {formatDate(item.publish_date)}
                  </p>
                  <h3 className="font-display font-bold text-[22px] mt-2 leading-snug text-pine-deep">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink/70 mt-2.5 leading-relaxed">
                    {item.excerpt}
                  </p>
                  {item.body && (
                    <p className="text-sm text-ink/80 mt-3 leading-relaxed whitespace-pre-wrap">
                      {item.body}
                    </p>
                  )}
                </div>
              </article>
            ))}
            {news.length === 0 && (
              <p className="text-ink/60">News will appear here soon.</p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
