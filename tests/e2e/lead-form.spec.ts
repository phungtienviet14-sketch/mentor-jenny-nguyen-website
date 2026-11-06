import { expect, test } from '@playwright/test'

test('form hiển thị lỗi từng trường khi gửi trống', async ({ page }) => {
  await page.goto('/')
  const form = page.locator('#dang-ky form')
  await form.locator('button[type="submit"]').click()
  await expect(form.locator('#fullName-error')).toBeVisible()
  await expect(form.locator('#phone-error')).toBeVisible()
  await expect(form.locator('#consent-error')).toBeVisible()
})

test('form gửi thành công hiển thị lời cảm ơn', async ({ page }) => {
  // Chặn API thật để không cần SMTP/DB trong CI; logic kiểm tra đã có unit test.
  let sent: Record<string, unknown> | undefined
  await page.route('**/api/leads', async (route) => {
    sent = route.request().postDataJSON()
    await route.fulfill({ json: { ok: true } })
  })
  await page.goto('/?utm_source=test')
  const form = page.locator('#dang-ky form')
  await form.getByLabel('Họ tên').fill('Nguyễn Văn A')
  await form.getByLabel(/Số điện thoại/).fill('0912 345 678')
  await form.getByLabel('Email').fill('a@congty.vn')
  await form.getByRole('checkbox').check()
  await form.locator('button[type="submit"]').click()
  await expect(page.getByTestId('lead-success')).toBeVisible()
  expect(sent).toMatchObject({ fullName: 'Nguyễn Văn A', consent: true, utm: { source: 'test' } })
})

test('trang chính sách và điều khoản không còn 404', async ({ page }) => {
  for (const path of ['/chinh-sach-bao-mat', '/dieu-khoan-su-dung']) {
    const res = await page.goto(path)
    expect(res?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
})
