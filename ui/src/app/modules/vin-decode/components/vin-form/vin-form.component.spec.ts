import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VINFormComponent } from './vin-form.component';

describe('VINFormComponent', () => {
  let component: VINFormComponent;
  let fixture: ComponentFixture<VINFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VINFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VINFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
