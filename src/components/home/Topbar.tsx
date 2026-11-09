import { FacebookIcon, MailIcon, PhoneIcon, TiktokIcon, YoutubeIcon } from '@/components/ui/Icons'
import { CONTACT } from '@/content/home'

/** Thanh trên cùng (navy): liên hệ nhanh + mạng xã hội. Ẩn trên mobile để nhường chỗ cho menu. */
export function Topbar() {
  return (
    <div className="hidden bg-[var(--band-bg)] text-xs text-white md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {CONTACT.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="inline-flex items-center gap-1.5 hover:text-gold-strong">
              <PhoneIcon width={14} height={14} />
              {p.label} {p.phone}
            </a>
          ))}
          {CONTACT.email && (
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 hover:text-gold-strong">
              <MailIcon width={14} height={14} />
              {CONTACT.email}
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="hover:text-gold-strong">
            <FacebookIcon width={16} height={16} />
          </a>
          <a href="#" aria-label="TikTok" className="hover:text-gold-strong">
            <TiktokIcon width={16} height={16} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-gold-strong">
            <YoutubeIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
