/* eslint-disable array-bracket-newline */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { VINFormComponent } from './components/vin-form/vin-form.component';
import { FreeReportComponent } from '../../components/free-report/free-report.component';

const routes: Routes = [
  // {path: '', component: VINFormComponent},
  {path: 'free-report', component: FreeReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VinDecodeRoutingModule {
}
