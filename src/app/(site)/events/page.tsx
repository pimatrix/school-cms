import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { formatDate, getEvents } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today).reverse();

  const renderEvent = (ev: (typeof events)[number]) => (
    <article
      key={ev.id}
      className="bg-paper border-2 border-ink shadow-card overflow-hidden"
    >
      {ev.image_url && (
        <Image
          src={ev.image_url}
          alt={ev.title}
          width={800}
          height={450}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-5 flex gap-4">
        <div className="shrink-0 w-14 h-14 bg-pine text-paper flex flex-col items-center justify-center border-2 border-ink">
          <span className="font-display font-black text-xl leading-none">
            {new Date(ev.event_date).getDate()}
          </span>
          <span className="text-[10px] font-bold tracking-widest">
            {new Date(ev.event_date)
              .toLocaleDateString('en-IN', { month: 'short' })
              .toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-display font-bold text-lg leading-snug">{ev.title}</h3>
          <p className="text-xs font-semibold text-pine mt-0.5">
            {formatDate(ev.event_date)}
            {ev.location ? ` • 📍 ${ev.location}` : ''}
          </p>
          <p className="text-sm text-ink/70 mt-2 leading-relaxed">
            {ev.description}
          </p>
        </div>
      </div>
    </article>
  );

  return (
    <PageShell kicker="Calendar" title="Events">
      <h2 className="font-display font-bold text-2xl text-pine-deep mb-5">
        Upcoming Events
      </h2>
      {upcoming.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">{upcoming.map(renderEvent)}</div>
      ) : (
        <p className="text-ink/60 mb-10">
          No upcoming events scheduled right now — check the notice board for
          announcements.
        </p>
      )}

      {past.length > 0 && (
        <>
          <h2 className="font-display font-bold text-2xl text-pine-deep mt-12 mb-5">
            Past Events
          </h2>
          <div className="grid md:grid-cols-2 gap-5 opacity-80">
            {past.map(renderEvent)}
          </div>
        </>
      )}
    </PageShell>
  );
}
