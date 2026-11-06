import Link from 'next/link';
import { externalHref } from '@/lib/data';
import type { SiteSettings } from '@/lib/types';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { label: 'Facebook', url: settings.facebook_url, icon: 'f' },
    { label: 'Instagram', url: settings.instagram_url, icon: '◎' },
    { label: 'Twitter / X', url: settings.twitter_url, icon: '𝕏' },
    { label: 'YouTube', url: settings.youtube_url, icon: '▶' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-pine-deep text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <h3 className="font-display font-black text-[22px] leading-snug">
            {settings.school_name}
          </h3>
          <p className="mt-1.5 text-marigold-light/90 text-sm font-medium">
            {settings.tagline}
          </p>
          <p className="mt-4 text-paper/70 text-sm leading-relaxed line-clamp-4">
            {settings.about_short}
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
                  className="w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-paper/30 hover:bg-marigold hover:text-ink hover:ring-marigold font-bold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-marigold-light font-bold tracking-[0.18em] text-xs uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-paper/75">
            {[
              ['/about', 'About the School'],
              ['/academics', 'Academics'],
              ['/admissions', 'Admissions'],
              ['/faculty', 'Our Faculty'],
              ['/gallery', 'Photo Gallery'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-marigold-light transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-marigold-light font-bold tracking-[0.18em] text-xs uppercase mb-4">
            Updates
          </h4>
          <ul className="space-y-2.5 text-sm text-paper/75">
            {[
              ['/news', 'News & Notices'],
              ['/events', 'Events Calendar'],
              ['/contact', 'Contact & Enquiry'],
              ['/admin/login', 'Admin Panel'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-marigold-light transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-marigold-light font-bold tracking-[0.18em] text-xs uppercase mb-4">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm text-paper/75 leading-relaxed">
            <li>
              📍 {settings.address}, {settings.city}, {settings.state}
              {settings.pincode ? ` — ${settings.pincode}` : ''}
            </li>
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-marigold-light transition-colors">
                  ☎ {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-marigold-light transition-colors">
                  ✉ {settings.email}
                </a>
              </li>
            )}
            <li>🎓 {settings.board_name}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-2 items-center justify-between text-xs text-paper/55">
          <p>
            © {new Date().getFullYear()} {settings.school_name},{' '}
            {settings.city}. All rights reserved.
          </p>
          <p>{settings.affiliation}</p>
        </div>
      </div>
    </footer>
  );
}
