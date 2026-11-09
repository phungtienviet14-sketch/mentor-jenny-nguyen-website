import type { MetadataRoute } from 'next'

import { PROGRAMS, programHref } from '@/content/programs'
import { absoluteUrl } from '@/lib/site'

/** Trang chủ + các trang chi tiết chương trình. Sách, bài viết từ Payload sẽ bổ sung sau. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    ...PROGRAMS.map((p) => ({
      url: absoluteUrl(programHref(p.slug)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
