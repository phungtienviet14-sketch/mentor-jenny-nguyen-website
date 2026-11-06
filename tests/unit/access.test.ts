import { describe, expect, it } from 'vitest'

import { canEditContent, canManageLeads, hasRole, isAdmin, publishedOrStaff } from '@/access'

type Args = Parameters<typeof isAdmin>[0]
const as = (role?: string): Args => ({ req: { user: role ? { role } : null } }) as unknown as Args

describe('phân quyền theo vai trò', () => {
  it('hasRole xử lý người dùng rỗng', () => {
    expect(hasRole(null, 'admin')).toBe(false)
    expect(hasRole({ role: 'admin' }, 'admin')).toBe(true)
    expect(hasRole({ role: 'sales' }, 'admin', 'marketing')).toBe(false)
  })

  it('chỉ admin là admin', () => {
    expect(isAdmin(as('admin'))).toBe(true)
    expect(isAdmin(as('marketing'))).toBe(false)
    expect(isAdmin(as())).toBe(false)
  })

  it('marketing sửa nội dung nhưng không xem lead', () => {
    expect(canEditContent(as('marketing'))).toBe(true)
    expect(canManageLeads(as('marketing'))).toBe(false)
  })

  it('sales xem lead nhưng không sửa nội dung', () => {
    expect(canManageLeads(as('sales'))).toBe(true)
    expect(canEditContent(as('sales'))).toBe(false)
  })

  it('khách chỉ thấy bản đã xuất bản, nhân sự thấy tất cả', () => {
    expect(publishedOrStaff(as())).toEqual({ _status: { equals: 'published' } })
    expect(publishedOrStaff(as('marketing'))).toBe(true)
  })
})
