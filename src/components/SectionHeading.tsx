export default function SectionHeading({
  kicker,
  title,
  linkHref,
  linkLabel,
}: {
  kicker: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-pine font-extrabold tracking-[0.22em] text-xs uppercase mb-2">
          {kicker}
        </p>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-pine-deep leading-tight">
          {title}
        </h2>
        <div className="mt-3 h-1.5 w-24 bg-marigold" />
      </div>
      {linkHref && linkLabel && (
        <a
          href={linkHref}
          className="hidden sm:inline-block shrink-0 font-bold text-sm text-pine link-flourish"
        >
          {linkLabel} →
        </a>
      )}
    </div>
  );
}
