import { PinnedTrack } from '@/components/motion/PinnedTrack'
import { Button } from '@/components/ui/Button'
import { CARD_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { COURSES, COURSES_INTRO, COURSE_CTAS, SUPPORT_PROGRAMS, type Course } from '@/content/home'

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <article className={`${CARD_CLASS} flex h-full flex-col overflow-hidden !p-0`}>
      {/* Dải tiêu đề màu (navy, đỏ xen kẽ) như thẻ khóa học của site tham chiếu; ảnh minh họa bổ sung sau qua Payload */}
      <header
        className={`px-4 py-3 text-white ${index % 2 === 0 ? 'bg-[#183771]' : 'bg-[#c93e45]'}`}
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#f1c64d]">{course.tag}</p>
        <h3 className="font-display text-lg leading-tight font-extrabold uppercase">
          {course.name}
        </h3>
      </header>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="font-semibold text-gold-500">{course.hook}</p>
        <p className="text-[13px] leading-snug text-muted">{course.desc}</p>
        <p className="text-[13px] leading-snug text-fg">
          <strong>Dành cho:</strong> {course.audience}
        </p>
        <div>
          <p className="text-sm font-bold text-fg">Học xong anh chị có:</p>
          <ul className="mt-1 flex flex-col gap-0.5 text-[13px] leading-snug text-muted">
            {course.outcomes.map((o) => (
              <li key={o} className="flex gap-2">
                <span aria-hidden="true" className="text-gold-500">
                  ✓
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[13px] text-muted">
          <strong className="text-fg">Hình thức:</strong> {course.format}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Button href="#dang-ky" variant="ghost" className="px-5 py-2.5 text-xs">
            {COURSE_CTAS.detail}
          </Button>
          <Button href="#dang-ky" className="px-5 py-2.5 text-xs">
            {COURSE_CTAS.register}
          </Button>
        </div>
      </div>
    </article>
  )
}

function SupportCard() {
  return (
    <article className={`${CARD_CLASS} flex h-full flex-col gap-4`}>
      <p className="text-xs font-semibold tracking-[0.18em] text-accent-orange">
        CHƯƠNG TRÌNH BỔ TRỢ
      </p>
      <ul className="flex flex-col gap-4">
        {SUPPORT_PROGRAMS.map((p) => (
          <li key={p.name}>
            <h3 className="font-display text-xl font-bold text-fg">{p.name}</h3>
            <p className="text-sm text-muted">{p.text}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

/** Khối 7: 4 khóa chủ lực, cuộn dọc đẩy track ngang (ghim ≥ 761px). */
export function Courses() {
  return (
    <div id="khoa-hoc">
      <PinnedTrack
        label="Khóa học chủ lực"
        itemClassName="w-[82vw] max-w-[430px]"
        header={
          <SectionHeading
            compact
            eyebrow={COURSES_INTRO.eyebrow}
            title={COURSES_INTRO.title}
            subtitle={COURSES_INTRO.body}
          />
        }
        items={[
          ...COURSES.map((c, i) => <CourseCard key={c.name} course={c} index={i} />),
          <SupportCard key="support" />,
        ]}
      />
    </div>
  )
}
