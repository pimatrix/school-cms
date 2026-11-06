import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import {
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
} from '@/lib/data';

export const dynamic = 'force-dynamic';

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
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="text-pine font-extrabold tracking-[0.22em] text-xs uppercase mb-2">
            01 — The School
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-pine-deep leading-tight">
            A public school with a private standard.
          </h2>
          <div className="mt-3 h-1.5 w-24 bg-marigold" />
        </div>
        <div className="lg:col-span-8">
          <p className="text-lg leading-relaxed text-ink/85">
            {settings.about_short}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="bg-pine text-paper font-bold px-5 py-2.5 border-2 border-ink shadow-card hover:-translate-y-0.5 transition-transform"
            >
              More About Us →
            </Link>
            <Link
              href="/faculty"
              className="font-bold px-5 py-2.5 border-2 border-ink hover:bg-cream transition-colors"
            >
              Meet the Faculty
            </Link>
          </div>
        </div>
      </section>

      {/* Notices + News */}
      <section className="bg-cream/60 texture-dots-dark border-y-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="02 — Notice Board"
              title="Latest Notices"
              linkHref="/news"
              linkLabel="All notices"
            />
            <ul className="space-y-3">
              {notices.map((n) => (
                <li
                  key={n.id}
                  className="bg-paper border-2 border-ink p-4 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{n.is_pinned ? '📌' : '📄'}</span>
                    <div>
                      <p className="font-bold leading-snug">{n.title}</p>
                      <p className="text-xs text-ink/60 mt-1">
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
                <article
                  key={item.id}
                  className={`bg-paper border-2 border-ink shadow-card overflow-hidden ${
                    i === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={1200}
                      height={600}
                      className={`w-full object-cover ${i === 0 ? 'h-56' : 'h-40'}`}
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
        <section className="max-w-7xl mx-auto px-4 py-16">
          <SectionHeading
            kicker="04 — Calendar"
            title="Upcoming Events"
            linkHref="/events"
            linkLabel="All events"
          />
          <div className="grid md:grid-cols-3 gap-5">
            {events.map((ev) => (
              <article
                key={ev.id}
                className="border-2 border-ink bg-paper shadow-card p-5 flex gap-4"
              >
                <div className="shrink-0 w-16 h-16 bg-pine text-paper flex flex-col items-center justify-center border-2 border-ink">
                  <span className="font-display font-black text-2xl leading-none">
                    {new Date(ev.event_date).getDate()}
                  </span>
                  <span className="text-[11px] font-bold tracking-widest">
                    {new Date(ev.event_date)
                      .toLocaleDateString('en-IN', { month: 'short' })
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-ink/70 mt-1">{ev.description}</p>
                  {ev.location && (
                    <p className="text-xs font-semibold text-pine mt-2">
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
      <section className="bg-pine-deep text-paper texture-dots">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-marigold font-extrabold tracking-[0.22em] text-xs uppercase mb-2">
                05 — On Campus
              </p>
              <h2 className="font-display font-black text-3xl sm:text-4xl leading-tight">
                Facilities
              </h2>
              <div className="mt-3 h-1.5 w-24 bg-marigold" />
            </div>
            <Link
              href="/facilities"
              className="hidden sm:inline-block font-bold text-sm text-marigold link-flourish"
            >
              Explore all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.slice(0, 6).map((f) => (
              <div
                key={f.id}
                className="border border-paper/25 p-5 hover:bg-paper/5 transition-colors"
              >
                <p className="text-3xl">{f.icon}</p>
                <h3 className="font-display font-bold text-lg mt-2">{f.title}</h3>
                <p className="text-sm text-paper/70 mt-1 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <SectionHeading
            kicker="06 — Gallery"
            title="Moments from Campus"
            linkHref="/gallery"
            linkLabel="Full gallery"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <figure key={g.id} className="relative group overflow-hidden border-2 border-ink">
                <Image
                  src={g.image_url}
                  alt={g.caption}
                  width={800}
                  height={600}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-ink/75 text-paper text-sm font-semibold px-3 py-2">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Teachers preview */}
      {teachers.length > 0 && (
        <section className="bg-cream/60 border-y-2 border-ink/10">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <SectionHeading
              kicker="07 — People"
              title="Our Faculty"
              linkHref="/faculty"
              linkLabel="All faculty"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {teachers.map((t) => (
                <div
                  key={t.id}
                  className="bg-paper border-2 border-ink shadow-card p-5 text-center"
                >
                  {t.photo_url ? (
                    <Image
                      src={t.photo_url}
                      alt={t.name}
                      width={200}
                      height={200}
                      className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-pine"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-pine text-paper font-display font-black text-2xl flex items-center justify-center mx-auto border-2 border-ink">
                      {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <h3 className="font-display font-bold mt-3 leading-snug">{t.name}</h3>
                  <p className="text-pine font-semibold text-sm">{t.role}</p>
                  {t.subject && <p className="text-ink/60 text-sm">{t.subject}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map + contact CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="text-pine font-extrabold tracking-[0.22em] text-xs uppercase mb-2">
            08 — Visit Us
          </p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-pine-deep leading-tight">
            Find the school
          </h2>
          <p className="mt-4 text-ink/80 leading-relaxed">
            📍 {settings.address}, {settings.city}, {settings.state}
            {settings.pincode ? ` — ${settings.pincode}` : ''}
          </p>
          {settings.phone && <p className="mt-2 font-semibold">☎ {settings.phone}</p>}
          {settings.email && <p className="mt-1 font-semibold">✉ {settings.email}</p>}
          <Link
            href="/contact"
            className="mt-6 self-start bg-marigold text-ink font-bold px-6 py-3 border-2 border-ink shadow-card hover:-translate-y-0.5 transition-transform"
          >
            Send an Enquiry →
          </Link>
        </div>
        <div className="lg:col-span-7 border-2 border-ink shadow-lift">
          <iframe
            title="School location map"
            src={mapEmbedSrc(settings)}
            className="w-full h-80 lg:h-full min-h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
