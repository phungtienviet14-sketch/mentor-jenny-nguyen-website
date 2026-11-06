import { NextResponse } from 'next/server'

import { saveLead, sendLeadEmail, verifyTurnstile } from '@/lib/lead-delivery'
import { fieldErrors, leadSchema } from '@/lib/leads'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, message: 'Bạn gửi quá nhanh, vui lòng thử lại sau ít phút.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Dữ liệu không hợp lệ.' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    // Bẫy bot bị điền: trả thành công giả để bot không biết đã bị chặn.
    if (parsed.error.issues.some((i) => i.path[0] === 'website')) return NextResponse.json({ ok: true })
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 })
  }
  const lead = parsed.data

  if (!(await verifyTurnstile(lead.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, message: 'Không xác minh được bạn là người thật. Vui lòng thử lại.' }, { status: 400 })
  }

  const emailed = await sendLeadEmail(lead)
  const saved = await saveLead(lead, emailed)
  if (!emailed && !saved) {
    // Không có kênh nào nhận được: báo lỗi để người dùng thử lại hoặc gọi, thay vì mất lead âm thầm.
    return NextResponse.json({ ok: false, message: 'Hệ thống tạm thời chưa nhận được đăng ký. Vui lòng gọi hotline.' }, { status: 503 })
  }
  return NextResponse.json({ ok: true })
}
