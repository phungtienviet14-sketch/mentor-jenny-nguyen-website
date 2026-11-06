'use client'

import { useEffect, useRef } from 'react'

const FACES = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6']
/** Hệ số xoay Z theo scrollY của từng vật thể (đo từ site tham chiếu). */
const SPIN_Z = [0.018, -0.045, 0.065, 0.08]

/** Hố thiên thạch: [cx, cy, r] trong hệ 300x300. */
const CRATERS: [number, number, number][] = [
  [92, 88, 22],
  [170, 60, 14],
  [210, 132, 30],
  [120, 200, 24],
  [62, 150, 12],
  [150, 128, 9],
  [232, 86, 10],
  [180, 214, 16],
  [84, 238, 13],
  [250, 190, 12],
  [130, 45, 8],
  [40, 100, 9],
  [200, 250, 10],
  [150, 170, 6],
  [110, 130, 6],
  [258, 140, 7],
  [60, 200, 7],
  [225, 40, 6],
]

/**
 * Mặt trăng vẽ bằng SVG: nhiễu phân dạng chiếu sáng một phía (độ gồ ghề), biển tối loang,
 * hố có phía tối/phía sáng, tối dần về rìa. Tĩnh (chỉ dịch/xoay cả khối), nên chỉ raster một lần.
 */
function MoonSvg() {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="100%" focusable="false">
      <defs>
        <clipPath id="moon-clip">
          <circle cx="150" cy="150" r="150" />
        </clipPath>
        <filter id="moon-relief" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022"
            numOctaves="6"
            seed="11"
            result="n"
          />
          <feDiffuseLighting in="n" lightingColor="#ffffff" surfaceScale="5" diffuseConstant="1.1">
            <feDistantLight azimuth="225" elevation="46" />
          </feDiffuseLighting>
        </filter>
        <filter id="moon-maria" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0065" numOctaves="3" seed="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.22  0 0 0 0 0.22  0 0 0 0 0.25  -4.2 0 0 0 2.3"
          />
        </filter>
        <radialGradient id="moon-crater" cx="0.5" cy="0.5" r="0.5" fx="0.68" fy="0.68">
          <stop offset="0" stopColor="#000" stopOpacity="0.05" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.84" stopColor="#000" stopOpacity="0.38" />
          <stop offset="0.9" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moon-shade" cx="0.34" cy="0.3" r="0.82">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.32" stopColor="#000" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0.92" />
        </radialGradient>
      </defs>
      <g clipPath="url(#moon-clip)">
        <rect width="300" height="300" fill="#d9d6cc" />
        <rect
          width="300"
          height="300"
          filter="url(#moon-relief)"
          style={{ mixBlendMode: 'multiply' }}
        />
        <rect width="300" height="300" filter="url(#moon-maria)" />
        {CRATERS.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#moon-crater)" />
        ))}
        <circle cx="150" cy="150" r="150" fill="url(#moon-shade)" />
      </g>
    </svg>
  )
}

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
      <div data-obj className="ambient__obj ambient__sphere ambient__obj--1">
        <MoonSvg />
      </div>
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
