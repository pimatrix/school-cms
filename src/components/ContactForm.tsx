'use client';

import { useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

export default function ContactForm() {
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
    'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] shadow-soft focus:outline-none focus:ring-2 focus:ring-marigold/70 focus:border-marigold transition';

  if (status === 'sent') {
    return (
      <div className="rounded-2xl bg-pine text-paper shadow-card p-7">
        <p className="font-display font-bold text-[22px]">Thank you — your message has been received.</p>
        <p className="text-paper/80 mt-2 text-sm leading-relaxed">
          Your enquiry has been saved. The school office will contact you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 rounded-full bg-marigold text-ink font-bold px-5 py-2.5 hover:bg-marigold-light transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-card ring-1 ring-ink/5 p-6 sm:p-7 space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5">Your Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls}
            placeholder="Mobile number"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1.5">Email *</label>
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
        <label className="block text-sm font-bold mb-1.5">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls}
          placeholder="Admissions, transfer, certificates — what would you like to know?"
        />
      </div>
      {status === 'error' && (
        <p className="text-clay font-semibold text-sm">
          ⚠ Your message could not be saved. Please try again, or contact the
          school office directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-pine text-paper font-bold px-7 py-3 shadow-soft hover:bg-pine-dark transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === 'sending' ? 'Sending…' : 'Send Enquiry →'}
      </button>
    </form>
  );
}
