import Link from 'next/link';

const SECTIONS = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'dashboard', title: 'Dashboard' },
  { id: 'site-settings', title: 'Site Settings' },
  { id: 'visibility', title: 'Page & Section Visibility (Show / Hide)' },
  { id: 'hero-slides', title: 'Hero Slides' },
  { id: 'notices', title: 'Notices' },
  { id: 'news', title: 'News' },
  { id: 'events', title: 'Events' },
  { id: 'gallery', title: 'Gallery — Bulk Upload & Videos' },
  { id: 'teachers', title: 'Teachers' },
  { id: 'facilities', title: 'Facilities' },
  { id: 'page-content', title: 'Page Content' },
  { id: 'enquiries', title: 'Enquiries' },
  { id: 'bilingual', title: 'English + Hindi (Bilingual System)' },
  { id: 'good-practices', title: 'Good Practices' },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-white rounded-xl border border-slate-200 shadow-card p-5 sm:p-6 scroll-mt-6"
    >
      <h2 className="font-display font-bold text-xl text-navy-900 mb-3">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

function Controls({ publicPage }: { publicPage: string }) {
  return (
    <p>
      <strong className="text-slate-800">Controls on the website:</strong> {publicPage}
    </p>
  );
}

function How({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="font-semibold text-slate-800 mb-1">How to use it:</p>
      <ul className="list-disc pl-5 space-y-1">{children}</ul>
    </div>
  );
}

