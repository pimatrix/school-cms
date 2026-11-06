'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminEventsPage() {
  return (
    <EntityManager
      table="events"
      title="Events"
      description="Aane wale karyakram — annual day, sports, pariksha karyakram, baithakein."
      orderBy="event_date"
      defaults={{ is_active: true, event_date: new Date().toISOString().slice(0, 10) }}
      fields={[
        { key: 'title', label: 'Event Name', type: 'text' },
        { key: 'event_date', label: 'Date', type: 'date' },
        { key: 'location', label: 'Jagah (Location)', type: 'text', placeholder: 'School Ground / Auditorium' },
        { key: 'is_active', label: 'Website par dikhayein (Active)', type: 'checkbox' },
        { key: 'description', label: 'Detail', type: 'textarea', rows: 4 },
        { key: 'image_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) => `${String(r.event_date || '')} ${r.location ? '• ' + String(r.location) : ''}`}
    />
  );
}
