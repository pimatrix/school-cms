import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { formatDate, getNews, getNotices } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const [notices, news] = await Promise.all([getNotices(), getNews()]);

  return (
    <PageShell kicker="Stay Updated" title="News & Notices">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Notices column */}
        <div className="lg:col-span-5">
          <h2 className="font-display font-bold text-2xl text-pine-deep mb-5">
            📌 Notice Board
          </h2>
          <ul className="space-y-3">
            {notices.map((n) => (
              <li key={n.id} className="bg-paper border-2 border-ink p-4 shadow-card">
                <p className="font-bold leading-snug">
                  {n.is_pinned && <span className="text-clay">📌 </span>}
                  {n.title}
                </p>
                {n.body && (
                  <p className="text-sm text-ink/75 mt-2 leading-relaxed whitespace-pre-wrap">
                    {n.body}
                  </p>
                )}
                <p className="text-xs text-ink/55 mt-2">
                  {formatDate(n.created_at)}
                  {n.link_url && (
                    <>
                      {' • '}
                      <a
                        href={n.link_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pine font-semibold underline"
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
          <h2 className="font-display font-bold text-2xl text-pine-deep mb-5">
            📰 News & Stories
          </h2>
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-paper border-2 border-ink shadow-card overflow-hidden sm:flex"
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={600}
                    height={450}
                    className="w-full sm:w-56 h-44 sm:h-auto object-cover shrink-0"
                  />
                )}
                <div className="p-5">
                  <p className="text-xs font-bold text-pine tracking-wide">
                    {formatDate(item.publish_date)}
                  </p>
                  <h3 className="font-display font-bold text-xl mt-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink/70 mt-2 leading-relaxed">
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
