import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './modules/api/api.module';
import { AdminModule } from './modules/admin/admin.module';
import config from './config';
import {
  I18nModule,
  I18nJsonParser,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
  CookieResolver
} from 'nestjs-i18n';
import path from 'path';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?${process.env.MONGO_PARAMS}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: process.env.MONGO_DB,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        family: 4,
      }
    ),
    AdminModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.resolve(path.join(__dirname, '/i18n/')),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lc'] },
        new HeaderResolver(['x-front-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lc']),
      ],
    })
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
