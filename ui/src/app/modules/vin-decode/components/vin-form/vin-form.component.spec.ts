import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinFormComponent } from './vin-form.component';

describe('VinFormComponent', () => {
  let component: VinFormComponent;
  let fixture: ComponentFixture<VinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
