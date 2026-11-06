import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/site'

/** Phase 4/5 sẽ bổ sung trang khóa học, sách, bài viết từ Payload. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 }]
}
