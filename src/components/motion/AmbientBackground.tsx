'use client'

import { useEffect, useRef } from 'react'

const FACES = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6']

/**
 * Nền môi trường cố định: 3 quầng sáng, lưới phối cảnh và 4 vật thể 3D CSS xoay theo scrollY
 * (lerp 0.085 như site tham chiếu). Không bắt sự kiện chuột; tắt chuyển động khi giảm chuyển động.
 */
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let target = window.scrollY
    let current = target
    let raf = 0

    const tick = () => {
      current += (target - current) * 0.085
      el.style.setProperty('--sy', current.toFixed(1))
      raf = Math.abs(target - current) > 0.1 ? requestAnimationFrame(tick) : 0
    }
    const onScroll = () => {
      target = window.scrollY
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={rootRef} className="ambient" aria-hidden="true">
      <span className="ambient__orb ambient__orb--a" />
      <span className="ambient__orb ambient__orb--b" />
      <span className="ambient__orb ambient__orb--c" />
      <span className="ambient__grid" />
      <div className="ambient__scene">
        <div className="ambient__obj ambient__cube ambient__obj--1">
          {FACES.map((f) => (
            <i key={f} className={`face ${f}`} />
          ))}
        </div>
        <div className="ambient__obj ambient__cube ambient__cube--sm ambient__obj--2">
          {FACES.map((f) => (
            <i key={f} className={`face ${f}`} />
          ))}
        </div>
        <div className="ambient__obj ambient__ring ambient__obj--3" />
        <div className="ambient__obj ambient__sphere ambient__obj--4" />
      </div>
    </div>
  )
}
