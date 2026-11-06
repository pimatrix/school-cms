'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { HeroSlide, SiteSettings } from '@/lib/types';

export default function Hero({
  slides,
  settings,
}: {
  slides: HeroSlide[];
  settings: SiteSettings;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index] || slides[0];
  if (!slide) return null;

  const stats = [
    { value: settings.established_year, label: 'Established' },
    { value: settings.students_count, label: 'Students' },
    { value: settings.staff_count, label: 'Expert Faculty' },
    { value: settings.board_name, label: 'Board' },
  ].filter((s) => s.value);

  return (
    <section className="bg-pine-deep text-paper relative overflow-hidden">
      <div className="absolute inset-0 texture-dots opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-10 lg:pt-16 lg:pb-14 grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 rise-in">
          <p className="inline-block bg-marigold text-ink font-extrabold text-xs tracking-[0.2em] uppercase px-3 py-1.5 border-2 border-ink">
            {settings.city} • {settings.state}
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl xl:text-[64px] leading-[1.04] mt-5">
            {slide.title}
          </h2>
          <p className="mt-5 text-paper/80 text-base sm:text-lg leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {slide.cta_text && slide.cta_link && (
              <Link
                href={slide.cta_link}
                className="bg-marigold text-ink font-bold px-6 py-3 border-2 border-ink shadow-card hover:-translate-y-0.5 transition-transform"
              >
                {slide.cta_text} →
              </Link>
            )}
            <Link
              href="/news"
              className="bg-transparent text-paper font-bold px-6 py-3 border-2 border-paper/60 hover:border-paper hover:bg-paper/10 transition-colors"
            >
              Latest Notices
            </Link>
          </div>

          {slides.length > 1 && (
            <div className="flex gap-2 mt-10">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 transition-all ${
                    i === index ? 'w-10 bg-marigold' : 'w-4 bg-paper/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-2 border-2 border-marigold translate-x-4 translate-y-4 pointer-events-none" />
          {slide.image_url ? (
            <Image
              src={slide.image_url}
              alt={slide.title}
              width={900}
              height={700}
              className="relative w-full h-72 sm:h-96 object-cover border-2 border-ink"
              priority
            />
          ) : (
            <div className="relative w-full h-72 sm:h-96 bg-pine flex items-center justify-center border-2 border-ink">
              <span className="font-display font-black text-6xl text-paper/30">
                BVM
              </span>
            </div>
          )}
        </div>
      </div>

      {stats.length > 0 && (
        <div className="relative border-t border-paper/15">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-5 pr-4 ${i > 0 ? 'border-l border-paper/15 pl-4' : ''}`}
              >
                <p className="font-display font-black text-2xl sm:text-3xl text-marigold">
                  {s.value}
                </p>
                <p className="text-paper/70 text-xs sm:text-sm font-semibold tracking-wide uppercase mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
