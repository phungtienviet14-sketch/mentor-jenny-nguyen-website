'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

import { MOTION } from '@/lib/motion-tokens'

type RevealProps = {
  children: ReactNode
  /** Chỉ số trong nhóm; độ trễ = index × 90ms (so le như site tham chiếu). */
  index?: number
  as?: ElementType
  className?: string
}

export const REVEAL_STAGGER_MS = MOTION.staggerMs

/** Một IntersectionObserver dùng chung cho mọi Reveal trên trang (thay vì mỗi phần tử một cái). */
let sharedObserver: IntersectionObserver | null = null
const pending = new WeakMap<Element, () => void>()

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          pending.get(entry.target)?.()
          pending.delete(entry.target)
          sharedObserver?.unobserve(entry.target)
        }
      },
      { threshold: MOTION.revealThreshold },
    )
  }
  return sharedObserver
}

/**
 * Hiện dần khi cuộn tới (M1). Ẩn chỉ khi trang có JS (class `js` trên <html>); giảm chuyển động,
 * không có JS hoặc JS lỗi quá 4 giây: CSS luôn hiển thị nội dung.
 */
export function Reveal({ children, index = 0, as: Tag = 'div', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => el.classList.add('is-visible')
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      show()
      return
    }
    const observer = getObserver()
    pending.set(el, show)
    observer.observe(el)
    return () => {
      pending.delete(el)
      observer.unobserve(el)
    }
  }, [])

  const style = { '--reveal-delay': `${index * REVEAL_STAGGER_MS}ms` } as CSSProperties

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
