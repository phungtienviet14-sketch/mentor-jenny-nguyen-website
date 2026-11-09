import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowIcon, SparkIcon } from '@/components/ui/Icons'
import { Marquee } from '@/components/ui/Marquee'
import { Placeholder } from '@/components/ui/Placeholder'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { ACTIVITIES, BLOG, BOOKS, COMMUNITY, EVENTS, INHOUSE, TESTIMONIALS, VIDEOS } from '@/content/home'

/** Khối 12: cộng đồng Thở cùng AI (nội dung do marketing bổ sung). */
export function Community() {
  return (
    <section id="cong-dong" className="bg-elevated">
      <div className={`${SECTION_CLASS} grid items-center gap-12 md:grid-cols-2`}>
        <Reveal className="grid grid-cols-2 gap-4">
          <Placeholder hint="Ảnh cộng đồng" className="col-span-2 aspect-[3/2]" />
          <Placeholder hint="Ảnh 2" className="aspect-[4/3]" />
          <Placeholder hint="Ảnh 3" className="aspect-[4/3]" />
        </Reveal>
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow={COMMUNITY.eyebrow} title={COMMUNITY.title} accent={COMMUNITY.accent} align="left" />
          <Reveal>
            <p className="text-soft">{COMMUNITY.lead}</p>
          </Reveal>
          <ol className="flex flex-col gap-3">
            {COMMUNITY.activities.map((a, i) => (
              <Reveal as="li" key={a} index={i} className="flex items-center gap-4 rounded-2xl border border-dashed border-gold-accent bg-white px-5 py-4">
                <span className="font-display text-3xl text-gold-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-semibold text-gold-text">{a}</span>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <Button href={COMMUNITY.cta.href}>
              {COMMUNITY.cta.label}
              <ArrowIcon />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Khối 13: lịch sự kiện, dạng vé. Nội dung do marketing bổ sung. */
export function Events() {
  return (
    <section id="su-kien" className="bg-white">
      <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
        <SectionHeading eyebrow={EVENTS.eyebrow} title={EVENTS.title} accent={EVENTS.accent} />
        <ul className="flex flex-col gap-4">
          {Array.from({ length: EVENTS.count }, (_, i) => (
            <Reveal as="li" key={i} index={i} className={`${CARD_CLASS} flex flex-col items-start gap-5 !p-5 md:flex-row md:items-center`}>
              <div className="grid h-20 w-24 shrink-0 place-content-center rounded-2xl border-2 border-dashed border-gold-accent text-center text-gold-text">
                <b className="font-display text-2xl font-normal">dd.mm</b>
                <span className="text-xs">năm</span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-normal tracking-wide text-fg uppercase">[Tên sự kiện / khóa khai giảng]</h3>
                <p className="text-sm text-muted">[Thời gian · Địa điểm]</p>
              </div>
              <span className="rounded-full border border-dashed border-gold-accent bg-gold-accent/10 px-3 py-1 text-xs font-bold text-gold-text">Marketing bổ sung</span>
              <Button href="#dang-ky" className="px-5 py-2 text-xs">
                Đăng ký
              </Button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Khối 14: dải ảnh hoạt động & dấu ấn (ảnh thật do marketing bổ sung). */
export function Activities() {
  return (
    <section aria-label={ACTIVITIES.caption} className="bg-[var(--band-bg)] py-8">
      <p className="mb-5 text-center text-xs font-bold tracking-[0.22em] text-gold-strong uppercase">{ACTIVITIES.caption}</p>
      <Marquee duration={50} label={ACTIVITIES.caption}>
        {Array.from({ length: ACTIVITIES.count }, (_, i) => (
          <Placeholder key={i} hint="Ảnh · tên chương trình · thời gian" className="mr-4 aspect-[3/2] w-64 shrink-0 !rounded-2xl border-gold-strong text-gold-strong md:w-80" />
        ))}
      </Marquee>
    </section>
  )
}

/** Khối 15: video nổi bật. */
export function Videos() {
  return (
    <section id="video" className="bg-elevated">
      <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
        <SectionHeading eyebrow={VIDEOS.eyebrow} title={VIDEOS.title} accent={VIDEOS.accent} />
        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr]">
          <Reveal className="flex flex-col gap-3">
            <Placeholder hint="Video lớn (YouTube)" className="aspect-video" />
            <h3 className="font-semibold text-gold-text">[Tiêu đề video]</h3>
          </Reveal>
          <div className="grid gap-5">
            {Array.from({ length: VIDEOS.sideCount }, (_, i) => (
              <Reveal key={i} index={i + 1} className="flex flex-col gap-3">
                <Placeholder hint={`Video ${i + 2}`} className="aspect-video" />
                <h3 className="font-semibold text-gold-text">[Tiêu đề video]</h3>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="flex justify-center">
          <Button href={VIDEOS.cta.href} variant="ghost">
            {VIDEOS.cta.label}
            <ArrowIcon />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/** Khối 16: đào tạo AI in-house (khối navy). */
export function InHouse() {
  return (
    <section id="doanh-nghiep" className="bg-white">
      <div className={SECTION_CLASS}>
        <Reveal className="grid overflow-hidden rounded-[2rem] bg-[var(--band-bg)] shadow-2xl shadow-[rgb(16_41_120/0.3)] md:grid-cols-2">
          <Placeholder hint="Ảnh đào tạo doanh nghiệp" className="min-h-64 !rounded-none border-gold-strong text-gold-strong" />
          <div className="flex flex-col items-start gap-5 p-8 md:p-12">
            <SectionHeading eyebrow={INHOUSE.eyebrow} title={INHOUSE.title} accent={INHOUSE.accent} align="left" onDark />
            <ul className="flex flex-col gap-2 text-white/90">
              {INHOUSE.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <SparkIcon width={14} height={14} className="mt-1.5 shrink-0 text-gold-strong" />
                  {p}
                </li>
              ))}
            </ul>
            <Button href={INHOUSE.cta.href} variant="light">
              {INHOUSE.cta.label}
              <ArrowIcon />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Khối 17: cảm nhận học viên. Chưa có cảm nhận thật đã xin phép: chỉ hiện khung chờ ảnh. */
export function Testimonials() {
  return (
    <section id="cam-nhan" className="bg-elevated">
      <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
        <SectionHeading eyebrow={TESTIMONIALS.eyebrow} title={TESTIMONIALS.title} accent={TESTIMONIALS.accent} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {Array.from({ length: TESTIMONIALS.count }, (_, i) => (
            <Reveal key={i} index={i}>
              <Placeholder hint="Ảnh feedback" className="aspect-[3/4]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Khối 18: sách của Jenny. */
export function Books() {
  return (
    <section id="sach" className="bg-white">
      <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
        <SectionHeading eyebrow={BOOKS.eyebrow} title={BOOKS.title} accent={BOOKS.accent} />
        <ul className="grid gap-6 md:grid-cols-2">
          {BOOKS.items.map((b, i) => (
            <Reveal as="li" key={b.name} index={i} className={`${CARD_CLASS} flex flex-col gap-4 overflow-hidden !p-0`}>
              <Placeholder hint={`Bìa sách · ${b.name}`} className="aspect-video !rounded-none" />
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="text-xs font-bold tracking-[0.2em] text-gold-text uppercase">{b.label}</span>
                <h3 className="font-display text-2xl font-normal tracking-wide text-fg uppercase">{b.name}</h3>
                <p className="text-sm text-muted">{b.desc}</p>
                <div className="mt-auto flex flex-wrap gap-5 pt-3">
                  {b.ctas.map((c) => (
                    <a key={c} href="#dang-ky" className="link-arrow inline-flex items-center gap-2 text-sm font-bold text-gold-500">
                      {c}
                      <ArrowIcon />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Khối 19: blog (bài viết do marketing bổ sung). */
export function Blog() {
  return (
    <section id="blog" className="bg-elevated">
      <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
        <SectionHeading eyebrow={BLOG.eyebrow} title={BLOG.title} accent={BLOG.accent} />
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-3">
            <Placeholder hint="Bài viết nổi bật" className="aspect-video" />
            <span className="text-xs font-bold text-muted">Blog · [dd/mm/yyyy]</span>
            <h3 className="font-display text-2xl font-normal tracking-wide text-gold-text uppercase">[Tiêu đề bài viết nổi bật]</h3>
          </Reveal>
          <ul className="flex flex-col gap-4">
            {Array.from({ length: BLOG.rows }, (_, i) => (
              <Reveal as="li" key={i} index={i} className="flex items-center gap-4">
                <Placeholder hint="Ảnh bài" className="aspect-video w-36 shrink-0 !p-2" />
                <div>
                  <span className="text-xs font-bold text-muted">[dd/mm/yyyy]</span>
                  <h3 className="font-semibold text-gold-text">[Tiêu đề bài viết]</h3>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
