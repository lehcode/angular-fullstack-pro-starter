import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BackendService } from '~/app/services/backend.service';
import { DecodedVinItemInterface } from '~/app/interfaces/decoded-vin-item.interface';
import { ConfigService } from "~/app/modules/config/config.service";

@Component({
  selector: 'app-free-report',
  templateUrl: './free-report.component.html',
  styleUrls: ['./free-report.component.scss']
})
export class FreeReportComponent implements OnInit {
  public vin = '';
  public data: Record<string, any>[] = [];
  private modelYear = 1979;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly logger: NGXLogger,
    private readonly backendService: BackendService,
    private readonly configService: ConfigService
  ) {
    if (this.configService.getEnv() === 'dev') {
      // @ts-ignore
      this.logger.info('route --->', this.router.getCurrentNavigation().extras.state);
    }
  }

  ngOnInit(): void {
    if (this.configService.getEnv() === 'dev') {
      this.logger.info('state >>>', history.state);
      this.logger.info('location >>>', this.location.getState());
    }

    // @ts-ignore
    this.route.paramMap.pipe(switchMap((paramsMap: ParamMap) => of(paramsMap.params)))
      .subscribe((params: any) => {
        if (history.state.navigationId === 1) {
          this.vin = params.vin;
          this.modelYear = params.hasOwnProperty('modelYear') && params.modelYear > 1979
            ? params.modelYear : undefined;

          this.backendService.decodeVIN$(this.vin, this.modelYear)
            .subscribe((data: any) => this.data = this.formatResults(data));
        } else if (history.state.navigationId > 1) {
          if (history.state.hasOwnProperty('vin')) {
            this.vin = history.state.vin;
          }
          if (history.state.hasOwnProperty('modelYear')) {
            this.modelYear = history.state.modelYear;
          }
          if (history.state.hasOwnProperty('data')) {
            this.data = this.formatResults(history.state.data);
          }
        }
      });
  }

  private formatResults(data: Record<string, any>[]) {
    return data.filter((item) => {
      if (item.label === 'Error Code' && item.value === 0) {
        return false;
      }

      if (!item.hasOwnProperty('value') || !item.value || item.value === 'Not Applicable') {
        return false;
      }

      return true;
    });

    // const decoded = data.map((item) => {
    //   return {
    //     description, label, value, details
    //   }
    // })
    //
    // return true;
  }
}
