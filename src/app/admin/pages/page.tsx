'use client';

import { useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

const PAGES = [
  { slug: 'about', label: 'ℹ️ About Page' },
  { slug: 'academics', label: '📚 Academics Page' },
  { slug: 'admissions', label: '📝 Admissions Page' },
];

const inputCls =
  'w-full border-2 border-ink/30 bg-white px-3 py-2 text-[15px] focus:outline-none focus:border-pine';

export default function AdminPagesPage() {
  const [slug, setSlug] = useState('about');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from('page_content')
        .select('*')
        .eq('slug', slug)
        .single();
      setTitle(data?.title || '');
      setBody(data?.body || '');
      setLoading(false);
    })();
  }, [slug]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const supabase = getBrowserClient();
    const { error } = await supabase
      .from('page_content')
      .upsert({ slug, title, body });
    setSaving(false);
    setMsg(error ? `⚠ Save nahi hua: ${error.message}` : '✅ Page saved!');
  }

  return (
    <div>
      <h1 className="font-display font-black text-3xl text-pine-deep">
        Page Content
      </h1>
      <p className="text-ink/65 mt-1 mb-6">
        About, Academics aur Admissions pages ka text. Simple HTML chal sakta
        hai — <code>&lt;p&gt;</code> paragraph, <code>&lt;ul&gt;&lt;li&gt;</code>{' '}
        list, <code>&lt;strong&gt;</code> bold ke liye.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSlug(p.slug)}
            className={`font-bold px-4 py-2 border-2 ${
              slug === p.slug
                ? 'bg-pine text-paper border-ink'
                : 'bg-white border-ink/30'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : (
        <form
          onSubmit={save}
          className="bg-white border-2 border-ink shadow-card p-5 sm:p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold mb-1.5">Page Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5">
              Page Body (HTML allowed)
            </label>
            <textarea
              rows={16}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={`${inputCls} font-mono text-sm leading-relaxed`}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-pine text-paper font-bold px-6 py-2.5 border-2 border-ink disabled:opacity-60"
            >
              {saving ? 'Saving…' : '💾 Save Page'}
            </button>
            {msg && <p className="font-semibold text-sm">{msg}</p>}
          </div>
        </form>
      )}
    </div>
  );
}
