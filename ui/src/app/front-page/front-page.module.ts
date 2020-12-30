import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageRoutingModule } from '~/app/front-page/frontpage-routing.module';
import { FrontPageComponent } from '~/app/front-page/front-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FrontPageComponent],
  imports: [
    CommonModule,
    FrontPageRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class FrontPageModule {
}
