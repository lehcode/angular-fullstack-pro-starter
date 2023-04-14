import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdminController } from '@admin/admin.controller';
import { DbModule } from '@db/db.module';
import { BaseModule } from '@base/base.module';
import { ApiModule } from '@api/api.module';
import { MongooseService } from '@services/mongoose/mongoose.service';

@Module({
  imports: [
    BaseModule,
    HttpModule,
    DbModule,
    ApiModule
  ],
  providers: [MongooseService],
  controllers: [AdminController]
})
export class AdminModule {}
