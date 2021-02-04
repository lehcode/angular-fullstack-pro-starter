import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VinReportRoutingModule } from './vin-report-routing.module';
import { VinReportComponent } from './components/vin-report/vin-report.component';


@NgModule({
  declarations: [VinReportComponent],
  imports: [
    CommonModule,
    VinReportRoutingModule
  ]
})
export class VinReportModule { }
