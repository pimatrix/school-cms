'use client';

import {
  CalendarDays,
  Camera,
  GraduationCap,
  Images,
  Mail,
  Newspaper,
  Pin,
  School,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

const CARDS: { table: string; label: string; href: string; Icon: LucideIcon }[] = [
  { table: 'notices', label: 'Notices', href: '/admin/notices', Icon: Pin },
  { table: 'news', label: 'News Stories', href: '/admin/news', Icon: Newspaper },
  { table: 'events', label: 'Events', href: '/admin/events', Icon: CalendarDays },
  { table: 'gallery_images', label: 'Gallery Photos', href: '/admin/gallery', Icon: Camera },
  { table: 'teachers', label: 'Teachers', href: '/admin/teachers', Icon: GraduationCap },
  { table: 'facilities', label: 'Facilities', href: '/admin/facilities', Icon: School },
  { table: 'enquiries', label: 'Enquiries', href: '/admin/enquiries', Icon: Mail },
  { table: 'hero_slides', label: 'Hero Slides', href: '/admin/hero', Icon: Images },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [unread, setUnread] = useState<number | null>(null);

  useEffect(() => {
    const supabase = getBrowserClient();
    CARDS.forEach(async (c) => {
      const { count } = await supabase
        .from(c.table)
        .select('*', { count: 'exact', head: true });
      setCounts((prev) => ({ ...prev, [c.table]: count ?? 0 }));
    });
    supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
      .then(({ count }) => setUnread(count ?? 0));
  }, []);

  return (
    <div>
      <h1 className="font-display font-bold text-[28px] text-navy-900">
        Dashboard
      </h1>
      <p className="text-slate-500 mt-2 max-w-2xl leading-relaxed">
        The whole website is managed from here. Anything you add or change is
        published on the live site immediately — no code changes needed.
      </p>

      {unread !== null && unread > 0 && (
        <Link
          href="/admin/enquiries"
          className="flex items-center gap-2 mt-5 bg-saffron rounded-xl shadow-card px-5 py-3.5 font-semibold text-navy-950"
        >
          <Mail className="w-5 h-5 shrink-0" aria-hidden />
          You have {unread} unread {unread === 1 ? 'enquiry' : 'enquiries'} — click to view →
        </Link>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        {CARDS.map((c) => (
          <Link
            key={c.table}
            href={c.href}
            className="bg-white rounded-xl border border-slate-200 shadow-card p-5 hover:-translate-y-0.5 hover:shadow-lift transition"
          >
            <c.Icon className="w-8 h-8 text-navy-700" aria-hidden />
            <p className="font-display font-black text-3xl mt-2">
              {counts[c.table] === undefined || counts[c.table] === null
                ? '…'
                : counts[c.table]}
            </p>
            <p className="font-medium text-slate-400 text-sm">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-navy-900 text-white p-6 rounded-xl shadow-card">
        <h2 className="font-display font-bold text-xl text-saffron-light">
          Getting started
        </h2>
        <ol className="list-decimal pl-5 mt-3 space-y-1.5 text-white/85 text-[15px]">
          <li>
            In <strong>Site Settings</strong>, check the school name, logo,
            phone, email and map.
          </li>
          <li>
            In <strong>Page Content</strong>, adjust the About, Academics and
            Admissions text.
          </li>
          <li>
            Day to day: add <strong>Notices</strong>, upload{' '}
            <strong>Gallery</strong> photos and read <strong>Enquiries</strong>.
          </li>
          <li>
            New here? Read the <strong>Manual</strong> (in the menu) — every
            section is explained in simple language, including the Hindi
            translation tools.
          </li>
        </ol>
      </div>
    </div>
  );
}
