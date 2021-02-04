import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '~/app/services/config/app-config.service';
import { FormControl, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-vin-form',
  templateUrl: './vin-form.component.html',
  styleUrls: ['./vin-form.component.scss']
})
export class VINFormComponent implements OnInit {
  public apiUrl: string;
  public vinCodeFormControl: FormControl;

  constructor(
    private readonly appConfigService: AppConfigService,
    private logger: NGXLogger
  ) {
    this.apiUrl = this.appConfigService.getValue('api.url');
    this.vinCodeFormControl = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {}

  submitForm(evt: Event) {
    /* eslint-disable-next-line */
    debugger;
  }
}
