'use client';

import { useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';
import { t, type Lang } from '@/lib/i18n';

export default function ContactForm({ lang = 'en' }: { lang?: Lang }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const supabase = getBrowserClient();
      const { error } = await supabase.from('enquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] shadow-soft focus:outline-none focus:ring-2 focus:ring-saffron/70 focus:border-saffron transition';
  const labelCls = 'block text-sm font-semibold text-slate-700 mb-1.5';

  if (status === 'sent') {
    return (
      <div className="rounded-2xl bg-navy-800 text-white shadow-card p-7">
        <p className="font-display font-bold text-[22px]">{t(lang, 'thankYouTitle')}</p>
        <p className="text-white/80 mt-2 text-sm leading-relaxed">
          {t(lang, 'thankYouBody')}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 rounded-full bg-saffron text-navy-950 font-bold px-5 py-2.5 hover:bg-saffron-light transition-colors"
        >
          {t(lang, 'sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 p-6 sm:p-7 space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{t(lang, 'yourName')} *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
            placeholder={t(lang, 'fullNamePlaceholder')}
          />
        </div>
        <div>
          <label className={labelCls}>{t(lang, 'phone')}</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls}
            placeholder={t(lang, 'mobilePlaceholder')}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>{t(lang, 'email')} *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className={labelCls}>{t(lang, 'message')} *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls}
          placeholder={t(lang, 'messagePlaceholder')}
        />
      </div>
      {status === 'error' && (
        <p className="text-clay font-semibold text-sm">⚠ {t(lang, 'formError')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-navy-700 text-white font-bold px-7 py-3 shadow-soft hover:bg-navy-800 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === 'sending' ? t(lang, 'sending') : `${t(lang, 'sendEnquiryBtn')} →`}
      </button>
    </form>
  );
}
