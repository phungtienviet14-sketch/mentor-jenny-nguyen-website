import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Reveal } from '@/components/motion/Reveal'
import { Marquee } from '@/components/ui/Marquee'

type IOCallback = (entries: { isIntersecting: boolean }[]) => void
let trigger: IOCallback | undefined

function mockEnvironment(reducedMotion: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reducedMotion && query.includes('reduce'),
    addEventListener() {},
    removeEventListener() {},
  }))
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IOCallback) {
        trigger = cb
      }
      observe() {}
      disconnect() {}
    },
  )
}

describe('Reveal', () => {
  beforeEach(() => {
    trigger = undefined
  })
  afterEach(() => vi.unstubAllGlobals())

  it('ẩn cho đến khi vào khung nhìn rồi thêm lớp is-visible', () => {
    mockEnvironment(false)
    render(<Reveal>Nội dung</Reveal>)
    const el = screen.getByText('Nội dung')
    expect(el).not.toHaveClass('is-visible')
    act(() => trigger?.([{ isIntersecting: true }]))
    expect(el).toHaveClass('is-visible')
  })

  it('hiển thị ngay khi người dùng bật giảm chuyển động', () => {
    mockEnvironment(true)
    render(<Reveal>Nội dung</Reveal>)
    expect(screen.getByText('Nội dung')).toHaveClass('is-visible')
  })

  it('độ trễ so le 90ms theo chỉ số', () => {
    mockEnvironment(false)
    render(<Reveal index={3}>Thẻ</Reveal>)
    expect(screen.getByText('Thẻ').style.getPropertyValue('--reveal-delay')).toBe('270ms')
  })
})

describe('Marquee', () => {
  it('nhân đôi nội dung và ẩn bản sao khỏi trình đọc màn hình', () => {
    render(
      <Marquee label="Đối tác" duration={20}>
        <span>Logo</span>
      </Marquee>,
    )
    expect(screen.getAllByText('Logo')).toHaveLength(2)
    expect(screen.getByRole('group', { name: 'Đối tác' }).style.getPropertyValue('--marquee-duration')).toBe('20s')
    expect(document.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1)
  })
})
