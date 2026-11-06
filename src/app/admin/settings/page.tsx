'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { adminInputCls } from '@/components/admin/EntityManager';
import { getBrowserClient } from '@/lib/supabase/browser';
import { translateToHindi } from '@/lib/translate-client';
import type { SiteSettings } from '@/lib/types';

const TEXT_FIELDS: {
  key: keyof SiteSettings;
  label: string;
  placeholder?: string;
  group: string;
}[] = [
  { key: 'school_name', label: 'School Name', group: 'Basic' },
  { key: 'tagline', label: 'Tagline', group: 'Basic' },
  { key: 'established_year', label: 'Established Year', placeholder: 'e.g. 1962', group: 'Basic' },
  { key: 'students_count', label: 'Students Count', placeholder: 'e.g. 1,500+', group: 'Basic' },
  { key: 'staff_count', label: 'Faculty Count', placeholder: 'e.g. 60+', group: 'Basic' },
  { key: 'board_name', label: 'Board Name', placeholder: 'MP Board (MPBSE)', group: 'Basic' },
  { key: 'affiliation', label: 'Affiliation / Department Line', group: 'Basic' },
  { key: 'email', label: 'Email', group: 'Contact' },
  { key: 'phone', label: 'Phone', group: 'Contact' },
  { key: 'address', label: 'Address (street / area)', group: 'Contact' },
  { key: 'city', label: 'City', group: 'Contact' },
  { key: 'state', label: 'State', group: 'Contact' },
  { key: 'pincode', label: 'PIN Code', group: 'Contact' },
  { key: 'map_query', label: 'Google Maps Search Query', placeholder: 'School name, area, city', group: 'Map & Social' },
  { key: 'map_embed_url', label: 'Map Embed URL (optional)', group: 'Map & Social' },
  { key: 'facebook_url', label: 'Facebook URL', group: 'Map & Social' },
  { key: 'instagram_url', label: 'Instagram URL', group: 'Map & Social' },
  { key: 'twitter_url', label: 'Twitter / X URL', group: 'Map & Social' },
  { key: 'youtube_url', label: 'YouTube URL', group: 'Map & Social' },
];

const GROUPS = ['Basic', 'Contact', 'Map & Social'];

// Visibility toggles (migration 002). Default: visible.
const PAGE_TOGGLES: { key: keyof SiteSettings; label: string }[] = [
  { key: 'show_page_about', label: 'About page' },
  { key: 'show_page_academics', label: 'Academics page' },
  { key: 'show_page_facilities', label: 'Facilities page' },
  { key: 'show_page_gallery', label: 'Gallery page' },
  { key: 'show_page_news', label: 'News & Notices page' },
  { key: 'show_page_events', label: 'Events page' },
  { key: 'show_page_admissions', label: 'Admissions page' },
  { key: 'show_page_faculty', label: 'Faculty page' },
  { key: 'show_page_contact', label: 'Contact page' },
];

const SECTION_TOGGLES: { key: keyof SiteSettings; label: string }[] = [
  { key: 'show_section_about', label: 'About section' },
  { key: 'show_section_notices', label: 'Notices section' },
  { key: 'show_section_news', label: 'News section' },
  { key: 'show_section_events', label: 'Events section' },
  { key: 'show_section_facilities', label: 'Facilities section' },
  { key: 'show_section_gallery', label: 'Gallery preview section' },
  { key: 'show_section_faculty', label: 'Faculty preview section' },
  { key: 'show_section_map', label: 'Map & contact section' },
];

