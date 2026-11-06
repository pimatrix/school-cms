-- ============================================================
--  SCHOOL CMS — SEED DATA
--  Supabase Dashboard -> SQL Editor -> paste ALL -> Run
--  Run schema.sql FIRST, then this file.
--
--  SCHOOL: Govt School of Excellence Bal Vinay Mandir, Indore.
--  ⚠ CAUTION: Indore has SEVERAL "Bal Vinay Mandir" schools.
--  This data is ONLY for the GOVERNMENT school on Nehru Park
--  Road / Park Road, Vallabh Nagar. The Chhatribagh school
--  (Shri Bal Vinay Mandir, private trust, CBSE) is a DIFFERENT
--  school — none of its data is used here.
--
--  FACT SOURCES (checked Nov 2026):
--   * Name in MP govt records "GOVT. EXCELLENCE HSS BALVINAY
--     INDORE", Classes 1 to 12, UDISE 23260104013:
--     eqip.org.in (MP) + vimarsh.mp.gov.in
--   * Address 7, Nehru Park Road, Vallabh Nagar + coordinates
--     22.724576, 75.869898: school place listing; PIN 452003:
--     Vallabhnagar post office records
--   * Email excellencebalvinaymandir@gmail.com: Atal Innovation
--     Mission (NITI Aayog) MP schools list — aim.gov.in
--   * First govt Excellence English-medium school of Indore;
--     history (1914 cloth-brokers' association -> 1936 building
--     -> 1944 renamed Bal Vinay Mandir -> 1952 new building ->
--     govt takeover ~1965 -> Excellence status 2002):
--     Dainik Bhaskar + Amar Ujala
--   * Board merit 2025 (Vaidehi Mandloi, 4th in MPBSE Class 12
--     state merit, Humanities, 486/500): Times of India
--   * ISRO ShaktiSAT selection (6 girl students): Free Press Journal
--   * New sports ground by Indore Municipal Corporation
--     (Rs 60.81 lakh — handball, volleyball, kho-kho, malkhamb):
--     Amar Ujala, May 2025
--  PLACEHOLDERS (could NOT be verified — admin must correct):
--   * phone -> left EMPTY (no reliable source; no guess used)
--   * students_count / staff_count -> left EMPTY
--   * established_year -> left EMPTY (roots go back to 1914/
--     1936/1944; no single official foundation year in UDISE)
--   * sample teachers are SAMPLE names, not real staff
--     (a principal name found on one vendor site is UNVERIFIED
--     and deliberately NOT used)
-- ============================================================

-- ---------- SITE SETTINGS (single row) ----------
insert into public.site_settings (
  id, school_name, tagline, logo_url, about_short,
  email, phone, address, city, state, pincode,
  map_query, map_embed_url,
  facebook_url, instagram_url, twitter_url, youtube_url,
  established_year, students_count, staff_count, board_name, affiliation
) values (
  1,
  'Govt School of Excellence Bal Vinay Mandir',
  'Indore’s first government School of Excellence with English-medium teaching.',
  '',
  'Govt School of Excellence Bal Vinay Mandir (शासकीय उत्कृष्ट बाल विनय मंदिर), Nehru Park Road, Indore is a government higher secondary school of the Department of Education, Madhya Pradesh. Affiliated to the MP Board and teaching Classes 1 to 12 in English medium, it is the city''s first government Excellence English-medium school — known for merit-list results and disciplined teaching.',
  'excellencebalvinaymandir@gmail.com',
  '',  -- PLACEHOLDER: official phone not found on any govt source — admin to add
  '7, Nehru Park Road, Vallabh Nagar',
  'Indore',
  'Madhya Pradesh',
  '452003',
  'School of Excellence Bal Vinay Mandir, Nehru Park Road, Vallabh Nagar, Indore',
  '',
  '', '', '', '',
  '',  -- PLACEHOLDER: see history note in About page
  '',  -- PLACEHOLDER: admin to add
  '',  -- PLACEHOLDER: admin to add
  'MP Board (MPBSE)',
  'Department of Education, Govt. of Madhya Pradesh'
)
on conflict (id) do update set
  school_name = excluded.school_name,
  tagline = excluded.tagline,
  about_short = excluded.about_short,
  email = excluded.email,
  address = excluded.address,
  city = excluded.city,
  state = excluded.state,
  pincode = excluded.pincode,
  map_query = excluded.map_query,
  board_name = excluded.board_name,
  affiliation = excluded.affiliation;

