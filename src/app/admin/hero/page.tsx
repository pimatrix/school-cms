'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminHeroPage() {
  return (
    <EntityManager
      table="hero_slides"
      title="Hero Slides"
      description="The large banner at the top of the homepage. With more than one active slide, they rotate automatically."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 1 }}
      fields={[
        { key: 'title', label: 'Main Heading', type: 'text' },
        { key: 'cta_text', label: 'Button Text', type: 'text', placeholder: 'Explore Admissions' },
        { key: 'cta_link', label: 'Button Link', type: 'text', placeholder: '/admissions' },
        { key: 'sort_order', label: 'Order (lower first)', type: 'number' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
        { key: 'image_url', label: 'Banner Image', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled slide')}
      listSub={(r) => String(r.subtitle || '')}
    />
  );
}
