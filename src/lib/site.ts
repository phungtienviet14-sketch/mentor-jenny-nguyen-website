/** Thông tin site dùng chung cho metadata, sitemap, JSON-LD. Nội dung chi tiết lấy từ Payload (SiteSettings). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mentorjennynguyen.com').replace(/\/$/, '')

export const SITE = {
  name: 'Mentor Jenny Nguyễn',
  org: 'NetViet TV',
  url: SITE_URL,
  locale: 'vi_VN',
  description:
    'Mentor Jenny Nguyễn (NetViet TV): đồng hành cùng chủ doanh nghiệp ứng dụng AI để tăng trưởng doanh thu và tối ưu vận hành.',
  phone: '+84812986898',
  address: {
    streetAddress: 'Tầng 2, Chelsea Park, 116 Trung Kính, Yên Hòa',
    addressLocality: 'Hà Nội',
    addressCountry: 'VN',
  },
} as const

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
