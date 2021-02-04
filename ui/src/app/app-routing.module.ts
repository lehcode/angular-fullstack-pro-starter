import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '~/app/modules/layout/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((mod) => mod.AdminModule),
    data: {
      showSideBar: true
    }
  },
  {
    path: '', loadChildren: () => import('./modules/front-page/front-page.module').then((mod) => mod.FrontPageModule), data: {
      showGuestNav: true,
      // showHeader: true,
      showFooter: true,
    }
  },
  {path: 'vin-decode', loadChildren: () => import('./modules/vin-decode/vin-decode.module').then((mod) => mod.VINDecodeModule)},
  // {path: 'vin-report', loadChildren: () => import('./modules/vin-report/vin-report.module').then((mod) => mod.VINReportModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
