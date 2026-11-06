import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'marketing' | 'sales'

type MaybeUser = { role?: string | null } | null | undefined

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean =>
  !!user && !!user.role && (roles as string[]).includes(user.role)

export const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')

/** Admin hoặc marketing: soạn và xuất bản nội dung. */
export const canEditContent: Access = ({ req }) => hasRole(req.user, 'admin', 'marketing')

/** Admin hoặc sales: xem và xử lý lead. */
export const canManageLeads: Access = ({ req }) => hasRole(req.user, 'admin', 'sales')

/** Khách chỉ thấy bản đã xuất bản; nhân sự đăng nhập thấy cả bản nháp (để xem trước). */
export const publishedOrStaff: Access = ({ req }) => {
  if (hasRole(req.user, 'admin', 'marketing', 'sales')) return true
  return { _status: { equals: 'published' } }
}

export const adminOnlyField: FieldAccess = ({ req }) => hasRole(req.user, 'admin')
