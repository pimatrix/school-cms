'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminFacilitiesPage() {
  return (
    <EntityManager
      table="facilities"
      title="Facilities"
      description="School ki suvidhayein — labs, library, ground aadi. Icon ke liye ek emoji chunein (🔬 📚 🖥️ 🏃 💻 🎭 ⚽ 🏥)."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 0, icon: '🏫' }}
      fields={[
        { key: 'title', label: 'Facility Name', type: 'text' },
        { key: 'icon', label: 'Icon (emoji)', type: 'text', placeholder: '🔬' },
        { key: 'sort_order', label: 'Order (chhota pehle)', type: 'number' },
        { key: 'is_active', label: 'Website par dikhayein (Active)', type: 'checkbox' },
        { key: 'description', label: 'Detail', type: 'textarea', rows: 3 },
        { key: 'image_url', label: 'Photo (optional)', type: 'image' },
      ]}
      listLabel={(r) => `${String(r.icon || '')} ${String(r.title || 'Untitled')}`}
      listSub={(r) => String(r.description || '')}
    />
  );
}
