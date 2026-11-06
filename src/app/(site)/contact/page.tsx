import ContactForm from '@/components/ContactForm';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getSettings, mapEmbedSrc, mapSearchUrl, pageVisible } from '@/lib/data';
import { t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const lang = getLang();
  const settings = await getSettings();
  if (!pageVisible(settings, 'contact')) return <PageUnavailable lang={lang} />;

  return (
    <PageShell kicker={t(lang, 'navContact')} title={t(lang, 'contactTitle')} lang={lang}>
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-navy-900 text-white p-7 shadow-card">
            <h2 className="font-display font-bold text-[22px] text-saffron-light">
              {t(lang, 'schoolOffice')}
            </h2>
            <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed">
              <li>
                📍 {settings.address}, {settings.city}, {settings.state}
                {settings.pincode ? ` — ${settings.pincode}` : ''}
              </li>
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-saffron-light transition-colors">
                    ☎ {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-saffron-light transition-colors">
                    ✉ {settings.email}
                  </a>
                </li>
              )}
              <li>🎓 {settings.board_name}</li>
              <li className="text-white/60 text-sm">{settings.affiliation}</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card ring-1 ring-slate-900/10">
            <iframe
              title="School location map"
              src={mapEmbedSrc(settings)}
              className="w-full h-72 block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={mapSearchUrl(settings)}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-bold text-sm text-navy-700 link-flourish pb-0.5"
          >
            {t(lang, 'openInGoogleMaps')} ↗
          </a>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-display font-bold text-[26px] text-navy-900 mb-3">
            {t(lang, 'sendEnquiryHeading')}
          </h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            {t(lang, 'contactIntro')}
          </p>
          <ContactForm lang={lang} />
        </div>
      </div>
    </PageShell>
  );
}
