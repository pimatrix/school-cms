export interface SiteSettings {
  id: number;
  school_name: string;
  tagline: string;
  logo_url: string;
  about_short: string;
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
}

export interface PageContent {
  slug: string;
  title: string;
  body: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  link_url: string;
  is_pinned: boolean;
  is_active: boolean;
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  publish_date: string;
  is_active: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  is_active: boolean;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  photo_url: string;
  email: string;
  sort_order: number;
  is_active: boolean;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
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
