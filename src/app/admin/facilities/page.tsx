'use client';

import EntityManager from '@/components/admin/EntityManager';
import { FACILITY_ICON_KEYS } from '@/components/FacilityIcon';

export default function AdminFacilitiesPage() {
  return (
    <EntityManager
      table="facilities"
      title="Facilities"
      description="Campus facilities — laboratories, library, sports ground and more. Pick an icon from the list; it is shown on the website when no photo is set."
      orderBy="sort_order"
      defaults={{ is_active: true, sort_order: 0, icon: 'school' }}
      fields={[
        { key: 'title', label: 'Facility Name', type: 'text', hindiKey: 'title_hi', hindiLabel: 'Facility Name (Hindi)' },
        { key: 'icon', label: 'Icon', type: 'select', options: FACILITY_ICON_KEYS },
        { key: 'sort_order', label: 'Order (lower first)', type: 'number' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'description', label: 'Details', type: 'textarea', rows: 3, hindiKey: 'description_hi', hindiLabel: 'Details (Hindi)' },
        { key: 'image_url', label: 'Photo (optional)', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) => String(r.description || '')}
    />
  );
}
