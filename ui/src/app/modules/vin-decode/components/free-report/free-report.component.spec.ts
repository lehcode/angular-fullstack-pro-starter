import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeReportComponent } from './free-report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGXLogger } from 'ngx-logger';
import { NGXLoggerMock } from 'ngx-logger/testing';
import { HttpClientModule } from '@angular/common/http';

describe('FreeReportComponent', () => {
  let component: FreeReportComponent;
  let fixture: ComponentFixture<FreeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([{path: 'decode/:id', component: FreeReportComponent}]),
          BrowserAnimationsModule,
          HttpClientModule
        ],
        declarations: [FreeReportComponent],
        providers: [{provide: NGXLogger, useValue: NGXLoggerMock}]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
