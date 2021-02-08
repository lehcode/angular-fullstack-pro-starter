import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinDecodeRoutingModule } from './vin-decode-routing.module';
import { FreeReportComponent } from './components/free-report/free-report.component';
import { VINFormComponent } from './components/vin-form/vin-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    VinDecodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatSliderModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [
    FreeReportComponent,
    VINFormComponent,
  ],
  exports: [VINFormComponent]
})
export class VINDecodeModule {
}
