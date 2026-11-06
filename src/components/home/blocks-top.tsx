import Image from 'next/image'

import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { Marquee } from '@/components/ui/Marquee'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { ABOUT, CONTEXT, CTA, FORMULA, HERO, PARTNERS, STATS } from '@/content/home'

/** Khối 1: Hero. */
export function Hero() {
  const cut = HERO.title.indexOf('Ngay cả')
  const lead = HERO.title.slice(0, cut).trim()
  const rest = HERO.title.slice(cut)

  return (
    <section
      id="top"
      className={`${SECTION_CLASS} grid items-center gap-12 pt-12 md:grid-cols-[1.15fr_0.85fr] md:pt-20`}
    >
      <div className="flex flex-col gap-6">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-accent-orange uppercase">
            {HERO.eyebrow}
          </p>
        </Reveal>
        <Reveal index={1}>
          <p className="text-sm font-semibold tracking-[0.18em] text-gold-500">{HERO.kicker}</p>
        </Reveal>
        <Reveal index={2}>
          <h1 className="font-display text-4xl leading-[1.12] font-bold text-fg md:text-6xl">
            <span className="shimmer-text">{lead}</span> {rest}
          </h1>
        </Reveal>
        <Reveal index={3}>
          <p className="max-w-2xl text-lg text-muted">{HERO.body}</p>
        </Reveal>
        <Reveal index={4}>
          <ul className="flex flex-col gap-2">
            {HERO.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-fg">
                <span aria-hidden="true" className="font-bold text-gold-500">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={5}>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={CTA.gift.href}>{CTA.gift.label}</Button>
            <Button href={CTA.register.href} variant="ghost">
              {CTA.register.label}
            </Button>
          </div>
        </Reveal>
      </div>

      <Reveal index={2} className="relative mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-[2rem] border border-line-gold bg-cream shadow-2xl shadow-black/10">
          <Image
            src="/images/jenny.jpg"
            alt="Mentor Jenny Nguyễn, Tổng giám đốc NetViet TV"
            width={1202}
            height={1309}
            priority
            sizes="(min-width: 768px) 420px, 90vw"
            className="h-auto w-full"
          />
        </div>
        <div className="absolute -bottom-5 left-4 rounded-2xl border border-line-gold bg-surface px-5 py-3 shadow-lg">
          <p className="font-serif text-lg font-bold text-gold-500">{HERO.nameTag.name}</p>
          <p className="text-xs text-muted">{HERO.nameTag.roles}</p>
        </div>
      </Reveal>
    </section>
  )
}

/** Khối 2: dải chỉ số. */
export function Stats() {
  return (
    <section aria-label="Chỉ số nổi bật" className="bg-[var(--band-bg)] text-[var(--band-fg)]">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            index={i}
            className="flex flex-col gap-2 md:border-l md:border-white/20 md:pl-6 md:first:border-l-0 md:first:pl-0"
          >
            <dt className="order-2 text-sm text-white/85">{s.label}</dt>
            <dd className="font-display text-4xl font-bold text-[var(--band-accent)] md:text-5xl">
              {s.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

/** Khối 3: đã đồng hành cùng (dải chạy ngang; logo thật bổ sung sau qua Payload). */
export function Partners() {
  return (
    <section aria-label="Đã đồng hành cùng" className="py-12">
      <p className="mb-6 text-center text-xs font-semibold tracking-[0.22em] text-muted uppercase">
        Đã đồng hành cùng
      </p>
      <Marquee label="Đơn vị đã đồng hành">
        {PARTNERS.map((p) => (
          <span
            key={p}
            className="rounded-full border border-line-gold px-6 py-2 text-sm font-semibold whitespace-nowrap text-fg"
          >
            {p}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/** Khối 4: bối cảnh 2026. */
export function Context() {
  return (
    <section id="boi-canh" className={`${SECTION_CLASS} grid gap-12 md:grid-cols-2`}>
      <div className="flex flex-col gap-6">
        <SectionHeading
          eyebrow={CONTEXT.eyebrow}
          title={CONTEXT.title}
          subtitle={CONTEXT.subtitle}
        />
        <Reveal index={3}>
          <p className="text-muted">{CONTEXT.body}</p>
        </Reveal>
      </div>
      <div className="flex flex-col gap-6">
        <Reveal>
          <div className={CARD_CLASS}>
            <p className="mb-4 font-display text-xl font-bold text-fg">{CONTEXT.askTitle}</p>
            <ul className="flex flex-col gap-3">
              {CONTEXT.pains.map((p) => (
                <li key={p} className="flex gap-3 text-fg">
                  <span aria-hidden="true" className="font-bold text-accent-red">
                    ✕
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal index={1}>
          <p className="text-fg">{CONTEXT.closing}</p>
        </Reveal>
        <Reveal index={2}>
          <Button href={CONTEXT.cta.href}>{CONTEXT.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  )
}

/** Khối 5: về Mentor Jenny. */
export function About() {
  return (
    <section id="ve-jenny" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.title} />
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-5 text-muted">
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={i} index={i}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <Reveal>
            <blockquote className="rounded-3xl border border-line-gold bg-elevated p-6 font-display text-2xl leading-snug text-gold-500">
              “{ABOUT.quote}”
            </blockquote>
          </Reveal>
          <Reveal index={1}>
            <div className={CARD_CLASS}>
              <p className="mb-3 font-display text-lg font-bold text-fg">{ABOUT.rolesTitle}</p>
              <ul className="flex flex-col gap-3 text-sm text-muted">
                {ABOUT.roles.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden="true" className="text-gold-500">
                      ✦
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal index={2}>
            <Button href={ABOUT.cta.href} variant="ghost">
              {ABOUT.cta.label} ↗
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Khối 6: Công thức Thở cùng AI. */
export function Formula() {
  return (
    <section id="phuong-phap" className={`${SECTION_CLASS} flex flex-col gap-10`}>
      <SectionHeading eyebrow={FORMULA.eyebrow} title={FORMULA.title} subtitle={FORMULA.intro} />
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {FORMULA.steps.map((s, i) => (
          <Reveal as="li" key={s.no} index={i} className={CARD_CLASS}>
            <p className="font-display text-4xl font-bold text-gold-500">{s.no}</p>
            <h3 className="mt-3 text-sm font-bold tracking-wide text-fg">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <p className="shimmer-text text-center font-display text-xl font-bold md:text-3xl">
          {FORMULA.equation}
        </p>
      </Reveal>
    </section>
  )
}