-- ---------- PAGE CONTENT ----------
insert into public.page_content (slug, title, body) values
('about', 'About Our School',
'<p>Govt School of Excellence Bal Vinay Mandir (शासकीय उत्कृष्ट बाल विनय मंदिर) is a government school on Nehru Park Road (Park Road), Vallabh Nagar, Indore, run by the Department of Education, Government of Madhya Pradesh. It is affiliated to the Madhya Pradesh Board (MPBSE) and teaches Classes 1 to 12.</p>
<p><strong>A century-old legacy.</strong> The school''s roots go back to Indore''s cloth-brokers'' association (formed 1914), which built a school building in 1936 and took over an old school in 1944 — later renamed Bal Vinay Mandir. A new building and playground came up in 1952, with Montessori teaching among its early innovations, and the government took over the school around 1965.</p>
<p><strong>A School of Excellence.</strong> Granted Government School of Excellence status in 2002, it became the city''s first government school to teach in English medium. Its students regularly shine in MP Board merit lists — in 2025, Vaidehi Mandloi secured 4th position in the Class 12 state merit list (Humanities, 486/500) — and in national programmes such as ISRO''s Mission ShaktiSAT, where six of our girl students were selected for satellite-coding training.</p>'),
('academics', 'Academics',
'<p>The school follows the Madhya Pradesh Board (MPBSE) curriculum prescribed by the Department of Education, Govt. of Madhya Pradesh, with <strong>English as the medium of instruction</strong>.</p>
<ul>
<li><strong>Primary &amp; Middle (Classes 1–8):</strong> strong foundations in English, Hindi, Mathematics, EVS/Science, Social Science, Sanskrit and Computer basics.</li>
<li><strong>Secondary (Classes 9–10):</strong> MP Board subjects with board-focused preparation, plus sanctioned vocational courses (job roles such as Domestic Data Entry Operator, Junior Software Developer and Security services).</li>
<li><strong>Higher Secondary (Classes 11–12):</strong> Science, Commerce and Humanities streams — the school is a regular name in MPBSE state merit lists.</li>
</ul>
<p>The school also serves as an examination centre for state programmes (MP Super-100 centre) and encourages olympiads, science projects and sports alongside academics.</p>'),
('admissions', 'Admissions',
'<p>Admissions follow the rules of the Department of Education, Government of Madhya Pradesh, for Classes 1 to 12.</p>
<ul>
<li><strong>Documents usually required:</strong> previous class marksheet/report card, Transfer Certificate (TC) for Classes 2 and above, Samagra ID, Aadhaar copy, caste/income certificate where applicable, and passport-size photographs.</li>
<li><strong>Fees:</strong> as per Government of Madhya Pradesh norms for government schools (nominal / exempted for eligible categories).</li>
<li><strong>Session:</strong> the MP academic session generally begins in April.</li>
</ul>
<p>For the latest admission notification, please check the notice board on this website, email the school at excellencebalvinaymandir@gmail.com, or contact the school office. (Admin: update this page with the current session notice.)</p>')
on conflict (slug) do update set
  title = excluded.title, body = excluded.body;

-- ---------- HERO ----------
insert into public.hero_slides (title, subtitle, image_url, cta_text, cta_link, sort_order, is_active) values
('Where Excellence Is a Tradition',
 'शासकीय उत्कृष्ट बाल विनय मंदिर, इंदौर — the city''s first government Excellence English-medium school, and a regular name in MP Board merit lists.',
 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1800&auto=format&fit=crop',
 'Explore Admissions', '/admissions', 1, true);

-- ---------- NOTICES (samples — admin to replace) ----------
insert into public.notices (title, body, is_pinned, is_active) values
('Welcome to the official website of Govt School of Excellence Bal Vinay Mandir, Indore.',
 'All school notices will now also be published here. — School Office', true, true),
('Session 2026–27: classes are running as per the MP school calendar.',
 '', false, true);

-- ---------- NEWS (based on reported achievements — dates approx.,
-- admin to adjust) ------------------------------------------------
insert into public.news (title, excerpt, body, image_url, publish_date, is_active) values
('Vaidehi Mandloi secures 4th position in MP Board Class 12 state merit list',
 'Our student Vaidehi Mandloi scored 486/500 (97.2%) in the Humanities stream to stand 4th in the MPBSE Class 12 state merit list — reported by the Times of India.',
 'The Madhya Pradesh Board (MPBSE) Class 12 results once again brought honour to the school, with Vaidehi Mandloi''s name in the state top-10 merit list.',
 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1400&auto=format&fit=crop',
 '2025-05-06', true),
('Six girl students selected for ISRO Mission ShaktiSAT training',
 'Six girl students of the school were among 20 from Madhya Pradesh selected for 120 hours of satellite-coding training under Mission ShaktiSAT, run by Space Kids India with ISRO — reported by the Free Press Journal.',
 'The selected students joined 1,200 girls from 108 countries in the global ShaktiSAT programme — a proud moment for a government school.',
 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop',
 '2025-06-20', true);

-- ---------- EVENTS (samples — admin to replace) ----------
insert into public.events (title, description, event_date, location, is_active) values
('Annual Sports Day', 'Athletics, march-past and prize distribution at the new school sports ground.', current_date + interval '20 days', 'School Sports Ground', true),
('Parent–Teacher Meeting', 'For all classes. Parents are requested to attend with the student diary.', current_date + interval '10 days', 'School Campus', true);

-- ---------- FACILITIES ----------
-- Verified: new sports ground (IMC, Rs 60.81 lakh — 2 handball
-- courts, 1 volleyball, 1 kho-kho, malkhamb ground, walking track);
-- laboratories & student space-science projects (FPJ visit report);
-- Atal Innovation Mission listing; vocational courses (MP list).
-- Library / smart classes: typical, not specifically documented —
-- ADMIN: verify & edit.
insert into public.facilities (title, description, icon, sort_order, is_active) values
('New Sports Ground', 'Developed by Indore Municipal Corporation — 2 handball courts, a volleyball court, a kho-kho court, a malkhamb ground and a six-lane morning-walk track.', 'sports', 1, true),
('Science Laboratories', 'Laboratory work and student projects, including astrophysics and space-science projects reviewed at state level.', 'science', 2, true),
('Atal Tinkering & Innovation', 'The school is listed under the Atal Innovation Mission (NITI Aayog) — innovation and tinkering activities for students.', 'innovation', 3, true),
('Vocational Courses', 'Sanctioned vocational job roles for Classes 9–12 — IT/data entry, junior software development and security services.', 'vocational', 4, true),
('Computer Lab', 'Computer education with practical sessions for every stage.', 'computer', 5, true),
('Library', 'Reference books, board-exam material and daily newspapers for students.', 'library', 6, true);

-- ---------- TEACHERS (SAMPLES — real staff names were not publicly
-- verified; admin must replace these with the actual staff list) ----
insert into public.teachers (name, role, subject, qualification, sort_order, is_active) values
('Principal (Name to be updated)', 'Principal', '', '', 1, true),
('Senior Lecturer (Sample Entry)', 'PGT', 'Subject to be updated', '', 2, true);

-- ---------- GALLERY (starter stock photos — admin to replace with
-- real school photos via the admin panel) --------------------------
insert into public.gallery_images (image_url, caption, category, sort_order) values
('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1400&auto=format&fit=crop', 'Morning assembly (sample photo)', 'Campus', 1),
('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop', 'In the classroom (sample photo)', 'Academics', 2);
