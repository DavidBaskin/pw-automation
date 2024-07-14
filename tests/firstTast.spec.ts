import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

// test.describe('Locator syntac rules', () => {
//   test('the first test', async ({ page }) => {
//     await page.locator('#inputEmail').click
//   })
// })

test('User facing test', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('button', { name: 'SIGN IN' }).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()
})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({ page }) => {
  await page.locator('nb-card', { hasText: "Using the Grid"}).getByLabel('Email').click()

  await page.locator('nb-card').filter({ hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

  await page.locator('nb-card').filter({ has: page.locator("nb-checkbox")}).filter({ hasText: "Sign in" }).getByRole('textbox', {name: "Email"}).click()
})

test('Reusing the locator', async ({ page }) => {
  const basicForm = page.locator('nb-card', { hasText: "Basic form"})
  const emailField = basicForm.getByLabel('Email')
  const passwordField = basicForm.getByLabel('Password')
  const submitButton = basicForm.getByRole('button', {name: "SUBMIT"})

  await emailField.fill("baskindavid740@gmail.com")
  await passwordField.fill("Welcome123")
  await basicForm.locator('nb-checkbox').click()
  await submitButton.click()

  await expect(emailField).toHaveValue("baskindavid740@gmail.com")
})


test('Extracting values', async ({ page }) => {
  const basicForm = page.locator('nb-card', { hasText: "Basic form"})
  const buttonText = await basicForm.getByRole('button', {name: "Submit"}).textContent()
  expect(buttonText).toEqual("Submit")

  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain("Option 1")

  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill("test@test.com")
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual("test@test.com")

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual("Email")
})

test('assertions', async ({ page }) => {
  const basicForm = page.locator('nb-card', { hasText: "Basic form"}).locator('button')

  await expect.soft(basicForm).toHaveText("Submit")
  await basicForm.click()
})
