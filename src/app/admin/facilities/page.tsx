'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminFacilitiesPage() {
  return (
    <EntityManager
      table="facilities"
      title="Facilities"
      description="Campus facilities — laboratories, library, sports ground and more. Use a single emoji as the icon (for example 🔬 📚 🖥️ 🏃 ⚽ 🎭)."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 0, icon: '🏫' }}
      fields={[
        { key: 'title', label: 'Facility Name', type: 'text', hindiKey: 'title_hi', hindiLabel: 'Facility Name (Hindi)' },
        { key: 'icon', label: 'Icon (emoji)', type: 'text', placeholder: '🔬' },
        { key: 'sort_order', label: 'Order (lower first)', type: 'number' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'description', label: 'Details', type: 'textarea', rows: 3, hindiKey: 'description_hi', hindiLabel: 'Details (Hindi)' },
        { key: 'image_url', label: 'Photo (optional)', type: 'image' },
      ]}
      listLabel={(r) => `${String(r.icon || '')} ${String(r.title || 'Untitled')}`}
      listSub={(r) => String(r.description || '')}
    />
  );
}
