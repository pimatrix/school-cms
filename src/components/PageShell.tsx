import Link from 'next/link';

export default function PageShell({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative bg-pine-deep text-paper overflow-hidden">
        <div className="absolute inset-0 texture-dots opacity-50 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-marigold/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-[72px]">
          <p className="flex items-center gap-3 text-marigold-light font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-4">
            <span className="inline-block h-px w-9 bg-marigold" />
            {kicker}
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] max-w-3xl">
            {title}
          </h1>
          <p className="mt-5 text-sm text-paper/55 font-medium">
            <Link href="/" className="hover:text-marigold-light transition-colors">
              Home
            </Link>
            <span className="mx-2 text-paper/30">/</span>
            <span className="text-paper/80">{title}</span>
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16 w-full">
        {children}
      </section>
    </>
  );
}
