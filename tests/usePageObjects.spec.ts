import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'


test.beforeEach(async ({page}) => {
  await page.goto('/')
})

test('navigate to form page', async ({page}) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()
})

test('parameterized test', async ({page}) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage()
  await pm.onFormLayoutsPage().submitUsingTheGridFormCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
  await page.screenshot({path: 'screenshots/screenshot.png'})
  
})

test('parameterized test 2', async ({page}) => {
  const pm = new PageManager(page)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

  await pm.navigateTo().formLayoutsPage()
  await pm.onFormLayoutsPage().submitUsingTheInlineFormCredentials(randomFullName, randomEmail, true)
  await page.waitForTimeout(500)
  await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/2screenshot.png'})
  await pm.navigateTo().datepickerPage()
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(15)

  await pm.onDatepickerPage().selectDatepickerWhithRangeFromToday(5, 10)
})

test.only('testing with argos ci', async ({page}) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datepickerPage()
})