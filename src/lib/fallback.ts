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

// Fallback content mirrors supabase/seed.sql. It is used only when Supabase
// is unreachable or not configured yet, so the site never looks empty.
// Once the database is seeded, live data replaces all of this.
export const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  school_name: 'Govt School of Excellence Bal Vinay Mandir',
  school_name_hi: '',
  tagline: 'Indore’s first government School of Excellence with English-medium teaching.',
  tagline_hi: '',
  logo_url: '',
  about_short:
    'Govt School of Excellence Bal Vinay Mandir (शासकीय उत्कृष्ट बाल विनय मंदिर), Nehru Park Road, Indore is a government school of the Department of Education, Madhya Pradesh. Affiliated to the MP Board and teaching Classes 1 to 12 in English medium, it is the city’s first government Excellence English-medium school — known for merit-list results and disciplined teaching.',
  about_short_hi: '',
  email: 'excellencebalvinaymandir@gmail.com',
  phone: '',
  address: '7, Nehru Park Road, Vallabh Nagar',
  city: 'Indore',
  state: 'Madhya Pradesh',
  pincode: '452003',
  map_query: 'School of Excellence Bal Vinay Mandir, Nehru Park Road, Vallabh Nagar, Indore',
  map_embed_url: '',
  facebook_url: '',
  instagram_url: '',
  twitter_url: '',
  youtube_url: '',
  established_year: '',
  students_count: '',
  staff_count: '',
  board_name: 'MP Board (MPBSE)',
  affiliation: 'Department of Education, Govt. of Madhya Pradesh',
  show_page_about: true,
  show_page_academics: true,
  show_page_facilities: true,
  show_page_gallery: true,
  show_page_news: true,
  show_page_events: true,
  show_page_admissions: true,
  show_page_faculty: true,
  show_page_contact: true,
  show_section_about: true,
  show_section_notices: true,
  show_section_news: true,
  show_section_events: true,
  show_section_facilities: true,
  show_section_gallery: true,
  show_section_faculty: true,
  show_section_map: true,
};

export const FALLBACK_PAGES: Record<string, PageContent> = {
  about: {
    slug: 'about',
    title: 'About Our School',
    title_hi: '',
    body: `<p>Govt School of Excellence Bal Vinay Mandir (शासकीय उत्कृष्ट बाल विनय मंदिर) is a government school on Nehru Park Road (Park Road), Vallabh Nagar, Indore, run by the Department of Education, Government of Madhya Pradesh. It is affiliated to the Madhya Pradesh Board (MPBSE) and teaches Classes 1 to 12.</p>
<p><strong>A century-old legacy.</strong> The school's roots go back to Indore's cloth-brokers' association (formed 1914), which built a school building in 1936 and took over an old school in 1944 — later renamed Bal Vinay Mandir. A new building and playground came up in 1952, and the government took over the school around 1965.</p>
<p><strong>A School of Excellence.</strong> Granted Government School of Excellence status in 2002, it became the city's first government school to teach in English medium. Its students regularly shine in MP Board merit lists — in 2025, Vaidehi Mandloi secured 4th position in the Class 12 state merit list (Humanities, 486/500) — and in national programmes such as ISRO's Mission ShaktiSAT, where six of our girl students were selected for satellite-coding training.</p>`,
    body_hi: '',
  },
  academics: {
    slug: 'academics',
    title: 'Academics',
    title_hi: '',
    body: `<p>The school follows the Madhya Pradesh Board (MPBSE) curriculum prescribed by the Department of Education, Govt. of Madhya Pradesh, with <strong>English as the medium of instruction</strong>.</p>
<ul>
<li><strong>Primary &amp; Middle (Classes 1–8):</strong> strong foundations in English, Hindi, Mathematics, EVS/Science, Social Science, Sanskrit and Computer basics.</li>
<li><strong>Secondary (Classes 9–10):</strong> MP Board subjects with board-focused preparation, plus sanctioned vocational courses (job roles such as Domestic Data Entry Operator, Junior Software Developer and Security services).</li>
<li><strong>Higher Secondary (Classes 11–12):</strong> Science, Commerce and Humanities streams — the school is a regular name in MPBSE state merit lists.</li>
</ul>
<p>The school also serves as an examination centre for state programmes (MP Super-100 centre) and encourages olympiads, science projects and sports alongside academics.</p>`,
    body_hi: '',
  },
  admissions: {
    slug: 'admissions',
    title: 'Admissions',
    title_hi: '',
    body: `<p>Admissions follow the rules of the Department of Education, Government of Madhya Pradesh, for Classes 1 to 12.</p>
<ul>
<li><strong>Documents usually required:</strong> previous class marksheet, transfer certificate (TC), Samagra ID, Aadhaar copy, caste/income certificate where applicable, and passport-size photographs.</li>
<li><strong>Fees:</strong> as per Government of Madhya Pradesh norms for government schools (nominal / exempted for eligible categories).</li>
<li><strong>Session:</strong> the MP academic session generally begins in April.</li>
</ul>
<p>For the latest admission notification, please check the notice board on this website, email the school at excellencebalvinaymandir@gmail.com, or contact the school office.</p>`,
    body_hi: '',
  },
};

