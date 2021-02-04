import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinReportComponent } from './components/vin-report/vin-report.component';

const routes: Routes = [{ path: '', component: VinReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VinReportRoutingModule { }
