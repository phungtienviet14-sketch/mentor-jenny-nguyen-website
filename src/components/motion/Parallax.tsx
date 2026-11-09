'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Hệ số theo cuộn: dương = trôi xuống chậm hơn trang, âm = ngược lại. Mặc định nhẹ ±0.12. */
  speed?: number
  className?: string
}

/**
 * Parallax nhẹ (M5/M15): dịch dọc theo scrollY bằng transform, một rAF cho mỗi lần cuộn, chỉ chạy khi phần tử
 * đang trong màn hình. Tự tắt khi giảm chuyển động hoặc thiết bị yếu (`data-low-power` trên <html>).
 */
export function Parallax({ children, speed = 0.12, className = '' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let inView = false
    const apply = () => {
      raf = 0
      const off = document.documentElement.hasAttribute('data-low-power')
      el.style.transform = off ? '' : `translate3d(0, ${Math.round(window.scrollY * speed)}px, 0)`
    }
    const onScroll = () => {
      if (inView && !raf) raf = requestAnimationFrame(apply)
    }
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) onScroll()
    })
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
