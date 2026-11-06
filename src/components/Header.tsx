'use client';

import { Mail, Menu as MenuIcon, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { pick, t, type Lang, type UiKey } from '@/lib/i18n';
import { pageVisible } from '@/lib/visibility';
import type { SiteSettings } from '@/lib/types';

const NAV: { href: string; slug: string; key: UiKey }[] = [
  { href: '/', slug: 'home', key: 'navHome' },
  { href: '/about', slug: 'about', key: 'navAbout' },
  { href: '/academics', slug: 'academics', key: 'navAcademics' },
  { href: '/facilities', slug: 'facilities', key: 'navFacilities' },
  { href: '/faculty', slug: 'faculty', key: 'navFaculty' },
  { href: '/gallery', slug: 'gallery', key: 'navGallery' },
  { href: '/news', slug: 'news', key: 'navNews' },
  { href: '/events', slug: 'events', key: 'navEvents' },
  { href: '/admissions', slug: 'admissions', key: 'navAdmissions' },
  { href: '/contact', slug: 'contact', key: 'navContact' },
];

function initials(name: string) {
  return name
    .replace(/^Govt\.?\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Header({
  settings,
  lang,
}: {
  settings: SiteSettings;
  lang: Lang;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = NAV.filter(
    (item) => item.slug === 'home' || pageVisible(settings, item.slug)
  );
  const schoolName = pick(lang, settings.school_name, settings.school_name_hi);

  function setLang(next: Lang) {
    if (next === lang) return;
    // One year, site-wide — then a FULL page reload, so every server
    // component (header, ticker, page, footer) re-renders in the new
    // language. A soft router.refresh() could leave stale pieces behind,
    // which made the first click look like it did nothing.
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  }

  const langToggle = (
    <div
      className="flex items-center rounded-full border border-slate-300 overflow-hidden text-[13px] font-bold shrink-0"
      role="group"
      aria-label="Language / भाषा"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-3 py-1.5 transition-colors ${
          lang === 'en'
            ? 'bg-navy-700 text-white'
            : 'bg-white text-slate-500 hover:text-navy-800'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('hi')}
        aria-pressed={lang === 'hi'}
        className={`px-3 py-1.5 transition-colors ${
          lang === 'hi'
            ? 'bg-navy-700 text-white'
            : 'bg-white text-slate-500 hover:text-navy-800'
        }`}
      >
        हिंदी
      </button>
    </div>
  );

  const logoMark = (sizeClass: string, textClass: string) =>
    settings.logo_url ? (
      <Image
        src={settings.logo_url}
        alt={schoolName}
        width={64}
        height={64}
        className={`${sizeClass} object-contain shrink-0`}
      />
    ) : (
      <div
        className={`${sizeClass} shrink-0 rounded-xl bg-navy-700 text-white font-display font-extrabold ${textClass} flex items-center justify-center`}
      >
        {initials(settings.school_name)}
      </div>
    );

  return (
    <>
      <header className="relative">
        {/* Utility strip */}
        <div className="bg-navy-950 text-white/85 text-xs sm:text-[13px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap gap-x-5 gap-y-0.5 items-center justify-end">
            <div className="flex items-center gap-4">
              {settings.phone && (
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-saffron-light transition-colors">
                  <Phone className="w-3.5 h-3.5" aria-hidden /> {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="hidden sm:inline-flex items-center gap-1.5 hover:text-saffron-light transition-colors">
                  <Mail className="w-3.5 h-3.5" aria-hidden /> {settings.email}
                </a>
              )}
              <span className="hidden md:inline text-white/55">{settings.board_name}</span>
            </div>
          </div>
        </div>

      </header>

      {/* Slim sticky bar — the site's single header bar (the big
          masthead was removed 2026-11-07 at the owner's request: the
          school name showed twice at the top). On mobile it carries
          the logo, the school name, the language toggle and the menu
          icon in one thin strip. On desktop it carries the main
          navigation plus the language toggle and admissions button. */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-soft border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          {/* Mobile brand */}
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-1 py-2 lg:hidden">
            {logoMark('w-7 h-7 rounded-lg', 'text-[11px]')}
            <span className="font-display font-bold text-[13px] leading-tight text-navy-900">
              {schoolName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-wrap items-center flex-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-3 text-sm font-semibold transition-colors ${
                    active ? 'text-navy-800' : 'text-slate-600 hover:text-navy-800'
                  }`}
                >
                  {t(lang, item.key)}
                  {active && (
                    <span className="absolute inset-x-3.5 bottom-0 h-[2.5px] rounded-full bg-saffron" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/admin/login"
              className="ml-auto px-3.5 py-3 text-sm font-semibold text-slate-400 hover:text-navy-800 transition-colors"
            >
              {t(lang, 'adminLogin')}
            </Link>
          </nav>

          {/* Desktop controls — the language toggle and admissions
              button that used to sit in the removed masthead. */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0 py-1.5">
            {langToggle}
            {pageVisible(settings, 'admissions') && (
              <Link
                href="/admissions"
                className="inline-block rounded-full bg-saffron hover:bg-saffron-light text-navy-950 font-bold text-sm px-5 py-2.5 shadow-soft transition-all hover:-translate-y-0.5"
              >
                {t(lang, 'admissionsOpen')}
              </Link>
            )}
          </div>

          {/* Mobile controls — separate from the name block */}
          <div className="ml-auto flex items-center gap-2 py-1.5 shrink-0 lg:hidden">
            {langToggle}
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2.5"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X className="w-5 h-5" aria-hidden />
              ) : (
                <MenuIcon className="w-5 h-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {open && (
          <nav className="lg:hidden border-t border-slate-100 bg-white max-h-[70vh] overflow-y-auto">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3 font-semibold border-b border-slate-100 ${
                  pathname === item.href ? 'text-navy-800 bg-navy-50' : ''
                }`}
              >
                {t(lang, item.key)}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-semibold text-slate-400"
            >
              {t(lang, 'adminLogin')}
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
