import { test, expect } from '@playwright/test'


test.beforeEach(async ({page}, testInfo) => {
  await page.goto('/')
  if(testInfo.project.name === 'mobile') {
    await page.locator('.sidebar-toggle').click()
  }
  await page.waitForTimeout(500)
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
  if(testInfo.project.name === 'mobile') {
    await page.locator('.sidebar-toggle').click()
  }
})


test('input field', async ({page}, testInfo) => {
  const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
  await usingTheGridEmailInput.fill('teet@test.com')
  await usingTheGridEmailInput.clear()
  await usingTheGridEmailInput.pressSequentially('test@test1.com')
})