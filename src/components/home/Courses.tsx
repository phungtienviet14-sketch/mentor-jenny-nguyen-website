'use client'

import { useId, useState, type KeyboardEvent } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { ArrowIcon } from '@/components/ui/Icons'
import { Placeholder } from '@/components/ui/Placeholder'
import { CARD_CLASS, SECTION_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import {
  COURSES,
  COURSES_INTRO,
  COURSE_CTAS,
  ONLINE_COURSES,
  SUPPORT_PROGRAMS,
  type Course,
} from '@/content/home'
import { programHref } from '@/content/programs'

function CourseCard({ course }: { course: Course }) {
  return (
    <article className={`${CARD_CLASS} group flex h-full flex-col overflow-hidden !p-0`}>
      {/* Ảnh khóa học do marketing bổ sung; hiện là nền gradient xanh có nhãn khóa */}
      <div className="course-img relative grid aspect-[16/9] place-items-center overflow-hidden text-center text-xs font-bold tracking-[0.16em] text-white/85 uppercase">
        <span className="absolute top-3 left-3 rounded-full bg-gold-strong px-3 py-1 text-[11px] font-extrabold tracking-widest text-gold-600">
          {course.tag}
        </span>
        Ảnh khóa học
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-2xl leading-tight font-normal tracking-wide text-fg uppercase">
          {course.name}
        </h3>
        <p className="font-semibold text-gold-text">{course.hook}</p>
        <p className="text-sm text-muted">
          <strong className="text-fg">Phù hợp:</strong> {course.audience}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <a
            href={programHref(course.slug)}
            className="link-arrow inline-flex items-center gap-2 text-sm font-bold text-gold-500"
          >
            {COURSE_CTAS.detail}
            <ArrowIcon />
          </a>
          <Button href="#dang-ky" className="px-5 py-2 text-xs">
            {COURSE_CTAS.register}
          </Button>
        </div>
      </div>
    </article>
  )
}

/** Khối 10: khóa học dạng tab (chủ lực / online / bổ trợ). Mọi tab có sẵn trong HTML, tab không chọn chỉ bị ẩn. */
export function Courses() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabs = COURSES_INTRO.tabs

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <section id="khoa-hoc" className="bg-elevated">
      <div className={`${SECTION_CLASS} flex flex-col gap-10`}>
        <SectionHeading
          eyebrow={COURSES_INTRO.eyebrow}
          title={COURSES_INTRO.title}
          accent={COURSES_INTRO.accent}
        />

        <Reveal className="flex justify-center">
          <div
            role="tablist"
            aria-label="Nhóm khóa học"
            className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-line bg-white p-1.5"
          >
            {tabs.map((t, i) => (
              <button
                key={t}
                id={`${baseId}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls={`${baseId}-panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                  active === i
                    ? 'bg-[image:var(--action-gradient)] text-white shadow-md'
                    : 'text-fg hover:bg-elevated'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id={`${baseId}-panel-0`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-0`}
          hidden={active !== 0}
          className="tab-panel"
        >
          <ul className="grid gap-6 md:grid-cols-2">
            {COURSES.map((c) => (
              <li key={c.name}>
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
        </div>

        <div
          id={`${baseId}-panel-1`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-1`}
          hidden={active !== 1}
          className="tab-panel"
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {ONLINE_COURSES.items.map((c) => (
              <li key={c.name}>
                <CourseCard course={c} />
              </li>
            ))}
            {Array.from({ length: ONLINE_COURSES.placeholders }, (_, i) => (
              <li key={i}>
                <Placeholder hint="Khóa online khác" className="h-full min-h-64" />
              </li>
            ))}
          </ul>
        </div>

        <div
          id={`${baseId}-panel-2`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-2`}
          hidden={active !== 2}
          className="tab-panel"
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {SUPPORT_PROGRAMS.map((p) => (
              <li key={p.name} className={`${CARD_CLASS} flex flex-col gap-3`}>
                <span className="w-fit rounded-full bg-gold-strong px-3 py-1 text-[11px] font-extrabold tracking-widest text-gold-600">
                  BỔ TRỢ
                </span>
                <h3 className="font-display text-2xl leading-tight font-normal tracking-wide text-fg uppercase">
                  {p.name}
                </h3>
                <p className="text-sm text-muted">{p.text}</p>
                <a
                  href={p.href}
                  className="link-arrow mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-gold-500"
                >
                  {p.cta}
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
