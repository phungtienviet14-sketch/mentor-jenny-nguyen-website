import Image from 'next/image'

import { LeadForm } from '@/components/home/LeadForm'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import {
  ArrowIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  TiktokIcon,
  YoutubeIcon,
} from '@/components/ui/Icons'
import { Placeholder } from '@/components/ui/Placeholder'
import { SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { CONTACT, FAQ, FINAL_CTA, FOOTER, GIFT } from '@/content/home'

/** Khối 20: băng vàng quà tặng. */
export function GiftBand() {
  return (
    <section id="qua-tang" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <Reveal className="flex flex-col items-center gap-6 rounded-[2rem] bg-gold-strong p-8 text-center md:flex-row md:text-left">
          <Placeholder
            hint="Ảnh quà tặng"
            className="size-32 shrink-0 !rounded-3xl border-gold-600 text-gold-600"
          />
          <div className="flex-1">
            <h2 className="font-display text-3xl font-normal tracking-wide text-gold-600 uppercase md:text-4xl">
              {GIFT.title}
            </h2>
            <p className="mt-1 text-gold-600">{GIFT.text}</p>
          </div>
          <Button href={GIFT.cta.href} className="!bg-[var(--band-bg)] !bg-none text-white">
            {GIFT.cta.label}
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/** Khối 21: câu hỏi thường gặp. Dùng <details> gốc: truy cập được bằng bàn phím, không cần JS. */
export function Faq() {
  return (
    <section id="faq" className="bg-elevated">
      <div className={`${SECTION_CLASS} flex max-w-4xl flex-col gap-10`}>
        <SectionHeading eyebrow={FAQ.eyebrow} title={FAQ.title} accent={FAQ.accent} />
        <div className="flex flex-col gap-3">
          {FAQ.items.map((f, i) => (
            <Reveal key={f.q} index={i % 3}>
              <details className="faq-item group rounded-2xl border border-line bg-white px-6 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-fg">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="faq-plus text-2xl leading-none text-gold-text"
                  >
                    +
                  </span>
                </summary>
                <div className="faq-body">
                  <p className="pt-3 text-muted">{f.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Khối 22: lời mời cuối + form đăng ký (xử lý ở LeadForm, gửi qua /api/leads) + thông tin liên hệ. */
export function FinalCta() {
  return (
    <section id="dang-ky" className="bg-white">
      <div className={`${SECTION_CLASS} grid items-start gap-12 md:grid-cols-2`}>
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow={FINAL_CTA.eyebrow}
            title={FINAL_CTA.title}
            accent={FINAL_CTA.accent}
            align="left"
          />
          <Reveal>
            <p className="text-lg text-soft">{FINAL_CTA.body}</p>
          </Reveal>
          <Reveal>
            <ul className="flex flex-col gap-3 text-fg">
              {CONTACT.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="inline-flex items-center gap-3 font-semibold hover:text-gold-500"
                  >
                    <PhoneIcon
                      className="rounded-full border border-line-gold p-2 text-gold-500"
                      width={36}
                      height={36}
                    />
                    {p.label}: {p.phone}
                  </a>
                </li>
              ))}
              {CONTACT.email && (
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-3 font-semibold hover:text-gold-500"
                  >
                    <MailIcon
                      className="rounded-full border border-line-gold p-2 text-gold-500"
                      width={36}
                      height={36}
                    />
                    {CONTACT.email}
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
        <Reveal index={1}>
          <LeadForm
            interests={FINAL_CTA.interests}
            submitLabel={FINAL_CTA.submit}
            className="rounded-3xl border border-line bg-surface p-6 shadow-[0_40px_70px_-50px_rgb(16_41_120/0.45)] md:p-8"
          />
        </Reveal>
      </div>
    </section>
  )
}

/** Khối 23: footer navy. */
export function Footer() {
  return (
    <footer className="bg-[var(--band-bg)] text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/logo-white.png"
            alt="Mentor Jenny Nguyễn"
            width={160}
            height={63}
            className="h-10 w-auto"
          />
          <p className="text-sm">{FOOTER.intro}</p>
          <div className="flex items-center gap-3 text-gold-strong">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <FacebookIcon width={18} height={18} />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <TiktokIcon width={18} height={18} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
            >
              <YoutubeIcon width={18} height={18} />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-display text-lg font-normal tracking-wide text-gold-strong uppercase">
            Liên hệ
          </p>
          {FOOTER.hotlines.map((h) => (
            <p key={h.tel}>
              Hotline ({h.label}):{' '}
              <a href={`tel:${h.tel}`} className="text-white underline">
                {h.phone}
              </a>
            </p>
          ))}
          <p>Website: {FOOTER.websites.join(' · ')}</p>
          <p>Văn phòng: {FOOTER.office}</p>
        </div>
        <nav aria-label="Liên kết chân trang" className="flex flex-col gap-2 text-sm">
          <p className="font-display text-lg font-normal tracking-wide text-gold-strong uppercase">
            Liên kết
          </p>
          {FOOTER.links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-gold-strong">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="border-t border-white/20 px-6 py-5 text-center text-xs">{FOOTER.copyright}</p>
    </footer>
  )
}
