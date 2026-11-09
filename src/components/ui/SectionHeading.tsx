import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion/Reveal'

/** Lớp dùng chung cho vùng nội dung của mỗi khối. */
export const SECTION_CLASS = 'mx-auto w-full max-w-6xl px-6 py-20 md:py-28'
/** Thẻ kiểu NTK: viền xanh nhạt, nổi lên và viền vàng khi hover. */
export const CARD_CLASS =
  'card-lift rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_40px_-30px_rgb(16_41_120/0.35)] md:p-8'

type Props = {
  eyebrow?: string
  title: ReactNode
  /** Phần tiêu đề tô vàng, xuống dòng. */
  accent?: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  /** Dùng trên nền navy/xanh: chữ trắng, nhấn vàng sáng. */
  onDark?: boolean
  /** Gọn hơn (dùng trong khối ghim cuộn ngang để vừa một màn hình). */
  compact?: boolean
}

/** Tiêu đề khối: eyebrow chữ viết tay (Dancing Script) + tiêu đề Anton viết hoa + nhấn vàng + dòng phụ. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  onDark = false,
  compact = false,
}: Props) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-3'} ${alignment}`}>
      {eyebrow && (
        <Reveal>
          <p
            className={`font-script text-2xl md:text-3xl ${onDark ? 'text-gold-strong' : 'text-gold-text'}`}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal index={1}>
        <Tag
          className={`font-display leading-[1.05] font-normal tracking-tight uppercase ${
            onDark ? 'text-white' : 'text-fg'
          } ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl'}`}
        >
          {title}
          {accent && (
            <span
              className={`heading-accent block ${onDark ? 'text-gold-strong' : 'text-gold-text'}`}
            >
              {accent}
            </span>
          )}
        </Tag>
      </Reveal>
      {subtitle && (
        <Reveal index={2}>
          <p
            className={`max-w-3xl ${onDark ? 'text-white/85' : 'text-muted'} ${
              compact ? 'text-sm' : 'text-lg'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
