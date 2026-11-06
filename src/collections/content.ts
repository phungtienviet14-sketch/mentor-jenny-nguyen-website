import type { CollectionConfig, Field } from 'payload'

import { canEditContent, publishedOrStaff } from '@/access'
import { needsConfirmationField, seoField, slugField } from '@/fields/common'

const contentAccess = {
  read: publishedOrStaff,
  create: canEditContent,
  update: canEditContent,
  delete: canEditContent,
}

const drafts = { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 20 }

const base = (slug: string, useAsTitle: string, fields: Field[], extra: Partial<CollectionConfig> = {}): CollectionConfig => ({
  slug,
  admin: { useAsTitle },
  access: contentAccess,
  versions: drafts,
  fields: [...fields, needsConfirmationField],
  ...extra,
})

export const Courses = base('courses', 'name', [
  { name: 'name', type: 'text', required: true, label: 'Tên khóa học' },
  slugField('name'),
  { name: 'tagline', type: 'text' },
  { name: 'description', type: 'richText' },
  { name: 'audience', type: 'textarea', label: 'Đối tượng' },
  { name: 'outcomes', type: 'array', label: 'Kết quả đạt được', fields: [{ name: 'text', type: 'text', required: true }] },
  { name: 'format', type: 'text', label: 'Hình thức' },
  { name: 'tuition', type: 'text', label: 'Học phí' },
  { name: 'schedule', type: 'text', label: 'Lịch khai giảng' },
  { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  seoField,
])

export const Books = base('books', 'name', [
  { name: 'name', type: 'text', required: true, label: 'Tên sách' },
  slugField('name'),
  { name: 'cover', type: 'upload', relationTo: 'media' },
  { name: 'description', type: 'richText' },
  { name: 'buyUrl', type: 'text', label: 'Link mua' },
  seoField,
])

export const Testimonials = base('testimonials', 'fullName', [
  { name: 'fullName', type: 'text', required: true },
  { name: 'position', type: 'text', label: 'Chức vụ' },
  { name: 'quote', type: 'textarea', required: true },
  { name: 'videoUrl', type: 'text' },
  {
    name: 'consentGiven',
    type: 'checkbox',
    label: 'Đã được người này cho phép đăng',
    admin: { description: 'Bắt buộc tích trước khi xuất bản.' },
    validate: (value: boolean | null | undefined) => (value ? true : 'Cần xác nhận đã xin phép trước khi lưu.'),
  },
])

export const Press = base('press', 'title', [
  { name: 'title', type: 'text', required: true },
  { name: 'label', type: 'text', label: 'Nhãn (báo/sự kiện)' },
  { name: 'image', type: 'upload', relationTo: 'media' },
  { name: 'sourceUrl', type: 'text' },
  { name: 'year', type: 'number' },
])

export const Posts = base('posts', 'title', [
  { name: 'title', type: 'text', required: true },
  slugField('title'),
  { name: 'author', type: 'text', defaultValue: 'Mentor Jenny Nguyễn' },
  { name: 'content', type: 'richText' },
  { name: 'updatedOn', type: 'date', admin: { position: 'sidebar' } },
  seoField,
])

export const Faqs = base('faqs', 'question', [
  { name: 'question', type: 'text', required: true },
  { name: 'answer', type: 'textarea', required: true },
  { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
])
