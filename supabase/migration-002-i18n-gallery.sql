-- ============================================================
--  SCHOOL CMS — MIGRATION 002
--  Bilingual content (English + Hindi), gallery videos and
--  page / section visibility toggles.
--  Supabase Dashboard -> SQL Editor -> paste ALL -> Run
--  Run AFTER schema.sql (and after seed.sql if already seeded).
--  Safe to run more than once (IF NOT EXISTS everywhere).
--  No RLS changes are needed: the same tables, the same policies.
-- ============================================================

-- ------------------------------------------------------------
--  1) HINDI COLUMNS (auto-translated, then hand-editable)
-- ------------------------------------------------------------

-- Site settings
alter table public.site_settings add column if not exists school_name_hi text not null default '';
alter table public.site_settings add column if not exists tagline_hi     text not null default '';
alter table public.site_settings add column if not exists about_short_hi text not null default '';

-- Page content (About / Academics / Admissions)
alter table public.page_content add column if not exists title_hi text not null default '';
alter table public.page_content add column if not exists body_hi  text not null default '';

-- Hero slides
alter table public.hero_slides add column if not exists title_hi    text not null default '';
alter table public.hero_slides add column if not exists subtitle_hi text not null default '';

-- Notices
alter table public.notices add column if not exists title_hi text not null default '';
alter table public.notices add column if not exists body_hi  text not null default '';

-- News
alter table public.news add column if not exists title_hi   text not null default '';
alter table public.news add column if not exists excerpt_hi text not null default '';
alter table public.news add column if not exists body_hi    text not null default '';

-- Events
alter table public.events add column if not exists title_hi       text not null default '';
alter table public.events add column if not exists description_hi text not null default '';

-- Teachers (names are never translated; role / subject / qualification are)
alter table public.teachers add column if not exists role_hi          text not null default '';
alter table public.teachers add column if not exists subject_hi       text not null default '';
alter table public.teachers add column if not exists qualification_hi text not null default '';

-- Facilities
alter table public.facilities add column if not exists title_hi       text not null default '';
alter table public.facilities add column if not exists description_hi text not null default '';

-- ------------------------------------------------------------
--  2) GALLERY — videos + Hindi caption
-- ------------------------------------------------------------
alter table public.gallery_images add column if not exists media_type text not null default 'image';
alter table public.gallery_images add column if not exists caption_hi text not null default '';

-- ------------------------------------------------------------
--  3) VISIBILITY TOGGLES (all default TRUE = visible)
--     Pages: hide a page from the menus AND block direct visits.
--     Sections: hide a block from the homepage only.
-- ------------------------------------------------------------

-- Pages
alter table public.site_settings add column if not exists show_page_about      boolean not null default true;
alter table public.site_settings add column if not exists show_page_academics  boolean not null default true;
alter table public.site_settings add column if not exists show_page_facilities boolean not null default true;
alter table public.site_settings add column if not exists show_page_gallery    boolean not null default true;
alter table public.site_settings add column if not exists show_page_news       boolean not null default true;
alter table public.site_settings add column if not exists show_page_events     boolean not null default true;
alter table public.site_settings add column if not exists show_page_admissions boolean not null default true;
alter table public.site_settings add column if not exists show_page_faculty    boolean not null default true;
alter table public.site_settings add column if not exists show_page_contact    boolean not null default true;

-- Homepage sections
alter table public.site_settings add column if not exists show_section_about      boolean not null default true;
alter table public.site_settings add column if not exists show_section_notices    boolean not null default true;
alter table public.site_settings add column if not exists show_section_news       boolean not null default true;
alter table public.site_settings add column if not exists show_section_events     boolean not null default true;
alter table public.site_settings add column if not exists show_section_facilities boolean not null default true;
alter table public.site_settings add column if not exists show_section_gallery    boolean not null default true;
alter table public.site_settings add column if not exists show_section_faculty    boolean not null default true;
alter table public.site_settings add column if not exists show_section_map        boolean not null default true;

-- Done. Existing rows automatically get: Hindi fields empty (the website
-- falls back to English until a translation is saved) and every page /
-- section visible.
