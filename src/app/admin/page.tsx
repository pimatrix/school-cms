'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

const CARDS = [
  { table: 'notices', label: 'Notices', href: '/admin/notices', icon: '📌' },
  { table: 'news', label: 'News Stories', href: '/admin/news', icon: '📰' },
  { table: 'events', label: 'Events', href: '/admin/events', icon: '📅' },
  { table: 'gallery_images', label: 'Gallery Photos', href: '/admin/gallery', icon: '📷' },
  { table: 'teachers', label: 'Teachers', href: '/admin/teachers', icon: '👩‍🏫' },
  { table: 'facilities', label: 'Facilities', href: '/admin/facilities', icon: '🏫' },
  { table: 'enquiries', label: 'Enquiries', href: '/admin/enquiries', icon: '✉️' },
  { table: 'hero_slides', label: 'Hero Slides', href: '/admin/hero', icon: '🖼️' },
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
      <h1 className="font-display font-black text-3xl sm:text-4xl text-pine-deep">
        Dashboard
      </h1>
      <p className="text-ink/65 mt-2 max-w-2xl leading-relaxed">
        The whole website is managed from here. Anything you add or change is
        published on the live site immediately — no code changes needed.
      </p>

      {unread !== null && unread > 0 && (
        <Link
          href="/admin/enquiries"
          className="block mt-5 bg-marigold border-2 border-ink shadow-card px-5 py-3.5 font-bold"
        >
          ✉️ You have {unread} unread {unread === 1 ? 'enquiry' : 'enquiries'} — click to view →
        </Link>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        {CARDS.map((c) => (
          <Link
            key={c.table}
            href={c.href}
            className="bg-white border-2 border-ink shadow-card p-5 hover:-translate-y-0.5 transition-transform"
          >
            <p className="text-3xl">{c.icon}</p>
            <p className="font-display font-black text-3xl mt-2">
              {counts[c.table] === undefined || counts[c.table] === null
                ? '…'
                : counts[c.table]}
            </p>
            <p className="font-semibold text-ink/60 text-sm">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-pine-deep text-paper p-6 border-2 border-ink">
        <h2 className="font-display font-bold text-xl text-marigold">
          Getting started
        </h2>
        <ol className="list-decimal pl-5 mt-3 space-y-1.5 text-paper/85 text-[15px]">
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
        </ol>
      </div>
    </div>
  );
}
