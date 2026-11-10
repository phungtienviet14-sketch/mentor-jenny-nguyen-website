import type { CSSProperties } from 'react'

import { SHOW_PLACEHOLDERS } from '@/content/flags'

type Props = {
  /** Mô tả nội dung marketing sẽ bổ sung, ví dụ "Ảnh cộng đồng". */
  hint: string
  className?: string
  style?: CSSProperties
}

/** Khung trống gạch đứt "Marketing bổ sung": giữ chỗ bố cục, không bịa nội dung. */
export function Placeholder({ hint, className = '', style }: Props) {
  if (!SHOW_PLACEHOLDERS) return null
  return (
    <div
      className={`placeholder grid place-content-center gap-1 rounded-2xl border-2 border-dashed border-gold-accent bg-gold-accent/10 p-4 text-center text-gold-text ${className}`.trim()}
      style={style}
    >
      <span className="text-sm font-bold">＋ Marketing bổ sung</span>
      <small className="text-xs">{hint}</small>
    </div>
  )
}
