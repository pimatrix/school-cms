'use client';

import { Clapperboard, Image as ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/browser';
import { adminInputCls } from './EntityManager';

interface QueueItem {
  id: number;
  file: File;
  isVideo: boolean;
  progress: number;
  status: 'queued' | 'uploading' | 'saving' | 'done' | 'error';
  error?: string;
}

// Bulk upload panel for the Gallery admin page. Pick many files at once
// (images AND videos); they upload one by one with a visible progress bar
// and each becomes a gallery item. The caption is optional — one caption
// can be applied to the whole batch, and every item stays editable below.
export default function GalleryBulkUpload({ onDone }: { onDone: () => void }) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [caption, setCaption] = useState('');
  const [captionHi, setCaptionHi] = useState('');
  const [category, setCategory] = useState('Campus');
  const [running, setRunning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    const items: QueueItem[] = files.map((file) => ({
      id: nextId.current++,
      file,
      isVideo: file.type.startsWith('video/'),
      progress: 0,
      status: 'queued',
    }));
    setQueue((q) => [...q, ...items]);
  }

  function patch(id: number, changes: Partial<QueueItem>) {
    setQueue((q) => q.map((it) => (it.id === id ? { ...it, ...changes } : it)));
  }

  function uploadOne(item: QueueItem): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          patch(item.id, { progress: Math.round((ev.loaded / ev.total) * 100) });
        }
      };
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText || '{}');
          if (xhr.status >= 200 && xhr.status < 300 && data.url) resolve(data.url);
          else reject(new Error(data.error || `Upload failed (${xhr.status})`));
        } catch {
          reject(new Error('Upload failed.'));
        }
      };
      xhr.onerror = () => reject(new Error('Network error during upload.'));
      const formData = new FormData();
      formData.append('file', item.file);
      xhr.send(formData);
    });
  }

  async function uploadAll() {
    if (running) return;
    setRunning(true);
    const supabase = getBrowserClient();
    // Continue sort order after the existing items.
    const { data } = await supabase
      .from('gallery_images')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);
    let order = (data?.[0]?.sort_order as number | undefined) ?? -1;

    for (const item of queue) {
      if (item.status === 'done') continue;
      patch(item.id, { status: 'uploading', progress: 0, error: undefined });
      try {
        const url = await uploadOne(item);
        patch(item.id, { status: 'saving', progress: 100 });
        order += 1;
        const { error } = await supabase.from('gallery_images').insert({
          image_url: url,
          caption: caption.trim(),
          caption_hi: captionHi.trim(),
          category: category.trim() || 'Campus',
          media_type: item.isVideo ? 'video' : 'image',
          sort_order: order,
        });
        if (error) throw new Error(error.message);
        patch(item.id, { status: 'done' });
      } catch (err) {
        patch(item.id, {
          status: 'error',
          error: err instanceof Error ? err.message : 'Failed.',
        });
      }
    }
    setRunning(false);
    onDone();
  }

  const doneCount = queue.filter((q) => q.status === 'done').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 sm:p-6 mb-8">
      <h2 className="font-display font-bold text-lg text-navy-900">
        Bulk Upload — Photos &amp; Videos
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Select many files at once — images and videos (mp4, webm) can be mixed.
        Files upload one by one and each becomes a gallery item below, where it
        can be edited later. The caption is <strong>optional</strong>: leave it
        blank if you do not need captions.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Caption for this batch (optional)
          </label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Annual Day 2026"
            className={adminInputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Caption in Hindi (optional)
          </label>
          <input
            value={captionHi}
            onChange={(e) => setCaptionHi(e.target.value)}
            placeholder="हिंदी कैप्शन (वैकल्पिक)"
            className={adminInputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Category
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Campus / Sports / Events / Academics"
            className={adminInputCls}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-lg font-semibold px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Choose files…
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={pick}
        />
        <button
          type="button"
          disabled={running || queue.length === 0 || doneCount === queue.length}
          onClick={uploadAll}
          className="rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 disabled:opacity-50 transition-colors"
        >
          {running
            ? 'Uploading…'
            : queue.length > 0
              ? `Upload ${queue.length - doneCount} file(s)`
              : 'Upload'}
        </button>
        {queue.length > 0 && !running && (
          <button
            type="button"
            onClick={() => setQueue([])}
            className="font-semibold text-sm text-slate-500 hover:underline"
          >
            Clear list
          </button>
        )}
        {queue.length > 0 && (
          <span className="text-sm text-slate-500">
            {doneCount} of {queue.length} uploaded
          </span>
        )}
      </div>

      {queue.length > 0 && (
        <ul className="mt-4 space-y-2">
          {queue.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-3.5 py-2.5"
            >
              <span className="shrink-0 text-navy-700" aria-hidden>
                {item.isVideo ? (
                  <Clapperboard className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {item.file.name}
                  <span className="text-slate-400 font-normal">
                    {' '}
                    ({(item.file.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </p>
                {(item.status === 'uploading' || item.status === 'saving') && (
                  <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-saffron rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
                {item.status === 'error' && (
                  <p className="text-xs text-clay mt-0.5">{item.error}</p>
                )}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  item.status === 'done'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : item.status === 'error'
                      ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {item.status === 'done'
                  ? 'DONE'
                  : item.status === 'error'
                    ? 'FAILED'
                    : item.status === 'saving'
                      ? 'SAVING…'
                      : item.status === 'uploading'
                        ? `${item.progress}%`
                        : 'QUEUED'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
