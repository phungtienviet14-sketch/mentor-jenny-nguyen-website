import type { CollectionConfig } from 'payload'

import { adminOnlyField, hasRole, isAdmin } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'role'] },
  auth: true,
  access: {
    // Người dùng thấy chính mình; admin thấy tất cả.
    read: ({ req }) => (hasRole(req.user, 'admin') ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: isAdmin,
    update: ({ req }) => (hasRole(req.user, 'admin') ? true : req.user ? { id: { equals: req.user.id } } : false),
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        // Tài khoản đầu tiên luôn là admin.
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
          if (totalDocs === 0) return { ...data, role: 'admin' }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'marketing',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
      ],
      access: { create: adminOnlyField, update: adminOnlyField },
    },
  ],
}
