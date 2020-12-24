import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VinResultsComponent } from './components/vin-results/vin-results.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FrontPageComponent } from './components/front-page/front-page.component';

import '@angular/common/locales/global/ru';

@NgModule({
  declarations: [
    AppComponent,
    VinResultsComponent,
    ErrorPageComponent,
    FrontPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
