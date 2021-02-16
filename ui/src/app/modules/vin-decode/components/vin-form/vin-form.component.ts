import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { fromEvent } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { BackendService } from '~/app/services/backend.service';
import { ConfigService } from '~/app/modules/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vin-form',
  templateUrl: './vin-form.component.html',
  styleUrls: ['./vin-form.component.scss']
})
export class VINFormComponent implements AfterViewInit {
  public apiUrl: string;
  public dataForm: FormGroup;
  public vinData: Record<string, any> = {};
  public vinCode = '';
  public modelYearMin = 1979;
  public modelYearMax = new Date().getFullYear();
  public modelYearValue: number | null;
  public hideModelYearInput = true;
  public vinInputPlaceholderText = $localize`:@@vin-form.code_input_placeholder:Введите VIN код`;

  constructor(
    private readonly config: ConfigService,
    private backendService: BackendService,
    private logger: NGXLogger,
    private router: Router
  ) {
    this.apiUrl = `${this.config.get<string>('api.host')}:${this.config.get<string>('api.port')}`;
    this.dataForm = new FormGroup({
      vinCodeInput: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\s?[A-HJ-NPR-Z0-9]{9,17}\s?$/)
      ]),
      modelYearInput: new FormControl('', [Validators.pattern(/^\s?\d{4}\s?$/)])
    });
    this.modelYearValue = this.modelYearMin;
  }

  ngAfterViewInit(): void {
    if (document) {
      fromEvent(document.querySelector('#vin-code-input') as FromEventTarget<Event>, 'blur')
          .subscribe(evt => {
            if (this.dataForm.controls.vinCodeInput.valid) {
              this.hideModelYearInput = false;
              // this.updateMinModelYear();
            }
          });

      fromEvent(document.querySelector('form#vin-form') as FromEventTarget<Event>, 'submit')
          .subscribe(evt => {
            if (this.dataForm.valid) {
              this.vinCode = this.dataForm.controls.vinCodeInput.value;
              const route = this.modelYearValue === 1979
                  ? `/decode/${this.vinCode}`
                  : `/decode/${this.vinCode}/model-year/${this.modelYearValue}`;

              this.backendService.decodeVIN$(this.vinCode, this.modelYearValue)
                  .subscribe((data: Record<string, any>) => {
                        this.router.navigateByUrl(route, {
                          state: {
                            code: this.vinCode,
                            modelYear: this.modelYearValue,
                            vinData: data
                          }
                        });
                      }
                  );
            }
          });
    }
  }

  // private updateMinModelYear() {
  //   fromEvent(document.querySelector('#model-year') as FromEventTarget<Event>, 'click')
  //     .subscribe(evt => {
  //       this.modelYearMin = 1980;
  //     });
  // }
}
