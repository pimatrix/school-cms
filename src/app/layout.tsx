import type { Metadata } from 'next';
import NavProgress from '@/components/NavProgress';
import { getLang } from '@/lib/lang';
import './globals.css';

const SITE_URL = 'https://school-cms-mauve.vercel.app';
const SCHOOL_NAME = 'Govt School of Excellence Bal Vinay Mandir, Indore';
const DESCRIPTION =
  'Official website of Govt School of Excellence Bal Vinay Mandir, Indore (शासकीय उत्कृष्ट बाल विनय मंदिर) — a Government of Madhya Pradesh school affiliated to the MP Board (MPBSE), Classes 1 to 12, English medium. Notices, news, events, admissions, faculty and gallery.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SCHOOL_NAME,
    template: '%s | Govt School of Excellence Bal Vinay Mandir, Indore',
  },
  description: DESCRIPTION,
  keywords: [
    'Govt School of Excellence Bal Vinay Mandir',
    'Bal Vinay Mandir Indore',
    'School of Excellence Bal Vinay Mandir',
    'शासकीय उत्कृष्ट बाल विनय मंदिर',
    'government school Indore',
    'MP Board school Indore',
    'Bal Vinay Mandir admissions',
  ],
  applicationName: SCHOOL_NAME,
  authors: [{ name: SCHOOL_NAME }],
  creator: SCHOOL_NAME,
  publisher: SCHOOL_NAME,
  category: 'education',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SCHOOL_NAME,
    title: SCHOOL_NAME,
    description: DESCRIPTION,
    locale: 'en_IN',
    countryName: 'India',
  },
  twitter: {
    card: 'summary',
    title: SCHOOL_NAME,
    description: DESCRIPTION,
  },
  other: {
    'geo.region': 'IN-MP',
    'geo.placename': 'Indore',
    'geo.position': '22.724576;75.869898',
    ICBM: '22.724576, 75.869898',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = getLang();
  return (
    <html lang={lang === 'hi' ? 'hi' : 'en'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavProgress />
        {children}
      </body>
    </html>
  );
}
