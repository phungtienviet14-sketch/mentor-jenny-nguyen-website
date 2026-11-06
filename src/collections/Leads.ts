import type { CollectionConfig } from 'payload'

import { canManageLeads, isAdmin } from '@/access'

/**
 * Lead từ form. Tạo qua API riêng /api/leads (Phase 4, overrideAccess sau khi kiểm tra Turnstile/rate limit),
 * nên truy cập REST công khai bị chặn.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: { useAsTitle: 'fullName', defaultColumns: ['fullName', 'phone', 'status', 'createdAt'] },
  access: {
    read: canManageLeads,
    create: isAdmin,
    update: canManageLeads,
    delete: isAdmin,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'company', type: 'text' },
    { name: 'interest', type: 'text', label: 'Quan tâm' },
    { name: 'source', type: 'select', options: ['gift', 'consult'], label: 'Form' },
    {
      name: 'utm',
      type: 'group',
      fields: ['source', 'medium', 'campaign', 'content', 'term'].map((name) => ({ name, type: 'text' as const })),
    },
    { name: 'consent', type: 'checkbox', required: true, defaultValue: false, label: 'Đồng ý xử lý dữ liệu' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đã gọi', value: 'called' },
        { label: 'Đã chốt', value: 'won' },
        { label: 'Không phù hợp', value: 'lost' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'emailSent', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', readOnly: true } },
    { name: 'notes', type: 'textarea' },
  ],
}
