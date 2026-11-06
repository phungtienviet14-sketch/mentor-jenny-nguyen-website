'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Chỉ số trong nhóm; độ trễ = index × 90ms (so le như site tham chiếu). */
  index?: number
  as?: ElementType
  className?: string
}

export const REVEAL_STAGGER_MS = 90

/**
 * Hiện dần khi cuộn tới (IntersectionObserver, ngưỡng 0.12).
 * Giảm chuyển động / không có JS: CSS luôn hiển thị nội dung.
 */
export function Reveal({ children, index = 0, as: Tag = 'div', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style = { '--reveal-delay': `${index * REVEAL_STAGGER_MS}ms` } as CSSProperties

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
