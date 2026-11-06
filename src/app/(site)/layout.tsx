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
  return (
    <div className="min-h-screen flex flex-col">
      <Header settings={settings} lang={lang} />
      <NoticeTicker notices={notices} lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} lang={lang} />
    </div>
  );
}
