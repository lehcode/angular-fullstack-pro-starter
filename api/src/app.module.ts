import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { AppController } from '@base/app.controller';
import { AppService } from '@base/app.service';
import { ApiModule } from '@api/api.module';
import { AdminModule } from '@admin/admin.module';
import { DbModule } from '@db/db.module';
import config from '@base/config';

dotenv.config();

console.log(`MongoDB host: ${process.env.MONGO_HOST}`);
console.log(`MongoDB port: ${process.env.MONGO_PORT}`);
console.log(`MongoDB params: ${process.env.MONGO_URL_PARAMS}`);
console.log(`MongoDB DB: ${process.env.MONGO_DB}`);

if (process && process.env && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
  console.log(`MongoDB user: ${process.env.MONGO_USER}`);
  console.log(`MongoDB pass: ${process.env.MONGO_PASS}`);
  console.log(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_URL_PARAMS}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_URL_PARAMS}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: process.env.MONGO_DB,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        family: 4
      }
    ),
    ApiModule,
    AdminModule,
    DbModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
