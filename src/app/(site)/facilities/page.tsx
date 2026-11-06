import Image from 'next/image';
import FacilityIcon from '@/components/FacilityIcon';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getFacilities, getSettings, pageVisible } from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function FacilitiesPage() {
  const lang = getLang();
  const [facilities, settings] = await Promise.all([
    getFacilities(),
    getSettings(),
  ]);
  if (!pageVisible(settings, 'facilities')) return <PageUnavailable lang={lang} />;

  return (
    <PageShell kicker={t(lang, 'onCampus')} title={t(lang, 'facilitiesTitle')} lang={lang}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {facilities.map((f) => (
          <article
            key={f.id}
            className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            {f.image_url ? (
              <Image
                src={f.image_url}
                alt={pick(lang, f.title, f.title_hi)}
                width={800}
                height={450}
                className="w-full h-44 object-cover"
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center">
                <FacilityIcon icon={f.icon} className="w-12 h-12 text-white" />
              </div>
            )}
            <div className="p-6">
              <h2 className="font-display font-bold text-xl text-navy-900">
                {pick(lang, f.title, f.title_hi)}
              </h2>
              <p className="text-slate-500 mt-2 leading-relaxed">
                {pick(lang, f.description, f.description_hi)}
              </p>
            </div>
          </article>
        ))}
        {facilities.length === 0 && (
          <p className="text-slate-500">{t(lang, 'facilitiesSoon')}</p>
        )}
      </div>
    </PageShell>
  );
}
