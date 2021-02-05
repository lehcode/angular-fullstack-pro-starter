import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQRoutingModule } from './faq-routing.module';
import { FAQItemComponent } from './components/faq-item/faq-item.component';

@NgModule({
  declarations: [FAQItemComponent],
  imports: [
    CommonModule,
    FAQRoutingModule
  ]
})
export class FAQModule { }
