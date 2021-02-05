import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreeReportComponent } from './components/free-report/free-report.component';

const routes: Routes = [{path: 'free-report', component: FreeReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VinDecodeRoutingModule {
}
