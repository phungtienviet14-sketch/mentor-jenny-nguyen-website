import { expect, test } from '@playwright/test'

test('trang chủ có tiêu đề, meta và dữ liệu có cấu trúc', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mentor Jenny Nguyễn')
  await expect(page).toHaveTitle(/Mentor Jenny Nguyễn/)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /AI/)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(3)
})

test('giao diện chỉ có bản sáng, nền trắng', async ({ page }) => {
  await page.goto('/')
  const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor)
  expect(bg).toBe('rgb(255, 255, 255)')
})

test('robots và sitemap trả về hợp lệ', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.ok()).toBe(true)
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain('<loc>')
})

test('không có lỗi console hoặc hydration khi tải và cuộn trang', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('_next/hmr')) errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
  await page.waitForTimeout(500)
  expect(errors).toEqual([])
})
