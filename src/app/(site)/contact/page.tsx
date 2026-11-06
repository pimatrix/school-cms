import ContactForm from '@/components/ContactForm';
import PageShell from '@/components/PageShell';
import { getSettings, mapEmbedSrc, mapSearchUrl } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <PageShell kicker="Contact" title="Contact & Enquiry">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-pine-deep text-paper p-7 shadow-card">
            <h2 className="font-display font-bold text-[22px] text-marigold-light">
              School Office
            </h2>
            <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed">
              <li>
                📍 {settings.address}, {settings.city}, {settings.state}
                {settings.pincode ? ` — ${settings.pincode}` : ''}
              </li>
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-marigold-light transition-colors">
                    ☎ {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-marigold-light transition-colors">
                    ✉ {settings.email}
                  </a>
                </li>
              )}
              <li>🎓 {settings.board_name}</li>
              <li className="text-paper/65 text-sm">{settings.affiliation}</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card ring-1 ring-ink/10">
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
            className="inline-block font-bold text-sm text-pine link-flourish pb-0.5"
          >
            Open in Google Maps ↗
          </a>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-display font-bold text-[26px] text-pine-deep mb-3">
            Send an Enquiry
          </h2>
          <p className="text-ink/70 mb-6 leading-relaxed">
            For admissions, documents or any other information, send the form
            below — your message goes directly to the school office inbox.
          </p>
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
