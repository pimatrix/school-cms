import Link from 'next/link';
import { t, type Lang } from '@/lib/i18n';

export default function PageShell({
  kicker,
  title,
  lang = 'en',
  children,
}: {
  kicker: string;
  title: string;
  lang?: Lang;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 texture-dots opacity-50 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-saffron/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-[72px]">
          <p className="flex items-center gap-3 text-saffron-light font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-4">
            <span className="inline-block h-px w-9 bg-saffron" />
            {kicker}
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] max-w-3xl">
            {title}
          </h1>
          <p className="mt-5 text-sm text-white/55 font-medium">
            <Link href="/" className="hover:text-saffron-light transition-colors">
              {t(lang, 'navHome')}
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/85">{title}</span>
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16 w-full">
        {children}
      </section>
    </>
  );
}
