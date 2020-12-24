import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinReportComponent } from './vin-report.component';

describe('VinReportComponent', () => {
  let component: VinReportComponent;
  let fixture: ComponentFixture<VinReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
