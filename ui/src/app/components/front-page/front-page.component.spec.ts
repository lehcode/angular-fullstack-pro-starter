import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrontPageComponent} from './front-page.component';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero heading', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hero__content h1').textContent).toBe('Проверить VIN авто бесплатно');
  });

  xit('should render hero lead');

  xit('should render VIN search form', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ui app is running!');
  });

  xit('should render button');
});
