-- ============================================================
--  SCHOOL CMS — DATABASE SCHEMA + ROW LEVEL SECURITY
--  Supabase Dashboard -> SQL Editor -> paste ALL -> Run
--  Run this BEFORE seed.sql
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
--  TABLES
-- ------------------------------------------------------------

-- Single-row site settings (school name, logo, contacts, map, socials)
create table if not exists public.site_settings (
  id            int primary key default 1 check (id = 1),
  school_name   text not null default '',
  tagline       text not null default '',
  logo_url      text not null default '',
  about_short   text not null default '',
  email         text not null default '',
  phone         text not null default '',
  address       text not null default '',
  city          text not null default '',
  state         text not null default '',
  pincode       text not null default '',
  map_query     text not null default '',
  map_embed_url text not null default '',
  facebook_url  text not null default '',
  instagram_url text not null default '',
  twitter_url   text not null default '',
  youtube_url   text not null default '',
  established_year text not null default '',
  students_count   text not null default '',
  staff_count      text not null default '',
  board_name    text not null default '',
  affiliation   text not null default '',
  updated_at    timestamptz not null default now()
);

-- Editable page texts (about / academics / admissions)
create table if not exists public.page_content (
  slug  text primary key,
  title text not null default '',
  body  text not null default ''
);

create table if not exists public.hero_slides (
  id         uuid primary key default gen_random_uuid(),
  title      text not null default '',
  subtitle   text not null default '',
  image_url  text not null default '',
  cta_text   text not null default '',
  cta_link   text not null default '',
  sort_order int  not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.notices (
  id         uuid primary key default gen_random_uuid(),
  title      text not null default '',
  body       text not null default '',
  link_url   text not null default '',
  is_pinned  boolean not null default false,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  title        text not null default '',
  excerpt      text not null default '',
  body         text not null default '',
  image_url    text not null default '',
  publish_date date not null default current_date,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default '',
  description text not null default '',
  event_date  date not null default current_date,
  location    text not null default '',
  image_url   text not null default '',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id         uuid primary key default gen_random_uuid(),
  image_url  text not null default '',
  caption    text not null default '',
  category   text not null default 'Campus',
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.teachers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null default '',
  role          text not null default '',
  subject       text not null default '',
  qualification text not null default '',
  photo_url     text not null default '',
  email         text not null default '',
  sort_order    int  not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table if not exists public.facilities (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default '',
  description text not null default '',
  icon        text not null default '🏫',
  image_url   text not null default '',
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Contact-form submissions (admin inbox)
create table if not exists public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null default '',
  email      text not null default '',
  phone      text not null default '',
  message    text not null default '',
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
--  ROW LEVEL SECURITY
--  Rule of the house:
--   * Visitors (anon) can only READ published/active content.
--   * Visitors can only INSERT into enquiries (contact form).
--   * Everything else — create / edit / delete / read enquiries —
--     is allowed ONLY to a logged-in (authenticated) admin user.
-- ------------------------------------------------------------

alter table public.site_settings  enable row level security;
alter table public.page_content   enable row level security;
alter table public.hero_slides    enable row level security;
alter table public.notices        enable row level security;
alter table public.news           enable row level security;
alter table public.events         enable row level security;
alter table public.gallery_images enable row level security;
alter table public.teachers       enable row level security;
alter table public.facilities     enable row level security;
alter table public.enquiries      enable row level security;

-- helper to (re)create policies cleanly
-- site_settings: public read, admin write
drop policy if exists "settings_public_read"  on public.site_settings;
drop policy if exists "settings_admin_write"  on public.site_settings;
create policy "settings_public_read" on public.site_settings
  for select using (true);
create policy "settings_admin_write" on public.site_settings
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- page_content: public read, admin write
drop policy if exists "pages_public_read" on public.page_content;
drop policy if exists "pages_admin_write" on public.page_content;
create policy "pages_public_read" on public.page_content
  for select using (true);
create policy "pages_admin_write" on public.page_content
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- hero_slides: public read only active, admin write
drop policy if exists "hero_public_read" on public.hero_slides;
drop policy if exists "hero_admin_write" on public.hero_slides;
create policy "hero_public_read" on public.hero_slides
  for select using (is_active = true);
create policy "hero_admin_write" on public.hero_slides
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- notices: public read only active, admin write
drop policy if exists "notices_public_read" on public.notices;
drop policy if exists "notices_admin_write" on public.notices;
create policy "notices_public_read" on public.notices
  for select using (is_active = true);
create policy "notices_admin_write" on public.notices
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- news: public read only active, admin write
drop policy if exists "news_public_read" on public.news;
drop policy if exists "news_admin_write" on public.news;
create policy "news_public_read" on public.news
  for select using (is_active = true);
create policy "news_admin_write" on public.news
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- events: public read only active, admin write
drop policy if exists "events_public_read" on public.events;
drop policy if exists "events_admin_write" on public.events;
create policy "events_public_read" on public.events
  for select using (is_active = true);
create policy "events_admin_write" on public.events
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- gallery: public read, admin write
drop policy if exists "gallery_public_read" on public.gallery_images;
drop policy if exists "gallery_admin_write" on public.gallery_images;
create policy "gallery_public_read" on public.gallery_images
  for select using (true);
create policy "gallery_admin_write" on public.gallery_images
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- teachers: public read only active, admin write
drop policy if exists "teachers_public_read" on public.teachers;
drop policy if exists "teachers_admin_write" on public.teachers;
create policy "teachers_public_read" on public.teachers
  for select using (is_active = true);
create policy "teachers_admin_write" on public.teachers
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- facilities: public read only active, admin write
drop policy if exists "facilities_public_read" on public.facilities;
drop policy if exists "facilities_admin_write" on public.facilities;
create policy "facilities_public_read" on public.facilities
  for select using (is_active = true);
create policy "facilities_admin_write" on public.facilities
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- enquiries: visitors may INSERT only; reading/managing is admin-only
drop policy if exists "enquiries_public_insert" on public.enquiries;
drop policy if exists "enquiries_admin_all"    on public.enquiries;
create policy "enquiries_public_insert" on public.enquiries
  for insert with check (true);
create policy "enquiries_admin_all" on public.enquiries
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- NOTE: admin users are created in Supabase Dashboard ->
-- Authentication -> Users -> "Add user". Anyone not logged in
-- physically cannot write to the database because of the
-- policies above. Keep the admin email/password private.
