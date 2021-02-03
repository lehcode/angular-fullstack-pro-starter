import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinDecodeComponent } from './vin-decode.component';
import { FreeReportComponent } from '../../components/free-report/free-report.component';

const routes: Routes = [
  {path: '', component: VinDecodeComponent},
  {path: 'free-report', component: FreeReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VinDecodeRoutingModule {
}
