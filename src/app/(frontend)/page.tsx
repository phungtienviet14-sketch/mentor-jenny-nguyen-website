import type { FAQPage, Organization, Person } from 'schema-dts'

import { BrandBand } from '@/components/home/BrandBand'
import { Courses } from '@/components/home/Courses'
import { Roadmap } from '@/components/home/Roadmap'
import { Ecosystem, Why, Testimonials, Books } from '@/components/home/blocks-mid'
import { Faq, FinalCta, Footer, Gifts, Press } from '@/components/home/blocks-bottom'
import { About, Context, Formula, Hero, Partners, Stats } from '@/components/home/blocks-top'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQ } from '@/content/home'
import { SITE, absoluteUrl } from '@/lib/site'

type WithCtx<T> = T & { '@context': 'https://schema.org' }

export default function HomePage() {
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
      <Stats />
      <Partners />
      <Context />
      <About />
      <BrandBand />
      <Formula />
      <Courses />
      <Roadmap />
      <Ecosystem />
      <Why />
      <Testimonials />
      <Books />
      <Gifts />
      <Press />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  )
}
