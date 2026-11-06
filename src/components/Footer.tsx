import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { externalHref, pageVisible } from '@/lib/data';
import { pick, t, type Lang } from '@/lib/i18n';
import type { SiteSettings } from '@/lib/types';

// Social brand marks — lucide no longer ships brand icons, so these are
// small hand-drawn inline SVGs in the same stroke/fill style.
function FacebookIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5V21h3Z" />
    </svg>
  );
}
function InstagramIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon({ className = 'w-[16px] h-[16px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.8 4h2.7l-6 6.8L21.5 20h-5.5l-4.3-5.6L6.7 20H4l6.4-7.3L3.7 4h5.6l3.9 5.1L17.8 4Zm-1 14.3h1.5L8.6 5.6H7L16.8 18.3Z" />
    </svg>
  );
}
function YoutubeIcon({ className = 'w-[19px] h-[19px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

export default function Footer({
  settings,
  lang,
}: {
  settings: SiteSettings;
  lang: Lang;
}) {
  const socials = [
    { label: 'Facebook', url: settings.facebook_url, Icon: FacebookIcon },
    { label: 'Instagram', url: settings.instagram_url, Icon: InstagramIcon },
    { label: 'Twitter / X', url: settings.twitter_url, Icon: XIcon },
    { label: 'YouTube', url: settings.youtube_url, Icon: YoutubeIcon },
  ].filter((s) => s.url);

  const quickLinks = [
    { href: '/about', slug: 'about', label: t(lang, 'aboutTheSchool') },
    { href: '/academics', slug: 'academics', label: t(lang, 'navAcademics') },
    { href: '/admissions', slug: 'admissions', label: t(lang, 'navAdmissions') },
    { href: '/faculty', slug: 'faculty', label: t(lang, 'ourFaculty') },
    { href: '/gallery', slug: 'gallery', label: t(lang, 'photoGalleryTitle') },
  ].filter((l) => pageVisible(settings, l.slug));

  const updateLinks = [
    { href: '/news', slug: 'news', label: t(lang, 'navNews') },
    { href: '/events', slug: 'events', label: t(lang, 'eventsCalendar') },
    { href: '/contact', slug: 'contact', label: t(lang, 'contactAndEnquiry') },
  ].filter((l) => pageVisible(settings, l.slug));

  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <h3 className="font-display font-extrabold text-[22px] leading-snug">
            {pick(lang, settings.school_name, settings.school_name_hi)}
          </h3>
          <p className="mt-1.5 text-saffron-light/90 text-sm font-medium">
            {pick(lang, settings.tagline, settings.tagline_hi)}
          </p>
          <p className="mt-4 text-white/65 text-sm leading-relaxed line-clamp-4">
            {pick(lang, settings.about_short, settings.about_short_hi)}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2.5 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={externalHref(s.url)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-white/30 hover:bg-saffron hover:text-navy-950 hover:ring-saffron transition-colors"
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-saffron-light font-bold tracking-[0.18em] text-xs uppercase mb-4">
            {t(lang, 'quickLinks')}
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-saffron-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-saffron-light font-bold tracking-[0.18em] text-xs uppercase mb-4">
            {t(lang, 'updates')}
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {updateLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-saffron-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin/login" className="hover:text-saffron-light transition-colors">
                {t(lang, 'adminPanel')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-saffron-light font-bold tracking-[0.18em] text-xs uppercase mb-4">
            {t(lang, 'reachUs')}
          </h4>
          <ul className="space-y-3 text-sm text-white/70 leading-relaxed">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-saffron-light" aria-hidden />
              <span>
                {settings.address}, {settings.city}, {settings.state}
                {settings.pincode ? ` — ${settings.pincode}` : ''}
              </span>
            </li>
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-saffron-light transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-saffron-light" aria-hidden /> {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 hover:text-saffron-light transition-colors">
                  <Mail className="w-4 h-4 shrink-0 text-saffron-light" aria-hidden /> {settings.email}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 shrink-0 text-saffron-light" aria-hidden /> {settings.board_name}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-2 items-center justify-between text-xs text-white/50">
          <p>
            © {new Date().getFullYear()}{' '}
            {pick(lang, settings.school_name, settings.school_name_hi)},{' '}
            {settings.city}. {t(lang, 'allRightsReserved')}
          </p>
          <p>{settings.affiliation}</p>
        </div>
      </div>
    </footer>
  );
}
