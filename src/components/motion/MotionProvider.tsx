'use client'

import { useEffect, type ReactNode } from 'react'

import { isLowPower } from '@/lib/motion-tokens'

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
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return <>{children}</>
}
