import PageShell from '@/components/PageShell';
import { getPageContent, getSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [page, settings] = await Promise.all([
    getPageContent('about'),
    getSettings(),
  ]);
  const facts = [
    { label: 'Board', value: settings.board_name },
    { label: 'Affiliation', value: settings.affiliation },
    { label: 'Established', value: settings.established_year },
    { label: 'Students', value: settings.students_count },
    { label: 'Faculty', value: settings.staff_count },
    { label: 'Location', value: `${settings.city}, ${settings.state}` },
  ].filter((f) => f.value);

  return (
    <PageShell kicker="About" title={page.title}>
      <div className="grid lg:grid-cols-12 gap-10">
        <div
          className="lg:col-span-8 cms-body text-[17px] text-ink/85"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
        {facts.length > 0 && (
          <aside className="lg:col-span-4">
            <div className="bg-pine-deep text-paper p-6 border-2 border-ink shadow-card">
              <h2 className="font-display font-bold text-xl text-marigold mb-4">
                School at a Glance
              </h2>
              <dl className="space-y-3">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex justify-between gap-4 border-b border-paper/15 pb-2"
                  >
                    <dt className="text-paper/60 text-sm font-semibold">
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
