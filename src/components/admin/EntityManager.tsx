'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';
import ImageUpload from './ImageUpload';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'checkbox'
  | 'image'
  | 'url';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  rows?: number;
}

interface Props {
  table: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
  listLabel: (row: Record<string, unknown>) => string;
  listSub?: (row: Record<string, unknown>) => string;
  orderBy?: string;
  defaults?: Record<string, unknown>;
}

const inputCls =
  'w-full border-2 border-ink/30 bg-white px-3 py-2 text-[15px] focus:outline-none focus:border-pine';

export default function EntityManager({
  table,
  title,
  description,
  fields,
  listLabel,
  listSub,
  orderBy = 'created_at',
  defaults = {},
}: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending: orderBy === 'sort_order' });
    if (!error && data) setRows(data as Record<string, unknown>[]);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    const init: Record<string, unknown> = { ...defaults };
    fields.forEach((f) => {
      if (init[f.key] === undefined) {
        init[f.key] = f.type === 'checkbox' ? false : f.type === 'number' ? 0 : '';
      }
    });
    setForm(init);
    setMsg('');
  }

  function startEdit(row: Record<string, unknown>) {
    setForm({ ...row });
    setMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMsg('');
    const supabase = getBrowserClient();
    const payload: Record<string, unknown> = {};
    fields.forEach((f) => {
      let v = form[f.key];
      if (f.type === 'number') v = Number(v) || 0;
      payload[f.key] = v;
    });

    const { error } = form.id
      ? await supabase.from(table).update(payload).eq('id', form.id as string)
      : await supabase.from(table).insert(payload);

    setSaving(false);
    if (error) {
      setMsg(`Could not save: ${error.message}`);
    } else {
      setMsg('Saved.');
      setForm(null);
      load();
    }
  }

  async function remove(row: Record<string, unknown>) {
    if (!window.confirm(`Delete "${listLabel(row)}"? This cannot be undone.`))
      return;
    const supabase = getBrowserClient();
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', row.id as string);
    if (error) {
      setMsg(`Could not delete: ${error.message}`);
      return;
    }
    setMsg('Deleted.');
    load();
  }

  function renderField(f: FieldConfig) {
    if (!form) return null;
    const value = form[f.key];
    if (f.type === 'checkbox') {
      return (
        <label key={f.key} className="flex items-center gap-2.5 font-semibold text-[15px] py-2">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
            className="w-5 h-5 accent-emerald-700"
          />
          {f.label}
        </label>
      );
    }
    if (f.type === 'image') {
      return (
        <ImageUpload
          key={f.key}
          label={f.label}
          value={String(value || '')}
          onChange={(url) => setForm({ ...form, [f.key]: url })}
        />
      );
    }
    if (f.type === 'textarea') {
      return (
        <div key={f.key}>
          <label className="block text-sm font-bold mb-1.5">{f.label}</label>
          <textarea
            rows={f.rows || 4}
            value={String(value || '')}
            placeholder={f.placeholder}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className={inputCls}
          />
        </div>
      );
    }
    return (
      <div key={f.key}>
        <label className="block text-sm font-bold mb-1.5">{f.label}</label>
        <input
          type={f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : 'text'}
          value={String(value ?? '')}
          placeholder={f.placeholder}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          className={inputCls}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display font-black text-3xl text-pine-deep">{title}</h1>
          {description && <p className="text-ink/65 mt-1">{description}</p>}
        </div>
        <button
          onClick={startNew}
          className="bg-marigold text-ink font-bold px-4 py-2.5 border-2 border-ink shadow-card"
        >
          + Add New
        </button>
      </div>

      {form && (
        <form
          onSubmit={save}
          className="bg-white border-2 border-ink shadow-card p-5 sm:p-6 mb-8 space-y-4"
        >
          <h2 className="font-display font-bold text-xl">
            {form.id ? 'Edit' : 'New'} — {title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields
              .filter((f) => f.type !== 'textarea' && f.type !== 'image')
              .map(renderField)}
          </div>
          {fields.filter((f) => f.type === 'textarea' || f.type === 'image').map(renderField)}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="bg-pine text-paper font-bold px-6 py-2.5 border-2 border-ink disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setForm(null)}
              className="font-bold px-4 py-2.5 border-2 border-ink/30"
            >
              Cancel
            </button>
            {msg && <p className="font-semibold text-sm">{msg}</p>}
          </div>
        </form>
      )}
      {!form && msg && <p className="font-semibold mb-4">{msg}</p>}

      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="border-2 border-dashed border-ink/30 p-8 text-center text-ink/60">
          Nothing here yet. Use <strong>+ Add New</strong> to create the
          first item — it will appear on the website right away.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {rows.map((row) => (
            <li
              key={String(row.id)}
              className="bg-white border-2 border-ink/15 px-4 py-3 flex items-center gap-3 hover:border-ink/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="font-bold truncate">{listLabel(row)}</p>
                {listSub && (
                  <p className="text-sm text-ink/55 truncate">{listSub(row)}</p>
                )}
              </div>
              {'is_active' in row && (
                <span
                  className={`text-xs font-bold px-2 py-1 ${
                    row.is_active
                      ? 'bg-pine/10 text-pine'
                      : 'bg-clay/10 text-clay'
                  }`}
                >
                  {row.is_active ? 'LIVE' : 'HIDDEN'}
                </span>
              )}
              <button
                onClick={() => startEdit(row)}
                className="font-bold text-sm text-pine px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => remove(row)}
                className="font-bold text-sm text-clay px-2 py-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
