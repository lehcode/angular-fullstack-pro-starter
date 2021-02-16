import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeReportComponent } from './free-report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGXLogger } from 'ngx-logger';
import { NGXLoggerMock } from 'ngx-logger/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('FreeReportComponent', () => {
  let component: FreeReportComponent;
  let fixture: ComponentFixture<FreeReportComponent>;

  beforeEach(async () => {
    window.history.pushState({navigationId: '1'}, '', '');

    await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([{path: 'decode/:id', component: FreeReportComponent}]),
          BrowserAnimationsModule,
          HttpClientModule,
          RouterModule
        ],
        declarations: [FreeReportComponent],
        providers: [{provide: NGXLogger, useValue: NGXLoggerMock}]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeReportComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
