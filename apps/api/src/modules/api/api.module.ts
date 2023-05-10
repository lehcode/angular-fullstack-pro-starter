import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from '@services/api/api.service';
import { ApiController } from '@api/api.controller';
import { DbModule } from '@db/db.module';
import { BaseModule } from '@base/base.module';

@Module({
  imports: [
    DbModule,
    BaseModule,
    HttpModule,
    MongooseModule
  ],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService]
})
export class ApiModule {}
