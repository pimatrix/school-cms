'use client';

import { Pin } from 'lucide-react';
import Link from 'next/link';
import { pick, t, type Lang } from '@/lib/i18n';
import type { Notice } from '@/lib/types';

export default function NoticeTicker({
  notices,
  lang,
}: {
  notices: Notice[];
  lang: Lang;
}) {
  if (!notices || notices.length === 0) return null;
  const items = [...notices, ...notices]; // duplicate for seamless loop
  return (
    <div className="bg-navy-900 text-white overflow-hidden flex items-stretch">
      <div className="shrink-0 bg-saffron text-navy-950 font-display font-bold text-[11px] sm:text-xs tracking-[0.18em] px-3 sm:px-4 py-2 flex items-center z-10">
        {t(lang, 'noticesLabel')}
      </div>
      <div className="overflow-hidden flex items-center">
        <div className="ticker-track">
          {items.map((n, i) => (
            <Link
              key={`${n.id}-${i}`}
              href="/news"
              className="mx-6 text-sm font-medium text-white/90 hover:text-saffron-light transition-colors"
            >
              {n.is_pinned ? (
                <Pin className="inline w-3.5 h-3.5 -mt-0.5 mr-1.5 text-saffron-light" aria-hidden />
              ) : (
                '• '
              )}
              {pick(lang, n.title, n.title_hi)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
