import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VinDecodeRoutingModule } from './vin-decode-routing.module';
import { FreeReportComponent } from '../../components/free-report/free-report.component';
import { VinFormComponent } from './components/vin-form/vin-form.component';


@NgModule({
  declarations: [
    FreeReportComponent,
    VinFormComponent
  ],
  imports: [
    CommonModule,
    VinDecodeRoutingModule
  ]
})
export class VinDecodeModule {
}
