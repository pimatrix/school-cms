import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NoticeTicker from '@/components/NoticeTicker';
import { getNotices, getSettings } from '@/lib/data';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = getLang();
  const [settings, notices] = await Promise.all([getSettings(), getNotices(8)]);
  // Structured data (schema.org) so search engines can identify the
  // school, its address and location unambiguously.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: settings.school_name,
    alternateName: 'शासकीय उत्कृष्ट बाल विनय मंदिर',
    description: settings.about_short,
    url: 'https://school-cms-mauve.vercel.app',
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.pincode,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 22.724576, longitude: 75.869898 },
  };
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header settings={settings} lang={lang} />
      <NoticeTicker notices={notices} lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} lang={lang} />
    </div>
  );
}
