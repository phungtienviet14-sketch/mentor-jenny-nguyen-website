import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PinnedTrack } from '@/components/motion/PinnedTrack'

function stubMedia(matches: (query: string) => boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: matches(query),
    addEventListener() {},
    removeEventListener() {},
  }))
}

describe('PinnedTrack', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    )
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    )
  })
  afterEach(() => vi.unstubAllGlobals())

  it('không ghim (cuộn ngang có snap) khi màn hình hẹp hoặc giảm chuyển động', () => {
    stubMedia(() => false)
    render(<PinnedTrack label="Khóa học" items={[<p key="a">A</p>, <p key="b">B</p>]} />)
    const region = screen.getByRole('region', { name: 'Khóa học' })
    expect(region.querySelector('.snap-x')).not.toBeNull()
    expect(region.querySelector('.sticky')).toBeNull()
  })

  it('ghim (sticky) trên màn hình rộng khi không giảm chuyển động', () => {
    stubMedia(() => true)
    render(<PinnedTrack label="Lộ trình" items={[<p key="a">A</p>]} />)
    const region = screen.getByRole('region', { name: 'Lộ trình' })
    expect(region.querySelector('.sticky')).not.toBeNull()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('luôn hiển thị đủ các thẻ trong cả hai chế độ', () => {
    stubMedia(() => false)
    render(<PinnedTrack label="x" items={[<p key="a">Thẻ 1</p>, <p key="b">Thẻ 2</p>, <p key="c">Thẻ 3</p>]} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
