'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * Màn mở đầu (M2): logo hiện nhẹ rồi mờ đi, tổng cộng dưới 1 giây. Hoàn toàn bằng CSS animation nên
 * vẫn tự biến mất khi JS lỗi, không bao giờ chặn nội dung (không có overlay nào chặn LCP quá 1s).
 * Bỏ qua khi giảm chuyển động hoặc khi đã xem trong phiên này.
 */
export function PageIntro() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('intro-seen') === '1'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    sessionStorage.setItem('intro-seen', '1')
    const t = window.setTimeout(() => setGone(true), seen || reduced ? 0 : 1100)
    return () => window.clearTimeout(t)
  }, [])

  if (gone) return null
  return (
    <div className="page-intro" aria-hidden="true">
      <Image src="/brand/logo-red.png" alt="" width={160} height={63} priority className="page-intro__logo h-14 w-auto" />
    </div>
  )
}
