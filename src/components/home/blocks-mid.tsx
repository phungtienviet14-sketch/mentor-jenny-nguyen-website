import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { BOOKS, ECOSYSTEM, TESTIMONIALS, WHY } from '@/content/home'

/** Khối 9: hệ sinh thái NetViet (giải pháp doanh nghiệp). */
export function Ecosystem() {
  return (
    <section id="giai-phap" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={ECOSYSTEM.eyebrow} title={ECOSYSTEM.title} subtitle={`${ECOSYSTEM.subtitle} ${ECOSYSTEM.body}`} />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ECOSYSTEM.brands.map((b, i) => (
          <Reveal as="li" key={b.brand} index={i % 3} className={CARD_CLASS}>
            <p className="font-display text-xl font-bold text-gold-500">{b.brand}</p>
            <p className="mt-1 text-sm font-semibold text-fg">{b.solution}</p>
            <p className="mt-3 text-sm text-muted">{b.text}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <h3 className="mb-4 font-display text-xl font-bold text-fg">{ECOSYSTEM.processTitle}</h3>
        <ol className="grid gap-4 md:grid-cols-4">
          {ECOSYSTEM.process.map((s, i) => (
            <li key={s} className="flex gap-3 rounded-2xl border border-line bg-surface/70 p-4 text-sm text-fg">
              <span className="font-display text-2xl font-bold text-gold-500">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal>
        <p className="text-sm text-muted">{ECOSYSTEM.partners}</p>
      </Reveal>
      <Reveal>
        <Button href={ECOSYSTEM.cta.href}>{ECOSYSTEM.cta.label}</Button>
      </Reveal>
    </section>
  )
}

/** Khối 10: vì sao chọn Jenny. */
export function Why() {
  return (
    <section id="khac-biet" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={WHY.eyebrow} title={WHY.title} />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {WHY.reasons.map((r, i) => (
          <Reveal as="li" key={r.title} index={i % 3} className={CARD_CLASS}>
            <h3 className="font-display text-xl font-bold text-fg">{r.title}</h3>
            <p className="mt-2 text-sm text-muted">{r.text}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <p className="rounded-3xl border border-line-gold bg-elevated p-6 font-display text-lg leading-relaxed text-fg">{WHY.pledge}</p>
      </Reveal>
    </section>
  )
}

/** Khối 11: học viên nói gì. Chưa có cảm nhận thật đã xin phép nên hiển thị khung chờ, không bịa nội dung. */
export function Testimonials() {
  return (
    <section id="hoc-vien" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={TESTIMONIALS.eyebrow} title={TESTIMONIALS.title} />
      {TESTIMONIALS.items.length === 0 ? (
        <Reveal>
          <p className="rounded-3xl border border-dashed border-line-gold p-8 text-center text-muted">{TESTIMONIALS.emptyNote}</p>
        </Reveal>
      ) : (
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {TESTIMONIALS.items.map((t) => (
            <li key={t.name} className={`${CARD_CLASS} w-[80vw] max-w-sm shrink-0 snap-start`}>
              <blockquote className="text-fg">“{t.quote}”</blockquote>
              <p className="mt-4 font-semibold text-gold-500">{t.name}</p>
              <p className="text-sm text-muted">{t.role}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** Khối 12: sách. Bìa và link mua thật bổ sung qua Payload (Books). */
export function Books() {
  return (
    <section id="sach" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={BOOKS.eyebrow} title={BOOKS.title} subtitle={BOOKS.body} />
      <div className="grid gap-6 md:grid-cols-2">
        {BOOKS.items.map((b, i) => (
          <Reveal key={b.name} index={i} className={`${CARD_CLASS} flex flex-col gap-4`}>
            <div
              aria-hidden="true"
              className="flex aspect-[3/2] items-center justify-center rounded-2xl bg-gradient-to-br from-gold-600 to-gold-400 p-6 text-center font-display text-2xl font-bold text-on-gold"
            >
              {b.name}
            </div>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-orange">{b.label}</p>
            <h3 className="font-display text-2xl font-bold text-fg">{b.name}</h3>
            <p className="text-sm text-muted">{b.desc}</p>
            <p className="text-sm text-fg">
              <strong>Phù hợp:</strong> {b.fit}
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              {b.ctas.map((c, j) => (
                <Button key={c} href="#dang-ky" variant={j === 0 ? 'primary' : 'ghost'} className="px-5 py-2.5 text-xs">
                  {c} ↗
                </Button>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
