import { PinnedTrack } from '@/components/motion/PinnedTrack'
import { Button } from '@/components/ui/Button'
import { CARD_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { ROADMAP } from '@/content/home'

/** Khối 8: lộ trình 5 bước, cùng cơ chế cuộn ngang ghim như khối khóa học. */
export function Roadmap() {
  const steps = ROADMAP.steps.map((s) => (
    <article key={s.no} className={`${CARD_CLASS} flex h-full flex-col gap-2 !p-5`}>
      <p className="font-display text-3xl font-bold text-gold-500">{s.no}</p>
      <h3 className="font-display text-xl font-bold text-fg">{s.title}</h3>
      <p className="text-muted">{s.text}</p>
    </article>
  ))
  steps.push(
    <article key="cta" className={`${CARD_CLASS} flex h-full flex-col justify-center gap-5`}>
      <p className="font-display text-2xl font-bold text-fg">Sẵn sàng bước đầu tiên?</p>
      <Button href={ROADMAP.cta.href}>{ROADMAP.cta.label}</Button>
    </article>,
  )

  return (
    <div id="lo-trinh">
      <PinnedTrack
        label="Lộ trình bứt phá cùng AI"
        pinOnMobile
        itemClassName="w-[74vw] max-w-[340px]"
        header={<SectionHeading compact eyebrow={ROADMAP.eyebrow} title={ROADMAP.title} />}
        items={steps}
      />
    </div>
  )
}
