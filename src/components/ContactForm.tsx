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
    'w-full border-2 border-ink bg-paper px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-marigold';

  if (status === 'sent') {
    return (
      <div className="bg-pine text-paper border-2 border-ink shadow-card p-6">
        <p className="font-display font-bold text-xl">✅ Dhanyavaad! Message received.</p>
        <p className="text-paper/80 mt-2 text-sm leading-relaxed">
          Your enquiry has been saved. The school office will contact you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 bg-marigold text-ink font-bold px-4 py-2 border-2 border-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper border-2 border-ink shadow-card p-6 space-y-4"
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
          placeholder="Admission, transfer, certificate… kya jankari chahiye?"
        />
      </div>
      {status === 'error' && (
        <p className="text-clay font-semibold text-sm">
          ⚠ Message save nahi ho paya. Please try again, ya school office ko
          phone karein.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-pine text-paper font-bold px-6 py-3 border-2 border-ink shadow-card hover:-translate-y-0.5 transition-transform disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Enquiry →'}
      </button>
    </form>
  );
}
