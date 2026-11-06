import Link from 'next/link';

export default function SectionHeading({
  kicker,
  title,
  linkHref,
  linkLabel,
  dark = false,
}: {
  kicker: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-10">
      <div>
        <p
          className={`flex items-center gap-3 font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase mb-3 ${
            dark ? 'text-marigold-light' : 'text-marigold-dark'
          }`}
        >
          <span className={`inline-block h-px w-8 ${dark ? 'bg-marigold-light' : 'bg-marigold'}`} />
          {kicker}
        </p>
        <h2
          className={`font-display font-black text-3xl sm:text-[40px] leading-[1.1] ${
            dark ? 'text-paper' : 'text-pine-deep'
          }`}
        >
          {title}
        </h2>
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={`hidden sm:inline-block shrink-0 font-bold text-sm link-flourish pb-1 ${
            dark ? 'text-marigold-light' : 'text-pine'
          }`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
