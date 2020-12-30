import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '~/app/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((mod) => mod.AdminModule),
    data: {
      showSideBar: true
    }
  },
  {path: '', loadChildren: () => import('./front-page/front-page.module').then((mod) => mod.FrontPageModule)},
  {path: 'vin-decode', loadChildren: () => import('./vin-decode/vin-decode.module').then((mod) => mod.VinDecodeModule)},
  {path: 'vin-report', loadChildren: () => import('./vin-report/vin-report.module').then((mod) => mod.VinReportModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
