import { test } from '../test-options'
import { faker } from '@faker-js/faker'

// test.beforeEach(async ({page}) => {
//   await page.goto('/')
// })

test('parameterized test 2', async({pageManager}) => {
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

  await pageManager.onFormLayoutsPage().submitUsingTheInlineFormCredentials(randomFullName, randomEmail, false)
  await pageManager.onFormLayoutsPage().submitUsingTheGridFormCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
})