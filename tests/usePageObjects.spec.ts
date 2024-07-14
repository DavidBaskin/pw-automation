import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
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
  await pm.onFormLayoutsPage().submitUsingTheGridFormCredentialsAndSelectOption('test@test.com', 'password', 'Option 2')
  
})

test('parameterized test 2', async ({page}) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage()
  await pm.onFormLayoutsPage().submitUsingTheInlineFormCredentials('David Baskin', 'test@test.com', true)
})

test('datepicker test', async ({page}) => {
  const pm = new PageManager(page)

  await pm.navigateTo().datepickerPage()
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(15)

  await pm.onDatepickerPage().selectDatepickerWhithRangeFromToday(5, 10)
})