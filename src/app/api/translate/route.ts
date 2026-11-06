import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';
import { translatePlain } from '@/lib/translate-server';

export const runtime = 'nodejs';

// Auto-translate (English -> Hindi) for the admin panel's
// "Auto-translate" buttons. The result is only a draft: the admin can
// always edit the Hindi text by hand before saving.
//
// SECURITY: only a logged-in admin (Supabase Auth session) may call this.
// The provider logic (Google gtx + MyMemory fallback, chunking) lives in
// src/lib/translate-server.ts, shared with the public site's
// translate-on-read. Unlike translate-on-read, this route reports
// provider failures (502) so the admin knows the draft was not created.
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
          translations.push(item.trim() ? await translatePlain(item) : '');
        }
        return NextResponse.json({ translations });
      }
      const translation = single!.trim() ? await translatePlain(single!) : '';
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
