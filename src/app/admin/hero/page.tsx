'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminHeroPage() {
  return (
    <EntityManager
      table="hero_slides"
      title="Hero Slides"
      description="Homepage ke sabse upar wala bada banner. Ek se zyada slides honge to apne aap badalte rahenge."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 1 }}
      fields={[
        { key: 'title', label: 'Badi Heading', type: 'text' },
        { key: 'cta_text', label: 'Button Text', type: 'text', placeholder: 'Explore Admissions' },
        { key: 'cta_link', label: 'Button Link', type: 'text', placeholder: '/admissions' },
        { key: 'sort_order', label: 'Order (chhota pehle)', type: 'number' },
        { key: 'is_active', label: 'Website par dikhayein (Active)', type: 'checkbox' },
        { key: 'subtitle', label: 'Chhoti Line (Subtitle)', type: 'textarea', rows: 2 },
        { key: 'image_url', label: 'Banner Image', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled slide')}
      listSub={(r) => String(r.subtitle || '')}
    />
  );
}
