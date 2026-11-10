import { afterEach, describe, expect, it, vi } from 'vitest'

import { EVENTS_HREF, filterEventLinks } from '@/lib/event-links'
import { getShowEvents } from '@/lib/site-flags'

const links = [
  { label: 'Sách', href: '/#sach' },
  { label: 'Sự kiện', href: EVENTS_HREF },
  { label: 'Liên hệ', href: '/#dang-ky' },
]

describe('filterEventLinks', () => {
  it('bỏ link Sự kiện khi phần này tắt', () => {
    expect(filterEventLinks(links, false).map((l) => l.label)).toEqual(['Sách', 'Liên hệ'])
  })

  it('giữ nguyên khi phần này bật', () => {
    expect(filterEventLinks(links, true)).toHaveLength(3)
  })
})

describe('getShowEvents (không có CMS)', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('mặc định tắt khi không có DB và không có biến môi trường', async () => {
    vi.stubEnv('DATABASE_URI', '')
    vi.stubEnv('NEXT_PUBLIC_SHOW_EVENTS', '')
    expect(await getShowEvents()).toBe(false)
  })

  it('theo biến môi trường khi không có DB', async () => {
    vi.stubEnv('DATABASE_URI', '')
    vi.stubEnv('NEXT_PUBLIC_SHOW_EVENTS', '1')
    expect(await getShowEvents()).toBe(true)
  })
})
