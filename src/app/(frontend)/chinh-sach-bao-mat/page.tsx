import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/LegalPage'
import { renderLegal } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  alternates: { canonical: '/chinh-sach-bao-mat' },
  // Bản nháp chờ admin xác nhận: chưa cho công cụ tìm kiếm lập chỉ mục.
  robots: { index: false, follow: true },
}

export default async function PrivacyPage() {
  return <LegalPage html={await renderLegal('CHINH_SACH_BAO_MAT')} />
}
