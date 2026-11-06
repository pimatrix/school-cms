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
      <section className="bg-pine-deep text-paper texture-dots">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-marigold font-extrabold tracking-[0.22em] text-xs uppercase mb-2">
            {kicker}
          </p>
          <h1 className="font-display font-black text-4xl sm:text-5xl leading-tight">
            {title}
          </h1>
          <div className="mt-4 h-1.5 w-24 bg-marigold" />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">{children}</section>
    </>
  );
}
