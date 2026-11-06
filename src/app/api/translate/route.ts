import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// Auto-translate (English -> Hindi) for the admin panel's
// "Auto-translate" buttons. The result is only a draft: the admin can
// always edit the Hindi text by hand before saving.
//
// SECURITY: only a logged-in admin (Supabase Auth session) may call this.
// Providers (both free, no key): Google Translate's public gtx endpoint,
// with MyMemory as a fallback. Long texts are translated in chunks.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const CHUNK = 420; // keep each request safely under the ~500 char limit

function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let rest = text;
  while (rest.length > CHUNK) {
    let cut = rest.lastIndexOf('. ', CHUNK);
    if (cut < CHUNK / 2) cut = rest.lastIndexOf(' ', CHUNK);
    if (cut < CHUNK / 2) cut = CHUNK;
    chunks.push(rest.slice(0, cut + 1));
    rest = rest.slice(cut + 1);
  }
  if (rest) chunks.push(rest);
  return chunks;
}

async function googleChunk(chunk: string): Promise<string> {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=' +
    encodeURIComponent(chunk);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Google Translate returned ${res.status}`);
  const data = await res.json();
  const segments = data?.[0];
  if (!Array.isArray(segments)) throw new Error('Unexpected translate response');
  return segments.map((s: unknown[]) => String(s?.[0] ?? '')).join('');
}

async function myMemoryChunk(chunk: string): Promise<string> {
  const url =
    'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(chunk) +
    '&langpair=en|hi';
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`MyMemory returned ${res.status}`);
  const data = await res.json();
  const out = data?.responseData?.translatedText;
  if (!out) throw new Error('Unexpected MyMemory response');
  return String(out);
}

async function translateOne(text: string): Promise<string> {
  const chunks = chunkText(text);
  const parts: string[] = [];
  for (const chunk of chunks) {
    let out: string;
    try {
      out = await googleChunk(chunk);
    } catch {
      out = await myMemoryChunk(chunk); // throws if this also fails
    }
    parts.push(out);
  }
  return parts.join(' ');
}

export async function POST(request: Request) {
  try {
    const supabase = getServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Login required. Only an administrator can use auto-translate.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    const single = typeof body?.text === 'string' ? body.text : null;
    const list: string[] | null = Array.isArray(body?.texts)
      ? body.texts.filter((x: unknown) => typeof x === 'string')
      : null;

    if (single === null && list === null) {
      return NextResponse.json(
        { error: 'Send { "text": "..." } or { "texts": ["...", "..."] }.' },
        { status: 400 }
      );
    }
    if (list && list.length > 20) {
      return NextResponse.json(
        { error: 'Too many texts in one request (maximum 20).' },
        { status: 400 }
      );
    }

    try {
      if (list) {
        const translations: string[] = [];
        for (const item of list) {
          translations.push(item.trim() ? await translateOne(item) : '');
        }
        return NextResponse.json({ translations });
      }
      const translation = single!.trim() ? await translateOne(single!) : '';
      return NextResponse.json({ translation });
    } catch (err) {
      console.error('Translate providers failed:', err);
      return NextResponse.json(
        {
          error:
            'Auto-translate is unavailable right now. Please type the Hindi text manually.',
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('Translate route error:', err);
    return NextResponse.json(
      { error: 'Auto-translate failed. Please try again.' },
      { status: 500 }
    );
  }
}
