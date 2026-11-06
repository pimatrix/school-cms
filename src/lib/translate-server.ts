import { unstable_cache } from 'next/cache';

// ============================================================
//  Server-side English -> Hindi translation, shared by:
//    * /api/translate  — the admin panel's "Auto-translate" buttons
//                        (uses translatePlain; failures are reported)
//    * translate-on-read — when a visitor views the site in Hindi and a
//                        content item has no saved Hindi version, the
//                        public pages translate the English text on the
//                        fly (uses translateTextCached /
//                        translateHtmlCached; failures fall back to the
//                        original English — a page NEVER breaks because
//                        translation failed).
//
//  Providers (both free, no key): Google Translate's public gtx
//  endpoint, with MyMemory as a fallback. Long texts are translated
//  in chunks. On-read results are cached for ~30 days, keyed by the
//  source text, so each unique string is translated at most once
//  a month no matter how many visitors view it.
// ============================================================

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const CHUNK = 420; // keep each request safely under the ~500 char limit
const FETCH_TIMEOUT_MS = 8000;
const MAX_AUTO_CHARS = 8000; // on-read safety bound per field

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

async function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Translate provider returned ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function googleChunk(chunk: string): Promise<string> {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=' +
    encodeURIComponent(chunk);
  const data = (await fetchJson(url)) as unknown[];
  const segments = data?.[0];
  if (!Array.isArray(segments)) throw new Error('Unexpected translate response');
  return segments.map((s: unknown[]) => String(s?.[0] ?? '')).join('');
}

async function myMemoryChunk(chunk: string): Promise<string> {
  const url =
    'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(chunk) +
    '&langpair=en|hi';
  const data = (await fetchJson(url)) as {
    responseData?: { translatedText?: string };
    responseDetails?: string;
    quotaFinished?: boolean | null;
  };
  const out = data?.responseData?.translatedText;
  // When the free daily quota runs out, MyMemory answers HTTP 200 with
  // the warning AS the "translation" — never let that reach the site.
  if (
    !out ||
    data?.quotaFinished === true ||
    /^MYMEMORY WARNING/i.test(out) ||
    /QUOTA|INVALID EMAIL|INVALID TARGET/i.test(String(data?.responseDetails || ''))
  ) {
    throw new Error('MyMemory quota exhausted or invalid response');
  }
  return String(out);
}

/**
 * Plain translation, used by the admin API route. THROWS when both
 * providers fail, so the route can report the problem to the admin.
 */
export async function translatePlain(text: string): Promise<string> {
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

// ---- Translate-on-read (cached, never throws) ------------------------

/**
 * Strings that should never be sent to a translator: too short to be
 * prose, no Latin letters at all (numbers, dates, already-Hindi text),
 * URLs and e-mail addresses.
 */
function shouldSkip(text: string): boolean {
  const value = text.trim();
  if (value.length < 3) return true;
  if (value.length > MAX_AUTO_CHARS) return true;
  if (!/[A-Za-z]/.test(value)) return true;
  if (/^(https?:\/\/|www\.)/i.test(value)) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;
  return false;
}

const cachedTranslate = unstable_cache(
  async (text: string): Promise<string> => {
    try {
      return await translatePlain(text);
    } catch {
      return text; // degrade to English — never break the page
    }
  },
  ['en-hi-translate-v1'],
  { revalidate: 60 * 60 * 24 * 30, tags: ['en-hi-translate'] }
);

/**
 * Translate one plain-text field for display. Returns the input
 * unchanged when translation is skipped or unavailable.
 */
export async function translateTextCached(text: string): Promise<string> {
  if (!text || shouldSkip(text)) return text || '';
  try {
    return await cachedTranslate(text);
  } catch (err) {
    // Provider failures are handled inside cachedTranslate (they return
    // the English original). Reaching this catch means the cache layer
    // itself failed — log it (message only, never the content) so the
    // problem is visible in server logs instead of failing silently.
    console.error(
      '[i18n] translate-on-read cache error:',
      err instanceof Error ? err.message : String(err)
    );
    return text;
  }
}

/**
 * Translate an HTML body (page content) WITHOUT mangling its markup:
 * the string is split into tag / text segments, only the text segments
 * are translated (each through the cache, with its surrounding
 * whitespace preserved), and the pieces are reassembled in order.
 */
export async function translateHtmlCached(html: string): Promise<string> {
  if (!html) return '';
  if (!html.includes('<')) return translateTextCached(html);
  const parts = html.split(/(<[^>]+>)/g);
  const out = await Promise.all(
    parts.map(async (part) => {
      if (!part || part.startsWith('<')) return part;
      const lead = part.match(/^\s*/)?.[0] ?? '';
      const trail = part.match(/\s*$/)?.[0] ?? '';
      const core = part.trim();
      if (!core) return part;
      const translated = await translateTextCached(core);
      return lead + translated + trail;
    })
  );
  return out.join('');
}
