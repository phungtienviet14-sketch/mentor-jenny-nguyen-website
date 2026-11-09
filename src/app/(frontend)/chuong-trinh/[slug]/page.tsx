import type { Course as CourseSchema } from 'schema-dts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { ProgramPage } from '@/components/programs/ProgramPage'
import { PROGRAMS, getProgram, programHref } from '@/content/programs'
import { SITE, absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

/** Chỉ các chương trình có trong `PROGRAMS`; slug khác trả 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProgram(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.intro[0],
    alternates: { canonical: programHref(p.slug) },
    openGraph: { title: p.title, description: p.intro[0], url: absoluteUrl(programHref(p.slug)) },
  }
}

export default async function ProgramRoute({ params }: Props) {
  const { slug } = await params
  const p = getProgram(slug)
  if (!p) notFound()

  const course = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.title,
    description: p.intro.join(' '),
    url: absoluteUrl(programHref(p.slug)),
    provider: { '@type': 'Organization', name: SITE.org, url: absoluteUrl('/') },
  } satisfies CourseSchema & { '@context': 'https://schema.org' }

  return (
    <>
      <JsonLd data={course} />
      <ProgramPage program={p} />
    </>
  )
}
