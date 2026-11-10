import Link from 'next/link'

import { FinalCta, Footer } from '@/components/home/blocks-bottom'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowIcon, SparkIcon } from '@/components/ui/Icons'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import type { Program } from '@/content/programs'
import { EVENTS_HREF } from '@/lib/event-links'

const isTodo = (v: string) => v.startsWith('[')

/** Trang chi tiết khóa học / chương trình, dựng từ dữ liệu `PROGRAMS` (Google Doc). */
export function ProgramPage({ program: p, showEvents = false }: { program: Program; showEvents?: boolean }) {
  // Khi phần Sự kiện đang tắt, link "Xem lịch" chuyển thành nút hỏi lịch qua form đăng ký.
  const secondary = !showEvents && p.secondary.href === EVENTS_HREF ? { label: 'Hỏi lịch Workshop', href: '#dang-ky' } : p.secondary
  return (
    <>
      <section id="top" className="hero-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[1.3fr_0.7fr] md:py-20">
          <div className="flex flex-col gap-5">
            <Reveal>
              <nav aria-label="Đường dẫn" className="text-sm text-muted">
                <Link href="/" className="hover:text-gold-500">
                  Trang chủ
                </Link>
                {' / '}
                <Link href="/#khoa-hoc" className="hover:text-gold-500">
                  Khóa học
                </Link>
                {' / '}
                <span className="text-fg">{p.title}</span>
              </nav>
            </Reveal>
            <Reveal index={1}>
              <p className="font-script text-2xl text-gold-text md:text-3xl">{p.kicker}</p>
            </Reveal>
            <Reveal index={2}>
              <h1 className="font-display text-4xl leading-[1.05] font-normal tracking-tight text-fg uppercase md:text-6xl">
                {p.headline[0]}
                <span className="heading-accent mt-1 block text-gold-text">{p.headline[1]}</span>
              </h1>
            </Reveal>
            {p.intro.map((t, i) => (
              <Reveal key={t} index={3 + i}>
                <p className="max-w-2xl text-lg text-soft">{t}</p>
              </Reveal>
            ))}
            <Reveal index={5}>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button href={p.primary.href}>
                  {p.primary.label}
                  <ArrowIcon />
                </Button>
                <Button href={secondary.href} variant="ghost">
                  {secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal index={2}>
            <div className="course-img relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[2rem] text-center text-xs font-bold tracking-[0.16em] text-white/85 uppercase shadow-2xl shadow-[rgb(16_41_120/0.25)]">
              <span className="absolute top-4 left-4 rounded-full bg-gold-strong px-3 py-1 text-[11px] font-extrabold tracking-widest text-gold-600">
                {p.tag}
              </span>
              Ảnh chương trình
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-elevated">
        <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
          <SectionHeading title={p.audienceTitle} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {p.audience.map((a, i) => (
              <Reveal as="li" key={a} index={i % 2} className={`${CARD_CLASS} flex gap-3 !p-5`}>
                <SparkIcon width={16} height={16} className="mt-1 shrink-0 text-gold-accent" />
                <span className="font-semibold text-fg">{a}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="noi-dung" className="bg-white">
        <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
          <SectionHeading title={p.learnTitle} />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {p.learn.map((l, i) => (
              <Reveal as="li" key={l.title} index={i % 3} className={`${CARD_CLASS} flex flex-col gap-3`}>
                <span className="font-display text-4xl text-gold-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl leading-tight font-normal tracking-wide text-fg uppercase">{l.title}</h3>
                <p className="text-sm text-muted">{l.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {p.formats && p.process && (
        <section className="bg-[var(--band-bg)]">
          <div className={`${SECTION_CLASS} flex flex-col gap-12`}>
            <div className="flex flex-col gap-8">
              <SectionHeading title="Hình thức triển khai" onDark />
              <ul className="grid gap-5 md:grid-cols-3">
                {p.formats.map((f, i) => (
                  <Reveal as="li" key={f.title} index={i} className="rounded-3xl border border-white/20 bg-white/5 p-6 text-white">
                    <h3 className="font-display text-xl font-normal tracking-wide text-gold-strong uppercase">{f.title}</h3>
                    <p className="mt-2 text-sm text-white/85">{f.text}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <SectionHeading title="Quy trình hợp tác" onDark />
              <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {p.process.map((s, i) => (
                  <Reveal as="li" key={s.title} index={i} className="rounded-3xl bg-white p-6">
                    <span className="text-xs font-bold tracking-[0.2em] text-gold-text uppercase">Bước {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-1 font-display text-xl font-normal tracking-wide text-fg uppercase">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted">{s.text}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="bg-elevated">
        <div className={`${SECTION_CLASS} flex max-w-4xl flex-col gap-10`}>
          <SectionHeading title={p.infoTitle} />
          <Reveal>
            <dl className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
              {p.info.map((row) => (
                <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-bold text-fg">{row.label}</dt>
                  <dd className={isTodo(row.value) ? 'rounded-lg border border-dashed border-gold-accent bg-gold-accent/10 px-3 py-1 text-sm text-gold-text' : 'text-soft'}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <Reveal className="flex flex-col items-center gap-5 rounded-[2rem] bg-gold-strong p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-normal tracking-wide text-gold-600 uppercase md:text-4xl">{p.ctaTitle}</h2>
            {p.ctaText && <p className="max-w-2xl text-gold-600">{p.ctaText}</p>}
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={p.primary.href} className="!bg-[var(--band-bg)] !bg-none text-white">
                {p.primary.label}
                <ArrowIcon />
              </Button>
              <Button href={secondary.href} variant="light">
                {secondary.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <Footer showEvents={showEvents} />
    </>
  )
}
