import Link from 'next/link'

import { SECTION_CLASS } from '@/components/ui/SectionHeading'

/** Khung trang pháp lý. `html` luôn đến từ tệp Markdown trong repo, không phải dữ liệu người dùng. */
export function LegalPage({ html }: { html: string }) {
  return (
    <div className={`${SECTION_CLASS} max-w-3xl pt-28`}>
      <Link href="/" className="mb-6 inline-block text-sm text-gold-500 underline">
        ← Về trang chủ
      </Link>
      <article
        className="legal text-fg [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-line-gold [&_blockquote]:bg-elevated [&_blockquote]:p-4 [&_blockquote]:text-sm [&_h1]:mb-4 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-normal [&_h1]:uppercase [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal [&_p]:my-3 [&_table]:my-4 [&_table]:w-full [&_table]:text-sm [&_td]:border [&_td]:border-line [&_td]:p-2 [&_th]:border [&_th]:border-line [&_th]:p-2 [&_th]:text-left"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
