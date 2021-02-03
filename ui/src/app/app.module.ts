import { BrowserModule, Title as TitleService } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { LayoutModule } from '~/app/modules/layout/layout.module';
import { PageNotFoundComponent } from './modules/layout/components/page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import '@angular/common/locales/global/ru';
import '@angular/common/locales/global/en';
import '@angular/common/locales/global/uk';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/log',
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.ERROR,
      colorScheme: [
        'purple',
        'teal',
        'gray',
        'gray',
        'red',
        'red',
        'red'
      ]
    }),
    FlexLayoutModule,
    LayoutModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [
    TitleService,
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
