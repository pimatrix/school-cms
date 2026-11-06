import Image from 'next/image';
import PageShell from '@/components/PageShell';
import { getGallery } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const gallery = await getGallery();
  const categories = Array.from(new Set(gallery.map((g) => g.category)));
  return (
    <PageShell kicker="Gallery" title="Photo Gallery">
      {categories.map((cat) => (
        <div key={cat} className="mb-14">
          <h2 className="flex items-center gap-3 font-display font-bold text-2xl text-pine-deep mb-5">
            <span className="inline-block h-px w-8 bg-marigold" />
            {cat}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {gallery
              .filter((g) => g.category === cat)
              .map((g) => (
                <figure
                  key={g.id}
                  className="relative group overflow-hidden rounded-2xl shadow-card"
                >
                  <Image
                    src={g.image_url}
                    alt={g.caption}
                    width={700}
                    height={520}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-paper text-sm font-semibold px-4 pt-10 pb-3.5">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
          </div>
        </div>
      ))}
      {gallery.length === 0 && (
        <p className="text-ink/60">Photos will appear here soon.</p>
      )}
    </PageShell>
  );
}
