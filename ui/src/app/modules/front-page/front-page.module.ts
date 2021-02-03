import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageRoutingModule } from './frontpage-routing.module';
import { FrontPageComponent } from './front-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [FrontPageComponent],
  imports: [
    CommonModule,
    FrontPageRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ]
})
export class FrontPageModule {
}
