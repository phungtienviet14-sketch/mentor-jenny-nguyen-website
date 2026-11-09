import type { Metadata, Viewport } from 'next'
import { Anton, Dancing_Script, Montserrat } from 'next/font/google'
import type { ReactNode } from 'react'

import { ContactFab } from '@/components/home/ContactFab'
import { Header } from '@/components/home/Header'
import { Topbar } from '@/components/home/Topbar'
import { ConsentManager } from '@/components/analytics/ConsentManager'
import { SITE, SITE_URL } from '@/lib/site'

import './globals.css'

const anton = Anton({
  subsets: ['vietnamese', 'latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['vietnamese', 'latin'],
  weight: ['600', '700'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} | AI cho chủ doanh nghiệp`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}

/** Chỉ có giao diện sáng; màu thanh trình duyệt theo nền trắng. */
export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${anton.variable} ${montserrat.variable} ${dancing.variable}`}>
      <body>
        <Topbar />
        <Header />
        <main>{children}</main>
        <ContactFab />
        <ConsentManager />
      </body>
    </html>
  )
}
