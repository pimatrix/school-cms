'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminGalleryPage() {
  return (
    <EntityManager
      table="gallery_images"
      title="Gallery"
      description="School photos, shown on the website grouped by category (for example Campus, Sports, Events)."
      orderBy="sort_order"
      defaults={{ category: 'Campus', sort_order: 0 }}
      fields={[
        { key: 'caption', label: 'Caption', type: 'text' },
        { key: 'category', label: 'Category', type: 'text', placeholder: 'Campus / Sports / Events / Academics' },
        { key: 'sort_order', label: 'Order (lower first)', type: 'number' },
        { key: 'image_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.caption || 'Photo')}
      listSub={(r) => String(r.category || '')}
    />
  );
}
