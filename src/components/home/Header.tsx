'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { CTA, NAV } from '@/content/home'

/** Khối 0: thanh menu sticky mờ nền + nút đăng ký nổi luôn hiện ở góc phải. */
export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-base/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <a href="#top" aria-label="Mentor Jenny Nguyễn, về đầu trang" className="flex items-center">
            <Image src="/brand/logo-red.png" alt="Mentor Jenny Nguyễn" width={160} height={63} className="h-9 w-auto" priority />
          </a>

          <nav aria-label="Điều hướng chính" className="hidden items-center gap-6 lg:flex">
            {NAV.slice(1, -1).map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-fg transition-colors hover:text-gold-500">
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
          <nav id="menu-di-dong" aria-label="Menu di động" className="border-t border-line bg-base px-6 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium text-fg hover:bg-elevated">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Nút nổi: luôn hiện (trên mobile là nút chính, vì thanh menu đã gọn) */}
      <div className="fixed right-4 bottom-4 z-50 md:hidden">
        <Button href={CTA.register.href} className="shadow-lg shadow-black/20">
          {CTA.register.label}
        </Button>
      </div>
    </>
  )
}
