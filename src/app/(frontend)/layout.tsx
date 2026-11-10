import type { Metadata, Viewport } from 'next'
import { Anton, Dancing_Script, Montserrat } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'

import { ContactFab } from '@/components/home/ContactFab'
import { Header } from '@/components/home/Header'
import { Topbar } from '@/components/home/Topbar'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { PageIntro } from '@/components/motion/PageIntro'
import { ScrollBar } from '@/components/motion/ScrollBar'
import { ConsentManager } from '@/components/analytics/ConsentManager'
import { SITE, SITE_URL } from '@/lib/site'
import { getShowEvents } from '@/lib/site-flags'

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

/**
 * Chạy trước khi vẽ: đánh dấu có JS (để CSS mới ẩn phần tử Reveal) và, nếu sau 4 giây JS vẫn chưa
 * khởi động xong (MotionProvider chưa gắn data-motion-ready) thì cho hiện toàn bộ nội dung.
 */
const MOTION_GUARD = `(function(){var h=document.documentElement;h.classList.add('js');setTimeout(function(){if(!h.hasAttribute('data-motion-ready'))h.classList.add('reveal-fallback')},4000)})()`

export default async function RootLayout({ children }: { children: ReactNode }) {
  const showEvents = await getShowEvents()
  return (
    <html lang="vi" suppressHydrationWarning className={`${anton.variable} ${montserrat.variable} ${dancing.variable}`}>
      <body>
        <Script id="motion-guard" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: MOTION_GUARD }} />
        <MotionProvider>
          <PageIntro />
          <ScrollBar />
          <Topbar />
          <Header showEvents={showEvents} />
          <main>{children}</main>
          <ContactFab />
          <ConsentManager />
        </MotionProvider>
      </body>
    </html>
  )
}
