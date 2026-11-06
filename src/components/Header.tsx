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
      {/* top strip */}
      <div className="bg-pine-deep text-paper/90 text-xs sm:text-[13px]">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap gap-x-5 gap-y-0.5 items-center justify-between">
          <p className="font-semibold tracking-wide">
            {settings.affiliation || 'School Education Department, Govt. of Madhya Pradesh'}
          </p>
          <div className="flex gap-4">
            {settings.phone && <span>☎ {settings.phone}</span>}
            {settings.email && <span className="hidden sm:inline">✉ {settings.email}</span>}
            <span className="hidden md:inline">{settings.board_name}</span>
          </div>
        </div>
      </div>

      {/* masthead */}
      <div className="bg-paper/95 backdrop-blur border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 min-w-0">
            {settings.logo_url ? (
              <Image
                src={settings.logo_url}
                alt={settings.school_name}
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0"
              />
            ) : (
              <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-pine text-paper font-display font-black text-xl sm:text-2xl flex items-center justify-center border-2 border-ink shadow-card">
                {initials(settings.school_name)}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-display font-black text-lg sm:text-2xl lg:text-[28px] leading-tight text-pine-deep truncate">
                {settings.school_name}
              </h1>
              <p className="text-xs sm:text-sm text-ink/70 font-medium truncate">
                {settings.tagline}
              </p>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/admissions"
              className="hidden lg:inline-block bg-marigold hover:bg-marigold-light text-ink font-bold text-sm px-4 py-2.5 border-2 border-ink shadow-card transition-transform hover:-translate-y-0.5"
            >
              Admissions Open
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden border-2 border-ink bg-paper px-3 py-2 font-bold text-sm"
              aria-label="Toggle menu"
            >
              {open ? '✕' : '☰ Menu'}
            </button>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="hidden lg:block border-t border-ink/10">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2.5 text-sm font-semibold link-flourish ${
                  pathname === item.href
                    ? 'text-pine'
                    : 'text-ink/80 hover:text-pine'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="ml-auto px-3.5 py-2.5 text-sm font-semibold text-ink/50 hover:text-pine"
            >
              Admin Login
            </Link>
          </div>
        </nav>

        {/* mobile nav */}
        {open && (
          <nav className="lg:hidden border-t-2 border-ink bg-paper">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-5 py-3 font-semibold border-b border-ink/10 ${
                  pathname === item.href ? 'text-pine bg-cream' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="block px-5 py-3 font-semibold text-ink/60"
            >
              Admin Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
