import type { CSSProperties, ReactNode } from 'react'

type MarqueeProps = {
  children: ReactNode
  /** Thời gian một vòng (giây). Mặc định 32s như site tham chiếu. */
  duration?: number
  className?: string
  label?: string
}

/** Dải chạy ngang bằng CSS thuần (không JS). Bản sao thứ hai ẩn với trình đọc màn hình. */
export function Marquee({ children, duration = 32, className = '', label }: MarqueeProps) {
  const style = { '--marquee-duration': `${duration}s` } as CSSProperties
  return (
    <div className={`marquee ${className}`.trim()} style={style} role="group" aria-label={label}>
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
