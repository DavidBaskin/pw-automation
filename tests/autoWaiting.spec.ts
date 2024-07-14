import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(process.env.URL)
  await page.getByText('Button Triggering AJAX Request').click()
  testInfo.setTimeout(testInfo.timeout + 2000)
})


test('Auto waiting for elements', async ({ page }) => {
  const succsessButton = await page.locator('.bg-success')

  // await succsessButton.click()

  const text = await succsessButton.textContent()
  expect(text).toEqual('Data loaded with AJAX get request.')
})