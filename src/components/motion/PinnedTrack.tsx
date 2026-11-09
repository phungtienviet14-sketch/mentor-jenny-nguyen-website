'use client'

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import { MOTION } from '@/lib/motion-tokens'

/** Desktop/tablet: ghim từ 761px (giống site tham chiếu). Luôn tắt khi người dùng bật giảm chuyển động. */
const QUERY_DESKTOP = `(min-width: ${MOTION.pinMinWidth}px) and (prefers-reduced-motion: no-preference)`
/** Cho phép ghim cả trên mobile (khối có thẻ đủ thấp để vừa một màn hình). */
const QUERY_ALL = '(prefers-reduced-motion: no-preference)'

function makeStore(query: string) {
  return {
    subscribe(cb: () => void) {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    getSnapshot: () => window.matchMedia(query).matches,
  }
}
const desktopStore = makeStore(QUERY_DESKTOP)
const allStore = makeStore(QUERY_ALL)
const getServerSnapshot = () => false

type Props = {
  header?: ReactNode
  items: ReactNode[]
  /** Lớp cho mỗi thẻ (chiều rộng). */
  itemClassName?: string
  label: string
  /** Ghim cả trên mobile. Mặc định chỉ ghim từ 761px. */
  pinOnMobile?: boolean
}

/**
 * Cuộn dọc biến thành chuyển động ngang: khối cao, phần trong `sticky`, track dịch theo tiến độ cuộn
 * (làm mượt bằng spring). Dưới 761px hoặc giảm chuyển động: cuộn ngang tự nhiên có scroll-snap.
 */
export function PinnedTrack({
  header,
  items,
  itemClassName = 'w-[78vw] max-w-[440px]',
  label,
  pinOnMobile = false,
}: Props) {
  const store = pinOnMobile ? allStore : desktopStore
  const pinned = useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot)
  const outerRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLUListElement | null>(null)
  const [overflow, setOverflow] = useState(0)
  const [viewportH, setViewportH] = useState(800)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setOverflow(Math.max(0, track.scrollWidth - window.innerWidth))
    setViewportH(window.innerHeight)
  }, [])

  useEffect(() => {
    if (!pinned) return
    measure()
    const track = trackRef.current
    const ro = new ResizeObserver(measure)
    if (track) ro.observe(track)
    window.addEventListener('resize', measure)
    // Font tải xong làm đổi bề rộng thẻ: đo lại để không cắt thẻ cuối.
    void document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned, measure])

  // Bàn phím: Tab vào thẻ nằm ngoài tầm nhìn thì cuộn trang tới đúng vị trí của thẻ đó.
  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLUListElement>) => {
      const outer = outerRef.current
      if (!outer || items.length < 2) return
      const li = (e.target as HTMLElement).closest('li')
      const index = li ? Array.from(li.parentElement?.children ?? []).indexOf(li) : -1
      if (index < 0) return
      const top = outer.getBoundingClientRect().top + window.scrollY
      const range = outer.offsetHeight - window.innerHeight
      window.scrollTo({ top: top + (index / (items.length - 1)) * range, behavior: 'auto' })
    },
    [items.length],
  )

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.6,
    restDelta: 0.0005,
  })
  const x = useTransform(smooth, (p) => -p * overflow)
  // Thanh tiến độ bắt đầu ở 20% như site tham chiếu: .2 + .8p
  const bar = useTransform(smooth, (p) => 0.2 + p * 0.8)

  // Thẻ đang tới (để làm nổi bật); chỉ cập nhật state khi đổi thẻ
  const [active, setActive] = useState(0)
  useMotionValueEvent(smooth, 'change', (p) => {
    const next = Math.round(Math.min(1, Math.max(0, p)) * (items.length - 1))
    setActive((prev) => (prev === next ? prev : next))
  })

  // Một phần tử gốc ổn định cho cả hai chế độ để useScroll luôn bám đúng `target`.
  return (
    <section
      ref={outerRef}
      aria-label={label}
      className={pinned ? 'relative' : 'py-16'}
      style={pinned ? { height: overflow + viewportH } : undefined}
    >
      {pinned ? (
        <div className="sticky top-0 flex h-dvh flex-col justify-center gap-4 overflow-hidden pt-[var(--header-h)] pb-3">
          {header && <div className="mx-auto w-full max-w-6xl px-6">{header}</div>}
          <motion.ul
            ref={trackRef}
            style={{ x }}
            onFocusCapture={onFocus}
            className="flex w-max gap-6 px-6 will-change-transform"
          >
            {items.map((item, i) => (
              <li key={i} data-active={i === active} className={`group shrink-0 ${itemClassName}`}>
                {item}
              </li>
            ))}
          </motion.ul>
          <div
            className="mx-auto h-1 w-full max-w-6xl overflow-hidden rounded-full bg-line px-6"
            aria-hidden="true"
          >
            <motion.div
              className="h-full origin-left rounded-full bg-action"
              style={{ scaleX: bar }}
            />
          </div>
        </div>
      ) : (
        <>
          {header && <div className="mx-auto max-w-6xl px-6 pb-10">{header}</div>}
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:thin]">
            {items.map((item, i) => (
              <li key={i} className={`shrink-0 snap-start ${itemClassName}`}>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
