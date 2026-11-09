import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CountUp } from '@/components/motion/CountUp'
import { Reveal } from '@/components/motion/Reveal'
import { Marquee } from '@/components/ui/Marquee'

type IOCallback = (entries: { isIntersecting: boolean; target: Element }[]) => void
// Reveal dùng một IntersectionObserver chung nên callback giữ lại giữa các test.
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
      unobserve() {}
      disconnect() {}
    },
  )
}

describe('Reveal', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('ẩn cho đến khi vào khung nhìn rồi thêm lớp is-visible', () => {
    mockEnvironment(false)
    render(<Reveal>Nội dung</Reveal>)
    const el = screen.getByText('Nội dung')
    expect(el).not.toHaveClass('is-visible')
    act(() => trigger?.([{ isIntersecting: true, target: el }]))
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

describe('CountUp', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('HTML ban đầu chứa số cuối đã định dạng, aria-label là giá trị cuối', () => {
    mockEnvironment(true)
    render(<CountUp value={15000} suffix="+" />)
    const el = screen.getByLabelText(/15/)
    expect(el.textContent).toBe(`${(15000).toLocaleString('vi-VN')}+`)
  })

  it('đệm số 0 phía trước khi có pad', () => {
    mockEnvironment(true)
    render(<CountUp value={2} pad={2} />)
    expect(screen.getByLabelText('02').textContent).toBe('02')
  })

  it('giữ nguyên số cuối khi giảm chuyển động', () => {
    mockEnvironment(true)
    render(<CountUp value={12} suffix="+" />)
    expect(screen.getByLabelText('12+').textContent).toBe('12+')
  })
})
