import type { GlobalConfig } from 'payload'

import { canEditContent } from '@/access'
import { seoField } from '@/fields/common'

const access = { read: () => true, update: canEditContent }

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Cài đặt chung',
  access,
  fields: [
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'assistantPhone', type: 'text', defaultValue: '0812.98.68.98' },
        { name: 'expertPhone', type: 'text', defaultValue: '0934.457.589' },
        { name: 'email', type: 'email' },
        { name: 'address', type: 'text', defaultValue: 'Tầng 2, Chelsea Park, 116 Trung Kính, Yên Hòa, Hà Nội' },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Chỉ số (khối 2)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'menu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'footerNote', type: 'textarea' },
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Trang chủ',
  access,
  versions: { drafts: true },
  fields: [
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroTitleAlt', type: 'text', label: 'Tiêu đề Hero B (A/B)' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'primaryCtaLabel', type: 'text' },
    { name: 'secondaryCtaLabel', type: 'text' },
    {
      name: 'sections',
      type: 'array',
      label: 'Nội dung các khối',
      admin: { description: 'Thứ tự và nội dung từng khối; chi tiết bổ sung ở Phase 3.' },
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'visible', type: 'checkbox', defaultValue: true },
      ],
    },
    seoField,
  ],
}
