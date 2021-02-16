import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontPageComponent } from './front-page.component';
import { NGXLoggerMock } from 'ngx-logger/testing';
import { NGXLogger } from 'ngx-logger';
import { NgForm } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

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

    pageTitle = 'vin4free.com - Бесплатная расшифровка VIN-кода автомобиля';
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it(`should have a title '${pageTitle}'`, () => {
    expect(component.title)
      .toEqual(pageTitle);
  });

  xit('should render hero lead with correct text');
});
