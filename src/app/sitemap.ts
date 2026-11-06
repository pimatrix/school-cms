import type { MetadataRoute } from 'next';

const BASE = 'https://school-cms-mauve.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/academics', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/admissions', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/facilities', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faculty', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/news', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/events', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
