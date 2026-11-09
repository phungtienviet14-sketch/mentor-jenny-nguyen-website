'use client'

import { useEffect, useSyncExternalStore } from 'react'

import { track } from '@/lib/analytics'

type Choice = 'granted' | 'denied' | 'unset'

const KEY = 'cookie-consent'
const CHANGE = 'cookie-consent-change'

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(CHANGE, cb)
    window.removeEventListener('storage', cb)
  }
}

function getChoice(): Choice {
  const v = localStorage.getItem(KEY)
  return v === 'granted' || v === 'denied' ? v : 'unset'
}
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

function loadGtm() {
  if (!GTM_ID || document.getElementById('gtm-script')) return
  const w = window as Window & { dataLayer?: unknown[] }
  ;(w.dataLayer ??= []).push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.id = 'gtm-script'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
  document.head.appendChild(s)
}

/**
 * Banner cookie: mặc định KHÔNG tải GTM/GA. Chỉ tải sau khi người dùng bấm "Chấp nhận";
 * lựa chọn được nhớ trong localStorage. Chỉ hiện khi đã cấu hình GTM.
 */
export function ConsentManager() {
  // Server luôn coi như "đã chọn" để không render banner khi SSR, tránh lệch hydration.
  const choice = useSyncExternalStore(subscribe, getChoice, () => 'granted' as Choice)

  useEffect(() => {
    if (choice === 'granted') loadGtm()
  }, [choice])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href$="#dang-ky"]')
      if (a) track('cta_click', { label: a.textContent?.trim().slice(0, 60) })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const bannerOpen = Boolean(GTM_ID) && choice === 'unset'

  // Báo cho nút liên hệ nổi nhích lên, không bị banner che.
  useEffect(() => {
    document.body.toggleAttribute('data-consent-open', bannerOpen)
    return () => document.body.removeAttribute('data-consent-open')
  }, [bannerOpen])

  if (!bannerOpen) return null

  const decide = (value: 'granted' | 'denied') => {
    localStorage.setItem(KEY, value)
    window.dispatchEvent(new Event(CHANGE))
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-line-gold bg-surface p-4 text-sm text-fg shadow-xl sm:flex-row sm:items-center"
    >
      <p className="flex-1">
        Chúng tôi dùng cookie phân tích để cải thiện website. Xem{' '}
        <a href="/chinh-sach-bao-mat" className="underline">
          Chính sách bảo mật
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => decide('denied')}
          className="rounded-full border border-gold-500 px-5 py-2 font-semibold text-gold-500"
        >
          Từ chối
        </button>
        <button
          type="button"
          onClick={() => decide('granted')}
          className="rounded-full bg-action px-5 py-2 font-semibold text-on-gold hover:bg-action-hover"
        >
          Chấp nhận
        </button>
      </div>
    </div>
  )
}
