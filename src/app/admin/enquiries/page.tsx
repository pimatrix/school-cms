'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';
import type { Enquiry } from '@/lib/types';

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getBrowserClient();
    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setItems(data as Enquiry[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(item: Enquiry) {
    const supabase = getBrowserClient();
    await supabase
      .from('enquiries')
      .update({ is_read: !item.is_read })
      .eq('id', item.id);
    load();
  }

  async function remove(item: Enquiry) {
    if (!window.confirm(`${item.name} ki enquiry delete karein?`)) return;
    const supabase = getBrowserClient();
    await supabase.from('enquiries').delete().eq('id', item.id);
    load();
  }

  return (
    <div>
      <h1 className="font-display font-black text-3xl text-pine-deep">
        Enquiries Inbox
      </h1>
      <p className="text-ink/65 mt-1 mb-6">
        Website ke Contact form se aaye hue messages. Ye sirf login kiye hue
        admin ko dikhte hain — bahar wala koi nahi padh sakta.
      </p>

      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : items.length === 0 ? (
        <div className="border-2 border-dashed border-ink/30 p-8 text-center text-ink/60">
          Abhi koi enquiry nahi aayi.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className={`bg-white border-2 p-5 ${
                item.is_read ? 'border-ink/15' : 'border-marigold shadow-card'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-lg">
                    {item.name}
                    {!item.is_read && (
                      <span className="ml-2 text-xs bg-marigold text-ink px-2 py-0.5 font-extrabold">
                        NEW
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-ink/60">
                    ✉ {item.email}
                    {item.phone ? ` • ☎ ${item.phone}` : ''} •{' '}
                    {new Date(item.created_at).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(item)}
                    className="text-sm font-bold text-pine border-2 border-pine/40 px-3 py-1.5"
                  >
                    {item.is_read ? 'Mark Unread' : '✓ Mark Read'}
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className="text-sm font-bold text-clay border-2 border-clay/40 px-3 py-1.5"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-ink/85 leading-relaxed whitespace-pre-wrap">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
