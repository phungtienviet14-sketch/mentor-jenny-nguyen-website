'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'

import { track } from '@/lib/analytics'

type Status = 'idle' | 'sending' | 'success' | 'error'

const field = 'w-full rounded-xl border bg-base px-4 py-3 text-fg placeholder:text-muted focus-visible:outline-offset-2'
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
    }
  }
}

function utmFromUrl(): Record<string, string> {
  const p = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const k of ['source', 'medium', 'campaign', 'content', 'term']) {
    const v = p.get(`utm_${k}`)
    if (v) out[k] = v.slice(0, 200)
  }
  return out
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <span id={`${id}-error`} role="alert" className="text-xs font-normal text-action">
      {message}
    </span>
  )
}

export function LeadForm({
  interests,
  submitLabel,
  className,
}: {
  interests: readonly string[]
  submitLabel: string
  className: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<string>()
  const opened = useRef(false)
  const widget = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!SITE_KEY || !widget.current) return
    const mount = () => {
      if (!window.turnstile || !widget.current || widgetId.current) return
      widgetId.current = window.turnstile.render(widget.current, {
        sitekey: SITE_KEY,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(undefined),
      })
    }
    if (window.turnstile) {
      mount()
      return
    }
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = mount
    document.head.appendChild(s)
  }, [])

  const markOpened = () => {
    if (opened.current) return
    opened.current = true
    track('form_open', { form: 'consult' })
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const fd = new FormData(e.currentTarget)
    const text = (k: string) => String(fd.get(k) ?? '')
    setStatus('sending')
    setErrors({})
    setMessage('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: text('fullName'),
          phone: text('phone'),
          email: text('email'),
          company: text('company'),
          interest: text('interest'),
          consent: fd.get('consent') === 'on',
          website: text('website'),
          turnstileToken: token,
          utm: utmFromUrl(),
        }),
      })
      const data = (await res.json()) as { ok: boolean; errors?: Record<string, string>; message?: string }
      if (data.ok) {
        track('generate_lead', { form: 'consult' })
        setStatus('success')
        return
      }
      setErrors(data.errors ?? {})
      setMessage(data.message ?? '')
      track('form_error', { form: 'consult', status: res.status })
      setStatus('error')
      if (SITE_KEY && widgetId.current) window.turnstile?.reset(widgetId.current)
      setToken(undefined)
    } catch {
      setMessage('Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`${className} flex flex-col items-center gap-2 text-center`} role="status" data-testid="lead-success">
        <p className="font-display text-2xl font-normal text-fg uppercase">Cảm ơn bạn đã đăng ký</p>
        <p className="text-muted">Đội ngũ Jenny sẽ liên hệ với bạn sớm nhất có thể.</p>
      </div>
    )
  }

  const inputProps = (k: string) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
    className: `${field} ${errors[k] ? 'border-action' : 'border-line-gold'}`,
  })

  return (
    <form className={`${className} flex flex-col gap-4`} noValidate onSubmit={onSubmit} onFocus={markOpened}>
      <label className="flex flex-col gap-1 text-sm font-medium text-fg">
        Họ tên
        <input name="fullName" autoComplete="name" placeholder="Nguyễn Văn A" {...inputProps('fullName')} />
        <FieldError id="fullName" message={errors.fullName} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-fg">
        Số điện thoại / Zalo
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="09xx xxx xxx"
          {...inputProps('phone')}
        />
        <FieldError id="phone" message={errors.phone} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-fg">
        Email
        <input name="email" type="email" autoComplete="email" placeholder="ban@congty.vn" {...inputProps('email')} />
        <FieldError id="email" message={errors.email} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-fg">
        Công ty &amp; chức vụ
        <input name="company" autoComplete="organization" placeholder="Công ty, chức vụ" {...inputProps('company')} />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-fg">
        Quan tâm
        <select name="interest" defaultValue="" {...inputProps('interest')}>
          <option value="" disabled>
            Chọn nội dung quan tâm
          </option>
          {interests.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      {/* Bẫy bot: ẩn với người thật và trình đọc màn hình */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-xs text-muted">
        <span className="flex items-start gap-3">
          <input type="checkbox" name="consent" className="mt-0.5" aria-invalid={errors.consent ? true : undefined} />
          <span>
            Tôi đồng ý để đội ngũ Jenny liên hệ theo{' '}
            <a href="/chinh-sach-bao-mat" className="underline">
              Chính sách bảo mật
            </a>
            .
          </span>
        </span>
        <FieldError id="consent" message={errors.consent} />
      </label>
      {SITE_KEY ? <div ref={widget} /> : null}
      {message ? (
        <p role="alert" className="text-sm text-action">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === 'sending' || (!!SITE_KEY && !token)}
        className="inline-flex w-full items-center justify-center rounded-full bg-action px-7 py-3 text-sm font-bold tracking-wide text-on-gold shadow-md shadow-action/25 transition-colors hover:bg-action-hover active:bg-action-pressed focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Đang gửi…' : submitLabel}
      </button>
    </form>
  )
}
