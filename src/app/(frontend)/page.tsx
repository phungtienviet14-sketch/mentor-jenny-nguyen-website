import type { FAQPage, Organization, Person } from 'schema-dts'

import { Courses } from '@/components/home/Courses'
import { Roadmap } from '@/components/home/Roadmap'
import {
  Activities,
  Blog,
  Books,
  Community,
  Events,
  InHouse,
  Testimonials,
  Videos,
} from '@/components/home/blocks-mid'
import { Faq, FinalCta, Footer, GiftBand } from '@/components/home/blocks-bottom'
import { About, Context, Ecosystem, Hero, MarqueeBand, Partners } from '@/components/home/blocks-top'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQ } from '@/content/home'
import { SITE, absoluteUrl } from '@/lib/site'
import { getShowEvents } from '@/lib/site-flags'

type WithCtx<T> = T & { '@context': 'https://schema.org' }

export default async function HomePage() {
  const showEvents = await getShowEvents()
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: absoluteUrl('/'),
    jobTitle: 'Mentor ứng dụng AI cho doanh nghiệp',
    worksFor: { '@type': 'Organization', name: SITE.org },
  } satisfies WithCtx<Person>

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.org,
    url: absoluteUrl('/'),
    telephone: SITE.phone,
    address: { '@type': 'PostalAddress', ...SITE.address },
  } satisfies WithCtx<Organization>

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.items.map((f) => ({
      '@type': 'Question' as const,
      name: f.q,
      acceptedAnswer: { '@type': 'Answer' as const, text: f.a },
    })),
  } satisfies WithCtx<FAQPage>

  return (
    <>
      <JsonLd data={person} />
      <JsonLd data={organization} />
      <JsonLd data={faq} />
      <Hero />
      <Partners />
      <Context />
      <About />
      <MarqueeBand />
      <Ecosystem />
      <Courses />
      <Roadmap />
      <Community />
      {showEvents && <Events />}
      <Activities />
      <Videos />
      <InHouse />
      <Testimonials />
      <Books />
      <Blog />
      <GiftBand />
      <Faq />
      <FinalCta />
      <Footer showEvents={showEvents} />
    </>
  )
}
