'use client';

import { useEffect, useState } from 'react';
import { adminInputCls } from '@/components/admin/EntityManager';
import { getBrowserClient } from '@/lib/supabase/browser';
import { translateToHindi } from '@/lib/translate-client';

const PAGES = [
  { slug: 'about', label: 'About Page' },
  { slug: 'academics', label: 'Academics Page' },
  { slug: 'admissions', label: 'Admissions Page' },
];

export default function AdminPagesPage() {
  const [slug, setSlug] = useState('about');
  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [body, setBody] = useState('');
  const [bodyHi, setBodyHi] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [translating, setTranslating] = useState('');

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
      setTitleHi(data?.title_hi || '');
      setBody(data?.body || '');
      setBodyHi(data?.body_hi || '');
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
      .upsert({ slug, title, title_hi: titleHi, body, body_hi: bodyHi });
    setSaving(false);
    setMsg(error ? `Could not save: ${error.message}` : 'Page saved.');
  }

  async function autoTranslateTitle() {
    if (!title.trim()) {
      setMsg('Fill in the English title first, then use Auto-translate.');
      return;
    }
    setTranslating('title');
    try {
      setTitleHi(await translateToHindi(title));
      setMsg('Hindi title draft added — edit it if needed, then Save Page.');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Auto-translate failed.');
    } finally {
      setTranslating('');
    }
  }

  async function autoTranslateBody() {
    if (!body.trim()) {
      setMsg('Fill in the English body first, then use Auto-translate.');
      return;
    }
    setTranslating('body');
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Auto-translate failed.');
      setBodyHi(String(data.translation || ''));
      setMsg(
        'Hindi body draft added. Note: basic HTML tags are preserved only where the translator kept them — please review the result, edit it if needed, then Save Page.'
      );
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Auto-translate failed.');
    } finally {
      setTranslating('');
    }
  }

  return (
    <div>
      <h1 className="font-display font-bold text-[28px] text-navy-900">
        Page Content
      </h1>
      <p className="text-slate-500 mt-1 mb-6">
        Text for the About, Academics and Admissions pages. Basic HTML is
        supported — <code>&lt;p&gt;</code> for paragraphs,{' '}
        <code>&lt;ul&gt;&lt;li&gt;</code> for lists, <code>&lt;strong&gt;</code>{' '}
        for bold. Each page also has a Hindi version (see the Manual for how
        the bilingual system works).
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSlug(p.slug)}
            className={`rounded-lg font-semibold px-4 py-2 transition-colors ${
              slug === p.slug
                ? 'bg-navy-700 text-white'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : (
        <form
          onSubmit={save}
          className="bg-white rounded-xl border border-slate-200 shadow-card p-5 sm:p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Page Title
            </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={adminInputCls} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Page Body (HTML allowed)
            </label>
            <textarea
              rows={14}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={`${adminInputCls} font-mono text-sm leading-relaxed`}
            />
          </div>

          <div className="rounded-lg bg-navy-50/70 border border-navy-100 px-3.5 py-3 space-y-4">
            <div>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Page Title (Hindi)
                </label>
                <button
                  type="button"
                  disabled={translating === 'title'}
                  onClick={autoTranslateTitle}
                  className="shrink-0 rounded-md bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 hover:bg-navy-800 disabled:opacity-60 transition-colors"
                >
                  {translating === 'title' ? 'Translating…' : 'Auto-translate from English'}
                </button>
              </div>
              <input
                value={titleHi}
                onChange={(e) => setTitleHi(e.target.value)}
                placeholder="Hindi title (optional — English is shown if left blank)"
                className={adminInputCls}
              />
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Page Body (Hindi, HTML allowed)
                </label>
                <button
                  type="button"
                  disabled={translating === 'body'}
                  onClick={autoTranslateBody}
                  className="shrink-0 rounded-md bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 hover:bg-navy-800 disabled:opacity-60 transition-colors"
                >
                  {translating === 'body' ? 'Translating…' : 'Auto-translate from English'}
                </button>
              </div>
              <textarea
                rows={10}
                value={bodyHi}
                onChange={(e) => setBodyHi(e.target.value)}
                placeholder="Hindi body (optional — English is shown if left blank)"
                className={`${adminInputCls} font-mono text-sm leading-relaxed`}
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Hindi text is auto-generated and fully editable — always review
                it before saving. If a Hindi field is left blank, visitors see
                the English text.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-semibold px-6 py-2.5 disabled:opacity-60 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Page'}
            </button>
            {msg && <p className="font-semibold text-sm text-slate-600">{msg}</p>}
          </div>
        </form>
      )}
    </div>
  );
}
