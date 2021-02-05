import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQItemComponent } from './faq-item.component';

describe('FAQItemComponent', () => {
  let component: FAQItemComponent;
  let fixture: ComponentFixture<FAQItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
