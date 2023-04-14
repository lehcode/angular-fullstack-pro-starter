import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('workspace-project App', () => {
  let page: AppPage;
  let loader: HarnessLoader;

  beforeEach(() => {
    page = new AppPage();
  });

  // Your tests

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
