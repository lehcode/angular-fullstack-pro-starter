import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { AppController } from '@root/app.controller';
import { ApiModule } from '@api/api.module';
import { AdminModule } from '@admin/admin.module';
import { DbModule } from '@db/db.module';
import { AppConfigService } from '@services/app-config/app-config.service';
import config from '@root/config';
import { BaseModule } from '@base/base.module';
import { LocaleMiddleware } from '@root/middleware/locale.middleware';

dotenv.config();
const appConfig = new AppConfigService(new ConfigService());
const mongoHost = appConfig.get<string>('mongo.host');
const mongoPort = appConfig.get<string>('mongo.port');
const mongoUrlParams = appConfig.get<string>('mongo.urlParams');
const mongoDb = appConfig.get<string>('mongo.db');
const mongoUser = appConfig.get<string>('mongo.user');
const mongoPass = appConfig.get<string>('mongo.pass');

console.log(`MongoDB host: ${mongoHost}`);
console.log(`MongoDB port: ${mongoPort}`);
console.log(`MongoDB params: ${mongoUrlParams}`);
console.log(`MongoDB DB: ${mongoDb}`);

if (process && process.env && (process.env.NODE_ENV === 'development'
  || process.env.NODE_ENV === 'test')) {
  console.log(`mongodb://${mongoHost}:${mongoPort}/${mongoUrlParams}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRoot(
      `mongodb://${mongoHost}:${mongoPort}/${mongoUrlParams}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: mongoDb,
        user: mongoUser,
        pass: mongoPass,
        family: 4
      }
    ),
    DbModule,
    BaseModule,
    ApiModule,
    AdminModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LocaleMiddleware)
      .forRoutes('api');
  }
}