export default function AdminManualPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-[28px] text-navy-900">
        Admin Manual
      </h1>
      <p className="text-slate-500 mt-1 mb-6 max-w-2xl">
        A complete guide to running this website — every section of the admin
        panel, what it controls on the public website, and how to use it. No
        technical knowledge is needed.
      </p>

      {/* Contents */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 sm:p-6 mb-6">
        <h2 className="font-display font-bold text-lg text-navy-900 mb-3">
          Contents
        </h2>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[15px] list-decimal pl-5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-navy-700 font-medium hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6">
        <Section id="getting-started" title="Getting Started">
          <p>
            You are signed in to the <strong>Admin Panel</strong> of the school
            website. Everything you change here appears on the public website
            almost immediately — there is no separate &quot;publish&quot; step.
          </p>
          <p>
            Use the menu on the left to move between sections. Use{' '}
            <strong>View Website</strong> (bottom of the menu) to open the
            public website in a new tab and check your changes, and{' '}
            <strong>Sign Out</strong> when you finish — especially on a shared
            computer.
          </p>
          <p>
            Most sections work the same way: a list of items with{' '}
            <strong>Edit</strong> and <strong>Delete</strong> buttons, and a{' '}
            <strong>+ Add New</strong> button at the top. Items marked{' '}
            <strong>LIVE</strong> are visible on the website; items marked{' '}
            <strong>HIDDEN</strong> (the &quot;Show on website&quot; checkbox is
            unticked) are saved but not shown.
          </p>
        </Section>

        <Section id="dashboard" title="Dashboard">
          <Controls publicPage="nothing directly — it is your overview screen." />
          <p>
            The Dashboard shows how many items exist in each section (slides,
            notices, news, events, gallery items, teachers, facilities) and
            highlights unread enquiries from the Contact page form, so nothing
            is missed.
          </p>
          <How>
            <li>Open the Dashboard when you sign in to see what needs attention.</li>
            <li>Click any card to jump straight to that section.</li>
            <li>If the unread-enquiries banner appears, open Enquiries and reply to the sender by phone or email.</li>
          </How>
        </Section>

        <Section id="site-settings" title="Site Settings">
          <Controls publicPage="the school name and tagline in the header, the logo, the contact strip, the About text on the homepage and footer, the statistics (established year, students, faculty), the board/affiliation line, the location map, and the social media links in the footer." />
          <How>
            <li>
              <strong>School Logo:</strong> upload a clear logo image (PNG with a
              transparent background looks best). If no logo is uploaded, a
              monogram with the school&apos;s initials is shown automatically.
            </li>
            <li>
              <strong>Homepage Short About:</strong> two or three sentences used
              on the homepage and in the footer.
            </li>
            <li>
              <strong>Basic:</strong> school name, tagline, established year,
              student and faculty counts, board name and the affiliation /
              department line shown in the top strip.
            </li>
            <li>
              <strong>Contact:</strong> email, phone and the full postal address.
              These appear on the Contact page, in the header and in the footer —
              keep them up to date.
            </li>
            <li>
              <strong>Map &amp; Social:</strong> the map is generated
              automatically from the <em>Google Maps Search Query</em> — just
              write the school name and area, for example &quot;Bal Vinay
              Mandir, Nehru Park Road, Indore&quot;. The <em>Map Embed URL</em>{' '}
              is optional and only needed for a custom Google Maps embed link.
              Paste full social media links (starting with https://) — blank
              links are simply not shown.
            </li>
            <li>
              <strong>Hindi Versions:</strong> Hindi translations of the school
              name, tagline and short about — see the bilingual section below.
            </li>
            <li>Press <strong>Save Settings</strong> after any change.</li>
          </How>
        </Section>

        <Section id="visibility" title="Page & Section Visibility (Show / Hide)">
          <Controls publicPage="which pages and which homepage blocks visitors can see." />
          <p>
            At the bottom of <strong>Site Settings</strong> there is a block
            called <strong>Page &amp; Section Visibility</strong> with on/off
            switches for every page and every homepage section.
          </p>
          <How>
            <li>
              <strong>Pages:</strong> switching a page OFF removes it from the
              header menu and the footer links. If someone opens its address
              directly, they see a polite &quot;This page is temporarily
              unavailable&quot; message — not an error. The content is not
              deleted; switch it back ON any time.
            </li>
            <li>
              <strong>Homepage sections:</strong> switching a section OFF hides
              only that block on the homepage (for example, hide the Gallery
              preview until photos are ready). The page itself stays available
              unless its page switch is also off.
            </li>
            <li>
              Useful during holidays or while preparing a page — for example,
              hide Admissions when admissions are closed.
            </li>
            <li>Remember to press <strong>Save Settings</strong> — the switches are saved together with the other settings.</li>
          </How>
        </Section>

        <Section id="hero-slides" title="Hero Slides">
          <Controls publicPage="the large banner at the very top of the homepage — headline, subtitle, background photo and button." />
          <How>
            <li>Click <strong>+ Add New</strong>, write the Main Heading and Subtitle, upload a wide Banner Image, and set the button text and link (for example button &quot;Admissions&quot;, link <code>/admissions</code>).</li>
            <li>With more than one active slide, they rotate automatically. Use <strong>Order</strong> to control the sequence (lower number first).</li>
            <li>Untick <strong>Show on website</strong> to keep a slide saved but hidden.</li>
            <li>Every slide also has Hindi fields for the heading and subtitle.</li>
          </How>
        </Section>

        <Section id="notices" title="Notices">
          <Controls publicPage="the scrolling notice ticker under the header on every page, the notice board on the homepage, and the News &amp; Notices page." />
          <How>
            <li>Add a notice with a short, clear title — the title is what scrolls in the ticker.</li>
            <li>Add details in the <strong>Details</strong> box if needed, and an <strong>Attachment / Link URL</strong> for a PDF or circular (visitors get a View / Download button).</li>
            <li><strong>Pin to top</strong> keeps an important notice first. Pinned notices are marked with a star.</li>
            <li>Untick <strong>Show on website</strong> to hide a notice without deleting it.</li>
            <li>Delete old notices regularly so the board stays current.</li>
          </How>
        </Section>

        <Section id="news" title="News">
          <Controls publicPage="the News section on the homepage and the News column on the News &amp; Notices page." />
          <How>
            <li>Use News for results, achievements and event reports — longer stories than notices.</li>
            <li>The <strong>Short Summary</strong> is shown on cards; the <strong>Full Story</strong> is kept for the record. Add a photo whenever possible.</li>
            <li>Set the correct <strong>Date</strong> — news is listed newest first.</li>
          </How>
        </Section>

        <Section id="events" title="Events">
          <Controls publicPage="the Upcoming Events section on the homepage and the Events page (upcoming events first, then past events)." />
          <How>
            <li>Add the event name, date, location and a short description.</li>
            <li>Events automatically move to &quot;Past Events&quot; after their date passes — no action needed.</li>
            <li>A photo makes the event card much more attractive.</li>
          </How>
        </Section>

        <Section id="gallery" title="Gallery — Bulk Upload & Videos">
          <Controls publicPage="the Gallery page (grouped by category) and the gallery preview on the homepage." />
          <p>
            The Gallery page in the admin panel has two parts: a{' '}
            <strong>Bulk Upload</strong> panel at the top, and the list of
            existing items below it.
          </p>
          <How>
            <li>
              <strong>Bulk upload:</strong> click <strong>Choose files…</strong>{' '}
              and select many files at once — photos <em>and</em> videos (mp4,
              webm) can be mixed. Then click <strong>Upload</strong>. Files
              upload one by one with a progress bar, and each file becomes a
              gallery item automatically.
            </li>
            <li>
              <strong>Captions are optional.</strong> If you type a caption in
              the bulk panel, it is applied to every file in that batch (a
              Hindi caption can be added too). Leave it blank for no caption.
              Afterwards, every item can be edited individually in the list
              below — caption, Hindi caption, category, order, or media type.
            </li>
            <li>
              <strong>Categories</strong> group items on the public page — use
              consistent names such as Campus, Sports, Events, Academics.
            </li>
            <li>
              <strong>Videos</strong> play directly on the website with play /
              pause controls. Keep videos short and under 100 MB; photos under
              10 MB.
            </li>
            <li>
              To change an item&apos;s photo or video later, open it with{' '}
              <strong>Edit</strong> and use the upload button inside the form —
              or simply delete the item and upload again.
            </li>
          </How>
        </Section>

        <Section id="teachers" title="Teachers">
          <Controls publicPage="the Faculty page and the faculty preview on the homepage." />
          <How>
            <li>Add each teacher with name, role (Principal, PGT Hindi, TGT Maths…), subject, qualification and a photo.</li>
            <li>Use <strong>Order</strong> to list the Principal first, then senior teachers.</li>
            <li>Names are never translated; role, subject and qualification have Hindi fields.</li>
            <li>Untick <strong>Show on website</strong> for staff who have left, instead of deleting them.</li>
          </How>
        </Section>

        <Section id="facilities" title="Facilities">
          <Controls publicPage="the Facilities page and the facilities strip on the homepage." />
          <How>
            <li>Add each facility with a name, a one-line description and, if available, a photo.</li>
            <li>The <strong>Icon</strong> is a single emoji (for example 🔬 📚 🖥️ 🏃 ⚽ 🎭) shown when no photo is set.</li>
          </How>
        </Section>

        <Section id="page-content" title="Page Content">
          <Controls publicPage="the main text of the About, Academics and Admissions pages." />
          <How>
            <li>Choose a page with the buttons at the top, edit the title and body, then <strong>Save Page</strong>.</li>
            <li>
              Basic HTML is supported: <code>&lt;p&gt;</code> for paragraphs,{' '}
              <code>&lt;ul&gt;&lt;li&gt;</code> for bullet lists and{' '}
              <code>&lt;strong&gt;</code> for bold text.
            </li>
            <li>Each page also has a Hindi title and Hindi body — see below.</li>
          </How>
        </Section>

        <Section id="enquiries" title="Enquiries">
          <Controls publicPage="nothing — this is your inbox for the public Contact form." />
          <How>
            <li>Every message sent from the website&apos;s Contact / Enquiry form arrives here with the sender&apos;s name, phone, email and message.</li>
            <li>Unread enquiries are shown in bold and counted on the Dashboard.</li>
            <li>Reply to the sender directly by phone or email (this panel does not send replies), then mark the enquiry as read.</li>
            <li>Delete enquiries that are fully handled to keep the inbox tidy.</li>
          </How>
        </Section>

        <Section id="bilingual" title="English + Hindi (Bilingual System)">
          <Controls publicPage="the EN | हिंदी switch in the website header. Visitors can read the whole website in Hindi; their choice is remembered in their browser." />
          <p>
            Almost every text in the admin panel has a <strong>Hindi version</strong>{' '}
            field next to the English one — notices, news, events, hero slides,
            teachers, facilities, gallery captions, page content and the site
            settings.
          </p>
          <How>
            <li>
              <strong>Auto-translate:</strong> write the English text first,
              then click <strong>Auto-translate from English</strong>. A Hindi
              draft is generated for you (machine translation, powered by free
              online translation services).
            </li>
            <li>
              <strong>Manual editing is always possible:</strong> the generated
              Hindi is only a draft. Read it, correct any word, or type the
              Hindi completely yourself — whatever is in the Hindi field when
              you press Save is exactly what visitors see.
            </li>
            <li>
              <strong>Blank is safe:</strong> if a Hindi field is left empty,
              Hindi-mode visitors simply see the English text for that item.
              Nothing ever appears broken.
            </li>
            <li>
              Fixed labels (menus, buttons, headings like &quot;Send an
              Enquiry&quot;) are translated automatically by the website
              itself — you do not need to translate them.
            </li>
            <li>
              Proper names (school name in addresses, teacher names) are
              usually best left in English or written in Devanagari exactly as
              the school prefers.
            </li>
            <li>
              Note for Page Content: page bodies use simple HTML. When
              auto-translating a full page body, review the result once —
              formatting tags occasionally need a small correction, which you
              can make directly in the Hindi body box.
            </li>
          </How>
        </Section>

        <Section id="good-practices" title="Good Practices">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Images:</strong> use clear, bright photos. Wide banner
              images (about 1600 × 900 pixels) look best in hero slides; keep
              photos under 10 MB and videos under 100 MB.
            </li>
            <li>
              <strong>Notices:</strong> keep titles short — one line that fits
              the scrolling ticker. Put details in the Details box or attach a
              PDF link.
            </li>
            <li>
              <strong>After every change,</strong> open the public website
              (View Website in the menu) and check how it looks — also switch
              to हिंदी once to review the Hindi version.
            </li>
            <li>
              <strong>Hide, don&apos;t delete:</strong> when in doubt, untick
              &quot;Show on website&quot; or use the visibility switches —
              hidden content can be restored in seconds; deleted content cannot.
            </li>
            <li>
              <strong>Keep contacts current:</strong> if the school phone or
              email changes, update Site Settings first — it updates the whole
              website at once.
            </li>
            <li>
              <strong>Sign out</strong> when you finish, especially on a shared
              or office computer.
            </li>
          </ul>
          <p>
            Questions about the website itself can be taken up with the
            developer who maintains it. For day-to-day content — notices, news,
            photos, events — this panel is all you need.
          </p>
        </Section>
      </div>

      <p className="text-sm text-slate-400 mt-6">
        Tip: bookmark this page. You can also open the{' '}
        <Link href="/admin" className="text-navy-700 font-medium hover:underline">
          Dashboard
        </Link>{' '}
        at any time from the menu.
      </p>
    </div>
  );
}
