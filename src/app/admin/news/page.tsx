'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminNewsPage() {
  return (
    <EntityManager
      table="news"
      title="News"
      description="School ki khabrein aur stories — result, jeet, karyakram ki reports."
      orderBy="publish_date"
      defaults={{ is_active: true, publish_date: new Date().toISOString().slice(0, 10) }}
      fields={[
        { key: 'title', label: 'News Title', type: 'text' },
        { key: 'publish_date', label: 'Date', type: 'date' },
        { key: 'is_active', label: 'Website par dikhayein (Active)', type: 'checkbox' },
        { key: 'excerpt', label: 'Chhota Summary (Excerpt)', type: 'textarea', rows: 2 },
        { key: 'body', label: 'Puri Khabar (Body)', type: 'textarea', rows: 6 },
        { key: 'image_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) => String(r.publish_date || '')}
    />
  );
}
