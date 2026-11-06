export interface SiteSettings {
  id: number;
  school_name: string;
  school_name_hi: string;
  tagline: string;
  tagline_hi: string;
  logo_url: string;
  about_short: string;
  about_short_hi: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  map_query: string;
  map_embed_url: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  youtube_url: string;
  established_year: string;
  students_count: string;
  staff_count: string;
  board_name: string;
  affiliation: string;
  // Visibility toggles (migration 002) — default true = visible.
  show_page_about: boolean;
  show_page_academics: boolean;
  show_page_facilities: boolean;
  show_page_gallery: boolean;
  show_page_news: boolean;
  show_page_events: boolean;
  show_page_admissions: boolean;
  show_page_faculty: boolean;
  show_page_contact: boolean;
  show_section_about: boolean;
  show_section_notices: boolean;
  show_section_news: boolean;
  show_section_events: boolean;
  show_section_facilities: boolean;
  show_section_gallery: boolean;
  show_section_faculty: boolean;
  show_section_map: boolean;
}

export type PageSlug =
  | 'about'
  | 'academics'
  | 'facilities'
  | 'gallery'
  | 'news'
  | 'events'
  | 'admissions'
  | 'faculty'
  | 'contact';

export interface PageContent {
  slug: string;
  title: string;
  title_hi: string;
  body: string;
  body_hi: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  title_hi: string;
  subtitle: string;
  subtitle_hi: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
}

export interface Notice {
  id: string;
  title: string;
  title_hi: string;
  body: string;
  body_hi: string;
  link_url: string;
  is_pinned: boolean;
  is_active: boolean;
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  title_hi: string;
  excerpt: string;
  excerpt_hi: string;
  body: string;
  body_hi: string;
  image_url: string;
  publish_date: string;
  is_active: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  event_date: string;
  location: string;
  image_url: string;
  is_active: boolean;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  caption_hi: string;
  category: string;
  media_type: 'image' | 'video';
  sort_order: number;
  created_at: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  role_hi: string;
  subject: string;
  subject_hi: string;
  qualification: string;
  qualification_hi: string;
  photo_url: string;
  email: string;
  sort_order: number;
  is_active: boolean;
}

export interface Facility {
  id: string;
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  icon: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
