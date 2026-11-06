import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion/Reveal'

/** Lớp dùng chung cho vùng nội dung của mỗi khối và thẻ. */
export const SECTION_CLASS = 'mx-auto w-full max-w-6xl px-6 py-20 md:py-28'
export const CARD_CLASS =
  'rounded-3xl border border-line-gold bg-surface/85 p-6 backdrop-blur-sm transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-xl hover:shadow-black/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  /** Gọn hơn (dùng trong khối ghim cuộn ngang để vừa một màn hình). */
  compact?: boolean
}

/** Tiêu đề khối: eyebrow (cam) + tiêu đề Playfair + dòng phụ. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Tag = 'h2',
  compact = false,
}: Props) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-3'} ${alignment}`}>
      {eyebrow && (
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-accent-orange uppercase">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal index={1}>
        <Tag
          className={`font-display leading-tight font-bold text-fg ${compact ? 'text-3xl' : 'text-3xl md:text-5xl'}`}
        >
          {title}
        </Tag>
      </Reveal>
      {subtitle && (
        <Reveal index={2}>
          <p
            className={`max-w-3xl text-muted ${compact ? 'line-clamp-2 text-sm' : 'text-lg md:text-xl'}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
