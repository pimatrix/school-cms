'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminTeachersPage() {
  return (
    <EntityManager
      table="teachers"
      title="Teachers & Staff"
      description="Shikshak aur staff ki list — naam, pad (role), vishay, photo. Faculty page par dikhta hai."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 0 }}
      fields={[
        { key: 'name', label: 'Naam', type: 'text' },
        { key: 'role', label: 'Pad / Role', type: 'text', placeholder: 'Principal / PGT Hindi / TGT Maths' },
        { key: 'subject', label: 'Vishay (Subject)', type: 'text' },
        { key: 'qualification', label: 'Yogyata (Qualification)', type: 'text', placeholder: 'M.A., B.Ed.' },
        { key: 'email', label: 'Email (optional)', type: 'text' },
        { key: 'sort_order', label: 'Order (Principal = 1, phir bade se chhota)', type: 'number' },
        { key: 'is_active', label: 'Website par dikhayein (Active)', type: 'checkbox' },
        { key: 'photo_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.name || 'Unnamed')}
      listSub={(r) =>
        [r.role, r.subject].filter(Boolean).join(' • ')
      }
    />
  );
}
