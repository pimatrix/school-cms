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

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();
    if (error || !data) return FALLBACK_SETTINGS;
    return { ...FALLBACK_SETTINGS, ...data };
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getPageContent(slug: string): Promise<PageContent> {
  const fallback = FALLBACK_PAGES[slug] || { slug, title: '', body: '' };
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error || !data) return fallback;
    return data as PageContent;
  } catch {
    return fallback;
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_HERO;
    return data as HeroSlide[];
  } catch {
    return FALLBACK_HERO;
  }
}

export async function getNotices(limit?: number): Promise<Notice[]> {
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
    if (error || !data || data.length === 0) return FALLBACK_NOTICES;
    return data as Notice[];
  } catch {
    return FALLBACK_NOTICES;
  }
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('news')
      .select('*')
      .eq('is_active', true)
      .order('publish_date', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return FALLBACK_NEWS;
    return data as NewsItem[];
  } catch {
    return FALLBACK_NEWS;
  }
}

export async function getEvents(limit?: number): Promise<SchoolEvent[]> {
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data) return FALLBACK_EVENTS;
    return data as SchoolEvent[];
  } catch {
    return FALLBACK_EVENTS;
  }
}

export async function getGallery(limit?: number): Promise<GalleryImage[]> {
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return FALLBACK_GALLERY;
    return data as GalleryImage[];
  } catch {
    return FALLBACK_GALLERY;
  }
}

export async function getTeachers(limit?: number): Promise<Teacher[]> {
  try {
    const supabase = getPublicClient();
    let query = supabase
      .from('teachers')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data) return FALLBACK_TEACHERS;
    return data as Teacher[];
  } catch {
    return FALLBACK_TEACHERS;
  }
}

export async function getFacilities(): Promise<Facility[]> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_FACILITIES;
    return data as Facility[];
  } catch {
    return FALLBACK_FACILITIES;
  }
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

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
