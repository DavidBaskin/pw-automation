import { Page, Locator } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase{

  readonly formLayoutsManuItems: Locator
  readonly datepickerMenuItems: Locator
  readonly smartTableMenuItems: Locator
  readonly toastrMenuItems: Locator
  readonly tooltipMenuItems: Locator

  constructor(page: Page) {
    super(page) 
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem('Forms')
    await this.page.getByText('Form Layouts').click()
  }

  async datepickerPage() {
    await this.selectGroupMenuItem('Forms')
    await this.page.waitForTimeout(1000)
    await this.page.getByText('Datepicker').click()
  }

  async smartTablePage() {
    await this.selectGroupMenuItem('Tables & Data')
    await this.page.getByText('Smart Table').click()
  }

  async toastrPage() {
    await this.selectGroupMenuItem('Modal & Overlays')
    await this.page.getByText('Toastr').click()
  }

  async tooltipPage() {
    await this.selectGroupMenuItem('Modal & Overlays')
    await this.page.getByText('Tooltip').click()
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedSate = await groupMenuItem.getAttribute('aria-expanded')
    if (expandedSate == 'false') 
      await groupMenuItem.click()
  }

}