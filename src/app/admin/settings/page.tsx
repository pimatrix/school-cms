'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { getBrowserClient } from '@/lib/supabase/browser';
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
const inputCls =
  'w-full border-2 border-ink/30 bg-white px-3 py-2 text-[15px] focus:outline-none focus:border-pine';

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

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
    setMsg(
      error ? `Could not save: ${error.message}` : 'Settings saved.'
    );
  }

  if (loading) return <p className="text-ink/60">Loading…</p>;

  return (
    <div>
      <h1 className="font-display font-black text-3xl text-pine-deep">
        Site Settings
      </h1>
      <p className="text-ink/65 mt-1 mb-6">
        School identity — name, logo, contact details, map and social links.
      </p>

      <form onSubmit={save} className="space-y-8">
        <div className="bg-white border-2 border-ink shadow-card p-5 sm:p-6">
          <ImageUpload
            label="School Logo"
            value={form.logo_url || ''}
            onChange={(url) => setForm({ ...form, logo_url: url })}
          />
          <p className="text-sm text-ink/55 mt-2">
            If no logo is uploaded, a monogram with the school's initials is shown instead.
          </p>
        </div>

        <div className="bg-white border-2 border-ink shadow-card p-5 sm:p-6">
          <label className="block text-sm font-bold mb-1.5">
            Homepage Short About
          </label>
          <textarea
            rows={3}
            value={form.about_short || ''}
            onChange={(e) => setForm({ ...form, about_short: e.target.value })}
            className={inputCls}
          />
        </div>

        {GROUPS.map((group) => (
          <div
            key={group}
            className="bg-white border-2 border-ink shadow-card p-5 sm:p-6"
          >
            <h2 className="font-display font-bold text-xl mb-4">{group}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TEXT_FIELDS.filter((f) => f.group === group).map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-bold mb-1.5">
                    {f.label}
                  </label>
                  <input
                    value={String(form[f.key] ?? '')}
                    placeholder={f.placeholder}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-pine text-paper font-bold px-7 py-3 border-2 border-ink shadow-card disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
          {msg && <p className="font-semibold text-sm">{msg}</p>}
        </div>
      </form>
    </div>
  );
}
