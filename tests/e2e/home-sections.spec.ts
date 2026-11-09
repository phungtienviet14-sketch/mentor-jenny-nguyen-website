import { expect, test } from '@playwright/test'

test('đủ các khối trang chủ và điều hướng neo', async ({ page }) => {
  await page.goto('/')
  for (const id of ['top', 've-jenny', 'khoa-hoc', 'lo-trinh', 'giai-phap', 'sach', 'qua-tang', 'su-kien', 'faq', 'dang-ky']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1)
  }
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(3)
})

test('khối lộ trình: ghim và cuộn ngang trên màn hình rộng', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'Chỉ kiểm tra trên desktop')
  await page.goto('/')
  const section = page.locator('#lo-trinh section')
  await section.scrollIntoViewIfNeeded()
  const track = section.locator('ul').first()
  const before = await track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41)
  await page.evaluate(() => {
    const s = document.querySelector('#lo-trinh section') as HTMLElement
    const max = s.offsetHeight - window.innerHeight
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + max * 0.6, behavior: 'instant' })
  })
  await expect.poll(() => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeLessThan(before - 100)
})

test('FAQ mở được bằng bàn phím', async ({ page }) => {
  await page.goto('/')
  const first = page.locator('#faq summary').first()
  await first.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '')
})

test('nút liên hệ nổi cố định góc phải dưới và có số điện thoại', async ({ page }) => {
  await page.goto('/')
  const fab = page.getByRole('complementary', { name: 'Liên hệ nhanh' })
  await expect(fab.locator('a[href^="tel:"]')).toHaveCount(1)
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }))
  const box = await fab.boundingBox()
  const vp = page.viewportSize()!
  expect(box!.x + box!.width).toBeGreaterThan(vp.width - 40)
  expect(box!.y + box!.height).toBeGreaterThan(vp.height - 40)
})

test('tab khóa học chuyển được bằng bàn phím', async ({ page }) => {
  await page.goto('/')
  const tabs = page.locator('#khoa-hoc [role="tab"]')
  await expect(tabs).toHaveCount(3)
  await tabs.first().focus()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('#khoa-hoc [role="tabpanel"]:not([hidden])')).toHaveCount(1)
})

test('giảm chuyển động: nội dung hiện đủ, không còn animation', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/')
  const opacity = await page.locator('#faq .reveal').first().evaluate((el) => getComputedStyle(el).opacity)
  expect(opacity).toBe('1')
  await expect(page.locator('.page-intro')).toHaveCount(0)
  await ctx.close()
})

test('tắt JavaScript: nội dung vẫn hiện (không bị ẩn bởi Reveal)', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/')
  const opacity = await page.locator('#faq .reveal').first().evaluate((el) => getComputedStyle(el).opacity)
  expect(opacity).toBe('1')
  await ctx.close()
})
