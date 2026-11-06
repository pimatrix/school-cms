'use client';

import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';
import { translateToHindi } from '@/lib/translate-client';
import ImageUpload from './ImageUpload';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'checkbox'
  | 'image'
  | 'url'
  | 'select';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  rows?: number;
  options?: string[];
  /**
   * Name of the Hindi counterpart column (e.g. 'title_hi'). When set, the
   * form shows a Hindi input next to this field with an "Auto-translate"
   * button. The Hindi text is a draft — the admin can always edit it by
   * hand before saving.
   */
  hindiKey?: string;
  hindiLabel?: string;
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

export const adminInputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600 transition';

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
  const [translating, setTranslating] = useState<string>('');
  // In-app delete confirmation (no native window.confirm — it is easily
  // dismissed/blocked and looks unprofessional): the row's id awaiting
  // confirmation, and the row currently being deleted.
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      if (f.hindiKey && init[f.hindiKey] === undefined) init[f.hindiKey] = '';
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
      if (f.hindiKey) payload[f.hindiKey] = form[f.hindiKey] ?? '';
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
    const id = row.id as string;
    setDeletingId(id);
    setMsg('');
    const supabase = getBrowserClient();
    const { error } = await supabase.from(table).delete().eq('id', id);
    setDeletingId(null);
    setConfirmId(null);
    if (error) {
      setMsg(`Could not delete: ${error.message}`);
      return;
    }
    setMsg('Deleted.');
    load();
  }

  async function autoTranslate(f: FieldConfig) {
    if (!form || !f.hindiKey) return;
    const source = String(form[f.key] || '').trim();
    if (!source) {
      setMsg('Fill in the English text first, then use Auto-translate.');
      return;
    }
    setTranslating(f.hindiKey);
    try {
      const hindi = await translateToHindi(source);
      setForm({ ...form, [f.hindiKey]: hindi });
      setMsg('Hindi draft added — please check and edit it if needed, then Save.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Auto-translate failed.');
    } finally {
      setTranslating('');
    }
  }

  function renderHindiPair(f: FieldConfig) {
    if (!form || !f.hindiKey) return null;
    const hiKey = f.hindiKey;
    const busy = translating === hiKey;
    return (
      <div className="rounded-lg bg-navy-50/70 border border-navy-100 px-3.5 py-3 mt-1">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <label className="block text-sm font-semibold text-slate-700">
            {f.hindiLabel || `${f.label} (Hindi)`}
          </label>
          <button
            type="button"
            disabled={busy}
            onClick={() => autoTranslate(f)}
            className="shrink-0 rounded-md bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 hover:bg-navy-800 disabled:opacity-60 transition-colors"
          >
            {busy ? 'Translating…' : 'Auto-translate from English'}
          </button>
        </div>
        {f.type === 'textarea' ? (
          <textarea
            rows={Math.max(2, (f.rows || 4) - 1)}
            value={String(form[hiKey] || '')}
            placeholder="Hindi text (optional — English is shown if left blank)"
            onChange={(e) => setForm({ ...form, [hiKey]: e.target.value })}
            className={adminInputCls}
          />
        ) : (
          <input
            value={String(form[hiKey] || '')}
            placeholder="Hindi text (optional — English is shown if left blank)"
            onChange={(e) => setForm({ ...form, [hiKey]: e.target.value })}
            className={adminInputCls}
          />
        )}
      </div>
    );
  }

  function renderField(f: FieldConfig) {
    if (!form) return null;
    const value = form[f.key];
    if (f.type === 'checkbox') {
      return (
        <div key={f.key}>
          <label className="flex items-center gap-2.5 font-semibold text-[15px] py-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
              className="w-5 h-5 accent-[#173F70]"
            />
            {f.label}
          </label>
          {renderHindiPair(f)}
        </div>
      );
    }
    if (f.type === 'image') {
      return (
        <div key={f.key}>
          <ImageUpload
            label={f.label}
            value={String(value || '')}
            onChange={(url) => setForm({ ...form, [f.key]: url })}
          />
          {renderHindiPair(f)}
        </div>
      );
    }
    if (f.type === 'select') {
      return (
        <div key={f.key}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
          <select
            value={String(value || '')}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className={adminInputCls}
          >
            {(f.options || []).map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {renderHindiPair(f)}
        </div>
      );
    }
    if (f.type === 'textarea') {
      return (
        <div key={f.key}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
          <textarea
            rows={f.rows || 4}
            value={String(value || '')}
            placeholder={f.placeholder}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className={adminInputCls}
          />
          {renderHindiPair(f)}
        </div>
      );
    }
    return (
      <div key={f.key}>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
        <input
          type={f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : 'text'}
          value={String(value ?? '')}
          placeholder={f.placeholder}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          className={adminInputCls}
        />
        {renderHindiPair(f)}
      </div>
    );
  }

  const hasHindi = fields.some((f) => f.hindiKey);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display font-bold text-[28px] text-navy-900">{title}</h1>
          {description && <p className="text-slate-500 mt-1">{description}</p>}
        </div>
        <button
          onClick={startNew}
          className="rounded-lg bg-saffron hover:bg-saffron-light text-navy-950 font-semibold px-4 py-2.5 shadow-soft transition-colors"
        >
          + Add New
        </button>
      </div>

      {form && (
        <form
          onSubmit={save}
          className="bg-white rounded-xl border border-slate-200 shadow-card p-5 sm:p-6 mb-8 space-y-4"
        >
          <h2 className="font-display font-bold text-lg text-navy-900">
            {form.id ? 'Edit' : 'New'} — {title}
          </h2>
          {hasHindi && (
            <p className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
              This form has Hindi versions of the text fields. Use{' '}
              <strong>Auto-translate</strong> to generate a Hindi draft from the
              English text, then edit it by hand if needed — your edited Hindi
              is what visitors see when they switch the website to Hindi.
              Leaving a Hindi field blank shows the English text instead.
            </p>
          )}
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
              className="inline-flex items-center gap-2 rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-semibold px-6 py-2.5 disabled:opacity-60 transition-colors"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setForm(null)}
              className="rounded-lg font-semibold px-4 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            {msg && <p className="font-semibold text-sm text-slate-600">{msg}</p>}
          </div>
        </form>
      )}
      {!form && msg && <p className="font-semibold mb-4 text-slate-600">{msg}</p>}

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500 bg-white/60">
          Nothing here yet. Use <strong>+ Add New</strong> to create the
          first item — it will appear on the website right away.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {rows.map((row) => (
            <li
              key={String(row.id)}
              className="bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center gap-3 hover:border-navy-200 hover:shadow-soft transition"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800 truncate">{listLabel(row)}</p>
                {listSub && (
                  <p className="text-sm text-slate-400 truncate">{listSub(row)}</p>
                )}
              </div>
              {'is_active' in row && (
                <span
                  className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                    row.is_active
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : 'bg-red-50 text-red-600 ring-1 ring-red-200'
                  }`}
                >
                  {row.is_active ? 'LIVE' : 'HIDDEN'}
                </span>
              )}
              {confirmId === String(row.id) ? (
                <span className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-clay hidden sm:inline">
                    Delete this item?
                  </span>
                  <button
                    onClick={() => remove(row)}
                    disabled={deletingId === String(row.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-clay text-white text-sm font-semibold px-3 py-1.5 hover:bg-red-700 disabled:opacity-60 transition-colors"
                  >
                    {deletingId === String(row.id) && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden />
                    )}
                    {deletingId === String(row.id) ? 'Deleting…' : 'Delete'}
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    disabled={deletingId === String(row.id)}
                    className="rounded-lg border border-slate-300 text-slate-600 text-sm font-semibold px-3 py-1.5 hover:bg-slate-50 disabled:opacity-60 transition-colors"
                  >
                    Cancel
                  </button>
                </span>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(row)}
                    className="font-semibold text-sm text-navy-700 px-2 py-1 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setMsg('');
                      setConfirmId(String(row.id));
                    }}
                    className="font-semibold text-sm text-clay px-2 py-1 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
