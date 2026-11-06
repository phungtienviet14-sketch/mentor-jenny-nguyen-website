import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/LegalPage'
import { renderLegal } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng',
  alternates: { canonical: '/dieu-khoan-su-dung' },
  // Bản nháp chờ admin xác nhận: chưa cho công cụ tìm kiếm lập chỉ mục.
  robots: { index: false, follow: true },
}

export default async function TermsPage() {
  return <LegalPage html={await renderLegal('DIEU_KHOAN_SU_DUNG')} />
}
