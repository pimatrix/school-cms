import Image from 'next/image';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getSettings, getTeachers, pageVisible } from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function FacultyPage() {
  const lang = getLang();
  const [teachers, settings] = await Promise.all([getTeachers(), getSettings()]);
  if (!pageVisible(settings, 'faculty')) return <PageUnavailable lang={lang} />;

  return (
    <PageShell kicker={t(lang, 'people')} title={t(lang, 'ourFaculty')} lang={lang}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {teachers.map((tc) => (
          <div
            key={tc.id}
            className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            {tc.photo_url ? (
              <Image
                src={tc.photo_url}
                alt={tc.name}
                width={240}
                height={240}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-2 ring-navy-600/25"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-navy-700 text-white font-display font-extrabold text-3xl flex items-center justify-center mx-auto">
                {tc.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
            )}
            <h3 className="font-display font-bold text-lg mt-4 leading-snug text-navy-900">
              {tc.name}
            </h3>
            <p className="text-navy-700 font-semibold text-sm mt-0.5">
              {pick(lang, tc.role, tc.role_hi)}
            </p>
            {tc.subject && (
              <p className="text-slate-500 text-sm mt-0.5">
                {pick(lang, tc.subject, tc.subject_hi)}
              </p>
            )}
            {tc.qualification && (
              <p className="text-slate-400 text-xs mt-1.5">
                {pick(lang, tc.qualification, tc.qualification_hi)}
              </p>
            )}
          </div>
        ))}
        {teachers.length === 0 && (
          <p className="text-slate-500 col-span-full">{t(lang, 'facultySoon')}</p>
        )}
      </div>
    </PageShell>
  );
}
