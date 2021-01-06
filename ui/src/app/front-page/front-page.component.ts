import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  public title = 'RealFreeVIN.com :: Бесплатная расшифровка VIN-кода автомобиля';
  public vinCodeFormControl: FormControl;

  constructor(
      private titleService: Title,
      private logger: NGXLogger
  ) {
    this.vinCodeFormControl = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.titleService.setTitle($localize`${this.title}`);
  }

  submitForm(form: FormGroup) {
    /* eslint-disable-next-line */
    debugger;
  }
}