// English field -> Hindi field pairs that get an Auto-translate button.
const HINDI_PAIRS: { en: keyof SiteSettings; hi: keyof SiteSettings; label: string }[] = [
  { en: 'school_name', hi: 'school_name_hi', label: 'School Name (Hindi)' },
  { en: 'tagline', hi: 'tagline_hi', label: 'Tagline (Hindi)' },
  { en: 'about_short', hi: 'about_short_hi', label: 'Homepage Short About (Hindi)' },
];

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3.5 py-2.5 hover:border-navy-200 transition-colors text-left"
    >
      <span className="text-[15px] font-medium text-slate-700">{label}</span>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          value ? 'bg-navy-700' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  );
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [translating, setTranslating] = useState('');

  useEffect(() => {
    (async () => {
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
      if (data) setForm(data);
      setLoading(false);
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    const supabase = getBrowserClient();
    const { error } = await supabase
      .from('site_settings')
      .upsert({ ...form, id: 1, updated_at: new Date().toISOString() });
    setSaving(false);
    setMsg(error ? `Could not save: ${error.message}` : 'Settings saved.');
  }

  async function autoTranslate(pair: (typeof HINDI_PAIRS)[number]) {
    const source = String(form[pair.en] || '').trim();
    if (!source) {
      setMsg('Fill in the English text first, then use Auto-translate.');
      return;
    }
    setTranslating(pair.hi);
    try {
      const hindi = await translateToHindi(source);
      setForm((f) => ({ ...f, [pair.hi]: hindi }));
      setMsg('Hindi draft added — check it, edit if needed, then Save Settings.');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Auto-translate failed.');
    } finally {
      setTranslating('');
    }
  }

  if (loading) return <p className="text-slate-400">Loading…</p>;

  const cardCls = 'bg-white rounded-xl border border-slate-200 shadow-card p-5 sm:p-6';

  return (
    <div>
      <h1 className="font-display font-bold text-[28px] text-navy-900">
        Site Settings
      </h1>
      <p className="text-slate-500 mt-1 mb-6">
        School identity — name, logo, contact details, map, social links,
        Hindi versions and page visibility.
      </p>

      <form onSubmit={save} className="space-y-6">
        <div className={cardCls}>
          <ImageUpload
            label="School Logo"
            value={form.logo_url || ''}
            onChange={(url) => setForm({ ...form, logo_url: url })}
          />
          <p className="text-sm text-slate-400 mt-2">
            If no logo is uploaded, a monogram with the school&apos;s initials
            is shown instead.
          </p>
        </div>

        <div className={cardCls}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Homepage Short About
          </label>
          <textarea
            rows={3}
            value={form.about_short || ''}
            onChange={(e) => setForm({ ...form, about_short: e.target.value })}
            className={adminInputCls}
          />
          <p className="text-sm text-slate-400 mt-2">
            Shown in the About section of the homepage and in the footer.
          </p>
        </div>

        <div className={cardCls}>
          <h2 className="font-display font-bold text-lg text-navy-900 mb-1">
            Hindi Versions (for the हिंदी toggle on the website)
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Use <strong>Auto-translate</strong> to create a Hindi draft from the
            English text, then edit it by hand if needed — your edited Hindi is
            what visitors see. Leaving a Hindi field blank shows the English
            text instead.
          </p>
          <div className="space-y-4">
            {HINDI_PAIRS.map((pair) => (
              <div
                key={pair.hi}
                className="rounded-lg bg-navy-50/70 border border-navy-100 px-3.5 py-3"
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    {pair.label}
                  </label>
                  <button
                    type="button"
                    disabled={translating === pair.hi}
                    onClick={() => autoTranslate(pair)}
                    className="shrink-0 rounded-md bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 hover:bg-navy-800 disabled:opacity-60 transition-colors"
                  >
                    {translating === pair.hi
                      ? 'Translating…'
                      : 'Auto-translate from English'}
                  </button>
                </div>
                {pair.en === 'about_short' ? (
                  <textarea
                    rows={3}
                    value={String(form[pair.hi] || '')}
                    placeholder="Hindi text (optional — English is shown if left blank)"
                    onChange={(e) =>
                      setForm({ ...form, [pair.hi]: e.target.value })
                    }
                    className={adminInputCls}
                  />
                ) : (
                  <input
                    value={String(form[pair.hi] || '')}
                    placeholder="Hindi text (optional — English is shown if left blank)"
                    onChange={(e) =>
                      setForm({ ...form, [pair.hi]: e.target.value })
                    }
                    className={adminInputCls}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {GROUPS.map((group) => (
          <div key={group} className={cardCls}>
            <h2 className="font-display font-bold text-lg text-navy-900 mb-4">
              {group}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TEXT_FIELDS.filter((f) => f.group === group).map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    value={String(form[f.key] ?? '')}
                    placeholder={f.placeholder}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className={adminInputCls}
                  />
                </div>
              ))}
            </div>
            {group === 'Map & Social' && (
              <p className="text-sm text-slate-400 mt-3">
                The map is generated from the Google Maps Search Query — just
                write the school name and area (for example
                &quot;Bal Vinay Mandir, Nehru Park Road, Indore&quot;). The Map
                Embed URL is optional and only needed if you paste a custom
                Google Maps embed link.
              </p>
            )}
          </div>
        ))}

        <div className={cardCls}>
          <h2 className="font-display font-bold text-lg text-navy-900 mb-1">
            Page &amp; Section Visibility
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Switch a page off to remove it from the website menus — anyone
            opening its link directly will see a short &quot;temporarily
            unavailable&quot; message instead. Switch a homepage section off to
            hide just that block on the homepage. Changes apply when you press
            Save Settings.
          </p>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-2">
            Pages
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-5">
            {PAGE_TOGGLES.map((tg) => (
              <Toggle
                key={tg.key}
                label={tg.label}
                value={form[tg.key] !== false}
                onChange={(v) => setForm({ ...form, [tg.key]: v })}
              />
            ))}
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-2">
            Homepage sections
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {SECTION_TOGGLES.map((tg) => (
              <Toggle
                key={tg.key}
                label={tg.label}
                value={form[tg.key] !== false}
                onChange={(v) => setForm({ ...form, [tg.key]: v })}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pb-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-semibold px-7 py-3 shadow-soft disabled:opacity-60 transition-colors"
          >
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
          {msg && <p className="font-semibold text-sm text-slate-600">{msg}</p>}
        </div>
      </form>
    </div>
  );
}
