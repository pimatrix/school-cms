'use client';

import { useRef, useState } from 'react';

// Single media upload box used inside admin forms. Uploads go through
// /api/upload (admin session + Cloudinary); pasting a direct URL also
// works. With `video` set it accepts videos and previews them inline.
export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
  video = false,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  video?: boolean;
}) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setStatus('Uploading… please wait.');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      onChange(data.url);
      setStatus('Uploaded.');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      {value ? (
        <div className="mb-2">
          {video ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={value}
              controls
              className="max-h-44 rounded-lg border border-slate-200"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Uploaded preview"
              className="max-h-40 rounded-lg border border-slate-200 object-cover"
            />
          )}
          <div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-sm text-clay font-semibold mt-1.5 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="rounded-lg bg-navy-700 text-white font-semibold px-4 py-2 text-sm hover:bg-navy-800 disabled:opacity-60 transition-colors"
        >
          {busy ? 'Uploading…' : video ? 'Upload video' : 'Upload image'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept={video ? 'video/*' : 'image/*'}
          className="hidden"
          onChange={onSelect}
        />
        <span className="text-sm text-slate-400">
          {video ? 'Video (mp4, webm), up to 100 MB.' : 'Image, up to 10 MB.'}
        </span>
      </div>
      {status && (
        <p className="text-sm text-slate-500 mt-1.5" aria-live="polite">
          {status}
        </p>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste a direct URL here"
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
      />
    </div>
  );
}
