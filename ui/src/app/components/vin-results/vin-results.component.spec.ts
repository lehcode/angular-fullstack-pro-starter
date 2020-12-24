import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinResultsComponent } from './vin-results.component';

describe('VinResultsComponent', () => {
  let component: VinResultsComponent;
  let fixture: ComponentFixture<VinResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
