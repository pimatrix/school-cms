'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminTeachersPage() {
  return (
    <EntityManager
      table="teachers"
      title="Teachers & Staff"
      description="Teaching and non-teaching staff, shown on the Faculty page."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 0 }}
      fields={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text', placeholder: 'Principal / PGT Hindi / TGT Maths' },
        { key: 'subject', label: 'Subject', type: 'text' },
        { key: 'qualification', label: 'Qualification', type: 'text', placeholder: 'M.A., B.Ed.' },
        { key: 'email', label: 'Email (optional)', type: 'text' },
        { key: 'sort_order', label: 'Order (Principal first)', type: 'number' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'photo_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.name || 'Unnamed')}
      listSub={(r) =>
        [r.role, r.subject].filter(Boolean).join(' • ')
      }
    />
  );
}
