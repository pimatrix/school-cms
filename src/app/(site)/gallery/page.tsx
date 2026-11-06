import Image from 'next/image';
import PageShell from '@/components/PageShell';
import PageUnavailable from '@/components/PageUnavailable';
import { getGallery, getSettings, pageVisible } from '@/lib/data';
import { pick, t } from '@/lib/i18n';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const lang = getLang();
  const [gallery, settings] = await Promise.all([getGallery(), getSettings()]);
  if (!pageVisible(settings, 'gallery')) return <PageUnavailable lang={lang} />;

  const categories = Array.from(new Set(gallery.map((g) => g.category)));
  return (
    <PageShell kicker={t(lang, 'galleryKicker')} title={t(lang, 'photoGalleryTitle')} lang={lang}>
      {categories.map((cat) => (
        <div key={cat} className="mb-14">
          <h2 className="flex items-center gap-3 font-display font-bold text-2xl text-navy-900 mb-5">
            <span className="inline-block h-px w-8 bg-saffron" />
            {cat}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {gallery
              .filter((g) => g.category === cat)
              .map((g) => {
                const caption = pick(lang, g.caption, g.caption_hi);
                return (
                  <figure
                    key={g.id}
                    className="relative group overflow-hidden rounded-2xl shadow-card bg-navy-950"
                  >
                    {g.media_type === 'video' ? (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video
                        src={g.image_url}
                        controls
                        preload="metadata"
                        className="w-full h-52 object-cover"
                      />
                    ) : (
                      <Image
                        src={g.image_url}
                        alt={caption}
                        width={700}
                        height={520}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    {caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white text-sm font-semibold px-4 pt-10 pb-3.5 pointer-events-none">
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
          </div>
        </div>
      ))}
      {gallery.length === 0 && (
        <p className="text-slate-500">{t(lang, 'photosSoon')}</p>
      )}
    </PageShell>
  );
}
