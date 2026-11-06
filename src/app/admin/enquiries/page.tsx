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
    if (!window.confirm(`Delete the enquiry from ${item.name}?`)) return;
    const supabase = getBrowserClient();
    await supabase.from('enquiries').delete().eq('id', item.id);
    load();
  }

  return (
    <div>
      <h1 className="font-display font-bold text-[28px] text-navy-900">
        Enquiries Inbox
      </h1>
      <p className="text-slate-500 mt-1 mb-6">
        Messages submitted through the website contact form. Only visible to
        signed-in administrators.
      </p>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500 bg-white/60">
          No enquiries yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className={`bg-white rounded-xl border p-5 ${
                item.is_read ? 'border-slate-200' : 'border-saffron shadow-card'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-lg text-slate-800">
                    {item.name}
                    {!item.is_read && (
                      <span className="ml-2 text-xs bg-saffron text-navy-950 px-2 py-0.5 rounded-full font-bold">
                        NEW
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-400">
                    ✉ {item.email}
                    {item.phone ? ` • ☎ ${item.phone}` : ''} •{' '}
                    {new Date(item.created_at).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(item)}
                    className="text-sm font-semibold text-navy-700 border border-slate-300 rounded-lg px-3 py-1.5 hover:bg-slate-50"
                  >
                    {item.is_read ? 'Mark Unread' : '✓ Mark Read'}
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className="text-sm font-semibold text-clay border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed whitespace-pre-wrap">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
