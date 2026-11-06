'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminGalleryPage() {
  return (
    <EntityManager
      table="gallery_images"
      title="Gallery"
      description="School ki photos. Category wise group hokar website par dikhti hain (jaise Campus, Sports, Events)."
      orderBy="sort_order"
      defaults={{ category: 'Campus', sort_order: 0 }}
      fields={[
        { key: 'caption', label: 'Caption (photo ke neeche text)', type: 'text' },
        { key: 'category', label: 'Category', type: 'text', placeholder: 'Campus / Sports / Events / Academics' },
        { key: 'sort_order', label: 'Order (chhota pehle)', type: 'number' },
        { key: 'image_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.caption || 'Photo')}
      listSub={(r) => String(r.category || '')}
    />
  );
}
