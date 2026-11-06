'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminNoticesPage() {
  return (
    <EntityManager
      table="notices"
      title="Notices"
      description="Notice board aur homepage ke upar chalne wali patti (ticker) — dono yahi se aata hai. Pinned notice sabse upar rehta hai."
      defaults={{ is_active: true, is_pinned: false }}
      fields={[
        { key: 'title', label: 'Notice Title', type: 'text' },
        { key: 'link_url', label: 'Attachment / Link URL (optional)', type: 'url', placeholder: 'PDF ya page ka link' },
        { key: 'is_pinned', label: '📌 Pin karein (sabse upar)', type: 'checkbox' },
        { key: 'is_active', label: 'Website par dikhayein (Active)', type: 'checkbox' },
        { key: 'body', label: 'Detail (optional)', type: 'textarea', rows: 4 },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) =>
        new Date(String(r.created_at)).toLocaleDateString('en-IN')
      }
    />
  );
}
