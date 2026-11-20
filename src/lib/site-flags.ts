import { cache } from 'react'

/** Dự phòng khi không đọc được CMS (chưa có DB, lỗi mạng, bản preview): biến môi trường, mặc định tắt. */
const envShowEvents = () => process.env.NEXT_PUBLIC_SHOW_EVENTS === '1'

/** Mã xác minh Google Search Console đang dùng; là giá trị dự phòng khi CMS để trống hoặc không đọc được. */
export const DEFAULT_GOOGLE_VERIFICATION = '0FvpAl5cuxUsRYqYbvFDVZ80Vtr1fl2xWSsAKa45Kg0'

const CMS_TIMEOUT_MS = 3000

type CmsSettings = {
  features?: { showEvents?: boolean | null } | null
  integrations?: { googleSiteVerification?: string | null } | null
}

/** Đọc global `site-settings` một lần mỗi request; không đọc được thì trả null. */
const readSettings = cache(async (): Promise<CmsSettings | null> => {
  if (!process.env.DATABASE_URI) return null
  try {
    const read = (async () => {
      const [{ getPayload }, { default: config }] = await Promise.all([
        import('payload'),
        import('@payload-config'),
      ])
      const payload = await getPayload({ config })
      return (await payload.findGlobal({ slug: 'site-settings', depth: 0 })) as CmsSettings
    })()
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), CMS_TIMEOUT_MS))
    return await Promise.race([read, timeout])
  } catch {
    return null
  }
})

/**
 * Phần Sự kiện có hiển thị không. Nguồn chính là hộp tick "Hiện phần Sự kiện" ở Payload
 * (Cài đặt chung > Công tắc hiển thị). Đọc được CMS thì theo CMS; không đọc được thì theo biến
 * `NEXT_PUBLIC_SHOW_EVENTS`. Lưu trong CMS sẽ làm mới trang (xem hook của global `site-settings`).
 */
export const getShowEvents = cache(async (): Promise<boolean> => {
  const value = (await readSettings())?.features?.showEvents
  return typeof value === 'boolean' ? value : envShowEvents()
})

/** Mã xác minh Google Search Console: theo CMS (Cài đặt chung > Tích hợp), trống thì dùng mã mặc định. */
export const getGoogleVerification = cache(async (): Promise<string> => {
  const value = (await readSettings())?.integrations?.googleSiteVerification?.trim()
  return value || DEFAULT_GOOGLE_VERIFICATION
})
