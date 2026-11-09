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
