import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinDecodeComponent } from './vin-decode.component';

describe('VinDecodeComponent', () => {
  let component: VinDecodeComponent;
  let fixture: ComponentFixture<VinDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinDecodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
