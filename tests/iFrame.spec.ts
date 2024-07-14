import { expect } from '@playwright/test'
import { test } from '../test-options'

test.beforeEach(async ({page, globalsQaURL}) => {
  await page.goto(globalsQaURL)
  await page.waitForTimeout(500)
})

test('Drag and drop', async ({page}) => {
  const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
  // /'demo-frame lazyloaded"'
  await frame.locator('li', {hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash'))

  await frame.locator('li', {hasText: 'High Tatras 4'}).hover()
  await page.mouse.down()
  await frame.locator("#trash").hover()
  await page.mouse.up()

  await expect(frame.locator("#trash li h5")).toHaveText(['High Tatras 2', 'High Tatras 4'])
})