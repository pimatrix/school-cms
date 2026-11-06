'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pick, t, type Lang } from '@/lib/i18n';
import type { HeroSlide, SiteSettings } from '@/lib/types';

export default function Hero({
  slides,
  settings,
  lang,
}: {
  slides: HeroSlide[];
  settings: SiteSettings;
  lang: Lang;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index] || slides[0];
  if (!slide) return null;

  const stats = [
    { value: settings.established_year, label: t(lang, 'established') },
    { value: settings.students_count, label: t(lang, 'students') },
    { value: settings.staff_count, label: t(lang, 'expertFaculty') },
    { value: settings.board_name, label: t(lang, 'board') },
  ].filter((s) => s.value);

  return (
    <section className="relative bg-navy-900 text-white overflow-hidden">
      {/* Full-bleed photograph with a deep-navy gradient wash */}
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
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl rise-in">
          <h1>
            <span className="inline-flex items-center gap-2.5 text-saffron-light font-bold tracking-[0.24em] text-[11px] sm:text-xs uppercase">
              <span className="inline-block h-px w-9 bg-saffron" />
              {pick(lang, settings.school_name, settings.school_name_hi)} • {settings.city}
            </span>
            <span className="block font-display font-extrabold text-[42px] sm:text-6xl xl:text-[72px] leading-[1.05] mt-5">
              {pick(lang, slide.title, slide.title_hi)}
            </span>
          </h1>
          <div className="mt-9 flex flex-wrap gap-3">
            {slide.cta_text && slide.cta_link && (
              <Link
                href={slide.cta_link}
                className="rounded-full bg-saffron hover:bg-saffron-light text-navy-950 font-bold px-7 py-3.5 shadow-lift transition-all hover:-translate-y-0.5"
              >
                {slide.cta_text} →
              </Link>
            )}
            <Link
              href="/news"
              className="rounded-full border border-white/50 text-white font-bold px-7 py-3.5 hover:border-white hover:bg-white/10 transition-colors"
            >
              {t(lang, 'latestNotices')}
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
                    i === index ? 'w-11 bg-saffron' : 'w-5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {stats.length >= 2 && (
        <div className="relative border-t border-white/15 bg-navy-950/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 pr-4 ${i > 0 ? 'border-l border-white/10 pl-5' : ''}`}
              >
                <p className="font-display font-extrabold text-[26px] sm:text-[34px] leading-none text-saffron-light">
                  {s.value}
                </p>
                <p className="text-white/60 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase mt-2">
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
