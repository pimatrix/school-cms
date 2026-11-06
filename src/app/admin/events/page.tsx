'use client';

import EntityManager from '@/components/admin/EntityManager';

export default function AdminEventsPage() {
  return (
    <EntityManager
      table="events"
      title="Events"
      description="School events — annual day, sports, examinations and meetings."
      orderBy="event_date"
      defaults={{ is_active: true, event_date: new Date().toISOString().slice(0, 10) }}
      fields={[
        { key: 'title', label: 'Event Name', type: 'text', hindiKey: 'title_hi', hindiLabel: 'Event Name (Hindi)' },
        { key: 'event_date', label: 'Date', type: 'date' },
        { key: 'location', label: 'Location', type: 'text', placeholder: 'School Ground / Auditorium' },
        { key: 'is_active', label: 'Show on website (Active)', type: 'checkbox' },
        { key: 'description', label: 'Details', type: 'textarea', rows: 4, hindiKey: 'description_hi', hindiLabel: 'Details (Hindi)' },
        { key: 'image_url', label: 'Photo', type: 'image' },
      ]}
      listLabel={(r) => String(r.title || 'Untitled')}
      listSub={(r) => `${String(r.event_date || '')} ${r.location ? '• ' + String(r.location) : ''}`}
    />
  );
}
