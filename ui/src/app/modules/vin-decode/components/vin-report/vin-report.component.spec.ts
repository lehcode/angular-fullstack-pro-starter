import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VINReportComponent } from './vin-report.component';

describe('VINReportComponent', () => {
  let component: VINReportComponent;
  let fixture: ComponentFixture<VINReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VINReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VINReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
