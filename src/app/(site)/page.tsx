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
  pageVisible,
} from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

const cardCls =
  'rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift';

export default async function HomePage() {
  const lang = getLang();
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

  const s = settings; // visibility shortcuts

  return (
    <>
      <Hero slides={slides} settings={settings} lang={lang} />

      {/* About strip */}
      {s.show_section_about && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-saffron-dark font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-3">
              <span className="inline-block h-px w-8 bg-saffron" />
              {t(lang, 'theSchool')}
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-[40px] text-navy-900 leading-[1.12]">
              {t(lang, 'publicSchoolStandard')}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-9">
            <p className="text-lg leading-[1.85] text-slate-600">
              {pick(lang, settings.about_short, settings.about_short_hi)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {pageVisible(s, 'about') && (
                <Link
                  href="/about"
                  className="rounded-full bg-navy-700 text-white font-bold px-6 py-3 shadow-soft hover:bg-navy-800 transition-all hover:-translate-y-0.5"
                >
                  {t(lang, 'moreAboutUs')} →
                </Link>
              )}
              {pageVisible(s, 'faculty') && (
                <Link
                  href="/faculty"
                  className="rounded-full font-bold px-6 py-3 ring-1 ring-slate-300 hover:ring-navy-700 hover:text-navy-800 transition-colors"
                >
                  {t(lang, 'meetTheFaculty')}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Notices + News */}
      {(s.show_section_notices || s.show_section_news) && (
        <section className="bg-navy-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-12">
            {s.show_section_notices && (
              <div className="lg:col-span-5">
                <SectionHeading
                  kicker={t(lang, 'noticeBoard')}
                  title={t(lang, 'latestNoticesTitle')}
                  linkHref={pageVisible(s, 'news') ? '/news' : undefined}
                  linkLabel={t(lang, 'allNotices')}
                />
                <ul className="space-y-3.5">
                  {notices.map((n) => (
                    <li key={n.id} className={`${cardCls} p-5`}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg leading-none mt-0.5">{n.is_pinned ? '📌' : '📄'}</span>
                        <div className="min-w-0">
                          <p className="font-bold leading-snug">
                            {pick(lang, n.title, n.title_hi)}
                          </p>
                          <p className="text-xs text-slate-400 mt-1.5">
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
                        </div>
                      </div>
                    </li>
                  ))}
                  {notices.length === 0 && (
                    <li className="text-slate-500">{t(lang, 'noNotices')}</li>
                  )}
                </ul>
              </div>
            )}

            {s.show_section_news && (
              <div className={s.show_section_notices ? 'lg:col-span-7' : 'lg:col-span-12'}>
                <SectionHeading
                  kicker={t(lang, 'campusNews')}
                  title={t(lang, 'newsAndStories')}
                  linkHref={pageVisible(s, 'news') ? '/news' : undefined}
                  linkLabel={t(lang, 'allNews')}
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  {news.map((item, i) => (
                    <article key={item.id} className={`${cardCls} ${i === 0 ? 'sm:col-span-2' : ''}`}>
                      {item.image_url && (
                        <Image
                          src={item.image_url}
                          alt={pick(lang, item.title, item.title_hi)}
                          width={1200}
                          height={600}
                          className={`w-full object-cover ${i === 0 ? 'h-60' : 'h-44'}`}
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
                      </div>
                    </article>
                  ))}
                  {news.length === 0 && (
                    <p className="text-slate-500">{t(lang, 'noNews')}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Events */}
      {s.show_section_events && events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
          <SectionHeading
            kicker={t(lang, 'calendar')}
            title={t(lang, 'upcomingEvents')}
            linkHref={pageVisible(s, 'events') ? '/events' : undefined}
            linkLabel={t(lang, 'allEvents')}
          />
          <div className="grid md:grid-cols-3 gap-5">
            {events.map((ev) => (
              <article key={ev.id} className={`${cardCls} p-6 flex gap-5`}>
                <div className="shrink-0 w-[68px] h-[68px] rounded-2xl bg-navy-700 text-white flex flex-col items-center justify-center">
                  <span className="font-display font-extrabold text-[26px] leading-none">
                    {new Date(ev.event_date).getDate()}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] mt-1">
                    {new Date(ev.event_date)
                      .toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short' })
                      .toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg leading-snug text-navy-900">
                    {pick(lang, ev.title, ev.title_hi)}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    {pick(lang, ev.description, ev.description_hi)}
                  </p>
                  {ev.location && (
                    <p className="text-xs font-semibold text-navy-700 mt-2.5">
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
      {s.show_section_facilities && facilities.length > 0 && (
        <section className="relative bg-navy-900 text-white overflow-hidden">
          <div className="absolute inset-0 texture-dots opacity-50 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
            <SectionHeading
              dark
              kicker={t(lang, 'onCampus')}
              title={t(lang, 'facilitiesTitle')}
              linkHref={pageVisible(s, 'facilities') ? '/facilities' : undefined}
              linkLabel={t(lang, 'exploreAll')}
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {facilities.slice(0, 6).map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl bg-white/[0.06] ring-1 ring-white/15 p-6 transition-colors hover:bg-white/10"
                >
                  <p className="text-[34px] leading-none">{f.icon}</p>
                  <h3 className="font-display font-bold text-lg mt-3.5">
                    {pick(lang, f.title, f.title_hi)}
                  </h3>
                  <p className="text-sm text-white/65 mt-1.5 leading-relaxed">
                    {pick(lang, f.description, f.description_hi)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery preview */}
      {s.show_section_gallery && gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
          <SectionHeading
            kicker={t(lang, 'galleryKicker')}
            title={t(lang, 'momentsFromCampus')}
            linkHref={pageVisible(s, 'gallery') ? '/gallery' : undefined}
            linkLabel={t(lang, 'fullGallery')}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {gallery.map((g) => (
              <figure
                key={g.id}
                className="relative group overflow-hidden rounded-2xl shadow-card bg-navy-950"
              >
                {g.media_type === 'video' ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    src={g.image_url}
                    controls
                    preload="metadata"
                    className="w-full h-52 sm:h-60 object-cover"
                  />
                ) : (
                  <Image
                    src={g.image_url}
                    alt={pick(lang, g.caption, g.caption_hi)}
                    width={800}
                    height={600}
                    className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {pick(lang, g.caption, g.caption_hi) && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white text-sm font-semibold px-4 pt-10 pb-3.5 pointer-events-none">
                    {pick(lang, g.caption, g.caption_hi)}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Teachers preview */}
      {s.show_section_faculty && teachers.length > 0 && (
        <section className="bg-navy-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
            <SectionHeading
              kicker={t(lang, 'people')}
              title={t(lang, 'ourFaculty')}
              linkHref={pageVisible(s, 'faculty') ? '/faculty' : undefined}
              linkLabel={t(lang, 'allFaculty')}
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {teachers.map((tc) => (
                <div key={tc.id} className={`${cardCls} p-6 text-center`}>
                  {tc.photo_url ? (
                    <Image
                      src={tc.photo_url}
                      alt={tc.name}
                      width={200}
                      height={200}
                      className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-navy-600/25"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-navy-700 text-white font-display font-extrabold text-2xl flex items-center justify-center mx-auto">
                      {tc.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <h3 className="font-display font-bold mt-4 leading-snug text-navy-900">{tc.name}</h3>
                  <p className="text-navy-700 font-semibold text-sm mt-0.5">
                    {pick(lang, tc.role, tc.role_hi)}
                  </p>
                  {tc.subject && (
                    <p className="text-slate-500 text-sm">
                      {pick(lang, tc.subject, tc.subject_hi)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map + contact CTA */}
      {s.show_section_map && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="flex items-center gap-3 text-saffron-dark font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-3">
              <span className="inline-block h-px w-8 bg-saffron" />
              {t(lang, 'visitUs')}
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-[40px] text-navy-900 leading-[1.12]">
              {t(lang, 'findTheSchool')}
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed text-[17px]">
              📍 {settings.address}, {settings.city}, {settings.state}
              {settings.pincode ? ` — ${settings.pincode}` : ''}
            </p>
            {settings.phone && (
              <p className="mt-2.5 font-semibold">
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-navy-800 transition-colors">
                  ☎ {settings.phone}
                </a>
              </p>
            )}
            {settings.email && (
              <p className="mt-1.5 font-semibold">
                <a href={`mailto:${settings.email}`} className="hover:text-navy-800 transition-colors">
                  ✉ {settings.email}
                </a>
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {pageVisible(s, 'contact') && (
                <Link
                  href="/contact"
                  className="rounded-full bg-saffron text-navy-950 font-bold px-6 py-3 shadow-soft hover:bg-saffron-light transition-all hover:-translate-y-0.5"
                >
                  {t(lang, 'sendAnEnquiry')} →
                </Link>
              )}
              <a
                href={mapSearchUrl(settings)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full font-bold px-6 py-3 ring-1 ring-slate-300 hover:ring-navy-700 hover:text-navy-800 transition-colors"
              >
                {t(lang, 'openInGoogleMaps')} ↗
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lift ring-1 ring-slate-900/10">
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
      )}
    </>
  );
}
