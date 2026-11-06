import type { SiteSettings } from './types';

// ---- Visibility toggles (migration 002) --------------------------------
// Maps a public page slug to its show_page_* flag on site_settings.
// This lives in its own module (no server-only imports) because the
// client-side Header needs pageVisible() too.
const PAGE_FLAGS: Record<string, keyof SiteSettings> = {
  about: 'show_page_about',
  academics: 'show_page_academics',
  facilities: 'show_page_facilities',
  gallery: 'show_page_gallery',
  news: 'show_page_news',
  events: 'show_page_events',
  admissions: 'show_page_admissions',
  faculty: 'show_page_faculty',
  contact: 'show_page_contact',
};

export function pageVisible(settings: SiteSettings, slug: string): boolean {
  const key = PAGE_FLAGS[slug];
  if (!key) return true;
  // Anything other than an explicit false means visible (rows saved before
  // migration 002 simply have no flag yet).
  return settings[key] !== false;
}
