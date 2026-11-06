import type { Field } from 'payload'

/** Trường SEO dùng chung cho trang có URL riêng. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    { name: 'metaTitle', type: 'text', maxLength: 70, admin: { description: 'Tối đa ~60 ký tự' } },
    { name: 'metaDescription', type: 'textarea', maxLength: 170, admin: { description: 'Tối đa ~155 ký tự' } },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'noindex', type: 'checkbox', defaultValue: false },
  ],
}

/** Nội dung chưa xác nhận: cờ để không xuất bản nhầm. */
export const needsConfirmationField: Field = {
  name: 'needsConfirmation',
  type: 'checkbox',
  defaultValue: true,
  label: 'Cần xác nhận',
  admin: { position: 'sidebar', description: 'Bỏ chọn sau khi admin đã xác nhận nội dung/tài sản.' },
}

export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: `URL không dấu, tạo từ "${from}"` },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = (typeof value === 'string' && value) || (data?.[from] as string | undefined) || ''
        return slugify(source)
      },
    ],
  },
})

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
