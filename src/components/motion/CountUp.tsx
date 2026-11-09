'use client'

import { useEffect, useRef } from 'react'

import { MOTION } from '@/lib/motion-tokens'

type Props = {
  value: number
  suffix?: string
  /** Độ rộng tối thiểu, đệm số 0 phía trước (02). */
  pad?: number
  className?: string
}

function format(n: number, pad?: number): string {
  const s = Math.round(n).toLocaleString('vi-VN')
  return pad ? s.padStart(pad, '0') : s
}

/**
 * Đếm số khi cuộn tới (M6). HTML từ server đã chứa số cuối cùng nên đúng cả khi chưa chạy JS;
 * `aria-label` luôn là giá trị cuối để trình đọc màn hình không đọc số trung gian.
 * Giảm chuyển động hoặc thiếu IntersectionObserver: giữ nguyên số cuối.
 */
export function CountUp({ value, suffix = '', pad, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const final = `${format(value, pad)}${suffix}`
    el.textContent = `${format(0, pad)}${suffix}`
    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / MOTION.countDurationMs)
          const eased = 1 - Math.pow(1 - t, 3)
          el.textContent = t >= 1 ? final : `${format(value * eased, pad)}${suffix}`
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = final
    }
  }, [value, suffix, pad])

  return (
    <span ref={ref} className={className} aria-label={`${format(value, pad)}${suffix}`}>
      {format(value, pad)}
      {suffix}
    </span>
  )
}
