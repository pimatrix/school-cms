'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminNoticesPage() {
  return (
    <EntityManager
      table="notices"
      title="Notices"
      description="Notices appear on the notice board and in the scrolling ticker at the top of every page. Pinned notices stay at the top."
      defaults={{ is_active: true, is_pinned: false }}
      fields={[
        { key: 'title', label: 'Notice Title', type: 'text' },
        { key: 'link_url', label: 'Attachment / Link URL (optional)', type: 'url', placeholder: 'https://…' },
        { key: 'is_pinned', label: 'Pin to top', type: 'checkbox' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'body', label: 'Details (optional)', type: 'textarea', rows: 4 },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) =>
        new Date(String(r.created_at)).toLocaleDateString('en-IN')
      }
    />
  );
}
