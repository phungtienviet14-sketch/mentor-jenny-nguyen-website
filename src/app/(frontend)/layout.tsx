import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google'
import type { ReactNode } from 'react'

import { Header } from '@/components/home/Header'
import { AmbientBackground } from '@/components/motion/AmbientBackground'
import { SITE, SITE_URL } from '@/lib/site'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
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

/** Màu thanh trình duyệt theo chế độ sáng/tối của người xem. */
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFCF5' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0B0D' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body>
        <AmbientBackground />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
