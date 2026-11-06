import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { getTeachers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function FacultyPage() {
  const teachers = await getTeachers();
  return (
    <PageShell kicker="People" title="Our Faculty">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="bg-paper border-2 border-ink shadow-card p-5 text-center"
          >
            {t.photo_url ? (
              <Image
                src={t.photo_url}
                alt={t.name}
                width={240}
                height={240}
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-pine"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-pine text-paper font-display font-black text-3xl flex items-center justify-center mx-auto border-2 border-ink">
                {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
            )}
            <h3 className="font-display font-bold text-lg mt-3 leading-snug">
              {t.name}
            </h3>
            <p className="text-pine font-semibold text-sm">{t.role}</p>
            {t.subject && <p className="text-ink/70 text-sm mt-0.5">{t.subject}</p>}
            {t.qualification && (
              <p className="text-ink/55 text-xs mt-1">{t.qualification}</p>
            )}
          </div>
        ))}
        {teachers.length === 0 && (
          <p className="text-ink/60 col-span-full">
            Faculty profiles will be added here soon.
          </p>
        )}
      </div>
    </PageShell>
  );
}
