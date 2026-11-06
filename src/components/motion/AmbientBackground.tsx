'use client'

import { useEffect, useRef } from 'react'

/** Hệ số xoay Z theo scrollY của từng vật thể (đo từ site tham chiếu). */
const SPIN_Z = [0.018, -0.045, 0.065, 0.08]

type GemFace = { w: number; h: number; m: string; t: number }

/**
 * Viên pha lê bát diện (8 mặt tam giác đều) dựng bằng CSS 3D: mỗi mặt là một phần tử có
 * matrix3d tính sẵn từ ba đỉnh, nên xoay theo cuộn không bao giờ bị "mỏng như tấm phẳng".
 * Tính tại thời điểm nạp module (xác định, không lệch hydration).
 */
function octahedron(a: number): GemFace[] {
  const faces: GemFace[] = []
  for (const sx of [1, -1]) {
    for (const sy of [1, -1]) {
      for (const sz of [1, -1]) {
        const A = [sx * a, 0, 0]
        const B = [0, sy * a, 0]
        const C = [0, 0, sz * a]
        const w = Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2])
        const h = (w * Math.sqrt(3)) / 2
        const u = [(B[0] - A[0]) / w, (B[1] - A[1]) / w, (B[2] - A[2]) / w]
        const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2]
        const d = [(M[0] - C[0]) / h, (M[1] - C[1]) / h, (M[2] - C[2]) / h]
        const n = [u[1] * d[2] - u[2] * d[1], u[2] * d[0] - u[0] * d[2], u[0] * d[1] - u[1] * d[0]]
        const t = [C[0] - (w / 2) * u[0], C[1] - (w / 2) * u[1], C[2] - (w / 2) * u[2]]
        const m = [...u, 0, ...d, 0, ...n, 0, ...t, 1].map((v) => v.toFixed(4)).join(',')
        faces.push({
          w: Math.round(w * 10) / 10,
          h: Math.round(h * 10) / 10,
          m: `matrix3d(${m})`,
          t:
            Math.round(
              (0.5 - 0.5 * ((sx * -0.4 + sy * -0.7 + sz * 0.6) / (Math.sqrt(3) * 0.9644))) * 100,
            ) / 100,
        })
      }
    }
  }
  return faces
}
const GEM_BIG = octahedron(58)
const GEM_SMALL = octahedron(30)

function GemFaces({ faces }: { faces: GemFace[] }) {
  return (
    <>
      {faces.map((f, i) => (
        <i
          key={i}
          className="ambient__gem-face"
          style={{ width: f.w, height: f.h, transform: f.m, ['--t' as string]: f.t }}
        />
      ))}
    </>
  )
}

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
    <svg className="sky-moon" viewBox="0 0 300 300" width="100%" height="100%" focusable="false">
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
 * Mặt trời (chế độ sáng): thân cầu vàng cam, hạt plasma tối loang bằng nhiễu, tối dần về rìa.
 * Quầng sáng (corona) do CSS box-shadow của phần tử cha.
 */
function SunSvg() {
  return (
    <svg className="sky-sun" viewBox="0 0 300 300" width="100%" height="100%" focusable="false">
      <defs>
        <clipPath id="sun-clip">
          <circle cx="150" cy="150" r="150" />
        </clipPath>
        <radialGradient id="sun-body" cx="0.42" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#fffbe3" />
          <stop offset="0.3" stopColor="#ffe28a" />
          <stop offset="0.68" stopColor="#f7b02a" />
          <stop offset="1" stopColor="#e2691a" />
        </radialGradient>
        <radialGradient id="sun-limb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.72" stopColor="#a63a00" stopOpacity="0" />
          <stop offset="1" stopColor="#a63a00" stopOpacity="0.55" />
        </radialGradient>
        <filter id="sun-plasma" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.78  0 0 0 0 0.32  0 0 0 0 0.02  -3 0 0 0 1.75"
          />
        </filter>
      </defs>
      <g clipPath="url(#sun-clip)">
        <rect width="300" height="300" fill="url(#sun-body)" />
        <rect width="300" height="300" filter="url(#sun-plasma)" opacity="0.55" />
        <circle cx="150" cy="150" r="150" fill="url(#sun-limb)" />
      </g>
    </svg>
  )
}

/** Số ngẫu nhiên có hạt giống (kết quả giống nhau ở server và client, không lệch hydration). */
function seeded(seed: number) {
  let t = seed
  return () => {
    t = (t * 1664525 + 1013904223) % 4294967296
    return t / 4294967296
  }
}

/** Một lớp sao/bụi sáng: nhiều chấm bằng box-shadow (màu lấy từ `color` của lớp). */
function dots(count: number, seed: number) {
  const rnd = seeded(seed)
  return Array.from(
    { length: count },
    () => `${(rnd() * 100).toFixed(1)}vw ${(rnd() * 100).toFixed(1)}vh`,
  ).join(',')
}
const STAR_LAYERS = [dots(26, 11), dots(18, 23), dots(12, 37)]
const CLOUDS = ['ambient__cloud--a', 'ambient__cloud--b', 'ambient__cloud--c']

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
    const stars = Array.from(root.querySelectorAll<HTMLElement>('[data-star]'))

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
      stars.forEach((el, i) => {
        const depth = (i + 1) * 0.6
        el.style.transform = `translate3d(${Math.sin(y / 1800 + i) * 18 * depth}px,${Math.sin(y / 1500 + i) * 24 * depth}px,0)`
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
      {STAR_LAYERS.map((shadow, i) => (
        <span
          key={i}
          data-star
          className={`ambient__stars ambient__stars--${i + 1}`}
          style={{ boxShadow: shadow }}
        />
      ))}
      {CLOUDS.map((c) => (
        <span key={c} className={`ambient__cloud ${c}`} />
      ))}
      <span data-orb className="ambient__orb ambient__orb--a" />
      <span data-orb className="ambient__orb ambient__orb--b" />
      <span data-orb className="ambient__orb ambient__orb--c" />
      <span data-grid className="ambient__grid" />
      <div data-obj className="ambient__obj ambient__sphere ambient__obj--1">
        <SunSvg />
        <MoonSvg />
        <span className="ambient__orbit">
          <span className="ambient__orbit-spin">
            <i className="ambient__sat" />
          </span>
        </span>
      </div>
      <div data-obj className="ambient__obj ambient__gem ambient__obj--2">
        <GemFaces faces={GEM_BIG} />
      </div>
      <div data-obj className="ambient__obj ambient__gem ambient__obj--3">
        <GemFaces faces={GEM_SMALL} />
      </div>
    </div>
  )
}
