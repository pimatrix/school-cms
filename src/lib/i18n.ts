// Bilingual UI dictionary (English / Hindi) for the public website.
// Content (notices, news, ...) lives in the database with *_hi columns;
// this file covers the fixed "chrome": navigation, headings, buttons,
// labels. When the language is Hindi, a content field falls back to
// English whenever its Hindi version is empty (see pick()).

export type Lang = 'en' | 'hi';

export const ui = {
  // Navigation
  navHome: { en: 'Home', hi: 'मुख्य पृष्ठ' },
  navAbout: { en: 'About', hi: 'हमारे बारे में' },
  navAcademics: { en: 'Academics', hi: 'शैक्षणिक' },
  navFacilities: { en: 'Facilities', hi: 'सुविधाएँ' },
  navFaculty: { en: 'Faculty', hi: 'शिक्षकगण' },
  navGallery: { en: 'Gallery', hi: 'गैलरी' },
  navNews: { en: 'News & Notices', hi: 'समाचार व सूचनाएँ' },
  navEvents: { en: 'Events', hi: 'कार्यक्रम' },
  navAdmissions: { en: 'Admissions', hi: 'प्रवेश' },
  navContact: { en: 'Contact', hi: 'संपर्क करें' },
  adminLogin: { en: 'Admin Login', hi: 'प्रशासनिक लॉगिन' },
  admissionsOpen: { en: 'Admissions Open', hi: 'प्रवेश प्रारंभ' },
  menu: { en: 'Menu', hi: 'मेनू' },

  // Ticker + hero
  noticesLabel: { en: 'NOTICES', hi: 'सूचनाएँ' },
  latestNotices: { en: 'Latest Notices', hi: 'ताज़ा सूचनाएँ' },
  established: { en: 'Established', hi: 'स्थापना' },
  students: { en: 'Students', hi: 'विद्यार्थी' },
  expertFaculty: { en: 'Expert Faculty', hi: 'अनुभवी शिक्षक' },
  board: { en: 'Board', hi: 'बोर्ड' },

  // Homepage sections
  theSchool: { en: 'The School', hi: 'विद्यालय परिचय' },
  publicSchoolStandard: {
    en: 'A public school with a private standard.',
    hi: 'सरकारी विद्यालय, उत्कृष्ट मानक।',
  },
  moreAboutUs: { en: 'More About Us', hi: 'और जानें' },
  meetTheFaculty: { en: 'Meet the Faculty', hi: 'शिक्षकों से मिलें' },
  noticeBoard: { en: 'Notice Board', hi: 'सूचना पट्ट' },
  latestNoticesTitle: { en: 'Latest Notices', hi: 'ताज़ा सूचनाएँ' },
  allNotices: { en: 'All notices', hi: 'सभी सूचनाएँ' },
  campusNews: { en: 'Campus News', hi: 'परिसर समाचार' },
  newsAndStories: { en: 'News & Stories', hi: 'समाचार और उपलब्धियाँ' },
  allNews: { en: 'All news', hi: 'सभी समाचार' },
  noNotices: { en: 'No notices right now.', hi: 'इस समय कोई सूचना नहीं है।' },
  noNews: { en: 'News will appear here soon.', hi: 'समाचार शीघ्र यहाँ दिखाई देंगे।' },
  calendar: { en: 'Calendar', hi: 'कैलेंडर' },
  upcomingEvents: { en: 'Upcoming Events', hi: 'आगामी कार्यक्रम' },
  allEvents: { en: 'All events', hi: 'सभी कार्यक्रम' },
  onCampus: { en: 'On Campus', hi: 'परिसर में' },
  facilitiesTitle: { en: 'Facilities', hi: 'सुविधाएँ' },
  exploreAll: { en: 'Explore all', hi: 'सभी देखें' },
  galleryKicker: { en: 'Gallery', hi: 'गैलरी' },
  momentsFromCampus: { en: 'Moments from Campus', hi: 'परिसर की झलकियाँ' },
  fullGallery: { en: 'Full gallery', hi: 'पूरी गैलरी' },
  people: { en: 'People', hi: 'हमारे लोग' },
  ourFaculty: { en: 'Our Faculty', hi: 'हमारे शिक्षक' },
  allFaculty: { en: 'All faculty', hi: 'सभी शिक्षक' },
  visitUs: { en: 'Visit Us', hi: 'पधारें' },
  findTheSchool: { en: 'Find the school', hi: 'विद्यालय का पता' },
  sendAnEnquiry: { en: 'Send an Enquiry', hi: 'पूछताछ भेजें' },
  openInGoogleMaps: { en: 'Open in Google Maps', hi: 'Google Maps में खोलें' },
  viewDownload: { en: 'View / Download', hi: 'देखें / डाउनलोड करें' },

  // Inner pages
  stayUpdated: { en: 'Stay Updated', hi: 'जानकारी प्राप्त करें' },
  newsAndNoticesTitle: { en: 'News & Notices', hi: 'समाचार व सूचनाएँ' },
  newsStoriesTitle: { en: 'News & Stories', hi: 'समाचार और उपलब्धियाँ' },
  noNewsYet: { en: 'No notices at the moment.', hi: 'इस समय कोई सूचना नहीं है।' },
  upcomingEventsTitle: { en: 'Upcoming Events', hi: 'आगामी कार्यक्रम' },
  pastEvents: { en: 'Past Events', hi: 'पिछले कार्यक्रम' },
  noUpcomingEvents: {
    en: 'No upcoming events scheduled right now — check the notice board for announcements.',
    hi: 'इस समय कोई आगामी कार्यक्रम निर्धारित नहीं है — घोषणाओं के लिए सूचना पट्ट देखें।',
  },
  photosSoon: { en: 'Photos will appear here soon.', hi: 'फ़ोटो शीघ्र यहाँ दिखाई देंगी।' },
  facilitiesSoon: {
    en: 'Facilities will be listed here soon.',
    hi: 'सुविधाएँ शीघ्र यहाँ सूचीबद्ध होंगी।',
  },
  facultySoon: {
    en: 'Faculty profiles will be added here soon.',
    hi: 'शिक्षकों की जानकारी शीघ्र यहाँ जोड़ी जाएगी।',
  },
  photoGalleryTitle: { en: 'Photo Gallery', hi: 'फ़ोटो गैलरी' },
  eventsTitle: { en: 'Events', hi: 'कार्यक्रम' },
  schoolOffice: { en: 'School Office', hi: 'विद्यालय कार्यालय' },
  sendEnquiryHeading: { en: 'Send an Enquiry', hi: 'पूछताछ भेजें' },
  contactIntro: {
    en: 'For admissions, documents or any other information, send the form below — your message goes directly to the school office inbox.',
    hi: 'प्रवेश, दस्तावेज़ों या किसी अन्य जानकारी के लिए नीचे दिया गया फ़ॉर्म भेजें — आपका संदेश सीधे विद्यालय कार्यालय के इनबॉक्स में जाएगा।',
  },
  contactTitle: { en: 'Contact & Enquiry', hi: 'संपर्क व पूछताछ' },
  schoolAtAGlance: { en: 'School at a Glance', hi: 'विद्यालय — एक नज़र में' },
  factBoard: { en: 'Board', hi: 'बोर्ड' },
  factAffiliation: { en: 'Affiliation', hi: 'संबद्धता' },
  factEstablished: { en: 'Established', hi: 'स्थापना' },
  factStudents: { en: 'Students', hi: 'विद्यार्थी' },
  factFaculty: { en: 'Faculty', hi: 'शिक्षक' },
  factLocation: { en: 'Location', hi: 'स्थान' },
  haveAQuestion: { en: 'Have a question?', hi: 'कोई प्रश्न है?' },
  admissionsAside: {
    en: 'Send an enquiry and the school office will get back to you. For urgent admission queries, please visit the school office during working hours.',
    hi: 'पूछताछ भेजें, विद्यालय कार्यालय आपसे संपर्क करेगा। प्रवेश संबंधी त्वरित जानकारी के लिए कृपया कार्य समय में विद्यालय कार्यालय आएँ।',
  },
  contactTheOffice: { en: 'Contact the Office', hi: 'कार्यालय से संपर्क करें' },

  // Contact form
  yourName: { en: 'Your Name', hi: 'आपका नाम' },
  fullNamePlaceholder: { en: 'Full name', hi: 'पूरा नाम' },
  phone: { en: 'Phone', hi: 'फ़ोन' },
  mobilePlaceholder: { en: 'Mobile number', hi: 'मोबाइल नंबर' },
  email: { en: 'Email', hi: 'ईमेल' },
  message: { en: 'Message', hi: 'संदेश' },
  messagePlaceholder: {
    en: 'Admissions, transfer, certificates — what would you like to know?',
    hi: 'प्रवेश, स्थानांतरण, प्रमाण-पत्र — आप क्या जानना चाहते हैं?',
  },
  sending: { en: 'Sending…', hi: 'भेजा जा रहा है…' },
  sendEnquiryBtn: { en: 'Send Enquiry', hi: 'पूछताछ भेजें' },
  thankYouTitle: {
    en: 'Thank you — your message has been received.',
    hi: 'धन्यवाद — आपका संदेश प्राप्त हो गया है।',
  },
  thankYouBody: {
    en: 'Your enquiry has been saved. The school office will contact you soon.',
    hi: 'आपकी पूछताछ सहेज ली गई है। विद्यालय कार्यालय शीघ्र आपसे संपर्क करेगा।',
  },
  sendAnother: { en: 'Send another message', hi: 'एक और संदेश भेजें' },
  formError: {
    en: 'Your message could not be saved. Please try again, or contact the school office directly.',
    hi: 'आपका संदेश सहेजा नहीं जा सका। कृपया पुनः प्रयास करें, या सीधे विद्यालय कार्यालय से संपर्क करें।',
  },

  // Footer
  quickLinks: { en: 'Quick Links', hi: 'त्वरित लिंक' },
  updates: { en: 'Updates', hi: 'अपडेट' },
  reachUs: { en: 'Reach Us', hi: 'हम तक पहुँचें' },
  aboutTheSchool: { en: 'About the School', hi: 'विद्यालय के बारे में' },
  eventsCalendar: { en: 'Events Calendar', hi: 'कार्यक्रम कैलेंडर' },
  contactAndEnquiry: { en: 'Contact & Enquiry', hi: 'संपर्क व पूछताछ' },
  adminPanel: { en: 'Admin Panel', hi: 'प्रशासन पैनल' },
  allRightsReserved: { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' },

  // Hidden page
  pageUnavailableTitle: {
    en: 'This page is temporarily unavailable',
    hi: 'यह पृष्ठ अस्थायी रूप से उपलब्ध नहीं है',
  },
  pageUnavailableBody: {
    en: 'This section of the website has been switched off by the school office for the moment. Please check back later, or return to the homepage for the latest information.',
    hi: 'वेबसाइट का यह भाग विद्यालय कार्यालय द्वारा फ़िलहाल बंद किया गया है। कृपया बाद में पुनः देखें, या ताज़ा जानकारी के लिए मुख्य पृष्ठ पर लौटें।',
  },
  backToHome: { en: 'Back to Homepage', hi: 'मुख्य पृष्ठ पर लौटें' },
} as const;

export type UiKey = keyof typeof ui;

/** Dictionary lookup: t(lang, 'navHome') */
export function t(lang: Lang, key: UiKey): string {
  return ui[key][lang];
}

/**
 * Localised content: in Hindi mode use the *_hi value when it has been
 * filled in, otherwise fall back to the English text.
 */
export function pick(lang: Lang, en: string, hi?: string | null): string {
  if (lang === 'hi' && hi && hi.trim()) return hi;
  return en || '';
}
