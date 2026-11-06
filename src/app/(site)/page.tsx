import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import {
  externalHref,
  formatDate,
  getEvents,
  getFacilities,
  getGallery,
  getHeroSlides,
  getNews,
  getNotices,
  getSettings,
  getTeachers,
  mapEmbedSrc,
  mapSearchUrl,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

const cardCls =
  'rounded-2xl bg-white shadow-card ring-1 ring-ink/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift';

export default async function HomePage() {
  const [settings, slides, notices, news, events, gallery, teachers, facilities] =
    await Promise.all([
      getSettings(),
      getHeroSlides(),
      getNotices(5),
      getNews(3),
      getEvents(3),
      getGallery(6),
      getTeachers(4),
      getFacilities(),
    ]);

  return (
    <>
      <Hero slides={slides} settings={settings} />

      {/* About strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-marigold-dark font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-3">
            <span className="inline-block h-px w-8 bg-marigold" />
            01 — The School
          </p>
          <h2 className="font-display font-black text-3xl sm:text-[40px] text-pine-deep leading-[1.12]">
            A public school with a private standard.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pt-9">
          <p className="text-lg leading-[1.85] text-ink/80">
            {settings.about_short}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full bg-pine text-paper font-bold px-6 py-3 shadow-soft hover:bg-pine-dark transition-all hover:-translate-y-0.5"
            >
              More About Us →
            </Link>
            <Link
              href="/faculty"
              className="rounded-full font-bold px-6 py-3 ring-1 ring-ink/20 hover:ring-pine hover:text-pine transition-colors"
            >
              Meet the Faculty
            </Link>
          </div>
        </div>
      </section>

      {/* Notices + News */}
      <section className="bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="02 — Notice Board"
              title="Latest Notices"
              linkHref="/news"
              linkLabel="All notices"
            />
            <ul className="space-y-3.5">
              {notices.map((n) => (
                <li key={n.id} className={`${cardCls} p-5`}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">{n.is_pinned ? '📌' : '📄'}</span>
                    <div className="min-w-0">
                      <p className="font-bold leading-snug">{n.title}</p>
                      <p className="text-xs text-ink/55 mt-1.5">
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
                    </div>
                  </div>
                </li>
              ))}
              {notices.length === 0 && (
                <li className="text-ink/60">No notices right now.</li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              kicker="03 — Campus News"
              title="News & Stories"
              linkHref="/news"
              linkLabel="All news"
            />
            <div className="grid sm:grid-cols-2 gap-5">
              {news.map((item, i) => (
                <article key={item.id} className={`${cardCls} ${i === 0 ? 'sm:col-span-2' : ''}`}>
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={1200}
                      height={600}
                      className={`w-full object-cover ${i === 0 ? 'h-60' : 'h-44'}`}
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
                  </div>
                </article>
              ))}
              {news.length === 0 && (
                <p className="text-ink/60">News will appear here soon.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
          <SectionHeading
            kicker="04 — Calendar"
            title="Upcoming Events"
            linkHref="/events"
            linkLabel="All events"
          />
          <div className="grid md:grid-cols-3 gap-5">
            {events.map((ev) => (
              <article key={ev.id} className={`${cardCls} p-6 flex gap-5`}>
                <div className="shrink-0 w-[68px] h-[68px] rounded-2xl bg-pine text-paper flex flex-col items-center justify-center">
                  <span className="font-display font-black text-[26px] leading-none">
                    {new Date(ev.event_date).getDate()}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] mt-1">
                    {new Date(ev.event_date)
                      .toLocaleDateString('en-IN', { month: 'short' })
                      .toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg leading-snug text-pine-deep">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-ink/70 mt-1.5 leading-relaxed">{ev.description}</p>
                  {ev.location && (
                    <p className="text-xs font-semibold text-pine mt-2.5">
                      📍 {ev.location}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Facilities strip */}
      <section className="relative bg-pine-deep text-paper overflow-hidden">
        <div className="absolute inset-0 texture-dots opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
          <SectionHeading
            dark
            kicker="05 — On Campus"
            title="Facilities"
            linkHref="/facilities"
            linkLabel="Explore all"
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {facilities.slice(0, 6).map((f) => (
              <div
                key={f.id}
                className="rounded-2xl bg-paper/[0.06] ring-1 ring-paper/15 p-6 transition-colors hover:bg-paper/10"
              >
                <p className="text-[34px] leading-none">{f.icon}</p>
                <h3 className="font-display font-bold text-lg mt-3.5">{f.title}</h3>
                <p className="text-sm text-paper/70 mt-1.5 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
          <SectionHeading
            kicker="06 — Gallery"
            title="Moments from Campus"
            linkHref="/gallery"
            linkLabel="Full gallery"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {gallery.map((g) => (
              <figure
                key={g.id}
                className="relative group overflow-hidden rounded-2xl shadow-card"
              >
                <Image
                  src={g.image_url}
                  alt={g.caption}
                  width={800}
                  height={600}
                  className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-paper text-sm font-semibold px-4 pt-10 pb-3.5">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Teachers preview */}
      {teachers.length > 0 && (
        <section className="bg-cream/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
            <SectionHeading
              kicker="07 — People"
              title="Our Faculty"
              linkHref="/faculty"
              linkLabel="All faculty"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {teachers.map((t) => (
                <div key={t.id} className={`${cardCls} p-6 text-center`}>
                  {t.photo_url ? (
                    <Image
                      src={t.photo_url}
                      alt={t.name}
                      width={200}
                      height={200}
                      className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-pine/25"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-pine text-paper font-display font-black text-2xl flex items-center justify-center mx-auto">
                      {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <h3 className="font-display font-bold mt-4 leading-snug text-pine-deep">{t.name}</h3>
                  <p className="text-pine font-semibold text-sm mt-0.5">{t.role}</p>
                  {t.subject && <p className="text-ink/60 text-sm">{t.subject}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map + contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="flex items-center gap-3 text-marigold-dark font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-3">
            <span className="inline-block h-px w-8 bg-marigold" />
            08 — Visit Us
          </p>
          <h2 className="font-display font-black text-3xl sm:text-[40px] text-pine-deep leading-[1.12]">
            Find the school
          </h2>
          <p className="mt-5 text-ink/80 leading-relaxed text-[17px]">
            📍 {settings.address}, {settings.city}, {settings.state}
            {settings.pincode ? ` — ${settings.pincode}` : ''}
          </p>
          {settings.phone && (
            <p className="mt-2.5 font-semibold">
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-pine transition-colors">
                ☎ {settings.phone}
              </a>
            </p>
          )}
          {settings.email && (
            <p className="mt-1.5 font-semibold">
              <a href={`mailto:${settings.email}`} className="hover:text-pine transition-colors">
                ✉ {settings.email}
              </a>
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-marigold text-ink font-bold px-6 py-3 shadow-soft hover:bg-marigold-light transition-all hover:-translate-y-0.5"
            >
              Send an Enquiry →
            </Link>
            <a
              href={mapSearchUrl(settings)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full font-bold px-6 py-3 ring-1 ring-ink/20 hover:ring-pine hover:text-pine transition-colors"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lift ring-1 ring-ink/10">
          <iframe
            title="School location map"
            src={mapEmbedSrc(settings)}
            className="w-full h-80 lg:h-full min-h-[340px] block"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
