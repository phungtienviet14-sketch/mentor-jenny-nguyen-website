import { describe, expect, it } from 'vitest'

import { slugify } from '@/fields/common'

describe('slugify', () => {
  it('bỏ dấu tiếng Việt và xử lý đ', () => {
    expect(slugify('Khóa học Đào tạo AI cho Doanh nghiệp')).toBe('khoa-hoc-dao-tao-ai-cho-doanh-nghiep')
  })

  it('gộp ký tự đặc biệt và cắt gạch ngang thừa', () => {
    expect(slugify('  --Xin chào!!  Thế giới--  ')).toBe('xin-chao-the-gioi')
  })

  it('chuỗi rỗng cho kết quả rỗng', () => {
    expect(slugify('')).toBe('')
  })
})
