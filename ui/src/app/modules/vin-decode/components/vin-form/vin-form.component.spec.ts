import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VINFormComponent } from './vin-form.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { VINDecodeModule } from '~/app/modules/vin-decode/vin-decode.module';
import { HttpClientModule } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { NGXLoggerMock } from 'ngx-logger/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FrontPageComponent } from '~/app/modules/front-page/front-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VINFormComponent', () => {
  let component: VINFormComponent;
  let fixture: ComponentFixture<VINFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
          VINDecodeModule,
          HttpClientModule,
          RouterTestingModule.withRoutes([{path: '', component: FrontPageComponent}]),
          BrowserAnimationsModule
        ],
        declarations: [VINFormComponent],
        providers: [{provide: NGXLogger, useValue: NGXLoggerMock}]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VINFormComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

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
