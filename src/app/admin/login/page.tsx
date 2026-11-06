'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Login fail: email ya password galat hai. Dobara check karein.');
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  const inputCls =
    'w-full border-2 border-ink bg-paper px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-marigold';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 texture-dots">
      <form
        onSubmit={handleLogin}
        className="bg-paper border-2 border-ink shadow-lift w-full max-w-md p-7 sm:p-9"
      >
        <p className="text-pine font-extrabold tracking-[0.22em] text-xs uppercase">
          Secure Area
        </p>
        <h1 className="font-display font-black text-3xl text-pine-deep mt-2">
          Admin Login 🔐
        </h1>
        <p className="text-ink/65 text-sm mt-2">
          Sirf authorised school admin ke liye. Galat login database tak nahi
          pahuncha sakta — saari security Supabase RLS se hoti hai.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="admin@school.in"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-clay font-semibold text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-pine text-paper font-bold py-3 border-2 border-ink shadow-card disabled:opacity-60"
        >
          {loading ? 'Checking…' : 'Login →'}
        </button>
        <a href="/" className="block text-center text-sm font-semibold text-pine mt-4">
          ← Back to website
        </a>
      </form>
    </div>
  );
}
