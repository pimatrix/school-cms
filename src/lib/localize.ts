import { translateHtmlCached, translateTextCached } from './translate-server';
import type {
  Facility,
  GalleryImage,
  HeroSlide,
  NewsItem,
  Notice,
  PageContent,
  SchoolEvent,
  SiteSettings,
  Teacher,
} from './types';

// ============================================================
//  Translate-on-read for the public website (Hindi mode).
//
//  src/lib/data.ts calls these helpers when the visitor's language
//  is Hindi. For every content field that has a Hindi counterpart,
//  the SAVED Hindi text wins; when it is empty, the English text is
//  auto-translated on the fly (cached — see translate-server.ts) so
//  the whole site reads in Hindi instead of silently falling back
//  to English. A few display-only fields without a Hindi column
//  (hero button text, event location, gallery category, the board
//  and affiliation lines) are translated in place for the same
//  reason; fields that feed the map query or contact links
//  (school name, address, phone, e-mail) are never touched.
// ============================================================

function hasText(value?: string | null): boolean {
  return Boolean(value && value.trim());
}

/** Saved Hindi if present, otherwise an on-the-fly translation. */
async function fill(
  en: string,
  hi: string | null | undefined,
  html = false
): Promise<string> {
  if (hasText(hi)) return hi as string;
  if (!hasText(en)) return en || '';
  return html ? translateHtmlCached(en) : translateTextCached(en);
}

export async function localizeSettings(s: SiteSettings): Promise<SiteSettings> {
  const [tagline_hi, about_short_hi, affiliation, board_name] =
    await Promise.all([
      fill(s.tagline, s.tagline_hi),
      fill(s.about_short, s.about_short_hi),
      // Display-only lines (no Hindi column) — translated in place.
      // school_name is a proper noun and is deliberately NOT translated
      // unless the admin saved a Hindi name.
      translateTextCached(s.affiliation),
      translateTextCached(s.board_name),
    ]);
  return { ...s, tagline_hi, about_short_hi, affiliation, board_name };
}

export async function localizePageContent(p: PageContent): Promise<PageContent> {
  const [title_hi, body_hi] = await Promise.all([
    fill(p.title, p.title_hi),
    fill(p.body, p.body_hi, true), // body is HTML — translate text only
  ]);
  return { ...p, title_hi, body_hi };
}

export async function localizeHeroSlides(slides: HeroSlide[]): Promise<HeroSlide[]> {
  return Promise.all(
    slides.map(async (s) => {
      const [title_hi, subtitle_hi, cta_text] = await Promise.all([
        fill(s.title, s.title_hi),
        fill(s.subtitle, s.subtitle_hi),
        translateTextCached(s.cta_text), // display-only, no Hindi column
      ]);
      return { ...s, title_hi, subtitle_hi, cta_text };
    })
  );
}

export async function localizeNotices(notices: Notice[]): Promise<Notice[]> {
  return Promise.all(
    notices.map(async (n) => {
      const [title_hi, body_hi] = await Promise.all([
        fill(n.title, n.title_hi),
        fill(n.body, n.body_hi, true),
      ]);
      return { ...n, title_hi, body_hi };
    })
  );
}

export async function localizeNews(items: NewsItem[]): Promise<NewsItem[]> {
  return Promise.all(
    items.map(async (n) => {
      const [title_hi, excerpt_hi, body_hi] = await Promise.all([
        fill(n.title, n.title_hi),
        fill(n.excerpt, n.excerpt_hi),
        fill(n.body, n.body_hi, true),
      ]);
      return { ...n, title_hi, excerpt_hi, body_hi };
    })
  );
}

export async function localizeEvents(events: SchoolEvent[]): Promise<SchoolEvent[]> {
  return Promise.all(
    events.map(async (e) => {
      const [title_hi, description_hi, location] = await Promise.all([
        fill(e.title, e.title_hi),
        fill(e.description, e.description_hi),
        translateTextCached(e.location), // display-only, no Hindi column
      ]);
      return { ...e, title_hi, description_hi, location };
    })
  );
}

export async function localizeGallery(images: GalleryImage[]): Promise<GalleryImage[]> {
  return Promise.all(
    images.map(async (g) => {
      const [caption_hi, category] = await Promise.all([
        fill(g.caption, g.caption_hi),
        translateTextCached(g.category), // display-only, no Hindi column
      ]);
      return { ...g, caption_hi, category };
    })
  );
}

export async function localizeTeachers(teachers: Teacher[]): Promise<Teacher[]> {
  return Promise.all(
    teachers.map(async (t) => {
      const [role_hi, subject_hi, qualification_hi] = await Promise.all([
        fill(t.role, t.role_hi),
        fill(t.subject, t.subject_hi),
        fill(t.qualification, t.qualification_hi),
      ]);
      // Names are proper nouns — never translated.
      return { ...t, role_hi, subject_hi, qualification_hi };
    })
  );
}

export async function localizeFacilities(facilities: Facility[]): Promise<Facility[]> {
  return Promise.all(
    facilities.map(async (f) => {
      const [title_hi, description_hi] = await Promise.all([
        fill(f.title, f.title_hi),
        fill(f.description, f.description_hi),
      ]);
      return { ...f, title_hi, description_hi };
    })
  );
}
