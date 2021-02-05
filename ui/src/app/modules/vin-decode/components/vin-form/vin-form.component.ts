import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { fromEvent } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { isUndefined, isNull } from 'lodash';
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
  public vinCode: string | undefined;
  public modelYear = 1980;

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
  }

  ngAfterViewInit(): void {
    fromEvent(document.querySelector('form button') as FromEventTarget<Event>, 'click')
      .subscribe(evt => {
        if (this.dataForm.valid) {
          this.backendService.decodeVIN$(this.vinCode, this.modelYear)
            .subscribe((data: Record<string, any>) => {
                this.vinData = data;
                this.router.navigateByUrl(`/free-report`);
              }
            );
        }
      });
  }
}
