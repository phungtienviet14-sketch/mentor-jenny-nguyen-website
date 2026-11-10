'use client'

import { useEffect, type ReactNode } from 'react'

import { MOTION, isLowPower } from '@/lib/motion-tokens'

/**
 * Báo cho CSS biết JS đã chạy (`data-motion-ready`, gỡ chế độ tự hiện của Reveal) và đánh dấu
 * thiết bị yếu (`data-low-power`: màn nhỏ hoặc ≤ 4 nhân) để tắt parallax.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-motion-ready', '')
    if (isLowPower()) root.setAttribute('data-low-power', '')
    const onResize = () => {
      if (isLowPower()) root.setAttribute('data-low-power', '')
      else root.removeAttribute('data-low-power')
    }
    window.addEventListener('resize', onResize)

    // Nút "từ tính" (M9): chỉ khi có chuột thật và không giảm chuyển động; một listener chung, rAF.
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let active: HTMLElement | null = null
    const reset = (el: HTMLElement | null) => {
      el?.style.removeProperty('--mx')
      el?.style.removeProperty('--my')
    }
    const onMove = (e: PointerEvent) => {
      if (!canHover.matches || reduced.matches) return
      const el = (e.target as Element | null)?.closest<HTMLElement>('.btn-sheen') ?? null
      if (el !== active) {
        reset(active)
        active = el
      }
      if (!el) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height
        const max = MOTION.magneticPx
        el.style.setProperty('--mx', `${(dx * 2 * max).toFixed(1)}px`)
        el.style.setProperty('--my', `${(dy * 2 * max).toFixed(1)}px`)
      })
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      reset(active)
    }
  }, [])

  return <>{children}</>
}
