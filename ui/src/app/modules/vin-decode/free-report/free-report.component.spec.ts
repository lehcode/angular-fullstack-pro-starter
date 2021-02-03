import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeReportComponent } from './free-report.component';

describe('FreeReportComponent', () => {
  let component: FreeReportComponent;
  let fixture: ComponentFixture<FreeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
