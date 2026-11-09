'use client'

import type { ReactNode } from 'react'

import { MailIcon, MessengerIcon, PhoneIcon } from '@/components/ui/Icons'
import { CONTACT } from '@/content/home'
import { track } from '@/lib/analytics'

type Channel = 'zalo' | 'messenger' | 'phone' | 'email'
type Item = { channel: Channel; label: string; href: string; className: string; external: boolean; icon: ReactNode }

/**
 * Nút liên hệ nổi (M14): cố định góc phải dưới, nhãn "Chat với Jenny" mở khi hover/focus.
 * Kênh chưa có đường dẫn trong CONTACT sẽ tự ẩn. Nhích lên khi banner cookie đang hiện (body[data-consent-open]).
 */
export function ContactFab() {
  const items: Item[] = []

  if (CONTACT.zalo)
    items.push({ channel: 'zalo', label: 'Chat Zalo', href: CONTACT.zalo, className: 'fab__z', external: true, icon: <span className="text-sm font-extrabold tracking-tight">Zalo</span> })
  if (CONTACT.messenger)
    items.push({ channel: 'messenger', label: 'Chat Messenger', href: CONTACT.messenger, className: 'fab__m', external: true, icon: <MessengerIcon width={26} height={26} /> })
  items.push({ channel: 'phone', label: `Gọi ${CONTACT.phones[0].phone}`, href: `tel:${CONTACT.phones[0].tel}`, className: 'fab__p', external: false, icon: <PhoneIcon width={24} height={24} /> })
  if (CONTACT.email)
    items.push({ channel: 'email', label: 'Gửi email', href: `mailto:${CONTACT.email}`, className: 'fab__e', external: false, icon: <MailIcon width={24} height={24} /> })

  return (
    <aside className="fab" aria-label="Liên hệ nhanh">
      <span className="fab__tip" aria-hidden="true">
        Chat với Jenny
      </span>
      {items.map((it) => (
        <a
          key={it.channel}
          href={it.href}
          aria-label={it.label}
          className={`fab__b ${it.className}`}
          {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={() => track('contact_click', { channel: it.channel })}
        >
          {it.icon}
        </a>
      ))}
    </aside>
  )
}
