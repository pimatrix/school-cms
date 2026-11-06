import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { getFacilities } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function FacilitiesPage() {
  const facilities = await getFacilities();
  return (
    <PageShell kicker="On Campus" title="Facilities">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {facilities.map((f) => (
          <article
            key={f.id}
            className="rounded-2xl bg-white shadow-card ring-1 ring-ink/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            {f.image_url ? (
              <Image
                src={f.image_url}
                alt={f.title}
                width={800}
                height={450}
                className="w-full h-44 object-cover"
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-br from-pine to-pine-dark flex items-center justify-center text-5xl">
                {f.icon}
              </div>
            )}
            <div className="p-6">
              <h2 className="font-display font-bold text-xl text-pine-deep">
                {f.title}
              </h2>
              <p className="text-ink/70 mt-2 leading-relaxed">{f.description}</p>
            </div>
          </article>
        ))}
        {facilities.length === 0 && (
          <p className="text-ink/60">Facilities will be listed here soon.</p>
        )}
      </div>
    </PageShell>
  );
}
