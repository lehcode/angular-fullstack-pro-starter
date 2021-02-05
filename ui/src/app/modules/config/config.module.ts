import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '~/app/modules/config/config.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ConfigService]
})
export class ConfigModule {
}
