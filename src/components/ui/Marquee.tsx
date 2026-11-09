'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'

type MarqueeProps = {
  children: ReactNode
  /** Thời gian một vòng (giây). Mặc định 32s như site tham chiếu. */
  duration?: number
  className?: string
  label?: string
}

/**
 * Dải chạy ngang bằng CSS thuần. Bản sao thứ hai ẩn với trình đọc màn hình.
 * Có nút "Tạm dừng" chỉ hiện khi focus bàn phím (WCAG 2.2.2); rê chuột hoặc focus vào trong cũng dừng.
 */
export function Marquee({ children, duration = 32, className = '', label }: MarqueeProps) {
  const [paused, setPaused] = useState(false)
  const style = { '--marquee-duration': `${duration}s` } as CSSProperties
  return (
    <div className={`marquee relative ${className}`.trim()} style={style} role="group" aria-label={label} data-paused={paused}>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="sr-only z-10 rounded-full bg-white px-4 py-1 text-xs font-bold text-fg shadow focus:not-sr-only focus:absolute focus:top-1 focus:left-1"
      >
        {paused ? 'Chạy tiếp dải chữ' : 'Tạm dừng dải chữ'}
      </button>
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
