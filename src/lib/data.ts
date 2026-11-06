import {
  FALLBACK_EVENTS,
  FALLBACK_FACILITIES,
  FALLBACK_GALLERY,
  FALLBACK_HERO,
  FALLBACK_NEWS,
  FALLBACK_NOTICES,
  FALLBACK_PAGES,
  FALLBACK_SETTINGS,
  FALLBACK_TEACHERS,
} from './fallback';
import { getLang } from './lang';
import {
  localizeEvents,
  localizeFacilities,
  localizeGallery,
  localizeHeroSlides,
  localizeNews,
  localizeNotices,
  localizePageContent,
  localizeSettings,
  localizeTeachers,
} from './localize';
import { getPublicClient } from './supabase/public';
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

// Every getter is defensive: any error (no env, DB not seeded, network)
// falls back to the seed-mirror content so public pages always render full.

// Translate-on-read: when the visitor's language is Hindi, each getter's
// result passes through src/lib/localize.ts, which fills every empty
// *_hi field with a cached on-the-fly translation (saved Hindi always
// wins). This module is only imported by server components — the one
// helper client components need (pageVisible) lives in
// src/lib/visibility.ts, which has no server-only imports.
async function localized<T>(
  value: T,
  apply: (value: T) => Promise<T>
): Promise<T> {
  try {
    if (getLang() !== 'hi') return value;
    return await apply(value);
  } catch {
    return value;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  let settings: SiteSettings;
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();
    settings =
      error || !data ? FALLBACK_SETTINGS : { ...FALLBACK_SETTINGS, ...data };
  } catch {
    settings = FALLBACK_SETTINGS;
  }
  return localized(settings, localizeSettings);
}

export async function getPageContent(slug: string): Promise<PageContent> {
  const fallback = FALLBACK_PAGES[slug] || {
    slug,
    title: '',
    title_hi: '',
    body: '',
    body_hi: '',
  };
  let page: PageContent;
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('slug', slug)
      .single();
    page = error || !data ? fallback : (data as PageContent);
  } catch {
    page = fallback;
  }
  return localized(page, localizePageContent);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  let slides: HeroSlide[];
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    slides =
      error || !data || data.length === 0
        ? FALLBACK_HERO
        : (data as HeroSlide[]);
  } catch {
    slides = FALLBACK_HERO;
  }
  return localized(slides, localizeHeroSlides);
}

export async function getNotices(limit?: number): Promise<Notice[]> {
  let notices: Notice[];
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('notices')
      .select('*')
      .eq('is_active', true)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    notices =
      error || !data || data.length === 0
        ? FALLBACK_NOTICES
        : (data as Notice[]);
  } catch {
    notices = FALLBACK_NOTICES;
  }
  return localized(notices, localizeNotices);
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  let items: NewsItem[];
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('news')
      .select('*')
      .eq('is_active', true)
      .order('publish_date', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    items =
      error || !data || data.length === 0 ? FALLBACK_NEWS : (data as NewsItem[]);
  } catch {
    items = FALLBACK_NEWS;
  }
  return localized(items, localizeNews);
}

export async function getEvents(limit?: number): Promise<SchoolEvent[]> {
  let events: SchoolEvent[];
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    events = error || !data ? FALLBACK_EVENTS : (data as SchoolEvent[]);
  } catch {
    events = FALLBACK_EVENTS;
  }
  return localized(events, localizeEvents);
}

export async function getGallery(limit?: number): Promise<GalleryImage[]> {
  let images: GalleryImage[];
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      images = FALLBACK_GALLERY;
    } else {
      // Rows created before migration 002 may lack media_type — default to image.
      images = (data as GalleryImage[]).map((g) => ({
        ...g,
        media_type: g.media_type === 'video' ? 'video' : 'image',
        caption_hi: g.caption_hi || '',
      }));
    }
  } catch {
    images = FALLBACK_GALLERY;
  }
  return localized(images, localizeGallery);
}

export async function getTeachers(limit?: number): Promise<Teacher[]> {
  let teachers: Teacher[];
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('teachers')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    teachers = error || !data ? FALLBACK_TEACHERS : (data as Teacher[]);
  } catch {
    teachers = FALLBACK_TEACHERS;
  }
  return localized(teachers, localizeTeachers);
}

export async function getFacilities(): Promise<Facility[]> {
  let facilities: Facility[];
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    facilities =
      error || !data || data.length === 0
        ? FALLBACK_FACILITIES
        : (data as Facility[]);
  } catch {
    facilities = FALLBACK_FACILITIES;
  }
  return localized(facilities, localizeFacilities);
}

// The search text used for the map: the admin's map_query if set, otherwise
// the school's name + address + city from settings.
export function mapQuery(settings: SiteSettings): string {
  const q = (settings.map_query || '').trim();
  if (q) return q;
  return [settings.school_name, settings.address, settings.city]
    .filter(Boolean)
    .join(', ');
}

// A URL is directly iframe-embeddable only if it is a real Google Maps embed
// URL. A normal share/place link pasted by an admin is NOT embeddable (Google
// refuses to frame it), so for those we extract the place and rebuild.
function isEmbeddableMapUrl(url: string): boolean {
  return (
    url.includes('output=embed') ||
    url.includes('/maps/embed') ||
    url.includes('google.com/maps/embed') ||
    url.includes('embed?pb=')
  );
}

function queryFromMapUrl(url: string): string {
  try {
    const u = new URL(url);
    const q = u.searchParams.get('q') || u.searchParams.get('query');
    if (q) return q;
    const place = u.pathname.match(/\/place\/([^/@]+)/);
    if (place) return decodeURIComponent(place[1].replace(/\+/g, ' '));
  } catch {
    // not a parseable URL — ignore
  }
  return '';
}

// ALWAYS returns a working Google Maps embed URL:
//  1. a genuine embed URL saved by the admin wins;
//  2. otherwise the query-based embed is built from map_query / address.
export function mapEmbedSrc(settings: SiteSettings): string {
  const embed = (settings.map_embed_url || '').trim();
  if (embed && isEmbeddableMapUrl(embed)) return embed;
  const fromUrl = embed ? queryFromMapUrl(embed) : '';
  const q = encodeURIComponent(fromUrl || mapQuery(settings));
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

// "Open in Google Maps" link (full Google Maps search for the same place).
export function mapSearchUrl(settings: SiteSettings): string {
  const q = encodeURIComponent(mapQuery(settings));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

// Admin-entered external links (notice attachments, social profiles) are
// often typed without a protocol — normalise so the link actually works.
export function externalHref(url: string): string {
  const u = (url || '').trim();
  if (!u) return u;
  if (/^(https?:)?\/\//i.test(u) || u.startsWith('/') || u.startsWith('#')) {
    return u;
  }
  return `https://${u}`;
}

export function formatDate(iso: string, lang: 'en' | 'hi' = 'en'): string {
  try {
    return new Date(iso).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

// Visibility toggles live in ./visibility (no server-only imports, so
// client components can use them). Re-exported here for the server-side
// pages that already import helpers from this module.
export { pageVisible } from './visibility';
