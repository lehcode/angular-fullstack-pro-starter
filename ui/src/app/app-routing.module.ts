import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VinResultsComponent } from '~/app/components/vin-results/vin-results.component';
import { ErrorPageComponent } from '~/app/components/error-page/error-page.component';
import { FrontPageComponent } from '~/app/components/front-page/front-page.component';

const routes: Routes = [
  { path: 'vin-search-result', component: VinResultsComponent },
  { path: 'admin', loadChildren: () => import('./modules/domain/admin/admin.module').then((m) => m.AdminModule) },
  {
    path: 'purchase-report',
    loadChildren: () => import('./modules/domain/vin-report/vin-report.module').then((m) => m.VinReportModule)
  },
  { path: 'blog', loadChildren: () => import('./modules/domain/blog/blog.module').then(m => m.BlogModule) },
  { path: '', component: FrontPageComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
