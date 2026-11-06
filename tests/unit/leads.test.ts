import { beforeEach, describe, expect, it } from 'vitest'

import { fieldErrors, leadSchema, normalizeVnPhone } from '@/lib/leads'
import { rateLimit, resetRateLimit } from '@/lib/rate-limit'

const valid = { fullName: 'Nguyễn Văn A', phone: '0912 345 678', consent: true as const }

describe('normalizeVnPhone', () => {
  it.each([
    ['0912345678', '0912345678'],
    ['0912 345 678', '0912345678'],
    ['+84912345678', '0912345678'],
    ['84.912.345.678', '0912345678'],
  ])('%s -> %s', (raw, out) => expect(normalizeVnPhone(raw)).toBe(out))

  it.each(['', '12345', '0212345678', '091234567', '09123456789', 'abc'])('từ chối %s', (raw) =>
    expect(normalizeVnPhone(raw)).toBeNull(),
  )
})

describe('leadSchema', () => {
  it('chấp nhận dữ liệu tối thiểu và chuẩn hóa SĐT', () => {
    const r = leadSchema.safeParse(valid)
    expect(r.success && r.data.phone).toBe('0912345678')
  })

  it('bỏ trống email/công ty vẫn hợp lệ', () => {
    expect(leadSchema.safeParse({ ...valid, email: '', company: '  ' }).success).toBe(true)
  })

  it('báo lỗi theo từng trường', () => {
    const r = leadSchema.safeParse({ fullName: 'A', phone: '123', email: 'x', consent: false })
    expect(r.success).toBe(false)
    if (!r.success) {
      const e = fieldErrors(r.error)
      expect(Object.keys(e).sort()).toEqual(['consent', 'email', 'fullName', 'phone'])
    }
  })

  it('từ chối khi bẫy bot bị điền', () => {
    expect(leadSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false)
  })
})

describe('rateLimit', () => {
  beforeEach(resetRateLimit)

  it('chặn sau số lần cho phép và mở lại khi hết cửa sổ', () => {
    for (let i = 0; i < 3; i++) expect(rateLimit('ip', 3, 1000, 0)).toBe(true)
    expect(rateLimit('ip', 3, 1000, 10)).toBe(false)
    expect(rateLimit('ip', 3, 1000, 2000)).toBe(true)
  })

  it('đếm riêng theo khóa', () => {
    expect(rateLimit('a', 1, 1000, 0)).toBe(true)
    expect(rateLimit('b', 1, 1000, 0)).toBe(true)
  })
})
