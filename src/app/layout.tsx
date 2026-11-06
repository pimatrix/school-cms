import type { Metadata } from 'next';
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
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,900&family=Public+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
