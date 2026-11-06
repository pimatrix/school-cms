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
      setError('Login failed: the email or password is incorrect. Please try again.');
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 texture-dots">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-lift w-full max-w-md p-7 sm:p-9"
      >
        <p className="text-saffron-dark font-bold tracking-[0.22em] text-xs uppercase">
          Secure Area
        </p>
        <h1 className="font-display font-extrabold text-3xl text-navy-900 mt-2">
          Admin Login
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          For authorised school administrators only.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
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
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
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
          className="mt-6 w-full bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3 rounded-lg shadow-soft disabled:opacity-60 transition-colors"
        >
          {loading ? 'Checking…' : 'Login →'}
        </button>
        <a href="/" className="block text-center text-sm font-semibold text-navy-700 mt-4 hover:underline">
          ← Back to website
        </a>
      </form>
    </div>
  );
}
