import ContactForm from '@/components/ContactForm';
import PageShell from '@/components/PageShell';
import { getSettings, mapEmbedSrc } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <PageShell kicker="Contact" title="Contact & Enquiry">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-pine-deep text-paper p-6 border-2 border-ink shadow-card">
            <h2 className="font-display font-bold text-xl text-marigold">
              School Office
            </h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                📍 {settings.address}, {settings.city}, {settings.state}
                {settings.pincode ? ` — ${settings.pincode}` : ''}
              </li>
              {settings.phone && <li>☎ {settings.phone}</li>}
              {settings.email && <li>✉ {settings.email}</li>}
              <li>🎓 {settings.board_name}</li>
              <li className="text-paper/70 text-sm">{settings.affiliation}</li>
            </ul>
          </div>
          <div className="border-2 border-ink shadow-lift">
            <iframe
              title="School location map"
              src={mapEmbedSrc(settings)}
              className="w-full h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className="font-display font-bold text-2xl text-pine-deep mb-4">
            Send an Enquiry
          </h2>
          <p className="text-ink/75 mb-5 leading-relaxed">
            Admission, documents, ya koi bhi jankari — form bharein, aapka
            message seedha school ke admin inbox me jayega.
          </p>
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
