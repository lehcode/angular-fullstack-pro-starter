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
    expect(compiled.querySelector('.hero_content h1').textContent).toBe('Проверить VIN авто бесплатно');
  });

  xit('should render hero lead with correct text');

  xit('should render VIN search form', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const inputSelector = 'input.form-control';

    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector(`form ${inputSelector}`)).toBeTruthy();
    expect(compiled.querySelector(`form ${inputSelector}`).name).toBe('vin-code');
    expect(compiled.querySelector(`form ${inputSelector}`).text).toBe('');
    expect(compiled.querySelector('form button')).toBeTruthy();
    expect(compiled.querySelector('form button').text).toBe('Проверить');
  });
});
