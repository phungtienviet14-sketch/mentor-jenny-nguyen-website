'use client'

import { useEffect, useRef } from 'react'

const FACES = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6']
/** Hệ số xoay Z theo scrollY của từng vật thể (đo từ site tham chiếu). */
const SPIN_Z = [0.018, -0.045, 0.065, 0.08]

/**
 * Nền môi trường cố định: 3 quầng sáng, lưới phối cảnh và 4 vật thể 3D CSS.
 * Mọi thành phần trôi theo hàm sin của scrollY (làm mượt lerp 0.085) đúng như site tham chiếu;
 * ghi thẳng `style.transform` trong rAF, không qua React state. Tắt khi giảm chuyển động.
 */
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const orbs = Array.from(root.querySelectorAll<HTMLElement>('[data-orb]'))
    const objects = Array.from(root.querySelectorAll<HTMLElement>('[data-obj]'))
    const grid = root.querySelector<HTMLElement>('[data-grid]')

    let target = window.scrollY
    let current = target
    let raf = 0

    const draw = () => {
      current += (target - current) * 0.085
      const y = current
      objects.forEach((el, i) => {
        const x = Math.sin(y / 650 + i) * 100
        const lift = Math.sin(y / 1100 + i) * 90
        const rx = i === 0 ? 0 : 48 + Math.sin(y / 900) * 18
        const ry = i === 0 ? 0 : 25 + y * 0.035
        el.style.transform = `translate3d(${x}px,${lift}px,${i === 0 ? 70 : 0}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${y * SPIN_Z[i]}deg)`
      })
      orbs.forEach((el, i) => {
        el.style.transform = `translate3d(${Math.sin(y / 900 + i) * 95}px,${Math.sin(y / 1100 + i) * 140}px,0)`
      })
      if (grid) {
        grid.style.transform = `translate3d(0,${Math.sin(y / 1600) * 32}px,-120px) rotateX(65deg) rotateZ(${Math.sin(y / 1600) * 4}deg)`
      }
      raf = Math.abs(target - current) > 0.1 ? requestAnimationFrame(draw) : 0
    }
    const onScroll = () => {
      target = window.scrollY
      if (!raf) raf = requestAnimationFrame(draw)
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
      <span data-orb className="ambient__orb ambient__orb--a" />
      <span data-orb className="ambient__orb ambient__orb--b" />
      <span data-orb className="ambient__orb ambient__orb--c" />
      <span data-grid className="ambient__grid" />
      <div data-obj className="ambient__obj ambient__sphere ambient__obj--1" />
      <div data-obj className="ambient__obj ambient__ring ambient__obj--2" />
      <div data-obj className="ambient__obj ambient__cube ambient__obj--3">
        {FACES.map((f) => (
          <i key={f} className={`face ${f}`} />
        ))}
      </div>
      <div data-obj className="ambient__obj ambient__cube ambient__cube--sm ambient__obj--4">
        {FACES.map((f) => (
          <i key={f} className={`face ${f}`} />
        ))}
      </div>
    </div>
  )
}
