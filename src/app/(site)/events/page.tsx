import Image from 'next/image';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { formatDate, getEvents, getSettings, pageVisible } from '@/lib/data';
import { pick, t, type Lang } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const lang = getLang();
  const [events, settings] = await Promise.all([getEvents(), getSettings()]);
  if (!pageVisible(settings, 'events')) return <PageUnavailable lang={lang} />;

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today).reverse();

  const renderEvent = (ev: (typeof events)[number], l: Lang) => (
    <article
      key={ev.id}
      className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      {ev.image_url && (
        <Image
          src={ev.image_url}
          alt={pick(l, ev.title, ev.title_hi)}
          width={800}
          height={450}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-6 flex gap-5">
        <div className="shrink-0 w-16 h-16 rounded-2xl bg-navy-700 text-white flex flex-col items-center justify-center">
          <span className="font-display font-extrabold text-2xl leading-none">
            {new Date(ev.event_date).getDate()}
          </span>
          <span className="text-[10px] font-bold tracking-[0.18em] mt-1">
            {new Date(ev.event_date)
              .toLocaleDateString(l === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short' })
              .toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-bold text-lg leading-snug text-navy-900">
            {pick(l, ev.title, ev.title_hi)}
          </h3>
          <p className="text-xs font-semibold text-navy-700 mt-1">
            {formatDate(ev.event_date, l)}
            {ev.location ? ` • 📍 ${ev.location}` : ''}
          </p>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {pick(l, ev.description, ev.description_hi)}
          </p>
        </div>
      </div>
    </article>
  );

  return (
    <PageShell kicker={t(lang, 'calendar')} title={t(lang, 'eventsTitle')} lang={lang}>
      <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">
        {t(lang, 'upcomingEventsTitle')}
      </h2>
      {upcoming.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {upcoming.map((ev) => renderEvent(ev, lang))}
        </div>
      ) : (
        <p className="text-slate-500 mb-10">{t(lang, 'noUpcomingEvents')}</p>
      )}

      {past.length > 0 && (
        <>
          <h2 className="font-display font-bold text-2xl text-navy-900 mt-14 mb-6">
            {t(lang, 'pastEvents')}
          </h2>
          <div className="grid md:grid-cols-2 gap-5 opacity-75">
            {past.map((ev) => renderEvent(ev, lang))}
          </div>
        </>
      )}
    </PageShell>
  );
}
