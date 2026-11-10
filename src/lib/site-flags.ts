import { cache } from 'react'

/** Dự phòng khi không đọc được CMS (chưa có DB, lỗi mạng, bản preview): biến môi trường, mặc định tắt. */
const envShowEvents = () => process.env.NEXT_PUBLIC_SHOW_EVENTS === '1'

const CMS_TIMEOUT_MS = 3000

/**
 * Phần Sự kiện có hiển thị không. Nguồn chính là hộp tick "Hiện phần Sự kiện" ở Payload
 * (Cài đặt chung > Công tắc hiển thị). Đọc được CMS thì theo CMS; không đọc được thì theo biến
 * `NEXT_PUBLIC_SHOW_EVENTS`. Lưu trong CMS sẽ làm mới trang (xem hook của global `site-settings`).
 */
export const getShowEvents = cache(async (): Promise<boolean> => {
  if (!process.env.DATABASE_URI) return envShowEvents()
  try {
    const read = (async () => {
      const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
      const payload = await getPayload({ config })
      const settings = (await payload.findGlobal({ slug: 'site-settings', depth: 0 })) as {
        features?: { showEvents?: boolean | null } | null
      }
      return settings.features?.showEvents
    })()
    const timeout = new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), CMS_TIMEOUT_MS))
    const value = await Promise.race([read, timeout])
    return typeof value === 'boolean' ? value : envShowEvents()
  } catch {
    return envShowEvents()
  }
})
