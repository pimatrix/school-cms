'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

const MENU = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/settings', label: 'Site Settings' },
  { href: '/admin/hero', label: 'Hero Slides' },
  { href: '/admin/notices', label: 'Notices' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/teachers', label: 'Teachers' },
  { href: '/admin/facilities', label: 'Facilities' },
  { href: '/admin/pages', label: 'Page Content' },
  { href: '/admin/enquiries', label: 'Enquiries' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (isLogin) return;
    getBrowserClient()
      .auth.getUser()
      .then(({ data }) => setEmail(data.user?.email || ''));
  }, [isLogin]);

  async function signOut() {
    await getBrowserClient().auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  if (isLogin) {
    return <div className="min-h-screen bg-pine-deep">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col lg:flex-row">
      {/* Sidebar (desktop) / Topbar (mobile) */}
      <aside className="lg:w-64 shrink-0 bg-pine-deep text-paper lg:min-h-screen">
        <div className="p-4 flex items-center justify-between lg:block">
          <div>
            <p className="font-display font-black text-lg leading-tight">
              School CMS
            </p>
            <p className="text-paper/60 text-xs mt-0.5 truncate max-w-[200px]">
              {email || 'Admin Panel'}
            </p>
          </div>
          <button
            className="lg:hidden border border-paper/40 px-3 py-1.5 font-bold text-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav
          className={`${menuOpen ? 'block' : 'hidden'} lg:block px-3 pb-4 space-y-0.5`}
        >
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 text-[15px] font-semibold transition-colors ${
                pathname === m.href
                  ? 'bg-marigold text-ink'
                  : 'text-paper/85 hover:bg-paper/10'
              }`}
            >
              {m.label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-paper/20 space-y-0.5">
            <Link
              href="/"
              className="block px-3 py-2 text-[15px] font-semibold text-paper/85 hover:bg-paper/10"
            >
              View Website
            </Link>
            <button
              onClick={signOut}
              className="block w-full text-left px-3 py-2 text-[15px] font-semibold text-marigold hover:bg-paper/10"
            >
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 min-w-0 p-4 sm:p-8 max-w-5xl">{children}</main>
    </div>
  );
}
