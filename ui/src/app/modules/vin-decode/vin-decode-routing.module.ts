import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreeReportComponent } from './components/free-report/free-report.component';

const routes: Routes = [
  {path: 'decode/:vin', component: FreeReportComponent},
  {path: 'decode/:vin/model-year/:year', component: FreeReportComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VinDecodeRoutingModule {
}
