import { Page, expect } from "@playwright/test"

export class DatepickerPage {

  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async selectCommonDatePickerDateFromToday(numberDaysFromToday: number) {
    const formPickerButton = this.page.getByPlaceholder('Form Picker')
    await formPickerButton.click()
    const dateToAssert = await this.sleectDateInTheCalendar(numberDaysFromToday)

    
    await expect(formPickerButton).toHaveValue(dateToAssert)
  }
  async selectDatepickerWhithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
    const formPickerButton = this.page.getByPlaceholder('Range Picker')
    await formPickerButton.click()
    const dateToAssertStart = await this.sleectDateInTheCalendar(startDayFromToday)
    const dateToAssertEnd = await this.sleectDateInTheCalendar(endDayFromToday)
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

    await expect(formPickerButton).toHaveValue(dateToAssert)
  }

  private async sleectDateInTheCalendar(numberDaysFromToday: number) {
    let date = new Date()
    date.setDate(date.getDate() + numberDaysFromToday)
    const expectedDate = date.getDate().toString()
    const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const deteToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`
    
    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    }

    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
    return deteToAssert
  }
}