import type { Metadata } from 'next';
import { getLang } from '@/lib/lang';
import './globals.css';

export const metadata: Metadata = {
  title: 'Govt School of Excellence Bal Vinay Mandir, Indore',
  description:
    'Official website of Govt School of Excellence Bal Vinay Mandir, Indore — notices, news, events, admissions, faculty and gallery, managed through a secure CMS.',
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
      <body>{children}</body>
    </html>
  );
}
