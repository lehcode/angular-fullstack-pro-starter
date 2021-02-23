import { HttpModule, Module } from '@nestjs/common';
import { AdminController } from '@admin/admin.controller';
import { DbModule } from '@db/db.module';
import { BaseModule } from '@root/modules/base/base.module';
import { ApiModule } from '@api/api.module';

@Module({
  imports: [
    BaseModule,
    HttpModule,
    DbModule,
    ApiModule
  ],
  providers: [],
  controllers: [AdminController]
})
export class AdminModule {}
