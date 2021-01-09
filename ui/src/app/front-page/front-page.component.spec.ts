import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontPageComponent } from './front-page.component';
import { NGXLoggerMock } from 'ngx-logger/testing';
import { NGXLogger } from 'ngx-logger';
import { NgForm } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let pageTitle = '';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [
          FrontPageComponent,
          NgForm
        ],
        providers: [{provide: NGXLogger, useValue: NGXLoggerMock}]
      })
      .compileComponents();

    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();

    pageTitle = 'RealFreeVIN.com :: Бесплатная расшифровка VIN-кода автомобиля';
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it(`should have a title '${pageTitle}'`, () => {
    expect(component.title)
      .toEqual(pageTitle);
  });

  // xit('should render hero lead with correct text');

  it('loads harnesses', async () => {
    // The button element is inside the fixture's root element, so we use `loader`.
    const vinInputHarness = await loader.getHarness(MatInputHarness);

    await vinInputHarness.focus();
    await vinInputHarness.blur();

    expect(await vinInputHarness.getValue())
      .toBe('');

    await vinInputHarness.setValue('3TMMU52N49M026526');

    expect(await vinInputHarness.getValue())
      .toBe('3TMMU52N49M026526');

    // // Click the button to open the dialog
    // await buttonHarness.click();
    //
    // // The dialog is appended to `document.body`, outside of the fixture's root element,
    // // so we use `rootLoader` in this case.
    // const dialogHarness = await rootLoader.getHarness(MyDialogHarness);
  });

  // xit('should render VIN search form', () => {
  //   fixture.detectChanges();
  //
  //   const compiled = fixture.nativeElement;
  //   const inputSelector = 'input.form-control';
  //
  //   expect(compiled.querySelector('form')).toBeTruthy();
  //   expect(compiled.querySelector(`form ${inputSelector}`)).toBeTruthy();
  //   expect(compiled.querySelector(`form ${inputSelector}`).name).toBe('vin-code');
  //   expect(compiled.querySelector(`form ${inputSelector}`).text).toBe('');
  //   expect(compiled.querySelector('form button')).toBeTruthy();
  //   expect(compiled.querySelector('form button').text).toBe('Проверить');
  // });
});
