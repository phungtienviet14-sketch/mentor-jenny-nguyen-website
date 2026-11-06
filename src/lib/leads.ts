import { z } from 'zod'

/** Chuẩn hóa số điện thoại Việt Nam về dạng 0xxxxxxxxx; trả null nếu không hợp lệ. */
export function normalizeVnPhone(raw: string): string | null {
  const compact = raw.replace(/[\s.\-()]/g, '')
  const m = /^(?:\+?84|0)([35789]\d{8})$/.exec(compact)
  return m ? `0${m[1]}` : null
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined)

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Vui lòng nhập họ tên')
    .max(100, 'Họ tên quá dài'),
  phone: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập số điện thoại')
    .transform((v, ctx) => {
      const n = normalizeVnPhone(v)
      if (!n) {
        ctx.addIssue({ code: 'custom', message: 'Số điện thoại chưa đúng (ví dụ 0912 345 678)' })
        return z.NEVER
      }
      return n
    }),
  email: z
    .string()
    .trim()
    .max(120, 'Email quá dài')
    .optional()
    .transform((v) => v || undefined)
    .pipe(z.email('Email chưa đúng định dạng').optional()),
  company: optionalText(150),
  interest: optionalText(120),
  consent: z.literal(true, { error: 'Bạn cần đồng ý để chúng tôi liên hệ' }),
  /** Bẫy bot: người thật không thấy ô này nên luôn rỗng. */
  website: z.string().max(0).optional(),
  turnstileToken: z.string().max(2048).optional(),
  utm: z.record(z.string().max(100), z.string().max(200)).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>

/** Gom lỗi theo tên trường để hiển thị cạnh ô nhập. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}
