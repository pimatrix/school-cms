'use client';

import {
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Images,
  LayoutDashboard,
  Mail,
  Megaphone,
  Newspaper,
  School,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

const MENU: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/admin/settings', label: 'Site Settings', Icon: Settings },
  { href: '/admin/hero', label: 'Hero Slides', Icon: Images },
  { href: '/admin/notices', label: 'Notices', Icon: Megaphone },
  { href: '/admin/news', label: 'News', Icon: Newspaper },
  { href: '/admin/events', label: 'Events', Icon: CalendarDays },
  { href: '/admin/gallery', label: 'Gallery', Icon: Images },
  { href: '/admin/teachers', label: 'Teachers', Icon: GraduationCap },
  { href: '/admin/facilities', label: 'Facilities', Icon: School },
  { href: '/admin/pages', label: 'Page Content', Icon: FileText },
  { href: '/admin/enquiries', label: 'Enquiries', Icon: Mail },
  { href: '/admin/manual', label: 'Manual', Icon: BookOpen },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setReady(true);
      return;
    }
    getBrowserClient()
      .auth.getUser()
      .then(({ data }) => {
        if (!data.user) router.replace('/admin/login');
        else {
          setEmail(data.user.email || '');
          setReady(true);
        }
      });
  }, [pathname, router]);

  async function signOut() {
    await getBrowserClient().auth.signOut();
    router.replace('/admin/login');
  }

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-navy-950 font-body">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-body text-slate-800 flex flex-col lg:flex-row">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <span className="font-display font-bold text-navy-900">School CMS</span>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold"
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-slate-200 lg:w-64 shrink-0 lg:min-h-screen lg:sticky lg:top-0 flex-col ${
          menuOpen ? 'flex' : 'hidden'
        } lg:flex`}
      >
        <div className="px-5 py-5 border-b border-slate-100 hidden lg:block">
          <p className="font-display font-extrabold text-lg text-navy-900 leading-tight">
            School CMS
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {MENU.map((m) => {
            const active =
              m.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                  active
                    ? 'bg-navy-700 text-white shadow-soft'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                }`}
              >
                <m.Icon className="w-5 h-5 shrink-0" aria-hidden />
                {m.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 truncate mb-2.5">
            Signed in as {email || '…'}
          </p>
          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              View Website
            </Link>
            <button
              onClick={signOut}
              className="flex-1 rounded-lg bg-navy-950 px-3 py-2 text-sm font-semibold text-white hover:bg-navy-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 max-w-6xl w-full mx-auto">
        {ready ? children : <p className="text-slate-400">Checking sign-in…</p>}
      </main>
    </div>
  );
}
