import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { FAQ, FINAL_CTA, FOOTER, GIFTS, PRESS } from '@/content/home'

/** Khối 13: quà tặng miễn phí. */
export function Gifts() {
  return (
    <section id="qua-tang" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={GIFTS.eyebrow} title={GIFTS.title} subtitle={GIFTS.body} />
      <ul className="grid gap-5 md:grid-cols-2">
        {GIFTS.items.map((g, i) => (
          <Reveal as="li" key={g.no} index={i % 2} className={`${CARD_CLASS} flex gap-5`}>
            <span className="font-display text-4xl font-bold text-gold-500">{g.no}</span>
            <div>
              <h3 className="font-display text-xl font-bold text-fg">{g.name}</h3>
              <p className="mt-2 text-sm text-muted">{g.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <Button href={GIFTS.cta.href}>{GIFTS.cta.label}</Button>
      </Reveal>
    </section>
  )
}

/** Khối 14: dấu ấn hoạt động và báo chí. Ảnh sự kiện thật bổ sung qua Payload (Press). */
export function Press() {
  return (
    <section id="su-kien" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={PRESS.eyebrow} title={PRESS.title} subtitle={PRESS.body} />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PRESS.items.map((p, i) => (
          <Reveal as="li" key={p.title} index={i % 3} className={CARD_CLASS}>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-orange">{p.label}</p>
            <h3 className="mt-2 font-display text-xl font-bold text-fg">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.text}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <h3 className="font-display text-xl font-bold text-fg">{PRESS.mediaTitle}</h3>
        <p className="mt-1 text-sm text-muted">{PRESS.mediaNote}</p>
      </Reveal>
    </section>
  )
}

/** Khối 15: câu hỏi thường gặp. Dùng <details> gốc: truy cập được bằng bàn phím, không cần JS. */
export function Faq() {
  return (
    <section id="faq" className={`${SECTION_CLASS} flex max-w-4xl flex-col gap-10`}>
      <SectionHeading eyebrow={FAQ.eyebrow} title={FAQ.title} />
      <div className="flex flex-col gap-3">
        {FAQ.items.map((f, i) => (
          <Reveal key={f.q} index={i % 3}>
            <details className="group rounded-2xl border border-line-gold bg-surface/85 px-6 py-4 backdrop-blur-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-fg">
                {f.q}
                <span aria-hidden="true" className="text-xl text-gold-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const field =
  'w-full rounded-xl border border-line-gold bg-base px-4 py-3 text-fg placeholder:text-muted focus-visible:outline-offset-2'

/**
 * Khối 16: lời mời cuối + form. Đây là giao diện (Phase 3); gửi dữ liệu, kiểm tra, Turnstile và
 * trạng thái lỗi/đang gửi/thành công được nối ở Phase 4.
 */
export function FinalCta() {
  return (
    <section id="dang-ky" className={`${SECTION_CLASS} grid gap-10 md:grid-cols-2`}>
      <div className="flex flex-col gap-4">
        <SectionHeading eyebrow={FINAL_CTA.eyebrow} title={FINAL_CTA.title} subtitle={FINAL_CTA.subtitle} />
        <Reveal index={3}>
          <p className="text-muted">{FINAL_CTA.body}</p>
        </Reveal>
      </div>
      <Reveal index={1}>
        <form className={`${CARD_CLASS} flex flex-col gap-4`} noValidate>
          <label className="flex flex-col gap-1 text-sm font-medium text-fg">
            Họ tên
            <input name="fullName" autoComplete="name" className={field} placeholder="Nguyễn Văn A" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-fg">
            Số điện thoại / Zalo
            <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} placeholder="09xx xxx xxx" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-fg">
            Email
            <input name="email" type="email" autoComplete="email" className={field} placeholder="ban@congty.vn" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-fg">
            Công ty &amp; chức vụ
            <input name="company" autoComplete="organization" className={field} placeholder="Công ty, chức vụ" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-fg">
            Quan tâm
            <select name="interest" className={field} defaultValue="">
              <option value="" disabled>
                Chọn nội dung quan tâm
              </option>
              {FINAL_CTA.interests.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="flex items-start gap-3 text-xs text-muted">
            <input type="checkbox" name="consent" className="mt-0.5" />
            <span>
              Tôi đồng ý để đội ngũ Jenny liên hệ theo <a href="/chinh-sach-bao-mat" className="underline">Chính sách bảo mật</a>.
            </span>
          </label>
          <Button type="button" role="button" className="w-full">
            {FINAL_CTA.submit}
          </Button>
        </form>
      </Reveal>
    </section>
  )
}

/** Khối 17: footer. */
export function Footer() {
  return (
    <footer className="border-t border-line-gold bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="font-display text-xl font-bold text-gold-500">Mentor Jenny Nguyễn</p>
          <p className="text-sm text-muted">{FOOTER.intro}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <p className="font-semibold text-fg">Liên hệ</p>
          {FOOTER.hotlines.map((h) => (
            <p key={h.tel}>
              Hotline ({h.label}): <a href={`tel:${h.tel}`} className="text-fg underline">{h.phone}</a>
            </p>
          ))}
          <p>Website: {FOOTER.websites.join(' · ')}</p>
          <p>Văn phòng: {FOOTER.office}</p>
          <p>Mạng xã hội: {FOOTER.socials.join(' · ')}</p>
        </div>
        <nav aria-label="Liên kết chân trang" className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-fg">Liên kết</p>
          {FOOTER.links.map((l) => (
            <a key={l.label} href={l.href} className="text-muted hover:text-gold-500">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="border-t border-line px-6 py-5 text-center text-xs text-muted">{FOOTER.copyright}</p>
    </footer>
  )
}
