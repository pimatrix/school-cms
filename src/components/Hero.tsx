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
    <section className="relative bg-pine-deep text-paper overflow-hidden">
      {/* Full-bleed photograph with a deep-green gradient wash */}
      {slide.image_url && (
        <Image
          key={slide.id}
          src={slide.image_url}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-pine-deep/95 via-pine-deep/80 to-pine-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/90 via-transparent to-pine-deep/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl rise-in">
          <p className="inline-flex items-center gap-2.5 text-marigold-light font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase">
            <span className="inline-block h-px w-9 bg-marigold" />
            {settings.city} • {settings.state}
          </p>
          <h2 className="font-display font-black text-[42px] sm:text-6xl xl:text-[72px] leading-[1.03] mt-5">
            {slide.title}
          </h2>
          <p className="mt-6 text-paper/85 text-base sm:text-lg leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {slide.cta_text && slide.cta_link && (
              <Link
                href={slide.cta_link}
                className="rounded-full bg-marigold hover:bg-marigold-light text-ink font-bold px-7 py-3.5 shadow-lift transition-all hover:-translate-y-0.5"
              >
                {slide.cta_text} →
              </Link>
            )}
            <Link
              href="/news"
              className="rounded-full border border-paper/50 text-paper font-bold px-7 py-3.5 hover:border-paper hover:bg-paper/10 transition-colors"
            >
              Latest Notices
            </Link>
          </div>

          {slides.length > 1 && (
            <div className="flex gap-2 mt-12">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-[3px] rounded-full transition-all ${
                    i === index ? 'w-11 bg-marigold' : 'w-5 bg-paper/40 hover:bg-paper/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {stats.length >= 2 && (
        <div className="relative border-t border-paper/15 bg-pine-deep/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 pr-4 ${i > 0 ? 'border-l border-paper/12 pl-5' : ''}`}
              >
                <p className="font-display font-black text-[26px] sm:text-[34px] leading-none text-marigold-light">
                  {s.value}
                </p>
                <p className="text-paper/65 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase mt-2">
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
