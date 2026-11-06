'use client';

import Link from 'next/link';
import type { Notice } from '@/lib/types';

export default function NoticeTicker({ notices }: { notices: Notice[] }) {
  if (!notices || notices.length === 0) return null;
  const items = [...notices, ...notices]; // duplicate for seamless loop
  return (
    <div className="bg-marigold text-ink overflow-hidden flex items-stretch border-y-2 border-ink">
      <div className="shrink-0 bg-ink text-paper font-display font-bold text-xs sm:text-sm tracking-widest px-3 sm:px-4 py-2 flex items-center z-10">
        NOTICES
      </div>
      <div className="overflow-hidden flex items-center">
        <div className="ticker-track">
          {items.map((n, i) => (
            <Link
              key={`${n.id}-${i}`}
              href="/news"
              className="mx-6 text-sm font-semibold hover:underline"
            >
              {n.is_pinned ? '📌 ' : '• '}
              {n.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
