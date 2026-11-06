'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminNewsPage() {
  return (
    <EntityManager
      table="news"
      title="News"
      description="School news and stories — results, achievements and event reports."
      orderBy="publish_date"
      defaults={{ is_active: true, publish_date: new Date().toISOString().slice(0, 10) }}
      fields={[
        { key: 'title', label: 'News Title', type: 'text' },
        { key: 'publish_date', label: 'Date', type: 'date' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'excerpt', label: 'Short Summary (Excerpt)', type: 'textarea', rows: 2 },
        { key: 'body', label: 'Full Story (Body)', type: 'textarea', rows: 6 },
        { key: 'image_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) => String(r.publish_date || '')}
    />
  );
}
