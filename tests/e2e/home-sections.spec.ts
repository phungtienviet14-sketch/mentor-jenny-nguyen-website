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
