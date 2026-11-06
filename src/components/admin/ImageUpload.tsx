'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload fail ho gaya.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-bold mb-1.5">{label}</label>
      <div className="flex items-start gap-3">
        {value ? (
          <Image
            src={value}
            alt="Uploaded"
            width={120}
            height={90}
            className="w-[120px] h-[90px] object-cover border-2 border-ink"
          />
        ) : (
          <div className="w-[120px] h-[90px] border-2 border-dashed border-ink/40 flex items-center justify-center text-ink/40 text-xs font-semibold text-center px-2">
            No image
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="bg-marigold text-ink font-bold text-sm px-4 py-2 border-2 border-ink disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : '⬆ Upload Image'}
          </button>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…ya image URL paste karein"
            className="w-full border-2 border-ink/30 px-3 py-2 text-sm focus:outline-none focus:border-ink"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-clay text-sm font-semibold"
            >
              ✕ Remove image
            </button>
          )}
          {error && <p className="text-clay text-sm font-semibold">{error}</p>}
        </div>
      </div>
    </div>
  );
}
