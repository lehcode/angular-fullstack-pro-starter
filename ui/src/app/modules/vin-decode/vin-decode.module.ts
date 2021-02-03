import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VinDecodeRoutingModule } from './vin-decode-routing.module';
import { VinDecodeComponent } from './vin-decode.component';
import { FreeReportComponent } from './free-report/free-report.component';


@NgModule({
  declarations: [
    VinDecodeComponent,
    FreeReportComponent
  ],
  imports: [
    CommonModule,
    VinDecodeRoutingModule
  ]
})
export class VinDecodeModule {
}
