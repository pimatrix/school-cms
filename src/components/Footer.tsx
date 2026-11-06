import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';

export default function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { label: 'Facebook', url: settings.facebook_url, icon: 'f' },
    { label: 'Instagram', url: settings.instagram_url, icon: '◎' },
    { label: 'Twitter / X', url: settings.twitter_url, icon: '𝕏' },
    { label: 'YouTube', url: settings.youtube_url, icon: '▶' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-pine-deep text-paper mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display font-black text-xl leading-snug">
            {settings.school_name}
          </h3>
          <p className="mt-3 text-paper/75 text-sm leading-relaxed">
            {settings.about_short}
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2 mt-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border border-paper/40 hover:bg-marigold hover:text-ink hover:border-marigold font-bold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-display font-bold text-marigold tracking-wide mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-paper/80">
            {[
              ['/about', 'About the School'],
              ['/academics', 'Academics'],
              ['/admissions', 'Admissions'],
              ['/faculty', 'Our Faculty'],
              ['/gallery', 'Photo Gallery'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-marigold">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-marigold tracking-wide mb-3">
            Updates
          </h4>
          <ul className="space-y-2 text-sm text-paper/80">
            {[
              ['/news', 'News & Notices'],
              ['/events', 'Events Calendar'],
              ['/contact', 'Contact & Enquiry'],
              ['/admin/login', 'Admin Panel'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-marigold">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-marigold tracking-wide mb-3">
            Reach Us
          </h4>
          <ul className="space-y-2 text-sm text-paper/80">
            <li>
              📍 {settings.address}, {settings.city}, {settings.state}
              {settings.pincode ? ` — ${settings.pincode}` : ''}
            </li>
            {settings.phone && <li>☎ {settings.phone}</li>}
            {settings.email && <li>✉ {settings.email}</li>}
            <li>🎓 {settings.board_name}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-2 items-center justify-between text-xs text-paper/60">
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
