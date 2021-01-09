import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { HarnessLoader } from '@angular/cdk/testing';
import { ProtractorHarnessEnvironment } from '@angular/cdk/testing/protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let loader: HarnessLoader;

  beforeEach(() => {
    page = new AppPage();
    loader = ProtractorHarnessEnvironment.loader();
  });

  it('should display hero title', async () => {
    await page.navigateTo();
    expect(await page.getHeroTitle())
      .toEqual('Проверить VIN авто бесплатно');
  });

  it('should display hero lead', async () => {
    await page.navigateTo();
    expect(await page.getHeroLead())
      .toEqual('Узнать историю автомобиля по коду VIN до покупки!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage()
      .logs()
      .get(logging.Type.BROWSER);

    expect(logs)
      .not
      .toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry));
  });
});
