'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { CTA, NAV } from '@/content/home'
import { MOTION } from '@/lib/motion-tokens'
import { filterEventLinks } from '@/lib/event-links'

/**
 * Thanh menu sticky (M4): trong suốt trên cùng, đổ bóng sau 40px cuộn,
 * ẩn khi cuộn xuống sâu và hiện lại khi cuộn lên (không ẩn khi menu mobile đang mở).
 */
export function Header({ showEvents = false }: { showEvents?: boolean }) {
  const nav = filterEventLinks(NAV, showEvents)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > MOTION.headerScrollPx)
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 400)
        last = y
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const isHidden = hidden && !open

  return (
    <header
      data-scrolled={scrolled}
      className={`sticky top-0 z-40 border-b transition-[translate,background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none ${
        scrolled
          ? 'border-line bg-white/95 shadow-[0_10px_30px_-20px_rgb(16_41_120/0.4)] backdrop-blur-xl'
          : 'border-transparent bg-white'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Mentor Jenny Nguyễn, về đầu trang" className="flex items-center">
          <Image
            src="/brand/logo-red.png"
            alt="Mentor Jenny Nguyễn"
            width={160}
            height={63}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
          {nav.slice(0, -1).map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-sm font-semibold text-fg">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href={CTA.register.href}>{CTA.register.label}</Button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-gold text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="menu-di-dong"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-di-dong"
          aria-label="Menu di động"
          className="border-t border-line bg-white px-6 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-fg hover:bg-elevated"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