export const FALLBACK_HERO: HeroSlide[] = [
  {
    id: 'fallback-1',
    title: 'Where Excellence Is a Tradition',
    title_hi: '',
    subtitle:
      'शासकीय उत्कृष्ट बाल विनय मंदिर, इंदौर — the city’s first government Excellence English-medium school, and a regular name in MP Board merit lists.',
    subtitle_hi: '',
    image_url:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1800&auto=format&fit=crop',
    cta_text: 'Explore Admissions',
    cta_link: '/admissions',
    sort_order: 1,
    is_active: true,
  },
];

export const FALLBACK_NOTICES: Notice[] = [
  {
    id: 'fallback-n1',
    title: 'Welcome to the new school website — all notices will now also be published here.',
    title_hi: '',
    body: '',
    body_hi: '',
    link_url: '',
    is_pinned: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'fallback-news1',
    title: 'Vaidehi Mandloi secures 4th position in MP Board Class 12 state merit list',
    title_hi: '',
    excerpt:
      'Our student Vaidehi Mandloi scored 486/500 (97.2%) in the Humanities stream to stand 4th in the MPBSE Class 12 state merit list — reported by the Times of India.',
    excerpt_hi: '',
    body: '',
    body_hi: '',
    image_url:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1400&auto=format&fit=crop',
    publish_date: '2025-05-06',
    is_active: true,
  },
  {
    id: 'fallback-news2',
    title: 'Six girl students selected for ISRO Mission ShaktiSAT training',
    title_hi: '',
    excerpt:
      'Six girl students of the school were among 20 from Madhya Pradesh selected for 120 hours of satellite-coding training under Mission ShaktiSAT, run by Space Kids India with ISRO — reported by the Free Press Journal.',
    excerpt_hi: '',
    body: '',
    body_hi: '',
    image_url:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop',
    publish_date: '2025-06-20',
    is_active: true,
  },
];

export const FALLBACK_EVENTS: SchoolEvent[] = [];

export const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: 'fallback-g1',
    image_url:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1400&auto=format&fit=crop',
    caption: 'Morning assembly',
    caption_hi: '',
    category: 'Campus',
    media_type: 'image',
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fallback-g2',
    image_url:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop',
    caption: 'In the classroom',
    caption_hi: '',
    category: 'Academics',
    media_type: 'image',
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
];

export const FALLBACK_TEACHERS: Teacher[] = [];

export const FALLBACK_FACILITIES: Facility[] = [
  { id: 'fallback-f1', title: 'New Sports Ground', title_hi: '', description: 'Developed by Indore Municipal Corporation — 2 handball courts, a volleyball court, a kho-kho court, a malkhamb ground and a six-lane morning-walk track.', description_hi: '', icon: '🏃', image_url: '', sort_order: 1, is_active: true },
  { id: 'fallback-f2', title: 'Science Laboratories', title_hi: '', description: 'Laboratory work and student projects, including astrophysics and space-science projects reviewed at state level.', description_hi: '', icon: '🔬', image_url: '', sort_order: 2, is_active: true },
  { id: 'fallback-f3', title: 'Atal Tinkering & Innovation', title_hi: '', description: 'The school is listed under the Atal Innovation Mission (NITI Aayog) — innovation and tinkering activities for students.', description_hi: '', icon: '🚀', image_url: '', sort_order: 3, is_active: true },
  { id: 'fallback-f4', title: 'Vocational Courses', title_hi: '', description: 'Sanctioned vocational job roles for Classes 9–12 — IT/data entry, junior software development and security services.', description_hi: '', icon: '🛠️', image_url: '', sort_order: 4, is_active: true },
  { id: 'fallback-f5', title: 'Computer Lab', title_hi: '', description: 'Computer education with practical sessions for every stage.', description_hi: '', icon: '💻', image_url: '', sort_order: 5, is_active: true },
  { id: 'fallback-f6', title: 'Library', title_hi: '', description: 'Reference books, board-exam material and daily newspapers for students.', description_hi: '', icon: '📚', image_url: '', sort_order: 6, is_active: true },
];
