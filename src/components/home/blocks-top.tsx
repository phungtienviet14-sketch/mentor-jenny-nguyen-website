import Image from 'next/image'

import { CountUp } from '@/components/motion/CountUp'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowIcon, SparkIcon } from '@/components/ui/Icons'
import { Marquee } from '@/components/ui/Marquee'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { ABOUT, CONTEXT, CTA, ECOSYSTEM, HERO, MARQUEE_WORDS, PARTNERS, STATS } from '@/content/home'

/** Khối 3 + 4: Hero và dải chỉ số (đếm số khi cuộn tới). */
export function Hero() {
  return (
    <section id="top" className="hero-bg relative overflow-hidden">
      <Parallax speed={0.18} className="pointer-events-none absolute inset-0">
        <span aria-hidden="true" className="hero-mark">
          {HERO.mark}
        </span>
      </Parallax>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-14 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-20 md:pb-24">
        <div className="flex flex-col gap-5">
          <Reveal>
            <p className="font-script text-3xl text-gold-text md:text-4xl">{HERO.hi}</p>
          </Reveal>
          <Reveal index={1}>
            <h1 className="font-display text-5xl leading-[1.02] font-normal tracking-tight text-fg uppercase md:text-7xl">
              <span className="text-gold-500">{HERO.name}</span>
            </h1>
          </Reveal>
          <Reveal index={2}>
            <p className="role-line text-sm font-bold tracking-[0.2em] text-gold-500 uppercase">{HERO.role}</p>
          </Reveal>
          <Reveal index={3}>
            <p className="max-w-xl text-lg text-soft">
              <strong className="text-fg">{HERO.tagline}</strong> {HERO.body}
            </p>
          </Reveal>
          <Reveal index={4}>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button href={CTA.courses.href}>
                {CTA.courses.label}
                <ArrowIcon />
              </Button>
              <Button href={CTA.business.href} variant="ghost">
                {CTA.business.label}
              </Button>
            </div>
          </Reveal>
          <Reveal index={5}>
            <a href={CTA.gift.href} className="link-arrow inline-flex items-center gap-2 text-sm font-bold text-gold-500">
              <SparkIcon width={16} height={16} />
              {CTA.gift.label}
            </a>
          </Reveal>
        </div>

        <Reveal index={2} className="relative mx-auto w-full max-w-md">
          <span aria-hidden="true" className="hero-halo" />
          <div className="relative overflow-hidden rounded-[2rem] border border-line-gold bg-cream shadow-2xl shadow-[rgb(16_41_120/0.25)]">
            <Image
              src="/images/jenny.jpg"
              alt="Mentor Jenny Nguyễn, Tổng giám đốc NetViet TV"
              width={1202}
              height={1309}
              priority
              sizes="(min-width: 768px) 420px, 90vw"
              className="hero-img h-auto w-full"
            />
          </div>
          <p className="absolute -bottom-5 left-4 max-w-[17rem] rounded-2xl border border-gold-accent bg-white/95 px-5 py-3 text-sm text-soft shadow-lg">
            <b className="block text-gold-text">{HERO.quote.lead}</b>
            {HERO.quote.text}
          </p>
        </Reveal>
      </div>

      <dl className="stats-band relative mx-auto grid max-w-6xl grid-cols-2 gap-y-8 rounded-t-3xl px-6 py-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            index={i}
            className="flex flex-col items-center gap-1 text-center md:border-l md:border-white/20 md:first:border-l-0"
          >
            <dd className="order-1 font-display text-4xl text-gold-strong md:text-5xl">
              {s.value !== undefined ? (
                <CountUp value={s.value} suffix={s.suffix} pad={s.pad} />
              ) : (
                s.text
              )}
            </dd>
            <dt className="order-2 text-xs font-bold tracking-[0.16em] text-white/90 uppercase">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

/** Khối 5: dải đối tác. Logo thật do marketing bổ sung; hiện là khung giữ chỗ chạy ngang. */
export function Partners() {
  return (
    <section aria-label={PARTNERS.caption} className="bg-white py-10">
      <p className="mb-5 text-center text-xs font-bold tracking-[0.22em] text-muted uppercase">{PARTNERS.caption}</p>
      <Marquee label="Đơn vị đã đồng hành" duration={40}>
        {PARTNERS.items.map((p) => (
          <span
            key={p}
            className="rounded-xl border border-dashed border-gold-accent bg-gold-accent/10 px-6 py-3 text-sm font-semibold whitespace-nowrap text-gold-text"
          >
            Logo · {p}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/** Khối 6: bối cảnh, 4 nỗi lo. */
export function Context() {
  return (
    <section id="boi-canh" className="bg-elevated">
      <div className={`${SECTION_CLASS} flex flex-col gap-12`}>
        <SectionHeading eyebrow={CONTEXT.eyebrow} title={CONTEXT.title} accent={CONTEXT.accent} subtitle={CONTEXT.body} />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTEXT.pains.map((p, i) => (
            <Reveal as="li" key={p} index={i} className={`${CARD_CLASS} flex flex-col gap-3 !p-6`}>
              <span className="font-display text-4xl text-gold-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-semibold text-fg">{p}</span>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-lg text-soft">{CONTEXT.closing}</p>
        </Reveal>
        <Reveal className="flex justify-center">
          <Button href={CONTEXT.cta.href}>
            {CONTEXT.cta.label}
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/** Khối 7: về Mentor Jenny. */
export function About() {
  return (
    <section id="ve-jenny" className="bg-white">
      <div className={`${SECTION_CLASS} grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr]`}>
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="arch-frame">
            <Image
              src="/images/jenny.jpg"
              alt="Mentor Jenny Nguyễn"
              width={1202}
              height={1309}
              sizes="(min-width: 768px) 380px, 80vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="absolute -right-3 -bottom-4 rounded-2xl bg-[var(--band-bg)] px-5 py-3 text-white shadow-lg">
            <b className="block font-display text-2xl font-normal text-gold-strong">{ABOUT.badge.value}</b>
            <span className="text-xs tracking-widest uppercase">{ABOUT.badge.label}</span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.title} accent={ABOUT.accent} align="left" />
          <Reveal>
            <p className="text-lg text-soft">{ABOUT.body}</p>
          </Reveal>
          <Reveal>
            <ul className="grid gap-2 sm:grid-cols-2">
              {ABOUT.areas.map((a) => (
                <li key={a} className="flex gap-2 text-sm font-semibold text-fg">
                  <SparkIcon width={14} height={14} className="mt-1 shrink-0 text-gold-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <blockquote className="rounded-2xl bg-[var(--band-bg)] p-6 text-white">
              <p className="text-lg leading-snug">“{ABOUT.quote}”</p>
              <footer className="mt-3 text-sm font-bold text-gold-strong">{ABOUT.quoteBy}</footer>
            </blockquote>
          </Reveal>
          <Reveal>
            <Button href={ABOUT.cta.href} variant="ghost">
              {ABOUT.cta.label}
              <ArrowIcon />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Khối 8: dải chữ lớn chạy ngang trên băng vàng. */
export function MarqueeBand() {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS]
  return (
    <div aria-hidden="true" className="overflow-hidden bg-gold-strong py-4">
      <Marquee duration={36}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-8 pr-8">
            <span
              className={`font-display text-4xl tracking-tight whitespace-nowrap uppercase md:text-6xl ${
                i % 2 === 0 ? 'text-gold-600' : 'band-outline'
              }`}
            >
              {w}
            </span>
            <SparkIcon width={26} height={26} className="text-gold-500" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

/** Khối 9: hệ sinh thái Mentor Jenny, 6 thẻ lưới 3×2. */
export function Ecosystem() {
  return (
    <section id="giai-phap" className="bg-white">
      <div className={`${SECTION_CLASS} flex flex-col gap-12`}>
        <SectionHeading eyebrow={ECOSYSTEM.eyebrow} title={ECOSYSTEM.title} accent={ECOSYSTEM.accent} subtitle={ECOSYSTEM.subtitle} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM.items.map((it, i) => (
            <Reveal as="li" key={it.title} index={i % 3} className={`${CARD_CLASS} flex flex-col gap-3`}>
              <span className="font-display text-4xl text-gold-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-xl leading-tight font-normal tracking-wide text-fg uppercase">{it.title}</h3>
              <p className="text-sm text-muted">{it.text}</p>
              <a href={it.href} className="link-arrow mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-gold-500">
                {it.cta}
                <ArrowIcon />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
