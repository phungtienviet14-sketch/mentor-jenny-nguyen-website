import nodemailer from 'nodemailer'

import type { LeadInput } from '@/lib/leads'

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return process.env.NODE_ENV !== 'production' // dev: bỏ qua; production thiếu khóa thì chặn
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/** Gửi email thông báo lead qua Gmail SMTP (App Password). Trả false nếu chưa cấu hình hoặc lỗi. */
export async function sendLeadEmail(lead: LeadInput): Promise<boolean> {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  if (!user || !pass) return false
  const to = process.env.LEADS_NOTIFY_TO || user
  const rows: [string, string | undefined][] = [
    ['Họ tên', lead.fullName],
    ['Điện thoại', lead.phone],
    ['Email', lead.email],
    ['Công ty / chức vụ', lead.company],
    ['Quan tâm', lead.interest],
    ['UTM', lead.utm ? JSON.stringify(lead.utm) : undefined],
  ]
  try {
    const transport = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
    await transport.sendMail({
      from: `Website Jenny <${user}>`,
      to,
      replyTo: lead.email,
      subject: `Lead mới: ${lead.fullName} - ${lead.phone}`,
      text: rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<table>${rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`)
        .join('')}</table>`,
    })
    return true
  } catch (err) {
    console.error('Gửi email lead thất bại:', err instanceof Error ? err.message : 'unknown')
    return false
  }
}

/** Lưu lead vào Payload khi đã có cơ sở dữ liệu. Trả false nếu chưa cấu hình hoặc lỗi. */
export async function saveLead(lead: LeadInput, emailSent: boolean): Promise<boolean> {
  if (!process.env.DATABASE_URI) return false
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        company: lead.company,
        interest: lead.interest,
        source: 'consult',
        utm: lead.utm,
        consent: true,
        emailSent,
      },
    })
    return true
  } catch (err) {
    console.error('Lưu lead thất bại:', err instanceof Error ? err.message : 'unknown')
    return false
  }
}
