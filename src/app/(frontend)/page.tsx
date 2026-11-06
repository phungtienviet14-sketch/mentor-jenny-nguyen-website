import Link from 'next/link'
import type { Organization, Person } from 'schema-dts'

import { Reveal } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE, absoluteUrl } from '@/lib/site'

/** Trang giữ chỗ của Phase 2. 17 khối trang chủ được dựng ở Phase 3 theo Figma. */
export default function HomePage() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: absoluteUrl('/'),
    jobTitle: 'Mentor ứng dụng AI cho doanh nghiệp',
    worksFor: { '@type': 'Organization', name: SITE.org },
  } satisfies Person & { '@context': 'https://schema.org' }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.org,
    url: absoluteUrl('/'),
    telephone: SITE.phone,
    address: { '@type': 'PostalAddress', ...SITE.address },
  } satisfies Organization & { '@context': 'https://schema.org' }

  return (
    <section className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-6 px-6 py-24">
      <JsonLd data={person} />
      <JsonLd data={organization} />
      <Reveal>
        <p className="text-sm font-semibold tracking-[0.2em] text-gold-500 uppercase">{SITE.org}</p>
      </Reveal>
      <Reveal index={1}>
        <h1 className="shimmer-text font-display text-5xl leading-tight font-bold md:text-7xl">{SITE.name}</h1>
      </Reveal>
      <Reveal index={2}>
        <p className="max-w-2xl text-lg text-muted">{SITE.description}</p>
      </Reveal>
      <Reveal index={3}>
        <Link
          href="/admin"
          className="inline-flex rounded-full bg-action px-8 py-3 font-semibold text-on-gold transition-colors hover:bg-action-hover active:bg-action-pressed"
        >
          Trang đang được xây dựng
        </Link>
      </Reveal>
    </section>
  )
}
