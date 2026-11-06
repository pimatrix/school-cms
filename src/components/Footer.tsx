import Link from 'next/link';
import { externalHref, pageVisible } from '@/lib/data';
import { pick, t, type Lang } from '@/lib/i18n';
import type { SiteSettings } from '@/lib/types';

export default function Footer({
  settings,
  lang,
}: {
  settings: SiteSettings;
  lang: Lang;
}) {
  const socials = [
    { label: 'Facebook', url: settings.facebook_url, icon: 'f' },
    { label: 'Instagram', url: settings.instagram_url, icon: '◎' },
    { label: 'Twitter / X', url: settings.twitter_url, icon: '𝕏' },
    { label: 'YouTube', url: settings.youtube_url, icon: '▶' },
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
                  className="w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-white/30 hover:bg-saffron hover:text-navy-950 hover:ring-saffron font-bold transition-colors"
                >
                  {s.icon}
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
            <li>
              📍 {settings.address}, {settings.city}, {settings.state}
              {settings.pincode ? ` — ${settings.pincode}` : ''}
            </li>
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-saffron-light transition-colors">
                  ☎ {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-saffron-light transition-colors">
                  ✉ {settings.email}
                </a>
              </li>
            )}
            <li>🎓 {settings.board_name}</li>
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
