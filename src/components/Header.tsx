'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SiteSettings } from '@/lib/types';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/news', label: 'News & Notices' },
  { href: '/events', label: 'Events' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
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

export default function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      {/* Utility strip */}
      <div className="bg-pine-deep text-paper/85 text-xs sm:text-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap gap-x-5 gap-y-0.5 items-center justify-between">
          <p className="font-medium tracking-wide">
            {settings.affiliation || 'School Education Department, Govt. of Madhya Pradesh'}
          </p>
          <div className="flex items-center gap-4">
            {settings.phone && (
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-marigold-light transition-colors">
                ☎ {settings.phone}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="hidden sm:inline hover:text-marigold-light transition-colors">
                ✉ {settings.email}
              </a>
            )}
            <span className="hidden md:inline text-paper/60">{settings.board_name}</span>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="bg-paper/95 backdrop-blur-md shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 min-w-0">
            {settings.logo_url ? (
              <Image
                src={settings.logo_url}
                alt={settings.school_name}
                width={64}
                height={64}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-pine text-paper font-display font-black text-xl sm:text-2xl flex items-center justify-center">
                {initials(settings.school_name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-display font-black text-lg sm:text-2xl lg:text-[27px] leading-tight text-pine-deep truncate">
                {settings.school_name}
              </p>
              <p className="text-xs sm:text-sm text-ink/65 font-medium truncate">
                {settings.tagline}
              </p>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <Link
              href="/admissions"
              className="hidden lg:inline-block rounded-full bg-marigold hover:bg-marigold-light text-ink font-bold text-sm px-5 py-2.5 shadow-soft transition-all hover:-translate-y-0.5"
            >
              Admissions Open
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden rounded-full border border-ink/20 bg-paper px-4 py-2 font-bold text-sm"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? '✕' : '☰ Menu'}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:block border-t border-ink/[0.07]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-3 text-sm font-semibold transition-colors ${
                    active ? 'text-pine' : 'text-ink/75 hover:text-pine'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3.5 bottom-0 h-[2.5px] rounded-full bg-marigold" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/admin/login"
              className="ml-auto px-3.5 py-3 text-sm font-semibold text-ink/45 hover:text-pine transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </nav>

        {/* Mobile nav */}
        {open && (
          <nav className="lg:hidden border-t border-ink/[0.07] bg-paper">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3 font-semibold border-b border-ink/[0.06] ${
                  pathname === item.href ? 'text-pine bg-cream/70' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-semibold text-ink/55"
            >
              Admin Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
