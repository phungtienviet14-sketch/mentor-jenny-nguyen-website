import { PinnedTrack } from '@/components/motion/PinnedTrack'
import { Button } from '@/components/ui/Button'
import { ArrowIcon } from '@/components/ui/Icons'
import { CARD_CLASS, SectionHeading } from '@/components/ui/SectionHeading'
import { ROADMAP } from '@/content/home'

/** Khối 11: lộ trình 5 bước, cuộn ngang ghim (≥ 761px, không giảm chuyển động); còn lại là cuộn ngang native có snap. */
export function Roadmap() {
  const steps = ROADMAP.steps.map((s) => (
    <article
      key={s.no}
      className={`${CARD_CLASS} flex h-full flex-col gap-3 !p-6 group-data-[active=true]:border-gold-accent group-data-[active=true]:bg-gold-soft/40 group-data-[active=true]:shadow-xl`}
    >
      <span className="hstep-n font-display text-6xl leading-none">{s.no}</span>
      <p className="text-xs font-bold tracking-[0.2em] text-gold-text uppercase">{s.tag}</p>
      <h3 className="font-display text-2xl leading-tight font-normal tracking-wide text-fg uppercase">{s.title}</h3>
    </article>
  ))
  steps.push(
    <article key="cta" className={`${CARD_CLASS} flex h-full flex-col justify-center gap-5 bg-[var(--band-bg)] text-white`}>
      <p className="font-display text-3xl leading-tight font-normal tracking-wide text-gold-strong uppercase">Sẵn sàng bước đầu tiên?</p>
      <Button href={ROADMAP.cta.href} variant="light" className="w-fit">
        {ROADMAP.cta.label}
        <ArrowIcon />
      </Button>
    </article>,
  )

  return (
    <div id="lo-trinh" className="bg-white">
      <PinnedTrack
        label="Lộ trình bứt phá cùng AI"
        itemClassName="w-[74vw] max-w-[340px]"
        header={<SectionHeading compact eyebrow={ROADMAP.eyebrow} title={ROADMAP.title} accent={ROADMAP.accent} />}
        items={steps}
      />
    </div>
  )
}
