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
        <div key={cat} className="mb-12">
          <h2 className="font-display font-bold text-2xl text-pine-deep mb-4">
            {cat}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery
              .filter((g) => g.category === cat)
              .map((g) => (
                <figure
                  key={g.id}
                  className="relative group overflow-hidden border-2 border-ink"
                >
                  <Image
                    src={g.image_url}
                    alt={g.caption}
                    width={700}
                    height={520}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-ink/75 text-paper text-sm font-semibold px-3 py-2">
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
