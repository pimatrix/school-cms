'use client';

import { useState } from 'react';
import EntityManager from '@/components/admin/EntityManager';
import GalleryBulkUpload from '@/components/admin/GalleryBulkUpload';

export default function AdminGalleryPage() {
  // Bumping this key remounts the list so freshly bulk-uploaded items appear.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <GalleryBulkUpload onDone={() => setRefreshKey((k) => k + 1)} />
      <EntityManager
        key={refreshKey}
        table="gallery_images"
        title="Gallery Items"
        description="Photos and videos shown on the public Gallery page, grouped by category. Use the bulk upload above to add many at once; use this list to edit captions, change categories or delete items."
        orderBy="sort_order"
        defaults={{ category: 'Campus', sort_order: 0, media_type: 'image' }}
        fields={[
          {
            key: 'caption',
            label: 'Caption (optional)',
            type: 'text',
            hindiKey: 'caption_hi',
            hindiLabel: 'Caption (Hindi)',
          },
          {
            key: 'category',
            label: 'Category',
            type: 'text',
            placeholder: 'Campus / Sports / Events / Academics',
          },
          { key: 'sort_order', label: 'Order (lower first)', type: 'number' },
          {
            key: 'media_type',
            label: 'Media Type',
            type: 'select',
            options: ['image', 'video'],
          },
          { key: 'image_url', label: 'Photo / Video', type: 'image' },
        ]}
        listLabel={(r) =>
          `${r.media_type === 'video' ? '🎬 ' : ''}${String(r.caption || r.image_url || 'Gallery item')}`
        }
        listSub={(r) => String(r.category || '')}
      />
    </div>
  );
}
