import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access'
import { needsConfirmationField } from '@/fields/common'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  admin: { useAsTitle: 'alt' },
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Mô tả ảnh (alt)' },
    { name: 'caption', type: 'text' },
    needsConfirmationField,
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
