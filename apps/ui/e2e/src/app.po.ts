import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getHeroTitle(): Promise<string> {
    return element(by.css('app-root header .hero__content h1')).getText();
  }

  async getHeroLead(): Promise<string> {
    return element(by.css('app-root header .hero__content p')).getText();
  }

  async getVinSearchForm(){
    return element(by.css('app-root header .hero__content form')).getText();
  }

  async getSubmitButton(){
    return element(by.css('app-root header .hero__content form button')).getText();
  }
}
